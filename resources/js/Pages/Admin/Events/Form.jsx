import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Button } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, Option } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EventForm({
    event = null,
    errors = {},
    internalCategories = {},
    externalCategories = {},
    eventTypes = {},
    primaryAction
}) {
    const [form, setForm] = useState({
        title: event?.title || '',
        description: event?.description || '',
        location: event?.location || '',
        category: event?.category || '',
        start_date: event?.start_date ? new Date(event.start_date) : new Date(),
        end_date: event?.end_date ? new Date(event.end_date) : new Date(new Date().setHours(new Date().getHours() + 2)),
        event_type: event?.event_type || eventTypes.internal,
        requires_registration: event?.requires_registration ?? true,
        max_attendees: event?.max_attendees || 0,
        featured_image: event?.featured_image || '',
    });

    const [processing, setProcessing] = useState(false);
    const [dateError, setDateError] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleDateChange = (name, date) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: date,
        }));

        // Validate that end_date is after start_date
        if (name === 'end_date' && form.start_date > date) {
            setDateError('End date must be after start date');
        } else if (name === 'start_date' && date > form.end_date) {
            setDateError('Start date must be before end date');
        } else {
            setDateError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (dateError) {
            alert('Please fix date errors before submitting.');
            return;
        }

        setProcessing(true);
        
        primaryAction(form);
    };

    const allCategories = form.event_type === eventTypes.internal ? internalCategories : externalCategories;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="overflow-visible">
                <CardBody className="p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="col-span-1 md:col-span-2">
                            <Input
                                type="text"
                                name="title"
                                label="Event Title"
                                value={form.title}
                                onChange={handleInputChange}
                                error={errors.title}
                                required
                            />
                            {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <Textarea
                                name="description"
                                label="Event Description"
                                value={form.description}
                                onChange={handleInputChange}
                                error={errors.description}
                                rows={4}
                                required
                            />
                            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                        </div>
                        
                        <div>
                            <Select
                                name="event_type"
                                label="Event Type"
                                value={form.event_type}
                                onChange={(value) => {
                                    setForm({
                                        ...form,
                                        event_type: value,
                                        // Reset category when changing event type
                                        category: ''
                                    });
                                }}
                                error={errors.event_type}
                                required
                            >
                                <Option value={eventTypes.internal}>Internal (Members Only)</Option>
                                <Option value={eventTypes.external}>External (Open to Guests)</Option>
                            </Select>
                            {errors.event_type && <span className="text-red-500 text-sm">{errors.event_type}</span>}
                        </div>
                        
                        <div>
                            <Select
                                name="category"
                                label="Event Category"
                                value={form.category}
                                onChange={(value) => setForm({ ...form, category: value })}
                                error={errors.category}
                                required
                            >
                                {Object.entries(allCategories).map(([key, value]) => (
                                    <Option key={key} value={key}>{value}</Option>
                                ))}
                            </Select>
                            {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
                        </div>
                        
                        <div>
                            <Input
                                type="text"
                                name="location"
                                label="Event Location"
                                value={form.location}
                                onChange={handleInputChange}
                                error={errors.location}
                                required
                            />
                            {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}
                        </div>
                        
                        <div>
                            <Input
                                type="text"
                                name="featured_image"
                                label="Featured Image URL"
                                value={form.featured_image}
                                onChange={handleInputChange}
                                error={errors.featured_image}
                            />
                            {errors.featured_image && <span className="text-red-500 text-sm">{errors.featured_image}</span>}
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Start Date and Time
                            </label>
                            <ReactDatePicker
                                selected={form.start_date}
                                onChange={(date) => handleDateChange('start_date', date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.start_date && <span className="text-red-500 text-sm">{errors.start_date}</span>}
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                End Date and Time
                            </label>
                            <ReactDatePicker
                                selected={form.end_date}
                                onChange={(date) => handleDateChange('end_date', date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.end_date && <span className="text-red-500 text-sm">{errors.end_date}</span>}
                            {dateError && <span className="text-red-500 text-sm">{dateError}</span>}
                        </div>
                        
                        <div className="col-span-1">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    name="requires_registration"
                                    checked={form.requires_registration}
                                    onChange={handleInputChange}
                                    error={errors.requires_registration}
                                />
                                <label htmlFor="requires_registration" className="text-gray-700">
                                    Requires Registration
                                </label>
                            </div>
                            {errors.requires_registration && <span className="text-red-500 text-sm">{errors.requires_registration}</span>}
                        </div>
                        
                        <div>
                            <Input
                                type="number"
                                name="max_attendees"
                                label="Maximum Attendees (0 = unlimited)"
                                value={form.max_attendees}
                                onChange={handleInputChange}
                                error={errors.max_attendees}
                                disabled={!form.requires_registration}
                                min="0"
                            />
                            {errors.max_attendees && <span className="text-red-500 text-sm">{errors.max_attendees}</span>}
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex justify-end pt-0">
                    <Button type="submit" disabled={processing || dateError !== ''}>
                        {processing ? "Processing..." : event ? "Update Event" : "Create Event"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
} 