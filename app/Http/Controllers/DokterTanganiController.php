<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\PemeriksaanFisik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DokterTanganiController extends Controller
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
        $dokter = Auth::user()->dokter;

        if (!$dokter || $antrian->dokter_id !== $dokter->id) {
            abort(404, 'Antrian tidak ditemukan untuk dokter ini');
        }

        $antrian->load('pasien', 'klinik');

        $pemeriksaanFisik = PemeriksaanFisik::where('pasien_id', $antrian->pasien_id)
            ->where('klinik_id', $antrian->klinik_id)
            ->latest()
            ->first();

        return Inertia::render('Dokter/Tangani/Create', [
            'antrian' => $antrian->only('id', 'keluhan', 'tanggal_kunjungan'),
            'pasien' => $antrian->pasien->only('id', 'nama_lengkap', 'nomor_pasien', 'nik', 'tanggal_lahir', 'tempat_lahir', 'no_hp', 'golongan_darah', 'riwayat_penyakit', 'alergi'),
            'pemeriksaan_fisik' => $pemeriksaanFisik?->only('id', 'berat_badan', 'tinggi_badan', 'suhu_tubuh', 'tekanan_darah', 'kondisi_khusus'),
            'klinik' => $antrian->klinik->only('id'),
            'punya_server' => $antrian->klinik->punya_server,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
