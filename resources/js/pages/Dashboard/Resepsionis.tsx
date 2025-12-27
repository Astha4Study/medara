import PasienPembayaranChartsResepsionis from '@/components/charts/pasien-pembayaran-charts-resepsionis';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    CreditCard,
    Pencil,
    User,
    UserPlus,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

type ChartItem = {
    tanggal: string;
    pasien: number;
    pembayaran: number;
};

type PageProps = {
    klinik: {
        id: number;
        nama_klinik: string;
        jenis_klinik: string;
        gambar: string;
    };
    user: { id: number; name: string };
    reseps: { id: number; nama_pasien: string; total_harga: number }[];
    pasienBaru: { id: number; nama_lengkap: string; tanggal: string }[];
    chart: {
        mingguan: ChartItem[];
        bulanan: ChartItem[];
    };
};

const formatRupiah = (v: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(v);

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '' }];

export default function ResepsionisDashboard({
    klinik,
    user,
    reseps,
    pasienBaru,
    chart,
}: PageProps) {
    const [period, setPeriod] = useState<'week' | 'month'>('week');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Resepsionis" />

            <div className="p-3 sm:p-4 md:p-6">
                <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
                    <div className="flex flex-col gap-4 lg:col-span-2">
                        {/* Hero Klinik */}
                        <div className="relative h-48 overflow-hidden rounded-2xl shadow-lg md:h-56 lg:h-72">
                            {klinik.gambar ? (
                                <img
                                    src={klinik.gambar}
                                    alt={klinik.nama_klinik}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-emerald-100 to-emerald-200 text-gray-600">
                                    <p className="text-sm">
                                        Gambar klinik tidak tersedia
                                    </p>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/55 to-black/30" />

                            <Link
                                href={`/resepsionis/klinik/${klinik.id}/edit`}
                                className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-white/25 hover:ring-white/30"
                            >
                                <Pencil className="h-3.5 w-3.5 opacity-90" />
                                <span className="hidden sm:inline">
                                    Edit Klinik
                                </span>
                            </Link>

                            <div className="absolute bottom-4 left-4 z-10">
                                <p className="text-xs tracking-wide text-white/70 md:text-sm">
                                    Selamat datang,
                                </p>
                                <p className="mt-0.5 text-lg font-bold text-white md:text-xl">
                                    {user.name}
                                </p>
                            </div>

                            <div className="absolute right-4 bottom-4 z-10 max-w-[60%] text-right md:max-w-[65%]">
                                <span className="inline-flex items-center rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-medium text-emerald-100 ring-1 ring-emerald-400/40 backdrop-blur-sm">
                                    {klinik.jenis_klinik}
                                </span>
                                <h1 className="mt-2 text-base leading-snug font-bold text-white md:text-lg lg:text-xl">
                                    {klinik.nama_klinik}
                                </h1>
                                <p className="mt-1 text-xs text-white/70 md:text-sm">
                                    Dashboard operasional klinik
                                </p>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 md:p-5">
                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Statistik Pasien & Pembayaran
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        Ringkasan aktivitas klinik
                                    </p>
                                </div>

                                <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-xs">
                                    <button
                                        onClick={() => setPeriod('week')}
                                        className={`rounded-md px-3 py-1.5 ${
                                            period === 'week'
                                                ? 'bg-emerald-600 text-white shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Mingguan
                                    </button>
                                    <button
                                        onClick={() => setPeriod('month')}
                                        className={`rounded-md px-3 py-1.5 ${
                                            period === 'month'
                                                ? 'bg-emerald-600 text-white shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Bulanan
                                    </button>
                                </div>
                            </div>

                            <div className="h-60 md:h-[260px]">
                                <PasienPembayaranChartsResepsionis
                                    data={
                                        period === 'week'
                                            ? chart.mingguan
                                            : chart.bulanan
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <aside className="flex flex-col gap-4 md:gap-6">
                        {/* Pembayaran Menunggu */}
                        <div className="min-h-[300px] flex-1 rounded-xl bg-white shadow-sm ring-1 ring-gray-100 lg:min-h-0">
                            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-emerald-600" />
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Pembayaran Menunggu
                                    </h3>
                                </div>
                                <Link
                                    href={route('resepsionis.pembayaran.index')}
                                    className="text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
                                >
                                    Lihat semua
                                </Link>
                            </div>

                            <div className="h-[calc(100%-48px)] overflow-y-auto">
                                {reseps.length > 0 ? (
                                    <table className="w-full text-xs">
                                        <thead className="sticky top-0 z-10 bg-gray-50 text-gray-500">
                                            <tr>
                                                <th className="px-2 py-2 text-center font-medium md:px-3">
                                                    No
                                                </th>
                                                <th className="px-2 py-2 text-left font-medium md:px-3">
                                                    Pasien
                                                </th>
                                                <th className="px-2 py-2 text-right font-medium md:px-3">
                                                    Total
                                                </th>
                                                <th className="px-2 py-2 text-center font-medium md:px-3">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {reseps.map((item, i) => (
                                                <tr
                                                    key={item.id}
                                                    className="transition-colors hover:bg-gray-50"
                                                >
                                                    <td className="px-2 py-2 text-center font-bold text-emerald-700 md:px-3">
                                                        {i + 1}
                                                    </td>
                                                    <td className="px-2 py-2 md:px-3">
                                                        <div className="flex items-center gap-2">
                                                            <User className="h-4 w-4 shrink-0 text-emerald-600" />
                                                            <span className="truncate font-medium text-gray-900">
                                                                {
                                                                    item.nama_pasien
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 text-right text-[10px] font-medium text-gray-800 md:px-3 md:text-xs">
                                                        {formatRupiah(
                                                            item.total_harga,
                                                        )}
                                                    </td>
                                                    <td className="px-2 py-2 text-center md:px-3">
                                                        <Link
                                                            href={route(
                                                                'resepsionis.pembayaran.proses-bayar',
                                                                item.id,
                                                            )}
                                                            className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
                                                        >
                                                            <Wallet className="h-3.5 w-3.5" />
                                                            <span className="hidden sm:inline">
                                                                Bayar
                                                            </span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                                        <Wallet className="h-12 w-12 text-emerald-600/60" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                Belum ada pembayaran menunggu
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Pembayaran akan muncul di sini
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pasien Baru Bulan Ini */}
                        <div className="min-h-[300px] flex-1 rounded-xl bg-white shadow-sm ring-1 ring-gray-100 lg:min-h-0">
                            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <UserPlus className="h-4 w-4 text-emerald-600" />
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Pasien Baru Bulan Ini
                                    </h3>
                                </div>
                                <Link
                                    href={route('resepsionis.pasien.index')}
                                    className="text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
                                >
                                    Lihat semua
                                </Link>
                            </div>

                            <div className="h-[calc(100%-48px)] overflow-y-auto">
                                {pasienBaru.length > 0 ? (
                                    <table className="w-full text-xs">
                                        <thead className="sticky top-0 z-10 bg-gray-50 text-gray-500">
                                            <tr>
                                                <th className="px-2 py-2 text-center font-medium md:px-3">
                                                    No
                                                </th>
                                                <th className="px-2 py-2 text-left font-medium md:px-3">
                                                    Pasien
                                                </th>
                                                <th className="px-2 py-2 text-right font-medium md:px-3">
                                                    Tanggal
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {pasienBaru.map((p, i) => (
                                                <tr
                                                    key={p.id}
                                                    className="transition-colors hover:bg-gray-50"
                                                >
                                                    <td className="px-2 py-2 text-center font-bold text-emerald-700 md:px-3">
                                                        {i + 1}
                                                    </td>
                                                    <td className="px-2 py-2 md:px-3">
                                                        <div className="flex items-center gap-2">
                                                            <User className="h-4 w-4 shrink-0 text-emerald-600" />
                                                            <span className="truncate font-medium text-gray-900">
                                                                {p.nama_lengkap}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 text-right md:px-3">
                                                        <div className="inline-flex items-center gap-1 text-[10px] text-gray-600 md:text-xs">
                                                            <Calendar className="h-3.5 w-3.5 shrink-0" />
                                                            <span className="whitespace-nowrap">
                                                                {new Date(
                                                                    p.tanggal,
                                                                ).toLocaleDateString(
                                                                    'id-ID',
                                                                    {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        year: 'numeric',
                                                                    },
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                                        <UserPlus className="h-12 w-12 text-emerald-600/60" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                Belum ada pasien baru bulan ini
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Data pasien akan muncul di sini
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </AppLayout>
    );
}
