import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

type Detail = { id: number; keterangan: string };

type Layanan = {
    id: number;
    nama_layanan: string;
    harga: number;
    aktif: boolean;
    updated_at: string;
    detail_layanan: Detail[];
};

interface Props {
    layanan: Layanan;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Layanan', href: '/admin/layanan' },
    { title: 'Detail Layanan', href: '' },
];

export default function LayananShowAdmin({ layanan }: Props) {
    const rupiah = (v: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(v);

    const tgl = (d: string) =>
        new Date(d).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Layanan" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Detail Layanan
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Informasi lengkap layanan klinik
                        </p>
                    </div>

                    <Link
                        href="/admin/layanan"
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Kembali
                    </Link>
                </div>

                {/* Card */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Nama Layanan */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Nama Layanan
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {layanan.nama_layanan}
                                </div>
                            </div>

                            {/* Harga */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Harga
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm font-semibold text-emerald-600">
                                    {rupiah(layanan.harga)}
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Status Layanan
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {layanan.aktif ? 'Aktif' : 'Tidak Aktif'}
                                </div>
                            </div>

                            {/* Terakhir Diperbarui */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Terakhir Diperbarui
                                </label>
                                <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {tgl(layanan.updated_at)}
                                </div>
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <div className="mt-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Deskripsi Layanan
                            </label>
                            <div className="space-y-2 rounded-lg border bg-gray-50 px-4 py-3 text-sm text-gray-900">
                                {layanan.detail_layanan.length ? (
                                    layanan.detail_layanan.map((d) => (
                                        <div key={d.id}>• {d.keterangan}</div>
                                    ))
                                ) : (
                                    <span className="text-gray-400">
                                        Tidak ada deskripsi.
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <Link
                            href={`/admin/layanan/${layanan.id}/edit`}
                            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
                        >
                            Edit layanan
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
