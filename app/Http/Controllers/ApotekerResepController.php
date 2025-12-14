<?php

namespace App\Http\Controllers;

use App\Models\Resep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApotekerResepController extends Controller
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
        $user = Auth::user();

        $resep = Resep::where('id', $id)
            ->where('klinik_id', $user->klinik_id)
            ->firstOrFail();

        $resepAktif = Resep::where('klinik_id', $user->klinik_id)
            ->where('status', 'sedang_dibuat')
            ->where('id', '!=', $resep->id)
            ->first();

        if ($resepAktif) {
            return back()->withErrors([
                'message' => 'Masih ada resep yang sedang diproses. Selesaikan terlebih dahulu sebelum mengambil resep lain.',
            ]);
        }

        if ($resep->status === 'pending') {
            $resep->update([
                'status' => 'sedang_dibuat',
                'apoteker_id' => $user->id,
            ]);
        }

        return redirect()->route(
            'apoteker.resep-masuk.edit',
            $resep->id
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
