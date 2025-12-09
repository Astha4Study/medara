<?php

namespace App\Http\Controllers;

use App\Models\Klinik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminPengaturanController extends Controller
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
    public function edit()
    {
        $user = Auth::user();
        $klinik = Klinik::where('created_by', $user->id)->firstOrFail();

        return Inertia::render('Admin/Pengaturan/Page', [
            'klinik' => $klinik->only(['id', 'punya_apoteker', 'punya_server']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        $klinik = Klinik::where('created_by', $user->id)->firstOrFail();

        $request->merge([
            'punya_apoteker' => filter_var($request->punya_apoteker, FILTER_VALIDATE_BOOLEAN),
            'punya_server' => filter_var($request->punya_server, FILTER_VALIDATE_BOOLEAN),
        ]);

        $validated = $request->validate([
            'punya_apoteker' => 'required|boolean',
            'punya_server' => 'required|boolean',
        ]);

        $klinik->update($validated);

        return redirect()->route('admin.pengaturan.update')
            ->with('success', 'Pengaturan berhasil disimpan.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
