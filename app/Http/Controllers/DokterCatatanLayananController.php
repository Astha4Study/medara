<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\CatatanLayanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DokterCatatanLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $dokter = $user->dokter;

        if (!$dokter) {
            abort(404, 'Data dokter tidak ditemukan');
        }

        $catatan = CatatanLayanan::with(['pasien', 'antrian'])
            ->where('dokter_id', $dokter->id) // gunakan $dokter->id, bukan $user->id
            ->where('klinik_id', $user->klinik_id)
            ->latest('updated_at')
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'nomor_pasien' => $c->pasien?->nomor_pasien ?? '',
                'nama_lengkap' => $c->pasien?->nama_lengkap ?? '',
                'tanggal_kunjungan' => $c->tanggal_kunjungan,
                'keluhan_utama' => $c->keluhan_utama,
                'diagnosa' => $c->diagnosa,
                'tindakan' => $c->tindakan,
                'catatan_lain' => $c->catatan_lain,
                'tanggal_ditangani' => $c->updated_at->format('d M Y'),
            ]);

        return Inertia::render('Dokter/CatatanLayanan/Index', [
            'catatan' => $catatan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Antrian $antrian)
    {
        // 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $dokter = $user->dokter;

        $validated = $request->validate([
            'antrian_id' => 'required|exists:antrian,id',
            'detail_keluhan' => 'nullable|string',
            'diagnosa' => 'nullable|string',
            'tindakan' => 'nullable|string',
            'catatan_lain' => 'nullable|string',
        ]);

        $antrian = Antrian::findOrFail($validated['antrian_id']);

        $sumberInput = $antrian->klinik->punya_server ? 'server' : 'manual';

        $nomorPasien = $antrian->pasien->nomor_pasien;

        CatatanLayanan::create(attributes: [
            'sumber_input' => $sumberInput,
            'pasien_id' => $antrian->pasien_id,
            'klinik_id' => $antrian->klinik_id,
            'dokter_id' => $dokter->id,
            'antrian_id' => $antrian->id,
            'nomor_pasien' => $nomorPasien,
            'tanggal_kunjungan' => $antrian->tanggal_kunjungan,
            'keluhan_utama' => $antrian->keluhan,
            'detail_keluhan' => $validated['detail_keluhan'],
            'diagnosa' => $validated['diagnosa'],
            'tindakan' => $validated['tindakan'],
            'catatan_lain' => $validated['catatan_lain'],
        ]);

        return redirect()->route('dokter.catatan-layanan.index')
            ->with('success', 'Catatan layanan berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $dokter = Auth::user()->dokter;

        $tindakan = CatatanLayanan::with(['pasien', 'dokter'])
            ->where('id', $id)
            ->where('dokter_id', $dokter->id)
            ->firstOrFail();

        return Inertia::render('Dokter/catatan-layanan/Show', [
            'tindakan' => $tindakan,
        ]);
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
    public function update(Request $request, $id)
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
