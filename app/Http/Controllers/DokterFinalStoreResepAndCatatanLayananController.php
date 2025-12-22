<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\CatatanLayanan;
use App\Models\CatatanLayananDetail;
use App\Models\Resep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DokterFinalStoreResepAndCatatanLayananController extends Controller
{
    public function storeFinal(Request $request)
    {

        $request->validate([
            'catatan.antrian_id' => 'required|integer|exists:antrian,id',
            'catatan.pasien_id' => 'required|integer|exists:pasien,id',
            'catatan.klinik_id' => 'required|integer|exists:klinik,id',
            'catatan.layanan' => 'required|array|min:1',
            'catatan.layanan.*.layanan_id' => 'required|integer|exists:layanan,id',
            'resep_teks' => 'required|string',
        ]);

        $cat = $request->input('catatan');
        $resepTeks = $request->input('resep_teks');

        $dokterId = auth()->user()->dokter->id;
        $antrian = Antrian::findOrFail($cat['antrian_id']);

        DB::transaction(function () use ($cat, $antrian, $resepTeks, $dokterId) {

            $pemeriksaanFisikId =
                !empty($cat['pemeriksaan_fisik_id']) && $cat['pemeriksaan_fisik_id'] > 0
                ? $cat['pemeriksaan_fisik_id']
                : null;

            // 1 Simpan catatan layanan (rekam medis)
            $catatan = CatatanLayanan::create([
                'sumber_input' => $antrian->klinik->punya_server ? 'server' : 'manual',
                'pemeriksaan_fisik_id' => $pemeriksaanFisikId,
                'antrian_id' => $cat['antrian_id'],
                'pasien_id' => $cat['pasien_id'],
                'klinik_id' => $cat['klinik_id'],
                'dokter_id' => $dokterId,
                'nomor_pasien' => $antrian->pasien->nomor_pasien ?? null,
                'tanggal_kunjungan' => now(),
                'keluhan_utama' => $cat['keluhan_utama'] ?? '',
                'detail_keluhan' => $cat['detail_keluhan'] ?? '',
                'diagnosa' => $cat['diagnosa'] ?? '',
                'tindakan' => $cat['tindakan'] ?? '',
                'catatan_lain' => $cat['catatan_lain'] ?? '',
            ]);

            // 2️ Simpan detail layanan
            foreach ($cat['layanan'] as $item) {
                CatatanLayananDetail::create([
                    'catatan_layanan_id' => $catatan->id,
                    'layanan_id' => $item['layanan_id'],
                ]);
            }

            // 3️ Simpan resep
            Resep::create([
                'catatan_layanan_id' => $catatan->id,
                'pasien_id' => $cat['pasien_id'],
                'klinik_id' => $cat['klinik_id'],
                'dokter_id' => $dokterId,
                'resep_teks' => $resepTeks,
                'status' => 'pending',
            ]);

            // 4️ Update antrian
            $antrian->update([
                'status' => 'Selesai',
            ]);
        });

        return redirect()
            ->route('dokter.antrian.index')
            ->with('success', 'Catatan dan resep berhasil dikirim');
    }
}
