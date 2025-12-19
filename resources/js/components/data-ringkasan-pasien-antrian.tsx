import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Highlight } from './ui/highlight';

interface Pasien {
    nama_lengkap: string;
    golongan_darah: string;
    riwayat_penyakit: string;
    alergi: string;
    jenis_kelamin: string;
    umur: number;
}

type Props = {
    pasien: Pasien;
    tanggalKunjungan: string;
};

const DataRingkasanPasienAntrian = ({ pasien, tanggalKunjungan }: Props) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="space-y-6 p-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Informasi Pasien
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Data identitas pasien
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Highlight
                        label="Nama Pasien"
                        value={pasien.nama_lengkap}
                    />

                    <Field
                        label="Golongan Darah"
                        value={pasien.golongan_darah}
                    />
                    <Field
                        label="Riwayat Penyakit"
                        value={pasien.riwayat_penyakit}
                    />
                    <Field label="Alergi" value={pasien.alergi} />

                    {showMore && (
                        <>
                            <Field
                                label="Jenis Kelamin"
                                value={
                                    pasien.jenis_kelamin === 'L'
                                        ? 'Laki-laki'
                                        : 'Perempuan'
                                }
                            />
                            <Highlight
                                label="Umur Pasien"
                                value={`${pasien.umur} Tahun`}
                            />

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Tanggal Kunjungan
                                </label>
                                <input
                                    type="date"
                                    disabled
                                    value={tanggalKunjungan}
                                    className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm"
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => setShowMore((v) => !v)}
                        className="inline-flex items-center text-sm text-emerald-600"
                    >
                        {showMore ? (
                            <>
                                Tampilkan Lebih Sedikit{' '}
                                <ChevronUp className="ml-1 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Tampilkan Lebih Banyak{' '}
                                <ChevronDown className="ml-1 h-4 w-4" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

function Field({ label, value }: { label: string; value?: string }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                disabled
                value={value || '-'}
                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
            />
        </div>
    );
}

export default DataRingkasanPasienAntrian;
