import React from 'react';
import { Card, Typography, Tooltip } from "@material-tailwind/react";
import { MdArrowUpward, MdArrowDownward, MdInfo } from "react-icons/md";

/**
 * StatsCard component for displaying statistics in the dashboard
 * 
 * @param {Object} props Component props
 * @param {string} props.title The card title
 * @param {number|string} props.value The main value to display
 * @param {string} props.suffix Text to show after the value (e.g. "users")
 * @param {React.ReactNode} props.icon Icon component to display
 * @param {string} props.trend Trend value (e.g. "+5.2%")
 * @param {'up'|'down'|'neutral'} props.trendDirection Direction of the trend
 * @param {string} props.bgColor Background color class for the icon
 * @param {string} props.infoTooltip Optional tooltip text
 * @param {boolean} props.isLoading Whether the card is in loading state
 */
export default function StatsCard({
    title,
    value,
    suffix,
    icon,
    trend,
    trendDirection = 'up',
    bgColor = 'bg-primary/10',
    infoTooltip,
    isLoading = false
}) {
    // Determine trend icon and color
    const trendIcon = trendDirection === 'up' 
        ? <MdArrowUpward /> 
        : trendDirection === 'down' 
        ? <MdArrowDownward /> 
        : null;
        
    const trendColor = trendDirection === 'up' 
        ? 'text-success' 
        : trendDirection === 'down' 
        ? 'text-danger' 
        : 'text-gray-500';

    return (
        <Card className="border-none hover:shadow-lg transition-all duration-300 bg-white h-full">
            <div className="p-6 relative">
                <div className="flex items-center justify-between">
                    <div className={`stats-icon ${bgColor} p-3 rounded-xl`}>
                        {icon}
                    </div>
                    <div className={`stats-trend ${trendColor} flex items-center gap-1 text-sm font-medium`}>
                        {trendIcon}
                        <span>{trend}</span>
                        
                        {infoTooltip && (
                            <Tooltip content={infoTooltip}>
                                <button type="button" className="text-gray-400 hover:text-gray-600 ml-1">
                                    <MdInfo size={16} />
                                </button>
                            </Tooltip>
                        )}
                    </div>
                </div>
                <h3 className="text-gray-500 text-sm mt-4">{title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {isLoading ? '-' : value}
                    </h2>
                    {suffix && (
                        <span className="text-xs text-gray-500 font-medium">{suffix}</span>
                    )}
                </div>
            </div>
        </Card>
    );
} 