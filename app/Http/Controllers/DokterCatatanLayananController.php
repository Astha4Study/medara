<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\CatatanLayanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DokterCatatanLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $dokter = $user->dokter;

        if (! $dokter) {
            abort(404, 'Data dokter tidak ditemukan');
        }

        $punyaServer = $user->klinik?->punya_server ?? 0;

        $catatan = CatatanLayanan::with(['pasien', 'antrian'])
            ->where('dokter_id', $dokter->id)
            ->where('klinik_id', $user->klinik_id)
            ->latest('updated_at')
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'nomor_pasien' => $c->pasien?->nomor_pasien ?? '',
                'nama_lengkap' => $c->pasien?->nama_lengkap ?? '',
                'tanggal_kunjungan' => $c->tanggal_kunjungan,
                'keluhan_utama' => $punyaServer ? $c->keluhan_utama : null,
                'diagnosa' => $punyaServer ? $c->diagnosa : null,
                'tindakan' => $punyaServer ? $c->tindakan : null,
                'catatan_lain' => $c->catatan_lain,
                'tanggal_ditangani' => $c->updated_at->format('d M Y'),
            ]);

        return Inertia::render('Dokter/CatatanLayanan/Index', [
            'catatan' => $catatan,
            'punya_server' => $punyaServer,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Antrian $antrian)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $dokter = $user->dokter;

        $validated = $request->validate([
            'antrian_id' => 'required|exists:antrian,id',
            'detail_keluhan' => 'nullable|string',
            'diagnosa' => 'nullable|string',
            'tindakan' => 'nullable|string',
            'catatan_lain' => 'nullable|string',
        ]);

        $antrian = Antrian::findOrFail($validated['antrian_id']);

        $sumberInput = $antrian->klinik->punya_server ? 'server' : 'manual';

        $nomorPasien = $antrian->pasien->nomor_pasien;

        CatatanLayanan::create(attributes: [
            'sumber_input' => $sumberInput,
            'pasien_id' => $antrian->pasien_id,
            'klinik_id' => $antrian->klinik_id,
            'dokter_id' => $dokter->id,
            'antrian_id' => $antrian->id,
            'nomor_pasien' => $nomorPasien,
            'tanggal_kunjungan' => $antrian->tanggal_kunjungan,
            'keluhan_utama' => $antrian->keluhan,
            'detail_keluhan' => $validated['detail_keluhan'],
            'diagnosa' => $validated['diagnosa'],
            'tindakan' => $validated['tindakan'],
            'catatan_lain' => $validated['catatan_lain'],
        ]);

        return redirect()->route('dokter.catatan-layanan.index')
            ->with('success', 'Catatan layanan berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $dokter = Auth::user()->dokter;

        $catatan = CatatanLayanan::with([
            'pasien',
            'dokter.user',
            'antrian',
            'pasien.klinik:id,punya_server',
            'detail.layanan:id,nama_layanan',
        ])
            ->where('id', $id)
            ->where('dokter_id', $dokter->id)
            ->firstOrFail();

        $punyaServer = $catatan->pasien?->klinik?->punya_server ?? 0;

        return Inertia::render('Dokter/CatatanLayanan/Show', [
            'catatan' => [
                'id' => $catatan->id,
                'nomor_pasien' => $catatan->pasien?->nomor_pasien ?? '',
                'nama_lengkap' => $catatan->pasien?->nama_lengkap ?? '',
                'nik' => $catatan->pasien?->nik ?? '',
                'jenis_kelamin' => $catatan->pasien?->jenis_kelamin ?? '',
                'tanggal_lahir' => $catatan->pasien?->tanggal_lahir ?? '',
                'tempat_lahir' => $catatan->pasien?->tempat_lahir ?? '',
                'alamat' => $catatan->pasien?->alamat ?? '',
                'no_hp' => $catatan->pasien?->no_hp ?? '',
                'golongan_darah' => $catatan->pasien?->golongan_darah ?? '',
                'riwayat_penyakit' => $catatan->pasien?->riwayat_penyakit ?? '',
                'alergi' => $catatan->pasien?->alergi ?? '',
                'tanggal_kunjungan' => $catatan->tanggal_kunjungan,
                'keluhan_utama' => $catatan->keluhan_utama,
                'detail_keluhan' => $catatan->detail_keluhan,
                'diagnosa' => $punyaServer ? $catatan->diagnosa : null,
                'tindakan' => $catatan->tindakan,
                'catatan_lain' => $catatan->catatan_lain,
                'dokter_nama' => $catatan->dokter?->user?->name ?? '',
                'punya_server' => $punyaServer,

                'detail_layanan' => $catatan->detail->map(fn ($d) => [
                    'id' => $d->id,
                    'layanan' => $d->layanan?->nama_layanan ?? '-',
                ]),
            ],
        ]);
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
    public function update(Request $request, $id)
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
