<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\BugReports;
use App\Models\CatatanLayananDetail;
use App\Models\Dokter;
use App\Models\Klinik;
use App\Models\Obat;
use App\Models\Pasien;
use App\Models\Pembayaran;
use App\Models\Resep;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        Carbon::setLocale('id');

        $user = $request->user();
        $role = $user->roles->first()?->name ?? 'default';
        $klinik = $user->klinik;
        $period = $request->get('period', 'week');
        $dokter = $user->dokter;
        $klinikDokter = $dokter?->klinik;

        return match ($role) {
            'super_admin' => $this->renderSuperAdminDashboard($user),
            'admin' => $this->renderAdminDashboard($user, $klinik),
            'dokter' => $this->renderDokterDashboard($dokter, $klinikDokter),
            'resepsionis' => $this->renderResepsionisDashboard($user, $klinik),
            'apoteker' => $this->renderApotekerDashboard($user, $klinik),
        };
    }

    private function renderSuperAdminDashboard($user)
    {
        $statistik = $this->getStatistikSuperAdmin();
        $laporanLogin = $this->GetLaporanLogin();
        $aktivitas = $this->getAktivitasSistem();
        $bugReports = $this->getBugReports();

        return Inertia::render('Dashboard/SuperAdmin', [
            'user' => $user->only('id', 'name'),
            'statistik' => $statistik,
            'laporanLogin' => $laporanLogin,
            'aktivitas' => $aktivitas,
            'bugReports' => $bugReports,
        ]);
    }

    private function renderAdminDashboard($user, $klinik)
    {
        $kpiAdmin = $this->getKpiAdmin($klinik);
        $trendPendapatan = $this->getTrendPendapatan($klinik);
        $statusLayanan = $this->getStatusLayanan($klinik->id);
        $obatStokMenipisByKlinik = $this->getObatStokMenipisByKlinik($klinik);
        $pendapatanTahunan = $this->getTrendPendapatanTahunan($klinik);

        return Inertia::render('Dashboard/Admin', [
            'klinik' => $klinik
                ?->setAttribute('gambar', asset('storage/'.$klinik->gambar))
                ?->setAttribute('jenis_klinik', $klinik->jenis_klinik),
            'user' => $user->only('id', 'name'),
            'kpi' => $kpiAdmin,
            'trendPendapatan' => $trendPendapatan,
            'statusLayanan' => $statusLayanan,
            'obatStokMenipisByKlinik' => $obatStokMenipisByKlinik,
            'pendapatanTahunan' => $pendapatanTahunan,
        ]);
    }

    private function renderDokterDashboard($dokter, $klinikDokter)
    {
        $antrian = $this->getAntrianDokter($dokter);
        $chartDokter = $this->getChartDokter($dokter);
        $chartStatusDokter = $this->getChartStatusDokter($dokter);

        return Inertia::render('Dashboard/Dokter', [
            'dokter' => [
                'id' => $dokter?->id,
                'nama' => $dokter?->user?->name,
            ],
            'klinik' => $klinikDokter ? [
                'id' => $klinikDokter->id,
                'nama_klinik' => $klinikDokter->nama_klinik,
                'jenis_klinik' => $klinikDokter->jenis_klinik,
                'gambar' => $klinikDokter->gambar
                    ? asset('storage/'.$klinikDokter->gambar)
                    : null,
            ] : null,
            'antrian' => $antrian,
            'chartPasienDokter' => $chartDokter,
            'chartStatusDokter' => $chartStatusDokter,
        ]);
    }

    private function renderResepsionisDashboard($user, $klinik)
    {
        $reseps = $this->getPembayaranPending($klinik);
        $pasienBaru = $this->getPasienBaru($klinik);
        $chart = $this->getChartResepsionis($klinik);

        return Inertia::render('Dashboard/Resepsionis', [
            'klinik' => $klinik
                ?->setAttribute('gambar', asset('storage/'.$user->klinik->gambar))
                ?->setAttribute('jenis_klinik', $user->klinik->jenis_klinik),
            'user' => $user->only('id', 'name'),
            'reseps' => $reseps,
            'pasienBaru' => $pasienBaru,
            'chart' => $chart,
        ]);
    }

    private function renderApotekerDashboard($user, $klinik)
    {
        $resepMasuk = $this->getResepMasuk($user);
        $chartResepSelesai = $this->getChartResepSelesai($user);
        $chartStatusResep = $this->getChartStatusResep($user);
        $obatStokMenipis = $this->getObatStokMenipis($user);

        return Inertia::render('Dashboard/Apoteker', [
            'klinik' => $klinik
                ?->setAttribute('gambar', asset('storage/'.$user->klinik->gambar))
                ?->setAttribute('jenis_klinik', $user->klinik->jenis_klinik),
            'user' => $user->only('id', 'name'),
            'resepMasuk' => $resepMasuk,
            'chartResepSelesai' => $chartResepSelesai,
            'chartStatusResep' => $chartStatusResep,
            'obatStokMenipis' => $obatStokMenipis,
        ]);
    }

    private function getPembayaranPending($klinik)
    {
        return Pembayaran::with(['resep.pasien', 'catatanLayanan.pasien'])
            ->where('status', 'pending')
            ->where('klinik_id', $klinik?->id)
            ->orderBy('created_at', 'asc')
            ->limit(5)
            ->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'nama_pasien' => $p->resep?->pasien?->nama_lengkap
                    ?? $p->catatanLayanan?->pasien?->nama_lengkap
                    ?? '-',
                'total_harga' => $p->total_bayar,
            ]);
    }

    private function getPasienBaru($klinik)
    {
        return Pasien::where('klinik_id', $klinik?->id)
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'nama_lengkap' => $p->nama_lengkap,
                'nomor_pasien' => $p->nomor_pasien,
                'tanggal' => $p->created_at->format('d M Y'),
            ]);
    }

    private function getAntrianDokter($dokter)
    {
        if (! $dokter) {
            return collect();
        }

        return Antrian::with(['pasien:id,nama_lengkap'])
            ->where('dokter_id', $dokter->id)
            ->whereIn('status', ['Menunggu', 'Sedang Diperiksa'])
            ->orderBy('nomor_antrian', 'asc')
            ->limit(5)
            ->get()
            ->map(fn ($a) => [
                'id' => $a->id,
                'nomor_antrian' => $a->nomor_antrian,
                'nama_pasien' => $a->pasien?->nama_lengkap ?? '-',
                'status' => $a->status,
            ]);
    }

    private function getChartResepsionis($klinik)
    {
        // Mingguan
        $start = now()->startOfWeek(CarbonInterface::MONDAY)->startOfDay();

        $mingguan = collect(range(0, 6))->map(function ($day) use ($klinik, $start) {
            $date = $start->copy()->addDays($day);

            $pasien = Pasien::where('klinik_id', $klinik?->id)
                ->whereBetween('created_at', [$date->copy()->startOfDay(), $date->copy()->endOfDay()])
                ->count();

            $pembayaran = Pembayaran::where('klinik_id', $klinik?->id)
                ->whereIn('status', ['lunas', 'selesai'])
                ->whereBetween('created_at', [$date->copy()->startOfDay(), $date->copy()->endOfDay()])
                ->sum('total_bayar');

            return [
                'tanggal' => $date->translatedFormat('D'),
                'pasien' => $pasien,
                'pembayaran' => (int) $pembayaran,
            ];
        });

        // Bulanan (6 bulan terakhir)
        $bulanan = collect(range(0, 5))->map(function ($i) use ($klinik) {
            $date = now()->subMonths($i)->startOfMonth();
            $start = $date->copy()->startOfMonth();
            $end = $date->copy()->endOfMonth();

            $pasien = Pasien::where('klinik_id', $klinik?->id)
                ->whereBetween('created_at', [$start, $end])
                ->count();

            $pembayaran = Pembayaran::where('klinik_id', $klinik?->id)
                ->whereIn('status', ['lunas', 'selesai'])
                ->whereBetween('created_at', [$start, $end])
                ->sum('total_bayar');

            return [
                'tanggal' => $date->translatedFormat('M'),
                'pasien' => $pasien,
                'pembayaran' => (int) $pembayaran,
            ];
        })->reverse()->values();

        return [
            'mingguan' => $mingguan,
            'bulanan' => $bulanan,
        ];
    }

    private function getChartDokter($dokter)
    {
        if (! $dokter) {
            return collect();
        }

        $start = now()->startOfWeek(CarbonInterface::MONDAY)->startOfDay();

        return collect(range(0, 6))->map(function ($day) use ($dokter, $start) {
            $date = $start->copy()->addDays($day);

            $total = Antrian::where('dokter_id', $dokter->id)
                ->where('status', 'Selesai')
                ->whereBetween('updated_at', [
                    $date->copy()->startOfDay(),
                    $date->copy()->endOfDay(),
                ])
                ->count();

            return [
                'hari' => $date->translatedFormat('D'),
                'total' => $total,
            ];
        });
    }

    private function getChartStatusDokter($dokter)
    {
        if (! $dokter) {
            return collect();
        }

        return Antrian::select('status', DB::raw('count(*) as total'))
            ->where('dokter_id', $dokter->id)
            ->whereDate('created_at', now()->toDateString())
            ->groupBy('status')
            ->get()
            ->map(fn ($item) => [
                'name' => match ($item->status) {
                    'menunggu' => 'Menunggu',
                    'diproses' => 'Sedang Diperiksa',
                    'selesai' => 'Selesai',
                    default => ucfirst($item->status),
                },
                'value' => (int) $item->total,
            ]);
    }

    private function getResepMasuk($user)
    {
        return Resep::query()
            ->with([
                'pasien:id,nama_lengkap',
                'dokter.user:id,name',
            ])
            ->where('klinik_id', $user->klinik_id)
            ->whereIn('status', ['pending', 'sedang_dibuat'])
            ->orderBy('created_at', 'asc')
            ->limit(5)
            ->get()
            ->filter(fn ($resep) => in_array($resep->status, ['pending', 'sedang_dibuat']))
            ->map(fn ($resep) => [
                'id' => $resep->id,
                'pasien' => $resep->pasien?->nama_lengkap ?? '-',
                'dokter' => $resep->dokter?->user?->name ?? '-',
                'status' => $resep->status,
            ]);
    }

    private function getChartResepSelesai($user)
    {
        $start = now()->subDays(6)->startOfDay();

        return collect(range(0, 6))->map(function ($day) use ($start, $user) {
            $date = $start->copy()->addDays($day);

            $total = Resep::where('klinik_id', $user->klinik_id)
                ->where('status', 'selesai')
                ->whereBetween('updated_at', [
                    $date->copy()->startOfDay(),
                    $date->copy()->endOfDay(),
                ])
                ->count();

            return [
                'hari' => $date->translatedFormat('D'),
                'total' => $total,
            ];
        });
    }

    private function getChartStatusResep($user)
    {
        if (! $user->hasRole('apoteker')) {
            return collect();
        }

        return Resep::select('status', DB::raw('count(*) as total'))
            ->where('klinik_id', $user->klinik_id)
            ->where(function ($q) {
                $q->whereIn('status', ['pending', 'sedang_dibuat'])
                    ->whereDate('created_at', now()->toDateString());
            })
            ->orWhere(function ($q) {
                $q->where('status', 'selesai')
                    ->whereDate('updated_at', now()->toDateString());
            })
            ->groupBy('status')
            ->get()
            ->map(fn ($item) => [
                'name' => match ($item->status) {
                    'pending' => 'pending',
                    'sedang_dibuat' => 'sedang_dibuat',
                    'selesai' => 'selesai',
                    default => ucfirst($item->status),
                },
                'value' => (int) $item->total,
            ]);
    }

    private function getObatStokMenipis($user)
    {
        return Obat::query()
            ->where('klinik_id', $user->klinik_id)
            ->orderBy('stok', 'asc')
            ->limit(5)
            ->get()
            ->map(fn ($obat) => [
                'id' => $obat->id,
                'nama' => $obat->nama_obat,
                'stok' => $obat->stok,
                'satuan' => $obat->satuan,
                'status' => $obat->stok == 0
                    ? 'habis'
                    : ($obat->stok <= 10 ? 'menipis' : 'aman'),
            ]);
    }

    private function getKpiAdmin($klinik)
    {
        $pendapatanHariIni = Pembayaran::where('klinik_id', $klinik->id)
            ->whereIn('status', ['lunas', 'selesai'])
            ->whereDate('updated_at', now()->toDateString())
            ->sum('total_bayar');

        return [
            'dokter' => Dokter::where('klinik_id', $klinik->id)->count(),

            'resepsionis' => User::where('klinik_id', $klinik->id)
                ->whereHas('roles', fn ($q) => $q->where('name', 'resepsionis'))
                ->count(),

            'apoteker' => User::where('klinik_id', $klinik->id)
                ->whereHas('roles', fn ($q) => $q->where('name', 'apoteker'))
                ->count(),

            'pasien' => Pasien::where('klinik_id', $klinik->id)->count(),

            'pendapatan_hari_ini' => (int) $pendapatanHariIni,

            'antrian_aktif' => Antrian::where('klinik_id', $klinik->id)
                ->whereIn('status', ['Menunggu', 'Sedang Diperiksa'])
                ->count(),

            'resep_belum_selesai' => Resep::where('klinik_id', $klinik->id)
                ->whereIn('status', ['pending', 'sedang_dibuat'])
                ->count(),
        ];
    }

    private function getTrendPendapatan($klinik)
    {
        $startOfWeek = Carbon::now()->startOfWeek(CarbonInterface::MONDAY);
        $endOfWeek = Carbon::now()->endOfWeek(CarbonInterface::SUNDAY);

        $rawPendapatan = Pembayaran::select(
            DB::raw('DATE(updated_at) as tanggal'),
            DB::raw('SUM(total_bayar) as total')
        )
            ->where('klinik_id', $klinik->id)
            ->whereIn('status', ['lunas', 'selesai'])
            ->whereBetween('updated_at', [$startOfWeek, $endOfWeek])
            ->groupBy(DB::raw('DATE(updated_at)'))
            ->get()
            ->keyBy('tanggal');

        $trendPendapatan = collect();

        for ($i = 0; $i < 7; $i++) {
            $date = $startOfWeek->copy()->addDays($i)->toDateString();

            $trendPendapatan->push([
                'tanggal' => Carbon::parse($date)->translatedFormat('D'),
                'total' => (int) ($rawPendapatan[$date]->total ?? 0),
            ]);
        }

        return $trendPendapatan;
    }

    private function getStatusLayanan($klinikId)
    {
        $colors = [
            '#059669', // emerald-600
            '#14B8A6', // teal-500
            '#F59E0B', // amber-500
            '#0EA5E9', // sky-500
            '#F43F5E', // rose-500
            '#8B5CF6', // violet-500
        ];

        $layananTerpakai = CatatanLayananDetail::select(
            'layanan.nama_layanan',
            DB::raw('COUNT(*) as total')
        )
            ->join('catatan_layanan', 'catatan_layanan.id', '=', 'catatan_layanan_detail.catatan_layanan_id')
            ->join('layanan', 'layanan.id', '=', 'catatan_layanan_detail.layanan_id')
            ->where('catatan_layanan.klinik_id', $klinikId)
            ->groupBy('layanan.id', 'layanan.nama_layanan')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        return $layananTerpakai->map(function ($item, $index) use ($colors) {
            return [
                'name' => $item->nama_layanan,
                'value' => (int) $item->total,
                'color' => $colors[$index % count($colors)], // assign warna
            ];
        })->toArray();
    }

    private function getObatStokMenipisByKlinik($klinik)
    {
        return Obat::query()
            ->where('klinik_id', $klinik->id)
            ->orderBy('stok', 'asc')
            ->limit(5)
            ->get()
            ->map(fn ($obat) => [
                'id' => $obat->id,
                'nama' => $obat->nama_obat,
                'stok' => $obat->stok,
                'satuan' => $obat->satuan,
                'status' => $obat->stok == 0
                    ? 'habis'
                    : ($obat->stok <= 10 ? 'menipis' : 'aman'),
            ]);
    }

    private function getTrendPendapatanTahunan($klinik)
    {
        $tahun = Carbon::now()->year;
        $trendPendapatan = collect();

        for ($bulan = 1; $bulan <= 12; $bulan++) {
            $total = Pembayaran::where('klinik_id', $klinik->id)
                ->whereIn('status', ['lunas', 'selesai'])
                ->whereYear('created_at', $tahun)
                ->whereMonth('created_at', $bulan)
                ->sum('total_bayar');

            $trendPendapatan->push([
                'bulan' => Carbon::create()->month($bulan)->translatedFormat('M'),
                'total' => (int) $total,
            ]);
        }

        return $trendPendapatan;
    }

    private function getStatistikSuperAdmin()
    {
        // Total sekarang
        $jumlahKlinikSekarang = Klinik::count();
        $jumlahDokterSekarang = Dokter::count();
        $jumlahPasienSekarang = Pasien::count();
        $jumlahTransaksiSekarang = Pembayaran::count();

        // Total minggu lalu (7 hari ke belakang)
        $tanggalMingguLalu = now()->subDays(7);

        $jumlahKlinikLalu = Klinik::where('created_at', '<', $tanggalMingguLalu)->count();
        $jumlahDokterLalu = Dokter::where('created_at', '<', $tanggalMingguLalu)->count();
        $jumlahPasienLalu = Pasien::where('created_at', '<', $tanggalMingguLalu)->count();
        $jumlahTransaksiLalu = Pembayaran::where('created_at', '<', $tanggalMingguLalu)->count();

        // Hitung perubahan persentase
        $persen = fn ($sekarang, $lalu) => $lalu > 0 ? (($sekarang - $lalu) / $lalu) * 1 : 0;

        return [
            'jumlahKlinik' => $jumlahKlinikSekarang,
            'jumlahDokter' => $jumlahDokterSekarang,
            'jumlahPasien' => $jumlahPasienSekarang,
            'jumlahTransaksi' => $jumlahTransaksiSekarang,

            'perubahan' => [
                'klinik' => $persen($jumlahKlinikSekarang, $jumlahKlinikLalu),
                'dokter' => $persen($jumlahDokterSekarang, $jumlahDokterLalu),
                'pasien' => $persen($jumlahPasienSekarang, $jumlahPasienLalu),
                'transaksi' => $persen($jumlahTransaksiSekarang, $jumlahTransaksiLalu),
            ],
        ];
    }

    private function getLaporanLogin()
    {
        $rawMingguan = User::selectRaw('DATE(last_login_at) as tanggal, COUNT(*) as total')
            ->whereNotNull('last_login_at')
            ->whereBetween('last_login_at', [
                now()->startOfWeek(CarbonInterface::MONDAY),
                now()->endOfWeek(CarbonInterface::SUNDAY),
            ])
            ->groupBy('tanggal')
            ->get()
            ->keyBy('tanggal');

        $mingguan = collect();

        for ($i = 0; $i < 7; $i++) {
            $date = now()->startOfWeek(CarbonInterface::MONDAY)->addDays($i);

            $mingguan->push([
                'label' => $date->translatedFormat('D'), // Sen, Sel, Rab
                'total' => (int) ($rawMingguan[$date->toDateString()]->total ?? 0),
            ]);
        }

        $rawBulanan = User::selectRaw('MONTH(last_login_at) as bulan, COUNT(*) as total')
            ->whereNotNull('last_login_at')
            ->whereYear('last_login_at', now()->year)
            ->groupBy('bulan')
            ->get()
            ->keyBy('bulan');

        $bulanan = collect();

        for ($m = 1; $m <= 12; $m++) {
            $bulanan->push([
                'label' => Carbon::create()->month($m)->translatedFormat('F'), // Januari
                'total' => (int) ($rawBulanan[$m]->total ?? 0),
            ]);
        }

        return [
            'mingguan' => $mingguan,
            'bulanan' => $bulanan,
        ];
    }

    private function getAktivitasSistem()
    {
        $aktivitas = collect();

        // Klinik baru
        $kliniks = Klinik::latest()->take(10)->get()->map(function ($klinik) {
            return [
                'waktu' => $klinik->created_at,
                'deskripsi' => "Klinik {$klinik->nama} berhasil dibuat",
            ];
        });

        // Dokter baru (relasi ke user)
        $dokters = Dokter::with('user')->latest()->take(10)->get()->map(function ($dokter) {
            return [
                'waktu' => $dokter->created_at,
                'deskripsi' => "Dokter {$dokter->user?->name} ditambahkan oleh admin klinik",
            ];
        });

        // Resepsionis baru (users dengan role resepsionis)
        $resepsionis = User::role('resepsionis')->latest()->take(10)->get()->map(function ($user) {
            return [
                'waktu' => $user->created_at,
                'deskripsi' => "Resepsionis {$user->name} baru terdaftar",
            ];
        });

        // Apoteker baru (users dengan role apoteker)
        $apoteker = User::role('apoteker')->latest()->take(10)->get()->map(function ($user) {
            return [
                'waktu' => $user->created_at,
                'deskripsi' => "Apoteker {$user->name} baru terdaftar",
            ];
        });

        // Gabungkan semua aktivitas
        return $aktivitas
            ->merge($kliniks)
            ->merge($dokters)
            ->merge($resepsionis)
            ->merge($apoteker)
            ->sortByDesc('waktu')
            ->take(10)
            ->values();
    }

    private function getBugReports()
    {
        return BugReports::with(['klinik:id,nama_klinik', 'pelapor:id,name'])
            ->where('status', 'dibuka')
            ->latest()
            ->get()               // <-- pakai get() bukan paginate()
            ->map(fn ($bug) => [
                'id' => $bug->id,
                'judul' => $bug->judul,
                'deskripsi' => $bug->deskripsi,
                'dampak_pelapor' => $bug->dampak_pelapor,
                'status' => $bug->status,
                'catatan_admin' => $bug->catatan_admin,
                'created_at' => $bug->created_at->toIso8601String(),
                'klinik' => [
                    'id' => $bug->klinik?->id,
                    'nama_klinik' => $bug->klinik?->nama_klinik,
                ],
                'pelapor' => [
                    'id' => $bug->pelapor?->id,
                    'name' => $bug->pelapor?->name,
                ],
            ]);
    }
}
