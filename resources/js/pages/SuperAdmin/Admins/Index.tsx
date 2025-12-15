import DropdownAdminSuperAdmin from '@/components/dropdown-menu-tambah-admin-super-admin';
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
import type { BreadcrumbItem } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Filter, Plus, Search, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Admin {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

interface PageProps {
    admins: Admin[];
    [key: string]: any;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Daftar Admin', href: '' }];

export default function AdminsIndexSuperAdmin() {
    const { props } = usePage<PageProps>();
    const { admins } = props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [toDelete, setToDelete] = useState<number | null>(null);
    const [bulkDelete, setBulkDelete] = useState(false);

    const filteredAdmins = admins.filter(
        (a) =>
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const toggleSelect = (id: number) =>
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );

    const openSingleDelete = (id: number) => {
        setToDelete(id);
        setBulkDelete(false);
        setDialogOpen(true);
    };

    const confirmSingleDelete = () => {
        if (!toDelete) return;
        router.delete(`/super-admin/kelola-admin/${toDelete}`, {
            onSuccess: () => {
                toast.success('Admin berhasil dihapus');
                setSelectedIds((prev) => prev.filter((i) => i !== toDelete));
            },
            onError: () => toast.error('Gagal menghapus admin'),
        });
        setDialogOpen(false);
        setToDelete(null);
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === admins.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(admins.map((a) => a.id));
        }
    };

    const openBulkDelete = () => {
        if (selectedIds.length === 0) return;
        setBulkDelete(true);
        setDialogOpen(true);
    };

    const confirmBulkDelete = () => {
        if (selectedIds.length === 0) return;
        selectedIds.forEach((id) =>
            router.delete(`/super-admin/kelola-admin/${id}`, {
                onSuccess: () => {
                    toast.success(
                        `${selectedIds.length} admin berhasil dihapus`,
                    );
                    setSelectedIds([]);
                },
                onError: () => toast.error('Gagal menghapus beberapa admin'),
            }),
        );
        setDialogOpen(false);
        setBulkDelete(false);
    };

    const deleteSelected = () => {
        if (selectedIds.length === 0) return;
        if (confirm(`Yakin ingin menghapus ${selectedIds.length} admin?`)) {
            selectedIds.forEach((id) =>
                Inertia.delete(`/super-admin/admins/${id}`),
            );
            setSelectedIds([]);
        }
    };

    const handleDeleteFromDropdown = (id: number) => {
        openSingleDelete(id);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah anda yakin ingin menghapus admin ini?')) {
            Inertia.delete(`/super-admin/admins/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Admin" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Admin
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Kelola data admin yang terdaftar
                    </p>
                </div>

                {/* Action Bar */}
                <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="flex">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari admin berdasarkan nama atau email..."
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
                        href="/super-admin/kelola-admin/create"
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Admin
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
                                                    admins.length &&
                                                admins.length > 0
                                            }
                                            onChange={toggleSelectAll}
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Tanggal Dibuat
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredAdmins.length > 0 ? (
                                    filteredAdmins.map((admin) => (
                                        <tr
                                            key={admin.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(
                                                        admin.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleSelect(admin.id)
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {admin.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {admin.email}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {admin.created_at}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <DropdownAdminSuperAdmin
                                                    id={admin.id}
                                                    name={admin.name}
                                                    onDelete={() =>
                                                        handleDeleteFromDropdown(
                                                            admin.id,
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada data admin.
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
                        Menampilkan {filteredAdmins.length} dari {admins.length}{' '}
                        admin
                    </p>
                </div>

                {/* Selection Action Bar */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-lg border border-gray-200 bg-white px-6 py-3 shadow-lg">
                        <span className="text-sm font-medium text-gray-700">
                            {selectedIds.length} admin dipilih
                        </span>
                        <button
                            onClick={openBulkDelete}
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

            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {bulkDelete
                                ? 'Hapus beberapa admin?'
                                : 'Hapus admin?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {bulkDelete
                                ? `Admin yang dipilih (${selectedIds.length}) akan dihapus secara permanen.`
                                : 'Admin ini akan dihapus secara permanen.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={
                                bulkDelete
                                    ? confirmBulkDelete
                                    : confirmSingleDelete
                            }
                        >
                            Ya, Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
