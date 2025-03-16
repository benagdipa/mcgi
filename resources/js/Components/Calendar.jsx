import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import Badge from './Badge';

export default function Calendar({ events, onEventClick }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Get day names for header
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Get events for the current day
    const getEventsForDay = (date) => {
        return events.filter(event => {
            const eventDate = parseISO(event.start_date);
            return isSameDay(eventDate, date);
        });
    };

    // Navigate between months
    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={previousMonth}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FaChevronLeft className="text-gray-600" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FaChevronRight className="text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-gray-200">
                {/* Week day headers */}
                {weekDays.map(day => (
                    <div
                        key={day}
                        className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700"
                    >
                        {day}
                    </div>
                ))}

                {/* Calendar days */}
                {days.map(day => {
                    const dayEvents = getEventsForDay(day);
                    const isCurrentMonth = isSameMonth(day, currentDate);

                    return (
                        <div
                            key={day.toString()}
                            className={`min-h-[120px] bg-white p-2 ${
                                isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                            }`}
                        >
                            <div className="font-medium text-sm mb-1">
                                {format(day, 'd')}
                            </div>
                            <div className="space-y-1">
                                {dayEvents.map(event => (
                                    <button
                                        key={event.id}
                                        onClick={() => onEventClick(event.id)}
                                        className="w-full text-left"
                                    >
                                        <Badge
                                            color="primary"
                                            variant="soft"
                                            size="sm"
                                            className="truncate block"
                                        >
                                            {event.title}
                                        </Badge>
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 