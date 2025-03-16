import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import Guest from '@/Layouts/GuestLayout'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaCheck, FaPlus, FaTrash, FaShare, FaSearch, FaCalendarDay, FaListUl, FaEye, FaRegCalendarCheck } from "react-icons/fa";
import { MdLocationOn, MdAccessTime, MdPeople, MdCategory } from "react-icons/md";
import WOW from 'react-wow';
import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import React, { useState, useMemo, useEffect } from 'react'
import { format, getYear, isAfter, isBefore, parseISO } from 'date-fns';
import { Radio, Typography, Spinner, Tooltip, Select, Option, Button } from '@material-tailwind/react';
import Calendar from '@/Components/Calendar';

export default function EventsPage({ auth, events: initialEvents, locale, flash, eventTypes, internalCategories, externalCategories, isAuthenticated, userData }) {
    const { errors: pageErrors } = usePage().props;
    const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [attendanceModal, setAttendanceModal] = useState(false);
    const [message, setMessage] = useState(flash?.message || '');
    const [messageType, setMessageType] = useState('success');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [attendanceRows, setAttendanceRows] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isQuickCheckingIn, setIsQuickCheckingIn] = useState(false);
    const [attendanceMode, setAttendanceMode] = useState('in-person');
    
    // State for events and filtering
    const [events, setEvents] = useState(initialEvents);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedEventType, setSelectedEventType] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    
    // Extract unique categories from events
    const categories = useMemo(() => {
        const categorySet = new Set(['all']);
        events.forEach(event => {
            if (event.category) {
                categorySet.add(event.category);
            }
        });
        return Array.from(categorySet);
    }, [events]);

    // Filter events based on selected filters
    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
            const matchesEventType = selectedEventType === 'all' || 
                (selectedEventType === eventTypes.internal && event.is_internal) || 
                (selectedEventType === eventTypes.external && event.is_external);
            
            return matchesCategory && matchesEventType;
        });
    }, [events, selectedCategory, selectedEventType, eventTypes]);

    // Initialize attendance rows based on user authentication
    useEffect(() => {
        if (userData && isAuthenticated) {
            // Pre-fill with member data if authenticated
            setAttendanceRows([{
                id: randomId(),
                name: userData.name,
                email: userData.email,
                phone: userData.phone || '',
                locale: userData.locale || '',
                attendee_type: 'member',
                attendance_mode: 'in-person'
            }]);
        } else {
            // Start with an empty form for guests
            setAttendanceRows([{
                id: randomId(),
                name: '',
                email: '',
                phone: '',
                locale: '',
                attendee_type: 'guest',
                attendance_mode: 'in-person'
            }]);
        }
    }, [userData, isAuthenticated]);

    // Refresh events data from the server
    const refreshEvents = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(route('events.data'));
            const data = await response.json();
            
            if (data.events) {
                setEvents(data.events);
            }
        } catch (error) {
            console.error('Error fetching events data:', error);
            setMessage('Failed to refresh events data');
            setMessageType('error');
        } finally {
            setIsLoading(false);
        }
    };

    const randomId = function (length = 6) {
        return Math.random().toString(36).substring(2, length + 2);
    };

    const addRow = () => {
        setAttendanceRows([
            ...attendanceRows,
            {
                id: randomId(),
                name: '',
                email: '',
                phone: '',
                locale: '',
                attendee_type: 'guest',
                attendance_mode: 'in-person'
            }
        ]);
    };

    const removeRow = (id) => {
        setAttendanceRows(attendanceRows.filter(row => row.id !== id));
    };

    const openAttendanceModal = (event_id) => {
        const event = events.find(e => e.id === event_id);
        if (!event) return;
        
        setSelectedEvent(event);
        
        // Don't show modal for members attending regular internal events - use quick check-in instead
        if (isAuthenticated && event.is_internal && !event.requires_registration) {
            performQuickCheckIn(event);
            return;
        }
        
        // Check if the event is internal and user is not authenticated
        if (event.is_internal && !isAuthenticated) {
            window.location.href = route('login');
            return;
        }
        
        // Check if the event has already been attended by the user
        if (event.has_attended) {
            setMessage('You have already registered for this event');
            setMessageType('info');
            return;
        }
        
        // Check if the event has reached maximum attendees
        if (event.max_attendees && event.attendances_count >= event.max_attendees) {
            setMessage('This event has reached its maximum capacity');
            setMessageType('error');
            return;
        }
        
        setAttendanceModal(true);
    };

    // Perform quick check-in for members
    const performQuickCheckIn = async (event) => {
        if (!isAuthenticated) {
            setMessage('You must be logged in to check in');
            setMessageType('error');
            return;
        }
        
        if (event.has_attended) {
            setMessage('You have already checked in to this event');
            setMessageType('info');
            return;
        }
        
        setIsQuickCheckingIn(true);
        
        try {
            const response = await fetch(route('event.quick.check.in'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    event_id: event.id,
                    attendance_mode: attendanceMode
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setMessage(data.message);
                setMessageType('success');
                
                // Update the local state to show user has attended
                setEvents(prevEvents => 
                    prevEvents.map(e => 
                        e.id === event.id 
                            ? { ...e, has_attended: true, attendances_count: e.attendances_count + 1 } 
                            : e
                    )
                );
            } else {
                setMessage(data.message || 'Failed to check in. Please try again.');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Error during quick check-in:', error);
            setMessage('An error occurred during check-in. Please try again.');
            setMessageType('error');
        } finally {
            setIsQuickCheckingIn(false);
        }
    };

    const closeAttendanceModal = () => {
        setAttendanceModal(false);
        setSelectedEvent(null);
        
        // Reset form state
        if (userData && isAuthenticated) {
            setAttendanceRows([{
                id: randomId(),
                name: userData.name,
                email: userData.email,
                phone: userData.phone || '',
                locale: userData.locale || '',
                attendee_type: 'member',
                attendance_mode: 'in-person'
            }]);
        } else {
            setAttendanceRows([{
                id: randomId(),
                name: '',
                email: '',
                phone: '',
                locale: '',
                attendee_type: 'guest',
                attendance_mode: 'in-person'
            }]);
        }
    };

    const handleChange = (id, field, value) => {
        setAttendanceRows(attendanceRows.map(row => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        }));
    };

    const validateForm = () => {
        let isValid = true;
        
        attendanceRows.forEach(row => {
            if (!row.name || !row.email || !row.phone || !row.locale) {
                isValid = false;
            }
            
            if (row.email && !/\S+@\S+\.\S+/.test(row.email)) {
                isValid = false;
            }
        });
        
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            alert("Please fill in all required fields with valid information.");
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            await router.post(route('event.attendence.store'), {
                event_id: selectedEvent.id,
                attendenceRows: attendanceRows
            });
            
            setIsSubmitting(false);
            closeAttendanceModal();
            
            // Show success message
            setMessage('Successfully registered for the event!');
            setMessageType('success');
            
            // Update event in local state to reflect registration
            setEvents(prevEvents => 
                prevEvents.map(e => 
                    e.id === selectedEvent.id 
                        ? { 
                            ...e, 
                            has_attended: isAuthenticated, 
                            attendances_count: e.attendances_count + attendanceRows.length 
                        } 
                        : e
                )
            );
            
        } catch (error) {
            setIsSubmitting(false);
            console.error('Error registering attendance:', error);
            
            // Show error message
            setMessage('Failed to register attendance. Please try again.');
            setMessageType('error');
        }
    };

    const shareEvent = async (event) => {
        const shareUrl = route('events.share', event.id);
        
        // Check if the Web Share API is available
        if (navigator.share) {
            try {
                await navigator.share({
                    title: event.title,
                    text: event.description,
                    url: shareUrl,
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error sharing:', error);
                    copyToClipboard(shareUrl);
                }
            }
        } else {
            // Fallback to copying the link
            copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('Link copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    function formatDateRange(start_date_str, end_date_str) {
        const start_date = new Date(start_date_str);
        const end_date = new Date(end_date_str);
        
        return `${format(start_date, 'MMM d, yyyy')} • ${format(start_date, 'h:mm a')} - ${format(end_date, 'h:mm a')}`;
    }

    const getCategoryName = (category) => {
        if (category) {
            const allCategories = {...internalCategories, ...externalCategories};
            return allCategories[category] || category.replace('_', ' ');
        }
        return '';
    };

    return (
        <Guest>
            <Head title="Church Events" />
            
            {/* Alert message */}
            {message && (
                <div className={`fixed top-20 right-4 z-50 w-80 p-4 rounded-lg shadow-lg transition-opacity duration-500 
                    ${messageType === 'success' ? 'bg-green-500' : 
                    messageType === 'error' ? 'bg-red-500' : 
                    'bg-blue-500'} text-white`}>
                    <p>{message}</p>
                    <button 
                        className="absolute top-2 right-2 text-white"
                        onClick={() => setMessage('')}
                    >
                        ×
                    </button>
                </div>
            )}
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-3xl font-bold mb-6">Church Events</h1>
                        
                        {/* Filters */}
                        <div className="mb-8 flex flex-wrap gap-4">
                            <div className="w-full md:w-auto">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Categories</option>
                                    {Object.entries({...internalCategories, ...externalCategories}).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="w-full md:w-auto">
                                <select
                                    value={selectedEventType}
                                    onChange={(e) => setSelectedEventType(e.target.value)}
                                    className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Event Types</option>
                                    <option value={eventTypes.internal}>Members Only</option>
                                    <option value={eventTypes.external}>Open to Guests</option>
                                </select>
                            </div>
                            
                            <button
                                onClick={refreshEvents}
                                className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <Spinner className="h-4 w-4 mr-2" />
                                        Refreshing...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <FaSearch className="mr-2" />
                                        Refresh Events
                                    </span>
                                )}
                            </button>
                        </div>
                        
                        {/* Events Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.length > 0 ? filteredEvents.map(event => {
                                // Calculate event status
                                const now = new Date();
                                const startDate = new Date(event.start_date);
                                const endDate = new Date(event.end_date);
                                
                                let eventStatus;
                                let isUpcoming = false;
                                
                                if (now < startDate) {
                                    eventStatus = 'Upcoming';
                                    isUpcoming = true;
                                } else if (now >= startDate && now <= endDate) {
                                    eventStatus = 'Ongoing';
                                } else {
                                    eventStatus = 'Past';
                                }
                                
                                return (
                                    <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
                                        {/* Event image or placeholder */}
                                        {event.featured_image ? (
                                            <div 
                                                className="h-48 bg-cover bg-center"
                                                style={{ backgroundImage: `url(${event.featured_image})` }}
                                            ></div>
                                        ) : (
                                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                                <FaCalendarDay className="text-gray-400 h-16 w-16" />
                                            </div>
                                        )}
                                        
                                        <div className="p-4 flex-grow">
                                            {/* Event status badges */}
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <Badge 
                                                    color={event.is_internal ? 'blue' : 'green'} 
                                                    className="text-xs"
                                                >
                                                    {event.is_internal ? 'Members Only' : 'Open to Guests'}
                                                </Badge>
                                                
                                                <Badge 
                                                    color={
                                                        eventStatus === 'Upcoming' ? 'blue' : 
                                                        eventStatus === 'Ongoing' ? 'green' : 'gray'
                                                    }
                                                    className="text-xs"
                                                >
                                                    {eventStatus}
                                                </Badge>
                                            </div>
                                            
                                            {/* Event title */}
                                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                            
                                            {/* Event category */}
                                            <p className="text-sm text-gray-600 mb-4">
                                                <MdCategory className="inline mr-1" />
                                                {getCategoryName(event.category)}
                                            </p>
                                            
                                            {/* Event details */}
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-start">
                                                    <FaCalendarAlt className="text-blue-500 mt-1 mr-2" />
                                                    <span className="text-sm">
                                                        {formatDateRange(event.start_date, event.end_date)}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-start">
                                                    <FaMapMarkerAlt className="text-blue-500 mt-1 mr-2" />
                                                    <span className="text-sm">{event.location}</span>
                                                </div>
                                                
                                                <div className="flex items-start">
                                                    <FaUsers className="text-blue-500 mt-1 mr-2" />
                                                    <span className="text-sm">
                                                        {event.attendances_count} registered
                                                        {event.max_attendees > 0 && ` (max: ${event.max_attendees})`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Event actions */}
                                        <div className="px-4 pb-4 pt-0 mt-auto">
                                            {/* Already attended indicator */}
                                            {event.has_attended && (
                                                <div className="mb-2 text-center text-sm text-green-600 flex items-center justify-center">
                                                    <FaCheck className="mr-1" />
                                                    You're registered for this event
                                                </div>
                                            )}
                                            
                                            <div className="flex flex-wrap gap-2">
                                                <Link 
                                                    href={route('events.show', event.id)}
                                                    className="flex-1 px-4 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                                                >
                                                    <FaEye className="mr-2" />
                                                    View Details
                                                </Link>
                                                
                                                {isUpcoming && !event.has_attended && (
                                                    <>
                                                        {isAuthenticated && event.is_internal && !event.requires_registration ? (
                                                            <button
                                                                onClick={() => openAttendanceModal(event.id)}
                                                                disabled={isQuickCheckingIn}
                                                                className="flex-1 px-4 py-2 text-center bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
                                                            >
                                                                <FaRegCalendarCheck className="mr-2" />
                                                                {isQuickCheckingIn ? 'Checking in...' : 'Quick Check-in'}
                                                            </button>
                                                        ) : (
                                                            event.requires_registration && (
                                                                <button
                                                                    onClick={() => openAttendanceModal(event.id)}
                                                                    className="flex-1 px-4 py-2 text-center bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
                                                                >
                                                                    <FaRegCalendarCheck className="mr-2" />
                                                                    Register
                                                                </button>
                                                            )
                                                        )}
                                                    </>
                                                )}
                                                
                                                <button
                                                    onClick={() => shareEvent(event)}
                                                    className="w-10 px-0 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center justify-center"
                                                >
                                                    <FaShare />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="col-span-full text-center py-12">
                                    <FaCalendarDay className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
                                    <p className="text-gray-500">
                                        Try changing your filters or check back later for upcoming events.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Attendance Modal */}
            <Modal show={attendanceModal} onClose={closeAttendanceModal} maxWidth="md">
                {selectedEvent && (
                    <div className="p-6">
                        <h2 className="text-lg font-bold mb-4">
                            Register for: {selectedEvent.title}
                        </h2>
                        
                        <form onSubmit={handleSubmit}>
                            {attendanceRows.map((row, index) => (
                                <div key={row.id} className="mb-6 p-4 border rounded-lg bg-gray-50">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-md font-semibold">Attendee #{index + 1}</h3>
                                        
                                        {attendanceRows.length > 1 && (
                                            <button 
                                                type="button"
                                                onClick={() => removeRow(row.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name*
                                            </label>
                                            <input
                                                type="text"
                                                value={row.name}
                                                onChange={(e) => handleChange(row.id, 'name', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                                required
                                                readOnly={isAuthenticated && row.attendee_type === 'member' && index === 0}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email*
                                            </label>
                                            <input
                                                type="email"
                                                value={row.email}
                                                onChange={(e) => handleChange(row.id, 'email', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                                required
                                                readOnly={isAuthenticated && row.attendee_type === 'member' && index === 0}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone*
                                            </label>
                                            <input
                                                type="tel"
                                                value={row.phone}
                                                onChange={(e) => handleChange(row.id, 'phone', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                                required
                                                readOnly={isAuthenticated && row.attendee_type === 'member' && index === 0}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Locale/Region*
                                            </label>
                                            <input
                                                type="text"
                                                value={row.locale}
                                                onChange={(e) => handleChange(row.id, 'locale', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                                required
                                                readOnly={isAuthenticated && row.attendee_type === 'member' && index === 0}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Attendee Type
                                            </label>
                                            <select
                                                value={row.attendee_type}
                                                onChange={(e) => handleChange(row.id, 'attendee_type', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                                disabled={isAuthenticated && index === 0}
                                            >
                                                <option value="member">Member</option>
                                                <option value="guest">Guest</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Attendance Mode
                                            </label>
                                            <select
                                                value={row.attendance_mode}
                                                onChange={(e) => handleChange(row.id, 'attendance_mode', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                            >
                                                <option value="in-person">In-Person</option>
                                                <option value="online">Online</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Add more attendees button */}
                            <div className="mb-4">
                                <button
                                    type="button"
                                    onClick={addRow}
                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    <FaPlus className="mr-1" /> Add Another Attendee
                                </button>
                            </div>
                            
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={closeAttendanceModal}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Spinner className="mr-2 h-4 w-4" /> Processing...
                                        </>
                                    ) : (
                                        <>
                                            <FaCheck className="mr-2" /> Submit
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </Modal>
        </Guest>
    );
}
