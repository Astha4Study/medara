import DropdownPasienResepsionis from '@/components/ui/dropdown-pasien-resepsionis';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/react';
import { Filter, Plus, Search, X } from 'lucide-react';
import { useState } from 'react';

type Pasien = {
    id: number;
    nomor_pasien: string;
    nama_lengkap: string;
    nik: string;
    jenis_kelamin: 'L' | 'P';
    tanggal_lahir?: string | null;
    umur?: number | null;
    tempat_lahir?: string | null;
    alamat: string;
    no_hp?: string | null;
    golongan_darah?: string | null;
    riwayat_penyakit?: string | null;
    alergi?: string | null;
};

type PageProps = {
    pasien: Pasien[];
};

const listTable = [
    'Nomor Pasien',
    'Nama Pasien',
    'NIK',
    'Gender',
    'Tanggal Lahir',
    'Umur',
    'Alamat',
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Pasien', href: '/pasien' },
];

export default function PasienIndexResepsionis() {
    const { pasien } = usePage<PageProps>().props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === pasien.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(pasien.map((p) => p.id));
        }
    };

    const deleteSelected = () => {
        if (selectedIds.length === 0) return;
        if (confirm(`Yakin ingin menghapus ${selectedIds.length} pasien?`)) {
            selectedIds.forEach((id) =>
                Inertia.delete(`/resepsionis/pasien/${id}`),
            );
            setSelectedIds([]);
        }
    };

    const filteredPasien = pasien.filter(
        (p) =>
            p.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.nik.includes(searchQuery),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Pasien" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Pasien
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Kelola data pasien yang Anda daftarkan
                    </p>
                </div>

                {/* Action Bar */}
                <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="flex">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari pasien berdasarkan nama atau NIK..."
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
                        href="/resepsionis/pasien/create"
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Pasien
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
                                                    pasien.length &&
                                                pasien.length > 0
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
                                {filteredPasien.length > 0 ? (
                                    filteredPasien.map((item) => (
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
                                                {item.nomor_pasien}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-700">
                                                {item.nama_lengkap}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.nik}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.jenis_kelamin === 'L'
                                                    ? 'Laki-laki'
                                                    : 'Perempuan'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.tanggal_lahir
                                                    ? new Date(
                                                          item.tanggal_lahir,
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
                                                {item.umur
                                                    ? `${item.umur} tahun`
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.alamat}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <DropdownPasienResepsionis
                                                    id={item.id}
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
                                            Tidak ada data pasien.
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
                        Menampilkan {filteredPasien.length} dari {pasien.length}{' '}
                        pasien
                    </p>
                </div>

                {/* Selection Action Bar */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-lg border border-gray-200 bg-white px-6 py-3 shadow-lg">
                        <span className="text-sm font-medium text-gray-700">
                            {selectedIds.length} pasien dipilih
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={deleteSelected}
                                className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                            >
                                Hapus
                            </button>
                            <button
                                onClick={() => setSelectedIds([])}
                                className="ml-2 text-gray-400 transition hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
