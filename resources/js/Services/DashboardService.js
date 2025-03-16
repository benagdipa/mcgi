/**
 * Dashboard Service - Provides data for the admin dashboard
 * In a real application, these functions would fetch data from an API
 */
import axios from 'axios';

// Helper function to determine if we should use real API or mock data
const useRealApi = () => {
    // Here you can add logic to determine when to use real API vs mock data
    // For example, based on environment, URL parameter, or feature flag
    return process.env.NODE_ENV === 'production' || window.location.search.includes('use_real_api=true');
};

// Get statistics for the dashboard
export async function getDashboardStats() {
    if (useRealApi()) {
        try {
            const response = await axios.get('/api/admin/dashboard/stats');
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            return getMockDashboardStats();
        }
    }
    
    return getMockDashboardStats();
}

// Get user growth data
export async function getUserGrowthData(timeRange = '30d') {
    if (useRealApi()) {
        try {
            const response = await axios.get(`/api/admin/dashboard/user-growth?timeRange=${timeRange}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user growth data:', error);
            return getMockUserGrowthData(timeRange);
        }
    }
    
    return getMockUserGrowthData(timeRange);
}

// Get revenue data
export async function getRevenueData(timeRange = '30d') {
    if (useRealApi()) {
        try {
            const response = await axios.get(`/api/admin/dashboard/revenue?timeRange=${timeRange}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching revenue data:', error);
            return getMockRevenueData(timeRange);
        }
    }
    
    return getMockRevenueData(timeRange);
}

// Get user activity by platform data
export async function getUserActivityByPlatform() {
    if (useRealApi()) {
        try {
            const response = await axios.get('/api/admin/dashboard/platform-activity');
            return response.data;
        } catch (error) {
            console.error('Error fetching platform activity data:', error);
            return getMockUserActivityByPlatform();
        }
    }
    
    return getMockUserActivityByPlatform();
}

// Get recent transactions
export async function getRecentTransactions() {
    if (useRealApi()) {
        try {
            const response = await axios.get('/api/admin/dashboard/recent-transactions');
            return response.data;
        } catch (error) {
            console.error('Error fetching recent transactions:', error);
            return getMockRecentTransactions();
        }
    }
    
    return getMockRecentTransactions();
}

// Get system notifications
export async function getSystemNotifications() {
    if (useRealApi()) {
        try {
            const response = await axios.get('/api/admin/dashboard/notifications');
            return response.data;
        } catch (error) {
            console.error('Error fetching system notifications:', error);
            return getMockSystemNotifications();
        }
    }
    
    return getMockSystemNotifications();
}

// Mock data functions
function getMockDashboardStats() {
    return {
        totalUsers: {
            value: 5842,
            trend: '+12.5%',
            trendDirection: 'up',
            comparedTo: 'Last month'
        },
        activeUsers: {
            value: 3254,
            trend: '+8.2%',
            trendDirection: 'up',
            comparedTo: 'Last month'
        },
        totalRevenue: {
            value: 142568,
            formatted: '$142,568',
            trend: '+22.5%',
            trendDirection: 'up',
            comparedTo: 'Last month'
        },
        conversionRate: {
            value: 3.6,
            trend: '-0.8%',
            trendDirection: 'down',
            comparedTo: 'Last month'
        }
    };
}

function getMockUserGrowthData(timeRange = '30d') {
    // Different data based on selected time range
    const data = {
        '7d': {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'New Users',
                    data: [45, 52, 38, 64, 71, 48, 56],
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true,
                    tension: 0.4,
                }
            ]
        },
        '30d': {
            labels: Array.from({ length: 30 }, (_, i) => i + 1),
            datasets: [
                {
                    label: 'New Users',
                    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 20),
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true,
                    tension: 0.4,
                }
            ]
        },
        '90d': {
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [
                {
                    label: 'New Users',
                    data: [1245, 1580, 1822],
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true,
                    tension: 0.4,
                }
            ]
        }
    };

    return data[timeRange] || data['30d'];
}

function getMockRevenueData(timeRange = '30d') {
    // Different data based on selected time range
    const data = {
        '7d': {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [4500, 5200, 3800, 6400, 7100, 4800, 5600],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4,
                }
            ]
        },
        '30d': {
            labels: Array.from({ length: 30 }, (_, i) => i + 1),
            datasets: [
                {
                    label: 'Revenue',
                    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10000) + 2000),
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4,
                }
            ]
        },
        '90d': {
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [124500, 158000, 182200],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4,
                }
            ]
        }
    };

    return data[timeRange] || data['30d'];
}

function getMockUserActivityByPlatform() {
    return {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [
            {
                data: [62, 28, 10],
                backgroundColor: [
                    'rgba(79, 70, 229, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(249, 115, 22, 0.8)',
                ],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ]
    };
}

function getMockRecentTransactions() {
    return [
        {
            id: 'TRX-001',
            user: 'John Smith',
            userEmail: 'john.smith@example.com',
            amount: 125.95,
            status: 'completed',
            date: '2023-06-15T10:24:00Z'
        },
        {
            id: 'TRX-002',
            user: 'Sarah Johnson',
            userEmail: 'sarah.j@example.com',
            amount: 79.99,
            status: 'completed',
            date: '2023-06-14T15:42:00Z'
        },
        {
            id: 'TRX-003',
            user: 'Michael Brown',
            userEmail: 'mbrown@example.com',
            amount: 245.50,
            status: 'pending',
            date: '2023-06-14T09:15:00Z'
        },
        {
            id: 'TRX-004',
            user: 'Emma Wilson',
            userEmail: 'emma.w@example.com',
            amount: 189.99,
            status: 'completed',
            date: '2023-06-13T18:30:00Z'
        },
        {
            id: 'TRX-005',
            user: 'David Lee',
            userEmail: 'david.lee@example.com',
            amount: 59.95,
            status: 'failed',
            date: '2023-06-13T11:05:00Z'
        }
    ];
}

function getMockSystemNotifications() {
    return [
        {
            id: 1,
            title: 'System Update',
            message: 'System will be updated to version 2.4.0 tonight at 2:00 AM UTC',
            type: 'info',
            date: '2023-06-15T08:00:00Z',
            read: false
        },
        {
            id: 2,
            title: 'New Feature Released',
            message: 'Advanced reporting features are now available in the analytics section',
            type: 'success',
            date: '2023-06-14T10:30:00Z',
            read: true
        },
        {
            id: 3,
            title: 'Server Maintenance',
            message: 'Scheduled maintenance on June 18th from 1:00 AM to 3:00 AM UTC',
            type: 'warning',
            date: '2023-06-13T15:45:00Z',
            read: true
        },
        {
            id: 4,
            title: 'Security Alert',
            message: 'Multiple failed login attempts detected for admin account',
            type: 'error',
            date: '2023-06-12T23:15:00Z',
            read: true
        }
    ];
} 