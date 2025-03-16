import React from 'react';
import { Card, Typography, Badge, Button } from "@material-tailwind/react";
import { MdArrowForward } from "react-icons/md";

/**
 * Status badge component for transaction status
 */
const StatusBadge = ({ status }) => {
    let color;
    switch (status) {
        case 'completed':
            color = 'green';
            break;
        case 'pending':
            color = 'amber';
            break;
        case 'failed':
            color = 'red';
            break;
        default:
            color = 'gray';
    }
    
    return (
        <Badge color={color} className="capitalize">
            {status}
        </Badge>
    );
};

/**
 * Format date to a readable format
 */
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Format amount to a currency format
 */
const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

/**
 * RecentTransactions component for displaying recent transactions in the dashboard
 * 
 * @param {Object} props Component props
 * @param {Array} props.transactions List of transactions to display
 * @param {boolean} props.isLoading Whether the component is in loading state
 * @param {Function} props.onViewAll Callback when "View All" button is clicked
 */
export default function RecentTransactions({
    transactions = [],
    isLoading = false,
    onViewAll = () => {}
}) {
    return (
        <Card className="w-full border-none p-6">
            <div className="flex items-center justify-between mb-6">
                <Typography variant="h6" color="blue-gray">
                    Recent Transactions
                </Typography>
                <Button 
                    variant="text" 
                    color="blue" 
                    className="flex items-center gap-2"
                    onClick={onViewAll}
                >
                    View All
                    <MdArrowForward />
                </Button>
            </div>
            
            {isLoading ? (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="animate-pulse flex items-center justify-between py-3">
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-40"></div>
                                <div className="h-3 bg-gray-200 rounded w-32"></div>
                            </div>
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                        </div>
                    ))}
                </div>
            ) : transactions.length === 0 ? (
                <div className="py-8 text-center">
                    <Typography color="gray">No transactions found</Typography>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th className="border-b border-gray-100 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                        Transaction
                                    </Typography>
                                </th>
                                <th className="border-b border-gray-100 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                        Customer
                                    </Typography>
                                </th>
                                <th className="border-b border-gray-100 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                        Amount
                                    </Typography>
                                </th>
                                <th className="border-b border-gray-100 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                        Status
                                    </Typography>
                                </th>
                                <th className="border-b border-gray-100 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                        Date
                                    </Typography>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <Typography variant="small" color="blue" className="font-medium">
                                            {transaction.id}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                {transaction.user}
                                            </Typography>
                                            <Typography variant="small" color="gray" className="text-xs">
                                                {transaction.userEmail}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            {formatAmount(transaction.amount)}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={transaction.status} />
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="gray">
                                            {formatDate(transaction.date)}
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Card>
    );
} 