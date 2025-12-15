<?php

namespace App\Http\Controllers;

use App\Models\Resep;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApotekerPenyerahanObatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reseps = Resep::with([
            'pasien:id,nama_lengkap,nomor_pasien',
            'dokter:id,name',
            'pembayaran:id,resep_id,status',
        ])
            ->whereHas('pembayaran', function ($q) {
                $q->where('status', 'lunas');
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($resep) {
                return [
                    'id' => $resep->id,
                    'nomor_resep' => 'RSP-'.str_pad($resep->id, 6, '0', STR_PAD_LEFT),
                    'nomor_pasien' => $resep->pasien->nomor_pasien ?? '-',
                    'pasien_nama' => $resep->pasien->nama_lengkap ?? '-',
                    'dokter_nama' => $resep->dokter->name ?? '-',
                    'total_harga' => $resep->total_harga,
                    'status_pembayaran' => $resep->pembayaran->status ?? '-',
                    'tanggal' => $resep->created_at->format('d F Y'),
                ];
            });

        return Inertia::render('Apoteker/PenyerahanObat/Index', [
            'reseps' => $reseps,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        $resep = Resep::with([
            'pasien:id,nama_lengkap,nomor_pasien,nik,riwayat_penyakit',
            'dokter:id,name',
            'resepDetail:id,resep_id,obat_id,jumlah,harga_satuan',
            'resepDetail.obat:id,nama_obat,satuan,harga',
            'catatanLayanan:id,diagnosa',
        ])->findOrFail($id);

        return Inertia::render('Apoteker/PenyerahanObat/Create', [
            'resep' => [
                'id' => $resep->id,
                'total_harga' => $resep->total_harga,
                'status' => $resep->status ?? 'belum_bayar',
                'diagnosa' => optional($resep->catatanLayanan)->diagnosa ?? '-',
                'pasien' => [
                    'nama_lengkap' => $resep->pasien->nama_lengkap,
                    'nomor_pasien' => $resep->pasien->nomor_pasien,
                    'nik' => $resep->pasien->nik,
                    'riwayat_penyakit' => $resep->pasien->riwayat_penyakit,
                ],
                'dokter' => [
                    'nama' => $resep->dokter->name ?? '-',
                ],
                'detail' => $resep->resepDetail->map(fn ($d) => [
                    'id' => $d->id,
                    'nama_obat' => $d->obat->nama_obat ?? '-',
                    'jumlah' => $d->jumlah,
                    'satuan' => $d->obat->satuan ?? '-',
                    'harga' => $d->harga_satuan,
                    'subtotal' => $d->jumlah * $d->harga_satuan,
                ]),
            ],
        ]);
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
