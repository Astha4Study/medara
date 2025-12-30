import { Link } from '@inertiajs/react';
import { ArrowRight, Bed, Clock, MapPin, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

type Koordinat = { lat: number; lng: number };

type JamOperasional = {
    hari: string; // contoh: "Senin"
    jam_buka: string | null; // contoh: "08:00"
    jam_tutup: string | null; // contoh: "16:00"
    tutup: number; // 0 = buka, 1 = tutup
};

type Klinik = {
    id: number;
    nama_klinik: string;
    jenis_klinik: string;
    alamat: string;
    kota: string;
    provinsi?: string;
    deskripsi: string;
    latitude: number;
    longitude: number;
    rating?: number;
    gambar: string;
    kapasitas_total: number;
    kapasitas_tersedia: number;
    fasilitas: { id: number; nama: string }[];
    jam_operasional: JamOperasional[];
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

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {display.map((k) => {
                        const url = `/klinik/${slug(k.nama_klinik)}-${k.id}`;
                        const rating = k.rating ?? 4.6;

                        return (
                            <Link
                                key={k.id}
                                href={url}
                                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
                            >
                                {/* IMAGE */}
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={k.gambar}
                                        alt={k.nama_klinik}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />

                                    {/* Rating badge di kanan atas */}
                                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-white/90 px-2 py-1 text-sm font-semibold text-gray-900 shadow">
                                        <Star className="h-3.5 w-3.5 text-yellow-500" />
                                        {rating}
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="space-y-3 p-5">
                                    {/* Header */}
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="line-clamp-1 text-xl font-semibold text-gray-900">
                                            {k.nama_klinik}
                                        </h3>

                                        <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
                                            {k.jenis_klinik}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {/* Alamat */}
                                        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {k.alamat}, {k.kota}
                                            {k.jarak !== undefined && (
                                                <span className="ml-1 text-emerald-600">
                                                    • ±{k.jarak.toFixed(1)} km
                                                </span>
                                            )}
                                        </div>

                                        {/* Jam Operasional */}
                                        {(() => {
                                            const hariList = [
                                                'Senin',
                                                'Selasa',
                                                'Rabu',
                                                'Kamis',
                                                'Jumat',
                                                'Sabtu',
                                                'Minggu',
                                            ];

                                            const hariBuka = k.jam_operasional
                                                ?.filter((j) => j.tutup === 0)
                                                .map((j) => j.hari)
                                                .sort(
                                                    (a, b) =>
                                                        hariList.indexOf(a) -
                                                        hariList.indexOf(b),
                                                );

                                            if (
                                                !hariBuka ||
                                                hariBuka.length === 0
                                            )
                                                return null;

                                            return (
                                                <p className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                                                    {hariBuka[0]}
                                                    {hariBuka[0] !==
                                                        hariBuka[
                                                            hariBuka.length - 1
                                                        ] &&
                                                        ` - ${hariBuka[hariBuka.length - 1]}`}
                                                </p>
                                            );
                                        })()}

                                        {/* Kapasitas */}
                                        <div className="flex items-center gap-1 text-xs text-gray-600">
                                            <Bed className="h-4 w-4 text-gray-500" />
                                            {k.kapasitas_tersedia}/
                                            {k.kapasitas_total} tempat tidur
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="pt-2 mt-auto">
                                        <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 transition group-hover:gap-2">
                                            Lihat Detail
                                            <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/cari-klinik"
                        className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                        Lihat Semua Klinik
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NearLocationSection;
