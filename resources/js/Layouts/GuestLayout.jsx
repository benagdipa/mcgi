import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import React from 'react';
export default function Guest({ user, children }) {
    return (
        <React.Fragment>
            <Header user={user} />
            <div className="page-content">
                {children}
            </div>
            <Footer />
        </React.Fragment>
    );
}