import { Link } from '@inertiajs/react';

interface FormEditObatApotekerProps {
    data: any;
    setData: (k: string, v: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    errors: Record<string, string>;
}

export default function FormEditObatApoteker({
    data,
    setData,
    handleSubmit,
    processing,
    errors,
}: FormEditObatApotekerProps) {
    const formatRupiah = (v: string | number) => {
        const num = Number(v);
        if (Number.isNaN(num)) return '';
        return num === 0 ? '' : `Rp${num.toLocaleString('id-ID')}`;
    };

    const parseRupiah = (v: string) => {
        const raw = v.replace(/[^0-9]/g, '');
        return raw === '' ? 0 : Number(raw);
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Nama Obat */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nama Obat <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="nama_obat"
                            value={data.nama_obat}
                            onChange={(e) =>
                                setData('nama_obat', e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                            placeholder="Masukkan nama obat"
                        />
                        {errors.nama_obat && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.nama_obat}
                            </p>
                        )}
                    </div>

                    {/* Stok */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Stok <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="stok"
                            value={data.stok}
                            onChange={(e) => setData('stok', e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        />
                        {errors.stok && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.stok}
                            </p>
                        )}
                    </div>

                    {/* Jenis Obat */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Jenis Obat <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="jenis_obat"
                            value={data.jenis_obat}
                            onChange={(e) =>
                                setData('jenis_obat', e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        >
                            <option value="tablet">Tablet</option>
                            <option value="kapsul">Kapsul</option>
                            <option value="sirup">Sirup</option>
                            <option value="injeksi">Injeksi</option>
                            <option value="salep">Salep</option>
                        </select>
                        {errors.jenis_obat && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.jenis_obat}
                            </p>
                        )}
                    </div>

                    {/* Satuan */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Satuan <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="satuan"
                            value={data.satuan}
                            onChange={(e) => setData('satuan', e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        >
                            <option value="strip">Strip</option>
                            <option value="box">Box</option>
                            <option value="botol">Botol</option>
                            <option value="ampul">Ampul</option>
                            <option value="tube">Tube</option>
                        </select>
                        {errors.satuan && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.satuan}
                            </p>
                        )}
                    </div>

                    {/* Harga */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Harga <span className="text-red-500">*</span>
                        </label>

                        {/* Input visual (Rp 20.000) */}
                        <input
                            type="text"
                            value={formatRupiah(data.harga)}
                            onChange={(e) => {
                                const raw = parseRupiah(e.target.value);
                                setData('harga', raw); // simpan angka murni
                            }}
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                            placeholder="Contoh: Rp 50.000"
                        />

                        {/* Hidden input untuk memastikan data asli tetap number */}
                        <input type="hidden" name="harga" value={data.harga} />

                        {errors.harga && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.harga}
                            </p>
                        )}
                    </div>

                    {/* Tanggal Expired */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Tanggal Expired{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="tanggal_expired"
                            value={data.tanggal_expired}
                            onChange={(e) =>
                                setData('tanggal_expired', e.target.value)
                            }
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        />
                        {errors.tanggal_expired && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.tanggal_expired}
                            </p>
                        )}
                    </div>
                </div>

                {/* Penggunaan Obat */}
                <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Penggunaan Obat <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="penggunaan_obat"
                        value={data.penggunaan_obat}
                        onChange={(e) =>
                            setData('penggunaan_obat', e.target.value)
                        }
                        rows={4}
                        className="h-28 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        placeholder="Cara pakai & kegunaan obat"
                    />
                    {errors.penggunaan_obat && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.penggunaan_obat}
                        </p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                <Link
                    href="/apoteker/daftar-obat"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </div>
        </form>
    );
}
