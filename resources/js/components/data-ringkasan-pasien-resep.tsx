import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Highlight } from './ui/highlight';

/* ================= TYPES ================= */

type Pasien = {
    nama_lengkap: string;
    nomor_pasien?: string;
    tanggal_lahir?: string | null;
    golongan_darah?: string | null;
    riwayat_penyakit?: string | null;
    alergi?: string | null;
};

type PemeriksaanFisik = {
    berat_badan: number | null;
    tekanan_darah: string | null;
    suhu_tubuh: number | null;
    kondisi_khusus: string | null;
};

type Props = {
    pasien: Pasien;
    pemeriksaanFisik: PemeriksaanFisik;
};

/* ================= UTIL ================= */

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

const DataRingkasanPasienResep = ({ pasien, pemeriksaanFisik }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="rounded-t-lg border-b bg-gray-50">
            {/* Header */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
            >
                <div>
                    <h2 className="text-sm font-semibold text-gray-800">
                        Ringkasan Pasien & Pemeriksaan
                    </h2>
                    <p className="text-xs text-gray-500">
                        Digunakan sebagai referensi penulisan resep
                    </p>
                </div>

                {open ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
            </button>

            {/* Content */}
            {open && (
                <div className="space-y-6 border-t bg-white px-6 pb-6">
                    {/* Identitas */}
                    <div className="mt-4">
                        <h3 className="mb-3 text-sm font-semibold text-gray-700">
                            Informasi Pasien
                        </h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Highlight
                                label="Nama Pasien"
                                value={pasien.nama_lengkap}
                            />

                            <Highlight
                                label="Nomor Pasien"
                                value={pasien.nomor_pasien}
                            />

                            <Highlight
                                label="Umur"
                                value={hitungUmur(pasien.tanggal_lahir)}
                            />

                            <Highlight
                                label="Golongan Darah"
                                value={pasien.golongan_darah}
                            />

                            <Highlight
                                className="md:col-span-2"
                                label="Riwayat Penyakit"
                                value={pasien.riwayat_penyakit}
                                multiline
                            />

                            <Highlight
                                className="md:col-span-2"
                                label="Alergi"
                                value={pasien.alergi}
                                multiline
                            />
                        </div>
                    </div>

                    {/* Pemeriksaan Fisik */}
                    <div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Highlight
                                label="Berat Badan"
                                value={
                                    pemeriksaanFisik.berat_badan
                                        ? `${pemeriksaanFisik.berat_badan} kg`
                                        : undefined
                                }
                            />

                            <Highlight
                                label="Tekanan Darah"
                                value={
                                    pemeriksaanFisik.tekanan_darah
                                        ? `${pemeriksaanFisik.tekanan_darah} mmHg`
                                        : undefined
                                }
                            />

                            <Highlight
                                label="Suhu Tubuh"
                                value={
                                    pemeriksaanFisik.suhu_tubuh
                                        ? `${pemeriksaanFisik.suhu_tubuh} °C`
                                        : undefined
                                }
                            />

                            {pemeriksaanFisik.kondisi_khusus && (
                                <Highlight
                                    className="md:col-span-2"
                                    label="Kondisi Khusus"
                                    value={pemeriksaanFisik.kondisi_khusus}
                                    multiline
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataRingkasanPasienResep;
