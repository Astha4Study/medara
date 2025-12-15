import DataPasienResep from '@/components/data-pasien-resep';
import TablePembayaranResepsionis from '@/components/table-pembayaran-resepsionis';
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
    { title: 'Penyerahan Obat', href: '/apoteker/penyerahan-obat' },
    { title: 'Proses Penyerahan', href: '' },
];

export default function PenyerahanObatCreateApoteker({ resep }: Props) {
    const { post, processing } = useForm({});
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleConfirmSubmit = () => {
        post(route('apoteker.penyerahan-obat.store', resep.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenConfirm(false);
                toast.success('Obat berhasil diserahkan', {
                    description: `Resep ${resep.pasien.nomor_pasien} sudah diserahkan ke pasien.`,
                });
            },
            onError: () => {
                toast.error('Penyerahan gagal', {
                    description:
                        'Terjadi kesalahan saat memproses penyerahan obat.',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Proses Penyerahan Obat" />
            <div className="p-6">
                <div className="space-y-6">
                    {/* Data Pasien & Dokter */}
                    <DataPasienResep
                        pasien={resep.pasien}
                        dokter={resep.dokter}
                        diagnosa={resep.diagnosa}
                    />

                    {/* Tabel Detail Obat */}
                    <TablePembayaranResepsionis detail={resep.detail} />

                    {/* Tombol Aksi */}
                    <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <button
                            type="button"
                            disabled={processing}
                            onClick={() => setOpenConfirm(true)}
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                            Konfirmasi Penyerahan Obat
                        </button>
                    </div>
                </div>
            </div>

            {/* Dialog Konfirmasi */}
            <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Penyerahan Obat
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah kamu yakin ingin menyerahkan obat untuk resep
                            ini?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={processing}>
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmSubmit}
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            Ya, Serahkan Obat
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
