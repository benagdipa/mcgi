# MCGI Admin Dashboard

A modern, responsive admin dashboard built with React and Material Tailwind UI components.

## Features

- **Modern Dashboard**: Clean, intuitive interface with data visualization
- **User Management**: Comprehensive tools for managing users and roles
- **Content Management**: Blog, event, and media management
- **Analytics**: Real-time metrics and reporting tools
- **Responsive Design**: Fully responsive layout for all devices

## Dashboard Components

The dashboard includes several reusable components:

### StatsCard

Displays statistics with trend indicators.

```jsx
import StatsCard from '@/Components/Dashboard/StatsCard';
import { FaUser } from "react-icons/fa";

<StatsCard
    title="Total Users"
    value={5842}
    suffix="members"
    icon={<FaUser className="text-primary text-2xl" />}
    trend="+12.5%"
    trendDirection="up"
    bgColor="bg-primary/10"
    infoTooltip="Compared to last month"
    isLoading={false}
/>
```

### AnalyticsChart

Displays various chart types with time range selection.

```jsx
import AnalyticsChart from '@/Components/Dashboard/AnalyticsChart';

<AnalyticsChart
    title="User Growth"
    subTitle="New user registrations over time"
    type="line" // 'line', 'bar', or 'doughnut'
    data={userGrowthData}
    timeRanges={['7d', '30d', '90d']}
    defaultTimeRange="30d"
    isLoading={false}
/>
```

### RecentTransactions

Displays transaction data with status indicators.

```jsx
import RecentTransactions from '@/Components/Dashboard/RecentTransactions';

<RecentTransactions
    transactions={transactions}
    isLoading={false}
    onViewAll={() => navigate('/transactions')}
/>
```

## Dashboard Service

The `DashboardService.js` provides data operations for the dashboard:

```js
import { 
    getDashboardStats, 
    getUserGrowthData, 
    getRevenueData,
    getUserActivityByPlatform,
    getRecentTransactions,
    getSystemNotifications
} from '@/Services/DashboardService';

// Get basic statistics
const stats = getDashboardStats();

// Get chart data with time filtering
const userGrowthData = getUserGrowthData('30d'); // '7d', '30d', '90d'
const revenueData = getRevenueData('30d');

// Get platform distribution data
const platformData = getUserActivityByPlatform();

// Get transaction and notification data
const transactions = getRecentTransactions();
const notifications = getSystemNotifications();
```

## Setup and Development

### Prerequisites

- Node.js (v14+)
- npm or yarn
- PHP 8.1+
- Composer

### Quick Setup (Windows)

For Windows users, we provide a PowerShell setup script that automates the installation process:

```powershell
# Run this in PowerShell
.\setup.ps1
```

The script will:
- Check for required dependencies (PHP, Composer, Node.js)
- Install PHP and JavaScript dependencies
- Set up your .env file
- Configure your database connection
- Run migrations and seed the database
- Provide instructions for starting the development servers

### Manual Development Environment Setup

1. Clone the repository
   ```
   git clone https://github.com/your-org/mcgi-admin.git
   cd mcgi-admin
   ```

2. Install dependencies
   ```
   composer install
   npm install
   ```

3. Copy the example environment file and generate an application key
   ```
   cp .env.example .env
   php artisan key:generate
   ```

4. Configure your database settings in the `.env` file:
   ```
   DB_CONNECTION=mysql
   DB_HOST=192.168.18.200
   DB_PORT=9908
   DB_DATABASE=mcgi
   DB_USERNAME=root
   DB_PASSWORD=secret
   ```

5. Run migrations and seed the database
   ```
   php artisan migrate --seed
   ```

6. Start the development servers
   ```
   # In one terminal:
   php artisan serve
   
   # In another terminal:
   npm run dev
   ```

### Production Build

```
npm run build
php artisan optimize
```

## Documentation

For more detailed documentation, see:

- [Admin Dashboard Enhancements](./admin-dashboard-enhancements.md)
- [User Management Guide](./docs/user-management.md)
- [Role Management Guide](./docs/role-management.md)

## Technologies Used

- React
- Laravel
- Inertia.js
- Chart.js
- Material Tailwind UI
- TailwindCSS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 