import { MapPin, Star, Users } from 'lucide-react';

const dummyKliniks = [
    {
        id: 1,
        nama_klinik: 'Klinik Tambah Layanan',
        jenis_klinik: 'Gigi',
        alamat: 'Purbalingga, Jawa Tengah',
        deskripsi: 'Klinik dokter gigi dengan layanan lengkap dan modern.',
        rating: 4.5,
        kapasitas_tersedia: 200,
        gambar: 'https://via.placeholder.com/300x200',
    },
    {
        id: 2,
        nama_klinik: 'Klinik Lengkap',
        jenis_klinik: 'Umum',
        alamat: 'Purwokerto, Jawa Tengah',
        deskripsi: 'Pelayanan medis umum dengan tenaga profesional.',
        rating: 4.2,
        kapasitas_tersedia: 97,
        gambar: 'https://via.placeholder.com/300x200',
    },
    {
        id: 3,
        nama_klinik: 'Klinik Pratama Ginanjar',
        jenis_klinik: 'Umum',
        alamat: 'Jakarta Barat, DKI Jakarta',
        deskripsi: 'Klinik pratama dengan layanan rawat jalan.',
        rating: 4.0,
        kapasitas_tersedia: 15,
        gambar: 'https://via.placeholder.com/300x200',
    },
];

const KlinikListAside = () => {
    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Menampilkan {dummyKliniks.length} klinik
                </p>

                <select className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none">
                    <option>Urutkan: Popularitas</option>
                    <option>Rating Tertinggi</option>
                    <option>Kapasitas Terbanyak</option>
                </select>
            </div>

            {/* Card Klinik */}
            {dummyKliniks.map((klinik) => (
                <div
                    key={klinik.id}
                    className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md md:flex-row"
                >
                    {/* Image */}
                    <img
                        src={klinik.gambar}
                        alt={klinik.nama_klinik}
                        className="h-48 w-full object-cover md:h-auto md:w-56"
                    />

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">
                                {klinik.nama_klinik}
                            </h3>

                            <p className="mt-1 text-sm text-emerald-600">
                                {klinik.jenis_klinik}
                            </p>

                            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                <MapPin className="h-3.5 w-3.5" />
                                {klinik.alamat}
                            </div>

                            <p className="mt-2 text-sm text-gray-600">
                                {klinik.deskripsi}
                            </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            {/* Rating */}
                            <div className="flex items-center gap-1 text-sm">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <span className="font-medium">
                                    {klinik.rating}
                                </span>
                            </div>

                            {/* Kapasitas */}
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Users className="h-4 w-4" />
                                {klinik.kapasitas_tersedia} slot tersedia
                            </div>

                            {/* CTA */}
                            <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                                Lihat Detail
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KlinikListAside;
