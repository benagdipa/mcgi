import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import WOW from 'react-wow';
import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import { FaFileContract, FaShieldAlt, FaLink, FaCopyright, FaUserShield, FaGavel } from 'react-icons/fa';

export default function TermsandCondition({ auth }) {
    return (
        <GuestLayout user={auth?.user}>
            <Head>
                <title>Terms and Conditions</title>
                <meta name="title" content="Terms and Conditions"/>
                <meta name="keywords" content="Terms of service, MCGI terms, legal agreement, website usage"/>
                <meta name="description" content="Read and understand the Terms and Conditions governing your use of the MCGI website. This document outlines our policies regarding content usage, intellectual property, linking, and more."/>
            </Head>
            <div className="terms-condition-page">
                <div className="page-header pt-[70px] md:pt-80 pb-28 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-0"></div>
                    <WOW animation='slideLeftToRight'>
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto relative z-10">
                            <Badge 
                                color="warning" 
                                variant="solid" 
                                size="lg" 
                                className="mb-4"
                            >
                                Legal
                            </Badge>
                            <h1 className='font-bold text-5xl md:text-7xl text-white mb-4'>Terms and Conditions</h1>
                            <div className="breadcrumbs pt-4">
                                <div className="flex gap-4 font-semibold text-white items-center">
                                    <div className="item">
                                        <Link 
                                            href={route('home')} 
                                            className="breadcrumb-link hover:text-secondary transition-colors"
                                        >
                                            HOME
                                        </Link>
                                    </div>
                                    <div className="divider text-gray-200">/</div>
                                    <div className="item">
                                        <Link 
                                            href={route('terms-and-condition')} 
                                            className="breadcrumb-link text-gray-200"
                                        >
                                            Terms and Conditions
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </WOW>
                </div>
                
                <div className="page-content py-20 md:py-32">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <WOW animation='fadeIn'>
                            <Card className="border-none shadow-lg p-6 md:p-10 mb-10">
                                <div className="flex items-center mb-8 gap-4">
                                    <div className="icon-container">
                                        <div className="bg-primary/10 p-4 rounded-full">
                                            <FaFileContract className="text-primary text-3xl" />
                                        </div>
                                    </div>
                                    <div className="text-container">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">TERMS OF USE</h2>
                                        <p className="text-gray-600 mt-1">
                                            Last updated: February 22, 2023
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    Welcome to MCGI.ORG. By accessing or using this site, you agree to be bound by all the terms and conditions of these Terms of Use between you and MCGI.ORG, which govern your use of the content and service in this site. If you do not agree to the terms of this agreement, please exit this site.
                                </p>
                            </Card>
                        </WOW>
                        
                        <div className="terms-sections space-y-8">
                            <WOW animation='fadeIn' delay="0.1s">
                                <Card className="border-none shadow-md p-6 md:p-8">
                                    <div className="section-header flex items-center gap-3 mb-4">
                                        <div className="icon-box bg-secondary/10 p-3 rounded-full">
                                            <FaCopyright className="text-secondary text-xl" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Trademarks, Copyrights and Restrictions</h3>
                                    </div>
                                    
                                    <div className="section-content text-gray-700 space-y-4">
                                        <p className="leading-relaxed">
                                            All material, including, but not limited to the texts, articles, newsletters, icons, images, illustrations, audio clips and video clips, (as the "Content"), and any Service feature, functionality, database, or application (the "Service"), is protected by copyright, trademarks, and other intellectual property rights that is owned or controlled by the Members Church of God International (the "MCGI") or this website (the "Site"). You agree to be bound by all additional copyright notices, information, or restrictions contained in any Content accessed through the Site.
                                        </p>
                                        
                                        <p className="leading-relaxed">
                                            The Content is protected by copyright pursuant to international copyright laws. You may not modify, publish, transmit, participate in the transfer of, reproduce, create new works from, distribute, perform, display, or in any way exploit, any of the Content or any of the Service, in whole or in part.
                                        </p>
                                        
                                        <p className="leading-relaxed">
                                            The Content may be copied only for your personal, noncommercial use provided that you maintain all copyright and other notices contained therein. If you want to copy or store the Content or Service for other than personal use, you must be granted the permission by this Site or the copyright holder identified in the copyright notice contained herein to use the Content after your prior written request to use Content from this Site. Without such approval, copying or storing any of the Content or of the Service for other than personal use is expressly prohibited. You are not allowed, without the express approval of MCGI, to distribute or otherwise publish any material containing any solicitation of funds, advertising or solicitation for goods or services.
                                        </p>
                                    </div>
                                </Card>
                            </WOW>
                            
                            <WOW animation='fadeIn' delay="0.2s">
                                <Card className="border-none shadow-md p-6 md:p-8">
                                    <div className="section-header flex items-center gap-3 mb-4">
                                        <div className="icon-box bg-primary/10 p-3 rounded-full">
                                            <FaLink className="text-primary text-xl" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Linking</h3>
                                    </div>
                                    
                                    <div className="section-content text-gray-700">
                                        <p className="leading-relaxed">
                                            This Site may contain links or references operated by others. This Site does not own or control or maintain these third-party Web sites, hence, we should not be held responsible for their content or the privacy practices of these parties. Although we made the best and good faith effort to link only to appropriate sites, some of these third-party links or references may not wholly contain information that are complete or appropriate for your use. MCGI shall have no liability for any damages or injuries of any kind arising from such content or information. The use or inclusion of any third-party links does not imply the endorsement or recommendation by MCGI of these materials.
                                        </p>
                                    </div>
                                </Card>
                            </WOW>
                            
                            <WOW animation='fadeIn' delay="0.3s">
                                <Card className="border-none shadow-md p-6 md:p-8">
                                    <div className="section-header flex items-center gap-3 mb-4">
                                        <div className="icon-box bg-success/10 p-3 rounded-full">
                                            <FaShieldAlt className="text-success text-xl" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Representations and Warranties</h3>
                                    </div>
                                    
                                    <div className="section-content text-gray-700 space-y-4">
                                        <p className="leading-relaxed">
                                            You hereby indemnify, defend and hold harmless MCGI and this Site (the "Indemnified Parties") from and against any and all liability and costs, including, without limitation, reasonable attorneys' fees, incurred by the Indemnified Parties in connection with any claim arising out of warranties and covenant.
                                        </p>
                                        
                                        <p className="leading-relaxed">
                                            You agree to fully cooperate as reasonably required in the defense of any such claims. MCGI reserves the right, at its own expense, to assume the exclusive defense and control of any matter subject to indemnification by you.
                                        </p>
                                    </div>
                                </Card>
                            </WOW>
                            
                            <WOW animation='fadeIn' delay="0.4s">
                                <Card className="border-none shadow-md p-6 md:p-8">
                                    <div className="section-header flex items-center gap-3 mb-4">
                                        <div className="icon-box bg-warning/10 p-3 rounded-full">
                                            <FaUserShield className="text-warning text-xl" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Privacy</h3>
                                    </div>
                                    
                                    <div className="section-content text-gray-700">
                                        <p className="leading-relaxed">
                                            This Site respects your privacy in your use of the site. Please refer to the MCGI Privacy Policy, which discloses the privacy practices with respect to information that you may disclose or may otherwise be collected on this Site.
                                        </p>
                                    </div>
                                </Card>
                            </WOW>
                            
                            <WOW animation='fadeIn' delay="0.5s">
                                <Card className="border-none shadow-md p-6 md:p-8">
                                    <div className="section-header flex items-center gap-3 mb-4">
                                        <div className="icon-box bg-danger/10 p-3 rounded-full">
                                            <FaShieldAlt className="text-danger text-xl" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Disclaimers</h3>
                                    </div>
                                    
                                    <div className="section-content text-gray-700 space-y-4">
                                        <p className="leading-relaxed">
                                            THIS SITE AND THE INFORMATION AND MATERIALS HEREIN ARE PROVIDED TO YOU "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, QUALITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. APPLICABLE LAW MAY NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU.
                                        </p>
                                        
                                        <p className="leading-relaxed">
                                            THE INFORMATION CONTAINED HEREIN MAY CONTAIN TYPOGRAPHICAL ERRORS AND INACCURACIES. THIS SITE MAKES NO REPRESENTATIONS OR WARRANTIES WHATSOEVER REGARDING THE SUITABILITY, FUNCTIONALITY, AVAILABILITY OR OPERATION OF THIS SITE. THIS SITE MAY BE TEMPORARILY UNAVAILABLE DUE TO MAINTENANCE OR MALFUNCTION OF COMPUTER EQUIPMENT. MCGI DOES NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS IN THE SITE WILL BE CORRECTED, OR THAT THE SITE OR THE SERVERS THAT MAKE THE WEBSITE AVAILABLE ARE FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS.
                                        </p>
                                    </div>
                                </Card>
                            </WOW>
                            
                            <WOW animation='fadeIn' delay="0.6s">
                                <Card className="border-none shadow-md p-6 md:p-8">
                                    <div className="section-header flex items-center gap-3 mb-4">
                                        <div className="icon-box bg-info/10 p-3 rounded-full">
                                            <FaShieldAlt className="text-info text-xl" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Changes to These Terms</h3>
                                    </div>
                                    
                                    <div className="section-content text-gray-700 space-y-4">
                                        <p className="leading-relaxed">
                                            This Site may change, add or remove portions of these Terms of Agreement at any time, which shall become effective immediately upon posting. Before each use of the Site, it is your responsibility to review these Terms of Agreement, and by continuing to use this Site, you agree to any changes.
                                        </p>
                                        
                                        <p className="leading-relaxed">
                                            You agree to report any copyright violations of the Terms of Agreement to this Site as soon as you become aware of them. In the event you have a claim of copyright infringement with respect to the material that is contained in this Site, please notify <a href="mailto:intellectualproperty@mcgi.org" className="text-primary hover:underline">intellectualproperty@mcgi.org</a>.
                                        </p>
                                    </div>
                                </Card>
                            </WOW>
                            
                            <WOW animation='fadeIn' delay="0.7s">
                                <Card className="border-none shadow-md p-6 md:p-8">
                                    <div className="section-header flex items-center gap-3 mb-4">
                                        <div className="icon-box bg-secondary/10 p-3 rounded-full">
                                            <FaGavel className="text-secondary text-xl" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Jurisdiction and Applicable Laws</h3>
                                    </div>
                                    
                                    <div className="section-content text-gray-700">
                                        <p className="leading-relaxed">
                                            These Terms of Agreement have been made in and shall be construed and enforced in accordance with laws under Philippine jurisdiction. Any action to enforce these Terms of Service shall be brought in the courts located in the Philippines.
                                        </p>
                                    </div>
                                </Card>
                            </WOW>
                            
                            <WOW animation='fadeIn' delay="0.8s">
                                <Card className="border-none shadow-md p-6 md:p-8">
                                    <div className="section-header flex items-center gap-3 mb-4">
                                        <div className="icon-box bg-primary/10 p-3 rounded-full">
                                            <FaShieldAlt className="text-primary text-xl" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Miscellaneous</h3>
                                    </div>
                                    
                                    <div className="section-content text-gray-700">
                                        <p className="leading-relaxed">
                                            If any provision of this Terms of Use Agreement is held to be unlawful, void or unforceable, the remaining provisions of the agreement will remain in place.
                                        </p>
                                    </div>
                                </Card>
                            </WOW>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
