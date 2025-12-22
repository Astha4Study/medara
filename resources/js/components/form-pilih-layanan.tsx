import { useEffect, useState } from 'react';

type Layanan = {
    id: number;
    nama_layanan: string;
};

type LayananItem = {
    layanan_id: number;
    nama_layanan: string;
    qty: number;
};

interface Props {
    layanan_list: Layanan[];
    onChange: (items: LayananItem[]) => void;
    errors?: Record<string, string>;
}

const FormPilihLayanan = ({ layanan_list = [], onChange, errors = {} }: Props) => {
    const [items, setItems] = useState<LayananItem[]>([]);

    const tambahBaris = () => {
        setItems((prev) => [
            ...prev,
            {
                layanan_id: 0,
                nama_layanan: '',
                qty: 1,
            },
        ]);
    };

    const hapusBaris = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const updateItem = (
        index: number,
        key: keyof LayananItem,
        value: number | string,
    ) => {
        setItems((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [key]: value };
            return copy;
        });
    };

    const pilihLayanan = (index: number, layananId: number) => {
        const layanan = layanan_list.find((l) => l.id === layananId);
        if (!layanan) return;

        updateItem(index, 'layanan_id', layanan.id);
        updateItem(index, 'nama_layanan', layanan.nama_layanan);
    };

    useEffect(() => {
        onChange(items);
    }, [items]);

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="space-y-6 p-6">
                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="rounded-lg border border-gray-200 p-4"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">
                                    Layanan ke-{idx + 1}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => hapusBaris(idx)}
                                    className="text-xs text-red-600 hover:underline"
                                >
                                    Hapus
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Layanan
                                    </label>
                                    <select
                                        value={item.layanan_id}
                                        onChange={(e) =>
                                            pilihLayanan(
                                                idx,
                                                Number(e.target.value),
                                            )
                                        }
                                        className="w-full rounded-lg border px-3 py-2 text-sm"
                                    >
                                        <option value={0}>
                                            -- Pilih Layanan --
                                        </option>
                                        {(layanan_list ?? []).map((l) => (
                                            <option key={l.id} value={l.id}>
                                                {l.nama_layanan}
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
                                        value={item.qty}
                                        onChange={(e) =>
                                            updateItem(
                                                idx,
                                                'qty',
                                                Number(e.target.value),
                                            )
                                        }
                                        className="w-full rounded-lg border px-3 py-2 text-sm"
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
                        + Tambah Layanan
                    </button>
                </div>

                {errors.general && (
                    <p className="text-sm text-red-600">{errors.general}</p>
                )}
            </div>
        </div>
    );
};

export default FormPilihLayanan;
