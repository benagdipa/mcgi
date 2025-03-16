import Guest from '@/Layouts/GuestLayout'
import { Head, Link } from '@inertiajs/react';
import { DateTime } from 'luxon';
import WOW from 'react-wow';
import React, { useState, useEffect } from 'react';
import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import { FaRegCalendarAlt, FaTag, FaArrowLeft, FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaRegClock, FaEye, FaRegBookmark, FaBookmark, FaLink, FaRegEnvelope, FaChevronRight, FaPaperPlane } from "react-icons/fa";
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { motion } from 'framer-motion';

export default function SingleBlogPage({ auth, post, categories, tags, relatedPosts }) {
    const date = DateTime.fromISO(post?.created_at, 'MM/dd/yyyy HH:mm:ss');
    const [isSaved, setIsSaved] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showNewsletterModal, setShowNewsletterModal] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
    const [newsletterError, setNewsletterError] = useState('');
    const [commentName, setCommentName] = useState('');
    const [commentEmail, setCommentEmail] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [commentErrors, setCommentErrors] = useState({});
    const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
    
    useEffect(() => {
        // Check if post is saved in localStorage
        const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
        setIsSaved(savedPosts.includes(post.id));
        
        // Increment view counter
        const postViewed = localStorage.getItem(`post_viewed_${post.id}`);
        if (!postViewed) {
            localStorage.setItem(`post_viewed_${post.id}`, 'true');
            // You could make an API call here to increment the view count on the server
        }
        
        // Auto-scroll to hash if present
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [post.id]);
    
    const toggleSave = () => {
        const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
        
        if (isSaved) {
            const updatedSavedPosts = savedPosts.filter(id => id !== post.id);
            localStorage.setItem('savedPosts', JSON.stringify(updatedSavedPosts));
        } else {
            savedPosts.push(post.id);
            localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
        }
        
        setIsSaved(!isSaved);
    };
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowShareModal(false);
    };
    
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        setNewsletterError('');
        
        if (!newsletterEmail) {
            setNewsletterError('Email is required');
            return;
        }
        
        if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
            setNewsletterError('Please enter a valid email');
            return;
        }
        
        // Here you would typically make an API call to subscribe the user
        // For now, we'll just simulate success
        setNewsletterSubmitted(true);
        
        // Close the modal after a delay
        setTimeout(() => {
            setShowNewsletterModal(false);
            // Reset state after closing
            setTimeout(() => {
                setNewsletterSubmitted(false);
                setNewsletterEmail('');
            }, 500);
        }, 2000);
    };
    
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        
        if (!commentName) errors.name = 'Name is required';
        if (!commentEmail) errors.email = 'Email is required';
        if (commentEmail && !/\S+@\S+\.\S+/.test(commentEmail)) errors.email = 'Please enter a valid email';
        if (!commentContent) errors.content = 'Comment is required';
        
        if (Object.keys(errors).length > 0) {
            setCommentErrors(errors);
            return;
        }
        
        setIsCommentSubmitting(true);
        setCommentErrors({});
        
        // Here you would typically make an API call to submit the comment
        // For now, we'll just simulate success
        setTimeout(() => {
            setIsCommentSubmitting(false);
            setCommentName('');
            setCommentEmail('');
            setCommentContent('');
            // Show success message
            alert('Comment submitted successfully! It will be visible after approval.');
        }, 1000);
    };
    
    const ShowCategories = ({ list }) => {
        if (list) {
            const postCategories = list.split(',')
            return postCategories?.map((cat, index) => {
                const postCategory = categories.filter(item => item.id === parseInt(cat))
                return (
                    <Badge 
                        key={postCategory[0].id}
                        color="primary" 
                        variant="soft"
                        className="mr-2"
                    >
                        {postCategory[0].title}
                    </Badge>
                )
            })
        }
    }

    const ShowTags = ({ list }) => {
        if (list) {
            const postTags = list.split(',')
            return postTags?.map((tag) => {
                const postTag = tags.filter(item => item.id === parseInt(tag))
                return (
                    <Badge 
                        key={postTag[0].id}
                        color="secondary" 
                        variant="light"
                        className="mr-2 mb-2"
                        icon={<FaTag className="mr-1" />}
                    >
                        {postTag[0].title}
                    </Badge>
                )
            })
        }
    }
    
    return (
        <Guest user={auth?.user}>
            <Head>
                <title>{post.title}</title>
                <meta name="title" content={post.meta_title || post.title} />
                <meta name="keywords" content={post.seo_keywords || ''} />
                <meta name="description" content={post.meta_description || post.excerpt || ''} />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content={post.meta_title || post.title} />
                <meta property="og:description" content={post.meta_description || post.excerpt || ''} />
                <meta property="og:image" content={post.featured_image} />
                
                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={window.location.href} />
                <meta property="twitter:title" content={post.meta_title || post.title} />
                <meta property="twitter:description" content={post.meta_description || post.excerpt || ''} />
                <meta property="twitter:image" content={post.featured_image} />
            </Head>
            
            <div className="single-post">
                <div className="page-header pt-[70px] md:pt-80 pb-28 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-0">
                        {post.featured_image && (
                            <img 
                                src={post.featured_image} 
                                alt={post.title} 
                                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
                            />
                        )}
                    </div>
                    <WOW animation='slideLeftToRight'>
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto relative z-10">
                            <Link 
                                href={route("blogs.index")} 
                                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
                            >
                                <FaArrowLeft className="mr-2" />
                                Back to Articles
                            </Link>
                            
                            {post.categories && (
                                <div className="mb-4 flex flex-wrap gap-2">
                                    <ShowCategories list={post.categories} />
                                </div>
                            )}
                            
                            <h1 className="font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
                                {post.title}
                            </h1>
                            
                            <div className="meta flex flex-wrap items-center text-white/80 gap-4 mb-6">
                                <div className="post-date flex items-center">
                                    <FaRegCalendarAlt className="mr-2" />
                                    <span className="font-medium">
                                        {date.toFormat('LLLL dd, yyyy')}
                                    </span>
                                </div>
                                
                                <div className="reading-time flex items-center">
                                    <FaRegClock className="mr-2" />
                                    <span className="font-medium">
                                        {post.reading_time || 5} min read
                                    </span>
                                </div>
                                
                                <div className="views flex items-center">
                                    <FaEye className="mr-2" />
                                    <span className="font-medium">
                                        {post.views || 0} views
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setShowShareModal(true)} 
                                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center transition-colors"
                                >
                                    <FaShareAlt className="mr-2" />
                                    Share
                                </button>
                                
                                <button 
                                    onClick={toggleSave} 
                                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center transition-colors"
                                >
                                    {isSaved ? (
                                        <>
                                            <FaBookmark className="mr-2" />
                                            Saved
                                        </>
                                    ) : (
                                        <>
                                            <FaRegBookmark className="mr-2" />
                                            Save
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </WOW>
                </div>
                
                <div className="post-content py-16">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-8">
                                <WOW animation='fadeIn'>
                                    <Card className="border-none shadow-xl overflow-hidden">
                                        {post.featured_image && (
                                            <div className="featured-image mb-8">
                                                <img 
                                                    src={post.featured_image} 
                                                    alt={post.title} 
                                                    className="w-full h-auto rounded-t-lg"
                                                />
                                            </div>
                                        )}
                                        
                                        <div className="px-8 pb-8">
                                            <article className="prose lg:prose-lg max-w-none">
                                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                            </article>
                                            
                                            {post.tags && (
                                                <div className="mt-8 pt-8 border-t border-gray-200">
                                                    <h3 className="text-lg font-semibold mb-4">Tags</h3>
                                                    <div className="flex flex-wrap">
                                                        <ShowTags list={post.tags} />
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="mt-8 pt-8 border-t border-gray-200">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                    <div className="share">
                                                        <h3 className="text-lg font-semibold mb-2">Share this post</h3>
                                                        <div className="flex gap-2">
                                                            <a 
                                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="bg-[#3b5998] text-white p-2 rounded-full"
                                                            >
                                                                <FaFacebookF />
                                                            </a>
                                                            <a 
                                                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="bg-[#1da1f2] text-white p-2 rounded-full"
                                                            >
                                                                <FaTwitter />
                                                            </a>
                                                            <a 
                                                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="bg-[#0e76a8] text-white p-2 rounded-full"
                                                            >
                                                                <FaLinkedinIn />
                                                            </a>
                                                            <button 
                                                                onClick={copyToClipboard}
                                                                className="bg-gray-700 text-white p-2 rounded-full"
                                                            >
                                                                <FaLink />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="save">
                                                        <button 
                                                            onClick={toggleSave}
                                                            className={`flex items-center gap-2 py-2 px-4 rounded-full transition-colors ${isSaved ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                        >
                                                            {isSaved ? (
                                                                <>
                                                                    <FaBookmark /> Saved
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <FaRegBookmark /> Save for later
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </WOW>
                                
                                {post.allow_comments && (
                                    <WOW animation='fadeIn' delay="0.1s">
                                        <div className="mt-12">
                                            <Card className="border-none shadow-xl">
                                                <div className="px-8 py-8">
                                                    <h3 className="text-2xl font-bold mb-6">Leave a Comment</h3>
                                                    
                                                    <form onSubmit={handleCommentSubmit}>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                                                <TextInput
                                                                    type="text"
                                                                    className="w-full"
                                                                    value={commentName}
                                                                    onChange={(e) => setCommentName(e.target.value)}
                                                                />
                                                                <InputError message={commentErrors.name} className="mt-1" />
                                                            </div>
                                                            
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                                                <TextInput
                                                                    type="email"
                                                                    className="w-full"
                                                                    value={commentEmail}
                                                                    onChange={(e) => setCommentEmail(e.target.value)}
                                                                />
                                                                <InputError message={commentErrors.email} className="mt-1" />
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="mb-6">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Comment *</label>
                                                            <textarea
                                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                                                rows={5}
                                                                value={commentContent}
                                                                onChange={(e) => setCommentContent(e.target.value)}
                                                            ></textarea>
                                                            <InputError message={commentErrors.content} className="mt-1" />
                                                        </div>
                                                        
                                                        <div>
                                                            <PrimaryButton type="submit" disabled={isCommentSubmitting} className="flex items-center gap-2">
                                                                <FaPaperPlane />
                                                                {isCommentSubmitting ? 'Submitting...' : 'Post Comment'}
                                                            </PrimaryButton>
                                                        </div>
                                                    </form>
                                                </div>
                                            </Card>
                                        </div>
                                    </WOW>
                                )}
                            </div>
                            
                            <div className="lg:col-span-4">
                                <div className="sticky top-24 space-y-8">
                                    <WOW animation='fadeIn' delay="0.1s">
                                        <Card className="border-none shadow-xl overflow-hidden">
                                            <div className="bg-primary/10 px-6 py-4 border-b border-primary/20">
                                                <h3 className="font-bold text-xl text-gray-800">Join our Newsletter</h3>
                                            </div>
                                            
                                            <div className="p-6">
                                                <p className="text-gray-600 mb-4">Get the latest posts delivered right to your inbox.</p>
                                                
                                                <div className="flex space-x-2">
                                                    <SecondaryButton 
                                                        onClick={() => setShowNewsletterModal(true)}
                                                        className="w-full flex items-center justify-center"
                                                    >
                                                        <FaRegEnvelope className="mr-2" />
                                                        Subscribe Now
                                                    </SecondaryButton>
                                                </div>
                                            </div>
                                        </Card>
                                    </WOW>
                                    
                                    {relatedPosts && relatedPosts.length > 0 && (
                                        <WOW animation='fadeIn' delay="0.2s">
                                            <Card className="border-none shadow-xl overflow-hidden">
                                                <div className="bg-primary/10 px-6 py-4 border-b border-primary/20">
                                                    <h3 className="font-bold text-xl text-gray-800">Related Posts</h3>
                                                </div>
                                                
                                                <div className="p-6 space-y-6">
                                                    {relatedPosts.map(relatedPost => (
                                                        <div key={relatedPost.id} className="flex space-x-4 pb-4 last:pb-0 last:border-b-0 border-b border-gray-100">
                                                            <div className="flex-shrink-0">
                                                                <Link href={route('blogs.show', relatedPost.slug)}>
                                                                    <img 
                                                                        src={relatedPost.featured_image || '/images/blog-placeholder.jpg'} 
                                                                        alt={relatedPost.title} 
                                                                        className="w-20 h-20 object-cover rounded-md"
                                                                    />
                                                                </Link>
                                                            </div>
                                                            
                                                            <div className="flex-grow">
                                                                <Link 
                                                                    href={route('blogs.show', relatedPost.slug)}
                                                                    className="font-medium text-gray-800 hover:text-primary transition-colors line-clamp-2"
                                                                >
                                                                    {relatedPost.title}
                                                                </Link>
                                                                
                                                                <div className="text-sm text-gray-500 mt-1 flex items-center">
                                                                    <FaRegCalendarAlt className="mr-1" />
                                                                    {DateTime.fromISO(relatedPost.created_at).toFormat('LLL dd, yyyy')}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    
                                                    <Link 
                                                        href={route('blogs.index')}
                                                        className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
                                                    >
                                                        View all posts
                                                        <FaChevronRight className="ml-2 text-xs" />
                                                    </Link>
                                                </div>
                                            </Card>
                                        </WOW>
                                    )}
                                    
                                    <WOW animation='fadeIn' delay="0.3s">
                                        <Card className="border-none shadow-xl overflow-hidden">
                                            <div className="bg-primary/10 px-6 py-4 border-b border-primary/20">
                                                <h3 className="font-bold text-xl text-gray-800">Tags</h3>
                                            </div>
                                            
                                            <div className="p-6">
                                                <div className="flex flex-wrap gap-2">
                                                    {post.tags ? (
                                                        <ShowTags list={post.tags} />
                                                    ) : (
                                                        <p className="text-gray-500">No tags</p>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    </WOW>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Share Modal */}
            <Modal show={showShareModal} onClose={() => setShowShareModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Share this post</h2>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Post URL</label>
                        <div className="flex">
                            <TextInput
                                type="text"
                                className="flex-grow rounded-r-none"
                                value={window.location.href}
                                readOnly
                            />
                            <button
                                onClick={copyToClipboard}
                                className="px-4 bg-primary text-white rounded-r-md hover:bg-primary-dark transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                        <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center"
                        >
                            <div className="bg-[#3b5998] text-white p-4 rounded-full mb-2">
                                <FaFacebookF className="text-xl" />
                            </div>
                            <span className="text-sm text-gray-600">Facebook</span>
                        </a>
                        
                        <a 
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center"
                        >
                            <div className="bg-[#1da1f2] text-white p-4 rounded-full mb-2">
                                <FaTwitter className="text-xl" />
                            </div>
                            <span className="text-sm text-gray-600">Twitter</span>
                        </a>
                        
                        <a 
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center"
                        >
                            <div className="bg-[#0e76a8] text-white p-4 rounded-full mb-2">
                                <FaLinkedinIn className="text-xl" />
                            </div>
                            <span className="text-sm text-gray-600">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </Modal>
            
            {/* Newsletter Modal */}
            <Modal show={showNewsletterModal} onClose={() => setShowNewsletterModal(false)}>
                <div className="p-6">
                    {newsletterSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-8"
                        >
                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <FaRegEnvelope className="text-green-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
                            <p className="text-gray-600">
                                You have successfully subscribed to our newsletter.
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold mb-2">Subscribe to our Newsletter</h2>
                            <p className="text-gray-600 mb-4">
                                Stay updated with our latest articles and news.
                            </p>
                            
                            <form onSubmit={handleNewsletterSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <TextInput
                                        type="email"
                                        className="w-full"
                                        placeholder="your@email.com"
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                    />
                                    {newsletterError && (
                                        <InputError message={newsletterError} className="mt-1" />
                                    )}
                                </div>
                                
                                <div className="flex justify-end">
                                    <SecondaryButton 
                                        type="button" 
                                        onClick={() => setShowNewsletterModal(false)}
                                        className="mr-2"
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton type="submit">
                                        Subscribe
                                    </PrimaryButton>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </Modal>
        </Guest>
    );
}
