import React, { useState, useEffect } from 'react';
import Guest from '@/Layouts/GuestLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { 
    FaMapMarkerAlt, 
    FaCalendarAlt, 
    FaClock, 
    FaUsers, 
    FaCheck, 
    FaShare, 
    FaArrowLeft,
    FaRegCalendarCheck
} from "react-icons/fa";
import { MdLocationOn, MdAccessTime, MdPeople, MdCategory } from "react-icons/md";
import { 
    Button, 
    Card, 
    Typography, 
    Badge, 
    Spinner, 
    Tooltip 
} from '@material-tailwind/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { Radio } from '@material-tailwind/react';

export default function EventDetails({ auth, event, eventTypes, internalCategories, externalCategories, isAuthenticated, userData }) {
    const [attendanceModal, setAttendanceModal] = useState(false);
    const [attendanceRows, setAttendanceRows] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [isQuickCheckingIn, setIsQuickCheckingIn] = useState(false);
    const [attendanceMode, setAttendanceMode] = useState('in-person');

    const randomId = function (length = 6) {
        return Math.random().toString(36).substring(2, length + 2);
    };

    useEffect(() => {
        if (userData && isAuthenticated) {
            // If the user is authenticated, pre-populate a single row with their data
            setAttendanceRows([
                {
                    id: randomId(),
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone || '',
                    locale: userData.locale || '',
                    attendee_type: 'member',
                    attendance_mode: 'in-person'
                }
            ]);
        } else {
            // For guests, start with one empty row
            setAttendanceRows([
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
        }
    }, [userData, isAuthenticated]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const getCategoryName = (category) => {
        if (category) {
            const allCategories = {...internalCategories, ...externalCategories};
            return allCategories[category] || category.replace('_', ' ');
        }
        return '';
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

    const openAttendanceModal = () => {
        // Don't show modal for members attending regular internal events - use quick check-in instead
        if (isAuthenticated && event.is_internal && !event.requires_registration) {
            performQuickCheckIn();
            return;
        }
        
        setAttendanceModal(true);
    };

    const performQuickCheckIn = async () => {
        if (!isAuthenticated) {
            setMessage('You must be logged in to check in.');
            setMessageType('error');
            return;
        }
        
        if (event.has_attended) {
            setMessage('You have already checked in to this event.');
            setMessageType('error');
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
                
                // Update the local event data to show user has attended
                event.has_attended = true;
                event.attendances_count += 1;
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
        // Reset form state
        if (userData && isAuthenticated) {
            setAttendanceRows([
                {
                    id: randomId(),
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone || '',
                    locale: userData.locale || '',
                    attendee_type: 'member',
                    attendance_mode: 'in-person'
                }
            ]);
        } else {
            setAttendanceRows([
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
            if (!row.name || !row.email || !row.phone) {
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
            const response = await router.post(route('event.attendence.store'), {
                event_id: event.id,
                attendenceRows: attendanceRows
            });
            
            setIsSubmitting(false);
            closeAttendanceModal();
            
            // Show success message
            setMessage('Successfully registered for the event!');
            setMessageType('success');
            
            // Update the local event data to show user has attended
            if (isAuthenticated) {
                event.has_attended = true;
            }
            event.attendances_count += attendanceRows.length;
            
        } catch (error) {
            setIsSubmitting(false);
            console.error('Error registering attendance:', error);
            
            // Show error message
            setMessage('Failed to register attendance. Please try again.');
            setMessageType('error');
        }
    };

    const shareEvent = async () => {
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
                console.error('Error sharing:', error);
                // Fallback to copying the link
                copyToClipboard(shareUrl);
            }
        } else {
            // Fallback for browsers that don't support the Web Share API
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
    
    // Calculate event status (upcoming, ongoing, or past)
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
        <Guest>
            <Head title={event.title} />
            
            {/* Alert message */}
            {message && (
                <div className={`fixed top-20 right-4 z-50 w-80 p-4 rounded-lg shadow-lg transition-opacity duration-500 
                    ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Event banner */}
                        {event.featured_image && (
                            <div className="w-full h-72 bg-cover bg-center" style={{ backgroundImage: `url(${event.featured_image})` }}>
                                <div className="w-full h-full bg-black bg-opacity-50 flex items-end">
                                    <div className="p-8">
                                        <h1 className="text-4xl font-bold text-white">{event.title}</h1>
                                        <div className="flex items-center mt-2">
                                            <Badge 
                                                color={event.is_internal ? 'blue' : 'green'} 
                                                className="mr-2"
                                            >
                                                {event.is_internal ? 'Members Only' : 'Open to Guests'}
                                            </Badge>
                                            <Badge 
                                                color={
                                                    eventStatus === 'Upcoming' ? 'blue' : 
                                                    eventStatus === 'Ongoing' ? 'green' : 'gray'
                                                }
                                            >
                                                {eventStatus}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="p-6">
                            {/* Back link */}
                            <Link 
                                href={route('events.index')} 
                                className="inline-flex items-center text-blue-600 hover:underline mb-6"
                            >
                                <FaArrowLeft className="mr-2" />
                                Back to all events
                            </Link>
                            
                            {/* Event title (if no featured image) */}
                            {!event.featured_image && (
                                <div className="mb-6">
                                    <h1 className="text-3xl font-bold">{event.title}</h1>
                                    <div className="flex items-center mt-2">
                                        <Badge 
                                            color={event.is_internal ? 'blue' : 'green'} 
                                            className="mr-2"
                                        >
                                            {event.is_internal ? 'Members Only' : 'Open to Guests'}
                                        </Badge>
                                        <Badge 
                                            color={
                                                eventStatus === 'Upcoming' ? 'blue' : 
                                                eventStatus === 'Ongoing' ? 'green' : 'gray'
                                            }
                                        >
                                            {eventStatus}
                                        </Badge>
                                    </div>
                                </div>
                            )}
                            
                            {!isAuthenticated && event.requires_registration && (
                                <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg mb-6">
                                    <h3 className="text-lg font-semibold text-primary mb-2">Registration Required</h3>
                                    <p className="mb-4">This event requires registration. Please sign in or create an account to register for this event.</p>
                                    <div className="flex gap-4">
                                        <Link 
                                            href={route('login', { event_message: 'Please log in to register for this event' })} 
                                            className="bg-primary text-white px-4 py-2 rounded-md inline-flex items-center hover:bg-primary/90 transition-all"
                                        >
                                            <span>Sign In</span>
                                        </Link>
                                        <Link 
                                            href={route('register')} 
                                            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md inline-flex items-center hover:bg-gray-200 transition-all"
                                        >
                                            <span>Register</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex flex-col md:flex-row">
                                {/* Event details */}
                                <div className="w-full md:w-2/3 pr-0 md:pr-6">
                                    <div className="prose max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: event.description }} />
                                    </div>
                                    
                                    {/* Action buttons */}
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        {isUpcoming && !event.has_attended && (
                                            <>
                                                {isAuthenticated && event.is_internal && !event.requires_registration ? (
                                                    <div>
                                                        <div className="mb-2">
                                                            <div className="flex items-center space-x-3 mb-2">
                                                                <Button 
                                                                    color="blue" 
                                                                    onClick={() => {
                                                                        setAttendanceMode('in-person');
                                                                        performQuickCheckIn();
                                                                    }}
                                                                    disabled={isQuickCheckingIn}
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    <FaRegCalendarCheck />
                                                                    {isQuickCheckingIn ? 'Checking in...' : 'Check in (In-Person)'}
                                                                </Button>
                                                                <Button 
                                                                    color="purple" 
                                                                    onClick={() => {
                                                                        setAttendanceMode('online');
                                                                        performQuickCheckIn();
                                                                    }}
                                                                    disabled={isQuickCheckingIn}
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    <FaRegCalendarCheck />
                                                                    {isQuickCheckingIn ? 'Checking in...' : 'Check in (Online)'}
                                                                </Button>
                                                            </div>
                                                            <Typography variant="small" className="font-normal text-gray-600">
                                                                Quick check-in for members
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Button 
                                                        color="blue" 
                                                        onClick={openAttendanceModal}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <FaRegCalendarCheck />
                                                        {event.requires_registration ? 'Register' : 'Check in'}
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                        
                                        <Button 
                                            variant="outlined" 
                                            color="blue-gray" 
                                            onClick={shareEvent}
                                            className="flex items-center gap-2"
                                        >
                                            <FaShare />
                                            Share Event
                                        </Button>
                                    </div>
                                </div>
                                
                                {/* Event info card */}
                                <div className="w-full md:w-1/3 mt-6 md:mt-0">
                                    <Card className="p-4">
                                        <div className="space-y-3">
                                            <div className="flex items-start">
                                                <div className="p-2 bg-blue-50 rounded-full mr-3">
                                                    <FaCalendarAlt className="text-blue-500" />
                                                </div>
                                                <div>
                                                    <Typography variant="h6" color="blue-gray">Date</Typography>
                                                    <Typography variant="small" className="font-normal">
                                                        {formatDate(event.start_date)}
                                                    </Typography>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start">
                                                <div className="p-2 bg-blue-50 rounded-full mr-3">
                                                    <FaClock className="text-blue-500" />
                                                </div>
                                                <div>
                                                    <Typography variant="h6" color="blue-gray">Time</Typography>
                                                    <Typography variant="small" className="font-normal">
                                                        {formatTime(event.start_date)} - {formatTime(event.end_date)}
                                                    </Typography>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start">
                                                <div className="p-2 bg-blue-50 rounded-full mr-3">
                                                    <FaMapMarkerAlt className="text-blue-500" />
                                                </div>
                                                <div>
                                                    <Typography variant="h6" color="blue-gray">Location</Typography>
                                                    <Typography variant="small" className="font-normal">
                                                        {event.location}
                                                    </Typography>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start">
                                                <div className="p-2 bg-blue-50 rounded-full mr-3">
                                                    <MdCategory className="text-blue-500" />
                                                </div>
                                                <div>
                                                    <Typography variant="h6" color="blue-gray">Category</Typography>
                                                    <Typography variant="small" className="font-normal">
                                                        {getCategoryName(event.category)}
                                                    </Typography>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start">
                                                <div className="p-2 bg-blue-50 rounded-full mr-3">
                                                    <FaUsers className="text-blue-500" />
                                                </div>
                                                <div>
                                                    <Typography variant="h6" color="blue-gray">Attendees</Typography>
                                                    <Typography variant="small" className="font-normal">
                                                        {event.attendances_count} registered
                                                        {event.max_attendees > 0 && ` (max: ${event.max_attendees})`}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Attendance Modal */}
            <Modal show={attendanceModal} onClose={closeAttendanceModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-bold mb-4">
                        {event.requires_registration ? 'Register for Event' : 'Check in to Event'}
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
                                            readOnly={isAuthenticated && row.attendee_type === 'member'}
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
                                            readOnly={isAuthenticated && row.attendee_type === 'member'}
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
                                            readOnly={isAuthenticated && row.attendee_type === 'member'}
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
                                            readOnly={isAuthenticated && row.attendee_type === 'member'}
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
                        
                        {/* Add more button */}
                        {event.requires_registration && (
                            <div className="mb-4">
                                <button
                                    type="button"
                                    onClick={addRow}
                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    <FaPlus className="mr-1" /> Add Another Attendee
                                </button>
                            </div>
                        )}
                        
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
            </Modal>
        </Guest>
    );
} 