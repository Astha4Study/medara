import FormCreateUser from '@/components/form-create-user';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

export default function UsersCreateAdmin() {
    const { props } = usePage();
    const availableRoles: string[] = Array.isArray(props.availableRoles)
        ? props.availableRoles
        : [];

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: availableRoles[0] ?? '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/tambah-user', {
            onSuccess: () => {
                toast.success('User berhasil ditambahkan', {
                    description: 'Data user baru telah disimpan ke sistem.',
                });
                reset();
            },
            onError: () => {
                toast.error('Gagal menambahkan user', {
                    description: 'Terjadi kesalahan saat menyimpan data user.',
                });
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar User', href: '/admin/tambah-user' },
        { title: 'Tambah User', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah User" />

            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Tambah Data User
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Lengkapi data user di bawah untuk menambahkan ke daftar.
                </p>

                <div className="grid grid-cols-1 gap-6">
                    <div className="lg:col-span-2">
                        <FormCreateUser
                            data={data}
                            setData={setData}
                            handleSubmit={handleSubmit}
                            processing={processing}
                            availableRoles={availableRoles}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
