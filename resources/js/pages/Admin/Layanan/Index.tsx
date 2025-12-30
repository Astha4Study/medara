import DropdownLayananAdmin from '@/components/dropdown-layanan-admin';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, router, usePage } from '@inertiajs/react';
import { Filter, Plus, Search, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Layanan {
    id: number;
    nama_layanan: string;
    harga: number;
    aktif: boolean;
    updated_at: Date;
    detail_layanan: Array<{ keterangan: string }>;
}

interface PageProps {
    layanan: Layanan[];
    role: string;
    [key: string]: any;
}

const tableName = [
    'Nama Layanan',
    'Keterangan',
    'Harga',
    'Status',
    'Terakhir Diperbarui',
    'Aksi',
];

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Daftar Layanan', href: '' }];

export default function LayananIndexAdmin() {
    const { props } = usePage<PageProps>();
    const { layanan, flash } = usePage<PageProps>().props;
    const { klinik } = usePage<PageProps>().props;

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    const toggleSelectAll = () => {
        setSelectedIds(
            selectedIds.length === layanan.length
                ? []
                : layanan.map((l) => l.id),
        );
    };

    const deleteSelected = () => {
        if (!selectedIds.length) return;

        if (confirm(`Yakin ingin menghapus ${selectedIds.length} layanan?`)) {
            selectedIds.forEach((id) => Inertia.delete(`/admin/layanan/${id}`));
            setSelectedIds([]);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
            Inertia.delete(`/admin/layanan/${id}`);
        }
    };

    const handleCreateClick = () => {
        if (!klinik) {
            router.visit('/admin/klinik', {
                method: 'get',
                onSuccess: () => {
                    toast.error(
                        'Anda harus membuat klinik terlebih dahulu sebelum menambah layanan.',
                    );
                },
            });
        } else {
            router.visit('/admin/layanan/create');
        }
    };

    const filteredLayanan = layanan.filter((l) =>
        l.nama_layanan.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Layanan" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Layanan
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Kelola layanan yang tersedia di klinik
                    </p>
                </div>

                {/* Action Bar */}
                <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari layanan berdasarkan nama..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="min-w-[400px] rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm focus:border-emerald-400 focus:ring-emerald-400"
                            />
                        </div>

                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>

                    <button
                        onClick={handleCreateClick}
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Layanan
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr className="border-b border-gray-200">
                                    <th className="px-6 py-3 text-center">
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedIds.length ===
                                                    layanan.length &&
                                                layanan.length > 0
                                            }
                                            onChange={toggleSelectAll}
                                            className="mx-auto h-4 w-4 rounded border-gray-300 text-emerald-600"
                                        />
                                    </th>
                                    {tableName.map((v, i) => (
                                        <th
                                            key={i}
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            {v}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {filteredLayanan.length ? (
                                    filteredLayanan.map((l) => (
                                        <tr
                                            key={l.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-3 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(
                                                        l.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleSelect(l.id)
                                                    }
                                                    className="mx-auto h-4 w-4 rounded border-gray-300 text-emerald-600"
                                                />
                                            </td>

                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {l.nama_layanan}
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                <div className="line-clamp-2 max-w-md whitespace-normal">
                                                    {l.detail_layanan
                                                        .map(
                                                            (d) => d.keterangan,
                                                        )
                                                        .join(', ')}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                Rp{' '}
                                                {l.harga.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </td>

                                            <td className="px-6 py-4">
                                                <Badge
                                                    className={
                                                        l.aktif
                                                            ? 'inline-flex rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700'
                                                            : 'inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700'
                                                    }
                                                >
                                                    {l.aktif
                                                        ? 'Aktif'
                                                        : 'Tidak Aktif'}
                                                </Badge>
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                {new Date(
                                                    l.updated_at,
                                                ).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </td>

                                            <td className="space-x-3 px-6 py-4">
                                                <DropdownLayananAdmin
                                                    id={l.id}
                                                    namaLayanan={l.nama_layanan}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada layanan
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 text-sm text-gray-600">
                    Menampilkan {filteredLayanan.length} dari {layanan.length}{' '}
                    layanan
                </div>

                {/* Bulk Action */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-lg border bg-white px-6 py-3 shadow-lg">
                        <span className="text-sm font-medium text-gray-700">
                            {selectedIds.length} layanan dipilih
                        </span>

                        <button
                            onClick={deleteSelected}
                            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            Hapus
                        </button>

                        <button
                            onClick={() => setSelectedIds([])}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
