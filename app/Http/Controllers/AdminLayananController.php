<?php

namespace App\Http\Controllers;

use App\Models\DetailLayanan;
use App\Models\Klinik;
use App\Models\Layanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $klinik = Klinik::where('created_by', $user->id)->first();

        $layanan = Layanan::with('detail_layanan')
            ->where('klinik_id', $user->klinik_id)
            ->orderBy('nama_layanan', 'asc')
            ->get();

        return Inertia::render('Admin/Layanan/Index', [
            'layanan' => $layanan,
            'role' => $user->role,
            'klinik' => $klinik,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        $klinik = Klinik::where('created_by', $user->id)->first();

        if (! $klinik) {
            return redirect()->route('admin.klinik.index')
                ->with('error', 'Anda harus membuat klinik terlebih dahulu sebelum menambah layanan.');
        }

        return Inertia::render('Admin/Layanan/Create', [
            'klinik' => $klinik,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $request->merge([
            'aktif' => filter_var($request->aktif, FILTER_VALIDATE_BOOLEAN),
        ]);

        $validated = $request->validate([
            'nama_layanan' => 'required|string|max:255',
            'harga' => 'required|integer|min:0',
            'aktif' => 'boolean',
            'keterangan' => 'required|string',
        ]);

        $validated['klinik_id'] = $user->klinik_id;

        $layanan = Layanan::create($validated);

        DetailLayanan::create([
            'klinik_id' => $user->klinik_id,
            'layanan_id' => $layanan->id,
            'keterangan' => $validated['keterangan'],
        ]);

        return redirect()->route('admin.layanan.index')->with('succes', 'Layanan berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = Auth::user();

        $layanan = Layanan::with('detail_layanan')
            ->where('id', $id)
            ->where('klinik_id', $user->klinik_id)
            ->firstOrFail();

        return Inertia::render('Admin/Layanan/Show', [
            'layanan' => $layanan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Layanan $layanan)
    {
        $user = Auth::user();

        if ($layanan->klinik_id !== $user->klinik_id) {
            abort(403, 'Tidak boleh mengedit layanan klinik lain.');
        }

        $layanan->load('detail_layanan');

        return Inertia::render('Admin/Layanan/Edit', [
            'layanan' => $layanan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Layanan $layanan)
    {
        $user = Auth::user();

        if ($layanan->klinik_id !== $user->klinik_id) {
            abort(403);
        }

        $request->merge([
            'aktif' => filter_var($request->aktif, FILTER_VALIDATE_BOOLEAN),
        ]);

        $validated = $request->validate([
            'nama_layanan' => 'required|string|max:255',
            'harga' => 'required|integer|min:0',
            'aktif' => 'boolean',
            'keterangan' => 'required|string',
        ]);

        $layanan->update([
            'nama_layanan' => $validated['nama_layanan'],
            'harga' => $validated['harga'],
            'aktif' => $validated['aktif'],
        ]);

        $layanan->detail_layanan()->delete();

        $detail_layanan = array_map('trim', explode(',', $validated['keterangan']));

        foreach ($detail_layanan as $det) {
            if (! empty($det)) {
                $layanan->detail_layanan()->create([
                    'klinik_id' => $user->klinik_id,
                    'keterangan' => $det,
                ]);
            }
        }

        return redirect()->route('admin.layanan.index')->with('success', 'Layanan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Layanan $layanan)
    {
        $user = Auth::user();

        if ($layanan->klinik_id !== $user->klinik_id) {
            abort(403);
        }

        $layanan->delete();

        return redirect()->route('admin.layanan.index')->with('success', 'Layanan berhasil dihapus.');
    }
}
