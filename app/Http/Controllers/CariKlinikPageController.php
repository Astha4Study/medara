<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use App\Models\Klinik;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CariKlinikPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kliniks = Klinik::with(['fasilitas', 'jamOperasional'])
            ->latest()
            ->get()
            ->map(function ($klinik) {
                $klinik->gambar = $klinik->gambar
                    ? asset('storage/' . $klinik->gambar)
                    : null;
                return $klinik;
            });

        $jenisCounts = Klinik::select('jenis_klinik')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('jenis_klinik')
            ->get();

        $fasilitasCounts = Fasilitas::withCount('kliniks')->get();

        return Inertia::render('(client)/CariKlinik/Index', [
            'kliniks' => $kliniks,
            'filters' => [
                'jenis_klinik' => $jenisCounts,
                'fasilitas' => $fasilitasCounts,
            ],
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
