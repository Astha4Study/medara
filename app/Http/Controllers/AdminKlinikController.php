<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use App\Models\klinik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
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
        $fasilitas = Fasilitas::all();

        return Inertia::render('Admin/Klinik/Create', [
            'fasilitas' => $fasilitas,
        ]);

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
            'fasilitas' => 'nullable|array',
            'fasilitas.*' => 'integer|exists:fasilitas,id',

            'jam_operasional' => 'nullable|array',
            'jam_operasional.*.hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'jam_operasional.*.tutup' => 'boolean',
            // HAPUS validasi format H:i dari sini
        ]);

        // Validasi: kedua jam harus diisi jika tidak tutup
        if ($request->filled('jam_operasional')) {
            foreach ($request->jam_operasional as $index => $jam) {
                // Skip jika hari tutup
                if ($jam['tutup'] ?? false) {
                    continue;
                }

                // Validasi minimal kedua jam harus ada
                if (empty($jam['jam_buka']) || empty($jam['jam_tutup'])) {
                    return back()
                        ->withErrors(["jam_operasional.{$index}" => "Jam buka dan jam tutup harus diisi untuk hari {$jam['hari']}"])
                        ->withInput();
                }
            }
        }

        $validated['created_by'] = $user->id;
        $validated['punya_apoteker'] = true;

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('klinik', 'public');
        }

        $klinik = Klinik::create($validated);

        if ($request->filled('fasilitas')) {
            $klinik->fasilitas()->sync($request->fasilitas);
        }

        if ($request->filled('jam_operasional')) {
            $openDays = collect($request->jam_operasional)->filter(fn($jam) => !($jam['tutup'] ?? false));
            if ($openDays->isEmpty()) {
                return back()
                    ->withErrors(['jam_operasional' => 'Minimal 1 hari harus buka'])
                    ->withInput();
            }

            foreach ($request->jam_operasional as $jam) {
                $klinik->jamOperasional()->create([
                    'hari' => $jam['hari'],
                    'jam_buka' => $jam['tutup'] ? null : ($jam['jam_buka'] ?? null),
                    'jam_tutup' => $jam['tutup'] ? null : ($jam['jam_tutup'] ?? null),
                    'tutup' => $jam['tutup'] ?? false,
                ]);
            }
        }

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
        //    
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

        $fasilitas = Fasilitas::all();

        return Inertia::render('Admin/Klinik/Edit', [
            'klinik' => $klinik->load('fasilitas', 'jamOperasional'),
            'fasilitas' => Fasilitas::all(),
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

        // 1. Validasi dasar tanpa format jam
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
            'fasilitas' => 'nullable|array',
            'fasilitas.*' => 'integer|exists:fasilitas,id',

            'jam_operasional' => 'nullable|array',
            'jam_operasional.*.hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'jam_operasional.*.tutup' => 'boolean',
            // HAPUS semua validasi format jam dari sini
        ]);

        // 2. Validasi sederhana: hanya cek jika tidak tutup
        if ($request->filled('jam_operasional')) {
            $openDays = collect($request->jam_operasional)->filter(fn($jam) => !($jam['tutup'] ?? false));
            if ($openDays->isEmpty()) {
                return back()
                    ->withErrors(['jam_operasional' => 'Minimal 1 hari harus buka'])
                    ->withInput();
            }
        }

        // 3. Update data
        $dataToUpdate = collect($validated)->except('jam_operasional')->toArray();

        if ($request->hasFile('gambar')) {
            if ($klinik->gambar) {
                Storage::disk('public')->delete($klinik->gambar);
            }
            $path = $request->file('gambar')->store('klinik', 'public');
            $dataToUpdate['gambar'] = $path;
        }

        $klinik->update($dataToUpdate);
        $klinik->fasilitas()->sync($request->fasilitas ?? []);

        // 4. Update jam operasional
        if ($request->filled('jam_operasional')) {
            $klinik->jamOperasional()->delete();
            foreach ($request->jam_operasional as $jam) {
                $klinik->jamOperasional()->create([
                    'hari' => $jam['hari'],
                    'jam_buka' => $jam['tutup'] ? null : ($jam['jam_buka'] ?? null),
                    'jam_tutup' => $jam['tutup'] ? null : ($jam['jam_tutup'] ?? null),
                    'tutup' => $jam['tutup'] ?? false,
                ]);
            }
        }

        return redirect()->route('admin.klinik.index')
            ->with('success', 'Data klinik berhasil diperbarui.');
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
