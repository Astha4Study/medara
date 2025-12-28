import { CalendarX, Database, Globe, PhoneOff } from 'lucide-react';

const problems = [
    {
        title: 'Pasien Mengeluh Karena Harus Menunggu Lama',
        desc: 'Jadwal manual sering bentrok, antrian mengular, dan reputasi klinik turun.',
        icon: CalendarX,
    },
    {
        title: 'Klinik Sepi Padahal Lokasi Strategis',
        desc: 'Calon pasien mencari treatment di Google, tapi klinik Anda tidak muncul di halaman pertama.',
        icon: Globe,
    },
    {
        title: 'Riwayat Treatment Pasien Sering Hilang',
        desc: 'Data tercecer di buku, Excel, atau WhatsApp, membuat rekomendasi treatment jadi tidak akurat.',
        icon: Database,
    },
    {
        title: 'Staf Kebingungan Mengelola Reservasi',
        desc: 'Telepon berdering terus, chat menumpuk, dan banyak pasien tidak datang tanpa konfirmasi.',
        icon: PhoneOff,
    },
];

const ProblemExperienceSection = () => {
    return (
        <section className="bg-white px-6 py-14 md:px-12 lg:px-20">
            <div className="mb-10 text-center">
                <span className="mb-3 inline-block rounded-full border border-emerald-600 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-700 shadow-sm">
                    Masalah Yang Sering Dialami
                </span>
                <h2 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
                    Masalah Umum yang Sering Dialami Klinik
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-base text-gray-600">
                    Antrian panjang, jadwal berantakan, data pasien hilang, dan
                    sulit menarik pasien baru — masalah sehari-hari ini
                    menghambat pelayanan dan pertumbuhan klinik Anda. Kami punya
                    solusi untuk mengatasinya.
                </p>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {problems.map(({ title, desc, icon: Icon }, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                            <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mb-2 text-sm font-semibold text-gray-900">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProblemExperienceSection;
