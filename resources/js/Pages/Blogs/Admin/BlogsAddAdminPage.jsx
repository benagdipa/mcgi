import React, { useEffect, useRef, useState } from 'react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm, Link } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import { Editor } from '@tinymce/tinymce-react';


export default function BlogsAddAdminPage({ auth, categories, tags }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        slug: '',
        content: '',
        categories: [],
        tags: [],
        featureImage: null,
        status: '',
    });
    const editorRef = useRef(null);
    const [previewFile, setPreviewFile] = useState('')
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
        post(route('admin.blogs.store'))
    }

    return (
        <Authenticated user={auth?.user}>
            <Head title='Add New Blogs' />
            <div className="content font-poppins">
                <div className="p-6 pt-4 flex justify-between font-poppins">
                    <div className="page-title">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Add New Blog</h1>
                        <div class="pt-2">
                            <ul class="flex gap-1 text-gray-600 text-sm">
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.blogs.index')}>Blogs</Link></li>
                                <li>/</li>
                                <li>Add New Blog</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="form-wrapper px-6">
                    <div className="max-w-screen-2xl">
                        <form onSubmit={formSubmit}>
                            <div className="flex gap-6">
                                <div className="w-9/12">
                                    <div className="form-item mb-4">
                                        <InputLabel value={'Title'} className='mb-1 font-poppins text-lg font-medium' />
                                        <TextInput
                                            name="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full rounded-sm font-poppins placeholder:font-poppins"
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>
                                    <div className="form-item mb-4">
                                        <InputLabel value={'Slug'} className='mb-1 font-poppins text-lg font-medium' />
                                        <TextInput
                                            name="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className="w-full rounded-sm font-poppins placeholder:font-poppins "
                                        />
                                        <InputError message={errors.slug} className="mt-2" />
                                    </div>
                                    <div className="form-item">
                                        <InputLabel value={'Content'} className='mb-1 font-poppins text-lg font-medium' />
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
                                                        'a11ychecker',
                                                        'advlist',
                                                        'advcode',
                                                        'advtable',
                                                        'autolink',
                                                        'checklist',
                                                        'export',
                                                        'lists',
                                                        'link',
                                                        'image',
                                                        'charmap',
                                                        'preview',
                                                        'anchor',
                                                        'searchreplace',
                                                        'visualblocks',
                                                        'powerpaste',
                                                        'fullscreen',
                                                        'formatpainter',
                                                        'insertdatetime',
                                                        'media',
                                                        'table',
                                                        'help',
                                                        'wordcount'
                                                    ],
                                                    toolbar: 'undo redo | casechange blocks | bold italic backcolor | image | ' + 'alignleft aligncenter alignright alignjustify | ' + 'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                                                    images_upload_url: 'upload.php',
                                                    automatic_uploads: false,
                                                }}
                                            />
                                            <InputError message={errors.content} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-3/12">
                                    <div className="border rounded p-4">
                                        <div className="form-item mb-4">
                                            <div className="status">
                                                <div className="status text-xl font-bold mb-2 font-poppins">Status</div>
                                                <select
                                                    name="status"
                                                    className='w-full'
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
                                                <p className='text-xl font-bold mb-3 font-poppins'>Categories</p>
                                                <div className="categories-items border p-4 rounded">
                                                    {categories.length && categories.map((item, index) => {
                                                        return (
                                                            <div className="" key={index}>
                                                                <label className='pb-3 block'>
                                                                    <input
                                                                        type="checkbox"
                                                                        name='categories[]'
                                                                        value={item.id}
                                                                        className='rounded w-5 h-5'
                                                                        onChange={(ele) => handleCheckBoxChange('categories', ele)}
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
                                                <p className='text-xl font-bold mb-3 font-poppins'>Tags</p>
                                                <div className="categories-items border p-4 rounded">
                                                    {tags.length && tags.map((item, index) => {
                                                        return (
                                                            <div className="" key={index}>
                                                                <label className='pb-3 block'>
                                                                    <input
                                                                        type="checkbox"
                                                                        name='tags[]'
                                                                        value={item.id}
                                                                        className='rounded w-5 h-5'
                                                                        onChange={(ele) => handleCheckBoxChange('tags', ele)}
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
                                                <p className='text-xl font-bold mb-3 font-poppins'>Featured Image</p>
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
                                                    <InputError message={errors.featureImage} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-item">
                                            <button className='bg-blue-500 text-white px-6 py-3 font-bold rounded font-poppins'>Submit</button>
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
