import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/Card";
import { FaUsers, FaCalendarAlt, FaBlog, FaImages, FaCog, FaUserShield, FaChartLine, FaDatabase } from "react-icons/fa";

export default function AdminDashboard({ auth, count, data }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={(
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Super Admin Dashboard
                </h2>
            )}
        >
            <Head title="Super Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6 flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaUsers className="h-8 w-8 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                                    <p className="text-3xl font-bold text-gray-800">{count.users}</p>
                                </div>
                            </div>
                        </Card>
                        
                        <Card className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6 flex items-start gap-4">
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <FaBlog className="h-8 w-8 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                                    <p className="text-3xl font-bold text-gray-800">{count.blogs}</p>
                                </div>
                            </div>
                        </Card>
                        
                        <Card className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6 flex items-start gap-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <FaCalendarAlt className="h-8 w-8 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Events</p>
                                    <p className="text-3xl font-bold text-gray-800">{count.events}</p>
                                </div>
                            </div>
                        </Card>
                        
                        <Card className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6 flex items-start gap-4">
                                <div className="bg-amber-100 p-3 rounded-full">
                                    <FaImages className="h-8 w-8 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Albums</p>
                                    <p className="text-3xl font-bold text-gray-800">{count.albums}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                    
                    {/* Admin Controls */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">System Administration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <Card className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <FaUserShield className="h-6 w-6 text-blue-600 mr-2" />
                                    <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
                                </div>
                                <p className="text-gray-600 mb-4">Manage user accounts, roles, and permissions</p>
                                <a href="/admin/users" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                                    Manage Users
                                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                        </Card>
                        
                        <Card className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <FaDatabase className="h-6 w-6 text-purple-600 mr-2" />
                                    <h3 className="text-lg font-semibold text-gray-800">Content Management</h3>
                                </div>
                                <p className="text-gray-600 mb-4">Manage all content including blogs and media</p>
                                <a href="/dashboard/blogs" className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800">
                                    Manage Content
                                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                        </Card>
                        
                        <Card className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <FaCog className="h-6 w-6 text-gray-600 mr-2" />
                                    <h3 className="text-lg font-semibold text-gray-800">System Settings</h3>
                                </div>
                                <p className="text-gray-600 mb-4">Configure system-wide settings and preferences</p>
                                <a href="/admin/settings" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                                    System Settings
                                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                        </Card>
                    </div>
                    
                    {/* Recent Activity */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="bg-white overflow-hidden shadow-sm">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Users</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {data.users.map((user) => (
                                                <tr key={user.id}>
                                                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {user.first_name} {user.last_name}
                                                    </td>
                                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                                        {user.email}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Card>
                        
                        <Card className="bg-white overflow-hidden shadow-sm">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Content</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-md font-medium text-gray-800 mb-2">Latest Blog Posts</h4>
                                        <ul className="space-y-2">
                                            {data.blogs.map((blog) => (
                                                <li key={blog.id} className="text-sm text-gray-600">
                                                    {blog.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-md font-medium text-gray-800 mb-2">Upcoming Events</h4>
                                        <ul className="space-y-2">
                                            {data.events.map((event) => (
                                                <li key={event.id} className="text-sm text-gray-600">
                                                    {event.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 