import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input,
    Badge,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { 
    FaDownload,
    FaSearch,
    FaArrowLeft,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
    FaEdit,
    FaTrash,
    FaPlus,
} from 'react-icons/fa';
import { format } from 'date-fns';

export default function Attendances({ event, attendances, flash }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [attendeeTypeFilter, setAttendeeTypeFilter] = useState('all');
    const [attendanceModeFilter, setAttendanceModeFilter] = useState('all');
    const [attendances_data, setAttendances] = useState(attendances);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentAttendance, setCurrentAttendance] = useState(null);
    const [checkInLoading, setCheckInLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Filter attendances based on search query and filters
    const filteredAttendances = attendances_data.filter(attendance => {
        const matchesSearch = searchQuery === '' || 
            attendance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (attendance.email && attendance.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (attendance.phone && attendance.phone.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesAttendeeType = attendeeTypeFilter === 'all' || 
            attendance.attendee_type === attendeeTypeFilter;
        
        const matchesAttendanceMode = attendanceModeFilter === 'all' || 
            attendance.attendance_mode === attendanceModeFilter;
        
        return matchesSearch && matchesAttendeeType && matchesAttendanceMode;
    });

    // Calculate stats
    const stats = {
        total: attendances_data.length,
        members: attendances_data.filter(a => a.attendee_type === 'member').length,
        guests: attendances_data.filter(a => a.attendee_type === 'guest').length,
        inPerson: attendances_data.filter(a => a.attendance_mode === 'in-person').length,
        online: attendances_data.filter(a => a.attendance_mode === 'online').length,
        checkedIn: attendances_data.filter(a => a.check_in_time).length
    };

    const handleCheckIn = (id) => {
        if (confirm('Are you sure you want to check in this attendee?')) {
            setCheckInLoading(true);
            router.post(route('admin.events.check-in', { event_id: event.id, attendance_id: id }), {}, {
                onSuccess: () => {
                    setCheckInLoading(false);
                    // Update the local state to reflect the change
                    setAttendances(prevAttendances => 
                        prevAttendances.map(attendance => 
                            attendance.id === id 
                                ? { ...attendance, check_in_time: new Date().toISOString() } 
                                : attendance
                        )
                    );
                },
                onError: () => {
                    setCheckInLoading(false);
                    alert('Error checking in attendee');
                }
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this attendance record?')) {
            setDeleteLoading(true);
            router.delete(route('admin.events.delete-attendance', { event_id: event.id, attendance_id: id }), {
                onSuccess: () => {
                    setDeleteLoading(false);
                    // Remove the deleted attendance from local state
                    setAttendances(prevAttendances => 
                        prevAttendances.filter(attendance => attendance.id !== id)
                    );
                },
                onError: () => {
                    setDeleteLoading(false);
                    alert('Error deleting attendance record');
                }
            });
        }
    };

    const openEditModal = (attendance) => {
        setCurrentAttendance(attendance);
        setShowEditModal(true);
    };

    const getAttendeeTypeColor = (type) => {
        switch (type) {
            case 'member':
                return 'blue';
            case 'guest':
                return 'green';
            default:
                return 'gray';
        }
    };

    const getAttendanceModeColor = (mode) => {
        switch (mode) {
            case 'in-person':
                return 'indigo';
            case 'online':
                return 'purple';
            default:
                return 'gray';
        }
    };

    return (
        <AdminLayout>
            <Head title={`Attendances - ${event.title}`} />

            <div className="container mx-auto px-4 py-8">
                {flash.message && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        {flash.message}
                    </div>
                )}

                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Attendances: {event.title}</h1>
                        <p className="text-gray-600">
                            {format(new Date(event.start_date), 'MMMM dd, yyyy')} at {format(new Date(event.start_date), 'h:mm a')}
                        </p>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <Button 
                            onClick={() => router.get(route('admin.events.export', event.id))}
                            className="flex items-center gap-2"
                            color="blue-gray"
                        >
                            <FaDownload className="h-4 w-4" />
                            Export CSV
                        </Button>
                        <Button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2"
                        >
                            <FaPlus className="h-4 w-4" />
                            Add Attendee
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
                    <Card>
                        <CardBody className="p-4 text-center">
                            <Typography variant="h6" color="blue-gray">Total</Typography>
                            <Typography variant="h4">{stats.total}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4 text-center">
                            <Typography variant="h6" color="blue">Members</Typography>
                            <Typography variant="h4">{stats.members}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4 text-center">
                            <Typography variant="h6" color="green">Guests</Typography>
                            <Typography variant="h4">{stats.guests}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4 text-center">
                            <Typography variant="h6" color="indigo">In-Person</Typography>
                            <Typography variant="h4">{stats.inPerson}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4 text-center">
                            <Typography variant="h6" color="purple">Online</Typography>
                            <Typography variant="h4">{stats.online}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4 text-center">
                            <Typography variant="h6" color="gray">Checked In</Typography>
                            <Typography variant="h4">{stats.checkedIn}</Typography>
                        </CardBody>
                    </Card>
                </div>

                <Card className="mb-8">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:px-4">
                            <div className="w-full md:w-72">
                                <Input
                                    label="Search attendees"
                                    icon={<FaSearch />}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="w-48">
                                    <Select
                                        label="Attendee Type"
                                        value={attendeeTypeFilter}
                                        onChange={(value) => setAttendeeTypeFilter(value)}
                                    >
                                        <Option value="all">All Types</Option>
                                        <Option value="member">Members</Option>
                                        <Option value="guest">Guests</Option>
                                    </Select>
                                </div>
                                <div className="w-48">
                                    <Select
                                        label="Attendance Mode"
                                        value={attendanceModeFilter}
                                        onChange={(value) => setAttendanceModeFilter(value)}
                                    >
                                        <Option value="all">All Modes</Option>
                                        <Option value="in-person">In-Person</Option>
                                        <Option value="online">Online</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody className="px-0">
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
                                                Contact
                                            </Typography>
                                        </th>
                                        <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Type
                                            </Typography>
                                        </th>
                                        <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Mode
                                            </Typography>
                                        </th>
                                        <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Check-In Status
                                            </Typography>
                                        </th>
                                        <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Notes
                                            </Typography>
                                        </th>
                                        <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Actions
                                            </Typography>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAttendances.map((attendance) => (
                                        <tr key={attendance.id}>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                    {attendance.name}
                                                </Typography>
                                                {attendance.user_id && (
                                                    <Badge color="blue" size="sm" className="mt-1">
                                                        Registered User
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {attendance.email && (
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {attendance.email}
                                                    </Typography>
                                                )}
                                                {attendance.phone && (
                                                    <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                                                        {attendance.phone}
                                                    </Typography>
                                                )}
                                                {attendance.locale && (
                                                    <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                                                        Locale: {attendance.locale}
                                                    </Typography>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <Badge 
                                                    color={getAttendeeTypeColor(attendance.attendee_type)} 
                                                    className="capitalize"
                                                >
                                                    {attendance.attendee_type}
                                                </Badge>
                                            </td>
                                            <td className="p-4">
                                                <Badge 
                                                    color={getAttendanceModeColor(attendance.attendance_mode)} 
                                                    className="capitalize"
                                                >
                                                    {attendance.attendance_mode}
                                                </Badge>
                                            </td>
                                            <td className="p-4">
                                                {attendance.check_in_time ? (
                                                    <>
                                                        <Badge color="green">Checked In</Badge>
                                                        <Typography variant="small" className="mt-1 opacity-70">
                                                            {format(new Date(attendance.check_in_time), 'MMM d, h:mm a')}
                                                        </Typography>
                                                    </>
                                                ) : attendance.attendance_mode === 'in-person' ? (
                                                    <Button 
                                                        size="sm"
                                                        color="blue"
                                                        onClick={() => handleCheckIn(attendance.id)}
                                                        disabled={checkInLoading}
                                                    >
                                                        {checkInLoading ? 'Processing...' : 'Check In'}
                                                    </Button>
                                                ) : (
                                                    <Badge color="gray">No Check-In Required</Badge>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" className="opacity-70">
                                                    {attendance.notes || '—'}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Tooltip content="Edit Attendance">
                                                        <IconButton
                                                            variant="text"
                                                            color="blue"
                                                            onClick={() => openEditModal(attendance)}
                                                        >
                                                            <FaEdit className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Delete Attendance">
                                                        <IconButton
                                                            variant="text"
                                                            color="red"
                                                            onClick={() => handleDelete(attendance.id)}
                                                            disabled={deleteLoading}
                                                        >
                                                            <FaTrash className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Add Attendance Modal */}
            {showAddModal && (
                <AddAttendanceModal
                    eventId={event.id}
                    open={showAddModal}
                    handleOpen={() => setShowAddModal(!showAddModal)}
                    onSuccess={(newAttendance) => {
                        setAttendances([...attendances_data, newAttendance]);
                        setShowAddModal(false);
                    }}
                />
            )}

            {/* Edit Attendance Modal */}
            {showEditModal && currentAttendance && (
                <EditAttendanceModal
                    eventId={event.id}
                    attendance={currentAttendance}
                    open={showEditModal}
                    handleOpen={() => setShowEditModal(!showEditModal)}
                    onSuccess={(updatedAttendance) => {
                        setAttendances(attendances_data.map(a => 
                            a.id === updatedAttendance.id ? updatedAttendance : a
                        ));
                        setShowEditModal(false);
                    }}
                />
            )}
        </AdminLayout>
    );
} 