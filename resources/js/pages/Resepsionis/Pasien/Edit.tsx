import FormEditPasienResepsionis from '@/components/form-edit-pasien-resepsionis';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

type Pasien = {
    id: number;
    nama_lengkap: string;
    nik: string;
    jenis_kelamin: 'L' | 'P';
    tanggal_lahir?: string | null;
    tempat_lahir?: string | null;
    alamat: string;
    no_hp?: string | null;
    golongan_darah?: string | null;
    riwayat_penyakit?: string | null;
    alergi?: string | null;
};

type Props = {
    pasien: Pasien;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Pasien', href: '/resepsionis/pasien' },
    { title: 'Edit Pasien', href: '' },
];

export default function PasienEditResepsionis({ pasien }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nama_lengkap: pasien.nama_lengkap || '',
        nik: pasien.nik || '',
        jenis_kelamin: pasien.jenis_kelamin || 'L',
        tanggal_lahir: pasien.tanggal_lahir || '',
        tempat_lahir: pasien.tempat_lahir || '',
        alamat: pasien.alamat || '',
        no_hp: pasien.no_hp || '',
        golongan_darah: pasien.golongan_darah || '',
        riwayat_penyakit: pasien.riwayat_penyakit || '',
        alergi: pasien.alergi || '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as any);
            }
        });

        router.post(`/resepsionis/pasien/${pasien.id}?_method=PUT`, formData, {
            onSuccess: () => {
                toast.success('Berhasil!', {
                    description: 'Data pasien berhasil diperbarui.',
                });
            },
            onError: () => {
                toast.error('Gagal!', {
                    description:
                        'Terjadi kesalahan saat memperbarui data pasien.',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Pasien" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Edit Pasien
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Perbarui informasi data pasien
                    </p>
                </div>

                {/* Form Card */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <FormEditPasienResepsionis
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
