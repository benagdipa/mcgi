import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="main-content w-full">
                <div className="w-ful px-6 py-4 font-poppins">
                     <h1 className="font-semibold text-gray-800 text-3xl">Dashboard</h1>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
