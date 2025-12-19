import DataRingkasanPasienAntrian from '@/components/data-ringkasan-pasien-antrian';
import FormCreateAntrian from '@/components/form-create-antrian';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Pasien {
    id: number;
    nama_lengkap: string;
    golongan_darah: string;
    riwayat_penyakit: string;
    alergi: string;
    jenis_kelamin: string;
    umur: number;
}

interface Props {
    pasien: Pasien;
}

const today = new Date().toISOString().split('T')[0];

export default function AntrianCreateResepsionis({ pasien }: Props) {
    const { data, setData, post, processing, reset, errors } = useForm({
        pasien_id: pasien.id,
        keluhan: '',
        berat_badan: 0,
        tinggi_badan: 0,
        suhu_tubuh: 0,
        tekanan_darah: '',
        kondisi_khusus: '',
        tanggal_kunjungan: today,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('resepsionis.antrian.store', data.pasien_id), {
            onSuccess: () => {
                reset();
                toast.success('Antrian pasien berhasil dibuat!');
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat membuat antrian.');
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Antrian', href: '/resepsionis/antrian' },
        { title: 'Buat Antrian Pasien', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Antrian" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Buat Antrian Pasien
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Lengkapi data untuk membuat antrian
                    </p>
                </div>

                <div className="space-y-6">
                    <DataRingkasanPasienAntrian
                        pasien={pasien}
                        tanggalKunjungan={data.tanggal_kunjungan}
                    />

                    <FormCreateAntrian
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
