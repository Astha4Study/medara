import DropdownUsersAdmin from '@/components/dropdown-users-admin';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, router, usePage } from '@inertiajs/react';
import { Filter, Plus, Search, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
}

interface PageProps {
    users: User[];
    role: string;
    [key: string]: any;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Daftar User', href: '' }];

export default function UsersIndexAdmin() {
    const { props } = usePage<PageProps>();
    const { users, flash, klinik } = usePage<PageProps>().props;

    const hasKlinik = !!klinik;

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    const toggleSelectAll = () => {
        setSelectedIds(
            selectedIds.length === users.length ? [] : users.map((u) => u.id),
        );
    };

    const deleteSelected = () => {
        if (!selectedIds.length) return;

        if (confirm(`Yakin ingin menghapus ${selectedIds.length} user?`)) {
            selectedIds.forEach((id) =>
                Inertia.delete(`/admin/tambah-user/${id}`, {
                    onSuccess: () => {
                        toast.success('User berhasil dihapus', {
                            description: `Data ${selectedIds.length} user telah dihapus dari sistem.`,
                        });
                    },
                    onError: () => {
                        toast.error('Gagal menghapus user', {
                            description:
                                'Terjadi kesalahan saat menghapus data user.',
                        });
                    },
                }),
            );
            setSelectedIds([]);
        }
    };

    const handleCreateClick = () => {
        if (!hasKlinik) {
            router.visit('/admin/klinik', {
                onSuccess: () => {
                    toast.error(
                        'Anda harus membuat fasilitas klinik terlebih dahulu sebelum menambahkan user.',
                    );
                },
            });
        } else {
            router.visit('/admin/tambah-user/create');
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah anda yakin ingin menghapus user ini?')) {
            Inertia.delete(`/admin/tambah-user/${id}`, {
                onSuccess: () => {
                    toast.success('User berhasil dihapus', {
                        description: 'Data user telah dihapus dari sistem.',
                    });
                },
                onError: () => {
                    toast.error('Gagal menghapus user', {
                        description:
                            'Terjadi kesalahan saat menghapus data user.',
                    });
                },
            });
        }
    };

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar User" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar User
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Kelola data user yang terdaftar
                    </p>
                </div>

                {/* Action Bar */}
                <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari user berdasarkan nama atau email..."
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
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah User
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
                                                    users.length &&
                                                users.length > 0
                                            }
                                            onChange={toggleSelectAll}
                                            className="mx-auto h-4 w-4 rounded border-gray-300 text-emerald-600"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.length ? (
                                    filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-3 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(
                                                        user.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleSelect(user.id)
                                                    }
                                                    className="mx-auto h-4 w-4 rounded border-gray-300 text-emerald-600"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 capitalize">
                                                {user.roles.join(', ')}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <DropdownUsersAdmin
                                                    id={user.id}
                                                    name={user.name}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada data user
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 text-sm text-gray-600">
                    Menampilkan {filteredUsers.length} dari {users.length} user
                </div>

                {/* Bulk Action */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-lg border bg-white px-6 py-3 shadow-lg">
                        <span className="text-sm font-medium text-gray-700">
                            {selectedIds.length} user dipilih
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
