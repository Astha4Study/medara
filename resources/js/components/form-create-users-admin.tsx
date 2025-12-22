import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface FormCreateUsersAdminProps {
    data: any;
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    availableRoles: string[];
}

const FormCreateUsersAdmin: React.FC<FormCreateUsersAdminProps> = ({
    data,
    setData,
    handleSubmit,
    processing,
    availableRoles,
}) => {
    const [errors, setErrors] = useState<any>({});

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        handleSubmit(e);
    };

    return (
        <form
            onSubmit={onSubmit}
            autoComplete="off"
            className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            {/* Nama */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="Masukkan nama lengkap"
                />
                {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="example@mail.com"
                />
                {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password <span className="text-red-500">*</span>
                </label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Kosongkan jika default"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.password}
                    </p>
                )}
            </div>

            {/* Role */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Role <span className="text-red-500">*</span>
                </label>
                <select
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                    {availableRoles.map((role) => (
                        <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                    ))}
                </select>
                {errors.role && (
                    <p className="mt-1 text-xs text-red-500">{errors.role}</p>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
                <Link
                    href="/admin/tambah-user"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </button>
            </div>
        </form>
    );
};

export default FormCreateUsersAdmin;
