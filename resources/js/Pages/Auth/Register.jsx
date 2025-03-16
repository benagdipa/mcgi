import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaPhone, FaMapMarkerAlt, FaUserPlus, FaChevronRight, FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Register({ locale }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [passwordStrength, setPasswordStrength] = useState(0);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        local: '',
        privacy: true
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    // Password strength checker
    useEffect(() => {
        if (!data.password) {
            setPasswordStrength(0);
            return;
        }
        
        // Calculate password strength
        let strength = 0;
        
        // Length check
        if (data.password.length >= 8) strength += 1;
        if (data.password.length >= 12) strength += 1;
        
        // Complexity checks
        if (/[A-Z]/.test(data.password)) strength += 1;
        if (/[a-z]/.test(data.password)) strength += 1;
        if (/[0-9]/.test(data.password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(data.password)) strength += 1;
        
        setPasswordStrength(Math.min(strength, 5));
    }, [data.password]);

    const getPasswordStrengthLabel = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength === 1) return 'Very Weak';
        if (passwordStrength === 2) return 'Weak';
        if (passwordStrength === 3) return 'Moderate';
        if (passwordStrength === 4) return 'Strong';
        return 'Very Strong';
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength === 0) return 'bg-gray-200';
        if (passwordStrength === 1) return 'bg-red-500';
        if (passwordStrength === 2) return 'bg-orange-500';
        if (passwordStrength === 3) return 'bg-yellow-500';
        if (passwordStrength === 4) return 'bg-green-500';
        return 'bg-green-600';
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const nextStep = () => {
        // Simple validation for step 1
        if (currentStep === 1) {
            if (!data.first_name || !data.last_name || !data.email) {
                return;
            }
        }
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const stepVariants = {
        hidden: { 
            opacity: 0,
            x: 50 
        },
        visible: { 
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: "easeInOut"
            }
        },
        exit: { 
            opacity: 0,
            x: -50,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const isStepValid = () => {
        if (currentStep === 1) {
            return data.first_name && data.last_name && data.email;
        } else if (currentStep === 2) {
            return data.password && data.password_confirmation;
        } else if (currentStep === 3) {
            return data.local && data.privacy;
        }
        return false;
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="register-page py-6 md:py-12 bg-gray-50">
                <div className="w-full max-w-3xl mx-auto px-4">
                    {/* Registration Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="p-5 md:p-7 shadow-xl border-0 rounded-2xl overflow-hidden relative">
                            {/* Background pattern */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
                            <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/5 rounded-full -ml-32 -mb-32"></div>
                            
                            <div className="relative z-10">
                                <div className="flex justify-center mb-5">
                                    <ApplicationLogo className="w-20 md:w-28 h-auto" />
                                </div>
                                
                                <div className="text-center mb-5 md:mb-6">
                                    <div className="inline-flex p-3 bg-primary/10 text-primary rounded-full mb-3">
                                        <FaUserPlus className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Create an Account</h2>
                                    <p className="mt-1.5 text-sm text-gray-600">
                                        Join our community by filling in your details below
                                    </p>
                                </div>
                                
                                {/* Progress indicators */}
                                <div className="mb-5">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className={`h-1.5 rounded ${currentStep >= 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                                        <div className={`h-1.5 rounded ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                                        <div className={`h-1.5 rounded ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                                    </div>
                                    <div className="flex justify-between text-xs mt-1 text-gray-500">
                                        <span>Personal</span>
                                        <span>Security</span>
                                        <span>Locale</span>
                                    </div>
                                </div>
                                
                                <form onSubmit={submit} className="space-y-4">
                                    <AnimatePresence mode="wait">
                                        {currentStep === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.2 }}
                                                className="space-y-4"
                                            >
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                        <div>
                                                            <InputLabel htmlFor="first_name" value="First Name" className="font-semibold mb-1 text-sm" required={true} />
                                                            <div className="relative">
                                                                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                                                <TextInput
                                                                    id="first_name"
                                                                    name="first_name"
                                                                    value={data.first_name}
                                                                    className="pl-9 mt-1 block w-full py-2 text-sm"
                                                                    autoComplete="given-name"
                                                                    isFocused={true}
                                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                                    hasError={!!errors.first_name}
                                                                    required
                                                                />
                                                            </div>
                                                            <InputError message={errors.first_name} className="mt-1 text-xs" />
                                                        </div>
                                                        
                                                        <div>
                                                            <InputLabel htmlFor="last_name" value="Last Name" className="font-semibold mb-1 text-sm" required={true} />
                                                            <div className="relative">
                                                                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                                                <TextInput
                                                                    id="last_name"
                                                                    name="last_name"
                                                                    value={data.last_name}
                                                                    className="pl-9 mt-1 block w-full py-2 text-sm"
                                                                    autoComplete="family-name"
                                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                                    hasError={!!errors.last_name}
                                                                    required
                                                                />
                                                            </div>
                                                            <InputError message={errors.last_name} className="mt-1 text-xs" />
                                                        </div>
                                                    </div>
                                                    
                                                    <div>
                                                        <InputLabel htmlFor="email" value="Email Address" className="font-semibold mb-1 text-sm" required={true} />
                                                            <div className="relative">
                                                                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                                                <TextInput
                                                                    id="email"
                                                                    type="email"
                                                                    name="email"
                                                                    value={data.email}
                                                                    className="pl-9 mt-1 block w-full py-2 text-sm"
                                                                    autoComplete="email"
                                                                    onChange={(e) => setData('email', e.target.value)}
                                                                    hasError={!!errors.email}
                                                                    required
                                                                />
                                                            </div>
                                                            <InputError message={errors.email} className="mt-1 text-xs" />
                                                    </div>
                                                    
                                                    <div>
                                                        <InputLabel htmlFor="phone" value="Phone Number" className="font-semibold mb-1 text-sm" required={true} />
                                                            <div className="relative">
                                                                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                                                <TextInput
                                                                    id="phone"
                                                                    type="text"
                                                                    name="phone"
                                                                    value={data.phone}
                                                                    className="pl-9 mt-1 block w-full py-2 text-sm"
                                                                    autoComplete="tel"
                                                                    onChange={(e) => setData('phone', e.target.value)}
                                                                    hasError={!!errors.phone}
                                                                    required
                                                                />
                                                            </div>
                                                            <InputError message={errors.phone} className="mt-1 text-xs" />
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-5 md:mt-6 flex justify-end">
                                                    <motion.button
                                                        type="button"
                                                        onClick={nextStep}
                                                        className="inline-flex items-center px-4 py-2 bg-primary text-secondary rounded-md font-semibold text-sm transition duration-300 ease-in-out hover:bg-primary/90 hover:shadow-md"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        Continue
                                                        <FaChevronRight className="ml-2 w-3 h-3" />
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        )}
                                        
                                        {currentStep === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.2 }}
                                                className="space-y-4"
                                            >
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Information</h3>
                                                    
                                                    <div>
                                                        <InputLabel htmlFor="password" value="Password" className="font-semibold mb-1 text-sm" required={true} />
                                                            <div className="relative">
                                                                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                                                <TextInput
                                                                    id="password"
                                                                    type={showPassword ? 'text' : 'password'}
                                                                    name="password"
                                                                    value={data.password}
                                                                    className="pl-9 pr-10 mt-1 block w-full py-2 text-sm"
                                                                    autoComplete="new-password"
                                                                    onChange={(e) => setData('password', e.target.value)}
                                                                    hasError={!!errors.password}
                                                                    required
                                                                />
                                                                <button 
                                                                    type="button" 
                                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                                                                    onClick={togglePasswordVisibility}
                                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                                >
                                                                    {showPassword ? <FaEyeSlash className="h-4 w-4 md:h-5 md:w-5" /> : <FaEye className="h-4 w-4 md:h-5 md:w-5" />}
                                                                </button>
                                                            </div>
                                                            
                                                            {/* Password strength indicator */}
                                                            {data.password && (
                                                                <div className="mt-2">
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <span className="text-xs text-gray-600">Password Strength</span>
                                                                        <span className={`text-xs font-medium ${
                                                                            passwordStrength <= 2 ? 'text-red-600' : 
                                                                            passwordStrength === 3 ? 'text-yellow-600' : 
                                                                            'text-green-600'
                                                                        }`}>
                                                                            {getPasswordStrengthLabel()}
                                                                        </span>
                                                                    </div>
                                                                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                                        <motion.div 
                                                                            className={`h-full ${getPasswordStrengthColor()}`}
                                                                            initial={{ width: 0 }}
                                                                            animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                                                                            transition={{ duration: 0.3 }}
                                                                        ></motion.div>
                                                                    </div>
                                                                    <div className="mt-1 text-xs text-gray-500">
                                                                        For a strong password, include uppercase & lowercase letters, numbers, and special characters.
                                                                    </div>
                                                                </div>
                                                            )}
                                                            
                                                            <InputError message={errors.password} className="mt-1 text-xs" />
                                                    </div>
                                                    
                                                    <div>
                                                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="font-semibold mb-1 text-sm" required={true} />
                                                            <div className="relative">
                                                                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                                                <TextInput
                                                                    id="password_confirmation"
                                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                                    name="password_confirmation"
                                                                    value={data.password_confirmation}
                                                                    className="pl-9 pr-10 mt-1 block w-full py-2 text-sm"
                                                                    autoComplete="new-password"
                                                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                                                    hasError={!!errors.password_confirmation}
                                                                    required
                                                                />
                                                                <button 
                                                                    type="button" 
                                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                                                                    onClick={toggleConfirmPasswordVisibility}
                                                                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                                                >
                                                                    {showConfirmPassword ? <FaEyeSlash className="h-4 w-4 md:h-5 md:w-5" /> : <FaEye className="h-4 w-4 md:h-5 md:w-5" />}
                                                                </button>
                                                            </div>
                                                            <InputError message={errors.password_confirmation} className="mt-1 text-xs" />
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-5 md:mt-6 flex justify-between">
                                                    <motion.button
                                                        type="button"
                                                        onClick={prevStep}
                                                        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-semibold text-sm transition duration-300 ease-in-out hover:bg-gray-200"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        Back
                                                    </motion.button>
                                                    
                                                    <motion.button
                                                        type="button"
                                                        onClick={nextStep}
                                                        className="inline-flex items-center px-4 py-2 bg-primary text-secondary rounded-md font-semibold text-sm transition duration-300 ease-in-out hover:bg-primary/90 hover:shadow-md"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        Continue
                                                        <FaChevronRight className="ml-2 w-3 h-3" />
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        )}
                                        
                                        {currentStep === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.2 }}
                                                className="space-y-4"
                                            >
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Locale & Final Steps</h3>
                                                    
                                                    <div>
                                                        <InputLabel htmlFor="local" value="Select Locale" className="font-semibold mb-1 text-sm" required={true} />
                                                            <div className="relative">
                                                                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                                                <select
                                                                    name="local"
                                                                    id="local"
                                                                    className="pl-9 mt-1 block w-full border-gray-300 focus:border-primary focus:ring-primary rounded-md shadow-sm py-2.5 text-sm"
                                                                    value={data.local}
                                                                    onChange={(e) => setData('local', e.target.value)}
                                                                    required
                                                                >
                                                                    <option value="">Select Locale</option>
                                                                    {locale && locale.length > 0 && locale.map((item) => (
                                                                        <option value={item.id} key={item.id}>{item.title}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <InputError message={errors.local} className="mt-1 text-xs" />
                                                    </div>
                                                    
                                                    <div className="flex items-start">
                                                        <div className="flex items-start">
                                                            <div className="flex items-center h-5">
                                                                <Checkbox
                                                                    name="privacy"
                                                                    checked={data.privacy}
                                                                    onChange={(e) => setData('privacy', e.target.checked)}
                                                                    className="mt-0.5"
                                                                />
                                                            </div>
                                                            <div className="ml-3 text-sm">
                                                                <label htmlFor="privacy" className="text-sm text-gray-700">
                                                                    I agree to the <Link href={route('privacy-and-policy')} className="text-primary hover:text-primary/80 font-medium">Privacy Policy</Link>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <InputError message={errors.privacy} className="mt-1 text-xs" />
                                                    
                                                    <div className="flex justify-between items-center mt-5">
                                                        {currentStep > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={prevStep}
                                                                className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition ease-in-out duration-150"
                                                            >
                                                                <FaArrowLeft className="mr-2 w-4 h-4" />
                                                                Back
                                                            </button>
                                                        )}
                                                        
                                                        {currentStep < 3 ? (
                                                            <button
                                                                type="button"
                                                                onClick={nextStep}
                                                                className={`ml-auto inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-medium text-sm text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition ease-in-out duration-150 ${isStepValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
                                                                disabled={!isStepValid()}
                                                            >
                                                                Next
                                                                <FaArrowRight className="ml-2 w-4 h-4" />
                                                            </button>
                                                        ) : (
                                                            <PrimaryButton className="ml-auto" disabled={processing}>
                                                                {processing ? (
                                                                    <>
                                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                        </svg>
                                                                        Processing...
                                                                    </>
                                                                ) : (
                                                                    <>Register</>
                                                                )}
                                                            </PrimaryButton>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                                
                                <div className="text-center mt-5 pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-600">Already have an account? </span>
                                    <Link 
                                        href={route('login')} 
                                        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    );
}
