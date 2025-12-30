import KlinikSection from '@/components/cari-klinik/klinik-section';
import LandingLayout from '@/layouts/landing-layout';
import { usePage } from '@inertiajs/react';

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
};

export default function CariKlinikIndexPage({ kliniks, filters }: Props) {
    const { url } = usePage();

    return (
        <LandingLayout>
            <KlinikSection kliniks={kliniks} filters={filters} url={url} />
        </LandingLayout>
    );
}
