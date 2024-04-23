import React from 'react'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react'
export default function TermsandCondition({ auth }) {
    return (
        <GuestLayout user={auth?.user}>
            <Head>
                <title>Terms Condition</title>
                <meta name="title" content="terms condtions"/>
                <meta name="keywords" content="Terms of service"/>
                <meta name="descriptions" content="terms and condtions"/>
            </Head>
            <div className="terms-condition-page">
                <div className="page-header pt-[70px] md:pt-80 pb-28 ">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <h1 className='font-bold lg:text-7xl text-6xl text-white'>Terms and Condition</h1>
                        <div className="breadcrumbs pt-5">
                            <div className="flex gap-4 font-semibold uppercase font-dmsans text-white">
                                <div className="item"><Link href={route('home')} className="breadcrumb-link">HOME</Link></div>
                                <div className="divider"> | </div>
                                <div className="item"><Link href={route('terms-and-condition')} className="breadcrumb-link text-gray-200">Terms and Condition</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-content py-20 md:py-32">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <h3 className='text-center text-3xl font-semibold pb-14'>TERMS OF USE</h3>
                        <p className='text-base font-medium pb-2'>General Rules and Definitions</p>

                        <p className='text-base font-medium	 pb-2'>WELCOME TO MCGI.ORG. BY ACCESSING OR USING THIS SITE, YOU AGREE TO BE BOUND BY ALL THE TERMS AND CONDITIONS OF THESE TERMS OF USE BETWEEN YOU AND MCGI.ORG, WHICH GOVERN YOUR USE OF THE CONTENT AND SERVICE IN THIS SITE. IF YOU DO NOT AGREE TO THE TERMS OF THIS AGREEMENT, PLEASE EXIT THIS SITE.</p>

                        <p className='text-base font-medium	 pb-2'>Trademarks, Copyrights and Restrictions</p>

                        <p className='text-base font-medium	 pb-2'>All material, including, but not limited to the texts, articles, newsletters, icons, images, illustrations, audio clips and video clips, (as the “Content”), and any Service feature, functionality, database, or application (the “Service”), is protected by copyright, trademarks, and other intellectual property rights that is owned or controlled by the Members Church of God International (the “MCGI”) or this website (the “Site”). You agree to be bound by all additional copyright notices, information, or restrictions contained in any Content accessed through the Site.</p>

                        <p className='text-base font-medium	 pb-2'>The Content is protected by copyright pursuant to international copyright laws. You may not modify, publish, transmit, participate in the transfer of, reproduce, create new works from, distribute, perform, display, or in any way exploit, any of the Content or any of the Service, in whole or in part.</p>

                        <p className='text-base font-medium pb-2'>The Content may be copied only for your personal, noncommercial use provided that you maintain all copyright and other notices contained therein. If you want to copy or store the Content or Service for other than personal use, you must be granted the permission by this Site or the copyright holder identified in the copyright notice contained herein to use the Content after your prior written request to use Content from this Site. Without such approval, copying or storing any of the Content or of the Service for other than personal use is expressly prohibited. You are not allowed, without the express approval of MCGI, to distribute or otherwise publish any material containing any solicitation of funds, advertising or solicitation for goods or services.</p>

                        <p className='text-base font-medium	 pb-2'>Linking</p>

                        <p className='text-base font-medium	 pb-2'>This Site may contain links or references operated by others. This Site does not own or control or maintain these third-party Web sites, hence, we should not be held responsible for their content or the privacy practices of these parties. Although we made the best and good faith effort to link only to appropriate sites, some of these third-party links or references may not wholly contain information that are complete or appropriate for your use. MCGI shall have no liability for any damages or injuries of any kind arising from such content or information. The use or inclusion of any third-party links does not imply the endorsement or recommendation by MCGI of these materials.</p>

                        <p className='text-base font-medium	 pb-2'>Representations and Warranties</p>

                        <p className='text-base font-medium	 pb-2'>You hereby indemnify, defend and hold harmless MCGI and this Site (the “Indemnified Parties”) from and against any and all liability and costs, including, without limitation, reasonable attorneys’ fees, incurred by the Indemnified Parties in connection with any claim arising out of warranties and covenant.</p>

                        <p className='text-base font-medium	 pb-2'>You agree to fully cooperate as reasonably required in the defense of any such claims. MCGI reserves the right, at its own expense, to assume the exclusive defense and control of any matter subject to indemnification by you.</p>

                        <p className='text-base font-medium	 pb-2'>Privacy</p>

                        <p className='text-base font-medium	 pb-2'>This Site respects your privacy in your use of the site. Please refer to the MCGI Privacy Policy, which discloses the privacy practices with respect to information that you may disclose or may otherwise be collected on this Site.</p>

                        <p className='text-base font-medium	 pb-2'>Disclaimers</p>

                        <p className='text-base font-medium	 pb-2'>THIS SITE AND THE INFORMATION AND MATERIALS HEREIN ARE PROVIDED TO YOU “AS IS” WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, QUALITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. APPLICABLE LAW MAY NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU.</p>

                        <p className='text-base font-medium	 pb-2'>THE INFORMATION CONTAINED HEREIN MAY CONTAIN TYPOGRAPHICAL ERRORS AND INACCURACIES. THIS SITE MAKES NO REPRESENTATIONS OR WARRANTIES WHATSOEVER REGARDING THE SUITABILITY, FUNCTIONALITY, AVAILABILITY OR OPERATION OF THIS SITE. THIS SITE MAY BE TEMPORARILY UNAVAILABLE DUE TO MAINTENANCE OR MALFUNCTION OF COMPUTER EQUIPMENT. MCGI DOES NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS IN THE SITE WILL BE CORRECTED, OR THAT THE SITE OR THE SERVERS THAT MAKE THE WEBSITE AVAILABLE ARE FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS.</p>

                        <p className='text-base font-medium	 pb-2'>Changes to These Terms</p>

                        <p className='text-base font-medium	 pb-2'>This Site may change, add or remove portions of these Terms of Agreement at any time, which shall become effective immediately upon posting. Before each use of the Site, it is your responsibility to review these Terms of Agreement, and by continuing to use this Site, you agree to any changes.</p>

                        <p className='text-base font-medium	 pb-2'>You agree to report any copyright violations of the Terms of Agreement to this Site as soon as you become aware of them. In the event you have a claim of copyright infringement with respect to the material that is contained in this Site, please notify intellectualproperty@mcgi.org.</p>

                        <p className='text-base font-medium	 pb-2'>Jurisdiction and Applicable Laws</p>

                        <p className='text-base font-medium	 pb-2'>These Terms of Agreement have been made in and shall be construed and enforced in accordance with laws under Philippine jurisdiction. Any action to enforce these Terms of Service shall be brought in the courts located in the Philippines.</p>

                        <p className='text-base font-medium	 pb-2'>Miscellaneous</p>

                        <p className='text-base font-medium	 pb-2'>If any provision of this Terms of Use Agreement is held to be unlawful, void or unforceable, the remaining provisions of the agreement will remain in place.</p>
                    </div>
                </div>
            </div>
            </GuestLayout>
)}
