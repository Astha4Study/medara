import KlinikSection from '@/components/cari-klinik/klinik-section';
import SearchSection from '@/components/cari-klinik/search-section';
import LandingLayout from '@/layouts/landing-layout';

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

export default function CariKlinikIndexPage({ kliniks, filters }: Props) {
    return (
        <LandingLayout>
            <SearchSection />
            <KlinikSection kliniks={kliniks} filters={filters} />
        </LandingLayout>
    );
}
