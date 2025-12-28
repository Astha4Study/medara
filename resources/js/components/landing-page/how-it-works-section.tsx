import {
    CalendarCheck,
    ClipboardList,
    Hospital,
    UserCheck,
} from 'lucide-react';
import { useState } from 'react';

const steps = [
    {
        title: 'Cari Klinik Sesuai Kebutuhan',
        description:
            'Temukan klinik berdasarkan lokasi, jenis layanan, dan ketersediaan secara real-time.',
        icon: Hospital,
        color: 'bg-emerald-600',
    },
    {
        title: 'Booking Mudah Tanpa Antre',
        description:
            'Pilih tanggal dan jam kunjungan, lalu lakukan booking langsung melalui sistem Kinara.',
        icon: CalendarCheck,
        color: 'bg-teal-500',
    },
    {
        title: 'Datang Sesuai Jadwal',
        description:
            'Pasien datang sesuai jadwal, klinik sudah menyiapkan antrean dan data layanan.',
        icon: UserCheck,
        color: 'bg-cyan-500',
    },
    {
        title: 'Riwayat & Penilaian Layanan',
        description:
            'Riwayat layanan tersimpan rapi dan pasien dapat memberikan penilaian terhadap klinik.',
        icon: ClipboardList,
        color: 'bg-green-700',
    },
];

const colorHex: Record<string, string> = {
    'bg-emerald-600': '#059669',
    'bg-teal-500': '#14b8a6',
    'bg-cyan-500': '#06b6d4',
    'bg-green-700': '#15803d',
};

const HowItWorksSection = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section className="flex justify-center bg-white px-6 py-14 md:px-12 lg:px-20">
            <div className="mx-auto w-full max-w-7xl">
                {/* Header */}
                <div className="mb-10 text-center">
                    <span className="mb-3 inline-block rounded-full border border-emerald-600 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-700 shadow-sm">
                        Cara Kerja Kinara
                    </span>
                    <h2 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
                        Bagaimana Cara Kerja Kinara?
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-base text-gray-600">
                        Kinara dirancang untuk mempermudah pasien dan klinik
                        melalui alur layanan yang jelas, cepat, dan
                        terintegrasi.
                    </p>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-8 lg:flex-row">
                    {/* Left: Illustration */}
                    <div className="flex flex-1 items-center justify-center">
                        <div className="relative flex h-[420px] w-full items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50">
                            <span className="text-sm text-gray-400">
                                Illustration / App Preview
                            </span>

                            {/* Nanti bisa diganti jadi:
      <img
        src="/images/how-it-works.png"
        alt="How Kinara Works"
        className="h-full w-full rounded-2xl object-cover"
      /> */}
                        </div>
                    </div>

                    {/* Right: Step Navigator */}
                    <div className="grid w-full max-w-[500px] gap-4">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = activeStep === index;

                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`flex items-center gap-4 border-l-2 px-6 py-4 text-left transition-all ${
                                        isActive
                                            ? 'bg-white'
                                            : 'border-l border-gray-200 bg-white hover:border-emerald-300'
                                    }`}
                                    style={{
                                        borderColor: isActive
                                            ? colorHex[step.color]
                                            : undefined,
                                    }}
                                >
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white ${
                                            isActive
                                                ? step.color
                                                : 'bg-gray-300'
                                        }`}
                                    >
                                        <Icon size={18} />
                                    </div>

                                    <div>
                                        <h4
                                            className={`text-sm font-semibold ${
                                                isActive
                                                    ? 'text-gray-900'
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            {step.title}
                                        </h4>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {step.description}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
