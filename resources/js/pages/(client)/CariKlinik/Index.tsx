import KlinikSection from '@/components/cari-klinik/klinik-section';
import SearchSection from '@/components/cari-klinik/search-section';
import LandingLayout from '@/layouts/landing-layout';

export default function CariKlinikIndexPage() {
    return (
        <LandingLayout>
            <SearchSection />
            <KlinikSection />
        </LandingLayout>
    );
}
