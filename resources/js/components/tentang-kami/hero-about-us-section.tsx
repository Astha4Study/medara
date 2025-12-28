import { Link } from '@inertiajs/react';
import { Phone } from 'lucide-react';
import CardsAboutUsSection from './cards-about-us-section';

const HeroAboutUsSection = () => {
    return (
        <main className="w-full px-6 py-20 pb-6">
            <section className="relative flex items-center justify-center">
                <div className="mx-auto w-full max-w-7xl">
                    <div className="mx-auto mb-10 max-w-4xl text-center">
                        <span className="mb-3 inline-block rounded-full border border-emerald-600 bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-emerald-700 shadow-sm">
                            Tentang Kinara
                        </span>

                        <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
                            Solusi Digital Terpercaya untuk Klinik Modern di
                            Indonesia
                        </h2>

                        <p className="mt-4 text-base text-gray-600">
                            Kinara hadir untuk memberdayakan klinik dengan
                            teknologi sederhana namun powerful. Kami membantu
                            Anda mengelola jadwal, reservasi online, rekam medis
                            pasien, dan promosi klinik secara terintegrasi
                            sehingga Anda bisa fokus memberikan pelayanan
                            terbaik, meningkatkan jumlah pasien, dan
                            mengembangkan klinik dengan lebih efisien serta
                            profesional.
                        </p>

                        <Link
                            href="/kontak-kami"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                        >
                            <Phone size={16} className="text-white" />
                            Hubungi Tim Kinara
                        </Link>
                    </div>
                    <div>
                        <CardsAboutUsSection />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HeroAboutUsSection;
