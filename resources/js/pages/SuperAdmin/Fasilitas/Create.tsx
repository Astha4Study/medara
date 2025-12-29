import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

export default function FasilitasCreateSuperAdmin() {
    const { data, setData, processing, post, reset, errors } = useForm({
        nama: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setData('nama', e.target.value);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/super-admin/fasilitas-klinik', {
            onSuccess: () => {
                reset();
                toast.success('Berhasil!', {
                    description: 'Fasilitas berhasil ditambahkan.',
                });
            },
            onError: () => {
                toast.error('Gagal!', {
                    description:
                        'Terjadi kesalahan saat menambahkan fasilitas.',
                });
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Fasilitas', href: '/super-admin/fasilitas-klinik' },
        { title: 'Tambah Fasilitas', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Fasilitas" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Tambah Fasilitas
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Lengkapi nama fasilitas berikut
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="p-6">
                            <div className="w-full">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Nama Fasilitas{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    placeholder="Contoh: USG, EKG, Ruang Tindakan"
                                />
                                {errors.nama && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.nama}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                            <Link
                                href="/super-admin/fasilitas-klinik"
                                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
