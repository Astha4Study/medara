import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Obat = {
    id: number;
    nama_obat: string;
    satuan: string;
    harga: number;
    penggunaan_obat: string;
};

type ObatItem = {
    obat_id: number;
    nama_obat: string;
    jumlah: number;
    satuan: string;
    harga: number;
    subtotal: number;
    penggunaan_obat: string;
};

interface Props {
    obat_list: Obat[];
    processing: boolean;
    errors: Record<string, string>;
    onConfirm: () => void;
    onChange: (list: ObatItem[]) => void;
    pasien: { id: number; nama_lengkap: string };
}

export default function FormCreateResep({
    obat_list,
    processing,
    errors,
    onConfirm,
    onChange,
    pasien,
}: Props) {
    const [resepObat, setResepObat] = useState<ObatItem[]>([]);

    const tambahBaris = () =>
        setResepObat((prev) => [
            ...prev,
            {
                obat_id: 0,
                nama_obat: '',
                jumlah: 1,
                satuan: '',
                harga: 0,
                subtotal: 0,
                penggunaan_obat: '',
            },
        ]);

    const updateObat = (index: number, key: keyof ObatItem, value: any) => {
        setResepObat((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [key]: value };

            if (key === 'jumlah' || key === 'harga' || key === 'obat_id') {
                const harga =
                    key === 'obat_id'
                        ? (obat_list.find((o) => o.id === value)?.harga ??
                          copy[index].harga)
                        : copy[index].harga;
                copy[index].subtotal = copy[index].jumlah * harga;
            }

            return copy;
        });
    };

    const hapusObat = (index: number) =>
        setResepObat((prev) => prev.filter((_, i) => i !== index));

    const total = resepObat.reduce((sum, o) => sum + o.harga * o.jumlah, 0);

    const formatRupiah = (v: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(v);

    const handlePilihObat = (index: number, obatId: number) => {
        const obat = obat_list.find((o) => o.id === obatId);
        if (!obat) return;
        updateObat(index, 'obat_id', obatId);
        updateObat(index, 'nama_obat', obat.nama_obat);
        updateObat(index, 'satuan', obat.satuan);
        updateObat(index, 'harga', obat.harga);
        updateObat(index, 'penggunaan_obat', obat.penggunaan_obat);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (resepObat.length === 0) return;
        onConfirm(); // langsung panggil parent
    };

    useEffect(() => {
        onChange(resepObat);
    }, [resepObat]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-xl border shadow-sm">
                <div className="space-y-6 p-6">
                    {/* Daftar Obat */}
                    <div className="space-y-4">
                        {resepObat.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                            >
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
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Nama Obat
                                        </label>
                                        <select
                                            value={item.obat_id}
                                            onChange={(e) =>
                                                handlePilihObat(
                                                    idx,
                                                    Number(e.target.value),
                                                )
                                            }
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

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Harga Satuan
                                        </label>
                                        <input
                                            type="text"
                                            value={formatRupiah(item.harga)}
                                            readOnly
                                            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600"
                                        />
                                    </div>

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

                        <button
                            type="button"
                            onClick={tambahBaris}
                            className="w-full rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
                        >
                            + Tambah Obat
                        </button>
                    </div>

                    {errors.general && (
                        <p className="text-sm text-red-600">{errors.general}</p>
                    )}

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

                <div className="flex justify-end gap-3 rounded-b-xl border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <Link
                        href={`/dokter/antrian/${pasien.id}/tangani`}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing || resepObat.length === 0}
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Resep'}
                    </button>
                </div>
            </div>
        </form>
    );
}
