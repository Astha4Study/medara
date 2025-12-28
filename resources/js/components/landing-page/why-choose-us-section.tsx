import { BadgeCheck, BarChart3, CalendarClock, Users } from 'lucide-react';

const WhyChooseUsSection = () => {
    return (
        <section className="flex justify-center px-6 py-14 md:px-12 lg:px-20">
            <div className="w-full max-w-7xl">
                {/* Header */}
                <div className="mb-10 text-start">
                    <span className="mb-3 inline-block rounded-full border border-emerald-600 bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-emerald-700 shadow-sm">
                        Kenapa Kinara
                    </span>
                    <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
                        Alasan Klinik dan Pasien Memilih Kinara
                    </h2>
                    <p className="mt-4 max-w-3xl text-base text-gray-600">
                        Kinara hadir sebagai platform yang membantu klinik dan
                        pasien terhubung melalui sistem layanan kesehatan yang
                        lebih tertata, transparan, dan mudah digunakan.
                    </p>
                </div>

                {/* ================= DESKTOP ================= */}
                <div className="hidden gap-4 lg:grid lg:grid-cols-3">
                    {/* Card 1 */}
                    <div className="rounded-xl bg-gray-50 p-6 ring-1 ring-gray-200">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
                            <Users className="h-5 w-5 text-gray-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Fokus pada Pengalaman Pasien
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Pasien dapat mencari klinik, melakukan booking
                            layanan, dan mendapatkan informasi dengan proses
                            yang lebih cepat dan jelas.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-xl bg-gray-50 p-6 ring-1 ring-gray-200">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
                            <BadgeCheck className="h-5 w-5 text-gray-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Operasional Klinik Lebih Tertata
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Kinara membantu klinik mengelola antrean, jadwal
                            layanan, dan data pasien secara terpusat dan aman.
                        </p>
                    </div>

                    {/* Card 3 – FEATURED CTA */}
                    <div className="row-span-2 flex flex-col justify-between rounded-xl bg-linear-to-b from-emerald-700 to-emerald-600 p-6 text-white">
                        <div>
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/40">
                                <CalendarClock className="h-5 w-5 text-white" />
                            </div>

                            <h3 className="text-xl font-semibold">
                                Tertarik Bekerja Sama dengan Kinara?
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-emerald-100">
                                Kami terbuka untuk kolaborasi dengan klinik,
                                mitra layanan kesehatan, maupun pihak lain yang
                                ingin menghadirkan sistem layanan kesehatan yang
                                lebih modern dan terintegrasi.
                            </p>
                        </div>

                        <button className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
                            Hubungi Tim Kinara →
                        </button>
                    </div>

                    {/* Card 4 */}
                    <div className="col-span-2 rounded-xl bg-gray-50 p-6 ring-1 ring-gray-200">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
                            <BarChart3 className="h-5 w-5 text-gray-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Siap Mendukung Operasional Harian
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Dirancang untuk kebutuhan klinik kecil hingga
                            menengah dengan alur kerja yang sederhana,
                            fleksibel, dan mudah diadaptasi.
                        </p>
                    </div>
                </div>

                {/* ================= MOBILE & TABLET ================= */}
                <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
                    <div className="rounded-xl bg-gray-50 p-6 ring-1 ring-gray-200">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
                            <Users className="h-5 w-5 text-gray-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Fokus pada Pengalaman Pasien
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Proses booking dan akses layanan dibuat lebih mudah
                            dan transparan bagi pasien.
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-6 ring-1 ring-gray-200">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
                            <BadgeCheck className="h-5 w-5 text-gray-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Sistem Klinik Terintegrasi
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Semua data layanan dikelola dalam satu sistem yang
                            rapi dan terkontrol.
                        </p>
                    </div>

                    <div className="flex flex-col justify-between rounded-xl bg-linear-to-b from-emerald-700 to-emerald-600 p-6 text-white sm:col-span-2">
                        <div>
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/40">
                                <CalendarClock className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold">
                                Ingin Menjadi Mitra Kinara?
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-emerald-100">
                                Mari berkolaborasi untuk menghadirkan layanan
                                kesehatan yang lebih efisien dan berorientasi
                                pada pengalaman pengguna.
                            </p>
                        </div>

                        <button className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
                            Ajukan Kerja Sama →
                        </button>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-6 ring-1 ring-gray-200 sm:col-span-2">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
                            <BarChart3 className="h-5 w-5 text-gray-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Dibangun untuk Tumbuh Bersama
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Kinara fleksibel untuk dikembangkan seiring
                            pertumbuhan klinik dan kebutuhan layanan.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
