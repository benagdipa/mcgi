import ApplicationLogo from '@/Components/ApplicationLogo';
import Header from '@/Components/Header';
import { Link } from '@inertiajs/react';
import React from 'react';
export default function Guest({ children }) {
    return (
        <React.Fragment>
            <Header />
            <div className="page-content">
                <div className="">
                    {children}
                </div>
            </div>
        </React.Fragment>

    );
}
