import React, { useState } from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { Card, Collapse } from '@material-tailwind/react';
import { useDropzone } from 'react-dropzone';
import InputError from '@/Components/InputError';
import { IconX } from '@tabler/icons-react';

const BannerAdminPage = ({ auth }) => {
    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        banners: []
    });
    const [toggleOpen, setToggleOpen] = useState(false);
    const [uploadedImages, setUploadedImages] = useState('');

    const toggleCollapse = () => {
        setToggleOpen(!toggleOpen);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            data.banners.forEach((file) => {
                formData.append('banners[]', file);
            });
            const response = await post(route('admin.banner.store'), formData);
            reset();
            setToggleOpen(true);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };


    const thumbs = data?.banners?.map((file, index) => (
        <div key={index} className='border border-gray-300 rounded relative w-36 h-36 p-1'>
            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white p-1 cursor-pointer">
                <IconX size={16} onClick={() => { handleRemoveUploadImage(file) }} />
            </div>
            <img src={file.preview} className='w-full h-full object-cover rounded' alt={`Thumbnail ${index}`} />
        </div>
    ));

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setData('banners', [
                ...(data.banners || []),
                ...acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            ]);
        }
    });

    return (
        <Authenticated user={auth?.user}>
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Banners</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.album.index')}>Banner</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <button className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-3 rounded-md font-semibold text-lg font-poppins' onClick={toggleCollapse}>Add New</button>
                    </div>
                </div>
                <div>
                    <Collapse open={toggleOpen}>
                        <Card className="px-6">
                            <form onSubmit={formSubmit}>
                                <div className="mb-6">
                                    <div {...getRootProps()} className='flex items-center justify-center border-dotted border-2 py-32 rounded-md cursor-pointer'>
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                                <p>Drop the files here ...</p> :
                                                <p className='text-gray-500 text-sm font-poppins'>Drag 'n' drop some files here, or click to select files</p>
                                        }
                                    </div>
                                    <InputError message={errors?.banners} className="mt-2" />
                                </div>
                                <div className="font-item mb-4 text-right">
                                    <button className='bg-blue-500 text-white px-6 py-3 font-poppins rounded-sm font-bold' disabled={processing}>Upload</button>
                                </div>
                            </form>
                        </Card>
                    </Collapse>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                    {thumbs}
                </div>
            </div>
        </Authenticated>
    );
};

export default BannerAdminPage;
