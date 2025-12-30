import DataPasienTangani from '@/components/data-pasien-tangani';
import DataPemeriksaanFisik from '@/components/data-pemeriksaan-fisik';
import FormCreateCatatanLayananDokter from '@/components/form-create-catatan-layanan-dokter';
import FormPilihLayanan from '@/components/form-pilih-layanan';
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
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { useCatatanLayananStore } from '@/stores/catatan-layanan.store';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

type Props = {
    pasien: any;
    klinik: any;
    antrian: any;
    pemeriksaan_fisik: any;
    punya_server: number;
    punya_apoteker: boolean;
    layanan: any[];
};

const KlinikNeedPemeriksaanFisik = [
    'Umum',
    'Kebidanan & Kandungan',
    'Anak',
    'Kulit & Kelamin',
    'Fisioterapi',
];

export default function TindakanCreateDokter({
    pasien,
    klinik,
    antrian,
    punya_server,
    punya_apoteker,
    pemeriksaan_fisik,
    layanan,
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

    const [butuhResep, setButuhResep] = React.useState<boolean>(
        data.butuh_resep,
    );
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [confirmNoResepOpen, setConfirmNoResepOpen] = React.useState(false);

    const butuhPemeriksaanFisik =
        Boolean(klinik?.jenis_klinik) &&
        KlinikNeedPemeriksaanFisik.includes(klinik.jenis_klinik);

    useEffect(() => {
        reset();
    }, []);

    useEffect(() => {
        setData('antrian_id', antrian.id);
        setData('pasien_id', pasien.id);
        setData('klinik_id', klinik.id);
        setData('keluhan_utama', antrian.keluhan ?? '');
        if (butuhPemeriksaanFisik && pemeriksaan_fisik)
            setData('pemeriksaan_fisik_id', pemeriksaan_fisik.id);
    }, [antrian.id, pasien.id, klinik.id, pemeriksaan_fisik?.id]);

    useEffect(() => {
        setProcessing(false);
        setErrors({});
    }, []);

    useEffect(() => {
        setData('butuh_resep', butuhResep);
    }, [butuhResep]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (processing) return;
        setErrors({});
        setProcessing(true);

        if (!data.layanan.some((l) => l.layanan_id !== 0)) {
            setErrors({ general: 'Pilih minimal 1 layanan untuk pasien.' });
            toast.error('Pilih minimal 1 layanan untuk pasien.');
            setProcessing(false);
            return;
        }

        if (punya_server === 1) {
            const kosong = (v?: string) => !String(v || '').trim();
            if (
                kosong(data.detail_keluhan) ||
                kosong(data.diagnosa) ||
                kosong(data.tindakan)
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
        }

        if (!butuhResep) {
            // ➜ Tampilkan alert konfirmasi sebelum simpan tanpa resep
            setConfirmNoResepOpen(true);
            setProcessing(false);
            return;
        }

        // Jika butuh resep → dialog konfirmasi lama
        setConfirmOpen(true);
        setProcessing(false);
    };

    const confirmAndSend = () => {
        setConfirmOpen(false);
        setProcessing(true);
        router.visit(`/dokter/antrian/${antrian.id}/resep/create`);
    };

    const confirmNoResepAndSubmit = () => {
        setConfirmNoResepOpen(false);
        setProcessing(true);

        router.post(
            route('dokter.resep.final-store'),
            {
                catatan: data,
            },
            {
                onFinish: () => setProcessing(false),
                onSuccess: () => {
                    toast.success('Tindakan berhasil disimpan');
                    router.visit('/dokter/antrian');
                },
                onError: (errs) => {
                    toast.error('Gagal menyimpan tindakan');
                    setErrors(errs);
                },
            },
        );
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
                        Buat tindakan yang akan dilakukan
                    </p>
                </div>

                <div className="space-y-6">
                    <DataPasienTangani pasien={pasien} />

                    {butuhPemeriksaanFisik && pemeriksaan_fisik && (
                        <DataPemeriksaanFisik
                            pemeriksaanFisik={pemeriksaan_fisik}
                        />
                    )}

                    <FormPilihLayanan
                        layanan_list={layanan ?? []}
                        onChange={(items) => setData('layanan', items)}
                        errors={{ general: errors.general }}
                    />

                    {/* Switch butuh resep */}
                    {punya_apoteker && (
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">
                                        Resep Obat{' '}
                                        <span className="text-red-500">*</span>
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Apakah pasien memerlukan resep obat?
                                    </p>
                                </div>
                                <Switch
                                    className="data-[state=checked]:bg-emerald-600"
                                    checked={butuhResep}
                                    onCheckedChange={setButuhResep}
                                />
                            </div>
                        </div>
                    )}

                    {/* Form catatan */}
                    <FormCreateCatatanLayananDokter
                        punyaServer={punya_server}
                        butuhResep={butuhResep}
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        errors={errors}
                    />
                </div>

                {/* Dialog konfirmasi */}
                <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {punya_server === 0
                                    ? 'Apakah Anda sudah benar-benar mendata pasien ini?'
                                    : 'Apakah Anda sudah selesai mendata pasien ini?'}
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

                <AlertDialog
                    open={confirmNoResepOpen}
                    onOpenChange={setConfirmNoResepOpen}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Konfirmasi Simpan Tanpa Resep
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Anda memilih untuk{' '}
                                <strong className="text-red-500">
                                    tidak membuat resep
                                </strong>
                                . Tindakan akan langsung disimpan dan pasien
                                dianggap selesai. Yakin ingin melanjutkan?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-emerald-600 hover:bg-emerald-700"
                                onClick={confirmNoResepAndSubmit}
                            >
                                Ya, Simpan Tanpa Resep
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
