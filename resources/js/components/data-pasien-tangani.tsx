import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Highlight } from './ui/highlight';

type Pasien = {
    nama_lengkap: string;
    nomor_pasien?: string;
    nik?: string | number;
    tanggal_lahir?: string | null;
    tempat_lahir?: string;
    no_hp?: string | number;
    golongan_darah?: string | null;
    riwayat_penyakit?: string | null;
    alergi?: string | null;
};

interface Props {
    pasien: Pasien;
}

/* ================= UTIL ================= */

const formatDate = (d?: string | null) => {
    if (!d) return '-';
    const dt = new Date(d);
    return isNaN(dt.getTime()) ? '-' : dt.toLocaleDateString('id-ID');
};

const hitungUmur = (tanggal?: string | null) => {
    if (!tanggal) return '-';

    const birth = new Date(tanggal);
    if (isNaN(birth.getTime())) return '-';

    const today = new Date();
    let umur = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        umur--;
    }

    return `${umur} tahun`;
};

const DataPasienTangani = ({ pasien }: Props) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="space-y-6 p-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Informasi Pasien
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Data identitas pasien
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Nomor Pasien */}
                    <Highlight
                        label="Nomor Pasien"
                        value={pasien.nomor_pasien}
                    />

                    {/* Nama */}
                    <Field label="Nama Lengkap" value={pasien.nama_lengkap} />

                    {/* Umur */}
                    <Field
                        label="Umur"
                        value={hitungUmur(pasien.tanggal_lahir)}
                    />

                    {/* Tanggal Lahir */}
                    <Field
                        label="Tanggal Lahir"
                        value={formatDate(pasien.tanggal_lahir)}
                    />

                    {showMore && (
                        <>
                            {/* Highlight tambahan */}
                            <Highlight
                                label="Golongan Darah"
                                value={pasien.golongan_darah}
                            />

                            <Highlight
                                label="Riwayat Penyakit"
                                value={pasien.riwayat_penyakit}
                            />

                            <Highlight
                                className="col-span-1 md:col-span-2"
                                label="Alergi"
                                value={pasien.alergi}
                                multiline
                            />
                        </>
                    )}
                </div>

                {/* Toggle */}
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => setShowMore(!showMore)}
                        className="inline-flex items-center text-sm text-emerald-600"
                    >
                        {showMore ? (
                            <>
                                Tampilkan Lebih Sedikit
                                <ChevronUp className="ml-1 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Tampilkan Lebih Banyak
                                <ChevronDown className="ml-1 h-4 w-4" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

function Field({ label, value }: { label: string; value: any }) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                disabled
                value={value}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
            />
        </div>
    );
}

export default DataPasienTangani;
