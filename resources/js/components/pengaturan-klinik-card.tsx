import { Link, useForm, usePage } from '@inertiajs/react';
import { Building2 } from 'lucide-react';
import { toast } from 'sonner';
import FormPengaturanKlinikAdmin from './form-pengaturan-klinik-admin';

type Klinik = {
    id: number;
    punya_apoteker: boolean;
    punya_server: boolean;
};

type PageProps = {
    klinik?: Klinik;
};

export default function PengaturanKlinikCard() {
    const { props } = usePage<PageProps>();
    const klinik = props.klinik;

    const { data, setData, processing, put } = useForm({
        punya_apoteker: klinik?.punya_apoteker ?? false,
        punya_server: klinik?.punya_server ?? false,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put('/admin/pengaturan/update', {
            onSuccess: () =>
                toast.success('Pengaturan klinik berhasil diperbarui'),
            onError: (errs) =>
                toast.error(Object.values(errs)[0] || 'Gagal memperbarui'),
        });
    };

    if (!klinik)
        return (
            <div>
                <div className="items-center rounded-xl border shadow-sm">
                    <div className="px-6 py-12">
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                Belum Ada Klinik
                            </h3>
                            <p className="mb-5 max-w-sm text-sm text-gray-600">
                                Tambahkan informasi klinik untuk mulai mengelola
                                layanan.
                            </p>
                            <Link
                                href="/admin/klinik/create"
                                className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                            >
                                <Building2 className="h-4 w-4" />
                                Buat Klinik
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <div>
            <FormPengaturanKlinikAdmin
                data={data}
                setData={setData}
                handleSubmit={handleSubmit}
                processing={processing}
            />
        </div>
    );
}
