<?php

namespace App\Http\Controllers;

use App\Http\Requests\ObatRequest;
use App\Models\Obat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApotekerObatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $klinikId = $user->klinik_id;

        $obat = Obat::where('klinik_id', $klinikId)->orderBy('nama_obat')->get();

        return Inertia::render('Apoteker/DaftarObat/Index', [
            'obat' => $obat
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Apoteker/DaftarObat/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ObatRequest $request)
    {
        $user = Auth::user();

        Obat::create([
            'klinik_id' => $user->klinik_id,
            ...$request->validated(),
        ]);

        return redirect()->route('apoteker.daftarobat.index')->with('success', 'Obat berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Obat $obat)
    {
        if ($obat->klinik_id !== auth()->user()->klinik_id) {
            abort(403);
        }

        return Inertia::render('Apoteker/DaftarObat/Show', [
            'obat' => $obat
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Obat $obat)
    {
        return Inertia::render('Apoteker/DaftarObat/Edit', [
            'obat' => $obat
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ObatRequest $request, Obat $obat)
    {
        $obat->update($request->validated());

        return redirect()->route('apoteker.daftarobat.index')->with('success', 'Obat berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Obat $obat)
    {
        if ($obat->klinik_id !== auth()->user()->klinik_id) {
            abort(403);
        }

        $obat->delete();

        return back()->with('success', 'Obat berhasil dihapus.');
    }
}
