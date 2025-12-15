import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

type ResepStatus = 'pending' | 'sedang_dibuat' | 'selesai';

type ResepMasuk = {
    id: number;
    pasien_nama: string;
    nomor_pasien: string | null;
    dokter_nama: string;
    status: ResepStatus;
    total_harga: number | null;
    created_at: string;
};

type PageProps = {
    resep: ResepMasuk[];
};

const listTable = [
    'No',
    'No Pasien',
    'Nama Pasien',
    'Dokter',
    'Status',
    'Tanggal Resep',
    'Aksi',
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Resep Masuk', href: '/apoteker/resep-masuk' },
];

const statusBadge: Record<ResepStatus, { label: string; className: string }> = {
    pending: { label: 'Menunggu', className: 'bg-yellow-100 text-yellow-700' },
    sedang_dibuat: {
        label: 'Sedang Dibuat',
        className: 'bg-blue-100 text-blue-700',
    },
    selesai: { label: 'Selesai', className: 'bg-green-100 text-green-700' },
};

export default function ResepMasukIndexApoteker() {
    const { resep } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredResep = useMemo(() => {
        const q = searchQuery.toLowerCase();

        return resep.filter(
            (item) =>
                (item.status === 'pending' ||
                    item.status === 'sedang_dibuat') &&
                (item.pasien_nama.toLowerCase().includes(q) ||
                    item.dokter_nama.toLowerCase().includes(q)),
        );
    }, [resep, searchQuery]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resep Masuk" />

            <div className="p-6">
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Resep Masuk
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Daftar resep dari dokter yang menunggu diproses
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    {listTable.map((h) => (
                                        <th
                                            key={h}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {filteredResep.length > 0 ? (
                                    filteredResep.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.nomor_pasien ?? '-'}
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                {item.pasien_nama}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.dokter_nama}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[item.status].className}`}
                                                >
                                                    {
                                                        statusBadge[item.status]
                                                            .label
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(
                                                    item.created_at,
                                                ).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={route(
                                                        'apoteker.resep-masuk.mulai',
                                                        item.id,
                                                    )}
                                                    method="put"
                                                    as="button"
                                                    onSuccess={() =>
                                                        toast.success(
                                                            'Resep berhasil ditandai sedang dibuat.',
                                                        )
                                                    }
                                                    onError={(errors) =>
                                                        toast.error(
                                                            errors?.message ??
                                                                'Masih ada resep yang sedang diproses.',
                                                        )
                                                    }
                                                    className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                                                >
                                                    Siapkan Obat
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={listTable.length}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada resep masuk
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                    Menampilkan {filteredResep.length} dari {resep.length} resep
                </div>
            </div>
        </AppLayout>
    );
}
