<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\PemeriksaanFisik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResepsionisStoreAntrianAndPemeriksaanFisikController extends Controller
{
    public function store(Request $request)
    {
        // dd($request->all());

        $user = Auth::user();

        if (!$user->hasRole('resepsionis')) {
            abort(403);
        }

        $validated = $request->validate([
            'pasien_id' => 'required|exists:pasien,id',
            'dokter_id' => 'nullable|exists:dokter,id',
            'keluhan' => 'nullable|string',
            'tanggal_kunjungan' => 'required|date',
            'berat_badan' => 'nullable|numeric',
            'tinggi_badan' => 'nullable|numeric',
            'suhu_tubuh' => 'nullable|numeric',
            'tekanan_darah' => 'nullable|string',
            'kondisi_khusus' => 'nullable|string',
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

        PemeriksaanFisik::create([
            'pasien_id' => $validated['pasien_id'],
            'klinik_id' => $klinikId,
            'berat_badan' => $validated['berat_badan'] ?? null,
            'tinggi_badan' => $validated['tinggi_badan'] ?? null,
            'suhu_tubuh' => $validated['suhu_tubuh'] ?? null,
            'tekanan_darah' => $validated['tekanan_darah'] ?? null,
            'kondisi_khusus' => $validated['kondisi_khusus'] ?? null,
            'created_by' => Auth::id(),
        ]);


        return redirect()
            ->route('resepsionis.antrian.index')
            ->with('success', 'Antrian berhasil ditambahkan!');
    }
}
