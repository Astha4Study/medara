<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
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
        $user = auth()->user();

        if (!$user->hasRole('apoteker')) {
            abort(403, 'Hanya apoteker yang boleh mengakses halaman ini.');
        }

        $reseps = Resep::with([
            'pasien:id,nama_lengkap,nomor_pasien',
            'dokter.user:id,name',
            'pembayaran:id,resep_id,status',
        ])
            ->where('klinik_id', $user->klinik_id)
            ->whereHas('pembayaran', fn($q) => $q->whereIn('status', ['lunas', 'pending']))
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(fn($r) => [
                'id' => $r->id,
                'nomor_resep' => 'RSP-' . str_pad($r->id, 6, '0', STR_PAD_LEFT),
                'nomor_pasien' => $r->pasien->nomor_pasien ?? '-',
                'pasien_nama' => $r->pasien->nama_lengkap ?? '-',
                'dokter_nama' => $r->dokter->user->name ?? '-',
                'total_harga' => $r->total_harga,
                'status_pembayaran' => $r->pembayaran->status ?? '-',
                'tanggal' => $r->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Apoteker/PenyerahanObat/Index', ['reseps' => $reseps]);
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
    public function store(Request $request, $resep)
    {
        $pembayaran = Pembayaran::where('resep_id', $resep)->firstOrFail();

        if ($pembayaran->status !== 'lunas') {
            return back()->withErrors([
                'status' => 'Pembayaran belum lunas.',
            ]);
        }

        $pembayaran->update([
            'status' => 'selesai',
        ]);

        return redirect()
            ->route('apoteker.penyerahan-obat.index')
            ->with('success', 'Obat berhasil diserahkan.');
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
        $user = auth()->user();

        // pastikan hanya apoteker
        if (!$user->hasRole('apoteker')) {
            abort(403, 'Hanya apoteker yang boleh mengakses halaman ini.');
        }

        // ambil resep lunas paling awal untuk klinik ini
        $allowedResep = Resep::with('pembayaran')
            ->where('klinik_id', $user->klinik_id)
            ->whereHas('pembayaran', fn($q) => $q->where('status', 'lunas'))
            ->orderBy('created_at', 'asc')
            ->first();

        if (!$allowedResep) {
            abort(403, 'Tidak ada resep yang dapat diproses.');
        }

        // cek apakah resep yang diklik memang resep teratas
        if ($allowedResep->id != $id) {
            abort(403, 'Resep ini belum bisa diproses.');
        }

        $resep = Resep::with([
            'pasien:id,nama_lengkap,nomor_pasien,nik,riwayat_penyakit',
            'dokter.user:id,name',
            'resepDetail.obat:id,nama_obat,satuan,harga',
            'catatanLayanan:id,diagnosa',
            'pembayaran:id,resep_id,status',
        ])->findOrFail($id);

        return Inertia::render('Apoteker/PenyerahanObat/Edit', [
            'resep' => [
                'id' => $resep->id,
                'total_harga' => $resep->total_harga,
                'diagnosa' => optional($resep->catatanLayanan)->diagnosa ?? '-',
                'pasien' => [
                    'nama_lengkap' => $resep->pasien->nama_lengkap,
                    'nomor_pasien' => $resep->pasien->nomor_pasien,
                    'nik' => $resep->pasien->nik,
                    'riwayat_penyakit' => $resep->pasien->riwayat_penyakit,
                ],
                'dokter' => [
                    'nama' => $resep->dokter->user->name ?? '-',
                ],
                'detail' => $resep->resepDetail->map(fn($d) => [
                    'id' => $d->id,
                    'nama_obat' => $d->obat->nama_obat,
                    'jumlah' => $d->jumlah,
                    'satuan' => $d->obat->satuan,
                    'harga' => $d->harga_satuan,
                    'subtotal' => $d->jumlah * $d->harga_satuan,
                ]),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $resep)
    {
        $pembayaran = Pembayaran::where('resep_id', $resep)->firstOrFail();

        if ($pembayaran->status !== 'lunas') {
            return back()->withErrors([
                'status' => 'Pembayaran belum lunas.',
            ]);
        }

        $pembayaran->update([
            'status' => 'selesai',
        ]);

        return redirect()
            ->route('apoteker.penyerahan-obat.index')
            ->with('success', 'Obat berhasil diserahkan.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
