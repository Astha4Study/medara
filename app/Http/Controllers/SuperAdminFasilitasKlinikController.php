<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuperAdminFasilitasKlinikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fasilitas = Fasilitas::all();

        return Inertia::render('SuperAdmin/Fasilitas/Index', [
            'fasilitas' => $fasilitas,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('SuperAdmin/Fasilitas/Create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255|unique:fasilitas,nama',
        ]);

        Fasilitas::create([
            'nama' => $request->nama,
        ]);

        return redirect()->route('super_admin.fasilitas-klinik.index')->with('success', 'Fasilitas berhasil ditambahkan.');

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
                $fasilitas = Fasilitas::findOrFail($id);

        return Inertia::render('SuperAdmin/Fasilitas/Edit', [
            'fasilitas' => $fasilitas,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $fasilitas = Fasilitas::findOrFail($id);

        $request->validate([
            'nama' => 'required|string|max:255|unique:fasilitas,nama,' . $fasilitas->id,
        ]);

        $fasilitas->update([
            'nama' => $request->nama,
        ]);

        return redirect()->route('super_admin.fasilitas-klinik.index')
                         ->with('success', 'Fasilitas berhasil diperbarui.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $fasilitas = Fasilitas::findOrFail($id);
        $fasilitas->delete();

        return redirect()->route('super_admin.fasilitas-klinik.index')
                         ->with('success', 'Fasilitas berhasil dihapus.');
    }
}
