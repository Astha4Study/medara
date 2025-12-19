<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Dokter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DokterAntrianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        // dd(Auth::id(), Auth::user()->role, Auth::user()->dokter);

        $dokter = $user->dokter;

        if (! $dokter) {
            abort(404, 'Data dokter tidak ditemukan');
        }

        $antrian = Antrian::with(['pasien:id,nomor_pasien,nama_lengkap'])
            ->where('dokter_id', $dokter->id)
            ->orderBy('nomor_antrian', 'asc')
            ->get()
            ->map(function ($a) {
                return [
                    'id' => $a->id,
                    'nomor_antrian' => $a->nomor_antrian,
                    'nomor_pasien' => $a->pasien?->nomor_pasien ?? '-',
                    'pasien_nama' => $a->pasien?->nama_lengkap ?? '-',
                    'keluhan' => $a->keluhan ?? '-',
                    'status' => $a->status,
                    'created_at' => $a->created_at?->toISOString(),
                ];
            });

        return Inertia::render('Dokter/Antrian/Index', [
            'antrian' => $antrian,
        ]);
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
        $dokter = Dokter::where('user_id', $user->id)->firstOrFail();

        $antrian = Antrian::findOrFail($id);

        // Jika antrian ini sudah sedang diperiksa oleh dokter yang sama → langsung masuk lagi
        if ($antrian->status === 'Sedang diperiksa' && $antrian->dokter_id === $dokter->id) {
            return redirect()->route('dokter.tangani.create', $antrian->id)
                ->with('info', 'Anda melanjutkan pemeriksaan pasien yang sedang diperiksa.');
        }

        // Cek apakah dokter sedang menangani pasien lain (exclude antrian ini)
        $sedang = Antrian::where('dokter_id', $dokter->id)
            ->where('status', 'Sedang diperiksa')
            ->where('id', '!=', $antrian->id) // <-- tambahkan ini
            ->first();

        if ($sedang) {
            return back()->withErrors([
                'message' => 'Anda sudah menangani pasien lain. Selesaikan dulu sebelum menangani pasien baru.',
            ]);
        }

        // Kalau belum ada pasien aktif, update status
        $antrian->status = 'Sedang diperiksa';
        $antrian->dokter_id = $dokter->id;
        $antrian->save();

        return redirect()->route('dokter.tangani.create', $antrian->id)
            ->with('success', 'Status antrian berhasil diperbarui menjadi Sedang diperiksa.');
    }

    //     public function update(Request $request, string $id)
    // {
    //     $user = Auth::user();
    //     $dokter = Dokter::where('user_id', $user->id)->firstOrFail();

    //     $antrian = Antrian::findOrFail($id);

    //     // Kalau dokter klik antrian yang sama
    //     if (
    //         $antrian->status === 'Sedang diperiksa' &&
    //         $antrian->dokter_id === $dokter->id
    //     ) {
    //         return redirect()
    //             ->route('dokter.tangani.create', $antrian->id);
    //     }

    //     // Cek apakah masih menangani pasien lain
    //     $sedang = Antrian::where('dokter_id', $dokter->id)
    //         ->where('status', 'Sedang diperiksa')
    //         ->where('id', '!=', $antrian->id)
    //         ->first();

    //     if ($sedang) {
    //         return back()->withErrors([
    //             'message' =>
    //                 'Anda masih menangani pasien lain. Selesaikan terlebih dahulu.',
    //         ]);
    //     }

    //     // Klaim antrian
    //     $antrian->update([
    //         'status' => 'Sedang diperiksa',
    //         'dokter_id' => $dokter->id,
    //     ]);

    //     return redirect()->route('dokter.tangani.create', $antrian->id);
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
