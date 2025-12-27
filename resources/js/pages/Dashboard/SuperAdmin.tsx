import LaporanLoginSuperAdmin from '@/components/charts/laporan-login-superadmin';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Bug,
    ChartColumnDecreasing,
    ChartColumnIncreasing,
    Clock,
} from 'lucide-react';
import { useState } from 'react';

type Item = {
    label: string;
    total: number;
};

type AktivitasItem = {
    waktu: string;
    deskripsi: string;
};

type BugReport = {
    id: number;
    judul: string;
    deskripsi: string;
    dampak_pelapor: 'rendah' | 'sedang' | 'tinggi';
    status: 'dibuka' | 'sedang_dikerjakan' | 'selesai' | 'ditolak';
    catatan_admin?: string | null;
    created_at: string;
    klinik: { id: number; nama_klinik: string };
    pelapor: { id: number; name: string };
};

type PageProps = {
    user: {
        id: number;
        name: string;
    };

    statistik: {
        jumlahKlinik: number;
        jumlahDokter: number;
        jumlahPasien: number;
        jumlahTransaksi: number;
        perubahan: {
            klinik: number;
            dokter: number;
            pasien: number;
            transaksi: number;
        };
    };

    laporanLogin: {
        mingguan: Item[];
        bulanan: Item[];
    };

    aktivitas: AktivitasItem[];

    bugReports: BugReport[];
};

const statusColor: Record<
    'dibuka' | 'sedang_dikerjakan' | 'selesai' | 'ditolak',
    string
> = {
    dibuka: 'bg-blue-100 text-blue-700',
    sedang_dikerjakan: 'bg-indigo-100 text-indigo-700',
    selesai: 'bg-emerald-100 text-emerald-700',
    ditolak: 'bg-gray-200 text-gray-600',
};

const priorityColor: Record<'rendah' | 'sedang' | 'tinggi', string> = {
    rendah: 'bg-gray-100 text-gray-700',
    sedang: 'bg-yellow-100 text-yellow-700',
    tinggi: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
    dibuka: 'Dibuka',
    sedang_dikerjakan: 'Sedang Dikerjakan',
    selesai: 'Selesai',
    ditolak: 'Ditolak',
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '' }];

export default function SuperAdminDashboard({
    statistik,
    laporanLogin,
    aktivitas,
    bugReports,
}: PageProps) {
    const [mode, setMode] = useState<'mingguan' | 'bulanan'>('mingguan');

    const renderTrend = (value: number) => {
        const naik = value >= 0;
        return (
            <div
                className={`flex items-center gap-1 text-xs font-medium ${
                    naik ? 'text-emerald-600' : 'text-rose-500'
                }`}
            >
                {naik ? (
                    <ChartColumnIncreasing className="h-4 w-4" />
                ) : (
                    <ChartColumnDecreasing className="h-4 w-4" />
                )}
                {Math.abs(value).toFixed(1)}%
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Super Admin" />
            <div className="space-y-4 p-4 md:space-y-6 md:p-6">
                {/* Statistik Cards */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100">
                        <p className="text-sm font-medium text-gray-500">
                            Jumlah Klinik
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-gray-800">
                            {statistik.jumlahKlinik}
                        </p>
                        {renderTrend(statistik.perubahan.klinik)}
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100">
                        <p className="text-sm font-medium text-gray-500">
                            Jumlah Dokter
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-gray-800">
                            {statistik.jumlahDokter}
                        </p>
                        {renderTrend(statistik.perubahan.dokter)}
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100">
                        <p className="text-sm font-medium text-gray-500">
                            Jumlah Pasien
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-gray-800">
                            {statistik.jumlahPasien}
                        </p>
                        {renderTrend(statistik.perubahan.pasien)}
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100">
                        <p className="text-sm font-medium text-gray-500">
                            Jumlah Transaksi
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-gray-800">
                            {statistik.jumlahTransaksi}
                        </p>
                        {renderTrend(statistik.perubahan.transaksi)}
                    </div>
                </div>

                {/* Chart & Activity Grid */}
                <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
                    {/* Laporan Login Chart */}
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 md:p-5">
                        <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 md:text-base">
                                    Laporan Login
                                </h3>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    Aktivitas login pengguna
                                </p>
                            </div>

                            <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-xs">
                                <button
                                    onClick={() => setMode('mingguan')}
                                    className={`rounded-md px-3 py-1.5 transition ${
                                        mode === 'mingguan'
                                            ? 'bg-emerald-600 text-white shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Mingguan
                                </button>
                                <button
                                    onClick={() => setMode('bulanan')}
                                    className={`rounded-md px-3 py-1.5 transition ${
                                        mode === 'bulanan'
                                            ? 'bg-emerald-600 text-white shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Bulanan
                                </button>
                            </div>
                        </div>

                        <div className="h-60 md:h-[260px]">
                            <LaporanLoginSuperAdmin
                                data={
                                    mode === 'mingguan'
                                        ? laporanLogin.mingguan
                                        : laporanLogin.bulanan
                                }
                            />
                        </div>
                    </div>

                    {/* Aktivitas Sistem */}
                    <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <ChartColumnIncreasing className="h-4 w-4 text-emerald-600" />
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Aktivitas Sistem Terbaru
                                </h3>
                            </div>
                        </div>

                        <div className="max-h-60 overflow-y-auto md:max-h-[260px]">
                            {aktivitas.length > 0 ? (
                                <table className="w-full text-xs">
                                    <thead className="sticky top-0 z-10 bg-gray-50 text-gray-500">
                                        <tr>
                                            <th className="px-2 py-2 text-center font-medium md:px-3">
                                                No
                                            </th>
                                            <th className="px-2 py-2 text-left font-medium md:px-3">
                                                Aktivitas
                                            </th>
                                            <th className="px-2 py-2 text-right font-medium md:px-3">
                                                Waktu
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {aktivitas.slice(0, 10).map((item, i) => (
                                            <tr
                                                key={i}
                                                className="transition-colors hover:bg-gray-50"
                                            >
                                                <td className="px-2 py-2 text-center font-bold text-emerald-700 md:px-3">
                                                    {i + 1}
                                                </td>
                                                <td className="px-2 py-2 md:px-3">
                                                    <span className="block truncate font-medium text-gray-900">
                                                        {item.deskripsi}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-2 text-right md:px-3">
                                                    <div className="inline-flex items-center gap-1 text-[10px] text-gray-600 md:text-xs">
                                                        <Clock className="h-3.5 w-3.5 shrink-0" />
                                                        <span className="whitespace-nowrap">
                                                            {new Date(item.waktu).toLocaleString('id-ID')}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                                    <ChartColumnIncreasing className="h-12 w-12 text-emerald-600/60" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            Belum ada aktivitas sistem
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Aktivitas terbaru akan muncul di sini
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bug Reports Table */}
                <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <Bug className="h-4 w-4 text-emerald-600" />
                            <h3 className="text-sm font-semibold text-gray-900">
                                Laporan Bug Terbaru
                            </h3>
                        </div>
                    </div>

                    {bugReports.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs md:text-sm">
                                <thead className="bg-gray-50 text-gray-600">
                                    <tr>
                                        <th className="px-3 py-2 text-center font-medium">No</th>
                                        <th className="px-3 py-2 text-left font-medium min-w-[150px]">Judul</th>
                                        <th className="px-3 py-2 text-left font-medium min-w-[120px]">Klinik</th>
                                        <th className="px-3 py-2 text-left font-medium">Pelapor</th>
                                        <th className="px-3 py-2 text-center font-medium">Status</th>
                                        <th className="px-3 py-2 text-center font-medium">Dampak</th>
                                        <th className="px-3 py-2 text-right font-medium min-w-[140px]">Dilaporkan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {bugReports.map((bug, i) => (
                                        <tr
                                            key={bug.id}
                                            className="transition-colors hover:bg-gray-50"
                                        >
                                            <td className="px-3 py-2 text-center font-bold text-emerald-700">
                                                {i + 1}
                                            </td>
                                            <td className="px-3 py-2">
                                                <span className="block truncate font-medium text-gray-900">
                                                    {bug.judul}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-gray-700">
                                                <span className="block truncate">
                                                    {bug.klinik.nama_klinik}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-gray-700">
                                                {bug.pelapor.name}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ${statusColor[bug.status]}`}
                                                >
                                                    {statusLabels[bug.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${priorityColor[bug.dampak_pelapor]}`}
                                                >
                                                    {bug.dampak_pelapor}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-right text-gray-600 whitespace-nowrap">
                                                {new Date(bug.created_at).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                            <ChartColumnIncreasing className="h-12 w-12 text-emerald-600/60" />
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Belum ada laporan bug
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Laporan terbaru akan muncul di sini
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
