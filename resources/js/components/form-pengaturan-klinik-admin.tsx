import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

interface FormPengaturanKlinikAdminProps {
    data: {
        punya_apoteker: boolean;
        punya_server: boolean;
    };
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    errors?: Record<string, string>;
}

const FormPengaturanKlinikAdmin: React.FC<FormPengaturanKlinikAdminProps> = ({
    data,
    setData,
    handleSubmit,
    processing,
    errors = {},
}) => {
    const [initialData] = useState(data);

    const isChanged =
        data.punya_apoteker !== initialData.punya_apoteker ||
        data.punya_server !== initialData.punya_server;

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isChanged) {
            alert('Data tidak berubah');
            return;
        }
        handleSubmit(e);
    };

    return (
        <form
            onSubmit={onSubmit}
            autoComplete="off"
            className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div className="mb-4 border-b border-gray-100 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    Pengaturan Fitur Klinik
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    Aktifkan atau non-aktifkan fitur Apoteker dan Server sesuai
                    kebutuhan operasional klinik Anda.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Punya Apoteker */}
                <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="apoteker-switch">Punya Apoteker</Label>
                        <Switch
                            id="apoteker-switch"
                            checked={data.punya_apoteker}
                            onCheckedChange={(val) =>
                                setData('punya_apoteker', val)
                            }
                            className="data-[state=checked]:bg-emerald-600"
                        />
                    </div>
                    {errors.punya_apoteker && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors.punya_apoteker}
                        </p>
                    )}
                </div>

                {/* Punya Server */}
                <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="server-switch">Punya Server</Label>
                        <Switch
                            id="server-switch"
                            checked={data.punya_server}
                            onCheckedChange={(val) =>
                                setData('punya_server', val)
                            }
                            className="data-[state=checked]:bg-emerald-600"
                        />
                    </div>
                    {errors.punya_server && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors.punya_server}
                        </p>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-end">
                    <button
                        type="submit"
                        disabled={processing || !isChanged}
                        className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormPengaturanKlinikAdmin;
