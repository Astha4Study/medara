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
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    pasien: {
        id: number;
        nama_lengkap: string;
        nomor_pasien: string;
        nik: number;
        tanggal_lahir: Date;
        tempat_lahir: string;
        no_hp: number;
        golongan_darah: string;
        riwayat_penyakit: string;
        alergi: string;
    };

    antrian: {
        id: number;
        keluhan: string | null;
        tanggal_kunjungan: string;
    };

    punya_server: number;
};

export default function TindakanCreateDokter({
    antrian,
    pasien,
    punya_server,
}: Props) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { data, setData, processing, post, reset, errors } = useForm({
        keluhan_utama: antrian.keluhan || '',
        detail_keluhan: '',
        diagnosa: '',
        tindakan: '',
        catatan_lain: '',
    });

    const submitToServer = () => {
        post(`/dokter/antrian/${antrian.id}/tangani`, {
            onSuccess: () => {
                reset();
                if (punya_server == 1) {
                    toast.success('Data berhasil disimpan');
                }
            },
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setConfirmOpen(true);
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
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        errors={errors}
                        pasien={pasien}
                        punyaServer={punya_server}
                    />
                </div>
                <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {punya_server == 0
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
                                className="bg-emerald-600 transition hover:bg-emerald-700"
                                onClick={submitToServer}
                            >
                                Ya, simpan
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
