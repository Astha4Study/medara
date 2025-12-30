import KlinikTab from '@/components/klinik-tab';
import KlinikLayout from '@/layouts/klinik-layout';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, BedDouble, MapPin, Star } from 'lucide-react';
import { route } from 'ziggy-js';

type Klinik = {
    id: number;
    slug: string;
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
    jam_operasional: {
        hari: string;
        jam_buka: string;
        jam_tutup: string;
        tutup?: boolean;
    }[];
};

export default function KlinikShowPage() {
    const { klinik } = usePage<{ klinik: Klinik }>().props;

    return (
        <KlinikLayout>
            <section className="w-full bg-gray-50 px-6 pt-4 pb-14">
                <div className="mx-auto w-full max-w-7xl space-y-4">
                    <div className="relative overflow-hidden rounded-2xl border">
                        <img
                            src={klinik.gambar ?? '/placeholder-image.jpg'}
                            alt={klinik.nama_klinik}
                            className="h-[380px] w-full object-cover"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-transparent" />

                        {/* Back Button */}
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-white/25 hover:ring-white/30"
                        >
                            <ArrowLeft className="h-5 w-5 opacity-90" />
                            <span className="hidden sm:inline">Kembali</span>
                        </button>

                        {/* Rating */}
                        {klinik.rating !== undefined && (
                            <div className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-white/25 hover:ring-white/30">
                                <Star className="h-5 w-5 text-yellow-400 opacity-90" />
                                <span>{klinik.rating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                        <div className="md:col-span-2">
                            {/* Header */}
                            <div className="flex items-center justify-between space-y-2">
                                {/* Nama Klinik */}
                                <h1 className="text-3xl leading-tight font-bold text-gray-900">
                                    {klinik.nama_klinik}
                                </h1>
                                {/* Jenis Klinik */}
                                {klinik.jenis_klinik && (
                                    <span className="inline-block rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm">
                                        {klinik.jenis_klinik}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                                {/* Alamat */}
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                                    <span className="leading-relaxed">
                                        {klinik.alamat}, {klinik.kota}
                                        {klinik.provinsi &&
                                            `, ${klinik.provinsi}`}
                                    </span>
                                </div>

                                {/* Divider */}
                                <span className="hidden h-4 w-px bg-gray-300 md:block" />

                                {/* Ketersediaan Rawat Inap */}
                                <div className="flex items-center gap-2 text-gray-700">
                                    <BedDouble className="h-4 w-4 text-emerald-600" />

                                    <span>
                                        <span className="font-semibold text-gray-900">
                                            {klinik.kapasitas_tersedia}
                                        </span>{' '}
                                        dari {klinik.kapasitas_total} tempat
                                        tidur tersedia
                                    </span>

                                    {klinik.kapasitas_tersedia <= 5 &&
                                        klinik.kapasitas_tersedia > 0 && (
                                            <span className="ml-2 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600">
                                                Hampir penuh
                                            </span>
                                        )}

                                    {klinik.kapasitas_tersedia === 0 && (
                                        <span className="ml-2 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                                            Penuh
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="mt-12">
                                <KlinikTab
                                    deskripsi={klinik.deskripsi}
                                    rating={klinik.rating}
                                />
                            </div>
                        </div>

                        {/* RIGHT / ASIDE */}
                        <aside className="h-fit rounded-2xl border bg-white shadow-sm">
                            <div className="space-y-6 p-6">
                                {/* Fasilitas */}
                                {klinik.fasilitas?.length > 0 && (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                                            Fasilitas
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {klinik.fasilitas.map((f) => (
                                                <span
                                                    key={f.id}
                                                    className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700"
                                                >
                                                    {f.nama}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Divider */}
                                <div className="border-t border-gray-100" />

                                {/* Jam Operasional */}
                                {klinik.jam_operasional?.length > 0 && (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                                            Jam Operasional
                                        </h3>

                                        <div className="space-y-2 text-sm text-gray-600">
                                            {klinik.jam_operasional.map(
                                                (j, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <span>{j.hari}</span>
                                                        <span
                                                            className={`font-medium ${
                                                                j.tutup
                                                                    ? 'text-red-500'
                                                                    : 'text-gray-700'
                                                            }`}
                                                        >
                                                            {j.tutup
                                                                ? 'Tutup'
                                                                : `${j.jam_buka} - ${j.jam_tutup}`}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* CTA AREA */}
                            <div className="rounded-b-2xl border-t bg-gray-50 p-2">
                                <Link
                                    href={route(
                                        'daftar-online.create',
                                        klinik.slug,
                                    )}
                                    className="inline-flex w-full justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                >
                                    Daftar Online
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </KlinikLayout>
    );
}
