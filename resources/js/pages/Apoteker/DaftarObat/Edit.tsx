import FormEditObatApoteker from '@/components/form-edit-obat-apoteker';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

type DaftarObat = {
    id: number;
    nama_obat: string;
    jenis_obat: string;
    satuan: string;
    stok: number;
    harga: number;
    penggunaan_obat: string;
};

type props = {
    obat: DaftarObat;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Obat', href: '/apoteker/daftar-obat' },
    { title: 'Edit Daftar Obat', href: '' },
];

export default function DaftarObatEditApoteker({ obat }: props) {
    const { data, setData, put, processing, errors } = useForm({
        nama_obat: obat.nama_obat || '',
        jenis_obat: obat.jenis_obat || 'tablet',
        satuan: obat.satuan || 'strip',
        stok: obat.stok || 0,
        harga: Number(obat.harga),
        penggunaan_obat: obat.penggunaan_obat || '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(`/apoteker/daftar-obat/${obat.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Daftar Obat" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Edit Obat
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Perbarui informasi data pada daftar obat
                    </p>
                </div>

                {/* Form Card */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <FormEditObatApoteker
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        errors={errors}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
