import { Link } from '@inertiajs/react';

interface FormEditUsersAdminProps {
    data: {
        name: string;
        email: string;
        current_password: string;
        new_password: string;
        new_password_confirmation: string;
        role: string;
    };
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    availableRoles: string[];
    errors: Record<string, string>;
    isDirty: boolean;
}

const FormEditUsersAdmin: React.FC<FormEditUsersAdminProps> = ({
    data,
    setData,
    handleSubmit,
    processing,
    availableRoles,
    errors,
    isDirty,
}) => {
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="space-y-6 p-6">
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
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name}
                            </p>
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
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Lama */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password Lama
                        </label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            value={data.current_password}
                            onChange={(e) =>
                                setData('current_password', e.target.value)
                            }
                            placeholder="Masukkan password lama"
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                        {errors.current_password && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.current_password}
                            </p>
                        )}
                    </div>

                    {/* Password Baru */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password Baru
                        </label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            value={data.new_password}
                            onChange={(e) =>
                                setData('new_password', e.target.value)
                            }
                            placeholder="Kosongkan jika tidak ingin mengubah"
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                        {errors.new_password && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.new_password}
                            </p>
                        )}
                    </div>

                    {/* Konfirmasi Password Baru */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Konfirmasi Password Baru
                        </label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            value={data.new_password_confirmation}
                            onChange={(e) =>
                                setData(
                                    'new_password_confirmation',
                                    e.target.value,
                                )
                            }
                            placeholder='Konfirmasi password baru'
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                        {errors.new_password_confirmation && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.new_password_confirmation}
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
                                    {role.charAt(0).toUpperCase() +
                                        role.slice(1)}
                                </option>
                            ))}
                        </select>
                        {errors.role && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.role}
                            </p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                        <Link
                            href="/admin/tambah-user"
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing || !isDirty}
                            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormEditUsersAdmin;
