import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    FaPlus, 
    FaEdit, 
    FaTrash, 
    FaEye, 
    FaDownload, 
    FaCalendarAlt,
    FaFilter,
    FaSearch,
    FaUsers
} from 'react-icons/fa';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    IconButton,
    Tooltip,
    Input,
    Select,
    Option,
    Badge,
} from "@material-tailwind/react";
import { format } from 'date-fns';

export default function Index({ events, stats, flash, eventTypes, internalCategories, externalCategories }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [eventTypeFilter, setEventTypeFilter] = useState('all');
    const [sortField, setSortField] = useState('start_date');
    const [sortDirection, setSortDirection] = useState('desc');

    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming':
                return 'blue';
            case 'ongoing':
                return 'green';
            case 'completed':
                return 'gray';
            default:
                return 'blue-gray';
        }
    };

    // Get the event category display name
    const getCategoryName = (category) => {
        if (category) {
            const allCategories = {...internalCategories, ...externalCategories};
            return allCategories[category] || category.replace('_', ' ');
        }
        return '';
    };

    const filteredEvents = events
        .filter(event => {
            const matchesSearch = searchQuery === '' || 
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.category.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
            
            const matchesEventType = eventTypeFilter === 'all' || 
                (eventTypeFilter === eventTypes.internal && event.is_internal) || 
                (eventTypeFilter === eventTypes.external && event.is_external);
            
            return matchesSearch && matchesStatus && matchesEventType;
        })
        .sort((a, b) => {
            let comparison = 0;
            switch (sortField) {
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
                case 'start_date':
                    comparison = new Date(a.start_date) - new Date(b.start_date);
                    break;
                case 'attendances':
                    comparison = a.attendances_count - b.attendances_count;
                    break;
                default:
                    comparison = 0;
            }
            return sortDirection === 'asc' ? comparison : -comparison;
        });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(route('admin.events.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Events Management" />

            <div className="container mx-auto px-4 py-8">
                {flash.message && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        {flash.message}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <Card>
                        <CardBody className="p-4">
                            <Typography variant="h6" color="blue-gray">Total Events</Typography>
                            <Typography variant="h3">{stats.total}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4">
                            <Typography variant="h6" color="blue">Upcoming</Typography>
                            <Typography variant="h3">{stats.upcoming}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4">
                            <Typography variant="h6" color="green">Ongoing</Typography>
                            <Typography variant="h3">{stats.ongoing}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4">
                            <Typography variant="h6" color="gray">Completed</Typography>
                            <Typography variant="h3">{stats.completed}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4">
                            <Typography variant="h6" color="blue">Internal</Typography>
                            <Typography variant="h3">{stats.internal}</Typography>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4">
                            <Typography variant="h6" color="green">External</Typography>
                            <Typography variant="h3">{stats.external}</Typography>
                        </CardBody>
                    </Card>
                </div>

                {/* Attendance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardBody className="p-4 flex items-center">
                            <div className="rounded-full bg-blue-50 p-3 mr-4">
                                <FaUsers className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <Typography variant="h6" color="blue-gray">Total Attendees</Typography>
                                <Typography variant="h3">{stats.total_attendances}</Typography>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4 flex items-center">
                            <div className="rounded-full bg-blue-50 p-3 mr-4">
                                <FaUsers className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <Typography variant="h6" color="blue-gray">Members</Typography>
                                <Typography variant="h3">{stats.member_attendances}</Typography>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4 flex items-center">
                            <div className="rounded-full bg-green-50 p-3 mr-4">
                                <FaUsers className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <Typography variant="h6" color="blue-gray">Guests</Typography>
                                <Typography variant="h3">{stats.guest_attendances}</Typography>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="p-4 flex justify-between">
                            <div className="flex items-center">
                                <div className="rounded-full bg-blue-50 p-3 mr-4">
                                    <FaUsers className="h-6 w-6 text-blue-500" />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">In-Person</Typography>
                                    <Typography variant="h4">{stats.in_person_attendances}</Typography>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="rounded-full bg-blue-50 p-3 mr-4">
                                    <FaUsers className="h-6 w-6 text-blue-500" />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">Online</Typography>
                                    <Typography variant="h4">{stats.online_attendances}</Typography>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <Card className="mb-8">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:px-4">
                            <div className="w-full md:w-72">
                                <Input
                                    label="Search events"
                                    icon={<FaSearch />}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="w-48">
                                    <Select
                                        label="Filter by status"
                                        value={statusFilter}
                                        onChange={(value) => setStatusFilter(value)}
                                    >
                                        <Option value="all">All Statuses</Option>
                                        <Option value="upcoming">Upcoming</Option>
                                        <Option value="ongoing">Ongoing</Option>
                                        <Option value="completed">Completed</Option>
                                    </Select>
                                </div>
                                <div className="w-48">
                                    <Select
                                        label="Filter by event type"
                                        value={eventTypeFilter}
                                        onChange={(value) => setEventTypeFilter(value)}
                                    >
                                        <Option value="all">All Types</Option>
                                        <Option value={eventTypes.internal}>Internal (Members Only)</Option>
                                        <Option value={eventTypes.external}>External (Open to Guests)</Option>
                                    </Select>
                                </div>
                                <Link href={route('admin.events.create')}>
                                    <Button className="flex items-center gap-2">
                                        <FaPlus className="h-4 w-4" />
                                        Add Event
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody className="px-0">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th 
                                            className="cursor-pointer border-b border-gray-100 bg-gray-50/50 p-4"
                                            onClick={() => handleSort('title')}
                                        >
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                                            </Typography>
                                        </th>
                                        <th 
                                            className="cursor-pointer border-b border-gray-100 bg-gray-50/50 p-4"
                                            onClick={() => handleSort('start_date')}
                                        >
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Date {sortField === 'start_date' && (sortDirection === 'asc' ? '↑' : '↓')}
                                            </Typography>
                                        </th>
                                        <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Location
                                            </Typography>
                                        </th>
                                        <th className="border-b border-gray-100 bg-gray-50/50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Type/Status
                                            </Typography>
                                        </th>
                                        <th 
                                            className="cursor-pointer border-b border-gray-100 bg-gray-50/50 p-4"
                                            onClick={() => handleSort('attendances')}
                                        >
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Attendees {sortField === 'attendances' && (sortDirection === 'asc' ? '↑' : '↓')}
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
                                    {filteredEvents.map((event) => (
                                        <tr key={event.id}>
                                            <td className="p-4">
                                                <div>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {event.title}
                                                    </Typography>
                                                    <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                                                        {getCategoryName(event.category)}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {format(new Date(event.start_date), 'MMM d, yyyy')}
                                                </Typography>
                                                <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                                                    {format(new Date(event.start_date), 'h:mm a')}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {event.location}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col gap-2">
                                                    <Badge color={getStatusColor(event.status)} className="capitalize">
                                                        {event.status}
                                                    </Badge>
                                                    <Badge color={event.is_internal ? 'blue' : 'green'} variant="gradient" className="capitalize">
                                                        {event.is_internal ? 'Members Only' : 'Open to Guests'}
                                                    </Badge>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {event.attendances_count}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Tooltip content="View Attendees">
                                                        <Link href={route('admin.events.attendances', event.id)}>
                                                            <IconButton variant="text" color="blue">
                                                                <FaEye className="h-4 w-4" />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip content="Edit Event">
                                                        <Link href={route('admin.events.edit', event.id)}>
                                                            <IconButton variant="text" color="green">
                                                                <FaEdit className="h-4 w-4" />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip content="Export Attendees">
                                                        <Link href={route('admin.events.export', event.id)}>
                                                            <IconButton variant="text" color="blue-gray">
                                                                <FaDownload className="h-4 w-4" />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip content="Delete Event">
                                                        <IconButton 
                                                            variant="text" 
                                                            color="red"
                                                            onClick={() => handleDelete(event.id)}
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
        </AdminLayout>
    );
} 