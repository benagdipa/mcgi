import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import { Head, useForm } from '@inertiajs/react';
import { FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />
            
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <Card className="p-8 shadow-xl border-0">
                        <div className="text-center mb-6">
                            <div className="inline-flex p-4 bg-primary/10 text-primary rounded-full mb-4">
                                <FaShieldAlt className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Secure Area</h2>
                            <p className="mt-2 text-gray-600">
                                Please confirm your password before continuing to access this secure area of the application.
                            </p>
                        </div>

                        <Badge 
                            color="primary" 
                            variant="soft" 
                            className="w-full mb-6 justify-center py-2"
                        >
                            Password Confirmation Required
                        </Badge>

                        <form onSubmit={submit} className="mt-4 space-y-6">
                            <div>
                                <InputLabel htmlFor="password" value="Password" className="font-semibold mb-1.5" />
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <TextInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        className="pl-10 pr-12 mt-1 block w-full"
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
                                <PrimaryButton className="w-full justify-center py-2.5 text-base" disabled={processing}>
                                    Confirm Password
                                </PrimaryButton>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </GuestLayout>
    );
}
