import DropdownBugReportsAdmin from '@/components/dropdown-bug-reports-admin';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Filter, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type BugReport = {
    id: number;
    judul: string;
    dampak_pelapor: 'rendah' | 'sedang' | 'tinggi';
    status: 'dibuka' | 'sedang_dikerjakan' | 'selesai' | 'dibatalkan';
    created_at: string;
    diselesaikan_pada?: string | null;
};

type BugReportPagination = {
    data: BugReport[];
    total: number;
};

type PageProps = {
    bugReports: BugReportPagination;
};

const listTable = [
    'Judul Bug',
    'Dampak',
    'Status',
    'Tanggal Lapor',
    'Diselesaikan Pada',
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/super-admin' },
    { title: 'Bug Reports', href: '/super-admin/bug-reports' },
];

const priorityColor: Record<'rendah' | 'sedang' | 'tinggi', string> = {
    rendah: 'bg-gray-100 text-gray-700',
    sedang: 'bg-yellow-100 text-yellow-700',
    tinggi: 'bg-red-100 text-red-700',
};

const statusColor: Record<
    'dibuka' | 'sedang_dikerjakan' | 'selesai' | 'dibatalkan',
    string
> = {
    dibuka: 'bg-blue-100 text-blue-700',
    sedang_dikerjakan: 'bg-indigo-100 text-indigo-700',
    selesai: 'bg-emerald-100 text-emerald-700',
    dibatalkan: 'bg-gray-200 text-gray-600',
};

export default function BugReportsIndexAdmin() {
    const { bugReports, klinik } = usePage<PageProps>().props;
    const bugs = bugReports.data ?? [];
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBugs = bugs.filter((bug) =>
        bug.judul.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleCreateClick = () => {
        if (!klinik) {
            router.visit('/admin/klinik', {
                onSuccess: () => {
                    toast.error(
                        'Anda harus membuat fasilitas klinik terlebih dahulu sebelum melaporkan bug.',
                    );
                },
            });
        } else {
            router.visit('/admin/bug-reports/create');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bug Reports" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Laporan Bug
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Daftar bug yang dilaporkan oleh klinik
                    </p>
                </div>

                {/* Search */}
                <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="flex">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari judul bug atau nama klinik..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full min-w-[400px] rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-400 transition focus:border-emerald-400 focus:ring-emerald-400"
                            />
                        </div>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>

                    <button
                        onClick={handleCreateClick}
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Laporkan Bug
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    {listTable.map((item) => (
                                        <th
                                            key={item}
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            {item}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBugs.length > 0 ? (
                                    filteredBugs.map((bug) => (
                                        <tr
                                            key={bug.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {bug.judul}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${priorityColor[bug.dampak_pelapor]}`}
                                                >
                                                    {bug.dampak_pelapor}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[bug.status]}`}
                                                >
                                                    {bug.status.replace(
                                                        '_',
                                                        ' ',
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {new Date(
                                                    bug.created_at,
                                                ).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {bug.status === 'selesai' &&
                                                bug.diselesaikan_pada ? (
                                                    new Date(
                                                        bug.diselesaikan_pada,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        },
                                                    )
                                                ) : (
                                                    <span className="text-sm text-gray-400 italic">
                                                        Menunggu penyelesaian
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center">
                                                    <DropdownBugReportsAdmin
                                                        id={bug.id}
                                                        judul={bug.judul}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={listTable.length + 2}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada laporan bug
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    Menampilkan {filteredBugs.length} dari {bugs.length} laporan
                    bug
                </div>
            </div>
        </AppLayout>
    );
}
