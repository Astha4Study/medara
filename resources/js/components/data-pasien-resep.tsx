import { Highlight } from './ui/highlight';

type Props = {
    pasien: {
        nama_lengkap: string;
        nomor_pasien: string;
        riwayat_penyakit?: string | null;
    };
    diagnosa?: string | null;
};

const DataPasienResep = ({ pasien, diagnosa }: Props) => {
    const hasRiwayat =
        pasien.riwayat_penyakit &&
        pasien.riwayat_penyakit.trim() !== '' &&
        pasien.riwayat_penyakit !== '-';

    const hasDiagnosa = diagnosa && diagnosa.trim() !== '' && diagnosa !== '-';

    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="space-y-6 p-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Informasi Pasien & Diagnosa
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Data identitas pasien dan hasil pemeriksaan dokter
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Highlight
                        label="Nomor Pasien"
                        value={pasien.nomor_pasien}
                    />
                    <Info label="Nama Lengkap" value={pasien.nama_lengkap} />
                </div>

                {hasRiwayat && (
                    <Highlight
                        label="Riwayat Penyakit"
                        value={pasien.riwayat_penyakit}
                        className="mt-2"
                    />
                )}

                {/* Diagnosa */}
                <div className="mt-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Diagnosa Dokter
                    </label>

                    {hasDiagnosa ? (
                        <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                            {diagnosa}
                        </div>
                    ) : (
                        <div className="relative">
                            <input
                                type="text"
                                disabled
                                value="Data ditulis manual, jangan lupa dicek kembali"
                                className="w-full rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 pr-10 text-sm font-medium text-emerald-800"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                <svg
                                    className="h-5 w-5 text-emerald-600"
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
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

function Info({ label, value }: { label: string; value?: string }) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                {value || '-'}
            </div>
        </div>
    );
}

export default DataPasienResep;
