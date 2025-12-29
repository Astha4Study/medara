import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

type FilterProps = {
    filters: {
        jenis_klinik: { jenis_klinik: string; count: number }[];
        fasilitas: { id: number; nama: string; klinik_count: number }[];
    };
};

const FilterKlinikAside: React.FC<FilterProps> = ({ filters }) => {
    const [openSection, setOpenSection] = useState<string[]>([
        'nama-klinik',
        'jenis-klinik',
        'fasilitas',
    ]);

    const toggleSection = (section: string) => {
        setOpenSection((prev) =>
            prev.includes(section)
                ? prev.filter((s) => s !== section)
                : [...prev, section],
        );
    };

    return (
        <aside className="sticky top-20 w-full max-w-xs rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Filter Klinik
            </h3>

            {/* Nama Klinik */}
            <div className="mb-5">
                <button
                    onClick={() => toggleSection('nama-klinik')}
                    className="mb-2 flex w-full items-center justify-between text-sm font-medium text-gray-800"
                >
                    Nama Klinik
                    <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${
                            openSection.includes('nama-klinik')
                                ? 'rotate-180'
                                : ''
                        }`}
                    />
                </button>

                {openSection.includes('nama-klinik') && (
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari nama klinik"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-9 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none"
                        />
                        <Search className="absolute top-2.5 right-3 h-4 w-4 text-gray-400" />
                    </div>
                )}
            </div>

            {/* Jenis Klinik */}
            <div className="mb-5">
                <button
                    onClick={() => toggleSection('jenis-klinik')}
                    className="mb-2 flex w-full items-center justify-between text-sm font-medium text-gray-800"
                >
                    Jenis Klinik
                    <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${
                            openSection.includes('jenis-klinik')
                                ? 'rotate-180'
                                : ''
                        }`}
                    />
                </button>

                {openSection.includes('jenis-klinik') && (
                    <div className="space-y-2 text-sm text-gray-700">
                        {filters.jenis_klinik.map((item) => (
                            <label
                                key={item.jenis_klinik}
                                className="flex items-center justify-between"
                            >
                                <span className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="accent-emerald-600"
                                    />
                                    {item.jenis_klinik}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {item.count}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Fasilitas */}
            <div>
                <button
                    onClick={() => toggleSection('fasilitas')}
                    className="mb-2 flex w-full items-center justify-between text-sm font-medium text-gray-800"
                >
                    Fasilitas
                    <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${
                            openSection.includes('fasilitas')
                                ? 'rotate-180'
                                : ''
                        }`}
                    />
                </button>

                {openSection.includes('fasilitas') && (
                    <div className="space-y-2 text-sm text-gray-700">
                        {filters.fasilitas.map((f) => (
                            <label
                                key={f.id}
                                className="flex items-center justify-between"
                            >
                                <span className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="accent-emerald-600"
                                    />
                                    {f.nama}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {f.klinik_count}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
};

export default FilterKlinikAside;
