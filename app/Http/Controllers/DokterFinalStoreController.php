<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\CatatanLayanan;
use App\Models\Obat;
use App\Models\Resep;
use App\Models\ResepDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DokterFinalStoreController extends Controller
{
    public function storeFinal(Request $request)
    {
        $cat = $request->input('catatan', []);
        $obatInput = $request->input('obat', []);

        // contoh bila butuh object
        $antrian = Antrian::find($cat['antrian_id'] ?? 0);
        if (! $antrian) {
            return Inertia::render('Dokter/Klinik/Index', ['error' => 'Antrian tidak ditemukan']);
        }

        DB::transaction(function () use ($cat, $obatInput, $antrian) {

            // Catatan layanan
            $catatan = CatatanLayanan::create([
                'sumber_input' => $antrian->klinik->punya_server ? 'server' : 'manual',
                'antrian_id' => $cat['antrian_id'] ?? null,
                'pasien_id' => $cat['pasien_id'] ?? null,
                'klinik_id' => $cat['klinik_id'] ?? null,
                'dokter_id' => Auth::user()->dokter->id,
                'nomor_pasien' => $antrian->pasien->nomor_pasien ?? null,
                'tanggal_kunjungan' => now(),
                'keluhan_utama' => $cat['keluhan_utama'] ?? '',
                'detail_keluhan' => $cat['detail_keluhan'] ?? '',
                'diagnosa' => $cat['diagnosa'] ?? '',
                'tindakan' => $cat['tindakan'] ?? '',
                'catatan_lain' => $cat['catatan_lain'] ?? '',
            ]);

            // Resep header
            $resep = Resep::create([
                'catatan_layanan_id' => $catatan->id,
                'pasien_id' => $cat['pasien_id'] ?? null,
                'klinik_id' => $cat['klinik_id'] ?? null,
                'dokter_id' => Auth::id(),
                'status' => 'pending',
                'total_harga' => 0,
            ]);

            // Detail resep
            $total = 0;
            foreach ($obatInput as $item) {
                $obat = Obat::find($item['obat_id'] ?? 0);
                if (! $obat) {
                    continue;
                }

                $subtotal = $obat->harga * ($item['jumlah'] ?? 0);
                $total += $subtotal;

                ResepDetail::create([
                    'resep_id' => $resep->id,
                    'obat_id' => $obat->id,
                    'jumlah' => $item['jumlah'] ?? 0,
                    'harga_satuan' => $obat->harga,
                    'aturan_pakai' => $item['penggunaan_obat'] ?? '',
                ]);
            }

            $resep->update(['total_harga' => $total]);

            $antrian->update([
                'status' => 'Selesai',
            ]);
        });

        // response sukses
        return redirect()->route('dokter.antrian.index')
            ->with('success', 'Catatan dan resep berhasil disimpan tanpa validasi.');
    }
}
