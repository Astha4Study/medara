import { login } from '@/routes';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

import logo from '@/assets/svg/logo.svg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = ['About Us', 'Services', 'Facilities', 'Membership'];

    return (
        <>
            <nav className="relative w-full border-gray-200 bg-white">
                <div className="mx-auto px-4 sm:px-9">
                    <div className="flex h-16 items-center justify-between">
                        {/* Left */}
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center gap-2">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className="h-8 w-auto sm:h-9 lg:h-10"
                                />
                            </Link>

                            {/* Desktop Menu */}
                            <ul className="hidden items-center gap-6 text-sm font-medium text-gray-700 lg:flex">
                                {menuItems.map((item) => (
                                    <li
                                        key={item}
                                        className="cursor-pointer transition hover:text-emerald-600"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-3">
                            {/* Search (Desktop) */}
                            <div className="relative hidden w-56 lg:block">
                                <input
                                    type="text"
                                    placeholder="Cari klinik atau layanan..."
                                    className="h-9 w-full rounded-full border border-gray-300 bg-white px-4 pr-9 text-sm text-gray-800 placeholder-gray-400 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:outline-none"
                                />
                                <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            </div>

                            {/* Login (Desktop) */}
                            <Link
                                href={login()}
                                className="hidden items-center gap-1 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-700 sm:flex"
                            >
                                Masuk
                                <ArrowUpRight size={16} />
                            </Link>

                            {/* Hamburger */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Backdrop */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`absolute top-16 right-0 left-0 z-50 origin-top transform transition duration-200 lg:hidden ${
                    isMenuOpen
                        ? 'scale-y-100 opacity-100'
                        : 'pointer-events-none scale-y-95 opacity-0'
                }`}
            >
                <div className="border-t border-gray-200 bg-white p-4 shadow-xl">
                    {/* Mobile Search */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Cari klinik atau layanan..."
                            className="h-11 w-full rounded-full border border-gray-300 px-4 pr-10 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:outline-none"
                        />
                        <Search className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* Mobile Menu Items */}
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item}>
                                <Link
                                    href="#"
                                    className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-emerald-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Login */}
                    <div className="mt-4">
                        <Link
                            href={login()}
                            className="flex items-center justify-center gap-1 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                        >
                            Masuk
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
