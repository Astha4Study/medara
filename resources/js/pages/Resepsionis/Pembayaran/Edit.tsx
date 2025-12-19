import DataPasienResep from '@/components/data-pasien-resep';
import FormKalkulatorResepsionis from '@/components/form-kalkulator-resepsionis';
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
    { title: 'Pembayaran Resep', href: '/resepsionis/pembayaran' },
    { title: 'Proses Pembayaran', href: '' },
];

export default function PembayaranCreateResepsionis({ resep }: Props) {
    const { data, setData, put, processing } = useForm({
        uang_dibayar: 0,
        metode_pembayaran: 'cash',
    });

    const [openConfirm, setOpenConfirm] = useState(false);

    const handleConfirmSubmit = () => {
        put(route('resepsionis.pembayaran.update', resep.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenConfirm(false);
                toast.success('Pembayaran berhasil', {
                    description: `Kembalian: Rp ${(
                        data.uang_dibayar - resep.total_harga
                    ).toLocaleString('id-ID')}`,
                });
            },
            onError: () => {
                toast.error('Pembayaran gagal', {
                    description: 'Terjadi kesalahan saat memproses pembayaran.',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Proses Pembayaran Resep" />
            <div className="p-6">
                <div className="space-y-6">
                    {/* Data Pasien & Dokter */}
                    <DataPasienResep
                        pasien={resep.pasien}
                        diagnosa={resep.diagnosa}
                    />

                    <TablePembayaranResepsionis detail={resep.detail} />

                    <FormKalkulatorResepsionis
                        totalHarga={resep.total_harga}
                        data={data}
                        setData={setData}
                        processing={processing}
                        onSubmit={() => setOpenConfirm(true)}
                    />
                </div>
            </div>

            {/* Dialog Konfirmasi */}
            <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Pembayaran
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah kamu yakin ingin memproses pembayaran resep
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
                            Ya, Proses Pembayaran
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
