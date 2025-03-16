import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Textarea,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { FaSave, FaTimes, FaUsers, FaEdit } from 'react-icons/fa';
import InputError from '@/Components/InputError';
import { format } from 'date-fns';
import EventForm from './Form';

export default function Edit({ event, internalCategories, externalCategories, eventTypes }) {
    const { data, setData, put, processing, errors } = useForm({
        title: event.title || '',
        description: event.description || '',
        location: event.location || '',
        category: event.category || '',
        event_type: event.event_type || eventTypes.internal,
        requires_registration: event.requires_registration ?? true,
        max_attendees: event.max_attendees || 0, 
        featured_image: event.featured_image || '',
        start_date: event.start_date ? new Date(event.start_date) : new Date(),
        end_date: event.end_date ? new Date(event.end_date) : new Date(new Date().setHours(new Date().getHours() + 2)),
    });

    const handleSubmit = (formData) => {
        put(route('admin.events.update', event.id), {
            ...formData,
            start_date: formData.start_date.toISOString(),
            end_date: formData.end_date.toISOString(),
        });
    };

    const tabsData = [
        {
            label: "Event Details",
            value: "details",
            icon: FaEdit,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div>
                        <Input
                            type="text"
                            label="Event Title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <Input
                            type="text"
                            label="Category"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                        />
                        <InputError message={errors.category} className="mt-2" />
                    </div>

                    <div className="md:col-span-2">
                        <Input
                            type="text"
                            label="Location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                        />
                        <InputError message={errors.location} className="mt-2" />
                    </div>

                    <div>
                        <Input
                            type="datetime-local"
                            label="Start Date & Time"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                        />
                        <InputError message={errors.start_date} className="mt-2" />
                    </div>

                    <div>
                        <Input
                            type="datetime-local"
                            label="End Date & Time"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                        />
                        <InputError message={errors.end_date} className="mt-2" />
                    </div>

                    <div className="md:col-span-2">
                        <Textarea
                            label="Description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                </div>
            ),
        },
        {
            label: "Attendees",
            value: "attendees",
            icon: FaUsers,
            content: (
                <div className="mt-8">
                    <div className="mb-6">
                        <Typography variant="h6" color="blue-gray">
                            Registered Attendees ({event.attendances.length})
                        </Typography>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Name
                                        </Typography>
                                    </th>
                                    <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Email
                                        </Typography>
                                    </th>
                                    <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Phone
                                        </Typography>
                                    </th>
                                    <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Locale
                                        </Typography>
                                    </th>
                                    <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Type
                                        </Typography>
                                    </th>
                                    <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Registered At
                                        </Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {event.attendances.map((attendance) => (
                                    <tr key={attendance.id}>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {attendance.name}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {attendance.email}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {attendance.phone}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {attendance.locale}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal capitalize">
                                                {attendance.type}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {format(new Date(attendance.created_at), 'MMM d, yyyy h:mm a')}
                                            </Typography>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Edit Event" />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Edit Event: {event.title}</h1>

                <EventForm
                    event={event}
                    errors={errors}
                    internalCategories={internalCategories}
                    externalCategories={externalCategories}
                    eventTypes={eventTypes}
                    primaryAction={handleSubmit}
                />
            </div>
        </AdminLayout>
    );
} 