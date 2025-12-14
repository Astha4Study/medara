import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Checkbox } from './ui/checkbox';

const formatRupiah = (value: string | number) => {
    if (!value) return '';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(Number(value));
};

type ResepDetail = {
    id: number;
    nama_obat: string;
    jumlah: number;
    satuan: string;
    harga: number;
    subtotal: number;
};

type Props = {
    resep: {
        id: number;
        total_harga: number;
        detail: ResepDetail[];
    };
    handleSubmit: (e: React.FormEvent) => void;
    processing: boolean;
};

export default function FormChecklistResepMasukApoteker({
    resep,
    handleSubmit,
    processing,
}: Props) {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const allChecked = useMemo(() => {
        return checkedItems.length === resep.detail.length;
    }, [checkedItems, resep.detail.length]);

    const toggleCheck = (id: number) => {
        setCheckedItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!allChecked) {
            toast.error(
                'Semua obat harus dicentang terlebih dahulu sebelum menyelesaikan resep.',
            );
            return;
        }

        handleSubmit(e);
    };

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800">
                    Checklist Obat Resep
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Pastikan semua obat sudah disiapkan dengan benar
                </p>
            </div>

            {/* Table */}
            <form onSubmit={onSubmit}>
                <div className="overflow-x-auto px-4">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">Obat</th>
                                <th className="px-4 py-3 text-right">Jumlah</th>
                                <th className="px-4 py-3 text-right">Harga</th>
                                <th className="px-4 py-3 text-right">
                                    Subtotal
                                </th>
                                <th className="px-4 py-3 text-center">Siap</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {resep.detail.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-3">
                                        <p className="font-medium">
                                            {item.nama_obat}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Satuan: {item.satuan}
                                        </p>
                                    </td>

                                    <td className="px-4 py-3 text-right">
                                        {item.jumlah}
                                    </td>

                                    <td className="px-4 py-3 text-right">
                                        {formatRupiah(item.harga)}
                                    </td>

                                    <td className="px-4 py-3 text-right font-medium">
                                        {formatRupiah(item.subtotal)}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <Checkbox
                                            checked={checkedItems.includes(
                                                item.id,
                                            )}
                                            onCheckedChange={() =>
                                                toggleCheck(item.id)
                                            }
                                            className="data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t bg-gray-50 px-4 py-3">
                    <div className="text-sm">
                        <span className="text-gray-500">Total Harga: </span>
                        <span className="font-semibold text-gray-900">
                            {formatRupiah(resep.total_harga)}
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={processing || !allChecked}
                        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Tandai Resep Selesai
                    </button>
                </div>
            </form>
        </div>
    );
}
