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
            abort(404, "Data dokter tidak ditemukan");
        }

        $catatan = CatatanLayanan::with(['pasien', 'antrian'])
            ->where('dokter_id', $dokter->id)
            ->orderBy('tanggal_kunjungan', 'desc')
            ->get();

        return Inertia::render('Dokter/CatatanLayanan/Index', [
            'catatan' => $catatan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Antrian $antrian)
    {
        $dokter = Auth::user()->dokter;

        if (!$dokter || $antrian->dokter_id !== $dokter->id) {
            abort(404, "Antrian tidak ditemukan untuk dokter ini");
        }

        $antrian->load('pasien');

        return Inertia::render('Dokter/Tangani/Create', [
            'antrian' => $antrian,
            'pasien' => $antrian->pasien,
            'keluhan_utama' => $antrian->keluhan,
            'punya_server' => $antrian->klinik->punya_server,
        ]);
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
