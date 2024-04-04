import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        local: '',
        privacy: true
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="register-page">
                <div className="w-full">
                    <div className="h-screen flex items-center">
                        <div className="left-screen w-2/5">
                            <div className="px-24">
                                <ApplicationLogo className="mx-auto"/>
                                <div className="title-wrapper mt-12">
                                    <h1 className='font-bold text-3xl'>Create an Account</h1>
                                    <p className='font-dmsans'>Enter your credentials to create new account</p>
                                </div>
                                <form onSubmit={submit}>
                                    <div className="mt-4 flex gap-6">
                                        <div className="item w-full">
                                            <InputLabel htmlFor="first_name" value="First Name" className='font-semibold text-lg' />
                                            <TextInput
                                                id="first_name"
                                                name="first_name"
                                                value={data.first_name}
                                                className="mt-1 block w-full font-dmsans"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) => setData('first_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.first_name} className="mt-2" />
                                        </div>
                                        <div className="item w-full">
                                            <InputLabel htmlFor="last_name" value="Last Name" className='font-semibold text-lg' />
                                            <TextInput
                                                id="last_name"
                                                name="last_name"
                                                value={data.last_name}
                                                className="mt-1 block w-full font-dmsans"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) => setData('last_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.last_name} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-6">
                                        <div className="item w-full">
                                            <InputLabel htmlFor="email" value="Email Address" className='font-semibold text-lg' />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 block w-full font-dmsans"
                                                autoComplete="username"
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.email} className="mt-2" />
                                        </div>
                                        <div className="item w-full">
                                            <InputLabel htmlFor="phone" value="Phone Number" className='font-semibold text-lg' />
                                            <TextInput
                                                id="phone"
                                                type="text"
                                                name="phone"
                                                value={data.phone}
                                                className="mt-1 block w-full font-dmsans"
                                                autoComplete="username"
                                                onChange={(e) => setData('phone', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.phone} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-6">
                                        <div className="item w-full">
                                            <InputLabel htmlFor="password" value="Password" className='font-semibold text-lg' />
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full font-dmsans"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.password} className="mt-2" />
                                        </div>
                                        <div className="item w-full">
                                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className='font-semibold text-lg' />
                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="mt-1 block w-full font-dmsans"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="local" value="Confirm Password" className='font-semibold text-lg' />
                                        <select
                                            name="local"
                                            id="local"
                                            className='border-gray-300 focus:border-yellow-500 focus:ring-0 rounded-md shadow-sm w-full font-dmsans'
                                            value={data.local}
                                            isFocused={true}
                                            onChange={(e) => setData('local', e.target.value)}
                                            required
                                        >
                                            <option value="">Select Local</option>
                                            <option value="1">Melbourme</option>
                                        </select>
                                        <InputError message={errors.local} className="mt-2" />
                                    </div>
                                    <div className="mt-6">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="privacy"
                                                checked={data.privacy}
                                                onChange={(e) => setData('privacy', e.target.checked)}
                                            />
                                            <span className="ms-2 text-[#333] font-semibold text-lg"><Link href='#'>Privacy Policy</Link></span>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <PrimaryButton className="bg-[#f5cd06] shadow-lg text-[#0f0f0f] font-bold text-lg rounded-lg font-dmsans px-6 py-2" disabled={processing}>
                                            Register
                                        </PrimaryButton>
                                        <Link href={route('login')} className="font-dmsans underline">
                                            Already registered?
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="right-section w-3/5 h-screen"></div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
