import DropdownObatApoteker from '@/components/dropdown-menu-obat-apoteker';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Filter, Plus, Search, Trash2, X } from 'lucide-react';
import { useState } from 'react';

type DaftarObat = {
    id: number;
    nama_obat: string;
    jenis_obat: string;
    satuan: string;
    stok: number;
    harga: number;
};

type PageProps = {
    obat: DaftarObat[];
};

const listTable = [
    'Nama Obat',
    'Jenis Obat',
    'Satuan',
    'Stok Obat',
    'Harga Obat',
];

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Daftar Obat', href: '' }];

export default function DaftarObatIndexApoteker() {
    const { obat } = usePage<PageProps>().props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSelect = (id: number) =>
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );

    const toggleSelectAll = () => {
        if (selectedIds.length === obat.length) setSelectedIds([]);
        else setSelectedIds(obat.map((o) => o.id));
    };

    const deleteSelected = () => {
        if (selectedIds.length === 0) return;
        if (!confirm(`Yakin ingin menghapus ${selectedIds.length} obat?`))
            return;
        selectedIds.forEach((id) =>
            router.delete(`/apoteker/daftar-obat/${id}`),
        );
        setSelectedIds([]);
    };


    const filteredDaftarObat = obat.filter((o) =>
        o.nama_obat.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const formatRupiah = (v: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(v);

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
                            <Filter className="h-4 w-4" /> Filter
                        </button>
                    </div>

                    <Link
                        href="/apoteker/daftar-obat/create"
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" /> Tambah Obat
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedIds.length ===
                                                    obat.length &&
                                                obat.length > 0
                                            }
                                            onChange={toggleSelectAll}
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </th>
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
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(
                                                        item.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleSelect(item.id)
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.nama_obat}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.jenis_obat}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.satuan}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.stok}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {formatRupiah(item.harga)}
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <DropdownObatApoteker
                                                    id={item.id}
                                                    namaObat={item.nama_obat}
                                                />
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

                {/* Footer & Bulk Action */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <p>
                        Menampilkan {filteredDaftarObat.length} dari{' '}
                        {obat.length} obat
                    </p>
                </div>

                {selectedIds.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-lg border border-gray-200 bg-white px-6 py-3 shadow-lg">
                        <span className="text-sm font-medium text-gray-700">
                            {selectedIds.length} obat dipilih
                        </span>
                        <button
                            onClick={deleteSelected}
                            className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" /> Hapus
                        </button>
                        <button
                            onClick={() => setSelectedIds([])}
                            className="ml-2 text-gray-400 transition hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
