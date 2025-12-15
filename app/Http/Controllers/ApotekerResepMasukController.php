<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Resep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApotekerResepMasukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $resep = Resep::with([
            'pasien:id,nama_lengkap,nomor_pasien',
            'dokter:id,name',
        ])
            ->where('klinik_id', $user->klinik_id)
            ->whereIn('status', ['pending', 'sedang_dibuat'])
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(fn($item) => [
                'id' => $item->id,
                'pasien_nama' => $item->pasien->nama_lengkap,
                'nomor_pasien' => $item->pasien->nomor_pasien,
                'dokter_nama' => $item->dokter->name ?? '-',
                'status' => $item->status,
                'total_harga' => $item->total_harga,
                'created_at' => $item->created_at->toISOString(),
            ]);

        return Inertia::render('Apoteker/ResepMasuk/Index', [
            'resep' => $resep,
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
        $resep = Resep::with([
            'pasien:id,nama_lengkap,nomor_pasien,nik,riwayat_penyakit',
            'dokter:id,name',
            'catatanLayanan:id,diagnosa',
            'resepDetail.obat:id,nama_obat,satuan,harga',
        ])->findOrFail($id);

        return Inertia::render('Apoteker/ResepMasuk/Edit', [
            'resep' => [
                'id' => $resep->id,
                'status' => $resep->status,
                'total_harga' => $resep->total_harga,

                'pasien' => [
                    'nama_lengkap' => $resep->pasien->nama_lengkap,
                    'nomor_pasien' => $resep->pasien->nomor_pasien,
                    'nik' => $resep->pasien->nik,
                    'riwayat_penyakit' => $resep->pasien->riwayat_penyakit,
                ],

                'dokter' => [
                    'nama' => $resep->dokter->name ?? '-',
                ],

                'diagnosa' => $resep->catatanLayanan->diagnosa ?? '-',

                'detail' => $resep->resepDetail->map(fn($d) => [
                    'id' => $d->id,
                    'nama_obat' => $d->obat->nama_obat,
                    'jumlah' => $d->jumlah,
                    'satuan' => $d->obat->satuan,
                    'harga' => $d->obat->harga,
                    'subtotal' => $d->jumlah * $d->obat->harga,
                ]),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $resep = Resep::findOrFail($id);

        // update resep
        $resep->update([
            'status' => 'selesai',
            'apoteker_id' => Auth::id(),
        ]);

        if ($resep->pembayaran) {
            $resep->pembayaran()->update([
                'status' => 'pending',
            ]);
        } else {
            Pembayaran::create([
                'resep_id' => $resep->id,
                'resepsionis_id' => auth()->id(),
                'total_bayar' => $resep->total_harga,
                'status' => 'pending',
            ]);
        }

        return redirect()
            ->route('apoteker.resep-masuk.index')
            ->with('success', 'Resep berhasil disiapkan dan pembayaran menunggu.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
