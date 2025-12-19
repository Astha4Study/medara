import DataRingkasanPasienResep from '@/components/data-ringkasan-pasien-resep';
import FormResepTeks from '@/components/form-resep-teks';
import AppLayout from '@/layouts/app-layout';
import { useCatatanLayananStore } from '@/stores/catatan-layanan.store';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

type Props = {
    pasien: {
        id: number;
        nama_lengkap: string;
        nomor_pasien?: string;
        tanggal_lahir?: string | null;
        golongan_darah?: string | null;
        riwayat_penyakit?: string | null;
        alergi?: string | null;
    };
    pemeriksaan_fisik: {
        berat_badan: number | null;
        tekanan_darah: string | null;
        suhu_tubuh: number | null;
        kondisi_khusus: string | null;
    };
};

export default function ResepCreateDokter({
    pasien,
    pemeriksaan_fisik,
}: Props) {
    const { data: catatan } = useCatatanLayananStore();

    const handleSubmit = (resepTeks: string) => {
        if (!resepTeks.trim()) {
            toast.error('Resep tidak boleh kosong');
            return;
        }

        router.post(
            route('dokter.resep.store-final'),
            {
                catatan,
                resep_teks: resepTeks,
                pasien_id: pasien.id,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Resep berhasil dikirim ke apotek');
                },
                onError: () => {
                    toast.error('Gagal menyimpan resep');
                },
            },
        );
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Antrian', href: '/dokter/antrian' },
        { title: 'Buat Tindakan Dokter', href: '#' },
        { title: 'Siapkan Resep', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Siapkan Resep" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Resep untuk {pasien.nama_lengkap}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Tulis resep seperti tulisan dokter pada umumnya
                    </p>
                </div>

                <div className="rounded-lg border bg-white">
                    <DataRingkasanPasienResep
                        pasien={pasien}
                        pemeriksaanFisik={pemeriksaan_fisik}
                    />

                    <FormResepTeks
                        onConfirm={handleSubmit}
                        pasien={pasien}
                        processing={false}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
