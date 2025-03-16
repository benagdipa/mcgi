import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <div className="forget_password_page min-h-screen flex items-center justify-center">
                <div className="w-full max-w-lg px-4 py-12">
                    <Card className="p-8 shadow-xl border-0">
                        <div className="flex justify-center mb-6">
                            <ApplicationLogo className="w-32 h-auto" />
                        </div>
                        
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Your Password?</h2>
                            <p className="text-gray-600">
                                No problem. Simply enter your email address and we'll send you a password reset link.
                            </p>
                        </div>

                        {status && (
                            <div className="flex items-center gap-3 text-green-600 mb-6 p-4 bg-green-50 rounded-lg border border-green-200" role="alert">
                                <FaCheckCircle className="flex-shrink-0" />
                                <p className="font-medium text-sm">{status}</p>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="email" value="Email Address" className="font-semibold mb-1.5" />
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="pl-10 mt-1 block w-full"
                                        placeholder="Enter your email address"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="flex flex-col space-y-4">
                                <PrimaryButton 
                                    className="w-full justify-center py-2.5 text-base" 
                                    disabled={processing}
                                >
                                    {processing ? 'Sending...' : 'Send Reset Link'}
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
                            <Badge 
                                color="secondary" 
                                variant="light" 
                                className="mb-2"
                            >
                                Need Help?
                            </Badge>
                            <p className="text-sm text-gray-600">
                                If you're having trouble accessing your account, please contact support.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </GuestLayout>
    );
}
