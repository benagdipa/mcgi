import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect, useCallback } from "react";
import { DateTime } from "luxon";
import { motion } from "framer-motion";
import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import { FaRegCalendarAlt, FaArrowRight, FaSpinner, FaSearch, FaFilter, FaTags, FaRegBookmark, FaBookmark, FaRegClock, FaEye, FaChevronDown, FaPaperPlane, FaEnvelope, FaFolder } from "react-icons/fa";
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { debounce } from 'lodash';
import { Tooltip } from "@material-tailwind/react";
import { Tab } from "@headlessui/react";
import ModernPlaceholder from '@/Components/svg/ModernPlaceholder';

export default function BlogsPage({ auth }) {
    const [posts, setPosts] = useState([]);
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [sortBy, setSortBy] = useState('latest');
    const [showFilters, setShowFilters] = useState(false);
    const [savedPosts, setSavedPosts] = useState([]);
    const [newsletterModal, setNewsletterModal] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState(null);
    const [newsletterError, setNewsletterError] = useState('');
    
    // Debounced search
    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };
    
    const debouncedSearch = useCallback(
        debounce((value) => {
            setDebouncedSearchQuery(value);
        }, 500),
        []
    );
    
    useEffect(() => {
        debouncedSearch(searchQuery);
    }, [searchQuery]);
    
    const fetchPosts = async (url) => {
        setLoading(true);
        try {
            const response = await axios.get("/blogs/getAllPost");
            
            // Get posts data
            const postsData = response.data.posts;
            
            // Add reading time to each post
            const postsWithReadingTime = postsData.map(post => {
                return {
                    ...post,
                    reading_time: calculateReadingTime(post.content || ''),
                };
            });
            
            setPosts((prevPosts) => [...prevPosts, ...postsWithReadingTime]);
            setNextPageUrl(response.data.next_page_url); // Set the URL for the next page
            
            // If this is the first load (no previous posts)
            if (posts.length === 0) {
                // Set featured posts (first 3 posts or posts marked as featured if available)
                const featured = postsWithReadingTime.filter(post => post.is_featured).slice(0, 3);
                if (featured.length === 0) {
                    setFeaturedPosts(postsWithReadingTime.slice(0, 3));
                } else {
                    setFeaturedPosts(featured);
                }
                
                // Extract unique categories and tags
                const uniqueCategories = [...new Set(postsWithReadingTime
                    .filter(post => post.category)
                    .map(post => post.category.name))];
                setCategories(uniqueCategories);
                
                // Extract unique tags
                const allTags = [];
                postsWithReadingTime.forEach(post => {
                    if (post.tags) {
                        const postTags = post.tags.split(',').map(tag => tag.trim());
                        allTags.push(...postTags);
                    }
                });
                const uniqueTags = [...new Set(allTags)];
                setTags(uniqueTags);
                
                // Get saved posts from localStorage
                const saved = JSON.parse(localStorage.getItem('savedPosts') || '[]');
                setSavedPosts(saved);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Handle load more
    const handleLoadMore = () => {
        if (nextPageUrl) {
            fetchPosts(nextPageUrl); // Fetch next set of posts
        }
    };
    
    // Calculate reading time
    const calculateReadingTime = (content) => {
        // Remove HTML tags
        const text = content.replace(/<[^>]+>/g, '');
        // Average reading speed: 225 words per minute
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 225);
        return readingTime < 1 ? 1 : readingTime;
    };
    
    // Toggle save post
    const toggleSavePost = (postId) => {
        const newSavedPosts = [...savedPosts];
        const index = newSavedPosts.indexOf(postId);
        
        if (index === -1) {
            // Save post
            newSavedPosts.push(postId);
        } else {
            // Unsave post
            newSavedPosts.splice(index, 1);
        }
        
        setSavedPosts(newSavedPosts);
        localStorage.setItem('savedPosts', JSON.stringify(newSavedPosts));
    };
    
    // Handle newsletter subscription
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        
        // Validate email
        if (!newsletterEmail || !/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
            setNewsletterError('Please enter a valid email address');
            return;
        }
        
        // Mock API call - replace with actual API call
        setNewsletterStatus('processing');
        setTimeout(() => {
            setNewsletterStatus('success');
            setNewsletterEmail('');
            setNewsletterError('');
            // Close the modal after 2 seconds
            setTimeout(() => {
                setNewsletterModal(false);
                setNewsletterStatus(null);
            }, 2000);
        }, 1500);
    };
    
    // Sort posts
    const sortPosts = (posts) => {
        if (sortBy === 'latest') {
            return [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
        if (sortBy === 'oldest') {
            return [...posts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }
        if (sortBy === 'popular') {
            return [...posts].sort((a, b) => (b.views || 0) - (a.views || 0));
        }
        return posts;
    };

    // Filter posts based on search query, selected category, and tag
    const filteredPosts = posts.filter(post => {
        const matchesSearch = debouncedSearchQuery === '' || 
            post.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || 
            (post.content && post.content.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
            
        const matchesCategory = selectedCategory === 'all' || 
            (post.category && post.category.name === selectedCategory);
            
        const matchesTag = selectedTag === 'all' || 
            (post.tags && post.tags.toLowerCase().includes(selectedTag.toLowerCase()));
            
        return matchesSearch && matchesCategory && matchesTag;
    });
    
    // Sort filtered posts
    const sortedPosts = sortPosts(filteredPosts);

    return (
        <Guest user={auth?.user}>
            <Head>
                <title>News, Blogs and Features</title>
                <meta name="title" content="News, Blogs and Features" />
                <meta name="keywords" content="MCGI News, Church Blogs, Christian Articles, Faith Features" />
                <meta
                    name="description"
                    content="Stay informed with the latest news, blogs, and feature articles from Members Church of God International. Discover inspiring stories, spiritual insights, and updates about our community's activities worldwide."
                />
            </Head>
            
            <div className="blogs-page">
                <div className="page-header pt-[70px] md:pt-60 pb-28 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70 z-0">
                        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20"></div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:max-w-screen-xl w-11/12 mx-auto relative z-10"
                    >
                        <Badge 
                            color="warning" 
                            variant="solid" 
                            size="lg" 
                            className="mb-4 shadow-lg"
                        >
                            Our Voice
                        </Badge>
                        <h1 className="font-bold text-5xl md:text-7xl text-white mb-6 leading-tight">
                            Articles & Blog
                            <span className="block text-xl md:text-2xl font-normal mt-4 text-white/80">
                                Discover inspiring stories and insights from our community
                            </span>
                        </h1>
                        <div className="breadcrumbs">
                            <div className="flex gap-4 font-medium text-white/80 items-center text-sm">
                                <Link 
                                    href={route("home")} 
                                    className="hover:text-white transition-colors"
                                >
                                    HOME
                                </Link>
                                <div className="divider text-white/60">/</div>
                                <span className="text-white">Articles</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                {/* Featured Articles Section */}
                {featuredPosts.length > 0 && (
                    <div className="featured-articles py-12 md:py-16 bg-gray-50">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="section-title mb-8">
                                    <div className="max-w-screen-xl mx-auto px-4">
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Articles</h2>
                                        <div className="w-20 h-1 bg-primary"></div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {featuredPosts.map((post, index) => {
                                        const date = DateTime.fromISO(post?.created_at, { zone: "utc" });
                                        const isSaved = savedPosts.includes(post.id);
                                        
                                        return (
                                            <motion.div
                                                key={post?.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                            >
                                                <Card 
                                                    className="featured-card h-full flex flex-col border-none hover:shadow-xl transition-all duration-300 overflow-hidden"
                                                    hover={true}
                                                >
                                                    <div className="relative">
                                                        <Link
                                                            href={route("blogs.show", post.slug)}
                                                            className="block overflow-hidden"
                                                        >
                                                            <div className="image-container overflow-hidden h-60">
                                                                {post?.featured_image ? (
                                                                    <img
                                                                        src={post.featured_image}
                                                                        alt={post?.title}
                                                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                                                    />
                                                                ) : (
                                                                    <ModernPlaceholder theme="featured" />
                                                                )}
                                                            </div>
                                                        </Link>
                                                        <Badge 
                                                            color="primary" 
                                                            variant="solid"
                                                            className="absolute top-4 left-4"
                                                        >
                                                            Featured
                                                        </Badge>
                                                        <button 
                                                            onClick={() => toggleSavePost(post.id)}
                                                            className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                                                            aria-label={isSaved ? "Unsave post" : "Save post"}
                                                        >
                                                            {isSaved ? (
                                                                <FaBookmark className="text-primary" />
                                                            ) : (
                                                                <FaRegBookmark className="text-gray-600" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="content p-6 flex-grow flex flex-col">
                                                        {post.category && (
                                                            <Badge 
                                                                color="secondary" 
                                                                variant="light"
                                                                className="mb-2"
                                                            >
                                                                {post.category.name}
                                                            </Badge>
                                                        )}
                                                        
                                                        <Link
                                                            href={route("blogs.show", post.slug)}
                                                            className="block"
                                                        >
                                                            <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-primary transition-colors line-clamp-2">
                                                                {post?.title}
                                                            </h3>
                                                        </Link>
                                                        
                                                        <div className="meta flex items-center text-sm text-gray-500 mb-3 gap-4">
                                                            <div className="flex items-center">
                                                                <FaRegCalendarAlt className="mr-2" />
                                                                <span>
                                                                    {date.toFormat("LLLL dd, yyyy")}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <FaRegClock className="mr-2" />
                                                                <span>{post.reading_time} min read</span>
                                                            </div>
                                                        </div>
                                                        
                                                        <div 
                                                            className="description text-gray-600 mb-4 flex-grow line-clamp-3"
                                                            dangerouslySetInnerHTML={{
                                                                __html: post?.content
                                                                    ? post.content
                                                                        .replace(/<img.*?>/g, "") // Remove image tags
                                                                        .replace(/<[^>]+>/g, "") // Remove all other HTML tags
                                                                        .replace(/&nbsp;/g, " ") // Replace &nbsp; with regular space
                                                                        .substring(0, 150) + "..."
                                                                    : "",
                                                            }}
                                                        />
                                                        
                                                        <Link
                                                            href={route("blogs.show", post.slug)}
                                                            className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors mt-auto"
                                                        >
                                                            Read More
                                                            <FaArrowRight className="ml-2 text-sm" />
                                                        </Link>
                                                    </div>
                                                </Card>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
                
                <div className="content-wrapper py-16 md:py-24">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="section-title text-center mb-12">
                                <Badge 
                                    color="primary" 
                                    variant="soft" 
                                    size="lg" 
                                    className="mb-4 inline-block"
                                >
                                    Latest Updates
                                </Badge>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Articles</h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    Explore our collection of articles, stories, and insights from the MCGI community. 
                                    Stay informed and inspired by the latest updates.
                                </p>
                            </div>
                            
                            {/* Newsletter CTA */}
                            <div className="newsletter-cta bg-gradient-to-r from-primary/90 to-primary/70 rounded-2xl p-8 mb-12 text-center text-white">
                                <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                                <p className="mb-6 max-w-2xl mx-auto">Get the latest articles, news, and spiritual insights delivered directly to your inbox.</p>
                                <button
                                    onClick={() => setNewsletterModal(true)}
                                    className="inline-flex items-center bg-white text-primary font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    Subscribe Now
                                    <FaPaperPlane className="ml-2" />
                                </button>
                            </div>
                            
                            {/* Search and Filter */}
                            <div className="search-filter-container mb-12 bg-white rounded-xl shadow-sm border p-6">
                                <div className="flex flex-col lg:flex-row gap-6 justify-between">
                                    <div className="search-container lg:w-1/2">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search articles..."
                                                value={searchQuery}
                                                onChange={(e) => handleSearchChange(e.target.value)}
                                                className="w-full py-3.5 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            />
                                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setShowFilters(!showFilters)}
                                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                                                    showFilters ? 'bg-primary/5 border-primary text-primary' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <FaFilter size={14} />
                                                <span className="font-medium">Filters</span>
                                            </button>
                                            
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            >
                                                <option value="latest">Latest</option>
                                                <option value="oldest">Oldest</option>
                                                <option value="popular">Most Popular</option>
                                            </select>
                                        </div>
                                        
                                        <button
                                            onClick={() => setNewsletterModal(true)}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all ml-auto"
                                        >
                                            <FaEnvelope size={14} />
                                            <span className="font-medium">Subscribe</span>
                                        </button>
                                    </div>
                                </div>
                                
                                {showFilters && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mt-6 pt-6 border-t border-gray-100"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                    <FaFolder className="text-primary" size={16} />
                                                    Categories
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge 
                                                        color={selectedCategory === 'all' ? "primary" : "secondary"}
                                                        variant={selectedCategory === 'all' ? "solid" : "light"}
                                                        className="cursor-pointer transition-all"
                                                        onClick={() => setSelectedCategory('all')}
                                                    >
                                                        All
                                                    </Badge>
                                                    {categories.map((category, index) => (
                                                        <Badge 
                                                            key={index}
                                                            color={selectedCategory === category ? "primary" : "secondary"}
                                                            variant={selectedCategory === category ? "solid" : "light"}
                                                            className="cursor-pointer transition-all"
                                                            onClick={() => setSelectedCategory(category)}
                                                        >
                                                            {category}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                    <FaTags className="text-primary" size={16} />
                                                    Tags
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge 
                                                        color={selectedTag === 'all' ? "primary" : "secondary"}
                                                        variant={selectedTag === 'all' ? "solid" : "light"}
                                                        className="cursor-pointer transition-all"
                                                        onClick={() => setSelectedTag('all')}
                                                    >
                                                        All
                                                    </Badge>
                                                    {tags.map((tag, index) => (
                                                        <Badge 
                                                            key={index}
                                                            color={selectedTag === tag ? "primary" : "secondary"}
                                                            variant={selectedTag === tag ? "solid" : "light"}
                                                            className="cursor-pointer transition-all"
                                                            onClick={() => setSelectedTag(tag)}
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                            
                            {/* Results Count */}
                            {debouncedSearchQuery && (
                                <div className="mb-8">
                                    <p className="text-gray-600">
                                        Found <span className="font-semibold">{sortedPosts.length}</span> {sortedPosts.length === 1 ? 'result' : 'results'} for 
                                        <span className="font-semibold italic"> "{debouncedSearchQuery}"</span>
                                    </p>
                                </div>
                            )}
                            
                            {/* Blog Posts Grid */}
                            <div className="blog-posts">
                                {sortedPosts.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-screen-xl px-4">
                                        {sortedPosts.map((post, index) => {
                                            const date = DateTime.fromISO(post?.created_at, { zone: "utc" });
                                            const isSaved = savedPosts.includes(post.id);
                                            
                                            return (
                                                <motion.div
                                                    key={post?.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                                                >
                                                    <Card 
                                                        className="blog-card h-full flex flex-col bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl"
                                                        hover={true}
                                                    >
                                                        <div className="relative">
                                                            <Link
                                                                href={route("blogs.show", post.slug)}
                                                                className="block overflow-hidden aspect-[16/9]"
                                                            >
                                                                {post?.featured_image ? (
                                                                    <img
                                                                        src={post.featured_image}
                                                                        alt={post?.title}
                                                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                                                    />
                                                                ) : (
                                                                    <ModernPlaceholder theme="blog" className="h-full w-full" />
                                                                )}
                                                            </Link>
                                                            <button
                                                                onClick={() => toggleSavePost(post.id)}
                                                                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                                                            >
                                                                {isSaved ? (
                                                                    <FaBookmark className="text-primary" />
                                                                ) : (
                                                                    <FaRegBookmark className="text-gray-600" />
                                                                )}
                                                            </button>
                                                        </div>
                                                        
                                                        <div className="content p-6 flex-grow flex flex-col">
                                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                                                <div className="flex items-center gap-1.5">
                                                                    <FaRegCalendarAlt size={14} />
                                                                    <span>{date.toFormat('LLL dd, yyyy')}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <FaRegClock size={14} />
                                                                    <span>{post.reading_time} min read</span>
                                                                </div>
                                                            </div>
                                                            
                                                            {post.category && (
                                                                <Badge 
                                                                    color="secondary" 
                                                                    variant="light"
                                                                    className="mb-3 self-start"
                                                                >
                                                                    {post.category.name}
                                                                </Badge>
                                                            )}
                                                            
                                                            <Link
                                                                href={route("blogs.show", post.slug)}
                                                                className="block flex-grow"
                                                            >
                                                                <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-primary transition-colors line-clamp-2">
                                                                    {post?.title}
                                                                </h3>
                                                                <p className="text-gray-600 line-clamp-3 mb-4">
                                                                    {post?.excerpt || post?.content?.substring(0, 150)}...
                                                                </p>
                                                            </Link>
                                                            
                                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                                    <FaEye size={14} />
                                                                    <span>{post.views || 0} views</span>
                                                                </div>
                                                                <Link
                                                                    href={route("blogs.show", post.slug)}
                                                                    className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-1"
                                                                >
                                                                    Read More
                                                                    <FaArrowRight size={14} />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="max-w-md mx-auto">
                                            <ModernPlaceholder theme="empty" className="w-48 h-48 mx-auto mb-6" />
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Articles Found</h3>
                                            <p className="text-gray-600">
                                                We couldn't find any articles matching your criteria. Try adjusting your filters or search terms.
                                            </p>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Loading Indicator */}
                                {loading && (
                                    <div className="flex justify-center items-center mt-8">
                                        <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                                            <FaSpinner className="animate-spin text-primary" />
                                            <span className="text-gray-700">Loading articles...</span>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Load More Button */}
                                {nextPageUrl && !loading && sortedPosts.length > 0 && (
                                    <div className="text-center mt-12">
                                        <button
                                            onClick={() => fetchPosts(nextPageUrl)}
                                            disabled={loading}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            {loading ? (
                                                <>
                                                    <FaSpinner className="animate-spin" />
                                                    Loading...
                                                </>
                                            ) : (
                                                <>
                                                    Load More
                                                    <FaChevronDown />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            
            {/* Newsletter Subscription Modal */}
            <Modal show={newsletterModal} onClose={() => setNewsletterModal(false)} maxWidth="md">
                <div className="p-6">
                    <div className="text-center mb-8">
                        <div className="inline-flex p-4 bg-primary/10 text-primary rounded-full mb-4">
                            <FaPaperPlane className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Subscribe to Our Newsletter</h3>
                        <p className="text-gray-600">
                            Get the latest articles, news, and spiritual insights delivered directly to your inbox.
                        </p>
                    </div>
                    
                    {newsletterStatus === 'success' ? (
                        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <FaCheckCircle className="text-green-500 mr-2" />
                                <span>Thank you for subscribing to our newsletter!</span>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleNewsletterSubmit} className="space-y-6">
                            <div>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <TextInput
                                        id="newsletter-email"
                                        type="email"
                                        name="email"
                                        value={newsletterEmail}
                                        className="pl-10 mt-1 block w-full"
                                        placeholder="Your email address"
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                    />
                                </div>
                                <InputError message={newsletterError} className="mt-2" />
                            </div>
                            
                            <div className="flex justify-end">
                                <PrimaryButton 
                                    className="w-full justify-center py-2.5 text-base" 
                                    disabled={newsletterStatus === 'processing'}
                                >
                                    {newsletterStatus === 'processing' ? 'Subscribing...' : 'Subscribe'}
                                </PrimaryButton>
                            </div>
                            
                            <p className="text-sm text-gray-500 text-center">
                                By subscribing, you agree to receive emails from MCGI. You can unsubscribe at any time.
                            </p>
                        </form>
                    )}
                </div>
            </Modal>
        </Guest>
    );
}
