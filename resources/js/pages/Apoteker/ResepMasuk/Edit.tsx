import DataPasienResep from '@/components/data-pasien-resep';
import FormChecklistResepMasukApoteker from '@/components/form-checklist-resep-masuk-apoteker';
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

import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

type Resep = {
    id: number;
    total_harga: number;
    status: string;
    diagnosa: string;

    pasien: {
        nama_lengkap: string;
        nomor_pasien: string;
        nik: string;
        riwayat_penyakit: string;
    };

    dokter: {
        nama: string;
    };

    detail: {
        id: number;
        nama_obat: string;
        jumlah: number;
        satuan: string;
        harga: number;
        subtotal: number;
    }[];
};

type Props = {
    resep: Resep;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Resep Masuk', href: '/apoteker/resep-masuk' },
    { title: 'Siapkan Obat Pasien', href: '' },
];

export default function ResepMasukEditApoteker({ resep }: Props) {
    const { put, processing } = useForm();
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOpenConfirm(true);
    };

    const handleConfirmSubmit = () => {
        put(route('apoteker.resep-masuk.update', resep.id), {
            preserveScroll: true,
            onSuccess: () => setOpenConfirm(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Siapkan Obat Pasien" />
            <div className="p-6">
                <div>
                    <DataPasienResep
                        pasien={resep.pasien}
                        dokter={resep.dokter}
                        diagnosa={resep.diagnosa}
                    />

                    <FormChecklistResepMasukApoteker
                        resep={resep}
                        handleSubmit={handleSubmit}
                        processing={processing}
                    />
                </div>
            </div>
            <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Pengecekan Obat
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah kamu yakin sudah mengecek obat dengan baik
                            dan sesuai dengan resep dokter?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={processing}>
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmSubmit}
                            disabled={processing}
                            className='bg-emerald-600 hover:bg-emerald-700'
                        >
                            Ya, Sudah Dicek
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
