import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

type ResepPembayaran = {
    id: number;
    nomor_pasien: string;
    pasien_nama: string;
    dokter_nama: string;
    total_harga: number;
    status_pembayaran: 'belum_bayar' | 'lunas';
    tanggal: string;
};

type PageProps = {
    reseps: ResepPembayaran[];
};

const listTable = [
    'No Antrian',
    'Nomor Pasien',
    'Nama Pasien',
    'Dokter',
    'Total Harga',
    'Status',
    'Tanggal',
    'Aksi',
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pembayaran Resep', href: '/resepsionis/pembayaran' },
];

const statusBadge: Record<
    ResepPembayaran['status_pembayaran'] | 'pending',
    { label: string; className: string }
> = {
    pending: {
        label: 'Menunggu Pembayaran',
        className: 'bg-blue-100 text-blue-700',
    },
    belum_bayar: {
        label: 'Belum Dibayar',
        className: 'bg-yellow-100 text-yellow-700',
    },
    lunas: {
        label: 'Sudah Dibayar',
        className: 'bg-green-100 text-green-700',
    },
};

export default function PembayaranIndexResepsionis() {
    const { reseps } = usePage<PageProps>().props;
    const [search, setSearch] = useState('');

    const filtered = reseps.filter(
        (r) =>
            ['pending', 'belum_bayar', 'lunas'].includes(r.status_pembayaran) &&
            (r.pasien_nama.toLowerCase().includes(search.toLowerCase()) ||
                r.nomor_pasien.toLowerCase().includes(search.toLowerCase())),
    );

    const formatRupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pembayaran Resep" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Pembayaran Resep
                    </h1>
                    <p className="mt-1 mb-4 text-sm text-gray-500">
                        Resep yang sudah selesai dan siap dilakukan pembayaran
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    {listTable.map((item) => (
                                        <th
                                            key={item}
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.length > 0 ? (
                                    filtered.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.nomor_pasien}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.pasien_nama}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.dokter_nama}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {formatRupiah(item.total_harga)}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[item.status_pembayaran].className}`}
                                                >
                                                    {
                                                        statusBadge[
                                                            item
                                                                .status_pembayaran
                                                        ].label
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {new Date(
                                                    item.tanggal,
                                                ).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {index === 0 &&
                                                [
                                                    'pending',
                                                    'belum_bayar',
                                                ].includes(
                                                    item.status_pembayaran,
                                                ) ? (
                                                    <Link
                                                        href={route(
                                                            'resepsionis.pembayaran.proses-bayar',
                                                            item.id,
                                                        )}
                                                        className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                                                    >
                                                        Proses Bayar
                                                    </Link>
                                                ) : (
                                                    <></>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={listTable.length}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada resep yang perlu dibayar
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 text-sm text-gray-600">
                    Menampilkan {filtered.length} resep
                </div>
            </div>
        </AppLayout>
    );
}
