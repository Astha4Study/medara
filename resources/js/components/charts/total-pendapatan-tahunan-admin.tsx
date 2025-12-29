import { PiggyBank } from 'lucide-react'; // <- ikon kosong (bisa diganti)
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

type Props = {
    pendapatanTahunan: { bulan: string; total: number }[];
    emptyIcon?: React.ComponentType<{ className?: string }>;
    emptyTitle?: string;
    emptyDesc?: string;
};

const COLORS = [
    '#059669',
    '#14B8A6',
    '#F59E0B',
    '#0EA5E9',
    '#F43F5E',
    '#8B5CF6',
    '#22C55E',
    '#EAB308',
    '#3B82F6',
    '#EC4899',
    '#6366F1',
    '#D946EF',
];

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const { bulan, total } = payload[0].payload;
    return (
        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-sm">
            <p className="mb-1 font-medium text-gray-700">{bulan}</p>
            <p className="text-emerald-600">
                Pendapatan: <strong>Rp {total.toLocaleString('id-ID')}</strong>
            </p>
        </div>
    );
};

const TotalPendapatanTahunanAdmin = ({
    pendapatanTahunan,
    emptyIcon: EmptyIcon = PiggyBank,
    emptyTitle = 'Belum ada data pendapatan',
    emptyDesc = 'Tidak ada transaksi yang tercatat saat ini',
}: Props) => {
    if (!pendapatanTahunan || pendapatanTahunan.length === 0) {
        return (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                <EmptyIcon className="h-10 w-10 text-emerald-600/60 sm:h-12 sm:w-12" />
                <div>
                    <p className="text-xs font-medium text-gray-700 sm:text-sm">
                        {emptyTitle}
                    </p>
                    <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                        {emptyDesc}
                    </p>
                </div>
            </div>
        );
    }

    const lastSixMonths = pendapatanTahunan.slice(-6);

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={lastSixMonths}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                        dataKey="bulan"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `Rp ${v.toLocaleString('id-ID')}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="total">
                        {lastSixMonths.map((entry, idx) => (
                            <Cell
                                key={`cell-${idx}`}
                                fill={COLORS[idx % COLORS.length]}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalPendapatanTahunanAdmin;
