<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\CatatanLayanan;
use App\Models\Obat;
use App\Models\Resep;
use App\Models\ResepDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DokterResepController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Antrian $antrian)
    {
        if ($antrian->dokter_id !== Auth::user()->dokter?->id) {
            abort(403);
        }

        $klinikId = $antrian->klinik_id;

        $obat = Obat::where('klinik_id', $klinikId)->get();

        return Inertia::render('Dokter/Resep/Create', [
            'antrian' => $antrian,
            'pasien' => $antrian->pasien,
            'obat_list' => $obat,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeFinal(Request $request)
    {
        $temp = session('temp_catatan_layanan');
        if (!$temp)
            abort(400);

        $request->validate([
            'obat' => 'required|array|min:1',
            'obat.*.obat_id' => 'required|exists:obat,id',
            'obat.*.jumlah' => 'required|integer|min:1',
            'obat.*.aturan_pakai' => 'required|string',
        ]);

        // 1. Buat catatan layanan
        $catatan = CatatanLayanan::create([
            'antrian_id' => $temp['antrian_id'],
            'pasien_id' => $temp['pasien_id'],
            'klinik_id' => $temp['klinik_id'],
            'dokter_id' => Auth::user()->dokter->id,
            'keluhan_utama' => $temp['data']['keluhan_utama'],
            'detail_keluhan' => $temp['data']['detail_keluhan'],
            'diagnosa' => $temp['data']['diagnosa'],
            'tindakan' => $temp['data']['tindakan'],
            'catatan_lain' => $temp['data']['catatan_lain'],
            'tanggal_kunjungan' => now(),
        ]);

        // 2. Buat resep
        $resep = Resep::create([
            'catatan_layanan_id' => $catatan->id,
            'pasien_id' => $temp['pasien_id'],
            'klinik_id' => $temp['klinik_id'],
            'dokter_id' => Auth::user()->dokter->id,
            'status' => 'pending',
            'total_harga' => 0,
        ]);

        // 3. Detail resep
        foreach ($request->obat as $item) {
            ResepDetail::create([
                'resep_id' => $resep->id,
                'obat_id' => $item['obat_id'],
                'jumlah' => $item['jumlah'],
                'aturan_pakai' => $item['aturan_pakai'],
            ]);
        }

        session()->forget('temp_catatan_layanan');

        return redirect()->route('dokter.catatan-layanan.index')
            ->with('success', 'Catatan dan resep berhasil dibuat.');
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
