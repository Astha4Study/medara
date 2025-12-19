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
import { Link } from '@inertiajs/react';
import { useState } from 'react';

type Props = {
    pasien: { id: number; nama_lengkap: string };
    processing: boolean;
    error?: string;
    onConfirm: (resepTeks: string) => void;
};

export default function FormResepTeks({
    pasien,
    processing,
    error,
    onConfirm,
}: Props) {
    const [resepTeks, setResepTeks] = useState('');
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!resepTeks.trim()) return;
        setOpen(true);
    };

    const confirmSubmit = () => {
        setOpen(false);
        onConfirm(resepTeks);
    };

    return (
        <>
            <form>
                <div className="space-y-4 p-6">
                    {/* Card Resep */}
                    <div className="bg-white">
                        <div className="mb-3 flex items-center justify-between">
                            <h4 className="text-base font-medium text-gray-700">
                                Tulis resep medis untuk pasien
                            </h4>
                            <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                Resep Dokter
                            </span>
                        </div>

                        <div className="mt-4">
                            <textarea
                                rows={8}
                                placeholder={`Contoh:
R/ Amoxicillin 500 mg
S 3 dd 1
Habiskan`}
                                value={resepTeks}
                                onChange={(e) => setResepTeks(e.target.value)}
                                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400"
                            />
                            {error && (
                                <p className="mt-1 text-sm text-red-600">
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Aksi */}
                <div className="border-gray-199 flex justify-end gap-3 rounded-b-lg border-t bg-gray-50 px-6 py-4">
                    <Link
                        href={`/dokter/antrian/${pasien.id}/tangani`}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Batal
                    </Link>
                    <button
                        type="button"
                        disabled={processing || !resepTeks.trim()}
                        onClick={() => setOpen(true)}
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Resep'}
                    </button>
                </div>
            </form>

            {/* Alert Dialog */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Resep Dokter
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Pastikan resep yang Anda tulis sudah benar dan
                            jelas, karena akan diproses oleh apoteker.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmSubmit}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            Yakin, simpan resep
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
