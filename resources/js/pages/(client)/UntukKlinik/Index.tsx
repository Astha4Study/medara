import CtaKlinikSection from '@/components/untuk-klinik/cta-klinik-section';
import HeroAdventagesSection from '@/components/untuk-klinik/hero-adventages-section';
import HowItWorksKlinikSection from '@/components/untuk-klinik/how-it-works-klinik-section';
import ProblemExperienceSection from '@/components/untuk-klinik/problem-experienced-section';
import LandingLayout from '@/layouts/landing-layout';

export default function UntukKlinikIndexPage() {
    return (
        <LandingLayout>
            <HeroAdventagesSection />
            <ProblemExperienceSection />
            <HowItWorksKlinikSection />
            <CtaKlinikSection />
        </LandingLayout>
    );
}
