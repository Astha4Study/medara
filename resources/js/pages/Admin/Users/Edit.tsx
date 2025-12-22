import FormEditUsersAdmin from '@/components/form-edit-users-admin';
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
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

type Props = {
    user: User;
    availableRoles: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar User', href: '/admin/users' },
    { title: 'Edit User', href: '' },
];

export default function UsersEditAdmin({ user, availableRoles }: Props) {
    const { data, setData, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',

        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

    const isPasswordChangeValid =
        data.current_password.length > 0 &&
        data.new_password.length > 0 &&
        data.new_password_confirmation.length > 0 &&
        data.new_password === data.new_password_confirmation;

    useEffect(() => {
        const original = {
            name: user.name || '',
            email: user.email || '',
            role: user.role || '',
        };

        const basicChanged =
            data.name !== original.name ||
            data.email !== original.email ||
            data.role !== original.role;

        const passwordAttempted =
            data.current_password.length > 0 ||
            data.new_password.length > 0 ||
            data.new_password_confirmation.length > 0;

        const passwordValid = isPasswordChangeValid;

        setIsDirty(basicChanged || (passwordAttempted && passwordValid));
    }, [data, user]);

    const realSubmit = () => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('role', data.role);

        if (isPasswordChangeValid) {
            formData.append('current_password', data.current_password);
            formData.append('new_password', data.new_password);
            formData.append(
                'new_password_confirmation',
                data.new_password_confirmation,
            );
        }

        router.post(`/admin/users/${user.id}?_method=PUT`, formData, {
            onSuccess: () => {
                toast.success('User berhasil diperbarui', {
                    description: 'Data user telah berhasil disimpan ke sistem.',
                });
            },
            onError: () => {
                toast.error('Gagal memperbarui user', {
                    description: 'Periksa kembali data yang diinput.',
                });
            },
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlertOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />

            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Edit Data User
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Perbarui informasi user di bawah ini.
                </p>

                <div className="overflow-hidden">
                    <FormEditUsersAdmin
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        availableRoles={availableRoles}
                        errors={errors}
                        isDirty={isDirty}
                    />
                </div>
            </div>

            {/* Alert Konfirmasi */}
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Perubahan
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Pastikan data user sudah benar sebelum disimpan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={realSubmit}>
                            Simpan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
