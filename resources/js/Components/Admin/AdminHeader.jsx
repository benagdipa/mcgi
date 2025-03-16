import React, { useState } from 'react'
import Dropdown from '../Dropdown'
import { Link } from '@inertiajs/react'
import { 
    AiOutlineBell, 
    AiOutlineDown, 
    AiOutlineUser, 
    AiOutlineMenu, 
    AiOutlineSearch,
    AiOutlineSetting,
    AiOutlineLogout
} from "react-icons/ai";
import { Badge, Tooltip } from '@material-tailwind/react'
import ApplicationLogo from '../ApplicationLogo'

export default function AdminHeader({ user, onSetToggleHandler }) {
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    
    // Dummy notifications for the prototype
    const notifications = [
        { id: 1, type: 'info', message: 'New user registered', time: '2 hours ago', read: false },
        { id: 2, type: 'warning', message: 'Server maintenance scheduled', time: '1 day ago', read: false },
        { id: 3, type: 'success', message: 'Backup completed successfully', time: '2 days ago', read: true }
    ];
    
    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
        console.log('Searching for:', searchQuery);
    };
    
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };
    
    const getNotificationIcon = (type) => {
        switch(type) {
            case 'warning':
                return <span className="bg-amber-100 text-amber-600 p-2 rounded-full">⚠️</span>;
            case 'success':
                return <span className="bg-green-100 text-green-600 p-2 rounded-full">✓</span>;
            case 'info':
            default:
                return <span className="bg-blue-100 text-blue-600 p-2 rounded-full">ℹ️</span>;
        }
    };
    
    return (
        <div className='admin-header w-full sticky top-0 flex items-center py-3 lg:px-6 px-3 border-b font-poppins bg-white z-50 shadow-sm'>
            <div className="left lg:w-[20rem] flex items-center gap-4">
                <button 
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                    onClick={onSetToggleHandler}
                >
                    <AiOutlineMenu size={24} />
                </button>
                <ApplicationLogo className="h-8 w-auto" />
            </div>
            <div className="right flex lg:justify-between justify-end gap-4 w-full">
                <div className={`search-container relative ${showSearchBox ? 'md:w-80' : 'md:w-40'} transition-all duration-300`}>
                    <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className={`rounded-full border-gray-300 pr-10 focus:ring-primary focus:border-primary ${showSearchBox ? 'w-full pl-4' : 'w-40 pl-4'} transition-all duration-300`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSearchBox(true)}
                            onBlur={() => setTimeout(() => setShowSearchBox(false), 200)}
                        />
                        <button 
                            type="submit" 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
                        >
                            <AiOutlineSearch size={20} />
                        </button>
                    </form>
                </div>
                <div className="flex gap-2 items-center justify-end">
                    <div className="relative">
                        <Tooltip content="Notifications">
                            <button 
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors relative"
                                onClick={toggleNotifications}
                            >
                                <AiOutlineBell size={20} className="text-gray-600" />
                                {notifications.filter(n => !n.read).length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {notifications.filter(n => !n.read).length}
                                    </span>
                                )}
                            </button>
                        </Tooltip>
                        
                        {/* Notifications dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-gray-700">Notifications</h3>
                                        <button className="text-xs text-primary hover:underline">
                                            Mark all as read
                                        </button>
                                    </div>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map(notification => (
                                            <div 
                                                key={notification.id} 
                                                className={`px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50/50' : ''}`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    {getNotificationIcon(notification.type)}
                                                    <div>
                                                        <p className={`text-sm ${!notification.read ? 'font-medium' : 'text-gray-700'}`}>
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-6 text-center text-gray-500">
                                            No notifications
                                        </div>
                                    )}
                                </div>
                                <div className="px-4 py-2 border-t border-gray-100">
                                    <Link href="#" className="text-primary text-sm hover:underline block text-center">
                                        View all notifications
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {user && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                                        {user.first_name.charAt(0)}{user.last_name ? user.last_name.charAt(0) : ''}
                                    </div>
                                    <span className="hidden md:inline-block font-medium text-gray-700">
                                        {user.first_name}
                                    </span>
                                    <AiOutlineDown size={16} className="text-gray-500" />
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content width="48">
                                <div className="p-2 border-b border-gray-100">
                                    <div className="font-medium text-gray-800">{user.first_name} {user.last_name}</div>
                                    <div className="text-xs text-gray-500">{user.email}</div>
                                </div>
                                <Dropdown.Link href={route('dashboard')} className="flex items-center gap-2">
                                    <AiOutlineUser size={16} />
                                    Dashboard
                                </Dropdown.Link>
                                <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2">
                                    <AiOutlineSetting size={16} />
                                    Profile Settings
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center gap-2 text-red-600">
                                    <AiOutlineLogout size={16} />
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </div>
            </div>
        </div>
    )
}
