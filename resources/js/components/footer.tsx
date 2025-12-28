import logo from '@/assets/svg/logo-white.svg';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-gray-700 bg-linear-to-tr from-slate-900 via-slate-800 to-slate-900">
            <div className="mx-auto max-w-7xl px-6 py-12">
                {/* Top Section */}
                <div className="grid gap-10 md:grid-cols-2">
                    {/* Brand */}
                    <div>
                        <div className="flex flex-col gap-2">
                            <img src={logo} alt="logo" className="w-30" />

                            <p className="max-w-md text-base leading-relaxed text-white">
                                Kinara adalah platform manajemen dan booking
                                layanan klinik yang membantu pasien dan klinik
                                terhubung secara lebih cepat, rapi, dan
                                terintegrasi.
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="mt-4 flex items-center gap-4">
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="text-gray-400 transition hover:text-emerald-400"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-gray-400 transition hover:text-emerald-400"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="text-gray-400 transition hover:text-emerald-400"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-white">
                                Produk
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>Booking Klinik</li>
                                <li>Manajemen Antrean</li>
                                <li>Dashboard Klinik</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-white">
                                Untuk Klinik
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>Fitur Klinik</li>
                                <li>Demo Sistem</li>
                                <li>Pendaftaran Klinik</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-white">
                                Bantuan
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>Pusat Bantuan</li>
                                <li>Kontak</li>
                                <li>Kebijakan Privasi</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-700">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
                    <p className="text-sm text-gray-300">
                        © {new Date().getFullYear()} Kinara. All rights
                        reserved.
                    </p>

                    <div className="flex gap-4 text-sm text-gray-300">
                        <span>Syarat & Ketentuan</span>
                        <span>Kebijakan Privasi</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
