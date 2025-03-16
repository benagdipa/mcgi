import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Badge from '@/Components/Badge';

export default function PageBanner({ title, subtitle, breadcrumbs = [], badge = null }) {
    return (
        <div className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Background Pattern - Using CSS Grid instead of SVG */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="grid grid-cols-12 gap-1 h-full">
                    {Array(48).fill().map((_, index) => (
                        <div key={index} className="bg-black/10 rounded-sm"></div>
                    ))}
                </div>
            </div>

            <div className="relative pt-16 pb-12 sm:pb-16 lg:pb-20">
                <div className="px-6 mx-auto max-w-7xl">
                    <div className="text-center">
                        {/* Breadcrumbs */}
                        {breadcrumbs.length > 0 && (
                            <motion.nav
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex justify-center mb-6 text-sm"
                                aria-label="Breadcrumb"
                            >
                                <ol className="inline-flex items-center space-x-2">
                                    {breadcrumbs.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {index > 0 && (
                                                <li>
                                                    <span className="text-gray-400">/</span>
                                                </li>
                                            )}
                                            <li>
                                                {item.href ? (
                                                    <Link
                                                        href={item.href}
                                                        className="text-gray-600 hover:text-primary transition-colors"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-900 font-medium">
                                                        {item.label}
                                                    </span>
                                                )}
                                            </li>
                                        </React.Fragment>
                                    ))}
                                </ol>
                            </motion.nav>
                        )}

                        {/* Badge */}
                        {badge && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="mb-4"
                            >
                                <Badge color="primary" variant="soft" size="lg">
                                    {badge}
                                </Badge>
                            </motion.div>
                        )}

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl font-sans"
                        >
                            {title}
                        </motion.h1>

                        {/* Subtitle */}
                        {subtitle && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 font-sans"
                            >
                                {subtitle}
                            </motion.p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 