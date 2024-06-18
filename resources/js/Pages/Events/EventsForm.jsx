import React, { useEffect, useState } from 'react'
import { Button, Step, Stepper, step } from '@material-tailwind/react'
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Guest from '@/Layouts/GuestLayout';
import { Link, router, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { IconPlus, IconX } from '@tabler/icons-react';

export default function EventsForm({ auth, errors, events }) {
    const { user } = auth
    const [message, setMessage] = useState(null)
    const randomId = function (length = 6) {
        return Math.random().toString(36).substring(2, length + 2);
    };
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [delegates, setDelegates] = useState([
        { id: randomId(), first_name: '', last_name: '', is_adult: '' }
    ])
    const { data, setData, post, processing, reset } = useForm({
        step_1: {
            email: user?.email,
            privacy_accept: '',
            consent_personal_info: ''
        },
        step_2: {
            full_name: `${user?.first_name} ${user?.last_name}`,
            phone_number: user?.phone,
            messenger_name: '',
            events: [],
            total_delegates: '',
            names_delegates: [],
            total_adults: '',
            total_kids: '',
            delegates_plan: ''
        },
        step_3: {
            more_arrival: '',
            first_arrival: '',
            last_departure: '',
            mode_of_transportation: '',
            other_mode_of_transportation: '',
            flight_number: '',
            need_mcgi_transport: '',
            seat_baby_booster: '',
        },
        step_4: {
            additional_date_of_arrival: '',
            additional_date_of_departure: '',
            additional_mode_of_transportation: '',
            additional_mode_of_transportation_other: '',
            additional_need_mcgi_transport: '',
            fly_same_location_with_delegates: '',
            delegates_names_fly_not_same: '',
        },
        step_5: {
            need_accomodation_in_melbourne: ''
        }
    })

    // console.log(data?.step_2);

    const addDelegate = (index) => {
        const current = delegates[index]
        if (current.first_name !== '' || current.last_name !== '' || current.is_adult !== '') {
            setDelegates([...delegates, { id: randomId(), first_name: '', last_name: '', is_adult: '' }])
        }
    }

    const removeDelegate = (id) => {
        setDelegates(delegates.filter(delegate => delegate.id !== id))
    }

    const updateDelegate = (id, field, value) => {
        const updatedRows = delegates.map(row => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        })
        setDelegates(updatedRows);
        handleInputChange('step_2', 'names_delegates', updatedRows)
        if (field === 'is_adult') {
            age_count(updatedRows)
        }
    };

    const age_count = (updatedRows) => {
        let total_adults = 0
        let total_kids = 0
        updatedRows?.map((delegate) => {
            if (delegate.is_adult === 'adult') {
                total_adults += 1
            }
            if (delegate.is_adult === 'kid') {
                total_kids += 1
            }
        })
        handleInputChange('step_2', 'total_adults', total_adults)
        handleInputChange('step_2', 'total_kids', total_kids)
    }

    const handleNext = () => {
        if (!isLastStep) {
            const current_active_form = 'step_' + (activeStep + 1)
            router.post(route('validate.event.form'), { [current_active_form]: data[current_active_form] }, {
                preserveScroll: true,
                onSuccess: () => {
                    setActiveStep((cur) => cur + 1)
                }
            })
        }
    };

    const handleInputChange = (step, name, value) => {
        setData((prev) => ({
            ...prev,
            [step]: {
                ...prev[step],
                [name]: value
            }
        }));
    };
    const handleInputChangeEvents = (e) => {
        const { value, checked } = e.target
        setData((prev) => {
            let updatedEvents;
            if (checked) {
                updatedEvents = [...prev.step_2.events, value];
            } else {
                updatedEvents = prev.step_2.events.filter(item => item !== value);
            }
            return {
                ...prev,
                step_2: {
                    ...prev.step_2,
                    events: updatedEvents
                }
            };
        });
    };


    const handlePrev = () => {
        !isFirstStep && setActiveStep((cur) => cur - 1)
    };

    const handleSubmit = () => {
        post(route('event.form.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                setActiveStep(0)
                setMessage('Form Submitted Successfully!')
            }
        })
    }
    return (
        <Guest user={auth?.user}>
            <div className="events-page">
                <div className="w-full">
                    <div className=" lg:max-w-screen-xl w-11/12 mx-auto py-8">
                        <h1 className='font-bold text-5xl text-gray-800'>Events Form</h1>
                        <div className="breadcrumbs pt-5">
                            <div className="flex gap-4 font-semibold uppercase font-dmsans text-gray-800">
                                <div className="item"><Link href={route('home')} className="breadcrumb-link">HOME</Link></div>
                                <div className="divider"> | </div>
                                <div className="item"><Link href={route('events.form')} className="breadcrumb-link text-gray-600">Events Form</Link></div>
                            </div>
                        </div>
                    </div>

                    <div className=" lg:max-w-screen-xl w-11/12 mx-auto py-6">
                        {message && (<div className='message mb-6 bg-green-500 text-white rounded p-4 font-semibold'>{message}</div>)}
                        <Stepper activeStep={activeStep} isLastStep={(value) => setIsLastStep(value)} isFirstStep={(value) => setIsFirstStep(value)}>
                            <Step>1</Step>
                            <Step>2</Step>
                            <Step>3</Step>
                            <Step>4</Step>
                            <Step>5</Step>
                        </Stepper>

                        <div className="stepper-content pt-12">

                            {/* start Step 1 */}
                            <div className={`step- 1 font- normal text - [#333] ${activeStep === 0 ? 'block' : 'hidden'} `}>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Email Address:'} className='text-lg font-medium' />
                                    <TextInput
                                        className="w-full"
                                        type="email"
                                        value={data?.step_1?.email}
                                        onChange={(e) => handleInputChange('step_1', 'email', e.target.value)}
                                    />
                                    <InputError message={errors?.['step_1.email']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-8">
                                    <p className='font-medium mb-6 text-lg'>By ticking “I Agree”, I voluntarily give my consent to MCGI in collecting,processing, recording, using, and retaining my personal information for the above-mentioned purpose in accordance with this Privacy Notice.</p>
                                    <div className="form-radio-wrapper">
                                        <div className="radio-option-item mb-2" >
                                            <label className='font-medium text-lg'>
                                                <input
                                                    type='radio'
                                                    name='privacy_accept'
                                                    value={'I agree'}
                                                    checked={data?.step_1?.privacy_accept === 'I agree'}
                                                    onChange={(e) => handleInputChange('step_1', 'privacy_accept', e.target.value)}
                                                />
                                                <span className='pl-2'>I Agree</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2" >
                                            <label className='font-medium text-lg'>
                                                <input
                                                    type='radio'
                                                    name='privacy_accept'
                                                    value={'I disagree'}
                                                    checked={data?.step_1?.privacy_accept === 'I disagree'}
                                                    onChange={(e) => handleInputChange('step_1', 'privacy_accept', e.target.value)}
                                                />
                                                <span className='pl-2'>I Disagree</span>
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors?.['step_1.privacy_accept']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-8">
                                    <p className='font-medium mb-6 text-lg'>I have read and fully understood the guidelines in the June/July Event Registration (Australia only) where the personal information collected will be used for registration for the event to be conducted by MCGI Australia, and I hereby consent to MCGI’s processing of my personal information.</p>
                                    <div className="form-radio-wrapper">
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium text-lg'>
                                                <input
                                                    type='radio'
                                                    name='consent_personal_info'
                                                    value={'Yes'}
                                                    checked={data?.step_1?.consent_personal_info === 'Yes'}
                                                    onChange={(e) => handleInputChange('step_1', 'consent_personal_info', e.target.value)}
                                                />
                                                <span className='pl-2'>Yes</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium text-lg'>
                                                <input
                                                    type='radio'
                                                    name='consent_personal_info'
                                                    value={'No'}
                                                    checked={data?.step_1?.consent_personal_info === 'No'}
                                                    onChange={(e) => handleInputChange('step_1', 'consent_personal_info', e.target.value)}
                                                />
                                                <span className='pl-2'>No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors?.['step_1.consent_personal_info']} className='mt-2 font-medium' />
                                </div>
                            </div>

                            {/* start step 2 */}
                            <div className={`step - 2 text - [#333] text - lg font - medium ${activeStep === 1 ? 'block' : 'hidden'} `}>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Full Name'} className='text-lg font-medium' />
                                    <TextInput
                                        className="w-full"
                                        value={data?.step_2?.full_name}
                                        onChange={(e) => handleInputChange('step_2', 'full_name', e.target.value)}
                                    />
                                    <InputError message={errors?.['step_2.full_name']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Phone Number (Including Country Code)'} className='text-lg font-medium' />
                                    <TextInput
                                        className="w-full"
                                        value={data?.step_2?.phone_number}
                                        onChange={(e) => handleInputChange('step_2', 'phone_number', e.target.value)}
                                    />
                                    <InputError message={errors?.['step_2.phone_number']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Facebook Messenger Name'} className='text-lg font-medium' />
                                    <TextInput
                                        className="w-full"
                                        value={data?.step_2?.messenger_name}
                                        onChange={(e) => handleInputChange('step_2', 'messenger_name', e.target.value)}
                                    />
                                    <InputError message={errors?.['step_2.messenger_name']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Which events will you be attending?'} className='text-lg font-medium' />
                                    <div className="events-item">
                                        <div className="form-radio-wrapper mt-4">
                                            {events?.length > 0 && events?.map((event, index) => (
                                                <div className="item" key={index}>
                                                    <label className='block mb-4'>
                                                        <input
                                                            type='checkbox'
                                                            name='events'
                                                            value={event?.title}
                                                            onChange={(e) => handleInputChangeEvents(e)}
                                                        />
                                                        <span className='pl-2'>{event?.title}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Total Number of Delegates (Including You)'} className='text-lg font-medium' />
                                    <TextInput
                                        className="w-full"
                                        value={data?.step_2?.total_delegates}
                                        onChange={(e) => handleInputChange('step_2', 'total_delegates', e.target.value)}
                                    />
                                    <InputError message={errors?.['step_2.total_delegates']} className='mt-2 font-medium' />
                                </div>

                                {
                                    parseInt(data?.step_2?.total_delegates) > 1 && (
                                        <div className="form-item mb-8 border rounded p-5">
                                            <InputLabel value={'Names of Accompanying Delagates (please indicate if any guests included)'} className='text-lg font-medium mb-6' />
                                            {delegates?.length > 0 && delegates?.map((delegate, index) => {
                                                return (
                                                    <div className="grid grid-cols-3 gap-8 relative mb-4" key={index}>
                                                        <div className="item">
                                                            <InputLabel value={'First Name'} className='text-lg font-medium' />
                                                            <TextInput
                                                                className="w-full"
                                                                value={delegate?.first_name}
                                                                onChange={(e) => updateDelegate(delegate?.id, 'first_name', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="item">
                                                            <InputLabel value={'Last Name'} className='text-lg font-medium' />
                                                            <TextInput
                                                                className="w-full"
                                                                value={delegate?.last_name}
                                                                onChange={(e) => updateDelegate(delegate?.id, 'last_name', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="item pt-4">
                                                            <div className="adult-radio-wrapper">
                                                                <div className="radio-option-item mb-2">
                                                                    <label className='font-medium'>
                                                                        <input
                                                                            type='radio'
                                                                            value={'adult'}
                                                                            name={`is_adult_${index}`}
                                                                            onChange={(e) => updateDelegate(delegate?.id, 'is_adult', e.target.value)}
                                                                        />
                                                                        <span className='pl-2'>Adult (13 Y/O above) </span>
                                                                    </label>
                                                                </div>
                                                                <div className="radio-option-item mb-2">
                                                                    <label className='font-medium'>
                                                                        <input
                                                                            type='radio'
                                                                            value={'kid'}
                                                                            name={`is_adult_${index}`}
                                                                            onChange={(e) => updateDelegate(delegate?.id, 'is_adult', e.target.value)}
                                                                        />
                                                                        <span className='pl-2'>Kid (12 Y/O below) </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="item absolute right-0 top-6 cursor-pointer">
                                                            {index === delegates.length - 1 ? (
                                                                <IconPlus onClick={() => addDelegate(index)} />
                                                            ) : (
                                                                <IconX onClick={() => removeDelegate(delegate.id)} />
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                }


                                <div className="form-item mb-8">
                                    <InputLabel value={'Total Number of Adults'} className='text-lg font-medium' />
                                    <TextInput
                                        className="w-full"
                                        value={data?.step_2?.total_adults}
                                        onChange={(e) => handleInputChange('step_2', 'total_adults', e.target.value)}
                                    />
                                    <InputError message={errors?.['step_2.total_adults']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Total Number of Kids'} className='text-lg font-medium' />
                                    <TextInput
                                        className="w-full"
                                        value={data?.step_2?.total_kids}
                                        onChange={(e) => handleInputChange('step_2', 'total_kids', e.target.value)}
                                    />
                                    <InputError message={errors?.['step_2.total_kids']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Do all delegates listed plan go to all selected locations?'} className='text-lg font-medium' />
                                    <div className="form-radio-wrapper mt-6">
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='delegates_plan'
                                                    value={'Yes'}
                                                    onChange={(e) => handleInputChange('step_2', 'delegates_plan', e.target.value)}
                                                />
                                                <span className='pl-2'>Yes</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='delegates_plan'
                                                    value={'No'}
                                                    onChange={(e) => handleInputChange('step_2', 'delegates_plan', e.target.value)}
                                                />
                                                <span className='pl-2'>No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors?.['step_2.delegates_plan']} className='mt-2 font-medium' />
                                </div>
                            </div>

                            {/* start step-3 */}
                            <div className={`step-3 font-medium text-[#333] text-lg ${activeStep === 2 ? 'block' : 'hidden'} `}>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Do you have more than one ARRIVAL dates to Melbourne?'} />
                                    <div className="form-radio-wrapper">
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='more_arrival'
                                                    value={'Yes'}
                                                    onChange={(e) => handleInputChange('step_3', 'more_arrival', e.target.value)}
                                                />
                                                <span className='pl-2'>Yes</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='more_arrival'
                                                    value={'No'}
                                                    onChange={(e) => handleInputChange('step_3', 'more_arrival', e.target.value)}
                                                />
                                                <span className='pl-2'>No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors?.['step_3.more_arrival']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Date of FIRST Arrival to Melbourne'} />
                                    <input
                                        type='date'
                                        className="border-gray-300 focus:border-yellow-500 focus:ring-0 rounded-md shadow-sm w-full"
                                        value={data?.step_3?.first_arrival}
                                        onChange={(e) => handleInputChange('step_3', 'first_arrival', e.target.value)}

                                    />
                                    <InputError message={errors?.['step_3.first_arrival']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Date of LAST Departure from Melbourne'} />
                                    <input
                                        type='date'
                                        className="border-gray-300 focus:border-yellow-500 focus:ring-0 rounded-md shadow-sm w-full"
                                        value={data?.step_3?.last_departure}
                                        onChange={(e) => handleInputChange('step_3', 'last_departure', e.target.value)}
                                    />
                                    <InputError message={errors?.['step_3.last_departure']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Mode of transporation'} />
                                    <div className="form-radio-wrapper">
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='mode_of_transportation'
                                                    value={'Air'}
                                                    onChange={(e) => handleInputChange('step_3', 'mode_of_transportation', e.target.value)}
                                                />
                                                <span className='pl-2'>Air</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='mode_of_transportation'
                                                    value={'Land'}
                                                    onChange={(e) => handleInputChange('step_3', 'mode_of_transportation', e.target.value)}
                                                />
                                                <span className='pl-2'>Land</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='mode_of_transportation'
                                                    value={'Other'}
                                                    onChange={(e) => handleInputChange('step_3', 'mode_of_transportation', e.target.value)}
                                                />
                                                <span className='pl-2'>Other</span>
                                            </label>
                                        </div>
                                        <InputError message={errors?.['step_3.mode_of_transportation']} className='mt-2 font-medium' />

                                        {data?.step_3.mode_of_transportation === 'Other' && (
                                            <>
                                                <TextInput
                                                    className="w-full"
                                                    value={data?.step_3?.other_mode_of_transportation}
                                                    onChange={(e) => handleInputChange('step_3', 'other_mode_of_transportation', e.target.value)}
                                                />
                                                <InputError message={errors?.['step_3.other_mode_of_transportation']} className='mt-2 font-medium' />
                                            </>
                                        )}
                                    </div>
                                </div>
                                {data?.step_3.mode_of_transportation === 'Air' && (
                                    <div className="form-item mb-8">
                                        <InputLabel value={'If you chose "Air", please provide the flight number'} />
                                        <TextInput
                                            className="w-full"
                                            value={data?.step_3?.flight_number}
                                            onChange={(e) => handleInputChange('step_3', 'flight_number', e.target.value)}
                                        />
                                        <InputError message={errors?.['step_3.flight_number']} className='mt-2 font-medium' />
                                    </div>
                                )}

                                <div className="form-item mb-8">
                                    <InputLabel value={'Do you need MCGI Transport?'} />
                                    <div className="form-radio-wrapper">
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='need_mcgi_transport'
                                                    value={'Yes'}
                                                    onChange={(e) => handleInputChange('step_3', 'need_mcgi_transport', e.target.value)}
                                                />
                                                <span className='pl-2'>Yes</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='need_mcgi_transport'
                                                    value={'No'}
                                                    onChange={(e) => handleInputChange('step_3', 'need_mcgi_transport', e.target.value)}
                                                />
                                                <span className='pl-2'>No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors?.['step_3.need_mcgi_transport']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-8">
                                    <InputLabel value={'Does your travel companion require a car seat/baby booster?'} />
                                    <div className="form-radio-wrapper">
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='seat_baby_booster'
                                                    value={'Yes'}
                                                    onChange={(e) => handleInputChange('step_3', 'seat_baby_booster', e.target.value)}
                                                />
                                                <span className='pl-2'>Yes</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='seat_baby_booster'
                                                    value={'No'}
                                                />
                                                <span className='pl-2'>No</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='seat_baby_booster'
                                                    value={'N/A'}
                                                    onChange={(e) => handleInputChange('step_3', 'seat_baby_booster', e.target.value)}
                                                />
                                                <span className='pl-2'>N/A</span>
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors?.['step_3.seat_baby_booster']} className='mt-2 font-medium' />
                                </div>
                            </div>

                            {/* Start step- 4 */}
                            <div className={`step - 4 font - medium text - [#333] text - lg ${activeStep === 3 ? 'block' : 'hidden'} `}>
                                <div className="form-item mb-4">
                                    <InputLabel value={'Additional Date of Arrival(s)'} />
                                    <input
                                        type='date'
                                        className='border-gray-300 focus:border-yellow-500 focus:ring-0 rounded-md shadow-sm w-full'
                                        value={data?.step_4?.additional_date_of_arrival}
                                        onChange={(e) => handleInputChange('step_4', 'additional_date_of_arrival', e.target.value)}
                                    />
                                    <InputError message={errors?.['step_4.additional_date_of_arrival']} className='mt-2 font-medium' />

                                </div>
                                <div className="form-item mb-4">
                                    <InputLabel value={'Additional Date of Departure(s)'} />
                                    <input
                                        type='date'
                                        className='border-gray-300 focus:border-yellow-500 focus:ring-0 rounded-md shadow-sm w-full'
                                        value={data?.step_4?.additional_date_of_departure}
                                        onChange={(e) => handleInputChange('step_4', 'additional_date_of_departure', e.target.value)}
                                    />
                                    <InputError message={errors?.['step_4.additional_date_of_departure']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-4">
                                    <InputLabel value={'Mode of transporation'} />
                                    <div className="form-radio-wrapper">
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='additional_mode_of_transportation'
                                                    value={'Air'}
                                                    onChange={(e) => handleInputChange('step_4', 'additional_mode_of_transportation', e.target.value)}
                                                />
                                                <span className='pl-2'>Air</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='additional_mode_of_transportation'
                                                    value={'Land'}
                                                    onChange={(e) => handleInputChange('step_4', 'additional_mode_of_transportation', e.target.value)}
                                                />
                                                <span className='pl-2'>Land</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='additional_mode_of_transportation'
                                                    value={'Others'}
                                                    onChange={(e) => handleInputChange('step_4', 'additional_mode_of_transportation', e.target.value)}
                                                />
                                                <span className='pl-2'>Other</span>
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors?.['step_4.additional_mode_of_transportation']} className='mt-2 font-medium' />
                                    {data?.step_4?.additional_mode_of_transportation === 'Others' && (
                                        <>
                                            <TextInput
                                                className="w-full"
                                                value={data?.step_4?.additional_mode_of_transportation_other}
                                                onChange={(e) => handleInputChange('step_4', 'additional_mode_of_transportation_other', e.target.value)}
                                            />
                                        </>
                                    )}
                                </div>
                                <div className="form-item mb-4">
                                    <InputLabel value={'Do you need MCGI Transport?'} />
                                    <div className="form-radio-wrapper">
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='additional_need_mcgi_transport'
                                                    value={'Yes'}
                                                    onChange={(e) => handleInputChange('step_4', 'additional_need_mcgi_transport', e.target.value)}
                                                />
                                                <span className='pl-2'>Yes</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='additional_need_mcgi_transport'
                                                    value={'No'}
                                                    onChange={(e) => handleInputChange('step_4', 'additional_need_mcgi_transport', e.target.value)}
                                                />
                                                <span className='pl-2'>No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors?.['step_4.additional_need_mcgi_transport']} className='mt-2 font-medium' />
                                </div>
                                <div className="form-item mb-4">
                                    <InputLabel value={'Will you be flying with the same delegates you have listed above?'} />
                                    <div className="form-radio-wrapper">
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='fly_same_location_with_delegates'
                                                    value={'Yes'}
                                                    onChange={(e) => handleInputChange('step_4', 'fly_same_location_with_delegates', e.target.value)}
                                                />
                                                <span className='pl-2'>Yes</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='fly_same_location_with_delegates'
                                                    value={'No'}
                                                    onChange={(e) => handleInputChange('step_4', 'fly_same_location_with_delegates', e.target.value)}
                                                />
                                                <span className='pl-2'>No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors?.['step_4.fly_same_location_with_delegates']} className='mt-2 font-medium' />
                                </div>
                                {data?.step_4?.fly_same_location_with_delegates === 'No' && (
                                    <div className="form-item mb-4">
                                        <InputLabel value={'If you have selected "No", please list down the delegates who will be attending.'} />
                                        <textarea
                                            className="border-gray-300 focus:border-yellow-500 focus:ring-0 rounded-md shadow-sm w-full"
                                            rows={5}
                                            value={data?.step_4?.delegates_names_fly_not_same}
                                            onChange={(e) => handleInputChange('step_4', 'delegates_names_fly_not_same', e.target.value)}
                                        />
                                        <InputError message={errors?.['step_4.delegates_names_fly_not_same']} className='mt-2 font-medium' />
                                    </div>
                                )}
                            </div>

                            {/* Start step 5 */}
                            <div className={`step - 5 font - medium text - [#333] text - lg ${activeStep === 4 ? 'block' : 'hidden'} `}>
                                <div className="form-item mb-4">
                                    <InputLabel value={'Do you need assistance with accomodation?'} />
                                    <div className="form-radio-wrapper">
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='need_accomodation_in_melbourne'
                                                    value={'Yes'}
                                                    onChange={(e) => handleInputChange('step_5', 'need_accomodation_in_melbourne', e.target.value)}
                                                />
                                                <span className='pl-2'>Yes</span>
                                            </label>
                                        </div>
                                        <div className="radio-option-item mb-2">
                                            <label className='font-medium'>
                                                <input
                                                    type='radio'
                                                    name='need_accomodation_in_melbourne'
                                                    value={'No'}
                                                    onChange={(e) => handleInputChange('step_5', 'need_accomodation_in_melbourne', e.target.value)}
                                                />
                                                <span className='pl-2'>No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors?.['step_5.need_accomodation_in_melbourne']} className='mt-2 font-medium' />
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 flex justify-between">
                            <Button onClick={handlePrev} disabled={isFirstStep} className='capitalize font-poppins'>Prev</Button>
                            {!isLastStep && <Button onClick={handleNext} disabled={isLastStep} className='capitalize font-poppins'>Next</Button>}
                            {isLastStep && <Button onClick={handleSubmit} className='capitalize font-poppins' loading={processing}>Submit</Button>}
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    )
}
