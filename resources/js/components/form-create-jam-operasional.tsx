import { toast } from 'sonner';

export interface JamHarian {
    hari: string;
    jam_buka: string | null;
    jam_tutup: string | null;
    tutup: boolean;
}

export type JamOperasional = JamHarian[];

export interface FormCreateJamOperasionalProps {
    value: JamOperasional;
    onChange: (value: JamOperasional) => void;
}

const FormCreateJamOperasional: React.FC<FormCreateJamOperasionalProps> = ({
    value,
    onChange,
}) => {
    const openDaysCount = value.filter((jam) => !jam.tutup).length;
    const allDaysClosed = openDaysCount === 0;

    const handleTutupChange = (index: number, checked: boolean) => {
        if (!value[index].tutup && checked && openDaysCount === 1) {
            toast.error('Minimal 1 hari harus buka', {
                description: 'Pastikan minimal 1 hari tidak dicentang tutup',
            });
            return;
        }

        const newValue = [...value];
        newValue[index] = {
            ...newValue[index],
            tutup: checked,
            jam_buka: checked ? null : newValue[index].jam_buka,
            jam_tutup: checked ? null : newValue[index].jam_tutup,
        };
        onChange(newValue);
    };

    return (
        <div className="p-6">
            <div className="mb-4 flex items-center gap-2">
                <label className="block text-sm font-semibold text-gray-800">
                    Jam Operasional <span className="text-red-500">*</span>
                </label>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                    Wajib
                </span>
                {allDaysClosed && (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">
                        Minimal 1 hari harus buka
                    </span>
                )}
            </div>

            <div className="space-y-3">
                {value.map((jam, index) => {
                    const isTutup = jam.tutup;
                    const isLastOpenDay = !isTutup && openDaysCount === 1;

                    return (
                        <div
                            key={jam.hari}
                            className={`rounded-xl border p-4 ${
                                isTutup ? 'bg-gray-50' : 'bg-white'
                            } ${isLastOpenDay ? 'border-emerald-200' : ''}`}
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                {/* Hari */}
                                <div className="w-full md:w-32">
                                    <p className="text-sm font-semibold text-gray-800">
                                        {jam.hari}
                                    </p>
                                    {isLastOpenDay && (
                                        <p className="mt-1 text-xs text-emerald-600">
                                            Hari ini harus buka
                                        </p>
                                    )}
                                </div>

                                {/* Jam */}
                                <div className="flex flex-1 gap-3">
                                    <div className="flex w-full flex-col">
                                        <label
                                            className={`mb-1 text-xs ${isTutup ? 'text-gray-400' : 'text-gray-500'}`}
                                        >
                                            Jam Buka {isTutup && '(Tutup)'}
                                            {!isTutup && (
                                                <span className="ml-1 text-red-500">
                                                    *
                                                </span>
                                            )}
                                        </label>
                                        <input
                                            type="time"
                                            disabled={isTutup}
                                            value={jam.jam_buka || ''}
                                            onChange={(e) => {
                                                const newValue = [...value];
                                                newValue[index] = {
                                                    ...newValue[index],
                                                    jam_buka: e.target.value,
                                                };
                                                onChange(newValue);
                                            }}
                                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:bg-gray-100"
                                            required={!isTutup}
                                        />
                                    </div>

                                    <div className="flex w-full flex-col">
                                        <label
                                            className={`mb-1 text-xs ${isTutup ? 'text-gray-400' : 'text-gray-500'}`}
                                        >
                                            Jam Tutup {isTutup && '(Tutup)'}
                                            {!isTutup && (
                                                <span className="ml-1 text-red-500">
                                                    *
                                                </span>
                                            )}
                                        </label>
                                        <input
                                            type="time"
                                            disabled={isTutup}
                                            value={jam.jam_tutup || ''}
                                            onChange={(e) => {
                                                const newValue = [...value];
                                                newValue[index] = {
                                                    ...newValue[index],
                                                    jam_tutup: e.target.value,
                                                };
                                                onChange(newValue);
                                            }}
                                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:bg-gray-100"
                                            required={!isTutup}
                                        />
                                    </div>
                                </div>

                                {/* Tutup */}
                                <div className="flex items-center gap-2 md:w-24">
                                    <input
                                        type="checkbox"
                                        checked={isTutup}
                                        onChange={(e) =>
                                            handleTutupChange(
                                                index,
                                                e.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 text-emerald-600"
                                        disabled={isLastOpenDay}
                                    />
                                    <span
                                        className={`text-sm ${isLastOpenDay ? 'text-gray-400' : 'text-gray-700'}`}
                                    >
                                        Tutup
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FormCreateJamOperasional;
