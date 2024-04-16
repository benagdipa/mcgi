import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useRef, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function EventsAddAdmin({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        start_date: formatDateToYMDHIS(new Date()),
        end_date: formatDateToYMDHIS(new Date()),
        address: '',
        content: '',
        status: '',
    });

    const editorRef = useRef(null);

    const formSubmit = (e) => {
        e.preventDefault();
        post(route('admin.events.store'))
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
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Add New Event</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.events.index')}>Events</Link></li>
                                <li>/</li>
                                <li>Add New Event</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="page-content pt-8">
                    <div className="form-wrapper px-6">
                        <form onSubmit={formSubmit}>
                            <div className="flex md:flex-row flex-col gap-6">
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
                                        <InputLabel value={'Start Date'} className='mb-1 font-poppins font-semibold' />
                                        <DatePicker
                                            selected={new Date(data.start_date)}
                                            onChange={(date) => setData('start_date', formatDateToYMDHIS(date))}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            className='w-full border-gray-300 rounded-md font-poppins focus:border-yellow-500 focus:ring-0'
                                        />
                                        <InputError message={errors.start_date} className="mt-2" />
                                    </div>
                                    <div className="form-item mb-4">
                                        <InputLabel value={'End Date'} className='mb-1 font-poppins font-semibold' />
                                        <DatePicker
                                            selected={new Date(data.end_date)}
                                            onChange={(date) => setData('end_date', formatDateToYMDHIS(date))}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            className='w-full border-gray-300 rounded-md font-poppins focus:border-yellow-500 focus:ring-0'
                                        />
                                        <InputError message={errors.end_date} className="mt-2" />
                                    </div>
                                    <div className="form-item mb-4">
                                        <InputLabel value={'Address'} className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            name="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="w-full rounded-md font-poppins"
                                        />
                                        <InputError message={errors.address} className="mt-2" />
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
                                                    height: 450,
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
