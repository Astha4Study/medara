import DropdownMenuFasilitas from '@/components/dropdown-menu-fasilitas-klinik';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/react';
import { Filter, Plus, Search, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Fasilitas = {
    id: number;
    nama: string;
    created_at: string;
};

type PageProps = {
    fasilitas: Fasilitas[];
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Daftar Fasilitas', href: '' }];

export default function FasilitasIndexSuperAdmin() {
    const { fasilitas } = usePage<PageProps>().props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSelect = (id: number) =>
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );

    const toggleSelectAll = () =>
        setSelectedIds(
            selectedIds.length === fasilitas.length
                ? []
                : fasilitas.map((f) => f.id),
        );

    const deleteSelected = () => {
        if (selectedIds.length === 0) return;
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        selectedIds.forEach((id, index) =>
            Inertia.delete(`/super-admin/fasilitas-klinik/${id}`, {
                onSuccess: () => {
                    toast.success('Fasilitas berhasil dihapus');
                },
                onFinish: () => {
                    if (index === selectedIds.length - 1) {
                        setSelectedIds([]);
                        setShowDeleteModal(false);
                    }
                },
            }),
        );
    };

    const filtered = fasilitas.filter((f) =>
        f.nama.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Fasilitas" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Fasilitas
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Kelola data fasilitas klinik
                    </p>
                </div>

                {/* Action Bar */}
                <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="flex">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari fasilitas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full min-w-[300px] rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-400 transition focus:border-emerald-400 focus:ring-emerald-400"
                            />
                        </div>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>

                    <Link
                        href="/super-admin/fasilitas-klinik/create"
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Fasilitas
                    </Link>
                </div>

                {/* Tabel */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedIds.length ===
                                                    fasilitas.length &&
                                                fasilitas.length > 0
                                            }
                                            onChange={toggleSelectAll}
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Nama Fasilitas
                                    </th>
                                    {/* Kolom baru */}
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Tanggal Buat
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {filtered.length ? (
                                    filtered.map((f, idx) => (
                                        <tr
                                            key={f.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(
                                                        f.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleSelect(f.id)
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-gray-900">
                                                {f.nama}
                                            </td>
                                            {/* Tampilkan tanggal */}
                                            <td className="px-6 py-4 text-left text-gray-700">
                                                {new Date(
                                                    f.created_at,
                                                ).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="flex justify-center px-6 py-4">
                                                <DropdownMenuFasilitas
                                                    id={f.id}
                                                    nama={f.nama}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        {/* Ubah colSpan jadi 5 */}
                                        <td
                                            colSpan={5}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada data fasilitas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer info */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <p>
                        Menampilkan {filtered.length} dari {fasilitas.length}{' '}
                        fasilitas
                    </p>
                </div>

                {/* Bar aksi massal */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-lg border border-gray-200 bg-white px-6 py-3 shadow-lg">
                        <span className="text-sm font-medium text-gray-700">
                            {selectedIds.length} fasilitas dipilih
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
            {showDeleteModal && (
                <AlertDialog
                    open={showDeleteModal}
                    onOpenChange={setShowDeleteModal}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Yakin ingin menghapus?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Kamu akan menghapus {selectedIds.length}{' '}
                                fasilitas. Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={confirmDelete}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                Ya, Hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </AppLayout>
    );
}
