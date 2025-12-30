import { useState } from 'react';
import FilterKlinikAside from './filter-klinik-aside';
import KlinikListAside from './klinik-list-aside';

type JamOperasional = {
    hari: string;
    jam_buka: string | null;
    jam_tutup: string | null;
    tutup: number;
};

type Klinik = {
    id: number;
    nama_klinik: string;
    jenis_klinik: string;
    alamat: string;
    kota: string;
    provinsi?: string;
    deskripsi: string;
    latitude: number;
    longitude: number;
    rating?: number;
    gambar: string;
    kapasitas_total: number;
    kapasitas_tersedia: number;
    fasilitas: { id: number; nama: string }[];
    jam_operasional: JamOperasional[];
};

type Filters = {
    jenis_klinik: { jenis_klinik: string; count: number }[];
    fasilitas: { id: number; nama: string; klinik_count: number }[];
};

type Props = {
    kliniks: Klinik[];
    filters: Filters;
    url: string;
};

/* ✅ 1. DEFINE HELPER DI ATAS */
const getParams = (url: string) => {
    const params = new URLSearchParams(url.split('?')[1] ?? '');
    return {
        q: params.get('q') ?? '',
        jenis: params.getAll('jenis'),
    };
};

const KlinikSection = ({ kliniks, filters, url }: Props) => {
    /* ✅ 2. AMBIL PARAMS */
    const params = getParams(url);

    /* ✅ 3. INIT STATE DARI URL */
    const [searchQuery, setSearchQuery] = useState(params.q);
    const [selectedJenis, setSelectedJenis] = useState<string[]>(params.jenis);
    const [selectedFasilitas, setSelectedFasilitas] = useState<number[]>([]);

    const filteredKliniks = kliniks.filter((k) => {
        const matchSearch =
            k.nama_klinik.toLowerCase().includes(searchQuery.toLowerCase()) ||
            k.kota.toLowerCase().includes(searchQuery.toLowerCase());

        const matchJenis =
            selectedJenis.length > 0
                ? selectedJenis.includes(k.jenis_klinik)
                : true;

        const matchFasilitas =
            selectedFasilitas.length > 0
                ? selectedFasilitas.every((fid) =>
                      k.fasilitas.some((f) => f.id === fid),
                  )
                : true;

        return matchSearch && matchJenis && matchFasilitas;
    });

    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-10">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
                <FilterKlinikAside
                    filters={filters}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedJenis={selectedJenis}
                    setSelectedJenis={setSelectedJenis}
                    selectedFasilitas={selectedFasilitas}
                    setSelectedFasilitas={setSelectedFasilitas}
                />

                <KlinikListAside kliniks={filteredKliniks} />
            </div>
        </section>
    );
};

export default KlinikSection;
