import { Activity } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type Props = {
    data: {
        name: string;
        value: number;
        color: string; // warna dikirim dari backend, wajib
    }[];
    emptyIcon?: React.ComponentType<{ className?: string }>; // opsional
    emptyTitle?: string;
    emptyDesc?: string;
};

const CustomTooltip = ({
    active,
    payload,
}: {
    active?: boolean;
    payload?: any[];
}) => {
    if (!active || !payload?.length) return null;

    const { name, value } = payload[0].payload;

    return (
        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-sm">
            <p className="mb-1 font-medium text-gray-700">{name}</p>
            <p className="text-gray-600">
                Total: <strong className="text-emerald-600">{value}</strong>
            </p>
        </div>
    );
};

const StatusLayananPieChartAdmin = ({
    data,
    emptyIcon: EmptyIcon = Activity, // default ikon
    emptyTitle = 'Belum ada data layanan',
    emptyDesc = 'Tidak ada layanan yang ditampilkan saat ini',
}: Props) => {
    if (!data || data.length === 0) {
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

    return (
        <div className="h-48 w-full">
            {/* Legend custom di atas */}
            <div className="mb-3 flex flex-wrap gap-4 text-xs">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-600">{item.name}</span>
                    </div>
                ))}
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        stroke="#fff"
                        strokeWidth={1}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatusLayananPieChartAdmin;
