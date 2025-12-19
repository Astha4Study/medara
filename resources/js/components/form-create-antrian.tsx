import { Link } from '@inertiajs/react';

type Props = {
    data: any;
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
};

const FormCreateAntrian = ({
    data,
    setData,
    handleSubmit,
    processing,
}: Props) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
            <div className="space-y-6 p-6">
                {/* Keluhan (Opsional) */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Keluhan
                    </label>
                    <textarea
                        value={data.keluhan}
                        onChange={(e) => setData('keluhan', e.target.value)}
                        rows={3}
                        placeholder="Masukkan keluhan utama pasien (opsional)"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                </div>

                {/* Pemeriksaan Fisik */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Berat Badan (WAJIB) */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Berat Badan <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                required
                                placeholder="Contoh: 65"
                                value={data.berat_badan || ''}
                                onChange={(e) =>
                                    setData('berat_badan', e.target.value)
                                }
                                className="w-full rounded-lg border px-4 py-2.5 pr-10 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
                                kg
                            </span>
                        </div>
                    </div>

                    {/* Tinggi Badan (Opsional) */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Tinggi Badan
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="Contoh: 170"
                                value={data.tinggi_badan || ''}
                                onChange={(e) =>
                                    setData('tinggi_badan', e.target.value)
                                }
                                className="w-full rounded-lg border px-4 py-2.5 pr-10 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
                                cm
                            </span>
                        </div>
                    </div>

                    {/* Suhu Tubuh (Opsional) */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Suhu Tubuh
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.1"
                                placeholder="Contoh: 36.5"
                                value={data.suhu_tubuh || ''}
                                onChange={(e) =>
                                    setData('suhu_tubuh', e.target.value)
                                }
                                className="w-full rounded-lg border px-4 py-2.5 pr-10 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
                                °C
                            </span>
                        </div>
                    </div>

                    {/* Tekanan Darah (WAJIB) */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Tekanan Darah{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                placeholder="Contoh: 120/80"
                                value={data.tekanan_darah || ''}
                                onChange={(e) =>
                                    setData(
                                        'tekanan_darah',
                                        e.target.value.replace(/[^0-9/]/g, ''),
                                    )
                                }
                                className="w-full rounded-lg border px-4 py-2.5 pr-14 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
                                mmHg
                            </span>
                        </div>
                    </div>

                    {/* Kondisi Khusus (Opsional) */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Kondisi Khusus
                        </label>
                        <textarea
                            rows={2}
                            placeholder="Contoh: Alergi obat, asma, hamil, dll (opsional)"
                            value={data.kondisi_khusus || ''}
                            onChange={(e) =>
                                setData('kondisi_khusus', e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                </div>
            </div>

            {/* Action */}
            <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">
                <Link
                    href="/resepsionis/antrian"
                    className="rounded-lg border px-4 py-2.5 text-sm"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                    {processing ? 'Menyimpan...' : 'Simpan Antrian'}
                </button>
            </div>
        </form>
    );
};

export default FormCreateAntrian;
