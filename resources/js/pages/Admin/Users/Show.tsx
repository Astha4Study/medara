import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

type Dokter = {
    max_antrian_per_hari: number;
    status: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    dokter?: Dokter | null;
};

interface Props {
    user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Users', href: '/admin/users' },
    { title: 'Detail User', href: '' },
];

export default function UsersShowAdmin({ user }: Props) {
    const tgl = (d: string) =>
        new Date(d).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });

    const roleLabel = (role: string) => {
        switch (role) {
            case 'dokter':
                return 'Dokter';
            case 'resepsionis':
                return 'Resepsionis';
            case 'apoteker':
                return 'Apoteker';
            default:
                return role;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail User" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Detail User
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Informasi lengkap akun pengguna
                        </p>
                    </div>
                </div>

                {/* Card */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Nama */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Nama Lengkap
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {user.name}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {user.email}
                                </div>
                            </div>

                            {/* Role */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm font-medium text-emerald-600">
                                    {roleLabel(user.role)}
                                </div>
                            </div>

                            {/* Dibuat */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Tanggal Dibuat
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {tgl(user.created_at)}
                                </div>
                            </div>
                        </div>

                        {/* Data Dokter */}
                        {user.role === 'dokter' && user.dokter && (
                            <div className="mt-6">
                                <h2 className="mb-3 text-sm font-semibold text-gray-900">
                                    Informasi Dokter
                                </h2>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Maks. Antrian / Hari
                                        </label>
                                        <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                            {user.dokter.max_antrian_per_hari}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Status
                                        </label>
                                        <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                            {user.dokter.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <Link
                            href={`/admin/users/${user.id}/edit`}
                            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
                        >
                            Edit User
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
