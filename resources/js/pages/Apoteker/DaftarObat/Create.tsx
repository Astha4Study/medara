import FormCreateObatApoteker from '@/components/form-create-obat-apoteker';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

export default function DaftarObatCreateApoteker() {
    const { data, setData, processing, post, reset, errors } = useForm({
        nama_obat: '',
        satuan: '',
        stok: 0,
        harga: '',
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/apoteker/daftar-obat', {
            onSuccess: () => {
                toast.success('Obat berhasil ditambahkan');
                reset();
            },
            onError: () => {
                toast.error('Gagal menambahkan obat, periksa kembali formulir');
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Obat', href: '/apoteker/daftar-obat' },
        { title: 'Tambah Obat', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Daftar Obat" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Tambah Data Obat
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Tambahkan data obat baru dengan melengkapi data berikut
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <FormCreateObatApoteker
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        processing={processing}
                        errors={errors}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
