import PengaturanKlinikCard from '@/components/pengaturan-klinik-card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pengaturan', href: '/admin/pengaturan' },
];

export default function PengaturanAdminIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan" />
            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Pengaturan Klinik
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Atur informasi, fasilitas, dan preferensi operasional klinik
                    Anda.
                </p>

                <PengaturanKlinikCard />
            </div>
        </AppLayout>
    );
}
