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
    punyaServer: number;
    detail_layanan: {
        id: number;
        layanan: string;
        qty: number;
    }[];
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
                        <h2 className="text-lg font-semibold text-gray-800">
                            Data Pasien
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Informasi identitas dan riwayat dasar pasien
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Info
                                label="Nomor Pasien"
                                value={catatan.nomor_pasien}
                            />
                            <Highlight
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

                            {/* Golongan Darah */}
                            {catatan.golongan_darah ? (
                                <Highlight
                                    label="Golongan Darah"
                                    value={catatan.golongan_darah}
                                />
                            ) : (
                                <Info label="Golongan Darah" value="-" />
                            )}

                            {/* Riwayat Penyakit */}
                            {catatan.riwayat_penyakit ? (
                                <Highlight
                                    label="Riwayat Penyakit"
                                    value={catatan.riwayat_penyakit}
                                />
                            ) : (
                                <Info label="Riwayat Penyakit" value="-" />
                            )}

                            {/* Alergi */}
                            {catatan.alergi ? (
                                <Highlight
                                    label="Alergi"
                                    value={catatan.alergi}
                                />
                            ) : (
                                <Info label="Alergi" value="-" />
                            )}
                        </div>
                    </div>
                </div>

                {/* Catatan Medis */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Catatan Medis
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Detail pemeriksaan, diagnosa, dan tindakan medis
                            pasien
                        </p>

                        {catatan.punyaServer === 1 ? (
                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                />
                                <Highlight
                                    label="Tindakan"
                                    value={catatan.tindakan}
                                />

                                <Section
                                    label="Catatan Lain"
                                    value={catatan.catatan_lain}
                                />
                                <Info
                                    label="Dokter Penanggung Jawab"
                                    value={catatan.dokter_nama}
                                />
                                <Info
                                    label="Tanggal Kunjungan"
                                    value={catatan.tanggal_kunjungan}
                                />

                                {catatan.detail_layanan &&
                                    catatan.detail_layanan.length > 0 && (
                                        <div className="md:col-span-2">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Layanan
                                            </label>
                                            <ul className="list-inside list-disc rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                                {catatan.detail_layanan.map(
                                                    (
                                                        layanan: any,
                                                        idx: number,
                                                    ) => (
                                                        <li key={idx}>
                                                            {layanan.layanan}{' '}
                                                            (Qty: {layanan.qty})
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    )}
                            </div>
                        ) : (
                            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-sm">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                                    <svg
                                        className="h-6 w-6 text-emerald-600"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.79 1.732-3L13.732 4c-.77-1.79-2.502-1.79-3.268 0L3.34 16c-.77 1.79.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-1 text-sm font-semibold text-emerald-800">
                                    Mode Tanpa Server
                                </h3>
                                <p className="text-sm text-emerald-700">
                                    Data rekam medis lengkap dicatat secara
                                    manual. Informasi yang tersimpan otomatis
                                    hanya nomor pasien, nama, dan keluhan utama.
                                </p>
                            </div>
                        )}
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
