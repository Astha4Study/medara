<?php

namespace App\Http\Controllers;

use App\Models\PasienOnline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function ProfileIndex()
    {
        $user = Auth::user();

        return Inertia::render('(client)/Profile/Index', [
            'user' => $user,
            'tab' => 'profile',
        ]);
    }

    /**
     * Display a riwayat resource
     */
    public function riwayatIndex()
    {
        $user = Auth::user();

        $riwayat = PasienOnline::where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(fn($r) => [
                'id' => $r->id,
                'tanggal' => $r->created_at->format('d-m-Y H:i'),
                'status' => $r->status,
                'klinik' => $r->klinik->nama_klinik ?? null,
                'nomor_pendaftaran' => $r->nomor_pendaftaran,
            ]);

        return Inertia::render('(client)/Profile/Riwayat', [
            'riwayat' => $riwayat,
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
