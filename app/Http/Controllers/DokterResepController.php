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
    public function create(Request $request, Antrian $antrian)
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

        $obat = Obat::where('klinik_id', $antrian->klinik_id)->get();

        return Inertia::render('Dokter/Resep/Create', [
            'antrian' => $antrian,
            'pasien' => $antrian->pasien,
            'obat_list' => $obat,
            'catatan' => $request->all(),
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
