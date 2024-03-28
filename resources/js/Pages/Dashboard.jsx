import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="main-content w-full">
                <div className="w-ful">
                    <div className="py-2"></div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
