import CtaSection from '@/components/landing-page/cta-section';
import ForClinicSection from '@/components/landing-page/for-clinic-section';
import HeroSection from '@/components/landing-page/hero-section';
import HowItWorksSection from '@/components/landing-page/how-it-works-section';
import NearLocationSection from '@/components/landing-page/near-location-section';
import WhyChooseUsSection from '@/components/landing-page/why-choose-us-section';
import LandingLayout from '@/layouts/landing-layout';

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

type PageProps = {
    kliniks: Klinik[];
};

export default function LandingIndexPage({ kliniks }: PageProps) {
    return (
        <LandingLayout>
            <HeroSection />
            <NearLocationSection kliniks={kliniks} />
            <WhyChooseUsSection />
            <HowItWorksSection />
            <ForClinicSection />
            <CtaSection />
        </LandingLayout>
    );
}
