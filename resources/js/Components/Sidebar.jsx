import React, { useState, useEffect } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Tooltip,
} from "@material-tailwind/react";

import {
    MdOutlineAlbum,
    MdOutlineLocationOn,
    MdArticle,
    MdOutlineSlideshow,
    MdDashboard,
    MdOutlinePeople,
    MdOutlineSettings,
    MdOutlineAnalytics,
    MdOutlineEmail,
    MdOutlineCalendarMonth,
    MdOutlinePermMedia,
    MdOutlineDescription,
    MdCategory,
    MdOutlineTag,
    MdOutlineCelebration,
    MdOutlineHelp,
    MdPersonOutline,
    MdOutlineAdminPanelSettings,
    MdOutlineFormatListBulleted,
    MdOutlineLocalOffer
} from "react-icons/md";
import { 
    AiOutlineCalendar, 
    AiOutlineDown, 
    AiOutlineRight, 
    AiOutlineGlobal, 
    AiOutlineTeam,
    AiOutlineHome
} from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import { FaUserCog, FaUsers, FaMap } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

import { Link, usePage } from "@inertiajs/react";
import { isUserAllowed } from "@/Utils/Utils";

export default function Sidebar({ current, toggle, setToggle }) {
    const { role, permissions } = usePage().props.auth
    const [open, setOpen] = useState(current);
    const [collapsed, setCollapsed] = useState({});
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const toggleSection = (section) => {
        setCollapsed({
            ...collapsed,
            [section]: !collapsed[section]
        });
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
        // If you need to communicate this to parent components
        if (setToggle) {
            setToggle(!toggle);
        }
    };

    const currentRoute = route().current();
    
    // Group 1: Main navigation
    const mainNavigation = [
        { 
            name: 'Dashboard',
            route: 'dashboard',
            icon: <MdDashboard size={22} className="text-gray-400 group-hover:text-white" />
        },
        { 
            name: 'Admin Dashboard',
            route: 'admin.dashboard',
            icon: <MdOutlineAdminPanelSettings size={22} className="text-gray-400 group-hover:text-white" />,
            role: 'super-admin'
        },
        { 
            name: 'Website',
            route: 'home',
            icon: <AiOutlineGlobal size={22} className="text-gray-400 group-hover:text-white" />,
            target: '_blank'
        }
    ];
    
    // Group 2: Content Management
    const contentItems = [
        {
            name: 'Blog Posts',
            route: 'admin.blogs.index',
            permission: 'create_blog_posts|edit_blog_posts|delete_blogs_posts',
            icon: <MdArticle size={22} className="text-gray-400 group-hover:text-white" />,
            subItems: [
                { name: 'All Posts', route: 'admin.blogs.index' },
                { name: 'Add New', route: 'admin.blogs.add' },
                { name: 'Categories', route: 'admin.blogs.categories.index', permission: 'create_categories|edit_categories|delete_categories' },
                { name: 'Tags', route: 'admin.blogs.tags.index', permission: 'create_tags|edit_tags|delete_tags' }
            ]
        },
        {
            name: 'Events',
            route: 'admin.events.index',
            permission: 'create_events|edit_events|delete_events',
            icon: <MdOutlineCalendarMonth size={22} className="text-gray-400 group-hover:text-white" />,
            subItems: [
                { name: 'All Events', route: 'admin.events.index' },
                { name: 'Create Event', route: 'admin.events.create' },
                { name: 'Attendances', route: 'admin.events.attendances.index' }
            ]
        },
        {
            name: 'Media',
            route: 'admin.album.index',
            permission: 'create_albums|edit_albums|delete_albums',
            icon: <MdOutlinePermMedia size={22} className="text-gray-400 group-hover:text-white" />,
            subItems: [
                { name: 'Albums', route: 'admin.album.index' },
                { name: 'Banners', route: 'admin.banner.index', permission: 'create_banners|edit_banners|delete_banners' }
            ]
        }
    ];
    
    // Group 3: Administration
    const adminItems = [
        {
            name: 'User Management',
            route: 'admin.users.index',
            permission: 'create_users|edit_users|delete_users',
            icon: <MdOutlinePeople size={22} className="text-gray-400 group-hover:text-white" />,
        },
        {
            name: 'Role Management',
            route: 'admin.roles.index',
            permission: 'create_roles|edit_roles|delete_roles',
            icon: <MdOutlineAdminPanelSettings size={22} className="text-gray-400 group-hover:text-white" />,
        },
        {
            name: 'Locations',
            route: 'admin.location.index',
            permission: 'create_church_locations|edit_church_locations|delete_church_locations',
            icon: <MdOutlineLocationOn size={22} className="text-gray-400 group-hover:text-white" />,
        },
        {
            name: 'Locale Settings',
            route: 'admin.locale.index',
            permission: 'create_locale|edit_locale|delete_locale',
            icon: <AiOutlineGlobal size={22} className="text-gray-400 group-hover:text-white" />,
        }
    ];
    
    // Group 4: Communication
    const communicationItems = [
        {
            name: 'Email Templates',
            route: 'admin.email.index',
            permission: 'create_email_templates|edit_email_templates|delete_email_templates',
            icon: <BiMailSend size={22} className="text-gray-400 group-hover:text-white" />,
        }
    ];
    
    // Group 5: Account
    const accountItems = [
        {
            name: 'Profile',
            route: 'profile.edit',
            icon: <MdPersonOutline size={22} className="text-gray-400 group-hover:text-white" />,
        },
        {
            name: 'Settings',
            route: 'profile.edit',
            icon: <MdOutlineSettings size={22} className="text-gray-400 group-hover:text-white" />,
        }
    ];
    
    const isCurrentRoute = (routeName) => {
        return currentRoute === routeName || currentRoute.startsWith(`${routeName}.`);
    };
    
    const isParentActive = (subItems) => {
        if (!subItems) return false;
        return subItems.some(item => isCurrentRoute(item.route));
    };
    
    const renderNavItem = (item, index) => {
        const isActive = isCurrentRoute(item.route);
        const isParentRoute = item.subItems && isParentActive(item.subItems);
        
        // Check permissions if needed
        if (item.permission && !isUserAllowed(permissions, item.permission.split('|'), role)) {
            return null;
        }
        
        // Check role-based access
        if (item.role && role?.name !== item.role) {
            return null;
        }
        
        return (
            <div key={`nav-item-${index}`}>
                {item.subItems ? (
                    <Accordion
                        open={open === index + 1}
                        icon={
                            <div className="mr-3">
                                {open === index + 1 ? (
                                    <AiOutlineDown size={16} className="text-gray-400" />
                                ) : (
                                    <AiOutlineRight size={16} className="text-gray-400" />
                                )}
                            </div>
                        }
                    >
                        <AccordionHeader
                            onClick={() => handleOpen(index + 1)}
                            className={`py-3 border-0 text-base font-medium ${isParentRoute ? 'text-white' : 'text-gray-300'}`}
                        >
                            <ListItemPrefix>
                                {item.icon}
                            </ListItemPrefix>
                            <Typography className={`font-medium text-base ${sidebarCollapsed ? 'hidden' : 'block'}`}>
                                {item.name}
                            </Typography>
                        </AccordionHeader>
                        <AccordionBody className="py-0">
                            <List className="p-0">
                                {item.subItems.map((subItem, subIndex) => {
                                    // Check permissions for subitems if needed
                                    if (subItem.permission && !isUserAllowed(permissions, subItem.permission.split('|'), role)) {
                                        return null;
                                    }
                                    
                                    const isSubActive = isCurrentRoute(subItem.route);
                                    
                                    return (
                                        <Link key={`sub-item-${subIndex}`} href={route(subItem.route)}>
                                            <ListItem className={`pl-10 py-2 ${isSubActive ? 'bg-primary/20 text-white font-medium' : 'text-gray-400 hover:text-white'}`}>
                                                <Typography className="font-normal text-sm">
                                                    {subItem.name}
                                                </Typography>
                                            </ListItem>
                                        </Link>
                                    );
                                })}
                            </List>
                        </AccordionBody>
                    </Accordion>
                ) : (
                    <Link 
                        href={route(item.route)} 
                        target={item.target || '_self'}
                    >
                        <Tooltip
                            content={item.name}
                            placement="right"
                            className={sidebarCollapsed ? 'block' : 'hidden'}
                        >
                            <ListItem 
                                className={`py-3 hover:bg-primary/20 group ${isActive ? 'bg-primary/20 text-white font-medium' : 'text-gray-400 hover:text-white'}`}
                            >
                                <ListItemPrefix>
                                    {item.icon}
                                </ListItemPrefix>
                                <Typography className={`font-medium text-base ${sidebarCollapsed ? 'hidden' : 'block'}`}>
                                    {item.name}
                                </Typography>
                            </ListItem>
                        </Tooltip>
                    </Link>
                )}
            </div>
        );
    };
    
    const renderSection = (title, items, isCollapsed, sectionKey) => {
        // If all items are hidden due to permissions, don't show the section
        const visibleItems = items.filter(item => {
            if (!item.permission) return true;
            return isUserAllowed(permissions, item.permission.split('|'), role);
        });
        
        if (visibleItems.length === 0) return null;
        
        return (
            <div className="mb-4">
                {!sidebarCollapsed && (
                    <div 
                        className="px-4 py-2 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection(sectionKey)}
                    >
                        <Typography className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                            {title}
                        </Typography>
                        <div className="text-gray-500">
                            {isCollapsed ? (
                                <AiOutlineRight size={14} />
                            ) : (
                                <AiOutlineDown size={14} />
                            )}
                        </div>
                    </div>
                )}
                {!isCollapsed && (
                    <List className="p-0">
                        {items.map((item, index) => renderNavItem(item, index))}
                    </List>
                )}
            </div>
        );
    };

    return (
        <div 
            className={`transition-all duration-300 ease-in-out h-full bg-[#212b36] flex flex-col overflow-hidden ${sidebarCollapsed ? 'w-20' : 'w-[20rem]'}`}
        >
            {/* Sidebar header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className={`flex items-center ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
                    {!sidebarCollapsed && (
                        <div className="text-white text-xl font-bold">
                            MCGI Admin
                        </div>
                    )}
                    {sidebarCollapsed && (
                        <div className="text-white text-xl font-bold">
                            M
                        </div>
                    )}
                </div>
                <button 
                    className={`text-gray-400 hover:text-white ${sidebarCollapsed ? 'hidden' : 'block'}`}
                    onClick={toggleSidebar}
                >
                    <AiOutlineLeft size={20} />
                </button>
                <button 
                    className={`text-gray-400 hover:text-white ${sidebarCollapsed ? 'block' : 'hidden'}`}
                    onClick={toggleSidebar}
                >
                    <AiOutlineRight size={20} />
                </button>
            </div>
            
            {/* Sidebar content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
                {/* Main navigation */}
                <List className="p-0 mb-4">
                    {mainNavigation.map((item, index) => renderNavItem(item, index))}
                </List>
                
                {/* Content section */}
                {renderSection('Content', contentItems, collapsed['content'], 'content')}
                
                {/* Administration section */}
                {renderSection('Administration', adminItems, collapsed['admin'], 'admin')}
                
                {/* Communication section */}
                {renderSection('Communication', communicationItems, collapsed['communication'], 'communication')}
                
                {/* Account section */}
                {renderSection('Account', accountItems, collapsed['account'], 'account')}
            </div>
            
            {/* Sidebar footer */}
            {!sidebarCollapsed && (
                <div className="p-4 border-t border-gray-700 mt-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                            {role && role.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <Typography className="text-white text-sm font-medium">
                                {role && role.charAt(0).toUpperCase() + role.slice(1)}
                            </Typography>
                            <Typography className="text-gray-400 text-xs">
                                v1.0.0
                            </Typography>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper components
const AiOutlineLeft = ({ size, className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
    >
        <path d="M15 18l-6-6 6-6" />
    </svg>
);
