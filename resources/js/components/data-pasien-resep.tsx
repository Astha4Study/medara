import clsx from 'clsx';

type Props = {
    pasien: {
        nama_lengkap: string;
        nomor_pasien: string;
        nik: string;
        riwayat_penyakit: string;
    };
    dokter: {
        nama: string;
    };
    diagnosa: string;
};

export default function DataPasienResep({ pasien, dokter, diagnosa }: Props) {
    return (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm">
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

                    <Info label="NIK" value={pasien.nik} />

                    <Info label="Dokter Pemeriksa" value={dokter.nama} />
                </div>

                <Highlight
                    label="Riwayat Penyakit"
                    value={pasien.riwayat_penyakit}
                    className="mt-2"
                />

                <Highlight
                    label="Diagnosa Dokter"
                    value={diagnosa}
                    className="mt-2"
                />
            </div>
        </div>
    );
}

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

function Highlight({
    label,
    value,
    className,
}: {
    label: string;
    value?: string;
    className?: string;
}) {
    return (
        <div className={clsx(className)}>
            <label className="mb-1 block text-sm font-semibold text-emerald-700">
                {label}
            </label>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-900">
                {value || '-'}
            </div>
        </div>
    );
}
