import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import GuestLayout from '@/Layouts/GuestLayout';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaSearch, FaClock, FaFilter, FaLocationArrow, FaTimes, FaMapPin, FaExternalLinkAlt, FaChurch, FaRegBuilding } from 'react-icons/fa';
import PageBanner from '@/Components/PageBanner';
import Badge from '@/Components/Badge';

export default function LocalChapters({ auth, locations, locales }) {
    const [selectedLocale, setSelectedLocale] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedState, setSelectedState] = useState('all');
    const [showNoPhysical, setShowNoPhysical] = useState(true);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [isNearestOpen, setIsNearestOpen] = useState(false);
    const [nearestLocation, setNearestLocation] = useState(null);
    const [animateCard, setAnimateCard] = useState(null);

    // Get unique states from locations
    const states = [...new Set(locations.map(loc => loc.state).filter(Boolean))].sort();

    useEffect(() => {
        // Reset animation state when filters change
        setAnimateCard(null);
    }, [selectedLocale, selectedState, searchQuery, showNoPhysical]);

    // Handle user location detection
    const detectUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserLocation(userCoords);
                    
                    // Find nearest location with physical address
                    findNearestLocation(userCoords);
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    alert("Unable to access your location. Please ensure location services are enabled.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    // Calculate distance between two coordinates
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const d = R * c; // Distance in km
        return d;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI/180);
    };

    // Find nearest location
    const findNearestLocation = (userCoords) => {
        let nearestLoc = null;
        let minDistance = Infinity;

        // Only consider locations with physical addresses and coordinates
        const physicalLocations = locations.filter(loc => 
            loc.has_physical_location && 
            loc.latitude && 
            loc.longitude
        );

        if (physicalLocations.length === 0) {
            alert("No physical locations with coordinates found.");
            return;
        }

        for (const loc of physicalLocations) {
            const distance = calculateDistance(
                userCoords.lat, userCoords.lng,
                parseFloat(loc.latitude), parseFloat(loc.longitude)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestLoc = { ...loc, distance };
            }
        }

        if (nearestLoc) {
            setNearestLocation(nearestLoc);
            setIsNearestOpen(true);
            
            // Find the nearest location in the filtered list and animate it
            const locationIndex = filteredLocations.findIndex(loc => loc.id === nearestLoc.id);
            if (locationIndex !== -1) {
                setAnimateCard(nearestLoc.id);
            }
        }
    };

    const filteredLocations = locations.filter(location => {
        const matchesLocale = selectedLocale === 'all' || location.locale_id === parseInt(selectedLocale);
        const matchesState = selectedState === 'all' || location.state === selectedState;
        const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.city?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPhysical = showNoPhysical || location.has_physical_location;
        return matchesLocale && matchesState && matchesSearch && matchesPhysical;
    });

    // Sort locations by nearest if user location is available
    const sortedLocations = userLocation 
        ? [...filteredLocations].sort((a, b) => {
            if (!a.latitude || !a.longitude) return 1;
            if (!b.latitude || !b.longitude) return -1;
            
            const distA = calculateDistance(
                userLocation.lat, userLocation.lng,
                parseFloat(a.latitude), parseFloat(a.longitude)
            );
            const distB = calculateDistance(
                userLocation.lat, userLocation.lng,
                parseFloat(b.latitude), parseFloat(b.longitude)
            );
            
            return distA - distB;
        })
        : filteredLocations;

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

            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Hero CTA */}
                    <div className="mb-12">
                        <motion.div 
                            className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-8 md:p-12 shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="md:flex items-center justify-between">
                                <div className="mb-6 md:mb-0 md:mr-8">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Find Your Nearest Location</h2>
                                    <p className="text-white/90 max-w-xl">
                                        Looking for a local MCGI chapter near you? Use your current location to find the closest church in your area.
                                    </p>
                                </div>
                                <button 
                                    onClick={detectUserLocation}
                                    className="w-full md:w-auto bg-white text-primary px-6 py-4 rounded-lg font-medium shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                                >
                                    <FaLocationArrow className="mr-2" />
                                    Use My Location
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Nearest Location Popup */}
                    {isNearestOpen && nearestLocation && (
                        <motion.div 
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div 
                                className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full relative"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                            >
                                <button 
                                    onClick={() => setIsNearestOpen(false)} 
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                >
                                    <FaTimes size={24} />
                                </button>
                                
                                <div className="mb-6">
                                    <Badge color="primary" variant="soft" size="lg" className="mb-3">
                                        Nearest Location
                                    </Badge>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {nearestLocation.name}
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        <span className="font-medium">Distance:</span> {nearestLocation.distance ? `${nearestLocation.distance.toFixed(1)} km away` : 'Unknown distance'}
                                    </p>
                                </div>
                                
                                {nearestLocation.map_code && (
                                    <div className="h-64 rounded-lg overflow-hidden mb-6">
                                        <iframe
                                            src={nearestLocation.map_code}
                                            className="w-full h-full border-0"
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title={`Map of ${nearestLocation.name}`}
                                        />
                                    </div>
                                )}
                                
                                <div className="space-y-4 text-gray-600 mb-6">
                                    {nearestLocation.has_physical_location && (
                                        <div className="flex items-start">
                                            <FaMapMarkerAlt className="mt-1 mr-3 text-primary text-lg" />
                                            <div>
                                                <p className="font-medium">{nearestLocation.address}</p>
                                                {nearestLocation.city && (
                                                    <p>{nearestLocation.city}{nearestLocation.postal_code ? `, ${nearestLocation.postal_code}` : ''}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {nearestLocation.phone && (
                                        <div className="flex items-center">
                                            <FaPhone className="mr-3 text-primary" />
                                            <a href={`tel:${nearestLocation.phone}`} className="hover:text-primary transition-colors">
                                                {nearestLocation.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${nearestLocation.address} ${nearestLocation.city} ${nearestLocation.state} Australia`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-sans"
                                    >
                                        <FaMapMarkerAlt className="mr-2" />
                                        Get Directions
                                    </a>
                                    <button
                                        onClick={() => {
                                            setIsNearestOpen(false);
                                            // Scroll to the location card
                                            const element = document.getElementById(`location-${nearestLocation.id}`);
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }
                                        }}
                                        className="flex-1 inline-flex items-center justify-center bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-sans"
                                    >
                                        <FaMapPin className="mr-2" />
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Mobile Filter Toggle */}
                    <div className="md:hidden mb-6">
                        <button
                            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                            className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
                        >
                            <span className="flex items-center font-medium text-gray-800">
                                <FaFilter className="mr-2 text-primary" />
                                Filter Locations
                            </span>
                            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                                {filteredLocations.length} locations
                            </span>
                        </button>
                    </div>

                    {/* Filters Section */}
                    <div className={`mb-12 ${isFiltersOpen ? 'block' : 'hidden md:block'}`}>
                        <div className="max-w-4xl mx-auto">
                            <motion.div 
                                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                        <FaFilter className="mr-2 text-primary" />
                                        Filter Locations
                                    </h2>
                                    {filteredLocations.length > 0 && (
                                        <span className="text-sm text-gray-500">
                                            Showing {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''}
                                        </span>
                                    )}
                                </div>
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
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <select
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary bg-white font-sans appearance-none"
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
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <select
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary bg-white font-sans appearance-none"
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
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                                            checked={showNoPhysical}
                                            onChange={(e) => setShowNoPhysical(e.target.checked)}
                                        />
                                        <span className="ml-2 text-gray-700">Show online-only locations</span>
                                    </label>
                                    
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedLocale('all');
                                            setSelectedState('all');
                                            setShowNoPhysical(true);
                                        }}
                                        className="text-primary hover:text-primary-dark font-medium text-sm"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Locations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedLocations.map((location, index) => (
                            <motion.div
                                id={`location-${location.id}`}
                                key={location.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ 
                                    opacity: 1, 
                                    y: 0,
                                    scale: animateCard === location.id ? [1, 1.05, 1] : 1
                                }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: index * 0.1,
                                    scale: { duration: 0.5, repeat: animateCard === location.id ? 1 : 0 }
                                }}
                                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border ${animateCard === location.id ? 'border-primary' : 'border-transparent'}`}
                            >
                                {location.map_code ? (
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
                                ) : (
                                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                                        <FaRegBuilding className="text-gray-300 text-5xl" />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <FaChurch className="text-primary mr-2" />
                                                <h3 className="text-xl font-bold text-gray-900 font-sans">
                                                    {location.name}
                                                </h3>
                                            </div>
                                            {userLocation && location.latitude && location.longitude && (
                                                <div className="text-sm text-primary font-medium">
                                                    {calculateDistance(
                                                        userLocation.lat, userLocation.lng,
                                                        parseFloat(location.latitude), parseFloat(location.longitude)
                                                    ).toFixed(1)} km away
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium whitespace-nowrap">
                                                {location.state}
                                            </span>
                                            {!location.has_physical_location && (
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium whitespace-nowrap">
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
                                            <div className="py-3 px-4 bg-yellow-50 rounded-lg border border-yellow-100">
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
                                            <div className="grid grid-cols-1 gap-3 bg-gray-50 p-3 rounded-lg">
                                                <div className="flex items-start">
                                                    <div className="w-32 flex-shrink-0 font-medium">Wednesday</div>
                                                    <div>
                                                        <span className="block font-medium text-gray-900">Prayer Meeting</span>
                                                        <span className="text-sm text-primary">7:30 AM</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="w-32 flex-shrink-0 font-medium">Saturday</div>
                                                    <div>
                                                        <span className="block font-medium text-gray-900">Worship Service</span>
                                                        <span className="text-sm text-primary">7:30 AM</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="w-32 flex-shrink-0 font-medium">Daily</div>
                                                    <div>
                                                        <span className="block font-medium text-gray-900">Thanksgiving</span>
                                                        <span className="text-sm text-primary">8:00 PM</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {location.has_physical_location && (
                                        <div className="mt-6">
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.address} ${location.city} ${location.state} Australia`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-sans"
                                            >
                                                <FaMapMarkerAlt className="mr-2" />
                                                Get Directions
                                                <FaExternalLinkAlt className="ml-2 text-xs" />
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
                            className="text-center py-16 bg-white rounded-2xl shadow-lg"
                        >
                            <div className="mx-auto max-w-md p-6">
                                <FaSearch className="mx-auto text-gray-300 text-5xl mb-4" />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">No Locations Found</h3>
                                <p className="text-gray-600 mb-6">No locations match your current search criteria. Try adjusting your filters or search terms.</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedLocale('all');
                                        setSelectedState('all');
                                        setShowNoPhysical(true);
                                    }}
                                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center"
                                >
                                    <FaTimes className="mr-2" />
                                    Clear All Filters
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
} 