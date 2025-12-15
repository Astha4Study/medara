import { useEffect, useState } from 'react';

export default function ClockIndicator() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const tick = () => {
            const now = new Date();

            // Ambil waktu lokal WIB langsung dengan Intl.DateTimeFormat
            const options = {
                timeZone: 'Asia/Jakarta', // WIB
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            } as const;
            const formattedTime = new Intl.DateTimeFormat(
                'id-ID',
                options,
            ).format(now);

            // Nama hari
            const days = [
                'Minggu',
                'Senin',
                'Selasa',
                'Rabu',
                'Kamis',
                'Jumat',
                'Sabtu',
            ];
            const dayName =
                days[
                    now.toLocaleDateString('id-ID', {
                        weekday: 'long',
                        timeZone: 'Asia/Jakarta',
                    }) === 'Minggu'
                        ? 0
                        : now.getDay()
                ];

            setTime(`${dayName}, ${formattedTime} WIB`);
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="rounded-md border border-border px-2 py-1 text-base font-normal text-foreground tabular-nums">
            {time}
        </div>
    );
}
