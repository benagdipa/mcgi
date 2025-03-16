import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

export default function Login({email, status, canResetPassword }) {
    const queryParameters = new URLSearchParams(window.location.search);
    const event_message = queryParameters.get("event_message");
    const [showPassword, setShowPassword] = useState(false);
  
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        event: event_message ? true : false
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
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="login-page py-0">
                <div className="w-full">
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="left-section hidden lg:w-2/3 w-full h-screen lg:flex items-center justify-center bg-gradient-to-r from-primary to-primary/80 relative overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                <div className="absolute w-96 h-96 rounded-full bg-white top-[-20%] left-[-10%]"></div>
                                <div className="absolute w-96 h-96 rounded-full bg-white bottom-[-20%] right-[-10%]"></div>
                            </div>
                            
                            <div className="max-w-screen-lg mx-auto lg:px-6 relative z-10">
                                <div className="space-y-6">
                                    <Badge 
                                        color="warning" 
                                        variant="solid" 
                                        size="lg" 
                                        className="mb-2 animate-fade-in-right"
                                    >
                                        Latest News
                                    </Badge>
                                    <h1 className='text-white md:text-5xl text-4xl font-bold text-left mb-6 animate-fade-in-right'>
                                        What's New In MCGI Australia
                                    </h1>
                                    <Card className="animate-fade-in-up hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur">
                                        <div className="content p-6">
                                            <h3 className='text-gray-800 text-xl font-bold tracking-tight mb-3'>
                                                Brother Daniel Gifts 300 Small-Scale Livelihood Grants on His 40th Sabbath Anniversary
                                            </h3>
                                            <p className='text-gray-600 text-base mb-4'>
                                                Brother Daniel Gifts 300 Small-Scale Livelihood Grants on His 40th Sabbath...
                                            </p>
                                            <Link 
                                                href='#' 
                                                className='inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors group'
                                            >
                                                Read More
                                                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </Card>
                                    <div className="flex justify-end mt-4">
                                        <div className="flex space-x-2">
                                            <button className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/70 transition-colors"></button>
                                            <button className="w-3 h-3 rounded-full bg-white/70 hover:bg-white/90 transition-colors"></button>
                                            <button className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/70 transition-colors"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 w-11/12 md:w-10/12">
                            <Card className="p-8 md:p-10 shadow-xl border-0">
                                {event_message && (
                                    <div className="flex items-center gap-3 text-red-600 mb-6 p-4 bg-red-50 rounded-lg border border-red-200" role="alert">
                                        <FaExclamationCircle className="flex-shrink-0" />
                                        <p className="capitalize font-medium text-sm">{event_message}</p>
                                    </div>
                                )}
                                <div className="flex justify-center">
                                    <ApplicationLogo className="w-32 h-auto" />
                                </div>
                                <div className="title-wrapper text-center mt-8">
                                    <h1 className='font-bold text-3xl text-gray-800 mb-2'>Welcome back</h1>
                                    <p className='text-gray-600'>Enter your credentials to login</p>
                                </div>
                                {status && (
                                    <div className="flex items-center gap-3 text-green-600 mb-6 p-4 bg-green-50 rounded-lg border border-green-200 mt-4" role="alert">
                                        <FaCheckCircle className="flex-shrink-0" />
                                        <p className="font-medium text-sm">{status}</p>
                                    </div>
                                )}
                                <form onSubmit={submit} className="mt-8 space-y-6">
                                    <div>
                                        <InputLabel htmlFor="email" value="Email Address" className='font-semibold mb-1.5' required={true} />
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="pl-10 mt-1 block w-full"
                                                autoComplete="username"
                                                placeholder="yourname@example.com"
                                                isFocused={true}
                                                hasError={!!errors.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                        </div>
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <InputLabel htmlFor="password" value="Password" className='font-semibold' required={true} />
                                            {canResetPassword && (
                                                <Link href={route('password.request')} className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                                                    Forgot password?
                                                </Link>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <TextInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={data.password}
                                                className="pl-10 pr-12 mt-1 block w-full"
                                                autoComplete="current-password"
                                                placeholder="Enter your password"
                                                hasError={!!errors.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                                            <button 
                                                type="button" 
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                                                onClick={togglePasswordVisibility}
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="flex items-center">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                            />
                                            <span className="ms-2 text-sm text-gray-600 font-medium">Remember me</span>
                                        </label>
                                    </div>

                                    <div>
                                        <PrimaryButton className="w-full justify-center py-2.5 text-base" disabled={processing}>
                                            Sign In
                                        </PrimaryButton>
                                    </div>
                                    
                                    <div className="text-center text-gray-600">
                                        <p>Don't have an Account? <Link href={route('register')} className='font-semibold text-primary hover:text-primary/80 transition-colors'>Register</Link></p>
                                    </div>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
