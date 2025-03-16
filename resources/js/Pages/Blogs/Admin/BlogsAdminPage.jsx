import React, { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { DateTime } from "luxon";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import Badge from "@/Components/Badge";
import Card from "@/Components/Card";
import { FaPlus, FaPencilAlt, FaTrash, FaEye, FaSearch, FaFilter, FaCalendarAlt, FaSyncAlt, FaRegClock, FaEyeSlash, FaBookmark, FaStream, FaSort, FaChevronUp, FaChevronDown, FaCog, FaUndo } from "react-icons/fa";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { Tab } from "@headlessui/react";
import { Tooltip } from "@material-tailwind/react";

export default function BlogsAdminPage({ auth, posts, categories, tags, stats }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [targetPost, setTargetPost] = useState(null);
    const [forceDelete, setForceDelete] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [activeTab, setActiveTab] = useState(0);
    const [filterBy, setFilterBy] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [sortDirection, setSortDirection] = useState('desc');
    const [showSettings, setShowSettings] = useState(false);
    const [columnsToShow, setColumnsToShow] = useState({
        title: true,
        status: true,
        author: true,
        category: true,
        date: true,
        actions: true,
    });
    
    // Filter and sort posts when dependencies change
    useEffect(() => {
        let result = [...posts];
        
        // Apply tab filters
        if (activeTab === 1) {
            result = result.filter(post => post.status === 'published');
        } else if (activeTab === 2) {
            result = result.filter(post => post.status === 'draft');
        } else if (activeTab === 3) {
            result = result.filter(post => post.status === 'scheduled');
        } else if (activeTab === 4) {
            result = result.filter(post => post.deleted_at !== null);
        }
        
        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(post => 
                post.title.toLowerCase().includes(query) ||
                (post.author && post.author.name && post.author.name.toLowerCase().includes(query))
            );
        }
        
        // Apply additional filters
        if (filterBy !== 'all') {
            if (filterBy === 'featured') {
                result = result.filter(post => post.is_featured);
            } else if (filterBy === 'with_comments') {
                result = result.filter(post => post.allow_comments);
            } else if (filterBy === 'no_comments') {
                result = result.filter(post => !post.allow_comments);
            } else if (filterBy.startsWith('category_')) {
                const categoryId = filterBy.replace('category_', '');
                result = result.filter(post => 
                    post.categories && post.categories.includes(categoryId)
                );
            } else if (filterBy.startsWith('tag_')) {
                const tagId = filterBy.replace('tag_', '');
                result = result.filter(post => 
                    post.tags && post.tags.includes(tagId)
                );
            }
        }
        
        // Apply sorting
        result.sort((a, b) => {
            let comparison = 0;
            
            if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title);
            } else if (sortBy === 'newest') {
                comparison = new Date(b.created_at) - new Date(a.created_at);
            } else if (sortBy === 'updated') {
                comparison = new Date(b.updated_at) - new Date(a.updated_at);
            } else if (sortBy === 'views') {
                comparison = (b.views || 0) - (a.views || 0);
            } else if (sortBy === 'status') {
                comparison = a.status.localeCompare(b.status);
            }
            
            return sortDirection === 'asc' ? comparison : -comparison;
        });
        
        setFilteredPosts(result);
    }, [posts, searchQuery, activeTab, filterBy, sortBy, sortDirection]);
    
    const confirmDelete = (post, force = false) => {
        setTargetPost(post);
        setForceDelete(force);
        setShowDeleteModal(true);
    };
    
    const handleDelete = () => {
        if (forceDelete) {
            router.delete(route('admin.blogs.force.delete', targetPost.id));
        } else {
            router.delete(route('admin.blogs.delete', targetPost.id));
        }
        setShowDeleteModal(false);
    };
    
    const handleRestore = (post) => {
        router.post(route('admin.blogs.restore', post.id));
    };
    
    const tabStyles = {
        base: "px-4 py-2.5 text-sm font-medium border-b-2 border-transparent focus:outline-none",
        selected: "text-primary border-primary",
        notSelected: "text-gray-500 hover:text-gray-700 hover:border-gray-300",
    };
    
    const getTruncatedContent = (content) => {
        if (!content) return '';
        
        // Strip HTML tags and get plain text
        const plainText = content.replace(/<[^>]+>/g, '');
        
        // Return truncated text
        return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
    };
    
    const getStatusBadge = (status, deletedAt, publishedAt) => {
        if (deletedAt) {
            return <Badge color="danger" variant="soft">Trashed</Badge>;
        }
        
        switch (status) {
            case 'published':
                return <Badge color="success" variant="solid">Published</Badge>;
            case 'draft':
                return <Badge color="gray" variant="soft">Draft</Badge>;
            case 'scheduled':
                const isInFuture = publishedAt && new Date(publishedAt) > new Date();
                return (
                    <Badge color="primary" variant="soft" className="flex items-center gap-1">
                        <FaCalendarAlt className="text-xs" />
                        Scheduled
                    </Badge>
                );
            default:
                return <Badge color="gray" variant="soft">{status}</Badge>;
        }
    };
    
    const toggleSort = (field) => {
        if (sortBy === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('desc');
        }
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Manage Blog Posts
                    </h2>
                    <PrimaryButton onClick={() => router.visit(route('admin.blogs.add'))}>
                        <FaPlus className="mr-2" /> New Post
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Manage Blog Posts" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="bg-white flex items-center px-4 py-5">
                            <div className="flex-shrink-0 p-3 mr-4 bg-blue-100 rounded-full">
                                <FaStream className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Posts</p>
                                <p className="text-3xl font-semibold text-gray-900">{stats.total}</p>
                            </div>
                        </Card>
                        
                        <Card className="bg-white flex items-center px-4 py-5">
                            <div className="flex-shrink-0 p-3 mr-4 bg-green-100 rounded-full">
                                <FaEye className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Published</p>
                                <p className="text-3xl font-semibold text-gray-900">{stats.published}</p>
                            </div>
                        </Card>
                        
                        <Card className="bg-white flex items-center px-4 py-5">
                            <div className="flex-shrink-0 p-3 mr-4 bg-yellow-100 rounded-full">
                                <FaRegClock className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Drafts</p>
                                <p className="text-3xl font-semibold text-gray-900">{stats.drafts}</p>
                            </div>
                        </Card>
                        
                        <Card className="bg-white flex items-center px-4 py-5">
                            <div className="flex-shrink-0 p-3 mr-4 bg-red-100 rounded-full">
                                <FaTrash className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Trashed</p>
                                <p className="text-3xl font-semibold text-gray-900">{stats.trashed}</p>
                            </div>
                        </Card>
                    </div>
                    
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="flex-grow md:max-w-md relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaSearch className="h-5 w-5 text-gray-400" />
                                </div>
                                <TextInput
                                    type="text"
                                    className="pl-10 pr-4 py-2 w-full"
                                    placeholder="Search posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowSettings(!showSettings)}
                                        className="flex items-center gap-1 text-sm text-gray-500 py-2 px-3 rounded-md hover:bg-gray-100"
                                    >
                                        <FaCog className="mr-1" /> 
                                        Columns
                                    </button>
                                    
                                    {showSettings && (
                                        <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-20 p-3 border">
                                            <h3 className="text-sm font-medium text-gray-700 mb-2">Show/Hide Columns</h3>
                                            {Object.keys(columnsToShow).map((column) => (
                                                <div key={column} className="flex items-center py-1">
                                                    <input
                                                        type="checkbox"
                                                        id={`col-${column}`}
                                                        checked={columnsToShow[column]}
                                                        onChange={() => setColumnsToShow({
                                                            ...columnsToShow,
                                                            [column]: !columnsToShow[column]
                                                        })}
                                                        className="rounded border-gray-300 text-primary focus:ring-primary"
                                                    />
                                                    <label htmlFor={`col-${column}`} className="ml-2 text-sm text-gray-700 capitalize">
                                                        {column}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="relative">
                                    <select
                                        className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-sm"
                                        value={filterBy}
                                        onChange={(e) => setFilterBy(e.target.value)}
                                    >
                                        <option value="all">All Posts</option>
                                        <option value="featured">Featured Posts</option>
                                        <option value="with_comments">Comments Allowed</option>
                                        <option value="no_comments">Comments Disabled</option>
                                        <optgroup label="Categories">
                                            {categories.map((category) => (
                                                <option key={category.id} value={`category_${category.id}`}>
                                                    {category.title}
                                                </option>
                                            ))}
                                        </optgroup>
                                        <optgroup label="Tags">
                                            {tags.map((tag) => (
                                                <option key={tag.id} value={`tag_${tag.id}`}>
                                                    {tag.title}
                                                </option>
                                            ))}
                                        </optgroup>
                                    </select>
                                </div>
                                
                                <div className="relative">
                                    <select
                                        className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-sm"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="updated">Last Updated</option>
                                        <option value="title">Title</option>
                                        <option value="views">Views</option>
                                        <option value="status">Status</option>
                                    </select>
                                    
                                    <button
                                        onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                                        className="ml-1 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark"
                                    >
                                        {sortDirection === 'asc' ? (
                                            <FaChevronUp className="h-3 w-3" />
                                        ) : (
                                            <FaChevronDown className="h-3 w-3" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                            <Tab.List className="flex border-b border-gray-200">
                                <Tab className={({ selected }) => `${tabStyles.base} ${selected ? tabStyles.selected : tabStyles.notSelected}`}>
                                    All Posts
                                </Tab>
                                <Tab className={({ selected }) => `${tabStyles.base} ${selected ? tabStyles.selected : tabStyles.notSelected}`}>
                                    Published
                                </Tab>
                                <Tab className={({ selected }) => `${tabStyles.base} ${selected ? tabStyles.selected : tabStyles.notSelected}`}>
                                    Drafts
                                </Tab>
                                <Tab className={({ selected }) => `${tabStyles.base} ${selected ? tabStyles.selected : tabStyles.notSelected}`}>
                                    Scheduled
                                </Tab>
                                <Tab className={({ selected }) => `${tabStyles.base} ${selected ? tabStyles.selected : tabStyles.notSelected}`}>
                                    Trash
                                </Tab>
                            </Tab.List>
                            
                            <Tab.Panels>
                                {[0, 1, 2, 3, 4].map((tabIndex) => (
                                    <Tab.Panel key={tabIndex} className="px-4 py-5 sm:p-6">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        {columnsToShow.title && (
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                                onClick={() => toggleSort('title')}
                                                            >
                                                                <div className="flex items-center space-x-1">
                                                                    <span>Title</span>
                                                                    {sortBy === 'title' && (
                                                                        sortDirection === 'asc' ? 
                                                                        <FaChevronUp className="h-3 w-3" /> : 
                                                                        <FaChevronDown className="h-3 w-3" />
                                                                    )}
                                                                </div>
                                                            </th>
                                                        )}
                                                        
                                                        {columnsToShow.status && (
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                                onClick={() => toggleSort('status')}
                                                            >
                                                                <div className="flex items-center space-x-1">
                                                                    <span>Status</span>
                                                                    {sortBy === 'status' && (
                                                                        sortDirection === 'asc' ? 
                                                                        <FaChevronUp className="h-3 w-3" /> : 
                                                                        <FaChevronDown className="h-3 w-3" />
                                                                    )}
                                                                </div>
                                                            </th>
                                                        )}
                                                        
                                                        {columnsToShow.author && (
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Author
                                                            </th>
                                                        )}
                                                        
                                                        {columnsToShow.category && (
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Category
                                                            </th>
                                                        )}
                                                        
                                                        {columnsToShow.date && (
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                                onClick={() => toggleSort('newest')}
                                                            >
                                                                <div className="flex items-center space-x-1">
                                                                    <span>Date</span>
                                                                    {sortBy === 'newest' && (
                                                                        sortDirection === 'asc' ? 
                                                                        <FaChevronUp className="h-3 w-3" /> : 
                                                                        <FaChevronDown className="h-3 w-3" />
                                                                    )}
                                                                </div>
                                                            </th>
                                                        )}
                                                        
                                                        {columnsToShow.actions && (
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Actions
                                                            </th>
                                                        )}
                                                    </tr>
                                                </thead>
                                                
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {filteredPosts.length > 0 ? (
                                                        filteredPosts.map((post) => (
                                                            <tr key={post.id} className="hover:bg-gray-50">
                                                                {columnsToShow.title && (
                                                                    <td className="px-6 py-4">
                                                                        <div className="flex items-center">
                                                                            {post.featured_image ? (
                                                                                <img
                                                                                    src={post.featured_image}
                                                                                    alt={post.title}
                                                                                    className="h-10 w-10 rounded-md object-cover mr-3"
                                                                                />
                                                                            ) : (
                                                                                <div className="h-10 w-10 rounded-md bg-gray-200 mr-3 flex items-center justify-center">
                                                                                    <FaEyeSlash className="text-gray-400" />
                                                                                </div>
                                                                            )}
                                                                            
                                                                            <div className="max-w-lg">
                                                                                <div className="font-medium text-gray-900 flex items-center">
                                                                                    {post.title}
                                                                                    {post.is_featured && (
                                                                                        <Tooltip content="Featured Post">
                                                                                            <FaBookmark className="text-yellow-500 ml-2" />
                                                                                        </Tooltip>
                                                                                    )}
                                                                                </div>
                                                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                                                    {getTruncatedContent(post.content)}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                )}
                                                                
                                                                {columnsToShow.status && (
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {getStatusBadge(post.status, post.deleted_at, post.published_at)}
                                                                    </td>
                                                                )}
                                                                
                                                                {columnsToShow.author && (
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm text-gray-900">
                                                                            {post.author ? post.author.name : 'Unknown'}
                                                                        </div>
                                                                    </td>
                                                                )}
                                                                
                                                                {columnsToShow.category && (
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm text-gray-900">
                                                                            {post.category ? post.category.name : 'Uncategorized'}
                                                                        </div>
                                                                    </td>
                                                                )}
                                                                
                                                                {columnsToShow.date && (
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                        {DateTime.fromISO(post.created_at).toFormat('LLL dd, yyyy')}
                                                                    </td>
                                                                )}
                                                                
                                                                {columnsToShow.actions && (
                                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                        <div className="flex items-center justify-end space-x-2">
                                                                            {post.deleted_at ? (
                                                                                <>
                                                                                    <Tooltip content="Restore">
                                                                                        <SecondaryButton
                                                                                            onClick={() => handleRestore(post)}
                                                                                            className="!p-2"
                                                                                        >
                                                                                            <FaUndo className="h-4 w-4" />
                                                                                        </SecondaryButton>
                                                                                    </Tooltip>
                                                                                    
                                                                                    <Tooltip content="Delete Permanently">
                                                                                        <DangerButton
                                                                                            onClick={() => confirmDelete(post, true)}
                                                                                            className="!p-2"
                                                                                        >
                                                                                            <FaTrash className="h-4 w-4" />
                                                                                        </DangerButton>
                                                                                    </Tooltip>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <Tooltip content="View">
                                                                                        <Link
                                                                                            href={route('blogs.show', post.slug)}
                                                                                            className="text-gray-400 hover:text-gray-500 p-2"
                                                                                            target="_blank"
                                                                                        >
                                                                                            <FaEye className="h-4 w-4" />
                                                                                        </Link>
                                                                                    </Tooltip>
                                                                                    
                                                                                    <Tooltip content="Edit">
                                                                                        <Link
                                                                                            href={route('admin.blogs.edit', post.id)}
                                                                                            className="text-primary hover:text-primary-dark p-2"
                                                                                        >
                                                                                            <FaPencilAlt className="h-4 w-4" />
                                                                                        </Link>
                                                                                    </Tooltip>
                                                                                    
                                                                                    <Tooltip content="Move to Trash">
                                                                                        <button
                                                                                            onClick={() => confirmDelete(post)}
                                                                                            className="text-red-600 hover:text-red-900 p-2"
                                                                                        >
                                                                                            <FaTrash className="h-4 w-4" />
                                                                                        </button>
                                                                                    </Tooltip>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={Object.values(columnsToShow).filter(Boolean).length} className="px-6 py-4 text-center text-gray-500">
                                                                No posts found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
            
            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {forceDelete 
                            ? "Permanently Delete Post" 
                            : "Move Post to Trash"
                        }
                    </h2>
                    
                    <p className="mt-1 text-sm text-gray-600">
                        {forceDelete 
                            ? "Are you sure you want to permanently delete this post? This action cannot be undone."
                            : "Are you sure you want to move this post to trash? You can restore it later if needed."
                        }
                    </p>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                        <SecondaryButton onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </SecondaryButton>
                        
                        <DangerButton onClick={handleDelete}>
                            {forceDelete ? "Delete Permanently" : "Move to Trash"}
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </Authenticated>
    );
}
