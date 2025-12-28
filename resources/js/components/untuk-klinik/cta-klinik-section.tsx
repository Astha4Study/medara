import { Link } from '@inertiajs/react';
import { ArrowRight, Check } from 'lucide-react';

const CtaKlinikSection = () => {
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
                        <div>
                            <h2 className="mb-4 max-w-3xl text-2xl leading-tight font-bold text-white md:text-3xl lg:text-4xl">
                                Tingkatkan Operasional Klinik Anda dengan Kinara
                            </h2>

                            <p className="mx-auto mb-8 max-w-2xl text-gray-300">
                                Kinara adalah platform lengkap yang membantu
                                klinik mengelola jadwal, data pasien, reservasi
                                online, dan promosi dengan lebih mudah dan
                                efisien. Kurangi beban administrasi, hindari
                                no-show, serta tarik lebih banyak pasien baru —
                                semuanya dalam satu sistem terintegrasi.
                            </p>

                            <Link
                                href={'/kontak-kami'}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
                            >
                                Daftar Klinik Anda Sekarang
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>

                        {/* Premium Plan Card - Right */}
                        <div className="absolute -right-30 bottom-0 hidden rotate-8 transform transition-transform duration-300 lg:block">
                            <div className="w-[300px] rounded-2xl bg-white p-6 shadow-2xl">
                                <div className="mb-3 flex items-center gap-2">
                                    <Check className="h-5 w-5 text-slate-900" />
                                    <h3 className="text-start text-lg font-semibold">
                                        Untuk Mitra Klinik
                                    </h3>
                                </div>

                                <p className="mb-4 text-start text-sm text-gray-600">
                                    Tingkatkan kualitas layanan klinik melalui
                                    sistem yang terintegrasi.
                                </p>

                                <ul className="mb-6 space-y-3">
                                    <li className="flex items-start gap-2 text-xs">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span className="text-start">
                                            Manajemen antrean dan jadwal layanan
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 text-xs">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span className="text-start">
                                            Pengelolaan data pasien terpusat
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 text-xs">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span className="text-start">
                                            Alur kerja staf lebih terstruktur
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 text-xs">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span className="text-start">
                                            Siap digunakan untuk operasional
                                            harian
                                        </span>
                                    </li>
                                </ul>

                                <button className="w-full rounded-lg bg-slate-900 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800">
                                    Bergabung sebagai Mitra
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Cards - Shown on small screens */}
                    <div className="relative z-10 mt-8 grid gap-6 sm:grid-cols-2 lg:hidden">
                        {/* Untuk Mitra Klinik - Mobile */}
                        <div className="rounded-2xl bg-white p-6 shadow-xl">
                            <div className="mb-3 flex items-center gap-2">
                                <Check className="h-5 w-5 text-slate-900" />
                                <h3 className="text-lg font-semibold">
                                    Untuk Mitra Klinik
                                </h3>
                            </div>

                            <p className="mb-4 text-sm text-gray-600">
                                Tingkatkan kualitas layanan klinik melalui
                                sistem yang terintegrasi.
                            </p>

                            <ul className="mb-6 space-y-2">
                                <li className="flex items-start gap-2 text-sm">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span className="text-xs sm:text-sm">
                                        Manajemen antrean dan jadwal layanan
                                    </span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span className="text-xs sm:text-sm">
                                        Pengelolaan data pasien terpusat
                                    </span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span className="text-xs sm:text-sm">
                                        Alur kerja staf lebih terstruktur
                                    </span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span className="text-xs sm:text-sm">
                                        Siap digunakan untuk operasional harian
                                    </span>
                                </li>
                            </ul>

                            <button className="w-full rounded-lg bg-slate-900 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800">
                                Bergabung sebagai Mitra
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaKlinikSection;
