import { Cloud, CloudLightning, CloudRain, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AvatarCircles } from '../ui/avatar-circles';

import dummy1 from '@/assets/image/dummy-1.jpg';
import dummy2 from '@/assets/image/dummy-2.jpg';
import dummy3 from '@/assets/image/dummy-3.jpg';
import dummy4 from '@/assets/image/dummy-4.jpg';
import heroImage from '@/assets/image/hero-image.jpg';

const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;

const daerahIndonesia = [
    'Purwokerto',
    'Purwakarta',
    'Jakarta',
    'Bandung',
    'Semarang',
    'Yogyakarta',
    'Surabaya',
    'Medan',
    'Makassar',
    'Denpasar',
];

type WeatherType = 'clear' | 'clouds' | 'rain' | 'storm' | 'unknown';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [weather, setWeather] = useState<WeatherType>('unknown');
    const [city, setCity] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setSuggestions(
            daerahIndonesia.filter((d) =>
                d.toLowerCase().startsWith(value.toLowerCase()),
            ),
        );
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setSuggestions([]);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    /** Fetch weather based on user location */
    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const res = await fetch(
                        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&lang=id`,
                    );

                    if (!res.ok) {
                        throw new Error('Failed to fetch weather');
                    }

                    const data = await res.json();

                    console.log('WeatherAPI response:', data);

                    setCity(data.location?.name || '');

                    const condition =
                        data.current?.condition?.text?.toLowerCase() || '';

                    if (
                        condition.includes('clear') ||
                        condition.includes('sunny')
                    ) {
                        setWeather('clear');
                    } else if (condition.includes('cloud')) {
                        setWeather('clouds');
                    } else if (
                        condition.includes('rain') ||
                        condition.includes('drizzle')
                    ) {
                        setWeather('rain');
                    } else if (condition.includes('thunder')) {
                        setWeather('storm');
                    } else {
                        setWeather('unknown');
                    }
                } catch (error) {
                    console.error('Weather error:', error);
                    setWeather('unknown');
                }
            },
            () => {
                console.warn('Location permission denied');
            },
        );
    }, []);

    const WeatherIcon = () => {
        switch (weather) {
            case 'clear':
                return <Sun className="h-5 w-5 text-yellow-400" />;
            case 'clouds':
                return <Cloud className="h-5 w-5 text-gray-400" />;
            case 'rain':
                return <CloudRain className="h-5 w-5 text-blue-500" />;
            case 'storm':
                return <CloudLightning className="h-5 w-5 text-purple-500" />;
            default:
                return null;
        }
    };

    return (
        <main className="w-full px-6 pt-2 pb-6">
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden rounded-2xl md:min-h-[calc(100vh-96px)]">
                {/* Background */}
                <img
                    src={heroImage}
                    alt="Layanan Klinik"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/35" />

                {weather !== 'unknown' && (
                    <div className="absolute top-3 right-3 z-30">
                        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md ring-1 ring-black/5 backdrop-blur-md">
                            <span className="text-xs font-semibold tracking-wide text-gray-800">
                                {city || 'Sekitar Anda'}
                            </span>
                            <div className="flex h-5 w-5 items-center justify-center text-sky-600">
                                <WeatherIcon />
                            </div>
                        </div>
                    </div>
                )}

                {/* Center Content */}
                <div className="relative z-10 flex h-full items-center justify-center px-6">
                    <div className="w-full max-w-5xl text-center text-white">
                        <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-light tracking-wide text-white backdrop-blur-xs">
                            Ribuan Klinik Terverifikasi
                        </span>
                        <h1 className="text-3xl leading-tight font-bold md:text-4xl">
                            Bandingkan & Temukan Klinik Kesehatan Terbaik &
                            Terdekat di Sekitar Anda
                        </h1>
                        <p className="mx-auto mt-3 max-w-2xl text-base text-gray-100 md:text-lg">
                            Lihat rating, fasilitas, foto, ulasan asli pasien,
                            dan lokasi klinik terdekat. Pilih yang paling sesuai
                            untuk kebutuhan kesehatan Anda.
                        </p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="absolute inset-x-6 bottom-4 z-20">
                    <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-4">
                        {/* Search */}
                        <div className="rounded-full border border-gray-200 bg-white p-2 shadow-lg md:col-span-2 md:p-3">
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr_auto]">
                                {/* Lokasi */}
                                <div className="relative" ref={wrapperRef}>
                                    <input
                                        type="text"
                                        placeholder="Lokasi"
                                        value={query}
                                        onChange={handleChange}
                                        className="w-full rounded-full border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:outline-none"
                                    />
                                    {suggestions.length > 0 && (
                                        <ul className="absolute bottom-full z-10 mb-4 w-full rounded-lg border bg-white shadow">
                                            {suggestions.map((s, i) => (
                                                <li
                                                    key={i}
                                                    onClick={() => {
                                                        setQuery(s);
                                                        setSuggestions([]);
                                                    }}
                                                    className="cursor-pointer px-3 py-2 text-sm hover:bg-emerald-50"
                                                >
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <select className="rounded-full border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:outline-none">
                                    <option>Jenis Layanan</option>
                                    <option>Umum</option>
                                    <option>Gigi</option>
                                    <option>Kebidanan & Kandungan</option>
                                    <option>Anak</option>
                                    <option>THT</option>
                                    <option>Mata</option>
                                </select>

                                <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                                    Cari Klinik
                                </button>
                            </div>
                        </div>

                        {/* Spacer */}
                        <div className="hidden md:block" />

                        {/* Right Column */}
                        <div className="flex h-full flex-col items-end justify-between gap-3">
                            {/* Verification */}
                            <div className="flex items-center rounded-full border border-gray-200 bg-white px-3 py-2 shadow-md md:px-4 md:py-3">
                                <div className="flex items-center gap-3">
                                    <div className="min-w-24">
                                        <AvatarCircles
                                            numPeople={12}
                                            avatarUrls={[
                                                { src: dummy1 },
                                                { src: dummy2 },
                                                { src: dummy3 },
                                                { src: dummy4 },
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold md:text-sm">
                                            Klinik Terverifikasi
                                        </p>
                                        <p className="text-[11px] text-gray-600 md:text-xs">
                                            Terdaftar & berizin resmi
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HeroSection;
