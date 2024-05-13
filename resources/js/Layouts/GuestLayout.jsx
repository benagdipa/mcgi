import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import React, { useEffect, useState } from 'react';
export default function Guest({ user, children }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <React.Fragment>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <img src='../images/loading-effect.gif' alt='Loading........' className='spinner text-center' />
                </div>
            ) : (<>
                <Header user={user} />
                <div className="page-content">
                    {children}
                </div>
                <Footer />
            </>)}
        </React.Fragment>
    );
}
