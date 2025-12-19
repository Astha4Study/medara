<?php

namespace App\Http\Controllers;

use App\Models\Obat;
use App\Models\Pembayaran;
use App\Models\Resep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApotekerResepDetailController extends Controller
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
    public function store(Request $request, string $id)
    {
        $resep = Resep::findOrFail($id);

        $request->validate([
            'detail' => 'required|array',
            'detail.*.obat_id' => 'nullable|integer|exists:obat,id',
            'detail.*.nama_obat' => 'required|string',
            'detail.*.jumlah' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request, $resep) {

            $resep->resepDetail()->delete();

            $total = 0;

            foreach ($request->detail as $item) {
                $harga = Obat::where('id', $item['obat_id'])
                    ->where('klinik_id', $resep->klinik_id)
                    ->value('harga') ?? 0;
                $total += $item['jumlah'] * $harga;

                $resep->resepDetail()->create([
                    'resep_id' => $resep->id,
                    'obat_id' => $item['obat_id'] ?? null,
                    'nama_obat' => $item['nama_obat'],
                    'jumlah' => $item['jumlah'],
                    'harga_satuan' => $harga,
                ]);
            }

            $resep->update(['total_harga' => $total, 'status' => 'selesai']);

            Pembayaran::updateOrCreate(
                ['resep_id' => $resep->id],
                [
                    'klinik_id' => $resep->klinik_id,
                    'total_bayar' => $total,
                    'status' => 'pending',
                ]
            );
        });

        return redirect()
            ->route('apoteker.resep-masuk.index')
            ->with('success', 'Resep selesai, silakan bayar.');
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
