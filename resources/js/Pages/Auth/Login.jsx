import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="login-page">
                <div className="w-full">
                    <div className="h-screen flex items-center">
                        <div className="left-section w-2/3 h-screen flex items-center justify-center ">
                            <div className="max-w-screen-lg mx-auto">
                                <h1 className='text-white text-5xl font-bold text-center mb-4'>What's New In MCGI Australia</h1>
                                <div className="content font-dmsans bg-white p-4 rounded-md">
                                    <h3 className='text-[#333] text-xl font-bold tracking-tight mb-3'>Brother Daniel Gifts 300 Small-Scale Livelihood Grants on His 40th Sabbath Anniversary</h3>
                                    <p className='text-gray-500 text-base mb-3'>Brother Daniel Gifts 300 Small-Scale Livelihood Grants on His 40th Sabbath...</p>
                                    <Link href='#' className='font-bold text-[#0077CC]'>Read More</Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className="px-24">
                                <ApplicationLogo/>
                                <div className="title-wrapper mt-8">
                                    <h1 className='font-bold text-3xl'>Welcome back</h1>
                                    <p className='font-dmsans'>Enter your credentials to login</p>
                                </div>
                                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                                <form onSubmit={submit}>
                                    <div className="mt-4">
                                        <InputLabel htmlFor="email" value="Email Address" className='font-semibold text-lg' />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full font-dmsans text-[#333]"
                                            autoComplete="username"
                                            placeHolder="Email Address..."
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="mt-5">
                                        <InputLabel htmlFor="password" value="Password" className='font-semibold text-lg' />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full font-dmsans text-[#333]"
                                            autoComplete="current-password"
                                            placeHolder="Password..."
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="block mt-4">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                            />
                                            <span className="ms-2 text-sm text-gray-600 font-dmsans font-medium">Remember me</span>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between mt-6">
                                        <PrimaryButton className="bg-[#f5cd06] shadow-lg text-[#0f0f0f] font-bold text-lg rounded-lg font-dmsans px-6 py-2" disabled={processing}>Sign In</PrimaryButton>
                                        {canResetPassword && (
                                            <Link href={route('password.request')} className="font-dmsans underline font-semibold">
                                                Forgot your password?
                                            </Link>
                                        )}
                                    </div>
                                    <div className="mt-6 font-dmsans">
                                        <p>Don't have an Account? <Link href={route('register')} className='font-semibold text-[#0077CC]'>Register</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
