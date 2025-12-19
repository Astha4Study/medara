import DataPasienTangani from '@/components/data-pasien-tangani';
import DataPemeriksaanFisik from '@/components/data-pemeriksaan-fisik';
import FormCreateCatatanLayananDokter from '@/components/form-create-catatan-layanan-dokter';
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
import { useCatatanLayananStore } from '@/stores/catatan-layanan.store';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Pasien = {
    id: number;
    klinik_id: number;
    nama_lengkap: string;
    nomor_pasien?: string;
    nik?: string | number;
    tanggal_lahir?: string | null;
    tempat_lahir?: string;
    no_hp?: string | number;
    golongan_darah?: string | null;
    riwayat_penyakit?: string | null;
    alergi?: string | null;
};

type Klinik = {
    id: number;
};

type Antrian = {
    id: number;
    keluhan?: string | null;
    tanggal_kunjungan?: string;
};

type PemeriksaanFisik = {
    id: number;
    berat_badan: number | null;
    tinggi_badan: number | null;
    suhu_tubuh: number | null;
    tekanan_darah: string | null;
    kondisi_khusus: string | null;
};

type Props = {
    pasien: Pasien;
    klinik: Klinik;
    antrian: Antrian;
    pemeriksaan_fisik: PemeriksaanFisik;
    punya_server: number;
};

export default function TindakanCreateDokter({
    pasien,
    klinik,
    antrian,
    punya_server,
    pemeriksaan_fisik,
}: Props) {
    const {
        data,
        setData,
        reset,
        setProcessing,
        setErrors,
        processing,
        errors,
    } = useCatatanLayananStore();
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        reset();
    }, []);

    useEffect(() => {
        setData('antrian_id', antrian.id);
        setData('pasien_id', pasien.id);
        setData('klinik_id', klinik.id);
        setData('pemeriksaan_fisik_id', pemeriksaan_fisik?.id);
        setData('keluhan_utama', antrian.keluhan ?? '');
    }, [antrian.id, pasien.id, klinik.id, pemeriksaan_fisik?.id]);

    useEffect(() => {
        setProcessing(false);
        setErrors({});
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setProcessing(true);

        /* validasi hanya bila punya server */
        if (punya_server === 1) {
            if (
                !String(data.detail_keluhan || '').trim() ||
                !String(data.diagnosa || '').trim() ||
                !String(data.tindakan || '').trim()
            ) {
                setErrors({
                    detail_keluhan: 'Wajib diisi',
                    diagnosa: 'Wajib diisi',
                    tindakan: 'Wajib diisi',
                });
                toast.error('Lengkapi data rekam medis terlebih dahulu');
                setProcessing(false);
                return;
            }

            setConfirmOpen(true);
            setProcessing(false);
            return;
        }

        router.visit(`/dokter/antrian/${antrian.id}/resep/create`);
    };

    const confirmAndSend = () => {
        setProcessing(true);
        router.visit(`/dokter/antrian/${antrian.id}/resep/create`);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Antrian', href: '/dokter/antrian' },
        { title: 'Buat Tindakan Dokter', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Tindakan Dokter" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Buat Tindakan untuk {pasien.nama_lengkap}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Buat tindakan yang akan di lakukan
                    </p>
                </div>

                <div className="space-y-6">
                    <DataPasienTangani pasien={pasien} />

                    <DataPemeriksaanFisik
                        pemeriksaanFisik={pemeriksaan_fisik}
                    />

                    <FormCreateCatatanLayananDokter
                        punyaServer={punya_server}
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        errors={errors}
                    />
                </div>

                <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {punya_server === 0
                                    ? 'Apakah kamu sudah benar-benar mendata pasien ini?'
                                    : 'Apakah kamu sudah selesai mendata pasien ini?'}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Pastikan data pasien sudah sesuai sebelum
                                menyimpan catatan layanan.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-emerald-600 hover:bg-emerald-700"
                                onClick={confirmAndSend}
                            >
                                Ya, lanjut ke resep
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
