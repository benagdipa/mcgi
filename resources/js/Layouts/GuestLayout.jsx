import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';
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
            <Footer />
        </React.Fragment>

    );
}
