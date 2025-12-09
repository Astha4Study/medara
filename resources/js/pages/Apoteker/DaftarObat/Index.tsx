import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Filter, Plus, Search } from 'lucide-react';
import { useState } from 'react';

type DaftarObat = {
    id: number;
    nama_obat: string;
    satuan: number;
    stok: number;
    harga: number;
};

type PageProps = {
    obat: DaftarObat[];
};

const listTable = ['Nama Obat', 'Satuan', 'Stok Obat', 'Harga Obat'];

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Daftar Obat', href: '' }];

export default function DaftarObatIndexApoteker() {
    const { obat } = usePage<PageProps>().props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDaftarObat = obat.filter((p) =>
        p.nama_obat.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Obat" />
            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Obat
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Tambahkan dan perbarui data obat klinik
                    </p>
                </div>

                {/* Action Bar */}
                <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="flex">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari obat berdasarkan nama..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full min-w-[400px] rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-400 transition focus:border-emerald-400 focus:ring-emerald-400"
                            />
                        </div>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>

                    <Link
                        href="/apoteker/daftar-obat/create"
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Obat
                    </Link>
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
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredDaftarObat.length > 0 ? (
                                    filteredDaftarObat.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.nama_obat}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.satuan}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.harga}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.stok}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Link
                                                    href={`/resepsionis/daftar-obat/${item.id}/edit`}
                                                    className="text-emerald-600 hover:text-emerald-700"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={listTable.length + 2}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada data obat.
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
                        Menampilkan {filteredDaftarObat.length} dari{' '}
                        {obat.length} obat
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
