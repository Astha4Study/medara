import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Koordinat = { lat: number; lng: number };

type Klinik = {
    id: number;
    nama_klinik: string;
    jenis_klinik: string;
    gambar: string;
    kota: string;
    latitude: number;
    longitude: number;
};

type Props = { kliniks: Klinik[] };

function haversine(a: Koordinat, b: Koordinat): number {
    const R = 6371;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);

    const x =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

const slug = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '');

const NearLocationSection = ({ kliniks }: Props) => {
    const [display, setDisplay] = useState<(Klinik & { jarak?: number })[]>(
        kliniks.slice(0, 3),
    );

    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const user: Koordinat = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };
                const nearest = kliniks
                    .map((k) => ({
                        ...k,
                        jarak: haversine(user, {
                            lat: k.latitude,
                            lng: k.longitude,
                        }),
                    }))
                    .sort((a, b) => a.jarak - b.jarak)
                    .slice(0, 3);
                setDisplay(nearest);
            },
            () => {
                /* silent fail */
            },
            { enableHighAccuracy: true, timeout: 8000 },
        );
    }, [kliniks]);

    return (
        <section className="px-6 py-14 md:px-12 lg:px-20">
            <div className="mx-auto w-full max-w-7xl">
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <span className="mb-3 inline-block rounded-full border border-emerald-600 bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-emerald-700 shadow-sm">
                        Berdasarkan Lokasi Anda
                    </span>

                    <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
                        Klinik Terdekat dari Lokasi Anda
                    </h2>

                    <p className="mt-4 text-base text-gray-600">
                        Daftar klinik yang berada paling dekat dengan lokasi
                        Anda, lengkap dengan informasi rating, jenis layanan,
                        dan fasilitas untuk membantu Anda memilih dengan cepat
                        dan tepat.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {display.map((k) => {
                        const url = `/klinik/${slug(k.nama_klinik)}-${k.id}`;
                        return (
                            <Link key={k.id} href={url} className="group block">
                                <div className="relative overflow-hidden rounded-md">
                                    <img
                                        src={k.gambar}
                                        alt={k.nama_klinik}
                                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-base font-semibold text-gray-900">
                                        {k.nama_klinik}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {k.jenis_klinik} • {k.kota}
                                        {k.jarak !== undefined &&
                                            ` • ±${k.jarak.toFixed(1)} km`}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/klinik"
                        className="rounded-md bg-yellow-400 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-yellow-500"
                    >
                        Lihat Semua Klinik
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NearLocationSection;
