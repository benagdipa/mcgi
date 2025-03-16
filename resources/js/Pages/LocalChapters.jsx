import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import GuestLayout from '@/Layouts/GuestLayout';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaSearch, FaClock, FaFilter } from 'react-icons/fa';
import PageBanner from '@/Components/PageBanner';

export default function LocalChapters({ auth, locations, locales }) {
    const [selectedLocale, setSelectedLocale] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedState, setSelectedState] = useState('all');
    const [showNoPhysical, setShowNoPhysical] = useState(true);

    // Get unique states from locations
    const states = [...new Set(locations.map(loc => loc.state).filter(Boolean))].sort();

    const filteredLocations = locations.filter(location => {
        const matchesLocale = selectedLocale === 'all' || location.locale_id === parseInt(selectedLocale);
        const matchesState = selectedState === 'all' || location.state === selectedState;
        const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.city?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPhysical = showNoPhysical || location.has_physical_location;
        return matchesLocale && matchesState && matchesSearch && matchesPhysical;
    });

    const breadcrumbs = [
        { label: 'Home', href: route('home') },
        { label: 'Local Chapters' }
    ];

    return (
        <GuestLayout user={auth?.user}>
            <Head>
                <title>Local Chapters - MCGI Australia</title>
                <meta name="description" content="Find MCGI locations across Australia. Connect with our local chapters and join our community." />
            </Head>

            <PageBanner
                title="Local Chapters"
                subtitle="Find your nearest MCGI chapter in Australia and join our growing community of faith"
                breadcrumbs={breadcrumbs}
                badge="Our Locations"
            />

            <div className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Filters Section */}
                    <div className="mb-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <FaFilter className="mr-2" />
                                    Filter Locations
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="relative">
                                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search locations..."
                                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary font-sans"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <select
                                        className="px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary bg-white font-sans"
                                        value={selectedState}
                                        onChange={(e) => setSelectedState(e.target.value)}
                                    >
                                        <option value="all">All States</option>
                                        {states.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        className="px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary bg-white font-sans"
                                        value={selectedLocale}
                                        onChange={(e) => setSelectedLocale(e.target.value)}
                                    >
                                        <option value="all">All Regions</option>
                                        {locales.map((locale) => (
                                            <option key={locale.id} value={locale.id}>
                                                {locale.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-4 flex items-center">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                                            checked={showNoPhysical}
                                            onChange={(e) => setShowNoPhysical(e.target.checked)}
                                        />
                                        <span className="ml-2 text-gray-700">Show locations without physical address</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-8 text-center">
                        <p className="text-gray-600 font-sans">
                            Showing {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Locations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredLocations.map((location, index) => (
                            <motion.div
                                key={location.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                {location.map_code && (
                                    <div className="h-48 relative">
                                        <iframe
                                            src={location.map_code}
                                            className="w-full h-full border-0"
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title={`Map of ${location.name}`}
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 font-sans">
                                            {location.name}
                                        </h3>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                                {location.state}
                                            </span>
                                            {!location.has_physical_location && (
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                                    Online Only
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-4 text-gray-600 font-sans">
                                        {location.has_physical_location ? (
                                            <>
                                                <div className="flex items-start">
                                                    <FaMapMarkerAlt className="mt-1 mr-3 text-primary" />
                                                    <div>
                                                        <p>{location.address}</p>
                                                        {location.city && (
                                                            <p>{location.city}{location.postal_code ? `, ${location.postal_code}` : ''}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                {location.phone && (
                                                    <div className="flex items-center">
                                                        <FaPhone className="mr-3 text-primary" />
                                                        <a href={`tel:${location.phone}`} className="hover:text-primary transition-colors">
                                                            {location.phone}
                                                        </a>
                                                    </div>
                                                )}
                                                {location.email && (
                                                    <div className="flex items-center">
                                                        <FaEnvelope className="mr-3 text-primary" />
                                                        <a href={`mailto:${location.email}`} className="hover:text-primary transition-colors">
                                                            {location.email}
                                                        </a>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="py-2 px-4 bg-yellow-50 rounded-lg">
                                                <p className="text-yellow-800">
                                                    This location currently has no physical address. Please join us online for services.
                                                </p>
                                            </div>
                                        )}

                                        {/* Service Schedule Section */}
                                        <div className="pt-4 mt-4 border-t border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                                                <FaClock className="mr-2 text-primary" />
                                                Regular Services
                                            </h4>
                                            <ul className="space-y-3">
                                                <li className="flex items-start">
                                                    <div className="w-32 flex-shrink-0 font-medium">Wednesday</div>
                                                    <div>
                                                        <span className="block font-medium text-gray-900">Live Prayer Meeting</span>
                                                        <span className="text-sm text-primary">7:30 AM</span>
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="w-32 flex-shrink-0 font-medium">Saturday</div>
                                                    <div>
                                                        <span className="block font-medium text-gray-900">Worship Service</span>
                                                        <span className="text-sm text-primary">7:30 AM</span>
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="w-32 flex-shrink-0 font-medium">Daily</div>
                                                    <div>
                                                        <span className="block font-medium text-gray-900">Thanksgiving</span>
                                                        <span className="text-sm text-primary">8:00 PM</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    {location.has_physical_location && (
                                        <div className="mt-6">
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.address} ${location.city} ${location.state} Australia`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300 font-sans"
                                            >
                                                <FaMapMarkerAlt className="mr-2" />
                                                Get Directions
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredLocations.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-center py-12 bg-white rounded-2xl shadow-lg"
                        >
                            <p className="text-lg text-gray-600 font-sans">No locations found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedLocale('all');
                                    setSelectedState('all');
                                    setShowNoPhysical(true);
                                }}
                                className="mt-4 text-primary hover:text-primary/80 font-medium"
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
} 