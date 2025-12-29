import FormEditKlinikAdmin from '@/components/form-edit-klinik-admin';
import PreviewEditKlinik from '@/components/preview-edit-klinik';
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
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type JamOperasional = {
    hari: string;
    jam_buka: string | null;
    jam_tutup: string | null;
    tutup: boolean;
};

type Klinik = {
    id: number;
    nama_klinik?: string;
    jenis_klinik?: string;
    alamat?: string;
    kota?: string;
    provinsi?: string;
    no_telepon?: string;
    email?: string;
    deskripsi?: string;
    latitude?: string;
    longitude?: string;
    kapasitas_total?: number;
    kapasitas_tersedia?: number;
    punya_apoteker?: boolean;
    punya_server?: boolean;
    gambar?: string | null;
    fasilitas?: { id: number; nama: string }[];
    jam_operasional?: JamOperasional[];
};

type Props = {
    klinik: Klinik;
    fasilitas: { id: number; nama: string }[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Klinik Kamu', href: '/admin/klinik' },
    { title: 'Edit Klinik Kamu', href: '' },
];

export default function KlinikEditAdmin({ klinik, fasilitas }: Props) {
    const { data, setData, processing, errors } = useForm({
        nama_klinik: klinik.nama_klinik ?? '',
        jenis_klinik: klinik.jenis_klinik ?? '',
        alamat: klinik.alamat ?? '',
        kota: klinik.kota ?? '',
        provinsi: klinik.provinsi ?? '',
        no_telepon: klinik.no_telepon ?? '',
        email: klinik.email ?? '',
        deskripsi: klinik.deskripsi ?? '',
        latitude: klinik.latitude ?? '',
        longitude: klinik.longitude ?? '',
        kapasitas_total: klinik.kapasitas_total ?? 0,
        kapasitas_tersedia: klinik.kapasitas_tersedia ?? 0,
        punya_apoteker: Boolean(klinik.punya_apoteker),
        punya_server: Boolean(klinik.punya_server),
        gambar: undefined as File | undefined,
        fasilitas: klinik.fasilitas?.map((f) => f.id) ?? [],

        jam_operasional: klinik.jam_operasional ?? [
            { hari: 'Senin', jam_buka: '', jam_tutup: '', tutup: false },
            { hari: 'Selasa', jam_buka: '', jam_tutup: '', tutup: false },
            { hari: 'Rabu', jam_buka: '', jam_tutup: '', tutup: false },
            { hari: 'Kamis', jam_buka: '', jam_tutup: '', tutup: false },
            { hari: 'Jumat', jam_buka: '', jam_tutup: '', tutup: false },
            { hari: 'Sabtu', jam_buka: '', jam_tutup: '', tutup: true },
            { hari: 'Minggu', jam_buka: '', jam_tutup: '', tutup: true },
        ],
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

    useEffect(() => {
        const original = {
            nama_klinik: klinik.nama_klinik ?? '',
            jenis_klinik: klinik.jenis_klinik ?? '',
            alamat: klinik.alamat ?? '',
            kota: klinik.kota ?? '',
            provinsi: klinik.provinsi ?? '',
            no_telepon: klinik.no_telepon ?? '',
            email: klinik.email ?? '',
            deskripsi: klinik.deskripsi ?? '',
            latitude: klinik.latitude ?? '',
            longitude: klinik.longitude ?? '',
            kapasitas_total: klinik.kapasitas_total ?? 0,
            kapasitas_tersedia: klinik.kapasitas_tersedia ?? 0,
            punya_apoteker: Boolean(klinik.punya_apoteker),
            punya_server: Boolean(klinik.punya_server),
        };
        setIsDirty(!isEqual(data, original));
    }, [data, klinik]);

    const [preview, setPreview] = useState<string | null>(
        klinik.gambar ? `/storage/${klinik.gambar}` : null,
    );

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('gambar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const validateAllJamOperasional = () => {
        const jamOps = data.jam_operasional as JamOperasional[];

        for (const jam of jamOps) {
            if (!jam.tutup) {
                if (!jam.jam_buka || !jam.jam_tutup) {
                    return `Jam buka dan jam tutup harus diisi untuk hari ${jam.hari}`;
                }
            }
        }
        return null;
    };

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();

        const jamError = validateAllJamOperasional();
        if (jamError) {
            toast.error('Validasi gagal', {
                description: jamError,
            });
            return;
        }

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'fasilitas') {
                (value as number[]).forEach((id) =>
                    formData.append('fasilitas[]', String(id)),
                );
            } else if (key === 'jam_operasional') {
                // Filter dan kirim hanya yang valid
                const jamOpsToSend = (value as JamOperasional[]).map((jam) => ({
                    hari: jam.hari,
                    jam_buka: jam.tutup
                        ? null
                        : jam.jam_buka && jam.jam_buka !== ''
                          ? jam.jam_buka
                          : null,
                    jam_tutup: jam.tutup
                        ? null
                        : jam.jam_tutup && jam.jam_tutup !== ''
                          ? jam.jam_tutup
                          : null,
                    tutup: jam.tutup,
                }));

                jamOpsToSend.forEach((jam, i) => {
                    formData.append(`jam_operasional[${i}][hari]`, jam.hari);
                    formData.append(
                        `jam_operasional[${i}][tutup]`,
                        jam.tutup ? '1' : '0',
                    );

                    // Hanya kirim jika ada nilai (bukan null)
                    if (jam.jam_buka !== null) {
                        formData.append(
                            `jam_operasional[${i}][jam_buka]`,
                            jam.jam_buka,
                        );
                    }
                    if (jam.jam_tutup !== null) {
                        formData.append(
                            `jam_operasional[${i}][jam_tutup]`,
                            jam.jam_tutup,
                        );
                    }
                });
            } else if (value instanceof Blob) {
                formData.append(key, value);
            } else if (value !== null && value !== undefined) {
                formData.append(key, String(value));
            }
        });

        router.post(`/admin/klinik/${klinik.id}?_method=PUT`, formData, {
            onSuccess: () => {
                toast.success('Klinik berhasil diperbarui', {
                    description:
                        'Data klinik telah berhasil disimpan ke sistem.',
                });
                setAlertOpen(false);
            },
            onError: (err) => {
                toast.error('Gagal memperbarui klinik', {
                    description:
                        'Terjadi kesalahan saat menyimpan data klinik.',
                });
                setAlertOpen(false);
            },
        });
    };

    const openAlert = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlertOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Klinik Kamu" />

            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Edit Data Klinik
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Perbarui informasi klinik di bawah ini.
                </p>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Form sebelah kiri */}
                    <div className="lg:col-span-2">
                        <FormEditKlinikAdmin
                            data={data}
                            setData={setData}
                            isDirty={isDirty}
                            handleSubmit={openAlert}
                            handleChangeFile={handleChangeFile}
                            processing={processing}
                            errors={errors}
                            fasilitas={fasilitas} // master list untuk autocomplete
                        />
                    </div>

                    {/* Preview sebelah kanan */}
                    <div className="self-start">
                        <PreviewEditKlinik data={{ ...data, preview }} />
                    </div>
                </div>

                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                    <AlertDialogContent className="modal-over-map">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Konfirmasi Perubahan
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Apakah Anda yakin ingin menyimpan perubahan data
                                klinik ini? Pastikan seluruh informasi yang
                                dimasukkan sudah benar.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => handleSubmit()}
                            >
                                Simpan
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
