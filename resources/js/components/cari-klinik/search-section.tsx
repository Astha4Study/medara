import { MapPin, Search, Stethoscope } from 'lucide-react';

const SearchSection = () => {
    return (
        <section className="relative bg-linear-to-tl from-emerald-600 via-emerald-500 to-emerald-700">
            <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12 lg:px-20">
                <div className="rounded-xl border border-gray-200 bg-white shadow-lg">
                    <div className="flex flex-col gap-3 p-3 md:flex-row md:items-center md:gap-0">
                        {/* Lokasi */}
                        <div className="flex flex-1 items-center gap-2 px-3">
                            <MapPin className="h-5 w-5 text-emerald-600" />
                            <input
                                type="text"
                                placeholder="Lokasi atau nama klinik"
                                className="w-full border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                            />
                        </div>

                        <div className="hidden h-8 w-px bg-gray-200 md:block" />

                        {/* Jenis Klinik */}
                        <div className="flex flex-1 items-center gap-2 px-3">
                            <Stethoscope className="h-5 w-5 text-emerald-600" />
                            <select className="w-full border-none bg-transparent text-sm text-gray-700 focus:outline-none">
                                <option value="">Semua Jenis Klinik</option>
                                <option>Umum</option>
                                <option>Gigi</option>
                                <option>Kebidanan & Kandungan</option>
                                <option>Anak</option>
                                <option>THT</option>
                                <option>Mata</option>
                            </select>
                        </div>

                        <div className="hidden h-8 w-px bg-gray-200 md:block" />

                        {/* Button */}
                        <div className="px-3">
                            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 md:w-auto">
                                <Search className="h-4 w-4" />
                                Cari
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchSection;
