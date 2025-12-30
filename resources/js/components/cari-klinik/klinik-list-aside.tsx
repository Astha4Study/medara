import { Link } from '@inertiajs/react';
import { Clock, MapPin, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

type Koordinat = { lat: number; lng: number };

type JamOperasional = {
    hari: string;
    jam_buka: string | null;
    jam_tutup: string | null;
    tutup: number;
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

const KlinikListAside = ({ kliniks }: Props) => {
    const [withDistance, setWithDistance] =
        useState<(Klinik & { jarak?: number })[]>(kliniks);

    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const user = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };
                setWithDistance(
                    kliniks.map((k) => ({
                        ...k,
                        jarak: haversine(user, {
                            lat: k.latitude,
                            lng: k.longitude,
                        }),
                    })),
                );
            },
            () => {},
            { enableHighAccuracy: true, timeout: 8000 },
        );
    }, [kliniks]);

    const groupJamOperasional = (
        jam: {
            hari: string;
            jam_buka: string | null;
            jam_tutup: string | null;
            tutup: number;
        }[],
    ) => {
        if (!jam || jam.length === 0) return [];

        const hariList = [
            'Senin',
            'Selasa',
            'Rabu',
            'Kamis',
            'Jumat',
            'Sabtu',
            'Minggu',
        ];

        const bukaOnly = jam
            .filter(
                (j) =>
                    j.tutup === 0 &&
                    j.jam_buka !== null &&
                    j.jam_tutup !== null,
            )
            .sort(
                (a, b) => hariList.indexOf(a.hari) - hariList.indexOf(b.hari),
            );

        const grouped: any[] = [];
        let current: any = null;

        for (const j of bukaOnly) {
            if (
                current &&
                current.jam_buka === j.jam_buka &&
                current.jam_tutup === j.jam_tutup &&
                hariList.indexOf(j.hari) ===
                    hariList.indexOf(current.hari_akhir ?? current.hari_awal) +
                        1
            ) {
                current.hari_akhir = j.hari;
            } else {
                if (current) grouped.push(current);
                current = {
                    hari_awal: j.hari,
                    hari_akhir: undefined,
                    jam_buka: j.jam_buka,
                    jam_tutup: j.jam_tutup,
                };
            }
        }

        if (current) grouped.push(current);
        return grouped;
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Menampilkan {kliniks.length} klinik
                </p>

                <select className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <option>Urutkan: Popularitas</option>
                    <option>Rating Tertinggi</option>
                    <option>Kapasitas Terbanyak</option>
                </select>
            </div>

            {/* Card */}
            {withDistance.map((klinik) => {
                const url = `/klinik/${slug(klinik.nama_klinik)}-${klinik.id}`;

                return (
                    <div
                        key={klinik.id}
                        className="group relative flex overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
                    >
                        {/* Image */}
                        <div className="relative h-48 w-60 shrink-0">
                            <img
                                src={klinik.gambar ?? '/placeholder-image.jpg'}
                                alt={klinik.nama_klinik}
                                className="h-full w-full object-cover"
                            />

                            {/* Rating */}
                            {klinik.rating !== undefined && (
                                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-white/90 px-2 py-1 text-sm font-semibold text-gray-900 shadow">
                                    <Star className="h-4 w-4 text-yellow-400" />
                                    {klinik.rating.toFixed(1)}
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col justify-between p-4">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="line-clamp-1 text-xl font-semibold text-gray-900">
                                        {klinik.nama_klinik}
                                    </h3>

                                    {/* Jenis Klinik */}
                                    <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
                                        {klinik.jenis_klinik}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {klinik.alamat}, {klinik.kota}
                                        {klinik.jarak !== undefined && (
                                            <span className="ml-1 text-emerald-600">
                                                • ±{klinik.jarak.toFixed(1)} km
                                            </span>
                                        )}
                                    </div>

                                    {/* Hari Operasional */}
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

                                        const hariBuka = klinik.jam_operasional
                                            ?.filter((j) => j.tutup === 0)
                                            .map((j) => j.hari)
                                            .sort(
                                                (a, b) =>
                                                    hariList.indexOf(a) -
                                                    hariList.indexOf(b),
                                            );

                                        if (!hariBuka || hariBuka.length === 0)
                                            return null;

                                        return (
                                            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                                <Clock className="h-3.5 w-3.5" />
                                                {hariBuka[0]}
                                                {hariBuka[0] !==
                                                    hariBuka[
                                                        hariBuka.length - 1
                                                    ] &&
                                                    ` - ${
                                                        hariBuka[
                                                            hariBuka.length - 1
                                                        ]
                                                    }`}
                                            </div>
                                        );
                                    })()}
                                    {/* Tempat tidur */}
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Users className="h-4 w-4" />
                                        {klinik.kapasitas_tersedia}/
                                        {klinik.kapasitas_total} tempat tidur
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 flex items-center justify-between">
                                {/* Fasilitas */}
                                {klinik.fasilitas?.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {klinik.fasilitas
                                            .slice(0, 3)
                                            .map((f) => (
                                                <span
                                                    key={f.id}
                                                    className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-700"
                                                >
                                                    {f.nama}
                                                </span>
                                            ))}
                                        {klinik.fasilitas.length > 3 && (
                                            <span className="text-xs text-gray-500">
                                                +{klinik.fasilitas.length - 3}{' '}
                                                lainnya
                                            </span>
                                        )}
                                    </div>
                                )}

                                <Link
                                    href={url}
                                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                >
                                    Lihat Detail
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default KlinikListAside;
