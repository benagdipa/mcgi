import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useRef, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function EventsAddAdmin({ auth, event }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        title: event.title,
        slug: event.slug,
        start_date: event.start_date,
        end_date: event.end_date,
        featureImage: null,
        content: event.content,
        status: event.status,
    });

    const editorRef = useRef(null);
    const [previewFile, setPreviewFile] = useState(event.featured_image)
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
        setPreviewFile(url)
    };

    const formSubmit = (e) => {
        e.preventDefault();
        post(route('admin.events.update', event.id))
    }
    function formatDateToYMDHIS(date) {
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        var seconds = ('0' + date.getSeconds()).slice(-2);
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }

    return (
        <Authenticated user={auth?.user}>
            <Head title='Add New Events' />
            <div className="">
                <div className="p-6 pb-0 pt-4 flex justify-between">
                    <h1 className='font-semibold text-gray-800 text-3xl'>Edit Event</h1>
                </div>
                <div className="pt-2 p-6 font-poppins">
                        <ul className='flex gap-1 text-gray-600 text-sm'>
                            <li><Link href={route('dashboard')}>Dashboard</Link></li>
                            <li>/</li>
                            <li><Link href={route('admin.blogs.index')}>Events</Link></li>
                            <li>/</li>
                            <li>Edit Event</li>
                        </ul>
                </div>
                <div className="form-wrapper px-6">
                    <div className="max-w-screen-2xl">
                        <form onSubmit={formSubmit}>
                            <div className="flex gap-6">
                                <div className="w-9/12">
                                    <div className="form-item mb-4">
                                        <InputLabel value={'Title'} className='mb-1 font-poppins text-base' />
                                        <TextInput
                                            name="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full rounded-sm font-poppins placeholder:font-poppins"
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>
                                    <div className="form-item mb-4">
                                        <InputLabel value={'Slug'} className='mb-1 font-poppins text-base' />
                                        <TextInput
                                            name="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className="w-full rounded-sm font-poppins placeholder:font-poppins"
                                        />
                                        <InputError message={errors.slug} className="mt-2" />
                                    </div>
                                    <div className="form-item mb-4">
                                        <InputLabel value={'Start Date'} className='mb-1 font-poppins text-base' />
                                        <DatePicker
                                            selected={new Date(data.start_date)}
                                            onChange={(date) => setData('start_date', formatDateToYMDHIS(date))}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            className='w-full rounded-sm font-poppins placeholder:font-poppins'
                                            minDate={data.start_date}
                                        />
                                        <InputError message={errors.start_date} className="mt-2" />
                                    </div>
                                    <div className="form-item mb-4">
                                        <InputLabel value={'End Date'} className='mb-1 font-poppins text-base' />
                                        <DatePicker
                                            selected={new Date(data.end_date)}
                                            onChange={(date) => setData('end_date', formatDateToYMDHIS(date))}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            className='w-full rounded-sm font-poppins placeholder:font-poppins'
                                            minDate={data.end_date}
                                        />
                                        <InputError message={errors.end_date} className="mt-2" />
                                    </div>

                                    <div className="form-item">
                                        <InputLabel value={'Content'} className='mb-1 font-poppins text-base' />
                                        <div className="custom-ckeditor" style={{ height: '400px' }}>
                                            <Editor
                                                apiKey='h9mpgdcvlxaa94b8rwqpagapahot2x6w7urfs0dtyswd2qtj'
                                                onInit={(evt, editor) => { editorRef.current = editor }}
                                                onChange={() => setData('content', editorRef.current.getContent())}
                                                initialValue={data.content}
                                                init={{
                                                    height: 600,
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
                                                <div className="status text-xl font-bold mb-2 font-poppins text-base">Status</div>
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
                                            <div className="featured-image">
                                                <p className='text-xl font-bold mb-3 font-poppins text-base'>Featured Image</p>
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
                                                    <a className='bg-transparent cursor-pointer text-base' onClick={handleClick}>Set Featured Image</a>
                                                    <InputError message={errors.featureImage} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-item">
                                            <button className='bg-blue-500 text-white px-6 py-3 font-bold rounded font-poppins text-base'>Submit</button>
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
