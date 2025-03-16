import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card as MaterialCard, CardBody, Typography, Tooltip, Progress, Spinner, Button } from '@material-tailwind/react';
import { MdArticle, MdDashboard, MdTrendingUp, MdAccessTime, MdOutlineWbSunny, MdArrowUpward, MdArrowDownward, MdCalendarToday, MdArrowForward } from "react-icons/md";
import { FaUsers, FaImages, FaCalendar, FaUser, FaRegBell, FaCheck, FaUserCheck, FaExclamationTriangle } from "react-icons/fa";
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import { useState, useEffect } from 'react';

// Import our custom components
import StatsCard from '@/Components/Dashboard/StatsCard';
import AnalyticsChart from '@/Components/Dashboard/AnalyticsChart';
import RecentTransactions from '@/Components/Dashboard/RecentTransactions';

// Import the dashboard service for data
import { 
    getDashboardStats, 
    getUserGrowthData, 
    getRevenueData, 
    getUserActivityByPlatform,
    getRecentTransactions,
    getSystemNotifications
} from '@/Services/DashboardService';

export default function Dashboard({ auth }) {
    const { count, data } = usePage().props;
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    
    // State for our dashboard data
    const [dashboardStats, setDashboardStats] = useState({});
    const [userGrowthData, setUserGrowthData] = useState({});
    const [revenueData, setRevenueData] = useState({});
    const [platformData, setPlatformData] = useState({});
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Set loading state to true when starting to fetch data
        setIsLoading(true);
        setError(null);
        
        // Set greeting based on time of day
        const hours = new Date().getHours();
        if (hours < 12) {
            setGreeting('Good Morning');
        } else if (hours < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
        
        // Format current time
        const now = new Date();
        setCurrentTime(now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }));
        
        // Create an async function to load all dashboard data
        const loadDashboardData = async () => {
            try {
                // Load all data in parallel using Promise.all
                const [stats, userGrowth, revenue, platform, transactions, notifs] = await Promise.all([
                    getDashboardStats(),
                    getUserGrowthData(selectedTimeRange),
                    getRevenueData(selectedTimeRange),
                    getUserActivityByPlatform(),
                    getRecentTransactions(),
                    getSystemNotifications()
                ]);
                
                // Update state with fetched data
                setDashboardStats(stats);
                setUserGrowthData(userGrowth);
                setRevenueData(revenue);
                setPlatformData(platform);
                setRecentTransactions(transactions);
                setNotifications(notifs);
                setError(null);
            } catch (err) {
                console.error('Error loading dashboard data:', err);
                setError('Failed to load dashboard data. Please refresh the page or try again later.');
            } finally {
                // Set loading to false regardless of success or failure
                setIsLoading(false);
            }
        };
        
        // Call the async function to load data
        loadDashboardData();
        
    }, [selectedTimeRange]);
    
    useEffect(() => {
        // Update chart data when time range changes
        if (!isLoading) {
            setUserGrowthData(getUserGrowthData(selectedTimeRange));
            setRevenueData(getRevenueData(selectedTimeRange));
        }
    }, [selectedTimeRange, isLoading]);

    const calculatePercentageChange = (value, baseValue = 100) => {
        return ((value - baseValue) / baseValue) * 100;
    };
    
    const formatPercentageChange = (value) => {
        return value > 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`;
    };

    const statsCards = [
        { 
            title: 'Total Users', 
            value: count?.users || 0, 
            suffix: 'members', 
            icon: <FaUser className="text-primary text-2xl" />,
            trend: '+5.2%',
            trendDirection: 'up',
            bgColor: 'bg-primary/10' 
        },
        { 
            title: 'Total Articles', 
            value: count?.blogs || 0, 
            suffix: 'posts',
            icon: <MdArticle className="text-secondary text-2xl" />,
            trend: '+2.8%',
            trendDirection: 'up',
            bgColor: 'bg-secondary/10' 
        },
        { 
            title: 'Upcoming Events', 
            value: count?.events || 0, 
            suffix: 'scheduled',
            icon: <FaCalendar className="text-success text-2xl" />,
            trend: '+12.4%',
            trendDirection: 'up',
            bgColor: 'bg-success/10' 
        },
        { 
            title: 'Gallery Images', 
            value: count?.albums || 0, 
            suffix: 'photos',
            icon: <FaImages className="text-warning text-2xl" />,
            trend: '+7.1%',
            trendDirection: 'up',
            bgColor: 'bg-warning/10' 
        },
        { 
            title: 'Event Attendees', 
            value: count?.attendees || 0, 
            suffix: 'attendees',
            icon: <FaUsers className="text-info text-2xl" />,
            trend: '+15.3%',
            trendDirection: 'up',
            bgColor: 'bg-info/10' 
        }
    ];

    const renderGreetingSection = () => (
        <div className="w-full px-6 py-8 bg-white shadow-sm border-b">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <MdOutlineWbSunny className="text-primary text-2xl" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <Badge color="primary" variant="solid" className="mb-2">Admin Dashboard</Badge>
                            <Badge color="secondary" variant="light" className="mb-2">{currentTime}</Badge>
                        </div>
                        <h1 className="font-bold text-gray-800 text-3xl md:text-4xl">{greeting}, {auth.user.first_name}</h1>
                        <p className="text-gray-500 mt-1">Here's what's happening with MCGI today.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Tooltip content="Notifications">
                        <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative">
                            <FaRegBell className="text-gray-700 text-xl" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
                        </button>
                    </Tooltip>
                    <Link 
                        href={route('profile.edit')} 
                        className="flex items-center gap-2 p-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <FaUser className="text-sm" />
                        <span>Profile</span>
                    </Link>
                </div>
            </div>
        </div>
    );

    const renderErrorMessage = () => {
        if (!error) return null;
        
        return (
            <div className="px-6 mt-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <FaExclamationTriangle className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                {error}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderStatCards = () => (
        <div className="px-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Users"
                    value={isLoading ? '-' : (count?.users || dashboardStats?.totalUsers?.value || 0)}
                    suffix="members"
                    icon={<FaUser className="text-primary text-2xl" />}
                    trend={dashboardStats?.totalUsers?.trend || '+5.2%'}
                    trendDirection={dashboardStats?.totalUsers?.trendDirection || 'up'}
                    bgColor="bg-primary/10"
                    infoTooltip={`Compared to ${dashboardStats?.totalUsers?.comparedTo || 'last period'}`}
                    isLoading={isLoading}
                />
                
                <StatsCard
                    title="Active Users"
                    value={isLoading ? '-' : (dashboardStats?.activeUsers?.value || 0)}
                    suffix="active now"
                    icon={<FaUserCheck className="text-secondary text-2xl" />}
                    trend={dashboardStats?.activeUsers?.trend || '+8.2%'}
                    trendDirection={dashboardStats?.activeUsers?.trendDirection || 'up'}
                    bgColor="bg-secondary/10"
                    infoTooltip={`Compared to ${dashboardStats?.activeUsers?.comparedTo || 'last period'}`}
                    isLoading={isLoading}
                />
                
                <StatsCard
                    title="Total Revenue"
                    value={isLoading ? '-' : (dashboardStats?.totalRevenue?.formatted || '$142,568')}
                    icon={<MdTrendingUp className="text-success text-2xl" />}
                    trend={dashboardStats?.totalRevenue?.trend || '+22.5%'}
                    trendDirection={dashboardStats?.totalRevenue?.trendDirection || 'up'}
                    bgColor="bg-success/10"
                    infoTooltip={`Compared to ${dashboardStats?.totalRevenue?.comparedTo || 'last period'}`}
                    isLoading={isLoading}
                />
                
                <StatsCard
                    title="Conversion Rate"
                    value={isLoading ? '-' : (dashboardStats?.conversionRate?.value || 3.6)}
                    suffix="%"
                    icon={<MdArrowUpward className="text-warning text-2xl" />}
                    trend={dashboardStats?.conversionRate?.trend || '-0.8%'}
                    trendDirection={dashboardStats?.conversionRate?.trendDirection || 'down'}
                    bgColor="bg-warning/10"
                    infoTooltip={`Compared to ${dashboardStats?.conversionRate?.comparedTo || 'last period'}`}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );

    const renderDashboardTabs = () => (
        <div className="px-6 mt-8">
            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                <button 
                    className={`py-3 px-6 text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button 
                    className={`py-3 px-6 text-sm font-medium whitespace-nowrap ${activeTab === 'analytics' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('analytics')}
                >
                    Analytics
                </button>
                <button 
                    className={`py-3 px-6 text-sm font-medium whitespace-nowrap ${activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button 
                    className={`py-3 px-6 text-sm font-medium whitespace-nowrap ${activeTab === 'events' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('events')}
                >
                    Events
                </button>
                <button 
                    className={`py-3 px-6 text-sm font-medium whitespace-nowrap ${activeTab === 'reports' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('reports')}
                >
                    Reports
                </button>
            </div>
        </div>
    );

    const renderUserApprovalSection = () => (
        <div className="px-6 mt-4">
            <Card className="border-none bg-white">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <FaUserCheck className="text-primary text-xl" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Users Awaiting Approval</h2>
                        </div>
                        <Badge color="warning" variant="light" className="text-xs">3 Pending</Badge>
                    </div>
                    
                    {isLoading ? (
                        <div className="animate-pulse">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-200 rounded-md mb-3"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left py-3 px-4 text-gray-600 text-xs font-medium uppercase">User</th>
                                        <th className="text-left py-3 px-4 text-gray-600 text-xs font-medium uppercase">Email</th>
                                        <th className="text-left py-3 px-4 text-gray-600 text-xs font-medium uppercase">Date Registered</th>
                                        <th className="text-right py-3 px-4 text-gray-600 text-xs font-medium uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: 1, name: 'John Doe', email: 'john.doe@example.com', date: '2023-06-15' },
                                        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', date: '2023-06-16' },
                                        { id: 3, name: 'Robert Johnson', email: 'robert.johnson@example.com', date: '2023-06-17' }
                                    ].map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors border-t border-gray-200">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                                                        {user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-gray-800">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">{user.email}</td>
                                            <td className="py-3 px-4 text-gray-600">{user.date}</td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="px-3 py-1 bg-green-100 text-green-600 rounded-md text-xs font-medium hover:bg-green-200 transition-colors">
                                                        Approve
                                                    </button>
                                                    <button className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-xs font-medium hover:bg-red-200 transition-colors">
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );

    const renderChartSection = () => (
        <div className="px-6 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart
                    title="User Growth"
                    subTitle="New user registrations over time"
                    type="line"
                    data={userGrowthData}
                    timeRanges={['7d', '30d', '90d']}
                    defaultTimeRange={selectedTimeRange}
                    isLoading={isLoading}
                />
                
                <AnalyticsChart
                    title="Revenue"
                    subTitle="Revenue generated over time"
                    type="line"
                    data={revenueData}
                    timeRanges={['7d', '30d', '90d']}
                    defaultTimeRange={selectedTimeRange}
                    isLoading={isLoading}
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2">
                    <RecentTransactions 
                        transactions={recentTransactions}
                        isLoading={isLoading}
                        onViewAll={() => alert('View all transactions')}
                    />
                </div>
                
                <div>
                    <AnalyticsChart
                        title="User Activity by Platform"
                        subTitle="Distribution of user sessions"
                        type="doughnut"
                        data={platformData}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );

    const renderRecentActivity = () => (
        <div className="px-6 mt-6 mb-8">
            <Card className="border-none bg-white">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-info/10 p-2 rounded-lg">
                                <MdAccessTime className="text-info text-xl" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
                        </div>
                        <Link href="#" className="text-primary hover:underline text-sm font-medium">
                            View All
                        </Link>
                    </div>
                    
                    {isLoading ? (
                        <div className="animate-pulse">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-16 bg-gray-200 rounded-md mb-3"></div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {[
                                { id: 1, user: 'John Doe', action: 'created a new post', target: 'Sunday Worship Guidelines', time: '2 hours ago', icon: <MdArticle />, color: 'bg-blue-500' },
                                { id: 2, user: 'Admin', action: 'approved', target: '3 new users', time: '4 hours ago', icon: <FaUserCheck />, color: 'bg-green-500' },
                                { id: 3, user: 'Jane Smith', action: 'scheduled a new event', target: 'Community Outreach', time: '6 hours ago', icon: <MdCalendarToday />, color: 'bg-purple-500' },
                                { id: 4, user: 'System', action: 'alert', target: 'Server maintenance scheduled', time: '8 hours ago', icon: <FaExclamationTriangle />, color: 'bg-amber-500' }
                            ].map(activity => (
                                <div key={activity.id} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                                    <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center text-white`}>
                                        {activity.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-800">
                                            <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                                        </p>
                                        <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );

    const renderLatestEventsAndUsers = () => (
        <div className="px-6 mt-6">
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <Card className="border-none bg-white">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-secondary/10 p-2 rounded-lg">
                                    <FaCalendar className="text-secondary text-xl" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Latest Events</h2>
                            </div>
                            <Link href={route('admin.events.index')} className="text-primary hover:underline text-sm font-medium">
                                View All
                            </Link>
                        </div>
                        
                        {isLoading ? (
                            <div className="animate-pulse">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-12 bg-gray-200 rounded-md mb-3"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left py-3 px-4 text-gray-600 text-xs font-medium uppercase">Event</th>
                                            <th className="text-left py-3 px-4 text-gray-600 text-xs font-medium uppercase">Date</th>
                                            <th className="text-right py-3 px-4 text-gray-600 text-xs font-medium uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.events?.length > 0 ? 
                                            data?.events?.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50 transition-colors border-t border-gray-200">
                                                    <td className="py-3 px-4">
                                                        <Link href={route('admin.events.view', item.id)} className="font-medium text-gray-800 hover:text-primary">
                                                            {item.title}
                                                        </Link>
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-600">{new Date(item.date).toLocaleDateString()}</td>
                                                    <td className="py-3 px-4 text-right">
                                                        <Badge color="success" variant="light" size="sm">Active</Badge>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={3} className="py-4 text-center text-gray-500">No events found</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </Card>
                
                <Card className="border-none bg-white">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <FaUser className="text-primary text-xl" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Latest Users</h2>
                            </div>
                            <Link href={route('admin.users.index')} className="text-primary hover:underline text-sm font-medium">
                                View All
                            </Link>
                        </div>
                        
                        {isLoading ? (
                            <div className="animate-pulse">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-12 bg-gray-200 rounded-md mb-3"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left py-3 px-4 text-gray-600 text-xs font-medium uppercase">User</th>
                                            <th className="text-left py-3 px-4 text-gray-600 text-xs font-medium uppercase hidden lg:table-cell">Email</th>
                                            <th className="text-right py-3 px-4 text-gray-600 text-xs font-medium uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.users?.length > 0 ? 
                                            data?.users?.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50 transition-colors border-t border-gray-200">
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                                                                {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                                                            </div>
                                                            <Link href="#" className="font-medium text-gray-800 hover:text-primary">
                                                                {`${user.first_name} ${user.last_name}`}
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-600 hidden lg:table-cell">{user.email}</td>
                                                    <td className="py-3 px-4 text-right">
                                                        <Badge 
                                                            color={user.admin_approved ? "success" : "warning"} 
                                                            variant="light" 
                                                            size="sm"
                                                        >
                                                            {user.admin_approved ? "Approved" : "Pending"}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={3} className="py-4 text-center text-gray-500">No users found</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
    
    const QuickActionCard = ({ icon, title, description, linkText, linkUrl, color }) => (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="p-6">
                <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
                    {icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm mb-4">{description}</p>
                <Link 
                    href={linkUrl} 
                    className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                >
                    {linkText}
                    <MdArrowForward />
                </Link>
            </div>
        </div>
    );

    const renderQuickActions = () => (
        <div className="px-6 mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickActionCard 
                    icon={<MdArticle className="text-white text-xl" />}
                    title="Create New Post"
                    description="Add a new blog post to the website"
                    linkText="Create Post"
                    linkUrl={route('admin.blogs.add')}
                    color="bg-primary"
                />
                <QuickActionCard 
                    icon={<FaCalendar className="text-white text-xl" />}
                    title="Schedule Event"
                    description="Create a new event for the community"
                    linkText="Create Event"
                    linkUrl={route('admin.events.create')}
                    color="bg-secondary"
                />
                <QuickActionCard 
                    icon={<FaUserCheck className="text-white text-xl" />}
                    title="Manage Users"
                    description="Review and manage user accounts"
                    linkText="View Users"
                    linkUrl={route('admin.users.index')}
                    color="bg-success"
                />
                <QuickActionCard 
                    icon={<FaImages className="text-white text-xl" />}
                    title="Upload Media"
                    description="Add new images to the gallery"
                    linkText="Manage Gallery"
                    linkUrl={route('admin.album.index')}
                    color="bg-info"
                />
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="main-content w-full bg-gray-50 min-h-screen pb-8">
                {renderGreetingSection()}
                {renderErrorMessage()}
                {renderStatCards()}
                {renderDashboardTabs()}
                
                {activeTab === 'overview' && (
                    <>
                        {renderQuickActions()}
                        {renderChartSection()}
                        {renderRecentActivity()}
                    </>
                )}
                
                {activeTab === 'analytics' && (
                    <div className="px-6 mt-6">
                        {renderChartSection()}
                    </div>
                )}
                
                {activeTab === 'users' && (
                    <>
                        {renderUserApprovalSection()}
                    </>
                )}
                
                {activeTab === 'events' && (
                    <div className="px-6 mt-6">
                        <Card className="border-none bg-white p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Event Management</h2>
                            {/* Add event management components here */}
                            <p className="text-gray-600">Detailed event management features coming soon...</p>
                        </Card>
                    </div>
                )}
                
                {activeTab === 'reports' && (
                    <div className="px-6 mt-6">
                        <Card className="border-none bg-white p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Reports & Analytics</h2>
                            {/* Add reporting components here */}
                            <p className="text-gray-600">Advanced reporting features coming soon...</p>
                        </Card>
                    </div>
                )}
                
                {renderLatestEventsAndUsers()}
            </div>
        </AuthenticatedLayout>
    );
}
