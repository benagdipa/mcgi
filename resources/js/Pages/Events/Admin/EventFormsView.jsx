import React from 'react'
import { Head, Link } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Card, Typography } from '@material-tailwind/react';

export default function EventFormsView({ auth, event_form }) {
    const step_1 = JSON.parse(event_form?.step_1);
    const step_2 = JSON.parse(event_form?.step_2);
    const step_3 = JSON.parse(event_form?.step_3);
    const step_4 = JSON.parse(event_form?.step_4);
    const step_5 = JSON.parse(event_form?.step_5);
    return (
        <Authenticated user={auth?.user}>
            <Head title="Forms" />
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Form Details</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.events.index')}>Events</Link></li>
                                <li>/</li>
                                <li><Link href={'#'}>Forms</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-content pt-8">
                <Card className="h-full w-full overflow-scroll rounded-none font-poppins">
                    <table className='w-full min-w-max table-auto text-left'>
                        <thead>
                            <tr>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer transition-colors"></th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer transition-colors">Labels</th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer transition-colors">Values</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>Email Address</Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_1?.email}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        By ticking “I Agree”, I voluntarily give my consent to MCGI in collecting,processing, recording, using,<br /> and retaining my personal information for the above-mentioned purpose in accordance with this Privacy Notice.
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_1?.privacy_accept}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        I have read and fully understood the guidelines in the June/July Event Registration (Australia only) where the personal information<br /> collected will be used for registration for the event to be conducted by MCGI Australia, and I hereby consent to MCGI’s processing of my personal information.
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_1?.consent_personal_info}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Full Name
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_2?.full_name}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Phone Number (Including Country Code)
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_2?.phone_number}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Facebook Messenger Name
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_2?.messenger_name}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Events
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        {step_2?.events?.length > 0 && step_2?.events?.map((item, index) => {
                                            return (
                                                <span key={index} className='block mb-2'>{item}</span>
                                            )
                                        })}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Total Number of Delegates (Including You)
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_2?.total_delegates}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Names of Accompanying Delagates (please indicate if any guests included)
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_2?.names_delegates}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Total Number of Adults
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_2?.total_adults}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Total Number of Kids
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_2?.total_kids}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Do all delegates listed plan go to all selected locations?
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_2?.delegates_plan}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Do you have more than one ARRIVAL dates to Melbourne?
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_3?.more_arrival}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Date of FIRST Arrival to Melbourne
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_3?.first_arrival}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Date of LAST Departure from Melbourne
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_3?.last_departure}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Mode of transporation
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_3?.mode_of_transportation}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        If you chose "Air", please provide the flight number
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_3?.flight_number}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Do you need MCGI Transport?
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_3?.need_mcgi_transport}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Does your travel companion require a car seat/baby booster?
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_3?.seat_baby_booster}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Additional Date of Arrival(s)
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_4?.additional_date_of_arrival}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Additional Date of Departure(s)
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_4?.additional_date_of_departure}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Mode of transporation
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_4?.additional_mode_of_transportation}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Mode of transporation (If Others is selected)
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_4?.additional_mode_of_transportation_other}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Do you need MCGI Transport?
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_4?.additional_need_mcgi_transport}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Will you be flying with the same delegates you have listed above?
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_4?.fly_same_location_with_delegates}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        If you have selected "No", please list down the delegates who will be attending.
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_4?.delegates_names_fly_not_same}</Typography></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='border-b border-blue-gray-50 p-4'>
                                    <Typography variant='small' color='blue-gray' className='font-medium'>
                                        Do you need assistance with accomodation?
                                    </Typography></td>
                                <td className='border-b border-blue-gray-50 p-4'><Typography variant='small' color='blue-gray' className='font-medium'>{step_5?.need_accomodation_in_melbourne}</Typography></td>
                            </tr>
                        </tbody>
                    </table>

                </Card>
            </div>
        </Authenticated>
    )
}
