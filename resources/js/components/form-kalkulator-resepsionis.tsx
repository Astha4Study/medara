import { toast } from 'sonner';

type Props = {
    totalHarga: number;
    data: {
        uang_dibayar: number;
        metode_pembayaran: string;
    };
    setData: (key: 'uang_dibayar' | 'metode_pembayaran', value: any) => void;
    onSubmit: () => void;
    processing?: boolean;
};

const formatRupiah = (value: string | number) => {
    if (!value) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(Number(value));
};

const parseRupiah = (value: string) => {
    return Number(value.replace(/[^0-9]/g, ''));
};

export default function FormKalkulatorResepsionis({
    totalHarga,
    data,
    setData,
    onSubmit,
    processing = false,
}: Props) {
    const kembalian = data.uang_dibayar - totalHarga;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (kembalian < 0) {
            toast.error('Uang pasien kurang', {
                description: `Kurang Rp ${Math.abs(kembalian).toLocaleString('id-ID')}`,
            });
            return;
        }

        onSubmit(); // buka dialog konfirmasi
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white shadow-sm"
        >
            <div className="space-y-4 p-6">
                <h3 className="text-base font-semibold text-gray-800">
                    Kalkulator Pembayaran
                </h3>

                <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Harga</span>
                    <span className="font-semibold">
                        {formatRupiah(totalHarga)}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Uang dari Pasien
                        </label>
                        <input
                            type="text"
                            value={formatRupiah(data.uang_dibayar)}
                            onChange={(e) =>
                                setData(
                                    'uang_dibayar',
                                    parseRupiah(e.target.value),
                                )
                            }
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Metode Pembayaran
                        </label>
                        <select
                            value={data.metode_pembayaran}
                            onChange={(e) =>
                                setData('metode_pembayaran', e.target.value)
                            }
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        >
                            <option value="cash">Cash</option>
                            <option value="qris">QRIS</option>
                            <option value="debit">Debit</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-between">
                    <span
                        className={`text-sm font-medium ${
                            kembalian < 0 ? 'text-red-600' : 'text-emerald-600'
                        }`}
                    >
                        {kembalian < 0 ? 'Kurang' : 'Kembalian'}
                    </span>
                    <span
                        className={`font-semibold ${
                            kembalian < 0 ? 'text-red-600' : 'text-emerald-600'
                        }`}
                    >
                        {formatRupiah(Math.abs(kembalian))}
                    </span>
                </div>
            </div>

            <div className="flex justify-end rounded-b-xl border-t bg-gray-50 px-6 py-4">
                <button
                    type="submit"
                    disabled={processing || kembalian < 0}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                    Konfirmasi Pembayaran
                </button>
            </div>
        </form>
    );
}
