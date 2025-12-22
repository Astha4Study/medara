<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\CatatanLayanan;
use App\Models\CatatanLayananDetail;
use App\Models\Layanan;
use App\Models\Pembayaran;
use App\Models\Resep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DokterFinalStoreCatatanLayananController extends Controller
{
    public function FinalStore(Request $request)
    {
        $request->validate([
            'catatan.antrian_id' => 'required|integer|exists:antrian,id',
            'catatan.pasien_id' => 'required|integer|exists:pasien,id',
            'catatan.klinik_id' => 'required|integer|exists:klinik,id',
            'catatan.layanan' => 'required|array|min:1',
            'catatan.layanan.*.layanan_id' => 'required|integer|exists:layanan,id',
        ]);

        $cat = $request->input('catatan');

        $dokterId = auth()->user()->dokter->id;
        $antrian = Antrian::findOrFail($cat['antrian_id']);

        DB::transaction(function () use ($cat, $antrian, $dokterId) {

            $pemeriksaanFisikId =
                !empty($cat['pemeriksaan_fisik_id']) && $cat['pemeriksaan_fisik_id'] > 0
                ? $cat['pemeriksaan_fisik_id']
                : null;

            // 1️⃣ Simpan catatan layanan
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

            // 2️⃣ Simpan detail layanan + hitung total
            $totalBayar = 0;

            foreach ($cat['layanan'] as $item) {
                $layanan = Layanan::findOrFail($item['layanan_id']);

                CatatanLayananDetail::create([
                    'catatan_layanan_id' => $catatan->id,
                    'layanan_id' => $layanan->id,
                ]);

                $totalBayar += $layanan->harga;
            }

            // 3️⃣ Buat pembayaran (PENDING)
            Pembayaran::create([
                'klinik_id' => $cat['klinik_id'],
                'catatan_layanan_id' => $catatan->id,
                'total_bayar' => $totalBayar,
                'status' => 'pending',
                'resepsionis_id' => null,
            ]);

            // 4️⃣ Update status antrian
            $antrian->update([
                'status' => 'Selesai',
            ]);
        });


        return redirect()
            ->route('dokter.antrian.index')
            ->with('success', 'Catatan layanan berhasil disimpan');
    }
}
