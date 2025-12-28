import LandingLayout from '@/layouts/landing-layout';
import { Link } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

export default function TentangKamiIndexPage() {
    return (
        <LandingLayout>
            <section className="flex justify-center px-6 py-14 md:px-12 lg:px-20">
                <div className="w-full max-w-6xl">
                    <div className="mx-auto mb-10 max-w-4xl text-center">
                        <span className="mb-3 inline-block rounded-full border border-emerald-600 bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-emerald-700 shadow-sm">
                            Tertarik Bekerja Sama
                        </span>

                        <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
                            Tertarik Bekerja Sama dengan Kinara?
                        </h2>

                        <p className="mt-4 text-base text-gray-600">
                            Hubungi tim Kinara untuk mendiskusikan kebutuhan
                            klinik Anda, melihat demo sistem, dan mengetahui
                            bagaimana Kinara dapat membantu meningkatkan
                            operasional serta jangkauan pasien klinik Anda.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                        <div className="rounded-xl bg-white p-6">
                            <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                                Ajukan Kerja Sama
                            </h3>
                            <p className="mb-4 text-sm text-gray-600">
                                Sampaikan kebutuhan klinik Anda melalui formulir
                                di bawah ini. Tim kami akan menghubungi Anda
                                untuk diskusi lebih lanjut.
                            </p>

                            <form className="space-y-3">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Nama
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none"
                                        placeholder="Nama Penanggung Jawab"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none"
                                        placeholder="Email Klinik / Email Bisnis"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Pesan
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none"
                                        placeholder="Ceritakan sedikit tentang klinik Anda atau kebutuhan yang ingin didiskusikan..."
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="h-4 w-4 rounded border-gray-300 accent-emerald-600"
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm text-gray-600"
                                    >
                                        Saya menyetujui kebijakan penggunaan dan{' '}
                                        <Link className="text-emerald-600 underline-offset-2 hover:underline">
                                            privasi Kinara
                                        </Link>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-4 w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                >
                                    Hubungi Tim Kinara
                                </button>
                            </form>
                        </div>

                        {/* Right - Benefit Section */}
                        <div className="rounded-xl bg-white p-6">
                            <h3 className="mb-6 text-2xl font-semibold text-gray-900">
                                Apa yang Akan Klinik Anda Dapatkan?
                            </h3>

                            <ul className="space-y-4 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                    <span>
                                        Meningkatkan efisiensi operasional dan
                                        pengelolaan klinik
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                    <span>
                                        Memperluas jangkauan pasien melalui
                                        platform digital
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                    <span>
                                        Sistem reservasi dan manajemen layanan
                                        yang lebih terstruktur
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                    <span>
                                        Dukungan teknologi untuk pertumbuhan
                                        klinik jangka panjang
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
