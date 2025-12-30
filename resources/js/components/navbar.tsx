import { Link, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, LogOut, Menu, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import logo from '@/assets/svg/logo.svg';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type UserType = {
    id: number;
    name: string;
    email: string;
};

type PageProps = {
    auth: {
        user: UserType | null;
    };
};

const getInitials = (name = '') =>
    name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

export default function Navbar() {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;
    const isLoggedIn = !!user;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openAvatarMenu, setOpenAvatarMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const desktopAvatarRef = useRef<HTMLDivElement | null>(null);

    const menuItems = [
        { name: 'Beranda', href: '' },
        { name: 'Cari Klinik', href: 'cari-klinik' },
        { name: 'Untuk Klinik', href: 'untuk-klinik' },
        { name: 'Tentang Kami', href: 'tentang-kami' },
    ];

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                desktopAvatarRef.current &&
                !desktopAvatarRef.current.contains(e.target as Node)
            ) {
                setOpenAvatarMenu(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setOpenAvatarMenu(false);
        setIsMenuOpen(false);
        router.post('/logout');
    };

    return (
        <>
            <nav
                className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${
                    isScrolled ? 'border-b shadow-sm' : ''
                }`}
            >
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between sm:h-16 lg:grid lg:grid-cols-3">
                        {/* LOGO */}
                        <div className="flex items-center">
                            <Link href="/">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className="h-7 sm:h-8 lg:h-9"
                                />
                            </Link>
                        </div>

                        {/* DESKTOP MENU */}
                        <ul className="hidden items-center justify-center gap-4 text-sm font-medium text-gray-700 lg:flex xl:gap-6">
                            {menuItems.map((item, i) => (
                                <li
                                    key={i}
                                    className="transition hover:text-emerald-600"
                                >
                                    <Link href={`/${item.href}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* RIGHT SECTION */}
                        <div className="flex items-center justify-end gap-2">
                            {/* Desktop CTA */}
                            <Link
                                href="/kontak-kami"
                                className="hidden rounded-full border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50 lg:flex"
                            >
                                Daftarkan Klinik
                            </Link>

                            {/* DESKTOP AVATAR */}
                            <div
                                className="relative hidden lg:block"
                                ref={desktopAvatarRef}
                            >
                                {!isLoggedIn ? (
                                    <Link
                                        href="/login"
                                        className="flex items-center gap-1 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                                    >
                                        Masuk
                                        <ArrowUpRight size={16} />
                                    </Link>
                                ) : (
                                    <>
                                        <button
                                            onClick={() =>
                                                setOpenAvatarMenu(
                                                    !openAvatarMenu,
                                                )
                                            }
                                            className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-50"
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="bg-emerald-600 text-sm text-white">
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="hidden text-left xl:block">
                                                <p className="text-sm font-medium text-gray-800">
                                                    Hai, {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Lihat profil
                                                </p>
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {openAvatarMenu && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: -8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: -8,
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                    className="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow-md"
                                                >
                                                    <Link
                                                        href="/profile"
                                                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                                                        onClick={() =>
                                                            setOpenAvatarMenu(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        <User size={16} />
                                                        Profil
                                                    </Link>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                                                    >
                                                        <LogOut size={16} />
                                                        Keluar
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                )}
                            </div>

                            {/* MOBILE AVATAR */}

                            {/* HAMBURGER */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
                            >
                                {isMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* BACKDROP */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* MOBILE MENU */}
            <div
                className={`fixed inset-x-0 top-14 z-40 transition-all lg:hidden ${
                    isMenuOpen
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none -translate-y-2 opacity-0'
                }`}
            >
                <div className="rounded-b-2xl bg-white shadow-xl ring-1 ring-black/5">
                    {/* USER HEADER */}
                    {isLoggedIn && (
                        <div className="flex items-center gap-3 border-b px-4 py-4">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-emerald-600 text-sm font-medium text-white">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* MENU LIST */}
                    <ul className="space-y-1 px-2 py-3">
                        {menuItems.map((item, i) => (
                            <li key={i}>
                                <Link
                                    href={`/${item.href}`}
                                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* ACCOUNT ACTION */}
                    {isLoggedIn && (
                        <div className="space-y-1 border-t px-2 py-3">
                            <Link
                                href="/profile"
                                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User className="h-4 w-4 text-gray-400" />
                                Profil
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4" />
                                Keluar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
