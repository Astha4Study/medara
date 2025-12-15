import FormCreateResep from '@/components/form-create-resep';
import AppLayout from '@/layouts/app-layout';
import { useCatatanLayananStore } from '@/stores/catatan-layanan.store';
import { useResepStore } from '@/stores/resep.store';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

type Props = {
    pasien: { id: number; nama_lengkap: string; nomor_pasien?: string };
    obat_list: {
        id: number;
        nama_obat: string;
        satuan: string;
        harga: number;
        penggunaan_obat: string;
    }[];
};

export default function ResepCreateDokter({ pasien, obat_list }: Props) {
    const { obat_list: resepObat, reset: resetResep } = useResepStore();
    const { data: catatan } = useCatatanLayananStore();

    useEffect(() => {
        resetResep();
    }, []);

    const handleSubmit = () => {
        router.post(
            route('dokter.resep.store-final'),
            {
                catatan,
                obat: resepObat,
                pasien_id: pasien.id,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Berhasil!', {
                        description: 'Resep pasien berhasil disimpan.',
                    });
                    router.visit('/dokter/antrian');
                },
                onError: () => {
                    toast.error('Gagal!', {
                        description:
                            'Terjadi kesalahan saat menyimpan resep pasien.',
                    });
                },
            },
        );
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Antrian', href: '/dokter/antrian' },
        {
            title: 'Buat Tindakan Dokter',
            href: `/dokter/antrian/${pasien.id}/tangani`,
        },
        { title: 'Siapkan Resep', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Siapkan Resep" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Buat resep untuk {pasien.nama_lengkap}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Siapkan resep untuk pasien ya dokter
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <FormCreateResep
                        obat_list={obat_list}
                        pasien={pasien}
                        processing={false}
                        errors={{}}
                        onConfirm={handleSubmit}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
