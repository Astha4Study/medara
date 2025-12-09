import FormPengaturanAdmin from '@/components/form-pengaturan';
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
import { useState } from 'react';
import { toast } from 'sonner';

type Klinik = {
    id: number;
    punya_apoteker: boolean;
    punya_server: boolean;
};

type Props = {
    klinik: Klinik;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pengaturan', href: '/admin/pengaturan/edit' },
];

export default function PengaturanAdminEdit({ klinik }: Props) {
    const { data, setData, processing, errors } = useForm({
        punya_apoteker: klinik.punya_apoteker,
        punya_server: klinik.punya_server,
    });

    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const confirmSave = () => {
        setShowConfirm(false);
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as any);
        });

        router.post(`/admin/pengaturan?_method=PUT`, formData, {
            onSuccess: () =>
                toast.success('Pengaturan klinik berhasil diperbarui'),
            onError: () => toast.error('Gagal memperbarui pengaturan'),
        });
    };

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

                <div className="overflow-hidden">
                    <FormPengaturanAdmin
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        errors={errors}
                    />
                </div>
            </div>

            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Simpan perubahan?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin memperbarui pengaturan
                            klinik ini?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-emerald-600 transition hover:bg-emerald-700"
                            onClick={confirmSave}
                        >
                            Ya, Simpan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
