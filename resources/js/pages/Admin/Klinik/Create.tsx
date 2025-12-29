import FormCreateKlinik from '@/components/form-create-klinik-admin';
import PreviewCreateKlinik from '@/components/preview-create-klinik';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler } from 'react';
import { toast } from 'sonner';

type JamOperasional = {
    hari: string;
    jam_buka: string | null;
    jam_tutup: string | null;
    tutup: boolean;
};

type Props = {
    fasilitas: { id: number; nama: string }[];
};

export default function KlinikCreateAdmin({ fasilitas }: Props) {
    const { data, setData, post, processing, reset } = useForm({
        nama_klinik: '',
        jenis_klinik: '',
        alamat: '',
        kota: '',
        provinsi: '',
        no_telepon: '',
        email: '',
        deskripsi: '',
        latitude: '',
        longitude: '',
        kapasitas_total: 0,
        kapasitas_tersedia: 0,
        spesialisasi: '',
        punya_apoteker: 0,
        punya_server: 0,
        gambar: null as File | null,
        fasilitas: [] as number[],

        jam_operasional: [
            { hari: 'Senin', jam_buka: '', jam_tutup: '', tutup: false },
            { hari: 'Selasa', jam_buka: '', jam_tutup: '', tutup: false },
            { hari: 'Rabu', jam_buka: '', jam_tutup: '', tutup: false },
            { hari: 'Kamis', jam_buka: '', jam_tutup: '', tutup: false },
            { hari: 'Jumat', jam_buka: '', jam_tutup: '', tutup: false },
            { hari: 'Sabtu', jam_buka: '', jam_tutup: '', tutup: true },
            { hari: 'Minggu', jam_buka: '', jam_tutup: '', tutup: true },
        ],
    });

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('gambar', file);
        }
    };

    // Tambahkan validasi jam operasional
    const validateJamOperasional = () => {
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

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        // Validasi jam operasional
        const jamError = validateJamOperasional();
        if (jamError) {
            toast.error('Validasi gagal', {
                description: jamError,
            });
            return;
        }

        // Transform dan kirim dengan filter yang sama seperti edit
        const formData = new FormData();

        // Kirim data lainnya
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

        router.post('/admin/klinik', formData, {
            onSuccess: () => {
                toast.success('Klinik berhasil dibuat', {
                    description:
                        'Data klinik baru telah ditambahkan ke sistem.',
                });
                reset();
            },
            onError: (err) => {
                toast.error('Gagal membuat klinik', {
                    description:
                        'Terjadi kesalahan saat menyimpan data klinik.',
                });
            },
            forceFormData: true,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Klinik Kamu', href: '/klinik' },
        { title: 'Tambah Klinik', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Klinik" />
            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Tambah Data Klinik
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Lengkapi data klinik di bawah untuk menambahkan ke daftar.
                </p>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* form */}
                    <div className="lg:col-span-2">
                        <FormCreateKlinik
                            data={data}
                            setData={setData}
                            handleSubmit={handleSubmit}
                            handleChangeFile={handleChangeFile}
                            processing={processing}
                            fasilitas={fasilitas}
                        />
                    </div>

                    {/* preview */}
                    <div className="lg:col-span-1">
                        <PreviewCreateKlinik data={data} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
