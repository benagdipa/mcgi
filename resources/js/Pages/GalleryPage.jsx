import React, { useState, useEffect, useCallback, useRef } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router } from '@inertiajs/react';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { motion } from "framer-motion";
import { 
    FaDownload, 
    FaChevronLeft, 
    FaChevronRight, 
    FaCamera, 
    FaSearch, 
    FaFilter, 
    FaHeart, 
    FaShareAlt, 
    FaTimes, 
    FaSortAmountDown,
    FaSortAmountUp,
    FaInfoCircle 
} from 'react-icons/fa';
import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import { Tooltip } from '@material-tailwind/react';
import { Spinner } from '@material-tailwind/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Masonry from 'react-masonry-css';
import ModernPlaceholder from '@/Components/svg/ModernPlaceholder';

export default function GalleryPage({ auth, albums: initialAlbums }) {
    const [albums, setAlbums] = useState(initialAlbums);
    const [filteredAlbums, setFilteredAlbums] = useState(initialAlbums);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [sortOrder, setSortOrder] = useState('newest'); // newest, oldest, name
    const [isLoading, setIsLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [activeImageId, setActiveImageId] = useState(null);
    const [message, setMessage] = useState('');
    const [imageDetailsModal, setImageDetailsModal] = useState({ visible: false, image: null });
    
    const searchInputRef = useRef(null);

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem('galleryFavorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('galleryFavorites', JSON.stringify(favorites));
    }, [favorites]);

    // Filter albums based on search term
    useEffect(() => {
        if (!initialAlbums) return;
        
        let filtered = [...initialAlbums];
        
        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(album => {
                const matchesAlbumName = album.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesAlbumDescription = album.description && album.description.toLowerCase().includes(searchTerm.toLowerCase());
                
                // Check if any attachment matches
                const matchesAttachment = album.attachments.some(
                    attachment => attachment.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                
                return matchesAlbumName || matchesAlbumDescription || matchesAttachment;
            });
        }
        
        // Filter by selected album
        if (selectedAlbum) {
            filtered = filtered.filter(album => album.id === selectedAlbum);
        }
        
        // Filter by favorites
        if (showFavoritesOnly) {
            filtered = filtered.map(album => {
                return {
                    ...album,
                    attachments: album.attachments.filter(attachment => 
                        favorites.includes(attachment.id)
                    )
                };
            }).filter(album => album.attachments.length > 0);
        }
        
        // Apply sorting
        filtered = sortAlbums(filtered, sortOrder);
        
        setFilteredAlbums(filtered);
    }, [initialAlbums, searchTerm, selectedAlbum, sortOrder, favorites, showFavoritesOnly]);

    const sortAlbums = (albumsToSort, order) => {
        const sorted = [...albumsToSort];
        
        switch (order) {
            case 'newest':
                return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            case 'oldest':
                return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return sorted;
        }
    };

    const handleDownload = (imageURL) => {
        if (imageURL) {
            setIsLoading(true);
            const fileName = imageURL.substring(imageURL.lastIndexOf('/') + 1);
            const link = document.createElement('a');
            link.href = imageURL;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            setMessage('Image downloaded successfully!');
            setTimeout(() => {
                setMessage('');
                setIsLoading(false);
            }, 2000);
        }
    };

    const toggleFavorite = (imageId) => {
        if (favorites.includes(imageId)) {
            setFavorites(favorites.filter(id => id !== imageId));
        } else {
            setFavorites([...favorites, imageId]);
        }
    };

    const handleShare = async (image) => {
        const shareUrl = window.location.href.split('#')[0] + `#album_${image.album_id}`;
        const imageTitle = image.name || 'Inspirational Wallpaper';
        
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Shared Wallpaper',
                    text: `Check out this beautiful wallpaper: ${imageTitle}`,
                    url: shareUrl,
                });
            } else {
                navigator.clipboard.writeText(shareUrl);
                setMessage('Link copied to clipboard!');
                setTimeout(() => setMessage(''), 2000);
            }
        } catch (error) {
            console.error('Error sharing content:', error);
        }
    };

    const showImageDetails = (image) => {
        setImageDetailsModal({ visible: true, image });
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedAlbum(null);
        setSortOrder('newest');
        setShowFavoritesOnly(false);
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
        }
    };

    const scrollToTop = (albumElement) => {
        const element = document.getElementById(`${albumElement}`);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offset = elementPosition + window.scrollY - 140;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    };

    const ShowGallery = ({ attachments, albumElement }) => {
        if (!attachments || attachments.length === 0) {
            return (
                <div className="py-10 text-center text-gray-500">
                    <FaCamera className="mx-auto text-4xl mb-3 text-gray-300" />
                    <p>No images available in this album</p>
                </div>
            );
        }
        
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 12; // Increased from 9 to 12 for better grid layout
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = attachments.slice(indexOfFirstItem, indexOfLastItem);

        const paginate = (pageNumber) => {
            setTimeout(() => {
                setCurrentPage(pageNumber);
                scrollToTop(albumElement);
            }, 300);
        };

        // Masonry breakpoints
        const breakpointColumnsObj = {
            default: 4,
            1280: 3,
            1024: 3,
            768: 2,
            640: 1
        };

        return (
            <React.Fragment>
                <Gallery>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {currentItems.map((item, index) => (
                            <div key={item.id || index} className="gallery-item mb-4">
                                <Card 
                                    className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    hover={true}
                                >
                                    <div className="relative group">
                                        {/* Image actions overlay */}
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                                            <div className="flex space-x-2">
                                                {auth?.user && (
                                                    <Tooltip content="Download Image">
                                                        <button
                                                            onClick={() => handleDownload(item.path)}
                                                            className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors"
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading && activeImageId === item.id ? 
                                                                <Spinner className="h-5 w-5" /> : 
                                                                <FaDownload />
                                                            }
                                                        </button>
                                                    </Tooltip>
                                                )}
                                                
                                                <Tooltip content={favorites.includes(item.id) ? "Remove from Favorites" : "Add to Favorites"}>
                                                    <button
                                                        onClick={() => toggleFavorite(item.id)}
                                                        className={`p-2 rounded-full transition-colors ${
                                                            favorites.includes(item.id) 
                                                                ? 'bg-red-500 text-white' 
                                                                : 'bg-white hover:bg-red-500 hover:text-white'
                                                        }`}
                                                    >
                                                        <FaHeart />
                                                    </button>
                                                </Tooltip>
                                                
                                                <Tooltip content="Share Image">
                                                    <button
                                                        onClick={() => handleShare(item)}
                                                        className="p-2 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors"
                                                    >
                                                        <FaShareAlt />
                                                    </button>
                                                </Tooltip>
                                                
                                                <Tooltip content="Image Details">
                                                    <button
                                                        onClick={() => showImageDetails(item)}
                                                        className="p-2 bg-white rounded-full hover:bg-gray-800 hover:text-white transition-colors"
                                                    >
                                                        <FaInfoCircle />
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>

                                        <Item
                                            original={item.path}
                                            thumbnail={item.path}
                                            width="1600"
                                            height="1068"
                                            caption={item.name}
                                        >
                                            {({ ref, open }) => (
                                                <div 
                                                    className="overflow-hidden cursor-pointer"
                                                    onClick={() => {
                                                        setActiveImageId(item.id);
                                                        open();
                                                    }}
                                                >
                                                    {item.path ? (
                                                        <LazyLoadImage
                                                            ref={ref}
                                                            src={item.path}
                                                            alt={item.name || "Gallery Image"}
                                                            effect="blur"
                                                            className="w-full transition-transform duration-500 hover:scale-105"
                                                            wrapperClassName="w-full h-full"
                                                            placeholderSrc="/placeholder-image.jpg"
                                                        />
                                                    ) : (
                                                        <ModernPlaceholder theme="default" />
                                                    )}
                                                    
                                                    {/* Favorite indicator */}
                                                    {favorites.includes(item.id) && (
                                                        <div className="absolute top-2 left-2 z-20">
                                                            <span className="bg-red-500 text-white p-1 rounded-full flex items-center justify-center" style={{ width: '24px', height: '24px' }}>
                                                                <FaHeart size={12} />
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </Item>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </Masonry>
                </Gallery>
                
                {attachments.length > itemsPerPage && (
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={attachments.length}
                        paginate={paginate}
                        current={currentPage}
                    />
                )}
            </React.Fragment>
        );
    };

    const Pagination = ({ itemsPerPage, totalItems, paginate, current }) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        // Calculate which page numbers to show
        let visiblePages = [];
        const totalPages = pageNumbers.length;
        
        if (totalPages <= 7) {
            // If we have 7 or fewer pages, show all
            visiblePages = pageNumbers;
        } else {
            // Always include first and last page
            visiblePages.push(1);
            
            // Show ellipsis after first page if current page is > 3
            if (current > 3) {
                visiblePages.push('ellipsis1');
            }
            
            // Calculate range around current page
            let startPage = Math.max(2, current - 1);
            let endPage = Math.min(totalPages - 1, current + 1);
            
            // Adjust range if at boundaries
            if (current <= 3) {
                endPage = 4;
            }
            if (current >= totalPages - 2) {
                startPage = totalPages - 3;
            }
            
            // Add range of pages
            for (let i = startPage; i <= endPage; i++) {
                visiblePages.push(i);
            }
            
            // Show ellipsis before last page if needed
            if (current < totalPages - 2) {
                visiblePages.push('ellipsis2');
            }
            
            // Add last page
            visiblePages.push(totalPages);
        }

        return (
            <div className="pagination flex flex-wrap justify-center items-center gap-2 py-12">
                {/* Previous button */}
                <button 
                    onClick={() => current > 1 && paginate(current - 1)}
                    disabled={current === 1}
                    className={`px-3 py-2 rounded-md flex items-center ${current === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-primary/10'}`}
                    aria-label="Previous page"
                >
                    <FaChevronLeft className="text-sm" />
                </button>
                
                {/* Page numbers */}
                {visiblePages.map((number, index) => {
                    if (number === 'ellipsis1' || number === 'ellipsis2') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-3 py-2">
                                &hellip;
                            </span>
                        );
                    }
                    
                    return (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`font-semibold px-4 py-2 rounded-md transition-colors ${
                                current === number 
                                    ? 'bg-primary text-white' 
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                            aria-label={`Go to page ${number}`}
                            aria-current={current === number ? 'page' : undefined}
                        >
                            {number}
                        </button>
                    );
                })}
                
                {/* Next button */}
                <button 
                    onClick={() => current < pageNumbers.length && paginate(current + 1)}
                    disabled={current === pageNumbers.length}
                    className={`px-3 py-2 rounded-md flex items-center ${current === pageNumbers.length ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-primary/10'}`}
                    aria-label="Next page"
                >
                    <FaChevronRight className="text-sm" />
                </button>
            </div>
        );
    };

    // Album filter selection component
    const AlbumFilter = () => {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    {/* Search input */}
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            ref={searchInputRef}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Search albums or images..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    
                    {/* Filter button */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <FaFilter /> 
                            <span className="hidden sm:inline">Filters</span>
                            {(selectedAlbum || sortOrder !== 'newest' || showFavoritesOnly) && (
                                <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                    {(selectedAlbum ? 1 : 0) + (sortOrder !== 'newest' ? 1 : 0) + (showFavoritesOnly ? 1 : 0)}
                                </span>
                            )}
                        </button>
                        
                        {/* Reset filters button */}
                        {(searchTerm || selectedAlbum || sortOrder !== 'newest' || showFavoritesOnly) && (
                            <button
                                onClick={resetFilters}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                            >
                                <FaTimes /> 
                                <span className="hidden sm:inline">Reset</span>
                            </button>
                        )}
                    </div>
                </div>
                
                {/* Expanded filter options */}
                {showFilters && (
                    <div className="pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Album selection */}
                            <div className="filter-section">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Album</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={selectedAlbum || ''}
                                    onChange={(e) => setSelectedAlbum(e.target.value ? Number(e.target.value) : null)}
                                >
                                    <option value="">All Albums</option>
                                    {initialAlbums.map(album => (
                                        <option key={album.id} value={album.id}>{album.name}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Sort order */}
                            <div className="filter-section">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                                <div className="flex items-center gap-2">
                                    <button
                                        className={`px-3 py-2 rounded-lg flex items-center gap-2 ${sortOrder === 'newest' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                        onClick={() => setSortOrder('newest')}
                                    >
                                        <FaSortAmountDown className="text-sm" /> Newest
                                    </button>
                                    <button
                                        className={`px-3 py-2 rounded-lg flex items-center gap-2 ${sortOrder === 'oldest' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                        onClick={() => setSortOrder('oldest')}
                                    >
                                        <FaSortAmountUp className="text-sm" /> Oldest
                                    </button>
                                    <button
                                        className={`px-3 py-2 rounded-lg flex items-center gap-2 ${sortOrder === 'name' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                        onClick={() => setSortOrder('name')}
                                    >
                                        A-Z
                                    </button>
                                </div>
                            </div>
                            
                            {/* Favorites filter */}
                            <div className="filter-section">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Show</label>
                                <button
                                    className={`px-3 py-2 rounded-lg flex items-center gap-2 ${showFavoritesOnly ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                                >
                                    <FaHeart className="text-sm" /> 
                                    {showFavoritesOnly ? 'Showing Favorites Only' : 'Favorites Only'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Image details modal
    const ImageDetailsModal = () => {
        const { visible, image } = imageDetailsModal;
        
        if (!visible || !image) return null;
        
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
                <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Image Details</h3>
                        <button 
                            onClick={() => setImageDetailsModal({ visible: false, image: null })}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="p-4">
                        <div className="aspect-video mb-4 overflow-hidden rounded bg-gray-100">
                            <img 
                                src={image.path} 
                                alt={image.name} 
                                className="w-full h-full object-contain" 
                            />
                        </div>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Name:</label>
                                <p>{image.name || 'Untitled'}</p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-700">Added:</label>
                                <p>{image.created_at ? new Date(image.created_at).toLocaleDateString() : 'Unknown'}</p>
                            </div>
                            
                            <div className="pt-4 flex justify-between">
                                <button
                                    onClick={() => toggleFavorite(image.id)}
                                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                                        favorites.includes(image.id) ? 'bg-red-500 text-white' : 'bg-red-50 text-red-500'
                                    }`}
                                >
                                    <FaHeart />
                                    {favorites.includes(image.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                </button>
                                
                                {auth?.user && (
                                    <button
                                        onClick={() => {
                                            handleDownload(image.path);
                                            setImageDetailsModal({ visible: false, image: null });
                                        }}
                                        className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Spinner className="h-4 w-4" /> : <FaDownload />}
                                        Download
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const EmptyState = () => (
        <div className="text-center py-16">
            <FaCamera className="mx-auto text-6xl mb-4 text-gray-300" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Images Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters to find images.</p>
            <button
                onClick={resetFilters}
                className="px-4 py-2 bg-primary text-white rounded-lg inline-flex items-center gap-2"
            >
                <FaTimes /> Reset Filters
            </button>
        </div>
    );

    // Success message notification
    const MessageToast = () => {
        if (!message) return null;
        
        return (
            <div className="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
                <span>{message}</span>
                <button
                    onClick={() => setMessage('')}
                    className="ml-3 p-1 hover:bg-green-600 rounded-full"
                >
                    <FaTimes size={12} />
                </button>
            </div>
        );
    };

    return (
        <GuestLayout user={auth?.user}>
            <Head>
                <title>Inspirational Wallpapers Gallery</title>
                <meta name="title" content="Inspirational Wallpapers Gallery" />
                <meta name="keywords" content="Wallpaper, Image Gallery, MCGI, Photography, Bible Verses" />
                <meta name="description" content="Browse our collection of inspirational wallpapers. May these Bible verses and quotes remind us that we are not alone, and that we have God on our side. Download these wallpapers on your mobile and desktop devices today. May God keep you all safe!" />
            </Head>
            
            {/* Toast notification */}
            <MessageToast />
            
            {/* Image details modal */}
            <ImageDetailsModal />
            
            <div className="image-gallery-page">
                <div className="page-header pt-[70px] md:pt-80 pb-28 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-0"></div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto relative z-10">
                            <Badge 
                                color="warning" 
                                variant="solid" 
                                size="lg" 
                                className="mb-4"
                            >
                                Gallery
                            </Badge>
                            <h1 className='font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-4'>Inspirational Gallery</h1>
                            <p className="text-white text-lg md:text-xl max-w-2xl mb-6 opacity-90">
                                Find and download inspiring wallpapers for your devices
                            </p>
                            <div className="breadcrumbs pt-4">
                                <div className="flex gap-4 font-semibold text-white items-center">
                                    <div className="item">
                                        <Link 
                                            href={route('home')} 
                                            className="breadcrumb-link hover:text-secondary transition-colors"
                                        >
                                            HOME
                                        </Link>
                                    </div>
                                    <div className="divider text-gray-200">/</div>
                                    <div className="item">
                                        <Link 
                                            href={route('gallery')} 
                                            className="breadcrumb-link text-gray-200"
                                        >
                                            Image Gallery
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                <div className="content-wrapper py-12 md:py-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="max-w-screen-xl mx-auto px-4">
                            <div className="section-title text-center mb-12">
                                <Badge 
                                    color="primary" 
                                    variant="soft" 
                                    size="lg" 
                                    className="mb-4 inline-block"
                                >
                                    Our Collection
                                </Badge>
                                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800'>Inspirational Wallpapers</h2>
                                <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                                    Download these wallpapers for your devices and be inspired by God's word throughout your day.
                                </p>
                            </div>

                            {/* Filter component */}
                            <AlbumFilter />

                            {/* Statistics row */}
                            <div className="flex flex-wrap justify-center gap-4 md:gap-10 mb-12 text-center">
                                <div className="stat-box">
                                    <div className="text-3xl md:text-4xl font-bold text-primary">
                                        {initialAlbums.length}
                                    </div>
                                    <div className="text-gray-600">Albums</div>
                                </div>
                                
                                <div className="stat-box">
                                    <div className="text-3xl md:text-4xl font-bold text-primary">
                                        {initialAlbums.reduce((total, album) => total + album.attachments.length, 0)}
                                    </div>
                                    <div className="text-gray-600">Wallpapers</div>
                                </div>
                                
                                <div className="stat-box">
                                    <div className="text-3xl md:text-4xl font-bold text-primary">
                                        {favorites.length}
                                    </div>
                                    <div className="text-gray-600">Favorites</div>
                                </div>
                            </div>

                            <div className="gallery-content">
                                {filteredAlbums.length > 0 ? (
                                    filteredAlbums.map((album, index) => (
                                        album.attachments.length > 0 && (
                                            <div key={album.id} className='mb-20' id={`album_${album.id}`}>
                                                <div className="album-header mb-6">
                                                    <Card 
                                                        className="border-none bg-gray-50 shadow-md p-6 w-full"
                                                    >
                                                        <div className="max-w-screen-xl mx-auto">
                                                            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 flex items-center'>
                                                                <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                                                    <span className="text-primary text-lg font-bold">{index + 1}</span>
                                                                </span>
                                                                {album.name}
                                                                <span className="ml-3 text-base font-normal text-gray-500">
                                                                    ({album.attachments.length} images)
                                                                </span>
                                                            </h2>
                                                            {album.description && (
                                                                <p className="text-gray-600 mt-2 max-w-3xl">{album.description}</p>
                                                            )}
                                                        </div>
                                                    </Card>
                                                </div>
                                                <ShowGallery attachments={album.attachments} albumElement={`album_${album.id}`} />
                                            </div>
                                        )
                                    ))
                                ) : (
                                    <EmptyState />
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            
            {/* CSS for Masonry layout */}
            <style>{`
                .my-masonry-grid {
                    display: flex;
                    margin-left: -30px;
                    width: auto;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                .my-masonry-grid_column {
                    padding-left: 30px;
                    background-clip: padding-box;
                }
            `}</style>
        </GuestLayout>
    );
}