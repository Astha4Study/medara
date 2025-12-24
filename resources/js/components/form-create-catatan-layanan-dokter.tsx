import { Link } from '@inertiajs/react';

type Data = {
    keluhan_utama: string;
    detail_keluhan: string;
    diagnosa: string;
    tindakan: string;
    catatan_lain: string;
};

interface Props {
    punyaServer: number;
    butuhResep: boolean;
    data: Data;
    setData: (k: keyof Data, v: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    errors: Record<string, string>;
}

export default function FormCreateCatatanLayananDokter({
    punyaServer,
    butuhResep,
    data,
    setData,
    handleSubmit,
    processing,
    errors,
}: Props) {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setData(e.target.name as keyof Data, e.target.value);

    return (
        <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
        >
            <div className="space-y-4 p-6">
                {/* Keluhan Utama (read-only) */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Keluhan Utama
                    </label>
                    <textarea
                        readOnly
                        rows={3}
                        value={data.keluhan_utama || '-'}
                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm"
                    />
                </div>

                {punyaServer === 1 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Detail Keluhan */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Detail Keluhan{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="detail_keluhan"
                                value={data.detail_keluhan}
                                onChange={handleChange}
                                rows={3}
                                required
                                placeholder="Jelaskan lebih detail keluhan pasien"
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                            />
                            {errors.detail_keluhan && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.detail_keluhan}
                                </p>
                            )}
                        </div>

                        {/* Diagnosa */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Diagnosa <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="diagnosa"
                                value={data.diagnosa}
                                onChange={handleChange}
                                required
                                placeholder="Contoh: Gastritis, ISPA"
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                            />
                            {errors.diagnosa && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.diagnosa}
                                </p>
                            )}
                        </div>

                        {/* Tindakan */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tindakan <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="tindakan"
                                value={data.tindakan}
                                onChange={handleChange}
                                required
                                placeholder="Contoh: Resep obat, Rujuk"
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                            />
                            {errors.tindakan && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.tindakan}
                                </p>
                            )}
                        </div>

                        {/* Catatan Lain */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Catatan Lain (Opsional)
                            </label>
                            <textarea
                                name="catatan_lain"
                                value={data.catatan_lain}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Catatan tambahan (opsional)"
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                            />
                            {errors.catatan_lain && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.catatan_lain}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-sm">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                            <svg
                                className="h-6 w-6 text-emerald-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.79 1.732-3L13.732 4c-.77-1.79-2.502-1.79-3.268 0L3.34 16c-.77 1.79.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-1 text-sm font-semibold text-emerald-800">
                            Mode Tanpa Server
                        </h3>
                        <p className="text-sm text-emerald-700">
                            Data rekam medis lengkap dicatat secara manual.
                            Informasi yang tersimpan otomatis hanya nomor
                            pasien, nama, dan keluhan utama.
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">
                <Link
                    href="/dokter/antrian"
                    className="rounded-lg border px-4 py-2.5 text-sm"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                    {processing
                        ? 'Menyimpan...'
                        : butuhResep
                          ? 'Siapkan Resep'
                          : 'Simpan Tindakan'}
                </button>
            </div>
        </form>
    );
}
