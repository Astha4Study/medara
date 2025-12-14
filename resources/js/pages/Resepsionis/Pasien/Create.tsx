import FormCreatePasien from '@/components/form-create-pasien';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

export default function PasienCreateResepsionis() {
    const { data, setData, processing, post, reset, errors } = useForm({
        nama_lengkap: '',
        nik: '',
        jenis_kelamin: 'L',
        tanggal_lahir: '',
        tempat_lahir: '',
        alamat: '',
        no_hp: '',
        golongan_darah: '',
        riwayat_penyakit: '',
        alergi: '',
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleNikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 16) setData('nik', value);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/resepsionis/pasien', {
            onSuccess: () => {
                reset();
                toast.success('Berhasil!', {
                    description: 'Data pasien berhasil ditambahkan.',
                });
            },
            onError: () => {
                toast.error('Gagal!', {
                    description: 'Terjadi kesalahan saat menambahkan pasien.',
                });
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Pasien', href: '/resepsionis/pasien' },
        { title: 'Tambah Pasien', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pasien" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Tambah Pasien
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Lengkapi data pasien berikut
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <FormCreatePasien
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleNikChange={handleNikChange}
                        processing={processing}
                        errors={errors}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
