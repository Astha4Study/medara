import heroadventages from '@/assets/image/hero-adventages.png';
import { CheckCircle } from 'lucide-react';

const HeroAdventagesSection = () => {
    return (
        <main className="w-full py-14">
            <section className="relative flex h-[530px] items-center overflow-hidden rounded-2xl">
                <div className="mx-auto w-full max-w-7xl py-20 pl-6">
                    <div className="grid items-center gap-4 lg:grid-cols-2">
                        <div>
                            <span className="mb-3 inline-block rounded-full border border-emerald-600 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-700 shadow-sm">
                                Untuk Klinik & Mitra
                            </span>

                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Tingkatkan Operasional Klinik Anda dengan Kinara
                            </h2>

                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
                                Kinara membantu klinik mengelola antrean, jadwal
                                layanan, dan data pasien dalam satu sistem
                                terintegrasi untuk operasional yang lebih
                                efisien dan profesional.
                            </p>

                            <ul className="mt-5 space-y-3 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                                    <span>
                                        Antrean pasien lebih tertata dan
                                        terjadwal
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                                    <span>
                                        Pengelolaan jadwal dokter dan layanan
                                        terpusat
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                                    <span>
                                        Data layanan tersimpan aman dan
                                        terstruktur
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                                    <span>
                                        Meningkatkan kepuasan dan kepercayaan
                                        pasien
                                    </span>
                                </li>
                            </ul>

                            {/* CTA */}
                            <div className="flex flex-wrap gap-4 pt-6">
                                <button className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                                    Pelajari Selengkapnya
                                </button>
                                <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                                    Daftarkan Klinik
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kanan - Gambar keluar dari max-w-7xl dan center vertikal */}
                <div className="absolute top-1/2 right-0 hidden w-[500px] -translate-y-1/2 lg:block">
                    <div className="rounded-2xl border p-2 shadow-lg">
                        <img
                            src={heroadventages}
                            alt="Keuntungan visual"
                            className="h-full w-full rounded-tl-2xl rounded-bl-2xl object-cover"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HeroAdventagesSection;
