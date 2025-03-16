import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaKey } from 'react-icons/fa';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function ResetPassword({ token, email }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />
            
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-lg">
                    <Card className="p-8 shadow-xl border-0">
                        <div className="flex justify-center mb-6">
                            <ApplicationLogo className="w-32 h-auto" />
                        </div>
                        
                        <div className="text-center mb-8">
                            <div className="inline-flex p-4 bg-primary/10 text-primary rounded-full mb-4">
                                <FaKey className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Reset Your Password</h2>
                            <p className="mt-2 text-gray-600">
                                Create a new secure password for your account.
                            </p>
                        </div>
                        
                        <Badge 
                            color="primary" 
                            variant="soft" 
                            className="w-full mb-6 justify-center py-2"
                        >
                            Password Reset Form
                        </Badge>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="email" value="Email" className="font-semibold mb-1.5" />
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="pl-10 mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="New Password" className="font-semibold mb-1.5" />
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <TextInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        className="pl-10 pr-12 mt-1 block w-full"
                                        autoComplete="new-password"
                                        isFocused={true}
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

                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="font-semibold mb-1.5" />
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <TextInput
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="pl-10 pr-12 mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <button 
                                        type="button" 
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                                        onClick={toggleConfirmPasswordVisibility}
                                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                    </button>
                                </div>
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="flex flex-col space-y-4">
                                <PrimaryButton 
                                    className="w-full justify-center py-2.5 text-base" 
                                    disabled={processing}
                                >
                                    {processing ? 'Resetting...' : 'Reset Password'}
                                </PrimaryButton>
                                
                                <div className="text-center">
                                    <Link 
                                        href={route('login')} 
                                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                                    >
                                        <FaArrowLeft className="mr-2 text-sm" />
                                        Back to Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                            <p className="text-sm text-gray-600">
                                For your security, please create a strong password that you don't use elsewhere.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </GuestLayout>
    );
}
