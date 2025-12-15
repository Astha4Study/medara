<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\Klinik;
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

        if (!$user->hasRole('dokter')) {
            abort(403, 'Hanya dokter yang dapat mengakses halaman ini.');
        }

        $pasien = Pasien::with('klinik')
            ->where('klinik_id', $user->klinik_id)
            ->latest()
            ->get();

        return Inertia::render('Dokter/Pasien/Index', [
            'pasien' => $pasien,
            'isDokter' => true,
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

        $dokter = Dokter::where('user_id', $user->id)->first();

        if (!$dokter) {
            abort(403, 'Data dokter tidak ditemukan.');
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
