import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import AuthCarousel from '@/components/auth-carousel';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
    return (
        <>
            <Head title="Daftar" />

            <main className="flex min-h-screen bg-[#F9FAFB]">
                <section className="max-w-8xl mx-auto flex w-full flex-row">
                    {/* Right */}
                    <AuthCarousel />

                    {/* Left Panel – Register Form */}
                    <div className="flex flex-1 p-5">
                        <div className="flex flex-1 flex-col rounded-xl bg-white">
                            <div className="flex flex-1 items-center justify-center px-6 py-10">
                                <div className="w-full max-w-md space-y-6">
                                    {/* Heading */}
                                    <div className="space-y-2 text-center">
                                        <h1 className="text-3xl font-bold text-gray-900">
                                            Daftar Akun Baru
                                        </h1>
                                        <p className="text-sm text-gray-500">
                                            Buat akun untuk menemukan klinik
                                            terdekat dan melakukan reservasi
                                            layanan kesehatan dengan mudah.
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <Form
                                        {...RegisteredUserController.store.form()}
                                        resetOnSuccess={[
                                            'password',
                                            'password_confirmation',
                                        ]}
                                        disableWhileProcessing
                                        className="space-y-4"
                                    >
                                        {({ processing, errors }) => (
                                            <>
                                                <div className="space-y-1">
                                                    <Label>Nama Lengkap</Label>
                                                    <Input
                                                        name="name"
                                                        placeholder="Masukkan nama lengkap Anda"
                                                        className="h-11 rounded-xl"
                                                        autoFocus
                                                    />

                                                    <InputError
                                                        message={errors.name}
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label>Email</Label>
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Masukkan email aktif"
                                                        className="h-11 rounded-xl"
                                                    />

                                                    <InputError
                                                        message={errors.email}
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label>Password</Label>
                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        placeholder="Buat kata sandi"
                                                        className="h-11 rounded-xl"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.password
                                                        }
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <Label>
                                                        Konfirmasi Password
                                                    </Label>
                                                    <Input
                                                        type="password"
                                                        name="password_confirmation"
                                                        placeholder="Ulangi kata sandi"
                                                        className="h-11 rounded-xl"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.password_confirmation
                                                        }
                                                    />
                                                </div>

                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="mt-4 h-10 w-full rounded-full bg-emerald-600 text-base font-semibold hover:bg-emerald-700"
                                                >
                                                    {processing && (
                                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                    )}
                                                    Daftar Sekarang
                                                </Button>
                                            </>
                                        )}
                                    </Form>

                                    {/* Footer */}
                                    <p className="text-center text-sm text-gray-500">
                                        Sudah punya akun?{' '}
                                        <TextLink
                                            href={login()}
                                            className="font-medium text-emerald-600 underline-offset-4 hover:underline"
                                        >
                                            Login
                                        </TextLink>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
