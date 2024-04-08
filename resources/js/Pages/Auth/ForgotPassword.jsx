import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

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
            <div className="forget_password_page ">
                <div className="h-screen flex flex-col lg:flex-row justify-center items-center">
                    <div className="left-screen mt-24  lg:w-2/5 w-11/12">
                        <div className="lg:mx-24">
                        <ApplicationLogo className="mx-auto"/>
                            <div className="mb-4 text-base font-semibold pt-16">
                                Forgot your password? No problem.Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                            </div>

                            {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

                            <form onSubmit={submit}>
                                <TextInput
                                    id="email"
                                    type="email"
                                    placeholder="Enter your Email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4 inline-flex items-center border border-transparen transition ease-in-out duration-150 false bg-[#f5cd06] shadow-lg text-[#0f0f0f] font-bold text-lg rounded-lg font-dmsans px-6 py-2" disabled={processing}>
                                        Reset
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="right-section w-3/5 lg:block hidden h-screen"></div>
                </div>
            </div>
        </GuestLayout>
    );
}
