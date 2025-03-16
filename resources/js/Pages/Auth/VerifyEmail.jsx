import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import { FaEnvelope, FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-lg">
                    <Card className="p-8 shadow-xl border-0">
                        <div className="text-center mb-6">
                            <div className="inline-flex p-4 bg-primary/10 text-primary rounded-full mb-4">
                                <FaEnvelope className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Email Verification Required</h2>
                            <p className="mt-2 text-gray-600">
                                Thanks for signing up! Please verify your email address to complete your registration.
                            </p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                            <p className="text-gray-700 leading-relaxed">
                                We've sent a verification link to your email address. Please click on the link to verify your account.
                                <br /><br />
                                If you didn't receive the email, click the button below and we'll send you another one.
                            </p>
                        </div>

                        {status === 'verification-link-sent' && (
                            <div className="flex items-center gap-3 text-green-600 mb-6 p-4 bg-green-50 rounded-lg border border-green-200" role="alert">
                                <FaCheckCircle className="flex-shrink-0" />
                                <p className="font-medium">
                                    A new verification link has been sent to your email address.
                                </p>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                                <PrimaryButton 
                                    disabled={processing} 
                                    className="w-full sm:w-auto justify-center py-2.5 text-base"
                                >
                                    {processing ? 'Sending...' : 'Resend Verification Email'}
                                </PrimaryButton>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
                                >
                                    <FaSignOutAlt className="mr-2" />
                                    Log Out
                                </Link>
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
                                If you're having trouble with email verification, please contact our support team.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </GuestLayout>
    );
}
