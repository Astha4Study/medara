import { Link } from '@inertiajs/react';
import React from 'react';

interface FormCreateObatApotekerProps {
    data: any;
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => void;
    processing: boolean;
    errors: Record<string, string>;
}

const FormCreateObatApoteker: React.FC<FormCreateObatApotekerProps> = ({
    data,
    setData,
    handleSubmit,
    handleChange,
    processing,
    errors,
}) => {
    const formatRupiah = (value: string | number) => {
        if (!value) return '';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(Number(value));
    };

    const parseRupiah = (value: string) => {
        return Number(value.replace(/[^0-9]/g, ''));
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
                            onChange={handleChange}
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
                            onChange={(e) =>
                                setData('stok', Number(e.target.value))
                            }
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
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        >
                            <option value="">Pilih jenis obat</option>
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
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        >
                            <option value="">Pilih satuan</option>
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
                        <input
                            type="text"
                            name="harga"
                            value={formatRupiah(data.harga)}
                            onChange={(e) =>
                                setData('harga', parseRupiah(e.target.value))
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                            placeholder="Contoh: Rp 50.000"
                        />
                        {errors.harga && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.harga}
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
                        onChange={handleChange}
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

            {/* Tombol */}
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
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </button>
            </div>
        </form>
    );
};

export default FormCreateObatApoteker;
