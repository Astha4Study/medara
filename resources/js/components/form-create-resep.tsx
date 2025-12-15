import { useResepStore } from '@/stores/resep.store';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './ui/alert-dialog';

type Obat = {
    id: number;
    nama_obat: string;
    satuan: string;
    harga: number;
    penggunaan_obat: string;
};

interface Props {
    obat_list: Obat[];
    processing: boolean;
    errors: Record<string, string>;
    onConfirm: () => void;
    pasien: { id: number; nama_lengkap: string };
}

export default function FormCreateResep({
    obat_list,
    processing,
    errors,
    onConfirm,
    pasien,
}: Props) {
    const [open, setOpen] = useState(false);

    const {
        obat_list: resepObat,
        tambahObat,
        updateObat,
        hapusObat,
    } = useResepStore();

    const tambahBaris = () => {
        tambahObat({
            obat_id: 0,
            nama_obat: '',
            jumlah: 1,
            penggunaan_obat: '',
        });
    };

    const formatRupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

    const total = resepObat.reduce((sum, item) => {
        const obat = obat_list.find((o) => o.id === item.obat_id);
        return sum + (obat ? obat.harga * item.jumlah : 0);
    }, 0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (resepObat.length === 0) return;
        setOpen(true);
    };

    const confirmSubmit = () => {
        setOpen(false);
        const form = document.querySelector('form') as HTMLFormElement;
        form?.dispatchEvent(
            new Event('submit', { bubbles: true, cancelable: true }),
        );
    };

    return (
        <>
            <div>
                <div className="space-y-4 p-6">
                    {/* Daftar Obat */}
                    <div className="space-y-4">
                        {resepObat.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                            >
                                {/* Header baris */}
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-500">
                                        Obat ke-{idx + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => hapusObat(idx)}
                                        className="rounded-md px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                                    >
                                        Hapus
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {/* Nama Obat */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Nama Obat
                                        </label>
                                        <select
                                            value={item.obat_id}
                                            onChange={(e) => {
                                                const obat = obat_list.find(
                                                    (o) =>
                                                        o.id ===
                                                        Number(e.target.value),
                                                );
                                                updateObat(
                                                    idx,
                                                    'obat_id',
                                                    Number(e.target.value),
                                                );
                                                updateObat(
                                                    idx,
                                                    'nama_obat',
                                                    obat?.nama_obat || '',
                                                );
                                                updateObat(
                                                    idx,
                                                    'penggunaan_obat',
                                                    obat?.penggunaan_obat || '',
                                                );
                                            }}
                                            required
                                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                                        >
                                            <option value={0}>
                                                -- Pilih Obat --
                                            </option>
                                            {obat_list.map((o) => (
                                                <option key={o.id} value={o.id}>
                                                    {o.nama_obat} ({o.satuan})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Jumlah */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Jumlah
                                        </label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={item.jumlah}
                                            onChange={(e) =>
                                                updateObat(
                                                    idx,
                                                    'jumlah',
                                                    Number(e.target.value),
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                                        />
                                    </div>

                                    {/* Harga Satuan (readonly) */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Harga Satuan
                                        </label>
                                        <input
                                            type="text"
                                            value={formatRupiah(
                                                obat_list.find(
                                                    (o) =>
                                                        o.id === item.obat_id,
                                                )?.harga || 0,
                                            )}
                                            readOnly
                                            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600"
                                        />
                                    </div>

                                    {/* Aturan Pakai */}
                                    <div className="md:col-span-3">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Aturan Pakai
                                        </label>
                                        <input
                                            type="text"
                                            value={item.penggunaan_obat}
                                            onChange={(e) =>
                                                updateObat(
                                                    idx,
                                                    'penggunaan_obat',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="3×1 sehari"
                                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Tambah Baris */}
                        <button
                            type="button"
                            onClick={tambahBaris}
                            className="w-full rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
                        >
                            + Tambah Obat
                        </button>
                    </div>

                    {/* Error Global */}
                    {errors.general && (
                        <p className="text-sm text-red-600">{errors.general}</p>
                    )}

                    {/* Total Harga */}
                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-600">
                                Total
                            </span>
                            <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                Sudah termasuk PPN
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xs text-gray-500">Rp</span>
                            <span className="text-xl font-semibold tracking-tight text-gray-900">
                                {formatRupiah(total).replace('Rp', '')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <Link
                        href={`/dokter/antrian/${pasien.id}/tangani`}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Batal
                    </Link>
                    <button
                        type="button"
                        disabled={processing || resepObat.length === 0}
                        onClick={() => setOpen(true)}
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Resep'}
                    </button>
                </div>
            </div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Pastikan obat sudah benar
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin obat yang dipilih sudah sesuai dan
                            aturan pakainya sudah diisi dengan benar?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                setOpen(false);
                                onConfirm();
                            }}
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
