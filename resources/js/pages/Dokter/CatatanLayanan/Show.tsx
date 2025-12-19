import { Highlight } from '@/components/ui/highlight';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Catatan = {
    id: number;
    nomor_pasien: string;
    nama_lengkap: string;
    nik: string;
    jenis_kelamin: string;
    tanggal_lahir: string;
    tempat_lahir: string;
    alamat: string;
    no_hp: string;
    golongan_darah: string;
    riwayat_penyakit: string;
    alergi: string;
    tanggal_kunjungan: string;
    keluhan_utama: string;
    detail_keluhan: string;
    diagnosa: string;
    tindakan: string;
    catatan_lain: string;
    dokter_nama: string;
    tanggal_ditangani: string;
};

type Props = { catatan: Catatan };

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Catatan Layanan', href: '/dokter/catatan-layanan' },
    { title: 'Detail Catatan', href: '' },
];

export default function CatatanLayananShowDokter({ catatan }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Catatan Layanan" />

            <div className="space-y-8 p-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Detail Catatan Layanan
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Informasi lengkap catatan layanan pasien
                    </p>
                </div>

                {/* Data Pasien */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="p-6">
                        <h2 className="mb-4 text-lg font-semibold text-gray-800">
                            Data Pasien
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Info
                                label="Nomor Pasien"
                                value={catatan.nomor_pasien}
                            />
                            <Info
                                label="Nama Lengkap"
                                value={catatan.nama_lengkap}
                            />
                            <Info label="NIK" value={catatan.nik} />
                            <Info
                                label="Jenis Kelamin"
                                value={catatan.jenis_kelamin}
                            />
                            <Info
                                label="Tanggal Lahir"
                                value={catatan.tanggal_lahir}
                            />
                            <Info
                                label="Tempat Lahir"
                                value={catatan.tempat_lahir}
                            />
                            <Info label="Alamat" value={catatan.alamat} />
                            <Info label="No. HP" value={catatan.no_hp} />
                            <Info
                                label="Golongan Darah"
                                value={catatan.golongan_darah || '-'}
                            />
                            <Highlight
                                label="Riwayat Penyakit"
                                value={catatan.riwayat_penyakit || '-'}
                                className="-pt-6"
                            />
                            <Info
                                label="Alergi"
                                value={catatan.alergi || '-'}
                            />
                        </div>
                    </div>
                </div>

                {/* Catatan Medis */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="p-6">
                        <h2 className="mb-4 text-lg font-semibold text-gray-800">
                            Catatan Medis
                        </h2>
                        <Highlight
                            label="Keluhan Utama"
                            value={catatan.keluhan_utama}
                        />
                        <Section
                            label="Detail Keluhan"
                            value={catatan.detail_keluhan}
                        />
                        <Highlight
                            label="Diagnosa"
                            value={catatan.diagnosa}
                            className="mt-4"
                        />
                        <Highlight
                            label="Tindakan"
                            value={catatan.tindakan}
                            className="mt-4"
                        />
                        <Section
                            label="Catatan Lain"
                            value={catatan.catatan_lain}
                        />

                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Info
                                label="Dokter Penanggung Jawab"
                                value={catatan.dokter_nama}
                            />
                            <Info
                                label="Tanggal Kunjungan"
                                value={catatan.tanggal_kunjungan}
                            />
                            <Info
                                label="Tanggal Ditangani"
                                value={catatan.tanggal_ditangani}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                {value || '-'}
            </div>
        </div>
    );
}

function Section({ label, value }: { label: string; value: string }) {
    return (
        <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                {value || '-'}
            </div>
        </div>
    );
}
