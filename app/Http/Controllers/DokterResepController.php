<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Obat;
use App\Models\PemeriksaanFisik;
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
        if (!Auth::check()) {
            abort(401, 'Unauthorized');
        }

        $dokter = Auth::user()->dokter;

        if (!$dokter) {
            abort(403, 'Profil dokter tidak ditemukan.');
        }

        if ($antrian->dokter_id !== $dokter->id) {
            abort(403, 'Anda tidak berwenang menangani antrian ini.');
        }

        // Load relasi yang memang ada
        $antrian->load(['pasien', 'klinik']);
        $pemeriksaanFisik = PemeriksaanFisik::where('pasien_id', $antrian->pasien_id)
            ->where('klinik_id', $antrian->klinik_id)
            ->orderByDesc('created_at')
            ->first();

        return Inertia::render('Dokter/Resep/Create', [
            'pasien' => [
                'id' => $antrian->pasien->id,
                'nama_lengkap' => $antrian->pasien->nama_lengkap,
                'nomor_pasien' => $antrian->pasien->nomor_pasien,
                'tanggal_lahir' => $antrian->pasien->tanggal_lahir,
                'golongan_darah' => $antrian->pasien->golongan_darah,
                'riwayat_penyakit' => $antrian->pasien->riwayat_penyakit,
                'alergi' => $antrian->pasien->alergi,
            ],

            'pemeriksaan_fisik' => $pemeriksaanFisik
                ? [
                    'berat_badan' => $pemeriksaanFisik->berat_badan,
                    'tinggi_badan' => $pemeriksaanFisik->tinggi_badan,
                    'suhu_tubuh' => $pemeriksaanFisik->suhu_tubuh,
                    'tekanan_darah' => $pemeriksaanFisik->tekanan_darah,
                    'kondisi_khusus' => $pemeriksaanFisik->kondisi_khusus,
                ]
                : null,
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
