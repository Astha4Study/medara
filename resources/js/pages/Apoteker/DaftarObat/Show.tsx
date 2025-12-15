import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

type Obat = {
    id: number;
    nama_obat: string;
    jenis_obat: string;
    satuan: string;
    stok: number;
    harga: number;
    penggunaan_obat: string;
};

type Props = { obat: Obat };

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Obat', href: '/apoteker/daftar-obat' },
    { title: 'Detail Obat', href: '' },
];

export default function DaftarObatShowApoteker({ obat }: Props) {
    const formatRupiah = (v: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(v);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Obat" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Detail Obat
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Informasi lengkap obat
                    </p>
                </div>

                {/* Card */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Nama Obat
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {obat.nama_obat}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Jenis Obat
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {obat.jenis_obat}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Satuan
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {obat.satuan}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Stok
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {obat.stok}
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Harga
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {formatRupiah(obat.harga)}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Penggunaan Obat
                            </label>
                            <div className="max-w-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                {obat.penggunaan_obat}
                            </div>
                        </div>
                    </div>

                    {/* Footer tanpa kotak */}
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <Link
                            href={`/apoteker/daftar-obat/${obat.id}/edit`}
                            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
                        >
                            Edit Obat
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
