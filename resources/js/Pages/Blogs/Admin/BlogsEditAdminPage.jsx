import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';

export default function BlogsEditAdminPage({ auth, item, categories, tags }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: item.title,
        slug: item.slug,
        content: item.content,
        categories: item?.categories ? item.categories.split(',') : [],
        tags: item?.tags ? item.tags.split(',') : [],
        featureImage: null,
        status: item.status,
    });
    const editorRef = useRef(null);
    const [previewFile, setPreviewFile] = useState(item.featured_image)
    const [fileName, setFileName] = useState('');
    const hiddenFileInput = useRef(null);

    useEffect(() => {
        const value = data?.title
        const slug = value.replace(/\s+/g, '-').toLowerCase();
        setData('slug', slug)
    }, [data.title])

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleFileChange = event => {
        const url = URL.createObjectURL(event.target.files[0])
        setData('featureImage', event.target.files[0])
        setFileName(event.target.files[0].name)
        setPreviewFile(url)
    };

    const handleCheckBoxChange = (name, ele) => {
        const { value, checked } = ele.target;
        if (checked) {
            const prevItems = data[name];
            setData(name, [...prevItems, value]);
        } else {
            const filteredItems = data[name].filter(item => item !== value)
            setData(name, filteredItems);
        }
    }

    const formSubmit = (e) => {
        e.preventDefault();
        post(route('admin.blogs.update', item.id))
    }

    return (
        <Authenticated user={auth?.user}>
            <Head title='Edit blog' />
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Edit Blog</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.blogs.index')}>Blogs</Link></li>
                                <li>/</li>
                                <li>Edit Blog</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="page-content w-[95%] mx-auto lg:w-full pt-8">
                    <div className="form-wrapper px-6">
                        <form onSubmit={formSubmit}>
                            <div className="flex lg:flex-row flex-col gap-6">
                                <div className="md:w-9/12">
                                    <div className="form-item mb-4">
                                        <InputLabel value={'Title'} className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            name="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full rounded-md font-poppins"
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>
                                    <div className="form-item mb-4">
                                        <InputLabel value={'Slug'} className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            name="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className="w-full rounded-md font-poppins"
                                        />
                                        <InputError message={errors.slug} className="mt-2" />
                                    </div>
                                    <div className="form-item">
                                        <InputLabel value={'Content'} className='mb-1 font-poppins font-semibold' />
                                        <div className="custom-ckeditor" style={{ height: '400px' }}>
                                            <Editor
                                                apiKey='h9mpgdcvlxaa94b8rwqpagapahot2x6w7urfs0dtyswd2qtj'
                                                onInit={(evt, editor) => { editorRef.current = editor }}
                                                onChange={() => setData('content', editorRef.current.getContent())}
                                                initialValue={data.content}
                                                init={{
                                                    height: 800,
                                                    menubar: false,
                                                    plugins: [
                                                        "advlist",
                                                        "autolink",
                                                        "lists",
                                                        "link",
                                                        "image",
                                                        "charmap",
                                                        "preview",
                                                        "anchor",
                                                        "searchreplace",
                                                        "visualblocks",
                                                        "fullscreen",
                                                        "insertdatetime",
                                                        "media",
                                                        "table",
                                                        "help",
                                                        "wordcount",
                                                    ],
                                                    toolbar: 'undo redo | casechange blocks | bold italic backcolor | image media| ' + 'alignleft aligncenter alignright alignjustify | ' + 'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                                                    images_upload_url: 'upload.php',
                                                    automatic_uploads: false,
                                                }}
                                            />
                                            <InputError message={errors.content} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-3/12">
                                    <div className="border rounded p-4">
                                        <div className="form-item mb-4">
                                            <div className="status">
                                                <InputLabel value={'Status'} className='mb-1 font-poppins font-semibold' />
                                                <select
                                                    name="status"
                                                    className='w-full border-gray-300 rounded-md font-poppins focus:border-yellow-500 focus:ring-0'
                                                    value={data.status}
                                                    onChange={(e) => setData('status', e.target.value)}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="draft">Draft</option>
                                                    <option value="publish">Publish</option>
                                                </select>
                                                <InputError message={errors.status} className="mt-2" />
                                            </div>
                                        </div>
                                        <div className="form-item mb-4">
                                            <div className="categories">
                                                <InputLabel value={'Categories'} className='mb-1 font-poppins font-semibold' />
                                                <div className="categories-items border p-4 rounded">
                                                    {categories.length > 0 && categories.map((item, index) => {
                                                        return (
                                                            <div className="" key={index}>
                                                                <label className='pb-3 block'>
                                                                    <input
                                                                        type="checkbox"
                                                                        name='categories[]'
                                                                        value={item.id}
                                                                        className='rounded w-5 h-5'
                                                                        onChange={(ele) => handleCheckBoxChange('categories', ele)}
                                                                        checked={data.categories.includes(item.id.toString())}
                                                                    />
                                                                    <span className='pl-2 font-poppins font-medium'>{item.title}</span>
                                                                </label>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-item mb-4">
                                            <div className="tags">
                                                <InputLabel value={'Tags'} className='mb-1 font-poppins font-semibold' />
                                                <div className="categories-items border p-4 rounded">
                                                    {tags.length > 0 && tags.map((item, index) => {
                                                        return (
                                                            <div className="" key={index}>
                                                                <label className='pb-3 block'>
                                                                    <input
                                                                        type="checkbox"
                                                                        name='tags[]'
                                                                        value={item.id}
                                                                        className='rounded w-5 h-5'
                                                                        onChange={(ele) => handleCheckBoxChange('tags', ele)}
                                                                        checked={data.tags.includes(item.id.toString())}
                                                                    />
                                                                    <span className='pl-2 font-poppins font-medium'>{item.title}</span>
                                                                </label>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-item mb-4">
                                            <div className="featured-image">
                                                <InputLabel value={'Featured Image'} className='mb-1 font-poppins font-semibold' />
                                                <div className="categories-items border p-4 rounded">
                                                    <img src={previewFile} />
                                                    <input
                                                        type="file"
                                                        name='featureImage'
                                                        hidden
                                                        onChange={handleFileChange}
                                                        ref={hiddenFileInput}
                                                        value={''}
                                                    />
                                                    <a className='bg-transparent cursor-pointer' onClick={handleClick}>Set Featured Image</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-item">
                                            <button className='bg-blue-500 text-white px-6 py-3 font-bold rounded font-poppins' disabled={processing}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
