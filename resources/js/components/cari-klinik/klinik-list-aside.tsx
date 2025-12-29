import { Link } from '@inertiajs/react';
import { MapPin, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

type Koordinat = { lat: number; lng: number };

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
    jam_operasional: { hari: string; buka: string; tutup: string }[];
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
        jam: { hari: string; buka: string; tutup: string }[],
    ): {
        hari_awal: string;
        hari_akhir?: string;
        buka: string;
        tutup: string;
    }[] => {
        if (!jam || jam.length === 0) return [];

        const grouped: {
            hari_awal: string;
            hari_akhir?: string;
            buka: string;
            tutup: string;
        }[] = [];

        let current: {
            hari_awal: string;
            hari_akhir?: string;
            buka: string;
            tutup: string;
        } = {
            hari_awal: jam[0].hari,
            hari_akhir: undefined,
            buka: jam[0].buka,
            tutup: jam[0].tutup,
        };

        for (let i = 1; i < jam.length; i++) {
            const j = jam[i];
            if (j.buka === current.buka && j.tutup === current.tutup) {
                current.hari_akhir = j.hari; // sekarang aman
            } else {
                grouped.push(current);
                current = {
                    hari_awal: j.hari,
                    hari_akhir: undefined,
                    buka: j.buka,
                    tutup: j.tutup,
                };
            }
        }
        grouped.push(current);

        return grouped;
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Menampilkan {kliniks.length} klinik
                </p>

                <select className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm">
                    <option>Urutkan: Popularitas</option>
                    <option>Rating Tertinggi</option>
                    <option>Kapasitas Terbanyak</option>
                </select>
            </div>

            {/* Card */}
            {withDistance.map((klinik) => {
                const url = `/klinik/${slug(klinik.nama_klinik)}-${klinik.id}`;

                return (
                    <Link
                        key={klinik.id}
                        href={url}
                        className="group relative flex h-[220px] overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
                    >
                        {/* Image */}
                        <div className="relative w-56 shrink-0">
                            <img
                                src={klinik.gambar ?? '/placeholder-image.jpg'}
                                alt={klinik.nama_klinik}
                                className="h-full w-full object-cover"
                            />

                            {/* Badge Jenis (kiri atas) */}
                            <span className="absolute top-2 left-2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
                                {klinik.jenis_klinik}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col justify-between p-4">
                            <div>
                                <h3 className="line-clamp-1 text-base font-semibold text-gray-900">
                                    {klinik.nama_klinik}
                                </h3>

                                <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {klinik.alamat}, {klinik.kota}
                                </div>

                                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                                    {klinik.deskripsi}
                                </p>

                                {/* Fasilitas */}
                                {klinik.fasilitas?.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {klinik.fasilitas.map((f) => (
                                            <span
                                                key={f.id}
                                                className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700"
                                            >
                                                {f.nama}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Jam Operasional */}
                                {klinik.jam_operasional?.length > 0 && (
                                    <div className="mt-3 text-xs text-gray-600">
                                        {groupJamOperasional(
                                            klinik.jam_operasional,
                                        ).map((j, idx) => (
                                            <div key={idx}>
                                                {j.hari_awal}
                                                {j.hari_akhir &&
                                                    ` - ${j.hari_akhir}`}{' '}
                                                : {j.buka} - {j.tutup}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Rating (kanan atas) */}
                            {klinik.rating !== undefined && (
                                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-sm font-semibold text-gray-800">
                                    <Star className="h-5 w-5 text-yellow-400" />
                                    {klinik.rating.toFixed(1)}
                                </div>
                            )}

                            {/* Footer */}
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Users className="h-4 w-4" />
                                    {klinik.kapasitas_tersedia}/
                                    {klinik.kapasitas_total} slot
                                </div>

                                {klinik.jarak !== undefined && (
                                    <span className="text-xs text-gray-500">
                                        ±{klinik.jarak.toFixed(1)} km
                                    </span>
                                )}

                                <span className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-emerald-700">
                                    Lihat Detail
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default KlinikListAside;
