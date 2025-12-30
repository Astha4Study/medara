import { Link } from '@inertiajs/react';
import {
    BedDouble,
    Building2,
    Globe2,
    Image as ImageIcon,
    Mail,
    MapPin,
    Phone,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import FormCreateJamOperasional from './form-create-jam-operasional';
import MarkerDraggableOn from './mark-leaflet-on';

interface FormCreateKlinikProps {
    data: any;
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    processing: boolean;
    fasilitas?: { id: number; nama: string }[];
}

const FormCreateKlinik: React.FC<FormCreateKlinikProps> = ({
    data,
    setData,
    handleSubmit,
    handleChangeFile,
    processing,
    fasilitas = [],
}) => {
    const [errors, setErrors] = useState<{ no_telepon?: string }>({});
    const [query, setQuery] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [suggestions, setSuggestions] = useState<
        { id: number; nama: string }[]
    >([]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!data.no_telepon.trim()) {
            setErrors({ no_telepon: 'Nomor telepon wajib diisi.' });
            return;
        }
        setErrors({});
        handleSubmit(e);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setSuggestions([]); // kosongkan suggestion
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <form onSubmit={onSubmit} autoComplete="off">
            <div className="flex flex-col gap-6">
                <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    {/* Nama Klinik */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Building2 className="h-4 w-4 text-emerald-600" />
                            Nama Klinik <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.nama_klinik}
                            onChange={(e) =>
                                setData('nama_klinik', e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            placeholder="Contoh: Klinik Amarta"
                        />
                    </div>

                    {/* Jenis Klinik */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Jenis Klinik <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={data.jenis_klinik}
                            onChange={(e) =>
                                setData('jenis_klinik', e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        >
                            <option value="">Pilih Jenis Klinik</option>
                            <option value="Umum">Umum</option>
                            <option value="Gigi">Gigi</option>
                            <option value="Kebidanan & Kandungan">
                                Kebidanan & Kandungan
                            </option>
                            <option value="Anak">Anak</option>
                            <option value="Kulit & Kelamin">
                                Kulit & Kelamin
                            </option>
                            <option value="THT">THT</option>
                            <option value="Mata">Mata</option>
                            <option value="Fisioterapi">Fisioterapi</option>
                        </select>
                    </div>

                    {/* Alamat */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                            <MapPin className="h-4 w-4 text-emerald-600" />
                            Alamat <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            placeholder="Masukkan alamat lengkap"
                        />
                    </div>

                    {/* Kota & Provinsi */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Kota"
                            value={data.kota}
                            onChange={(e) => setData('kota', e.target.value)}
                            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                        <input
                            type="text"
                            placeholder="Provinsi"
                            value={data.provinsi}
                            onChange={(e) =>
                                setData('provinsi', e.target.value)
                            }
                            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>

                    {/* Telepon & Email */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                <Phone className="h-4 w-4 text-emerald-600" />{' '}
                                Telepon <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.no_telepon}
                                onChange={(e) =>
                                    setData('no_telepon', e.target.value)
                                }
                                className={`w-full rounded-lg border ${
                                    errors.no_telepon
                                        ? 'border-red-400'
                                        : 'border-gray-200'
                                } px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`}
                                placeholder="+62"
                            />
                            {errors.no_telepon && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.no_telepon}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                <Mail className="h-4 w-4 text-emerald-600" />{' '}
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="example@mail.com"
                            />
                        </div>
                    </div>

                    {/* Kapasitas */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                <BedDouble className="h-4 w-4 text-emerald-600" />
                                Kapasitas Total{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={data.kapasitas_total}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    setData('kapasitas_total', val);
                                    setData('kapasitas_tersedia', val);
                                }}
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="100"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tempat Tersedia{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={data.kapasitas_tersedia}
                                disabled
                                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500"
                            />
                        </div>
                    </div>

                    {/* Koordinat */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Globe2 className="h-4 w-4 text-emerald-600" />
                            Koordinat Lokasi{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Latitude"
                                value={data.latitude}
                                disabled
                                onChange={(e) =>
                                    setData('latitude', e.target.value)
                                }
                                className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />
                            <input
                                type="text"
                                placeholder="Longitude"
                                value={data.longitude}
                                disabled
                                onChange={(e) =>
                                    setData('longitude', e.target.value)
                                }
                                className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>
                    </div>

                    {/* Peta Lokasi */}
                    <div className="mt-4 h-[300px] w-full overflow-hidden rounded-lg border border-gray-200">
                        <MapContainer
                            center={[
                                Number(data.latitude) || -7.7956,
                                Number(data.longitude) || 110.3695,
                            ]}
                            zoom={13}
                            style={{ height: '100%', width: '100%' }}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MarkerDraggableOn
                                latitude={data.latitude}
                                longitude={data.longitude}
                                setData={setData}
                            />
                        </MapContainer>
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                            Deskripsi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData('deskripsi', e.target.value)
                            }
                            rows={4}
                            placeholder="Tuliskan deskripsi singkat tentang Klinik..."
                            className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                    </div>

                    {/* Fasilitas */}
                    <div className="relative" ref={wrapperRef}>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                            Fasilitas <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                const value = e.target.value;
                                setQuery(value);
                                setSuggestions(
                                    fasilitas.filter((f) =>
                                        f.nama
                                            .toLowerCase()
                                            .includes(value.toLowerCase()),
                                    ),
                                );
                            }}
                            placeholder="Cari fasilitas..."
                            className="w-full rounded-lg border px-3 py-2 text-sm"
                        />

                        {suggestions.length > 0 && (
                            <ul className="absolute z-10 mt-1 w-full rounded-lg border bg-white shadow">
                                {suggestions.map((f) => (
                                    <li
                                        key={f.id}
                                        onClick={() => {
                                            if (
                                                !data.fasilitas.includes(f.id)
                                            ) {
                                                setData('fasilitas', [
                                                    ...data.fasilitas,
                                                    f.id,
                                                ]);
                                            }
                                            setQuery('');
                                            setSuggestions([]);
                                        }}
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                    >
                                        {f.nama}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-3 flex flex-wrap gap-2">
                            {data.fasilitas.map((id: number) => {
                                const f = fasilitas.find((x) => x.id === id);
                                return (
                                    <span
                                        key={id}
                                        className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700"
                                    >
                                        {f?.nama}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData(
                                                    'fasilitas',
                                                    data.fasilitas.filter(
                                                        (fid: number) =>
                                                            fid !== id,
                                                    ),
                                                )
                                            }
                                            className="ml-2 text-emerald-600 hover:text-emerald-800"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Gambar */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                            <ImageIcon className="h-4 w-4 text-emerald-600" />{' '}
                            Gambar
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChangeFile}
                            className="block w-full cursor-pointer rounded-lg border border-gray-200 text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                        />
                    </div>
                </div>
                <div className="space-y-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <FormCreateJamOperasional
                        value={data.jam_operasional}
                        onChange={(val) => setData('jam_operasional', val)}
                    />

                    <div className="mt-4 flex justify-end gap-3 rounded-b-xl border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <Link
                            href="/admin/klinik"
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormCreateKlinik;
