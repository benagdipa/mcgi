import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

/**
 * AnalyticsChart component for displaying charts in the dashboard
 * 
 * @param {Object} props Component props
 * @param {string} props.title Chart title
 * @param {string} props.subTitle Optional subtitle
 * @param {string} props.type Chart type: 'line', 'bar', or 'doughnut'
 * @param {Object} props.data Chart data object
 * @param {Object} props.options Chart options object
 * @param {Array} props.timeRanges Available time range options
 * @param {string} props.defaultTimeRange Default selected time range
 * @param {boolean} props.isLoading Whether the chart is in loading state
 */
export default function AnalyticsChart({
    title,
    subTitle,
    type = 'line',
    data,
    options = {},
    timeRanges = ['7d', '30d', '90d'],
    defaultTimeRange = '30d',
    isLoading = false
}) {
    const [timeRange, setTimeRange] = useState(defaultTimeRange);
    const [chartData, setChartData] = useState(data);

    // Update chart data when timeRange changes
    useEffect(() => {
        // In a real app, this would fetch new data based on timeRange
        // For now, we'll just use the provided data
        setChartData(data);
    }, [timeRange, data]);

    // Default chart options based on type
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: type === 'doughnut',
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: type !== 'doughnut' ? {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
        } : undefined,
    };

    // Merge default options with user-provided options
    const chartOptions = { ...defaultOptions, ...options };

    // Render the appropriate chart based on type
    const renderChart = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-pulse h-6 w-6 rounded-full bg-primary"></div>
                </div>
            );
        }

        switch (type) {
            case 'bar':
                return <Bar data={chartData} options={chartOptions} />;
            case 'doughnut':
                return (
                    <div className="h-64 flex items-center justify-center">
                        <Doughnut data={chartData} options={chartOptions} />
                    </div>
                );
            case 'line':
            default:
                return <Line data={chartData} options={chartOptions} />;
        }
    };

    return (
        <Card className="w-full border-none">
            <CardHeader
                floated={false}
                shadow={false}
                className="bg-transparent py-4 px-6 flex items-center justify-between"
            >
                <div>
                    {title && (
                        <Typography variant="h6" color="blue-gray">
                            {title}
                        </Typography>
                    )}
                    {subTitle && (
                        <Typography variant="small" color="gray" className="mt-1">
                            {subTitle}
                        </Typography>
                    )}
                </div>
                <div className="flex gap-2">
                    {timeRanges.map((range) => (
                        <Button
                            key={range}
                            variant={timeRange === range ? "filled" : "text"}
                            size="sm"
                            color={timeRange === range ? "blue" : "gray"}
                            onClick={() => setTimeRange(range)}
                            className="px-3 py-1.5"
                        >
                            {range}
                        </Button>
                    ))}
                </div>
            </CardHeader>
            <CardBody>
                <div className="h-64">
                    {renderChart()}
                </div>
            </CardBody>
        </Card>
    );
} 