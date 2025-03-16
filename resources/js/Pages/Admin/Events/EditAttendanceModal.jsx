import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Textarea,
    Select,
    Option,
    Checkbox,
} from '@material-tailwind/react';
import { format } from 'date-fns';

export default function EditAttendanceModal({ eventId, attendance, open, handleOpen, onSuccess }) {
    const [form, setForm] = useState({
        name: attendance.name || '',
        email: attendance.email || '',
        phone: attendance.phone || '',
        locale: attendance.locale || '',
        attendee_type: attendance.attendee_type || 'guest',
        attendance_mode: attendance.attendance_mode || 'in-person',
        notes: attendance.notes || '',
        check_in_time: attendance.check_in_time || null,
    });
    
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [updateCheckIn, setUpdateCheckIn] = useState(false);

    useEffect(() => {
        // Update form when attendance changes
        setForm({
            name: attendance.name || '',
            email: attendance.email || '',
            phone: attendance.phone || '',
            locale: attendance.locale || '',
            attendee_type: attendance.attendee_type || 'guest',
            attendance_mode: attendance.attendance_mode || 'in-person',
            notes: attendance.notes || '',
            check_in_time: attendance.check_in_time || null,
        });
    }, [attendance]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
        
        // Clear errors when field is updated
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSelectChange = (name, value) => {
        setForm({ ...form, [name]: value });
        
        // Clear errors when field is updated
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const validate = () => {
        const newErrors = {};
        
        if (!form.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Email format is invalid';
        }
        
        if (form.phone && !/^\+?[0-9\s-()]+$/.test(form.phone)) {
            newErrors.phone = 'Phone format is invalid';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validate()) {
            return;
        }
        
        setProcessing(true);
        
        // Handle check-in status
        let formData = { ...form };
        
        if (updateCheckIn) {
            formData.check_in_time = formData.check_in_time ? null : new Date().toISOString();
        }
        
        router.put(route('admin.events.update-attendance', { event_id: eventId, attendance_id: attendance.id }), formData, {
            onSuccess: (page) => {
                setProcessing(false);
                // Create an updated attendance object that matches the expected structure
                const updatedAttendance = {
                    ...attendance,
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    locale: form.locale,
                    attendee_type: form.attendee_type,
                    attendance_mode: form.attendance_mode,
                    notes: form.notes,
                    check_in_time: updateCheckIn 
                        ? (attendance.check_in_time ? null : new Date().toISOString()) 
                        : attendance.check_in_time,
                    updated_at: new Date().toISOString(),
                };
                
                onSuccess(updatedAttendance);
            },
            onError: (errors) => {
                setProcessing(false);
                setErrors(errors);
            }
        });
    };

    return (
        <Dialog
            size="md"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
        >
            <form onSubmit={handleSubmit}>
                <Card className="mx-auto w-full">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Edit Attendance Record
                        </Typography>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-1 md:col-span-2">
                                <Input
                                    type="text"
                                    name="name"
                                    label="Full Name *"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    error={!!errors.name}
                                />
                                {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                            </div>
                            
                            <div>
                                <Input
                                    type="email"
                                    name="email"
                                    label="Email Address"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    error={!!errors.email}
                                />
                                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                            </div>
                            
                            <div>
                                <Input
                                    type="tel"
                                    name="phone"
                                    label="Phone Number"
                                    value={form.phone}
                                    onChange={handleInputChange}
                                    error={!!errors.phone}
                                />
                                {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
                            </div>
                            
                            <div>
                                <Input
                                    type="text"
                                    name="locale"
                                    label="Locale/Region"
                                    value={form.locale}
                                    onChange={handleInputChange}
                                    error={!!errors.locale}
                                />
                                {errors.locale && <span className="text-red-500 text-xs">{errors.locale}</span>}
                            </div>
                            
                            <div>
                                <Select
                                    label="Attendee Type"
                                    name="attendee_type"
                                    value={form.attendee_type}
                                    onChange={(value) => handleSelectChange('attendee_type', value)}
                                    error={!!errors.attendee_type}
                                >
                                    <Option value="member">Member</Option>
                                    <Option value="guest">Guest</Option>
                                </Select>
                                {errors.attendee_type && <span className="text-red-500 text-xs">{errors.attendee_type}</span>}
                            </div>
                            
                            <div>
                                <Select
                                    label="Attendance Mode"
                                    name="attendance_mode"
                                    value={form.attendance_mode}
                                    onChange={(value) => handleSelectChange('attendance_mode', value)}
                                    error={!!errors.attendance_mode}
                                >
                                    <Option value="in-person">In-Person</Option>
                                    <Option value="online">Online</Option>
                                </Select>
                                {errors.attendance_mode && <span className="text-red-500 text-xs">{errors.attendance_mode}</span>}
                            </div>
                            
                            <div className="col-span-1 md:col-span-2">
                                <Textarea
                                    name="notes"
                                    label="Notes"
                                    value={form.notes}
                                    onChange={handleInputChange}
                                    error={!!errors.notes}
                                />
                                {errors.notes && <span className="text-red-500 text-xs">{errors.notes}</span>}
                            </div>
                            
                            {form.attendance_mode === 'in-person' && (
                                <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                                    <Checkbox
                                        id="check-in-toggle"
                                        checked={updateCheckIn}
                                        onChange={() => setUpdateCheckIn(!updateCheckIn)}
                                    />
                                    <label htmlFor="check-in-toggle" className="text-sm">
                                        {attendance.check_in_time 
                                            ? `Remove check-in (currently checked in at ${format(new Date(attendance.check_in_time), 'MMM d, h:mm a')})` 
                                            : 'Mark as checked in'}
                                    </label>
                                </div>
                            )}
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-end gap-2">
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? "Saving..." : "Update Attendance"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Dialog>
    );
} 