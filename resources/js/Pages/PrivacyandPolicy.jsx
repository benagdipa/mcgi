import React, {useState} from 'react'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react'
import WOW from 'react-wow';
export default function PrivacyandPolicy({ auth }) {
    const [showFirstSection, setShowFirstSection] = useState(true);
    const [showSecondSection, setShowSecondSection] = useState(false);
    const [hideFirstHeaderBorder, setHideFirstHeaderBorder] = useState(true);
    const [hideSecondHeaderBorder, setHideSecondHeaderBorder] = useState(false);

    const handFirstHeaderClick = () =>{
        setShowFirstSection(true);
        setShowSecondSection(false);
        setHideFirstHeaderBorder(true);
        setHideSecondHeaderBorder(false);
    }
    const handSecondHeaderClick = () =>{
        setShowFirstSection(false);
        setShowSecondSection(true);
        setHideFirstHeaderBorder(false);
        setHideSecondHeaderBorder(true);
    }
    return (
        <GuestLayout user={auth?.user}>
            <Head>
                <title>Privacy Policy</title>
                <meta name="title" content="Privacy Policy"/>
                <meta name="keywords" content="Privacy Policy"/>
                <meta name="descriptions" content="Privacy Policy"/>
            </Head>
            <div className="privacy-policy-page">
                <div className="page-header pt-[70px] md:pt-80 pb-28 ">
                    <WOW animation='slideLeftToRight'>
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <h1 className='font-bold lg:text-7xl text-6xl text-white'>Privacy and Policy</h1>
                            <div className="breadcrumbs pt-5">
                                <div className="flex gap-4 font-semibold uppercase font-dmsans text-white">
                                    <div className="item"><Link href={route('home')} className="breadcrumb-link">HOME</Link></div>
                                    <div className="divider"> | </div>
                                    <div className="item"><Link href={route('privacy-and-policy')} className="breadcrumb-link text-gray-200">Privacy and Policy</Link></div>
                                </div>
                            </div>
                        </div>
                    </WOW>
                </div>
                <WOW animation='fadeIn'>
                    <div className="page-content py-20 md:py-32">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <div className="header-title flex gap-3">
                                <h2 className="header-first font-bold text-lg font-montserrat p-5"  onClick={handFirstHeaderClick} style={{border: hideSecondHeaderBorder ? '1px' : ''}}>
                                    MCGI.org
                                </h2>
                                <h2 className="header-first font-bold text-lg font-montserrat p-5" onClick={handSecondHeaderClick} style={{border: hideFirstHeaderBorder ? '1px' : ''}}>
                                    MCGI Cares
                                </h2>
                            </div>
                            <div className="first-section p-5"style={{display: showFirstSection ? 'block' : 'none'}}>
                                    <div className="first-section-content ml-10 ">
                                        <h1 className='text-center font-bold text-3xl mb-2 font-montserrat'>MEMBERS CHURCH OF GOD INTERNATIONAL</h1>
                                        <h3 className='text-center font-semibold text-xl mb-5 font-montserrat'>DATA PRIVACY POLICY</h3>
                                        <div className='leading-6  font-semibold text-base font-dmsans text-black'>
                                            <p className='mb-3'> We, Members Church of God International (MCGI), recognize your fundamental right to privacy. We treat your personal information in full confidentiality and with strict adherence to the fundamental principles of privacy as required by Data Protection Laws, such as, but not limited to, Republic Act No. 10173 (Philippine Data Privacy Act of 2012), its implementing rules and regulations, and the General Data Protection Regulation (GDPR) of the European Union.</p>
                                            <p className='mb-3'>Please take time to read this Privacy Notice on how we process your personal information. As used in this Privacy Notice, the term “personal information” includes “sensitive personal information” and “privileged information” as defined in Section 3 of R.A. 10173.</p>
                                            <p className='mb-3'>We inform you about how we collect, use, access, store, retain, protect, and share your personal data or information within MCGI as you access our Members Church of God International (MCGI) Official Website (https://www.mcgi.org/).</p>
                                        </div>
                                            <div>
                                                <h3 className='font-bold text-lg italic mb-5 font-montserrat'>I. How we collect your personal data and what we collect</h3>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>As you visit our website, we collect the data you directly supplied to us through our contact information. We do not, however, collect or process any other data from third parties, institutions or agencies.</p>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>You are not required to provide us your personal information. If you choose to do so, you agree and freely consent that the information you provide will be collected, processed, and stored under our auspices in the Philippines in accordance with Republic Act No. 10173, otherwise known as the Data Privacy Act of 2012.</p>
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-lg italic mb-5 font-montserrat'>II. Use of your personal information</h3>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>We use your personal information for documentation and processing purposes mentioned below, and for other specific, limited, and legitimate purposes in relation to your inquiry or request.</p>
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-lg italic mb-5 font-montserrat'>III. Purpose of collecting your personal information</h3>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>For visiting our site, we collect your personal information for us to analyze trends, administer the website, and gather broad demographic information for aggregate use, without linking the same to personally identifiable information, and to track visits to our site for statistical purposes, without collecting any personal information based therein.</p>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>For reaching us out, we collect your personal information for us to identify you, contact you, to provide appropriate reply to your inquiries, and such other specific, limited, and legitimate purposes, such as your NAME, for us to identify you, and your ADDRESS, CONTACT NUMBER and EMAIL ADDRESS, for us to be able to respond to your inquiries.</p>
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-lg italic mb-5 font-montserrat'>IV. To whom we disclose or share your personal information</h3>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>We use your personal information within MCGI, accessible by its departments.</p>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>We value your rights as data subjects under the data privacy laws. Rest assured that your personal information and sensitive personal information are handled with utmost care, and are protected using our appropriate organizational, physical and technical security measures.</p>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>We however do not share or transfer your personal information with any other organization, agency or institution without your consent. In the same manner, we do not sell, rent, lease, subcontract, or give away your personal information, unless upon a lawful order of the court or quasi-judicial body with jurisdiction over your person.</p>
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-lg italic mb-5 font-montserrat'>V. How do we store your personal information</h3>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>We securely store your personal information through Google Workspace (you can learn more about Google’s security & privacy by visiting the website <a href='https://safety.google/security-privacy/'>https://safety.google/security-privacy/</a>).</p>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>You may request access to your personal information, have it corrected or erased, or block its processing. We will consider your request in accordance with law.</p>
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-base italic mb-5 font-montserrat'>VI. Retention and Disposal</h3>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>In accordance with our MCGI Data Retention policy, we retain your personal information as long as necessary, but not exceeding ten (10) years, for the purpose of their collection and processing. After which, these shall be securely disposed of following the international best practices in disposing physical and electronic records.</p>
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-lg italic mb-5 font-montserrat'>VII. How do we work together to protect your personal information?</h3>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>As we protect your personal information, we implement the internationally-approved best practices in handling personal information, where access to your personal information is highly restricted to authorized personnel only. Our qualified and trained personnel handle all data gathered with strict confidentiality using the appropriate physical, technical, and organizational measures to protect your personal data from any breach, such as, but not limited to, use of locks where records of personal data are kept, encryption of our database, and employee training on data privacy.</p>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>Our Data Protection Office, headed by our Data Protection Officer duly registered with the National Privacy Commission of the Philippines, handles all data privacy concerns.</p>
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-lg italic mb-5 font-montserrat'>VIII. Methods Utilized for Automated Access</h3>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>We use cookies, a piece of data stored by our websites on your computer for us to remember your browsing session and improve your browsing experience on our websites. Third-party services, such as Google, Facebook, and YouTube, may also store cookies. While disabling cookies will not prevent you from accessing our website, it may limit your browsing experience with our websites. Cookies, however, will not let us access any other data from your computer.</p>
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-lg italic mb-5 font-montserrat'>IX. Your rights as data subject</h3>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>We make sure you are fully aware of all your data protection rights. You have the right to be informed, right to access, right to object, right to erasure or blocking, right to damages, right to file a complaint, right to rectify, and right to data portability.</p>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>To exercise these rights, you may get in touch with our Data Protection Officer through the contact details provided below.</p>
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-lg italic mb-5 font-montserrat'>X. Risks Involved </h3>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>We recognize the risks involved in the processing of personal information, such as, but not limited to, exposure to malware, ransomware, computer viruses, or unauthorized access. However, we are implementing appropriate organizational, physical, and technical security measures to ensure that any risk for personal data breach is mitigated, if not completely avoided.</p>
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-lg italic mb-5 font-montserrat'>XI. MCGI Data Protection Officer Contact Information</h3>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>You may reach out our Data Protection Officer for your queries and other data privacy concerns via:</p>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>Email – <a href='mailto:dpo@mcgi.org'>dpo@mcgi.org</a></p>
                                                <p className='mb-3 font-semibold text-base font-dmsans text-justify'>Landline – <a href='tel:(045) 652-1065'>(045) 652-1065</a></p>
                                            </div>
                                        </div>
                                    <p className='font-semibold text-base font-dmsans text-justify'>(Last Updated: February 22, 2022)</p>
                            </div>
                            <div className="second-section p-5" style={{ display: showSecondSection ? 'block' : 'none' }}>
                                <div className="second-section-content ml-10 ">
                                    <h1 className='text-center font-bold text-3xl mb-2 font-montserrat'>DATA PRIVACY NOTICE</h1>
                                    <h3 className='text-center font-semibold text-xl mb-5 font-montserrat'>MCGI Cares: The Legacy Continues</h3>
                                        <div className='leading-6 font-semibold text-base font-dmsans text-black'>
                                            <p className='mb-3'>We, Members Church of God International (MCGI), recognize your fundamental right to privacy. We treat your personal information in full confidentiality and with strict adherence to the fundamental principles of privacy as required by Data Protection Laws, such as, but not limited to, Republic Act No. 10173 (Philippine Data Privacy Act of 2012), its implementing rules and regulations, and the General Data Protection Regulation (GDPR) of the European Union.</p>
                                            <p className='mb-3'>Please take time to read this Privacy Notice on how we process your personal information. As used in this Privacy Notice, the term “personal information” includes “sensitive personal information” and “privileged information” as defined in Section 3 of R.A. 10173.</p>
                                            <p className='mb-3'>We inform you about how we collect, use, access, store, retain, protect, and share your personal data or information within MCGI as you fill out our MCGI Cares Registration Form.</p>
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-lg  mb-5 font-montserrat'>I. How we collect your personal data and what we collect</h3>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>You may reach us through our available manual and electronic modes of communication, through our website, apps, call center hotlines, chat services, email, and service of mails through our physical address. As you communicate with us (which we highly appreciate), we collect the data you directly supplied in our MCGI Cares Registration Form. We do not, however, collect or process any other data from third parties, institutions or agencies.</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>You are not required to provide us your personal information. If you choose to do so, you agree and freely consent that the information you provide will be collected, processed, and stored under our auspices in the Philippines in accordance with Republic Act No. 10173, otherwise known as the Data Privacy Act of 2012.</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>Upon submission of your inquiries, requests, and comments, MCGI collects the following personal information, including sensitive personal information, namely:</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>● NAME and GENDER, to address you properly;</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>● ADDRESS, for delivery purposes and to determine the nearest MCGI locale near you;</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>● CONTACT NUMBER, to contact you regarding provision of MCGI Cares services and to reach you for coordination of your requested services;</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>● RELIGION and AGE, to show everyone that this effort of MCGI is given without discrimination to any person in need regardless of their religion or religious affiliation;</p>
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-lg  mb-5 font-montserrat'>II. Use of your personal information</h3>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>We use your personal information for documentation and processing purposes, and for other specific, limited, and legitimate purposes in relation to your inquiry or request.</p>
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-lg  mb-5 font-montserrat'>III. Purpose of collecting your personal information</h3>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>We collect your personal information for us to provide you services, such as, but not limited to, free social services more effectively and efficiently for people needing help, provide appropriate reply to inquiries, monitor the well-being of brethren in need, provide free healthcare for those in need, and such other specific, limited, and legitimate purposes, including but not limited to written records, photographic and video images, and social media and digital materials.</p>
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-lg  mb-5 font-montserrat'>IV. To whom we disclose or share your personal information</h3>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>We use your personal information within MCGI only, accessible by its departments, such as, but not limited to:</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>● MCGI Cares staff and volunteers</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>● MCGI Servant Ministry</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>● MCGI Broadcast Department</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>We value your rights as data subjects under the data privacy laws. Rest assured that your personal information and sensitive personal information are handled with utmost care, and are protected using our appropriate organizational, physical and technical security measures.</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>We however do not share or transfer your personal information with any other organization, agency or institution without your consent. In the same manner, we do not sell, rent, lease, subcontract, or give away your personal information, unless upon a lawful order of the court or quasi-judicial body with jurisdiction over your person.</p>
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-lg  mb-5 font-montserrat'>V. How do we store your personal information</h3>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>We securely store your personal information through Google Workspace (you can learn more about Google’s security & privacy by visiting the website <a href='https://safety.google/security-privacy/'>https://safety.google/security-privacy/</a>).</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>You may request access to your personal information, have it corrected or erased, or block its processing. We will consider your request in accordance with law.</p>
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-lg  mb-5 font-montserrat'>VI. Retention and Disposal</h3>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>In accordance with our MCGI Data Retention policy, we retain your personal information as long as necessary for the purpose of their collection and processing. After which, these shall be securely disposed of following the international best practices in disposing physical and electronic records.</p>
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-lg  mb-5 font-montserrat'>VII. How do we work together to protect your personal information?</h3>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>As we protect your personal information, we implement the internationally-approved best practices in handling personal information, where access to your personal information is highly restricted to authorized personnel only.</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>Our qualified and trained personnel handle all data gathered with strict confidentiality using the appropriate physical, technical, and organizational measures to protect your personal data from any breach.</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>Our Data Protection Office, headed by our Data Protection Officer duly registered with the National Privacy Commission of the Philippines, handles all data privacy concerns.</p>
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-lg  mb-5 font-montserrat'>VIII. Methods Utilized for Automated Access</h3>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>Use of Cookies We use cookies, a piece of data stored by our websites on your computer for us to remember your browsing session and improve your browsing experience on our websites. Third-party services, such as Google, Facebook, and YouTube, may also store cookies. While disabling cookies will not prevent you from accessing our website, it may limit your browsing experience with our websites. Cookies, however, will not let us access any other data from your computer.</p>
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-lg  mb-5 font-montserrat'>IX. Your rights as data subject</h3>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>We make sure you are fully aware of all your data protection rights. You have the right to be informed, right to access, right to object, right to erasure or blocking, right to damages, right to file a complaint, right to rectify, and right to data portability.</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>To exercise these rights, you may get in touch with our Data Protection Officer through the contact details provided below.</p>
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-lg  mb-5 font-montserrat'>X. Risks Involved </h3>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>We recognize the risks involved in the processing of personal information, such as, but not limited to, exposure to malware, ransomware, computer viruses, or unauthorized access. However, we are implementing appropriate organizational, physical, and technical security measures to ensure that any risk for personal data breach is mitigated, if not completely avoided.</p>
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-lg  mb-5 font-montserrat'>XI. MCGI Data Protection Officer Contact Information</h3>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>You may reach out our Data Protection Officer for your queries and other data privacy concerns via:</p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>Email – <a href='mailto:dpo@mcgi.org'>dpo@mcgi.org</a></p>
                                            <p className='mb-3 text-base font-dmsans font-semibold text-justify'>Landline – <a href='tel:(045) 652-1065'>(045) 652-1065</a></p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </WOW>
            </div>
        </GuestLayout>
)}
