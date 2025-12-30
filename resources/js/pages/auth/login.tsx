import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import AuthCarousel from '@/components/auth-carousel';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <>
            <Head title="Masuk" />

            <main className="flex min-h-screen bg-[#F9FAFB]">
                <section className="max-w-8xl mx-auto flex w-full flex-row">
                    {/* Right Panel */}
                    <AuthCarousel />

                    {/* Left Panel */}
                    <div className="flex flex-1 p-5">
                        <div className="flex flex-1 flex-col rounded-xl bg-white">
                            <div className="flex flex-1 items-center justify-center">
                                <div className="w-full max-w-md space-y-6">
                                    {/* Header */}
                                    <div className="space-y-2 text-center">
                                        <h1 className="text-3xl font-bold text-gray-900">
                                            Selamat Datang Kembali!
                                        </h1>
                                        <p className="text-sm text-gray-500">
                                            Masuk untuk mengelola layanan klinik
                                            dan aktivitas kesehatan Anda.
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <Form
                                        {...AuthenticatedSessionController.store.form()}
                                        resetOnSuccess={['password']}
                                        className="space-y-4"
                                    >
                                        {({ processing, errors }) => (
                                            <>
                                                <div className="space-y-1">
                                                    <Label>Email</Label>
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        autoFocus
                                                        autoComplete="email"
                                                        placeholder="Masukkan email terdaftar"
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
                                                        required
                                                        autoComplete="current-password"
                                                        placeholder="Masukkan kata sandi"
                                                        className="h-11 rounded-xl"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.password
                                                        }
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Checkbox name="remember" />
                                                        <span className="text-gray-600">
                                                            Ingat saya
                                                        </span>
                                                    </div>

                                                    {canResetPassword && (
                                                        <TextLink
                                                            href={request()}
                                                            className="font-medium text-emerald-600 underline-offset-4 hover:underline"
                                                        >
                                                            Lupa kata sandi?
                                                        </TextLink>
                                                    )}
                                                </div>

                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="h-10 w-full rounded-full bg-emerald-600 text-base font-semibold hover:bg-emerald-700"
                                                >
                                                    {processing && (
                                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                    )}
                                                    Login
                                                </Button>
                                            </>
                                        )}
                                    </Form>

                                    {/* Footer */}
                                    <div className="text-center text-sm text-gray-500">
                                        Belum memiliki akun Kinara?{' '}
                                        <TextLink
                                            href={register()}
                                            className="font-medium text-emerald-600 underline-offset-4 hover:underline"
                                        >
                                            Daftar sekarang
                                        </TextLink>
                                    </div>

                                    {status && (
                                        <div className="text-center text-sm font-medium text-green-600">
                                            {status}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
