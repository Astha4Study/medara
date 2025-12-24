import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Filter, Search } from 'lucide-react';
import { useState } from 'react';

type Catatan = {
    id: number;
    nomor_pasien: string;
    nama_lengkap: string;
    tanggal_kunjungan: string;
    keluhan_utama: string;
    diagnosa: string;
    tindakan: string;
    catatan_lain: string;
    tanggal_ditangani: string;
};

type PageProps = {
    catatan: Catatan[];
    punya_server: number;
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Catatan Layanan', href: '' }];

export default function CatatanLayananIndexDokter() {
    const { catatan, punya_server } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCatatanLayanan = catatan.filter(
        (c) =>
            c.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.nomor_pasien.includes(searchQuery),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Catatan Layanan" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Catatan Layanan
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Data pasien yang telah Anda tangani
                    </p>
                </div>

                {/* Action Bar */}
                <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="flex">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari berdasarkan nama atau nomor pasien..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full min-w-[400px] rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-400 transition focus:border-emerald-400 focus:ring-emerald-400"
                            />
                        </div>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                            <Filter className="h-4 w-4" /> Filter
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Nomor Pasien
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Nama Pasien
                                    </th>
                                    {punya_server === 1 ? (
                                        <>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Keluhan Utama
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Diagnosa
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Tindakan
                                            </th>
                                        </>
                                    ) : (
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Keterangan
                                        </th>
                                    )}
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Tanggal Dikunjungi
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredCatatanLayanan.length > 0 ? (
                                    filteredCatatanLayanan.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.nomor_pasien}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.nama_lengkap}
                                            </td>
                                            {punya_server === 1 ? (
                                                <>
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {item.keluhan_utama ||
                                                            '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {item.diagnosa || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {item.tindakan || '-'}
                                                    </td>
                                                </>
                                            ) : (
                                                <td className="px-6 py-4 text-emerald-700 italic">
                                                    Mode Tanpa Server – data
                                                    medis dicatat manual
                                                </td>
                                            )}
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.tanggal_ditangani}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Link
                                                    href={`/dokter/catatan-layanan/${item.id}`}
                                                    className="text-blue-600 hover:text-blue-700"
                                                >
                                                    Lihat Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={punya_server === 1 ? 7 : 5}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada data catatan layanan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <p>
                        Menampilkan {filteredCatatanLayanan.length} dari{' '}
                        {catatan.length} pasien
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
