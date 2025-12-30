<?php

namespace App\Http\Controllers;

use App\Models\Klinik;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ClientKlinikController extends Controller
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
    public function show(string $slug)
    {
        if (! preg_match('/-(\d+)$/', $slug, $m)) {
            abort(404);
        }
        $id = (int) $m[1];

        $klinik = Klinik::with(['fasilitas', 'jamOperasional'])->findOrFail($id);

        $klinik->slug = Str::slug($klinik->nama_klinik) . '-' . $klinik->id;

        $klinik->gambar = asset('storage/'.$klinik->gambar);

        return Inertia::render('(client)/Klinik/Show', [
            'klinik' => $klinik,
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
