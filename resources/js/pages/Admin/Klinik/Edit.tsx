import FormEditKlinikAdmin from '@/components/form-edit-klinik-admin';
import PreviewEditKlinik from '@/components/preview-edit-klinik';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

type Klinik = {
    id: number;
    nama_klinik?: string;
    jenis_klinik?: string;
    alamat?: string;
    kota?: string;
    provinsi?: string;
    no_telepon?: string;
    email?: string;
    deskripsi?: string;
    latitude?: string;
    longitude?: string;
    kapasitas_total?: number;
    kapasitas_tersedia?: number;
    punya_apoteker?: boolean;
    punya_server?: boolean;
    gambar?: File | null;
};

type Props = {
    klinik: Klinik;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Klinik Kamu', href: '/admin/klinik' },
    { title: 'Edit Klinik Kamu', href: '' },
];

export default function KlinikEditAdmin({ klinik }: Props) {
    const { data, setData, processing, errors } = useForm({
        nama_klinik: klinik.nama_klinik ?? '',
        jenis_klinik: klinik.jenis_klinik ?? '',
        alamat: klinik.alamat ?? '',
        kota: klinik.kota ?? '',
        provinsi: klinik.provinsi ?? '',
        no_telepon: klinik.no_telepon ?? '',
        email: klinik.email ?? '',
        deskripsi: klinik.deskripsi ?? '',
        latitude: klinik.latitude ?? '',
        longitude: klinik.longitude ?? '',
        kapasitas_total: klinik.kapasitas_total ?? 0,
        kapasitas_tersedia: klinik.kapasitas_tersedia ?? 0,
        punya_apoteker: Boolean(klinik.punya_apoteker),
        punya_server: Boolean(klinik.punya_server),
        gambar: undefined as File | undefined,
    });

    const [preview, setPreview] = useState<string | null>(
        klinik.gambar ? `/storage/${klinik.gambar}` : null,
    );

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('gambar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                const safeValue = value as unknown;
                if (safeValue instanceof Blob) {
                    formData.append(key, safeValue);
                } else {
                    formData.append(key, String(safeValue));
                }
            }
        });

        router.post(`/admin/klinik/${klinik.id}?_method=PUT`, formData, {
            onSuccess: () => {
                toast.success('Klinik berhasil diperbarui', {
                    description:
                        'Data klinik telah berhasil disimpan ke sistem.',
                });
            },
            onError: (err) => {
                toast.error('Gagal memperbarui klinik', {
                    description:
                        'Terjadi kesalahan saat menyimpan data klinik.',
                });
                console.error(err);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Klinik Kamu" />

            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Edit Data Klinik
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Perbarui informasi klinik di bawah ini.
                </p>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Form sebelah kiri */}
                    <div className="lg:col-span-2">
                        <FormEditKlinikAdmin
                            data={data}
                            setData={setData}
                            handleSubmit={handleSubmit}
                            handleChangeFile={handleChangeFile}
                            processing={processing}
                            errors={errors}
                        />
                    </div>

                    {/* Preview sebelah kanan */}
                    <div className="self-start">
                        <PreviewEditKlinik data={{ ...data, preview }} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
