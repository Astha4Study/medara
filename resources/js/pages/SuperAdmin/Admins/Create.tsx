import FormCreateAdmin from '@/components/form-create-admin';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

export default function AdminsCreateSuperAdmin() {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'admin',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!data.name.trim() || !data.email.trim()) {
            toast.error('Nama & email wajib diisi');
            return;
        }

        post('/super-admin/kelola-admin', {
            onSuccess: () => {
                reset();
                toast.success('Admin berhasil ditambahkan!');
            },
            onError: (errs) => {
                const msg = Object.values(errs as Record<string, string>)[0];
                toast.error(msg || 'Gagal menambahkan admin');
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Admin', href: '/super-admin/kelola-admin' },
        { title: 'Tambah Admin', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Admin" />

            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Tambah Data Admin
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Lengkapi data admin di bawah untuk menambahkan ke daftar.
                </p>

                <div className="grid grid-cols-1 gap-6">
                    <div className="lg:col-span-2">
                        <FormCreateAdmin
                            data={data}
                            setData={setData}
                            handleSubmit={handleSubmit}
                            processing={processing}
                            availableRoles={['admin']}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
