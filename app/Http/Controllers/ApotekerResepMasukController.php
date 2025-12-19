<?php

namespace App\Http\Controllers;

use App\Models\Obat;
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

        if (!$user->hasRole('apoteker')) {
            abort(403, 'Hanya apoteker yang boleh mengakses halaman ini.');
        }

        $resep = Resep::with([
            'pasien:id,nama_lengkap,nomor_pasien',
            'dokter.user:id,name',
        ])
            ->where('klinik_id', $user->klinik_id)
            ->whereIn('status', ['pending', 'sedang_dibuat'])
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(fn($item) => [
                'id' => $item->id,
                'pasien_nama' => $item->pasien->nama_lengkap,
                'nomor_pasien' => $item->pasien->nomor_pasien,
                'dokter_nama' => $item->dokter?->user?->name ?? '-',
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
            'pasien.pemeriksaanFisik',
            'catatanLayanan:id,diagnosa',
            'resepDetail.obat:id,nama_obat,satuan,harga',
        ])->findOrFail($id);

        $obatMaster = Obat::where('klinik_id', $resep->klinik_id)
            ->select('id', 'nama_obat', 'jenis_obat', 'satuan', 'harga', 'penggunaan_obat')
            ->orderBy('nama_obat')
            ->get();

        return Inertia::render('Apoteker/ResepMasuk/Edit', [
            'resep' => [
                'id' => $resep->id,
                'status' => $resep->status,
                'total_harga' => $resep->total_harga,

                'resep_teks' => $resep->resep_teks,

                'pasien' => [
                    'nama_lengkap' => $resep->pasien->nama_lengkap,
                    'nomor_pasien' => $resep->pasien->nomor_pasien,
                    'riwayat_penyakit' => $resep->pasien->riwayat_penyakit,
                ],

                'diagnosa' => $resep->catatanLayanan->diagnosa ?? '-',

                'pemeriksaan_fisik' => [
                    'berat_badan' => $resep->pasien->pemeriksaanFisik->berat_badan ?? null,
                    'tinggi_badan' => $resep->pasien->pemeriksaanFisik->tinggi_badan ?? null,
                    'suhu_tubuh' => $resep->pasien->pemeriksaanFisik->suhu_tubuh ?? null,
                    'tekanan_darah' => $resep->pasien->pemeriksaanFisik->tekanan_darah ?? null,
                    'kondisi_khusus' => $resep->pasien->pemeriksaanFisik->kondisi_khusus ?? null,
                ],

                'detail' => $resep->resepDetail->map(fn($d) => [
                    'obat_id' => $d->obat->id,
                    'nama_obat' => $d->obat->nama_obat,
                    'jumlah' => $d->jumlah,
                    'satuan' => $d->obat->satuan,
                    'harga' => $d->obat->harga,
                    'penggunaan_obat' => $d->obat->penggunaan_obat,
                    'subtotal' => $d->jumlah * $d->obat->harga,
                ]),
            ],

            'obatMaster' => $obatMaster,
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
