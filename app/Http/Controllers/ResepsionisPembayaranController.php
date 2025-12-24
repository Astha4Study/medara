<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
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
            'resep.dokter.user:id,name',
            'catatanLayanan.pasien:id,nama_lengkap,nomor_pasien',
            'catatanLayanan.dokter.user:id,name',
        ])
            ->where('status', 'pending')
            ->where('klinik_id', auth()->user()->klinik_id)
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($pembayaran) {

                // 🟢 Ambil sumber data
                if ($pembayaran->resep_id) {
                    $pasien = $pembayaran->resep->pasien;
                    $dokter = $pembayaran->resep->dokter;
                } else {
                    $pasien = $pembayaran->catatanLayanan->pasien;
                    $dokter = $pembayaran->catatanLayanan->dokter;
                }

                return [
                    'id' => $pembayaran->id,
                    'nomor_pasien' => $pasien->nomor_pasien ?? '-',
                    'pasien_nama' => $pasien->nama_lengkap ?? '-',
                    'dokter_nama' => $dokter->user->name ?? '-',
                    'total_harga' => $pembayaran->total_bayar,
                    'status_pembayaran' => $pembayaran->status,
                    'tanggal' => $pembayaran->created_at->toISOString(),
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
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
        $pembayaran = Pembayaran::with([
            'resep.pasien',
            'resep.dokter.user',
            'resep.resepDetail.obat',
            'catatanLayanan.pasien',
            'catatanLayanan.dokter.user',
            'catatanLayanan.detail.layanan',
            'klinik',
        ])
            ->where('status', 'pending')
            ->where('klinik_id', auth()->user()->klinik_id)
            ->findOrFail($id);

        $pasien = $pembayaran->resep_id
            ? $pembayaran->resep->pasien
            : $pembayaran->catatanLayanan->pasien;

        $dokter = $pembayaran->resep_id
            ? $pembayaran->resep->dokter
            : $pembayaran->catatanLayanan->dokter;

        $detailResep = $pembayaran->resep_id
            ? $pembayaran->resep->resepDetail->map(fn ($d) => [
                'id' => $d->id,
                'nama' => $d->obat->nama_obat,
                'jumlah' => $d->jumlah,
                'satuan' => $d->satuan ?? '',
                'harga' => $d->harga_satuan,
                'subtotal' => $d->jumlah * $d->harga_satuan,
            ])
            : collect();

        $detailLayanan = $pembayaran->catatan_layanan_id
            ? $pembayaran->catatanLayanan->detail->map(fn ($d) => [
                'id' => $d->id,
                'nama' => $d->layanan->nama_layanan,
                'jumlah' => 1,
                'satuan' => '-',
                'harga' => $d->layanan->harga,
                'subtotal' => $d->layanan->harga,
            ])
            : collect();

        return Inertia::render('Resepsionis/Pembayaran/Edit', [
            'pembayaran' => [
                'id' => $pembayaran->id,
                'total_harga' => $pembayaran->total_bayar,
                'status' => $pembayaran->status,
                'pasien' => [
                    'nama_lengkap' => $pasien->nama_lengkap ?? '-',
                    'nomor_pasien' => $pasien->nomor_pasien ?? '-',
                    'nik' => $pasien->nik ?? '-',
                    'riwayat_penyakit' => $pasien->riwayat_penyakit ?? null,
                ],
                'dokter' => [
                    'nama' => $dokter->user->name ?? '-',
                ],
                'detail_resep' => $detailResep,
                'detail_layanan' => $detailLayanan,
                'diagnosa' => $pembayaran->catatanLayanan->diagnosa ?? null,
                'punya_server' => $pembayaran->klinik->punya_server ?? 0,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'uang_dibayar' => 'required|numeric|min:0',
            'metode_pembayaran' => 'nullable|string',
        ]);

        return DB::transaction(function () use ($request, $id) {

            $pembayaran = Pembayaran::with([
                'resep.resepDetail',
                'catatanLayanan.detail.layanan',
            ])
                ->lockForUpdate()
                ->where('status', 'pending')
                ->where('klinik_id', auth()->user()->klinik_id)
                ->findOrFail($id);

            // Hitung ulang total dari resep dan layanan
            $totalResep = $pembayaran->resep_id
                ? $pembayaran->resep->resepDetail->sum(fn ($d) => $d->jumlah * $d->harga_satuan)
                : 0;

            $totalLayanan = $pembayaran->catatan_layanan_id
                ? $pembayaran->catatanLayanan->detail->sum(fn ($d) => $d->layanan->harga)
                : 0;

            $total = $totalResep + $totalLayanan;

            $uang = $request->uang_dibayar;

            if ($uang < $total) {
                return back()->withErrors([
                    'uang_dibayar' => 'Uang yang dibayarkan kurang dari total harga.',
                ]);
            }

            $kembalian = $uang - $total;

            // Tentukan status berdasarkan ada/tidaknya resep_id
            $status = $pembayaran->resep_id ? 'lunas' : 'selesai';

            $pembayaran->update([
                'resepsionis_id' => auth()->id(),
                'status' => $status,
                'total_bayar' => $total,
            ]);

            $pembayaran->detail()->updateOrCreate(
                ['pembayaran_id' => $pembayaran->id],
                [
                    'uang_dibayar' => $uang,
                    'kembalian' => $kembalian,
                    'metode_pembayaran' => $request->metode_pembayaran ?? 'cash',
                ]
            );

            return redirect()
                ->route('resepsionis.pembayaran.index')
                ->with(
                    'success',
                    'Pembayaran berhasil. Kembalian: Rp '.
                    number_format($kembalian, 0, ',', '.')
                );
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
