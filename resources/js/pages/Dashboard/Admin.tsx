import StatusLayananPieChartAdmin from '@/components/charts/status-layanan-piechart-admin';
import TotalPendapatanTahunanAdmin from '@/components/charts/total-pendapatan-tahunan-admin';
import TrendPendapatanAdmin from '@/components/charts/trend-pendapatan-admin';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Database,
    FileText,
    FileWarning,
    ListChecks,
    Users,
    Wallet,
} from 'lucide-react';

type PageProps = {
    klinik: {
        id: number;
        nama_klinik: string;
        jenis_klinik: string;
        gambar: string;
    };
    user: {
        id: number;
        name: string;
    };
    kpi: {
        dokter: number;
        resepsionis: number;
        apoteker: number;
        pasien: number;
        pendapatan_hari_ini: number;
        antrian_aktif: number;
        resep_belum_selesai: number;
    };
    trendPendapatan: {
        tanggal: string;
        total: number;
    }[];
    statusLayanan: {
        name: string;
        value: number;
        color: string;
    }[];
    obatStokMenipisByKlinik: {
        id: number;
        nama: string;
        stok: number;
        satuan: string;
        status: 'aman' | 'menipis' | 'habis';
    }[];
    pendapatanTahunan: {
        bulan: string;
        total: number;
    }[];
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '' }];

export default function AdminDashboard({
    klinik,
    user,
    kpi,
    trendPendapatan,
    statusLayanan,
    obatStokMenipisByKlinik,
    pendapatanTahunan,
}: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin" />

            <div className="p-3 sm:p-4 md:p-6">
                {/* KPI Cards Grid */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    {/* Pasien Hari Ini */}
                    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:rounded-xl sm:p-4">
                        <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                    Pasien Hari Ini
                                </p>
                                <p className="mt-1 truncate text-xl font-bold text-gray-900 sm:text-2xl">
                                    {kpi.pasien}
                                </p>
                            </div>
                            <div className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 sm:h-10 sm:w-10">
                                <Users className="h-4 w-4 text-emerald-600 sm:h-5 sm:w-5" />
                            </div>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-500 sm:text-xs">
                            Total pasien yang dilayani hari ini
                        </p>
                    </div>

                    {/* Pendapatan Hari Ini */}
                    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:rounded-xl sm:p-4">
                        <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                    Pendapatan Hari Ini
                                </p>
                                <p className="mt-1 truncate text-xl font-bold text-gray-900 sm:text-2xl">
                                    Rp{' '}
                                    {kpi.pendapatan_hari_ini.toLocaleString(
                                        'id-ID',
                                    )}
                                </p>
                            </div>
                            <div className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 sm:h-10 sm:w-10">
                                <Wallet className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                            </div>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-500 sm:text-xs">
                            Total pembayaran yang masuk hari ini
                        </p>
                    </div>

                    {/* Antrian Aktif */}
                    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:rounded-xl sm:p-4">
                        <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                    Antrian Aktif
                                </p>
                                <p className="mt-1 truncate text-xl font-bold text-gray-900 sm:text-2xl">
                                    {kpi.antrian_aktif}
                                </p>
                            </div>
                            <div className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-100 sm:h-10 sm:w-10">
                                <ListChecks className="h-4 w-4 text-yellow-600 sm:h-5 sm:w-5" />
                            </div>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-500 sm:text-xs">
                            Pasien menunggu & sedang diperiksa
                        </p>
                    </div>

                    {/* Resep Belum Selesai */}
                    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:rounded-xl sm:p-4">
                        <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                    Resep Belum Selesai
                                </p>
                                <p className="mt-1 truncate text-xl font-bold text-gray-900 sm:text-2xl">
                                    {kpi.resep_belum_selesai}
                                </p>
                            </div>
                            <div className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 sm:h-10 sm:w-10">
                                <FileWarning className="h-4 w-4 text-red-600 sm:h-5 sm:w-5" />
                            </div>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-500 sm:text-xs">
                            Resep pending & sedang dibuat
                        </p>
                    </div>
                </div>

                {/* Charts and Tables Grid */}
                <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Trend Pendapatan - Full Width on Mobile, 3 cols on MD+ */}
                    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:rounded-xl sm:p-4 md:col-span-2 lg:col-span-3">
                        <div className="mb-3">
                            <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                                Trend Pendapatan
                            </h3>
                            <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                                Ringkasan pendapatan harian
                            </p>
                        </div>

                        <div className="h-[200px] sm:h-[220px] md:h-[260px]">
                            <TrendPendapatanAdmin data={trendPendapatan} />
                        </div>
                    </div>

                    {/* Stok Obat Table */}
                    <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-100 sm:rounded-xl md:col-span-2 lg:col-span-1">
                        <div className="flex items-center border-b border-gray-100 px-3 py-2.5 sm:px-4 sm:py-3">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 shrink-0 text-emerald-600" />
                                <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                                    Stok Obat
                                </h3>
                            </div>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto sm:max-h-[340px] md:h-[calc(260px+1rem)]">
                            {obatStokMenipisByKlinik.length > 0 ? (
                                <table className="w-full text-xs">
                                    <thead className="sticky top-0 z-10 bg-gray-50 text-gray-500">
                                        <tr>
                                            <th className="px-2 py-2 text-left font-medium sm:px-3">
                                                Nama Obat
                                            </th>
                                            <th className="px-2 py-2 text-left font-medium sm:px-3">
                                                Stok
                                            </th>
                                            <th className="px-2 py-2 text-left font-medium sm:px-3">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {obatStokMenipisByKlinik.map((obat) => (
                                            <tr
                                                key={obat.id}
                                                className="transition-colors hover:bg-gray-50"
                                            >
                                                <td className="px-2 py-2 sm:px-3">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="hidden h-4 w-4 shrink-0 text-emerald-600 sm:block" />
                                                        <span className="truncate font-medium text-gray-900">
                                                            {obat.nama}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-2 sm:px-3">
                                                    <span className="truncate text-gray-700">
                                                        {obat.stok}{' '}
                                                        {obat.satuan}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-2 sm:px-3">
                                                    <span
                                                        className={`inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap uppercase sm:px-2 ${
                                                            obat.status ===
                                                            'habis'
                                                                ? 'bg-red-100 text-red-700'
                                                                : obat.status ===
                                                                    'menipis'
                                                                  ? 'bg-yellow-100 text-yellow-700'
                                                                  : 'bg-green-100 text-green-700'
                                                        }`}
                                                    >
                                                        {obat.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                                    <Database className="h-10 w-10 text-emerald-600/60 sm:h-12 sm:w-12" />
                                    <div>
                                        <p className="text-xs font-medium text-gray-700 sm:text-sm">
                                            Semua stok obat aman
                                        </p>
                                        <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                                            Tidak perlu pengadaan saat ini
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Layanan yang Sering Dipakai */}
                    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:rounded-xl sm:p-4 md:col-span-2">
                        <div className="mb-3">
                            <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                                Layanan yang Sering Dipakai
                            </h3>
                            <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                                Ringkasan 5 layanan teratas berdasarkan
                                penggunaan pasien
                            </p>
                        </div>

                        <div className="h-[200px] sm:h-[220px] md:h-[260px]">
                            <StatusLayananPieChartAdmin data={statusLayanan} />
                        </div>
                    </div>

                    {/* Total Pendapatan Tahunan */}
                    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:rounded-xl sm:p-4 md:col-span-2">
                        <div className="mb-3">
                            <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                                Total Pendapatan Tahunan
                            </h3>
                            <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                                Ringkasan pendapatan per bulan tahun ini
                            </p>
                        </div>

                        <div className="h-[200px] sm:h-[220px] md:h-[260px]">
                            <TotalPendapatanTahunanAdmin
                                pendapatanTahunan={pendapatanTahunan}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
