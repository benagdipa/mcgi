import Header from "@/Components/Header";
import React from "react";
import { Link } from "@inertiajs/react";

export default function Authenticated({ user, header, children }) {

    return (
        <React.Fragment>
            <Header user={user} />
            <div className="bottom-header shadow-sm">
                <div className="w-full max-w-screen-2xl mx-auto">
                    <ul className='flex gap-6 py-3'>
                        <li className='font-semibold text-lg font-dmsans'>
                            <Link href={'#'}>Content Management</Link>
                        </li>
                        <li className='font-semibold text-lg font-dmsans'>
                            <Link href={'#'}>Event Management</Link>
                        </li>
                        <li className='font-semibold text-lg font-dmsans'>
                            <Link href={route('profile.edit')}>Profile</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <main>{children}</main>
        </React.Fragment>
    );
}
