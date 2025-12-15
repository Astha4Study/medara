<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Dokter;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ResepsionisAntrianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if (!$user->hasRole('resepsionis')) {
            abort(403);
        }

        $antrian = Antrian::with([
            'pasien:id,nomor_pasien,nama_lengkap',
            'dokter' => function ($q) {
                $q->select('id', 'user_id', 'klinik_id', 'status', 'antrian_saat_ini');
                $q->with(['user:id,name']);
            }

        ])
            ->where('klinik_id', $user->klinik_id)
            ->whereDate('tanggal_kunjungan', now()->toDateString())
            ->orderBy('nomor_antrian', 'asc')
            ->get()
            ->map(function ($a) {
                return [
                    'id' => $a->id,
                    'nomor_antrian' => $a->nomor_antrian,
                    'nomor_pasien' => $a->pasien->nomor_pasien,
                    'pasien_nama' => $a->pasien->nama_lengkap,
                    'dokter_nama' => $a->dokter?->user?->name ?? '-',
                    'keluhan' => $a->keluhan,
                    'status' => $a->status,
                    'created_at' => $a->created_at?->toISOString(),
                ];
            });


        return Inertia::render('Resepsionis/Antrian/Index', [
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
     * Form for creating a new resource from pasien.
     */
    public function createForPasien($pasienId)
    {
        $user = Auth::user();

        if (!$user->hasRole('resepsionis')) {
            abort(403);
        }

        $pasien = Pasien::where('klinik_id', $user->klinik_id)
            ->findOrFail($pasienId);

        $dokter = Dokter::where('klinik_id', $user->klinik_id)
            ->where('status', 'tersedia')
            ->with('user:id,name')
            ->get()
            ->map(fn($d) => [
                'id' => $d->id,
                'name' => $d->user->name
            ]);

        return Inertia::render('Resepsionis/Antrian/Create', [
            'pasien' => $pasien,
            'dokter' => $dokter,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user->hasRole('resepsionis')) {
            abort(403);
        }

        $validated = $request->validate([
            'pasien_id' => 'required|exists:pasien,id',
            'dokter_id' => 'nullable|exists:dokter,id',
            'keluhan' => 'nullable|string',
            'tanggal_kunjungan' => 'required|date',
        ]);

        $klinikId = $user->klinik_id;

        // Hitung nomor antrian harian
        $todayReset = now()->setTime(3, 0, 0);

        if (now()->lessThan($todayReset)) {
            $start = now()->subDay()->setTime(3, 0, 0);
            $end = now()->setTime(2, 59, 59);
        } else {
            $start = $todayReset;
            $end = now()->addDay()->setTime(2, 59, 59);
        }

        $nomor = Antrian::where('klinik_id', $user->klinik_id)
            ->whereBetween('created_at', [$start, $end])
            ->max('nomor_antrian') + 1;

        Antrian::create([
            'nomor_antrian' => $nomor,
            'pasien_id' => $validated['pasien_id'],
            'dokter_id' => $validated['dokter_id'] ?? null,
            'klinik_id' => $klinikId,
            'keluhan' => $validated['keluhan'] ?? null,
            'tanggal_kunjungan' => $validated['tanggal_kunjungan'],
            'status' => 'Menunggu',
        ]);

        return redirect()
            ->route('resepsionis.antrian.index')
            ->with('success', 'Antrian berhasil ditambahkan!');
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
