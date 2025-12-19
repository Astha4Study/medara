type Props = {
    resep_teks: string;
};

export default function DataResepTeks({ resep_teks }: Props) {
    return (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="space-y-4 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Resep Medis Dokter
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Resep yang ditulis oleh dokter sebagai acuan
                            penyiapan obat
                        </p>
                    </div>

                    <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Resep Dokter
                    </span>
                </div>

                {/* Textarea Read-only */}
                <div className="mt-4">
                    <textarea
                        rows={4}
                        value={resep_teks || '-'}
                        disabled
                        className="w-full resize-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm leading-relaxed text-gray-700"
                    />
                </div>
            </div>
        </div>
    );
}
