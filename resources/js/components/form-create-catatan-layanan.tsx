import { Link } from '@inertiajs/react';
import React from 'react';

interface FormCreateCatatanLayananProps {
    data: {
        keluhan_utama: string;
        detail_keluhan: string;
        diagnosa: string;
        tindakan: string;
        catatan_lain: string;
    };
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    errors: Record<string, string>;
    pasien: {
        nama_lengkap: string;
        nomor_pasien: string;
        nik: number;
        tanggal_lahir: Date;
        tempat_lahir: string;
        no_hp: number;
        golongan_darah: string;
        riwayat_penyakit: string;
        alergi: string;
    };
    punyaServer: number;
}

const FormCreateCatatanLayanan: React.FC<FormCreateCatatanLayananProps> = ({
    pasien,
    data,
    setData,
    handleSubmit,
    processing,
    punyaServer,
    errors,
}) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setData(e.target.name, e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="p-6">
                <div className="mb-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Nama Lengkap */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                value={pasien.nama_lengkap}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* Nomor Pasien */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Nomor Pasien
                            </label>
                            <input
                                type="text"
                                value={pasien.nomor_pasien}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* NIK */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                NIK
                            </label>
                            <input
                                type="text"
                                value={pasien.nik}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* Tanggal Lahir */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tanggal Lahir
                            </label>
                            <input
                                type="text"
                                value={
                                    pasien.tanggal_lahir instanceof Date
                                        ? pasien.tanggal_lahir.toLocaleDateString(
                                              'id-ID',
                                          )
                                        : String(pasien.tanggal_lahir)
                                }
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* Tempat Lahir */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tempat Lahir
                            </label>
                            <input
                                type="text"
                                value={pasien.tempat_lahir}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* No. HP */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                No. HP
                            </label>
                            <input
                                type="text"
                                value={pasien.no_hp}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* Golongan Darah */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Golongan Darah
                            </label>
                            <input
                                type="text"
                                value={pasien.golongan_darah || '-'}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* Riwayat Penyakit */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Riwayat Penyakit
                            </label>
                            <input
                                type="text"
                                value={pasien.riwayat_penyakit || '-'}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* Alergi */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Alergi
                            </label>
                            <textarea
                                value={pasien.alergi || '-'}
                                disabled
                                rows={2}
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>
                    </div>
                </div>
                {/* Keluhan Utama (readonly) */}
                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Keluhan Utama
                    </label>
                    <textarea
                        name="keluhan_utama"
                        value={data.keluhan_utama}
                        readOnly
                        rows={3}
                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
                        placeholder="Keluhan utama pasien (otomatis dari antrian)"
                    />
                </div>

                <hr className="mt-4 py-4" />

                {punyaServer === 1 && (
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
                                placeholder="Contoh: Gastritis, ISPA, dll"
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
                                placeholder="Contoh: Resep obat, Rujuk, Observasi"
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
                                Catatan Lain
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
                )}
            </div>

            {/* Tombol – persis sama dengan FormCreatePasien */}
            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                <Link
                    href="/dokter/antrian"
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

export default FormCreateCatatanLayanan;
