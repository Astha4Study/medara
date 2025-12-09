<?php

namespace App\Http\Controllers;

use App\Models\klinik;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ResepsionisPasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $pasien = Pasien::with('klinik')
            ->where('klinik_id', $user->klinik_id)
            ->latest()
            ->get();

        return Inertia::render('Resepsionis/Pasien/Index', [
            'pasien' => $pasien,
            'isSuperAdmin' => false,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        $klinik = Klinik::where('created_by', $user->created_by)->get();

        if ($klinik->isEmpty()) {
            return redirect()->route('resepsionis.klinik.index')->with(
                'warning',
                'Anda belum memiliki klinik.'
            );
        }

        return Inertia::render('Resepsionis/Pasien/Create', ['klinik' => $klinik]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $klinik = Klinik::where('created_by', $user->created_by)->first();

        $validated = $request->validate([
            'nomor_pasien' => 'nullable|string|max:30|unique:pasien,nomor_pasien',
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:pasien,nik',
            'jenis_kelamin' => 'required|in:L,P',
            'tanggal_lahir' => 'required|date',
            'tempat_lahir' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_hp' => 'required|string|max:15',
            'golongan_darah' => 'nullable|string|max:3',
            'riwayat_penyakit' => 'nullable|string',
            'alergi' => 'nullable|string',
        ]);

        $validated['klinik_id'] = $klinik->id;
        $validated['created_by'] = $user->id;

        $pasien = Pasien::create($validated);

        return redirect()->route('resepsionis.antrian.createForPasien', ['pasien' => $pasien]);
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
    public function edit(Pasien $pasien)
    {
        $user = Auth::user();
        if ($pasien->created_by !== $user->id) {
            abort(403);
        }

        $klinik = Klinik::where('created_by', $user->id)->get();

        return Inertia::render('Resepsionis/Pasien/Edit', ['pasien' => $pasien, 'klinik' => $klinik]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pasien $pasien)
    {
        $user = Auth::user();
        if ($pasien->created_by !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'nomor_pasien' => 'nullable|string|max:30|unique:pasien,nomor_pasien,' . $pasien->id,
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:pasien,nik,' . $pasien->id,
            'jenis_kelamin' => 'required|in:L,P',
            'tanggal_lahir' => 'required|date',
            'tempat_lahir' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_hp' => 'required|string|max:15',
            'golongan_darah' => 'nullable|string|max:3',
            'riwayat_penyakit' => 'nullable|string',
            'alergi' => 'nullable|string',
        ]);

        $validated['klinik_id'] = $user->klinik_id;
        $pasien->update($validated);

        return redirect()->route('resepsionis.pasien.index')->with('success', 'Data pasien berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pasien $pasien)
    {
        $user = Auth::user();
        if ($pasien->created_by !== $user->id) {
            abort(403);
        }

        $pasien->delete();

        return redirect()->route('resepsionis.pasien.index')->with('success', 'Data pasien berhasil dihapus.');
    }
}
