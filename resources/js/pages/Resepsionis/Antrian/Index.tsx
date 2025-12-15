import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Antrian = {
    id: number;
    nomor_antrian: number;
    pasien_nama: string;
    dokter_nama: string;
    keluhan: string;
    status: string;
    created_at: string;
};

type PageProps = {
    antrian: Antrian[];
};

const listTable = [
    'No Antrian',
    'Nama Pasien',
    'Nama Dokter',
    'Keluhan',
    'Tanggal Dibuat',
    'Status',
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Antrian', href: '/resepsionis/antrian' },
];

export default function AntrianIndexResepsionis() {
    const { antrian } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAntrian = antrian.filter(
        (a) =>
            a.pasien_nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.dokter_nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.keluhan.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Antrian" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Antrian
                    </h1>
                    <p className="mt-1 mb-4 text-sm text-gray-500">
                        Kelola data antrian pasien di fasilitas Anda
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
                                {filteredAntrian.length > 0 ? (
                                    filteredAntrian.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.nomor_antrian ?? '-'}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.pasien_nama
                                                    ? item.pasien_nama
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.dokter_nama
                                                    ? item.dokter_nama
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.keluhan
                                                    ? item.keluhan
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.created_at
                                                    ? new Date(
                                                          item.created_at,
                                                      ).toLocaleDateString(
                                                          'id-ID',
                                                          {
                                                              day: '2-digit',
                                                              month: 'long',
                                                              year: 'numeric',
                                                          },
                                                      )
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        item.status ===
                                                        'Menunggu'
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : item.status ===
                                                                'Diproses'
                                                              ? 'bg-blue-100 text-blue-700'
                                                              : 'bg-green-100 text-green-700'
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={listTable.length + 2}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada data antrian.
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
                        Menampilkan {filteredAntrian.length} dari{' '}
                        {antrian.length} antrian
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
