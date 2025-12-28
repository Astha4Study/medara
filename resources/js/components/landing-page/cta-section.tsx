import { Link } from '@inertiajs/react';
import { ArrowRight, Check } from 'lucide-react';

const CtaSection = () => {
    return (
        <section className="flex justify-center bg-white px-6 py-20 md:px-12 lg:px-20">
            <div className="mx-auto w-full max-w-6xl">
                <div className="relative rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
                    <div className="hidden md:block">
                        {/* Decorative dashed lines */}
                        <svg
                            className="absolute top-0 left-0 h-64 w-64 opacity-30"
                            viewBox="0 0 200 200"
                        >
                            <path
                                d="M 20 180 Q 60 120, 100 100 T 180 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray="8,8"
                                className="text-gray-500"
                            />
                        </svg>
                        <svg
                            className="absolute top-0 right-0 h-64 w-64 opacity-30"
                            viewBox="0 0 200 200"
                        >
                            <path
                                d="M 180 180 Q 140 120, 100 100 T 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray="8,8"
                                className="text-gray-500"
                            />
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center">
                        {/* Basic Plan Card - Left */}
                        <div className="absolute top-6 -left-30 hidden -rotate-8 transform transition-transform duration-300 lg:block">
                            <div className="w-[300px] rounded-2xl bg-white p-6 shadow-2xl">
                                <div className="mb-3 flex items-center gap-2">
                                    <Check className="h-5 w-5 text-slate-900" />
                                    <h3 className="text-start text-lg font-semibold">
                                        Untuk Pasien
                                    </h3>
                                </div>

                                <p className="mb-4 text-start text-sm text-gray-600">
                                    Akses layanan kesehatan menjadi lebih mudah,
                                    cepat, dan terorganisir.
                                </p>

                                <ul className="mb-6 space-y-3">
                                    <li className="flex items-start gap-2 text-xs">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span className="text-start">
                                            Cari dan pilih klinik dengan mudah
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 text-xs">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span className="text-start">
                                            Booking jadwal tanpa antre
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 text-xs">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span className="text-start">
                                            Informasi layanan lebih transparan
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 text-xs">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span className="text-start">
                                            Pengalaman berobat lebih nyaman
                                        </span>
                                    </li>
                                </ul>

                                <button className="w-full rounded-lg bg-slate-900 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800">
                                    Gunakan Kinara Sekarang
                                </button>
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-4 max-w-3xl text-2xl leading-tight font-bold text-white md:text-3xl lg:text-4xl">
                                Kinara Menghubungkan Pasien dan Klinik dalam
                                Satu Platform
                            </h2>

                            <p className="mx-auto mb-8 max-w-2xl text-gray-400">
                                Kinara dirancang untuk mendukung layanan
                                kesehatan yang lebih tertata. Pasien mendapatkan
                                kemudahan akses, sementara klinik dapat
                                mengelola operasional secara efisien dan
                                profesional.
                            </p>

                            <Link
                                href={'/cari-klinik'}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 font-semibold text-slate-900 shadow-lg transition-colors hover:bg-gray-100"
                            >
                                Jelajahi Kinara
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Cards - Shown on small screens */}
                    <div className="relative z-10 mt-8 grid gap-6 sm:grid-cols-2 lg:hidden">
                        {/* Untuk Pasien - Mobile */}
                        <div className="rounded-2xl bg-white p-6 shadow-xl">
                            <div className="mb-3 flex items-center gap-2">
                                <Check className="h-5 w-5 text-slate-900" />
                                <h3 className="text-lg font-semibold">
                                    Untuk Pasien
                                </h3>
                            </div>

                            <p className="mb-4 text-sm text-gray-600">
                                Akses layanan kesehatan menjadi lebih mudah,
                                cepat, dan terorganisir.
                            </p>

                            <ul className="mb-6 space-y-2">
                                <li className="flex items-start gap-2 text-sm">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span className="text-xs sm:text-sm">
                                        Cari dan pilih klinik dengan mudah
                                    </span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span className="text-xs sm:text-sm">
                                        Booking jadwal tanpa antre
                                    </span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span className="text-xs sm:text-sm">
                                        Informasi layanan lebih transparan
                                    </span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span className="text-xs sm:text-sm">
                                        Pengalaman berobat lebih nyaman
                                    </span>
                                </li>
                            </ul>

                            <button className="w-full rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800">
                                Gunakan Kinara Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
