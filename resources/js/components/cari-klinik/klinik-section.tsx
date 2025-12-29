import FilterKlinikAside from './filter-klinik-aside';
import KlinikListAside from './klinik-list-aside';

export type Klinik = {
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
    jam_operasional: { hari: string; buka: string; tutup: string }[];
};

type Filters = {
    jenis_klinik: { jenis_klinik: string; count: number }[];
    fasilitas: { id: number; nama: string; klinik_count: number }[];
};

type Props = {
    kliniks: Klinik[];
    filters: Filters;
};

const KlinikSection = ({ kliniks, filters }: Props) => {
    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-10">
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_1fr]">
                <FilterKlinikAside filters={filters} />
                <KlinikListAside kliniks={kliniks} />
            </div>
        </section>
    );
};

export default KlinikSection;
