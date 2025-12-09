<?php

namespace App\Http\Controllers;

use App\Models\klinik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminKlinikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $klinik = Klinik::where('created_by', $user->id)->latest()->get();

        return Inertia::render('Admin/Klinik/Index', [
            'klinik' => $klinik,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Klinik/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'nama_klinik' => 'required|string|max:255',
            'jenis_klinik' => 'required|in:Umum,Gigi,THT,Kulit,Kandungan,Anak,Bedah,Mata,Saraf',
            'alamat' => 'required|string',
            'kota' => 'required|string',
            'provinsi' => 'nullable|string|max:255',
            'no_telepon' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'deskripsi' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
            'rating' => 'nullable|numeric',
            'kapasitas_total' => 'nullable|integer|min:0',
            'kapasitas_tersedia' => 'nullable|integer|min:0',
        ]);

        $validated['created_by'] = $user->id;

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('klinik', 'public');
        }

        $klinik = Klinik::create($validated);

        if (!$user->klinik_id) {
            $user->update(['klinik_id' => $klinik->id]);
        }

        return redirect()->route('admin.klinik.index')->with('success', 'Klinik berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Klinik $klinik)
    {
        // $user = Auth::user();

        // if ($klinik->created_by !== $user->id) {
        //     abort(403, 'Anda tidak memiliki izin melihat data ini.');
        // }

        // $klinik->load(['pasien']);

        // return Inertia::render('Admin/Klinik/Show', [
        //     'klinik' => $klinik,
        //     'pasien' => $klinik->pasien,
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Klinik $klinik)
    {
        $user = Auth::user();

        if ($klinik->created_by !== $user->id) {
            abort(403, 'Admin hanya bisa mengedit klinik yang dibuatnya.');
        }

        return Inertia::render('Admin/Klinik/Edit', [
            'klinik' => $klinik,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Klinik $klinik)
    {
        $user = Auth::user();

        if ($klinik->created_by !== $user->id) {
            abort(403, 'Admin hanya bisa memperbarui klinik yang dibuatnya.');
        }

        $validated = $request->validate([
            'nama_klinik' => 'required|string|max:255',
            'jenis_klinik' => 'required|in:Umum,Gigi,THT,Kulit,Kandungan,Anak,Bedah,Mata,Saraf',
            'alamat' => 'required|string',
            'kota' => 'required|string',
            'provinsi' => 'nullable|string|max:255',
            'no_telepon' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'deskripsi' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
            'rating' => 'nullable|numeric',
            'kapasitas_total' => 'nullable|integer|min:0',
            'kapasitas_tersedia' => 'nullable|integer|min:0',
        ]);

        $dataToUpdate = $validated;

        if ($request->hasFile('gambar')) {
            if ($klinik->gambar) {
                Storage::disk('public')->delete($klinik->gambar);
            }

            $path = $request->file('gambar')->store('klinik', 'public');
            $dataToUpdate['gambar'] = $path;
        }

        $klinik->update($dataToUpdate);

        return redirect()->route('admin.klinik.index')->with('success', 'Data klinik berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Klinik $klinik)
    {
        $user = Auth::user();

        if ($klinik->created_by !== $user->id) {
            abort(403, 'Admin hanya bisa menghapus klinik yang dibuatnya.');
        }

        if ($klinik->gambar && Storage::disk('public')->exists($klinik->gambar)) {
            Storage::disk('public')->delete($klinik->gambar);
        }

        $klinik->delete();

        return redirect()->route('admin.klinik.index')->with('success', 'Data klinik berhasil dihapus.');
    }
}
