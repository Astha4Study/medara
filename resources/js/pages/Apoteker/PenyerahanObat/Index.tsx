import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

type ResepPembayaran = {
    id: number;
    nomor_pasien: string;
    pasien_nama: string;
    dokter_nama: string;
    total_harga: number;
    status_pembayaran: 'belum_bayar' | 'lunas' | '-';
    tanggal: string;
};

type PageProps = {
    reseps: ResepPembayaran[];
};

const listTable = [
    'No',
    'Nomor Pasien',
    'Nama Pasien',
    'Dokter',
    'Status',
    'Total Harga',
    'Tanggal',
    'Aksi',
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Penyerahan Obat', href: '/apoteker/penyerahan-obat' },
];

const statusBadge: Record<
    ResepPembayaran['status_pembayaran'],
    { label: string; className: string }
> = {
    belum_bayar: {
        label: 'Belum Dibayar',
        className: 'bg-yellow-100 text-yellow-700',
    },
    lunas: {
        label: 'Sudah Dibayar',
        className: 'bg-green-100 text-green-700',
    },
    '-': {
        label: '-',
        className: 'bg-gray-100 text-gray-500',
    },
};

export default function PenyerahanObatIndexApoteker() {
    const { reseps } = usePage<PageProps>().props;
    const [search, setSearch] = useState('');

    const filtered = reseps
        .filter(
            (r) =>
                r.status_pembayaran === 'lunas' &&
                (r.pasien_nama.toLowerCase().includes(search.toLowerCase()) ||
                    r.nomor_pasien
                        .toLowerCase()
                        .includes(search.toLowerCase())),
        )
        .sort((a, b) => {
            return (
                new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
            );
        });

    const formatRupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Penyerahan Obat" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Penyerahan Obat
                    </h1>
                    <p className="mt-1 mb-4 text-sm text-gray-500">
                        Resep yang sudah dibayar dan siap diserahkan ke pasien
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
                                            <td className="px-6 py-4 text-gray-700">
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
                                                {formatRupiah(item.total_harga)}
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
                                                {item.status_pembayaran ===
                                                'lunas' ? (
                                                    <Link
                                                        href={`/apoteker/penyerahan-obat/${item.id}/serahkan`}
                                                        className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                                                    >
                                                        Serahkan Obat
                                                    </Link>
                                                ) : (
                                                    <span className="text-xs text-gray-400">
                                                        -
                                                    </span>
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
                                            Tidak ada resep yang siap diserahkan
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
