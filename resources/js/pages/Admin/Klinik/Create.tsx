import FormCreateKlinik from '@/components/form-create-klinik-admin';
import PreviewCreateKlinik from '@/components/preview-create-klinik';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler } from 'react';

export default function KlinikCreateAdmin() {
    const { data, setData, post, processing, reset } = useForm({
        nama_klinik: '',
        jenis_klinik: '',
        alamat: '',
        kota: '',
        provinsi: '',
        no_telepon: '',
        email: '',
        deskripsi: '',
        latitude: '',
        longitude: '',
        kapasitas_total: 0,
        kapasitas_tersedia: 0,
        spesialisasi: '',
        punya_apoteker: 0,
        punya_server: 0,
        gambar: null as File | null,
    });

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('gambar', e.target.files[0]);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/klinik', {
            onSuccess: () => reset(),
            forceFormData: true,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Klinik Kamu', href: '/klinik' },
        { title: 'Tambah Klinik', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Klinik" />
            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Tambah Data Klinik
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Lengkapi data klinik di bawah untuk menambahkan ke daftar.
                </p>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* form */}
                    <div className="lg:col-span-2">
                        <FormCreateKlinik
                            data={data}
                            setData={setData}
                            handleSubmit={handleSubmit}
                            handleChangeFile={handleChangeFile}
                            processing={processing}
                        />
                    </div>

                    {/* preview */}
                    <div className="self-start">
                        <PreviewCreateKlinik data={data} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
