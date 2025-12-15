// resources/js/Pages/Apoteker/PenyerahanObat/Index.tsx
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

type ResepPembayaran = {
    id: number;
    nomor_resep: string;
    nomor_pasien: string;
    pasien_nama: string;
    dokter_nama: string;
    total_harga: number;
    status_pembayaran: string;
    tanggal: string; // YYYY-MM-DD
};

type PageProps = { reseps: ResepPembayaran[] };

const listTable = [
    'No',
    'Nomor Pasien',
    'Nama Pasien',
    'Dokter',
    'Total Harga',
    'Status',
    'Tanggal',
    'Aksi',
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Penyerahan Obat', href: '/apoteker/penyerahan-obat' },
];

const formatRupiah = (v: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(v);

const formatTgl = (t: string) =>
    new Date(t).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export default function PenyerahanObatIndexApoteker() {
    const { reseps } = usePage<PageProps>().props;
    const [search, setSearch] = useState('');

    const filtered = reseps
        .filter(
            (r) =>
                r.pasien_nama.toLowerCase().includes(search.toLowerCase()) ||
                r.nomor_pasien.toLowerCase().includes(search.toLowerCase()),
        )
        .sort(
            (a, b) =>
                new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime(),
        );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Penyerahan Obat" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Penyerahan Obat
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Resep yang sudah dibayar dan siap diserahkan ke pasien
                    </p>
                </div>

                {/* Search */}
                <div className="mb-4 max-w-xs">
                    <input
                        type="text"
                        placeholder="Cari pasien / nomor pasien..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                {/* Tabel */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                {listTable.map((th) => (
                                    <th
                                        key={th}
                                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                    >
                                        {th}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.length ? (
                                filtered.map((r, i) => (
                                    <tr key={r.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-gray-700">
                                            {i + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {r.nomor_pasien}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {r.pasien_nama}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {r.dokter_nama}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-emerald-600">
                                            {formatRupiah(r.total_harga)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {r.status_pembayaran}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {formatTgl(r.tanggal)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/apoteker/penyerahan-obat/${r.id}/serahkan`}
                                                className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                                            >
                                                Serahkan Obat
                                            </Link>
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

                <div className="mt-4 text-sm text-gray-600">
                    Menampilkan {filtered.length} resep
                </div>
            </div>
        </AppLayout>
    );
}
