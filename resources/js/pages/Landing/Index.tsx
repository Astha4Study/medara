import HeroSection from '@/components/landing-page/hero';
import NearLocation from '@/components/landing-page/near-location';
import LandingLayout from '@/layouts/landing-layout';

type Klinik = {
    id: number;
    kode_klinik: string;
    nama_klinik: string;
    jenis_klinik: string;
    alamat: string;
    kota: string;
    provinsi: string;
    no_telepon: string;
    email: string;
    deskripsi: string;
    latitude: number;
    longitude: number;
    gambar: string;
    rating: number;
    kapasitas_total: number;
    kapasitas_tersedia: number;
};

type PageProps = {
    kliniks: Klinik[];
};

export default function LandingIndexPage({ kliniks }: PageProps) {
    return (
        <LandingLayout>
            <HeroSection />
            <NearLocation kliniks={kliniks} />
        </LandingLayout>
    );
}
