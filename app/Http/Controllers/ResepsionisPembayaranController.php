<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Resep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ResepsionisPembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pembayarans = Pembayaran::with([
            'resep.pasien:id,nama_lengkap,nomor_pasien',
            'resep.dokter:id,name',
        ])
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($pembayaran) {
                $resep = $pembayaran->resep;

                return [
                    'id' => $pembayaran->id,
                    'nomor_resep' => 'RSP-' . str_pad($resep->id, 6, '0', STR_PAD_LEFT),
                    'nomor_pasien' => $resep->pasien->nomor_pasien ?? '-',
                    'pasien_nama' => $resep->pasien->nama_lengkap ?? '-',
                    'dokter_nama' => $resep->dokter->name ?? '-',
                    'total_harga' => $resep->total_harga,
                    'status_pembayaran' => $pembayaran->status,
                    'tanggal' => $pembayaran->created_at->format('d F Y'),
                ];
            });

        return Inertia::render('Resepsionis/Pembayaran/Index', [
            'reseps' => $pembayarans,
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

        return Inertia::render('Resepsionis/Pembayaran/Create', [
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
                'detail' => $resep->resepDetail->map(fn($d) => [
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
    public function store(Request $request, $id)
    {
        $request->validate([
            'uang_dibayar' => 'required|numeric|min:0',
            'metode_pembayaran' => 'nullable|string',
        ]);

        return DB::transaction(function () use ($request, $id) {
            $resep = Resep::lockForUpdate()->findOrFail($id);

            $total = $resep->total_harga;
            $uang = $request->uang_dibayar;

            if ($uang < $total) {
                return back()->withErrors([
                    'uang_dibayar' => 'Uang yang dibayarkan kurang dari total harga.',
                ]);
            }

            $kembalian = $uang - $total;

            // 1. Pembayaran utama
            $pembayaran = Pembayaran::create([
                'resep_id' => $resep->id,
                'resepsionis_id' => auth()->id(),
                'total_bayar' => $total,
                'status' => 'lunas',
            ]);

            // 2. Detail pembayaran
            $pembayaran->detail()->create([
                'uang_dibayar' => $uang,
                'kembalian' => $kembalian,
                'metode_pembayaran' => $request->metode_pembayaran ?? 'cash',
            ]);

            // 3. Update pembayaran
            $pembayaran->update([
                'status' => 'lunas',
            ]);

            return redirect()
                ->route('resepsionis.pembayaran.index')
                ->with(
                    'success',
                    'Pembayaran berhasil. Kembalian: Rp ' .
                    number_format($kembalian, 0, ',', '.')
                );
        });
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
