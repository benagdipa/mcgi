import React, {useState} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import WOW from 'react-wow';
import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import { Tab } from '@headlessui/react';
import { FaShieldAlt, FaLock, FaUserShield } from 'react-icons/fa';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function PrivacyandPolicy({ auth }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <GuestLayout user={auth?.user}>
            <Head>
                <title>Privacy Policy</title>
                <meta name="title" content="Privacy Policy"/>
                <meta name="keywords" content="Privacy Policy, data protection, MCGI privacy, personal information"/>
                <meta name="description" content="Learn about how MCGI handles and protects your personal information in accordance with data protection laws. Our privacy policy outlines our commitment to safeguarding your data rights and privacy."/>
            </Head>
            <div className="privacy-policy-page">
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
                                Privacy
                            </Badge>
                            <h1 className='font-bold text-5xl md:text-7xl text-white mb-4'>Privacy Policy</h1>
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
                                            href={route('privacy-and-policy')} 
                                            className="breadcrumb-link text-gray-200"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </WOW>
                </div>
                <WOW animation='fadeIn'>
                    <div className="page-content py-20 md:py-32">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <Card className="border-none shadow-lg p-6 md:p-10 mb-10">
                                <div className="flex items-center mb-8 gap-4">
                                    <div className="icon-container">
                                        <div className="bg-primary/10 p-4 rounded-full">
                                            <FaUserShield className="text-primary text-3xl" />
                                        </div>
                                    </div>
                                    <div className="text-container">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Our Commitment to Your Privacy</h2>
                                        <p className="text-gray-600 mt-1">
                                            We value and protect your personal information
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    We, Members Church of God International (MCGI), recognize your fundamental right to privacy. We treat your personal information in full confidentiality and with strict adherence to the fundamental principles of privacy as required by Data Protection Laws, such as, but not limited to, Republic Act No. 10173 (Philippine Data Privacy Act of 2012), its implementing rules and regulations, and the General Data Protection Regulation (GDPR) of the European Union.
                                </p>
                            </Card>
                            
                            <Tab.Group onChange={setActiveTab}>
                                <Tab.List className="flex rounded-xl bg-gray-100 p-1 mb-8">
                                    <Tab className={({ selected }) =>
                                        classNames(
                                            'w-full rounded-lg py-3 px-4 text-sm font-medium leading-5 transition-all',
                                            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary ring-primary/30 ring-opacity-60',
                                            selected
                                                ? 'bg-white shadow text-primary font-bold'
                                                : 'text-gray-600 hover:bg-white/[0.12] hover:text-primary'
                                        )
                                    }>
                                        MCGI.org
                                    </Tab>
                                    <Tab className={({ selected }) =>
                                        classNames(
                                            'w-full rounded-lg py-3 px-4 text-sm font-medium leading-5 transition-all',
                                            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary ring-primary/30 ring-opacity-60',
                                            selected
                                                ? 'bg-white shadow text-primary font-bold'
                                                : 'text-gray-600 hover:bg-white/[0.12] hover:text-primary'
                                        )
                                    }>
                                        MCGI Cares
                                    </Tab>
                                </Tab.List>
                                
                                <Tab.Panels className="mt-2">
                                    <Tab.Panel className={classNames(
                                        'rounded-xl bg-white p-4 md:p-6 shadow',
                                        'focus:outline-none'
                                    )}>
                                        <div className="policy-content">
                                            <div className="text-center mb-10">
                                                <h1 className='font-bold text-2xl md:text-3xl mb-2 text-gray-800'>MEMBERS CHURCH OF GOD INTERNATIONAL</h1>
                                                <h3 className='font-semibold text-lg md:text-xl mb-5 text-gray-700'>DATA PRIVACY POLICY</h3>
                                            </div>
                                            
                                            <div className='leading-relaxed text-gray-700 mb-8'>
                                                <p className='mb-4'>We, Members Church of God International (MCGI), recognize your fundamental right to privacy. We treat your personal information in full confidentiality and with strict adherence to the fundamental principles of privacy as required by Data Protection Laws, such as, but not limited to, Republic Act No. 10173 (Philippine Data Privacy Act of 2012), its implementing rules and regulations, and the General Data Protection Regulation (GDPR) of the European Union.</p>
                                                <p className='mb-4'>Please take time to read this Privacy Notice on how we process your personal information. As used in this Privacy Notice, the term "personal information" includes "sensitive personal information" and "privileged information" as defined in Section 3 of R.A. 10173.</p>
                                                <p className='mb-4'>We inform you about how we collect, use, access, store, retain, protect, and share your personal data or information within MCGI as you access our Members Church of God International (MCGI) Official Website (https://www.mcgi.org/).</p>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>I. How we collect your personal data and what we collect</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>As you visit our website, we collect the data you directly supplied to us through our contact information. We do not, however, collect or process any other data from third parties, institutions or agencies.</p>
                                                        <p className='mb-0 text-gray-700'>You are not required to provide us your personal information. If you choose to do so, you agree and freely consent that the information you provide will be collected, processed, and stored under our auspices in the Philippines in accordance with Republic Act No. 10173, otherwise known as the Data Privacy Act of 2012.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>II. Use of your personal information</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-0 text-gray-700'>We use your personal information for documentation and processing purposes mentioned below, and for other specific, limited, and legitimate purposes in relation to your inquiry or request.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>III. Purpose of collecting your personal information</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>For visiting our site, we collect your personal information for us to analyze trends, administer the website, and gather broad demographic information for aggregate use, without linking the same to personally identifiable information, and to track visits to our site for statistical purposes, without collecting any personal information based therein.</p>
                                                        <p className='mb-0 text-gray-700'>For reaching us out, we collect your personal information for us to identify you, contact you, to provide appropriate reply to your inquiries, and such other specific, limited, and legitimate purposes, such as your NAME, for us to identify you, and your ADDRESS, CONTACT NUMBER and EMAIL ADDRESS, for us to be able to respond to your inquiries.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>IV. To whom we disclose or share your personal information</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>We use your personal information within MCGI, accessible by its departments.</p>
                                                        <p className='mb-4 text-gray-700'>We value your rights as data subjects under the data privacy laws. Rest assured that your personal information and sensitive personal information are handled with utmost care, and are protected using our appropriate organizational, physical and technical security measures.</p>
                                                        <p className='mb-0 text-gray-700'>We however do not share or transfer your personal information with any other organization, agency or institution without your consent. In the same manner, we do not sell, rent, lease, subcontract, or give away your personal information, unless upon a lawful order of the court or quasi-judicial body with jurisdiction over your person.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>V. How do we store your personal information</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>We securely store your personal information through Google Workspace (you can learn more about Google's security & privacy by visiting the website <a href='https://safety.google/security-privacy/' className="text-primary hover:underline">https://safety.google/security-privacy/</a>).</p>
                                                        <p className='mb-0 text-gray-700'>You may request access to your personal information, have it corrected or erased, or block its processing. We will consider your request in accordance with law.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>VI. Retention and Disposal</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-0 text-gray-700'>In accordance with our MCGI Data Retention policy, we retain your personal information as long as necessary, but not exceeding ten (10) years, for the purpose of their collection and processing. After which, these shall be securely disposed of following the international best practices in disposing physical and electronic records.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>VII. How do we work together to protect your personal information?</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>As we protect your personal information, we implement the internationally-approved best practices in handling personal information, where access to your personal information is highly restricted to authorized personnel only. Our qualified and trained personnel handle all data gathered with strict confidentiality using the appropriate physical, technical, and organizational measures to protect your personal data from any breach, such as, but not limited to, use of locks where records of personal data are kept, encryption of our database, and employee training on data privacy.</p>
                                                        <p className='mb-0 text-gray-700'>Our Data Protection Office, headed by our Data Protection Officer duly registered with the National Privacy Commission of the Philippines, handles all data privacy concerns.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>VIII. Methods Utilized for Automated Access</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-0 text-gray-700'>We use cookies, a piece of data stored by our websites on your computer for us to remember your browsing session and improve your browsing experience on our websites. Third-party services, such as Google, Facebook, and YouTube, may also store cookies. While disabling cookies will not prevent you from accessing our website, it may limit your browsing experience with our websites. Cookies, however, will not let us access any other data from your computer.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>IX. Your rights as data subject</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>We make sure you are fully aware of all your data protection rights. You have the right to be informed, right to access, right to object, right to erasure or blocking, right to damages, right to file a complaint, right to rectify, and right to data portability.</p>
                                                        <p className='mb-0 text-gray-700'>To exercise these rights, you may get in touch with our Data Protection Officer through the contact details provided below.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>X. Risks Involved</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-0 text-gray-700'>We recognize the risks involved in the processing of personal information, such as, but not limited to, exposure to malware, ransomware, computer viruses, or unauthorized access. However, we are implementing appropriate organizational, physical, and technical security measures to ensure that any risk for personal data breach is mitigated, if not completely avoided.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>XI. MCGI Data Protection Officer Contact Information</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>You may reach out our Data Protection Officer for your queries and other data privacy concerns via:</p>
                                                        <p className='mb-3 text-gray-700'>Email – <a href='mailto:dpo@mcgi.org' className="text-primary hover:underline">dpo@mcgi.org</a></p>
                                                        <p className='mb-0 text-gray-700'>Landline – <a href='tel:(045) 652-1065' className="text-primary hover:underline">(045) 652-1065</a></p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="update-info text-gray-500 text-sm mt-10 text-right">
                                                <p>(Last Updated: February 22, 2022)</p>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                    
                                    <Tab.Panel className={classNames(
                                        'rounded-xl bg-white p-4 md:p-6 shadow',
                                        'focus:outline-none'
                                    )}>
                                        <div className="policy-content">
                                            <div className="text-center mb-10">
                                                <h1 className='font-bold text-2xl md:text-3xl mb-2 text-gray-800'>DATA PRIVACY NOTICE</h1>
                                                <h3 className='font-semibold text-lg md:text-xl mb-5 text-gray-700'>MCGI Cares: The Legacy Continues</h3>
                                            </div>
                                            
                                            <div className='leading-relaxed text-gray-700 mb-8'>
                                                <p className='mb-4'>We, Members Church of God International (MCGI), recognize your fundamental right to privacy. We treat your personal information in full confidentiality and with strict adherence to the fundamental principles of privacy as required by Data Protection Laws, such as, but not limited to, Republic Act No. 10173 (Philippine Data Privacy Act of 2012), its implementing rules and regulations, and the General Data Protection Regulation (GDPR) of the European Union.</p>
                                                <p className='mb-4'>Please take time to read this Privacy Notice on how we process your personal information. As used in this Privacy Notice, the term "personal information" includes "sensitive personal information" and "privileged information" as defined in Section 3 of R.A. 10173.</p>
                                                <p className='mb-4'>We inform you about how we collect, use, access, store, retain, protect, and share your personal data or information within MCGI as you fill out our MCGI Cares Registration Form.</p>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>I. How we collect your personal data and what we collect</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>You may reach us through our available manual and electronic modes of communication, through our website, apps, call center hotlines, chat services, email, and service of mails through our physical address. As you communicate with us (which we highly appreciate), we collect the data you directly supplied in our MCGI Cares Registration Form. We do not, however, collect or process any other data from third parties, institutions or agencies.</p>
                                                        <p className='mb-4 text-gray-700'>You are not required to provide us your personal information. If you choose to do so, you agree and freely consent that the information you provide will be collected, processed, and stored under our auspices in the Philippines in accordance with Republic Act No. 10173, otherwise known as the Data Privacy Act of 2012.</p>
                                                        <p className='mb-4 text-gray-700'>Upon submission of your inquiries, requests, and comments, MCGI collects the following personal information, including sensitive personal information, namely:</p>
                                                        <ul className="list-disc pl-8 space-y-2 text-gray-700">
                                                            <li>NAME and GENDER, to address you properly;</li>
                                                            <li>ADDRESS, for delivery purposes and to determine the nearest MCGI locale near you;</li>
                                                            <li>CONTACT NUMBER, to contact you regarding provision of MCGI Cares services and to reach you for coordination of your requested services;</li>
                                                            <li>RELIGION and AGE, to show everyone that this effort of MCGI is given without discrimination to any person in need regardless of their religion or religious affiliation;</li>
                                                        </ul>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>II. Use of your personal information</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-0 text-gray-700'>We use your personal information for documentation and processing purposes, and for other specific, limited, and legitimate purposes in relation to your inquiry or request.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>III. Purpose of collecting your personal information</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-0 text-gray-700'>We collect your personal information for us to provide you services, such as, but not limited to, free social services more effectively and efficiently for people needing help, provide appropriate reply to inquiries, monitor the well-being of brethren in need, provide free healthcare for those in need, and such other specific, limited, and legitimate purposes, including but not limited to written records, photographic and video images, and social media and digital materials.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>IV. To whom we disclose or share your personal information</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>We use your personal information within MCGI only, accessible by its departments, such as, but not limited to:</p>
                                                        <ul className="list-disc pl-8 space-y-2 mb-4 text-gray-700">
                                                            <li>MCGI Cares staff and volunteers</li>
                                                            <li>MCGI Servant Ministry</li>
                                                            <li>MCGI Broadcast Department</li>
                                                        </ul>
                                                        <p className='mb-4 text-gray-700'>We value your rights as data subjects under the data privacy laws. Rest assured that your personal information and sensitive personal information are handled with utmost care, and are protected using our appropriate organizational, physical and technical security measures.</p>
                                                        <p className='mb-0 text-gray-700'>We however do not share or transfer your personal information with any other organization, agency or institution without your consent. In the same manner, we do not sell, rent, lease, subcontract, or give away your personal information, unless upon a lawful order of the court or quasi-judicial body with jurisdiction over your person.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>V. How do we store your personal information</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>We securely store your personal information through Google Workspace (you can learn more about Google's security & privacy by visiting the website <a href='https://safety.google/security-privacy/' className="text-primary hover:underline">https://safety.google/security-privacy/</a>).</p>
                                                        <p className='mb-0 text-gray-700'>You may request access to your personal information, have it corrected or erased, or block its processing. We will consider your request in accordance with law.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>VI. Retention and Disposal</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-0 text-gray-700'>In accordance with our MCGI Data Retention policy, we retain your personal information as long as necessary for the purpose of their collection and processing. After which, these shall be securely disposed of following the international best practices in disposing physical and electronic records.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>VII. How do we work together to protect your personal information?</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>As we protect your personal information, we implement the internationally-approved best practices in handling personal information, where access to your personal information is highly restricted to authorized personnel only.</p>
                                                        <p className='mb-4 text-gray-700'>Our qualified and trained personnel handle all data gathered with strict confidentiality using the appropriate physical, technical, and organizational measures to protect your personal data from any breach.</p>
                                                        <p className='mb-0 text-gray-700'>Our Data Protection Office, headed by our Data Protection Officer duly registered with the National Privacy Commission of the Philippines, handles all data privacy concerns.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>VIII. Methods Utilized for Automated Access</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-0 text-gray-700'>Use of Cookies We use cookies, a piece of data stored by our websites on your computer for us to remember your browsing session and improve your browsing experience on our websites. Third-party services, such as Google, Facebook, and YouTube, may also store cookies. While disabling cookies will not prevent you from accessing our website, it may limit your browsing experience with our websites. Cookies, however, will not let us access any other data from your computer.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>IX. Your rights as data subject</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>We make sure you are fully aware of all your data protection rights. You have the right to be informed, right to access, right to object, right to erasure or blocking, right to damages, right to file a complaint, right to rectify, and right to data portability.</p>
                                                        <p className='mb-0 text-gray-700'>To exercise these rights, you may get in touch with our Data Protection Officer through the contact details provided below.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>X. Risks Involved</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-0 text-gray-700'>We recognize the risks involved in the processing of personal information, such as, but not limited to, exposure to malware, ransomware, computer viruses, or unauthorized access. However, we are implementing appropriate organizational, physical, and technical security measures to ensure that any risk for personal data breach is mitigated, if not completely avoided.</p>
                                                    </div>
                                                </Card>
                                            </div>
                                            
                                            <div className="policy-section mb-8">
                                                <h3 className='text-xl font-bold mb-4 text-primary'>XI. MCGI Data Protection Officer Contact Information</h3>
                                                <Card className="bg-gray-50 border-none mb-6">
                                                    <div className="p-5">
                                                        <p className='mb-4 text-gray-700'>You may reach out our Data Protection Officer for your queries and other data privacy concerns via:</p>
                                                        <p className='mb-3 text-gray-700'>Email – <a href='mailto:dpo@mcgi.org' className="text-primary hover:underline">dpo@mcgi.org</a></p>
                                                        <p className='mb-0 text-gray-700'>Landline – <a href='tel:(045) 652-1065' className="text-primary hover:underline">(045) 652-1065</a></p>
                                                    </div>
                                                </Card>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </WOW>
            </div>
        </GuestLayout>
    );
} 