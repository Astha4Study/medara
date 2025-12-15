import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

type Admin = {
    id: number;
    name: string;
    email: string;
    created_at: string;
};

type Props = { admin: Admin };

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Admin', href: '/super-admin/kelola-admin' },
    { title: 'Detail Admin', href: '' },
];

export default function AdminsShowSuperAdmin({ admin }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Admin" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Detail Admin
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Informasi lengkap admin
                    </p>
                </div>

                {/* Card */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Nama
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {admin.name}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {admin.email}
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Tanggal Dibuat
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {admin.created_at}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer tanpa kotak */}
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <Link
                            href={`/super-admin/kelola-admin/${admin.id}/edit`}
                            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
                        >
                            Edit Admin
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
