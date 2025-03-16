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
} from "@material-tailwind/react";
import { FaSave, FaTimes } from 'react-icons/fa';
import InputError from '@/Components/InputError';
import EventForm from './Form';

export default function Create({ internalCategories, externalCategories, eventTypes }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        location: '',
        category: '',
        event_type: eventTypes.internal,
        requires_registration: true,
        max_attendees: 0,
        featured_image: '',
        start_date: new Date(),
        end_date: new Date(new Date().setHours(new Date().getHours() + 2)),
    });

    const handleSubmit = (formData) => {
        post(route('admin.events.store'), {
            ...formData,
            start_date: formData.start_date.toISOString(),
            end_date: formData.end_date.toISOString(),
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Event" />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Create New Event</h1>

                <EventForm
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