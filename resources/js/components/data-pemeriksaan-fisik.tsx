type PemeriksaanFisik = {
    berat_badan: number | null;
    tinggi_badan: number | null;
    suhu_tubuh: number | null;
    tekanan_darah: string | null;
    kondisi_khusus: string | null;
};

type Props = {
    pemeriksaanFisik: PemeriksaanFisik;
};

const DataPemeriksaanFisik = ({ pemeriksaanFisik }: Props) => {
    const hasKondisiKhusus =
        pemeriksaanFisik.kondisi_khusus &&
        pemeriksaanFisik.kondisi_khusus.trim() !== '';

    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="space-y-6 p-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Pemeriksaan Fisik Pasien
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Hasil pemeriksaan fisik yang dilakukan oleh tenaga medis
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Berat Badan */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-emerald-700">
                            Berat Badan
                        </label>
                        <div className="relative w-full">
                            <input
                                type="number"
                                value={pemeriksaanFisik.berat_badan ?? ''}
                                readOnly
                                disabled
                                className="w-full rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 pr-10 text-sm font-medium text-emerald-900"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-emerald-700">
                                kg
                            </span>
                        </div>
                    </div>

                    {/* Tinggi Badan */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Tinggi Badan
                        </label>
                        <div className="relative w-full">
                            <input
                                type="number"
                                value={pemeriksaanFisik.tinggi_badan ?? ''}
                                readOnly
                                disabled
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-gray-700"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
                                cm
                            </span>
                        </div>
                    </div>

                    {/* Suhu Tubuh */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Suhu Tubuh
                        </label>
                        <div className="relative w-full">
                            <input
                                type="number"
                                step={0.1}
                                value={pemeriksaanFisik.suhu_tubuh ?? ''}
                                readOnly
                                disabled
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-gray-700"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
                                °C
                            </span>
                        </div>
                    </div>

                    {/* Tekanan Darah (HIGHLIGHT) */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-emerald-700">
                            Tekanan Darah
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={pemeriksaanFisik.tekanan_darah ?? ''}
                                readOnly
                                disabled
                                className="w-full rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 pr-10 text-sm font-medium text-emerald-900"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-emerald-700">
                                mmHg
                            </span>
                        </div>
                    </div>

                    {/* Kondisi Khusus (HANYA JIKA ADA) */}
                    {hasKondisiKhusus && (
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Kondisi Khusus
                            </label>
                            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm whitespace-pre-wrap text-gray-700">
                                {pemeriksaanFisik.kondisi_khusus}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataPemeriksaanFisik;
