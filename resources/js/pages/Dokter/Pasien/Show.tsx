import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type Pasien = {
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
};

type Props = { pasien: Pasien };

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Pasien', href: '/dokter/pasien' },
    { title: 'Detail Pasien', href: '' },
];

export default function PasienShowDokter({ pasien }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Pasien" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Detail Pasien
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Informasi lengkap pasien
                    </p>
                </div>

                {/* Card */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Nomor Pasien
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {pasien.nomor_pasien}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Nama Lengkap
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {pasien.nama_lengkap}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    NIK
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {pasien.nik}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Jenis Kelamin
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {pasien.jenis_kelamin}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Tanggal Lahir
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {pasien.tanggal_lahir}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Tempat Lahir
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {pasien.tempat_lahir}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    No. HP
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {pasien.no_hp}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Golongan Darah
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {pasien.golongan_darah || '-'}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Riwayat Penyakit
                            </label>
                            <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                {pasien.riwayat_penyakit || '-'}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Alergi
                            </label>
                            <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                {pasien.alergi || '-'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
