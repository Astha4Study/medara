import SidebarProfile from '@/components/sidebar-profile';
import KlinikLayout from '@/layouts/klinik-layout';
import { useForm, usePage } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
import { route } from 'ziggy-js';

type User = {
    name: string;
    email: string;
    role?: string;
    city?: string | null;
    avatar?: string | null;
};

export default function ProfileEditPage() {
    const { user } = usePage<{ user: User }>().props;

    const { data, setData, post, processing, errors } = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
        avatar: null as File | null,
        _method: 'PUT',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('profile.update'), {
            forceFormData: true,
        });
    };

    return (
        <KlinikLayout>
            <div className="flex justify-center px-6 py-10">
                <div className="w-full max-w-7xl">
                    <h1 className="mb-6 text-2xl font-semibold text-gray-900">
                        Pengaturan Profil
                    </h1>

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[260px_1fr]">
                        {/* SIDEBAR */}
                        <SidebarProfile />

                        {/* MAIN */}
                        <main className="space-y-3">
                            {/* HEADER CARD */}
                            <div className="rounded-xl border bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            user.avatar
                                                ? `/storage/${user.avatar}`
                                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                      user.name,
                                                  )}&size=256&background=E5E7EB&color=111827&bold=true`
                                        }
                                        alt={user.name}
                                        className="h-16 w-16 rounded-full object-cover ring-1 ring-gray-200"
                                    />

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {user.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {user.role ?? 'User'}
                                        </p>
                                        {user.city && (
                                            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {user.city}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* FORM CARD */}
                            <form
                                onSubmit={submit}
                                className="rounded-xl border bg-white p-6 shadow-sm"
                            >
                                <h3 className="mb-4 text-base font-semibold text-gray-900">
                                    Edit Personal Information
                                </h3>

                                <div className="space-y-5">
                                    {/* Avatar */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Avatar
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setData(
                                                    'avatar',
                                                    e.target.files?.[0] ?? null,
                                                )
                                            }
                                            className="block w-full cursor-pointer rounded-lg border border-gray-200 text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                        />
                                        {errors.avatar && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.avatar}
                                            </p>
                                        )}
                                    </div>

                                    {/* Nama */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* ACTION */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
                                        >
                                            Simpan Perubahan
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </KlinikLayout>
    );
}
