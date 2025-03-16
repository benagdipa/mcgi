import React, { useState, useRef, useEffect } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import Card from "@/Components/Card";
import Badge from "@/Components/Badge";
import { Tab } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { FaImage, FaCalendarAlt, FaSave, FaArrowLeft, FaTags, FaFolder, FaEye, FaSitemap, FaComments, FaStar, FaLink } from "react-icons/fa";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

export default function BlogQuillEditor({ auth, categories, tags, csrf_token }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        content: '',
        slug: "",
        categories: [],
        tags: [],
        featureImage: null,
        status: "draft",
        excerpt: "",
        meta_title: "",
        meta_description: "",
        seo_keywords: "",
        is_featured: false,
        allow_comments: true,
        published_at: new Date(),
    });
    
    const [previewFile, setPreviewFile] = useState("");
    const hiddenFileInput = useRef(null);
    const [fileName, setFileName] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [isScheduled, setIsScheduled] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    
    // Configure Quill modules
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
            [{ 'align': [] }],
            ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ],
        clipboard: {
            // Toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    };
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'blockquote', 'code-block',
        'link', 'image',
        'align',
        'color', 'background'
    ];
    
    // Image Upload Handler for Quill
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        
        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file);
            formData.append('_token', csrf_token);
            
            try {
                const response = await fetch(route('admin.blogs.tempImg'), {
                    method: 'POST',
                    body: formData,
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Get the Quill editor instance
                    const quill = quillRef.current.getEditor();
                    // Get the current cursor position
                    const range = quill.getSelection(true);
                    // Insert the image at the cursor position
                    quill.insertEmbed(range.index, 'image', result.file.url);
                    // Move cursor to the right position after inserting the image
                    quill.setSelection(range.index + 1);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Failed to upload image. Please try again.');
            }
        };
    };
    
    // Initialize Quill with the image handler
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Add image handler to toolbar
            const quill = document.querySelector('.ql-editor');
            if (quill) {
                const toolbar = quill.parentElement.querySelector('.ql-toolbar');
                if (toolbar) {
                    const imageButton = toolbar.querySelector('.ql-image');
                    if (imageButton) {
                        imageButton.addEventListener('click', (e) => {
                            e.preventDefault();
                            imageHandler();
                        });
                    }
                }
            }
        }
    }, []);
    
    const quillRef = useRef(null);
    
    // Generate slug from title
    const handleTitleChange = (e) => {
        const value = e.target.value;
        setData("title", value);
        
        // Only auto-generate slug if it's empty or matches previous auto-generated value
        if (!data.slug || data.slug === data.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')) {
            const newSlug = value.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
            setData("slug", newSlug);
        }
        
        // Auto-fill meta title if empty
        if (!data.meta_title) {
            setData("meta_title", value);
        }
    };
    
    // Extract plain text from HTML content
    const extractPlainTextFromHTML = (html) => {
        if (!html) return '';
        
        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Get the plain text content
        return tempDiv.textContent || tempDiv.innerText || '';
    };
    
    // Handle content change from Quill editor
    const handleContentChange = (content) => {
        setData('content', content);
        
        // Auto-generate excerpt if empty
        if (!data.excerpt) {
            const plainText = extractPlainTextFromHTML(content);
            if (plainText) {
                const excerpt = plainText.substring(0, 250);
                setData("excerpt", excerpt);
                
                // Auto-fill meta description if empty
                if (!data.meta_description) {
                    setData("meta_description", excerpt);
                }
            }
        }
    };
    
    // Handle status change
    useEffect(() => {
        if (data.status === 'scheduled') {
            setIsScheduled(true);
        } else {
            setIsScheduled(false);
        }
    }, [data.status]);

    const formSubmit = async (e) => {
        e.preventDefault();
        post(route("admin.blogs.store"));
    };

    const handleCheckBoxChange = (name, ele) => {
        const { value, checked } = ele.target;
        if (checked) {
            const prevItems = data[name];
            setData(name, [...prevItems, value]);
        } else {
            const filteredItems = data[name].filter((item) => item !== value);
            setData(name, filteredItems);
        }
    };
    
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleFileChange = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        setData("featureImage", event.target.files[0]);
        setFileName(event.target.files[0].name);
        setPreviewFile(url);
    };
    
    const handleDateChange = (selectedDates) => {
        setData("published_at", selectedDates[0]);
    };
    
    const tabStyles = {
        base: "py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none",
        selected: "bg-primary text-white shadow",
        notSelected: "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create New Blog Post
                    </h2>
                    <div className="flex gap-2">
                        <SecondaryButton onClick={() => router.visit(route('admin.blogs.index'))}>
                            <FaArrowLeft className="mr-2" /> Back
                        </SecondaryButton>
                        <PrimaryButton onClick={() => setPreviewMode(!previewMode)}>
                            <FaEye className="mr-2" /> {previewMode ? "Edit" : "Preview"}
                        </PrimaryButton>
                    </div>
                </div>
            }
        >
            <Head title="Add New Blog" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {!previewMode ? (
                        <div className="bg-white shadow-sm sm:rounded-lg">
                            <form onSubmit={formSubmit}>
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                                    <div className="lg:col-span-3 space-y-6">
                                        <Card>
                                            <div className="mb-4">
                                                <InputLabel htmlFor="title" value="Title" />
                                                <TextInput
                                                    id="title"
                                                    className="mt-1 block w-full text-xl"
                                                    value={data.title}
                                                    onChange={handleTitleChange}
                                                    placeholder="Enter blog title"
                                                    autoFocus
                                                />
                                                <InputError message={errors.title} className="mt-2" />
                                            </div>
                                            
                                            <div className="mb-4">
                                                <InputLabel htmlFor="slug" value="Slug" />
                                                <div className="flex items-center mt-1">
                                                    <span className="text-gray-500 bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300">
                                                        <FaLink className="h-4 w-4" />
                                                    </span>
                                                    <TextInput
                                                        id="slug"
                                                        className="rounded-l-none block w-full"
                                                        value={data.slug}
                                                        onChange={(e) => setData("slug", e.target.value)}
                                                        placeholder="enter-post-slug"
                                                    />
                                                </div>
                                                <InputError message={errors.slug} className="mt-2" />
                                            </div>
                                            
                                            <div className="mb-4">
                                                <InputLabel value="Content" />
                                                <div className="mt-1 quill-container border rounded-md">
                                                    <ReactQuill
                                                        ref={quillRef}
                                                        theme="snow"
                                                        value={data.content}
                                                        onChange={handleContentChange}
                                                        modules={modules}
                                                        formats={formats}
                                                        placeholder="Start writing your blog here..."
                                                        className="h-80"
                                                    />
                                                </div>
                                                <style jsx>{`
                                                    .quill-container {
                                                        height: 400px;
                                                    }
                                                    
                                                    .quill-container .ql-container {
                                                        height: 330px;
                                                        font-size: 16px;
                                                        overflow-y: auto;
                                                    }
                                                `}</style>
                                                <InputError message={errors.content} className="mt-2" />
                                            </div>
                                        </Card>
                                        
                                        <Card>
                                            <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                                                <Tab.List className="flex space-x-2 mb-4 border-b pb-1">
                                                    <Tab className={({ selected }) => `${tabStyles.base} ${selected ? tabStyles.selected : tabStyles.notSelected}`}>
                                                        Excerpt & Settings
                                                    </Tab>
                                                    <Tab className={({ selected }) => `${tabStyles.base} ${selected ? tabStyles.selected : tabStyles.notSelected}`}>
                                                        <FaSitemap className="inline mr-1" /> SEO
                                                    </Tab>
                                                </Tab.List>
                                                
                                                <Tab.Panels>
                                                    <Tab.Panel>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <InputLabel htmlFor="excerpt" value="Excerpt" />
                                                                <textarea
                                                                    id="excerpt"
                                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                                                    value={data.excerpt}
                                                                    onChange={(e) => setData("excerpt", e.target.value)}
                                                                    placeholder="A brief summary of your post"
                                                                    rows={3}
                                                                ></textarea>
                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    Displayed on blog listing pages. If empty, it will be generated from content.
                                                                </p>
                                                                <InputError message={errors.excerpt} className="mt-2" />
                                                            </div>
                                                            
                                                            <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="is_featured"
                                                                        type="checkbox"
                                                                        className="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                                                        checked={data.is_featured}
                                                                        onChange={(e) => setData("is_featured", e.target.checked)}
                                                                    />
                                                                    <label htmlFor="is_featured" className="ml-2 text-sm text-gray-700 flex items-center">
                                                                        <FaStar className="text-yellow-500 mr-1" /> Feature this post
                                                                    </label>
                                                                </div>
                                                                
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="allow_comments"
                                                                        type="checkbox"
                                                                        className="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                                                        checked={data.allow_comments}
                                                                        onChange={(e) => setData("allow_comments", e.target.checked)}
                                                                    />
                                                                    <label htmlFor="allow_comments" className="ml-2 text-sm text-gray-700 flex items-center">
                                                                        <FaComments className="text-gray-500 mr-1" /> Allow comments
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Tab.Panel>
                                                    
                                                    <Tab.Panel>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <InputLabel htmlFor="meta_title" value="Meta Title" />
                                                                <TextInput
                                                                    id="meta_title"
                                                                    className="mt-1 block w-full"
                                                                    value={data.meta_title}
                                                                    onChange={(e) => setData("meta_title", e.target.value)}
                                                                    placeholder="SEO Title (defaults to post title)"
                                                                />
                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    {data.meta_title.length} / 60 characters
                                                                </p>
                                                                <InputError message={errors.meta_title} className="mt-2" />
                                                            </div>
                                                            
                                                            <div>
                                                                <InputLabel htmlFor="meta_description" value="Meta Description" />
                                                                <textarea
                                                                    id="meta_description"
                                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                                                    value={data.meta_description}
                                                                    onChange={(e) => setData("meta_description", e.target.value)}
                                                                    placeholder="SEO Description (defaults to excerpt)"
                                                                    rows={3}
                                                                ></textarea>
                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    {data.meta_description.length} / 160 characters
                                                                </p>
                                                                <InputError message={errors.meta_description} className="mt-2" />
                                                            </div>
                                                            
                                                            <div>
                                                                <InputLabel htmlFor="seo_keywords" value="SEO Keywords" />
                                                                <TextInput
                                                                    id="seo_keywords"
                                                                    className="mt-1 block w-full"
                                                                    value={data.seo_keywords}
                                                                    onChange={(e) => setData("seo_keywords", e.target.value)}
                                                                    placeholder="keyword1, keyword2, keyword3"
                                                                />
                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    Comma-separated keywords for search engines
                                                                </p>
                                                                <InputError message={errors.seo_keywords} className="mt-2" />
                                                            </div>
                                                        </div>
                                                    </Tab.Panel>
                                                </Tab.Panels>
                                            </Tab.Group>
                                        </Card>
                                    </div>
                                    
                                    <div className="lg:col-span-1 space-y-6">
                                        <Card>
                                            <div className="mb-4">
                                                <InputLabel value="Publication Status" />
                                                <div className="mt-2 space-y-2">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="draft"
                                                            name="status"
                                                            type="radio"
                                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                            value="draft"
                                                            checked={data.status === "draft"}
                                                            onChange={(e) => setData("status", e.target.value)}
                                                        />
                                                        <label htmlFor="draft" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Draft
                                                        </label>
                                                    </div>
                                                    
                                                    <div className="flex items-center">
                                                        <input
                                                            id="publish"
                                                            name="status"
                                                            type="radio"
                                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                            value="published"
                                                            checked={data.status === "published"}
                                                            onChange={(e) => setData("status", e.target.value)}
                                                        />
                                                        <label htmlFor="publish" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Publish immediately
                                                        </label>
                                                    </div>
                                                    
                                                    <div className="flex items-center">
                                                        <input
                                                            id="schedule"
                                                            name="status"
                                                            type="radio"
                                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                            value="scheduled"
                                                            checked={data.status === "scheduled"}
                                                            onChange={(e) => setData("status", e.target.value)}
                                                        />
                                                        <label htmlFor="schedule" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Schedule for later
                                                        </label>
                                                    </div>
                                                    
                                                    {isScheduled && (
                                                        <div className="ml-7 mt-2">
                                                            <div className="flex items-center border rounded-md overflow-hidden">
                                                                <div className="bg-gray-100 p-2 text-gray-500">
                                                                    <FaCalendarAlt />
                                                                </div>
                                                                <Flatpickr
                                                                    value={data.published_at}
                                                                    onChange={handleDateChange}
                                                                    options={{
                                                                        enableTime: true,
                                                                        dateFormat: "Y-m-d H:i",
                                                                        minDate: "today",
                                                                    }}
                                                                    className="w-full border-0 focus:ring-0 focus:outline-none p-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <InputError message={errors.status} className="mt-2" />
                                            </div>
                                            
                                            <div className="mb-4">
                                                <InputLabel value="Featured Image" />
                                                <div
                                                    className="mt-2 border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                                                    onClick={handleClick}
                                                >
                                                    {previewFile ? (
                                                        <div className="relative">
                                                            <img
                                                                src={previewFile}
                                                                alt="Preview"
                                                                className="w-full h-auto rounded-md"
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity">
                                                                <span className="text-white text-sm font-medium px-2 py-1 rounded bg-black bg-opacity-75">
                                                                    Change Image
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="py-4">
                                                            <FaImage className="mx-auto h-12 w-12 text-gray-300" />
                                                            <div className="mt-2 text-sm text-gray-600">
                                                                Click to upload an image
                                                            </div>
                                                            <p className="mt-1 text-xs text-gray-500">
                                                                PNG, JPG, JPEG up to 5MB
                                                            </p>
                                                        </div>
                                                    )}
                                                    <input
                                                        ref={hiddenFileInput}
                                                        type="file"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                        accept="image/png, image/jpeg, image/jpg"
                                                    />
                                                </div>
                                                {fileName && <p className="mt-1 text-xs text-gray-500">Selected: {fileName}</p>}
                                                <InputError message={errors.featureImage} className="mt-2" />
                                            </div>
                                        </Card>
                                        
                                        <Card>
                                            <div className="mb-4">
                                                <div className="flex items-center">
                                                    <FaFolder className="text-gray-400 mr-2" />
                                                    <InputLabel value="Categories" className="mb-0" />
                                                </div>
                                                <div className="mt-2 max-h-52 overflow-y-auto border rounded-md p-3">
                                                    {categories.map((category) => (
                                                        <div key={category.id} className="flex items-start mb-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`category-${category.id}`}
                                                                value={category.id}
                                                                className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                                                                onChange={(e) => handleCheckBoxChange("categories", e)}
                                                                checked={data.categories.includes(category.id.toString())}
                                                            />
                                                            <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                                                                {category.title}
                                                            </label>
                                                        </div>
                                                    ))}
                                                    {categories.length === 0 && (
                                                        <p className="text-sm text-gray-500">No categories found</p>
                                                    )}
                                                </div>
                                                <InputError message={errors.categories} className="mt-2" />
                                            </div>
                                            
                                            <div>
                                                <div className="flex items-center">
                                                    <FaTags className="text-gray-400 mr-2" />
                                                    <InputLabel value="Tags" className="mb-0" />
                                                </div>
                                                <div className="mt-2 max-h-52 overflow-y-auto border rounded-md p-3">
                                                    {tags.map((tag) => (
                                                        <div key={tag.id} className="flex items-start mb-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`tag-${tag.id}`}
                                                                value={tag.id}
                                                                className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                                                                onChange={(e) => handleCheckBoxChange("tags", e)}
                                                                checked={data.tags.includes(tag.id.toString())}
                                                            />
                                                            <label htmlFor={`tag-${tag.id}`} className="ml-2 text-sm text-gray-700">
                                                                {tag.title}
                                                            </label>
                                                        </div>
                                                    ))}
                                                    {tags.length === 0 && (
                                                        <p className="text-sm text-gray-500">No tags found</p>
                                                    )}
                                                </div>
                                                <InputError message={errors.tags} className="mt-2" />
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                                
                                <div className="py-4 px-6 border-t bg-gray-50 flex justify-end space-x-2">
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => router.visit(route('admin.blogs.index'))}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton
                                        type="submit"
                                        processing={processing}
                                        className="gap-1"
                                    >
                                        <FaSave /> Save {data.status === 'draft' ? 'Draft' : (data.status === 'scheduled' ? 'Schedule' : 'Publish')}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <Card className="relative">
                                <div className="absolute top-4 right-4">
                                    <Badge color="primary" variant="soft">
                                        Preview Mode
                                    </Badge>
                                </div>
                                
                                <div className="mb-4">
                                    <h1 className="text-3xl font-bold mb-4">{data.title || "Post Title"}</h1>
                                    
                                    {previewFile ? (
                                        <div className="w-full h-72 overflow-hidden rounded-lg mb-6">
                                            <img
                                                src={previewFile}
                                                alt={data.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-72 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                                            <FaImage className="text-gray-400 h-12 w-12" />
                                        </div>
                                    )}
                                    
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {data.categories.length > 0 && categories.filter(cat => data.categories.includes(cat.id.toString())).map(cat => (
                                            <Badge key={cat.id} color="primary" variant="soft">
                                                {cat.title}
                                            </Badge>
                                        ))}
                                        
                                        {data.tags.length > 0 && tags.filter(tag => data.tags.includes(tag.id.toString())).map(tag => (
                                            <Badge key={tag.id} color="secondary" variant="light">
                                                {tag.title}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="prose max-w-none">
                                    <div dangerouslySetInnerHTML={{ __html: data.content || "<p>Start writing your blog content...</p>" }} />
                                </div>
                            </Card>
                            
                            <div className="flex justify-end">
                                <PrimaryButton onClick={() => setPreviewMode(false)}>
                                    Return to Editor
                                </PrimaryButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Authenticated>
    );
} 