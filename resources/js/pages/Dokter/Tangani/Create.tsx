import FormCreateCatatanLayanan from '@/components/form-create-catatan-layanan';
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

type Props = {
    pasien: Pasien;
    klinik: Klinik;
    antrian: Antrian;
    punya_server: number;
};

export default function TindakanCreateDokter({
    pasien,
    klinik,
    antrian,
    punya_server,
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
        setData('antrian_id', antrian.id);
        setData('pasien_id', pasien.id);
        setData('klinik_id', klinik.id);
        setData('keluhan_utama', antrian.keluhan ?? '');
    }, [antrian.id, pasien.id, klinik.id]);

    useEffect(() => {
        setData('keluhan_utama', antrian.keluhan || '');
    }, [antrian.id]);

    useEffect(() => {
        setProcessing(false);
        setErrors({});
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setProcessing(true);

        if (
            !String(data.detail_keluhan || '').trim() ||
            !String(data.diagnosa || '').trim() ||
            !String(data.tindakan || '').trim()
        ) {
            const errs = {
                general: 'Detail keluhan, diagnosa, dan tindakan wajib diisi.',
            };
            setErrors(errs);
            toast.error(errs.general);
            setProcessing(false);
            return;
        }

        setConfirmOpen(true);
        setProcessing(false);
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

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <FormCreateCatatanLayanan
                        pasien={pasien}
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
