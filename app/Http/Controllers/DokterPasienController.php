<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DokterPasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if (! $user->hasRole('dokter')) {
            abort(403, 'Hanya dokter yang dapat mengakses halaman ini.');
        }

        // Ambil data dokter SECARA EKSPLISIT
        $dokter = $user->dokter()->with('klinik')->first();

        if (! $dokter) {
            abort(404, 'Data dokter tidak ditemukan.');
        }

        $pasien = Pasien::with('klinik')
            ->where('klinik_id', $dokter->klinik_id)
            ->latest()
            ->get();

        return Inertia::render('Dokter/Pasien/Index', [
            'pasien' => $pasien,
            'dokter' => $dokter,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(Pasien $pasien)
    {
        $user = Auth::user();

        if (! $user->hasRole('dokter')) {
            abort(403);
        }

        $dokter = $user->dokter;

        if (! $dokter) {
            abort(404, 'Data dokter tidak ditemukan.');
        }

        // VALIDASI KLINIK YANG BENAR
        if ($pasien->klinik_id !== $dokter->klinik_id) {
            abort(403, 'Pasien bukan milik klinik Anda.');
        }

        $pasien->load('klinik');

        return Inertia::render('Dokter/Pasien/Show', [
            'pasien' => $pasien,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pasien $pasien)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pasien $pasien)
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
