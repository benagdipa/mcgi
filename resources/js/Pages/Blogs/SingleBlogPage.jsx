import Guest from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/react';
import { DateTime } from 'luxon';
import React from 'react'

export default function SingleBlogPage({ auth, post }) {
    const date = DateTime.fromFormat(post?.publishedAt, 'MM/dd/yyyy HH:mm:ss')
    return (
        <Guest user={auth?.user}>
            <Head title={post.title} />
            <div className="single-post">
                <div className="top-section bg-[#0077CC] py-20">
                    <div className="max-w-screen-xl mx-auto">
                        <p className='text-center mb-3'>
                            <span className='bg-[#f5cd06] py-2 px-4 rounded-full capitalize font-semibold'>{post.category}</span>
                        </p>
                        <h2 className='text-center text-white font-marcellus text-6xl font-semibold leading-tight mb-10'>{post.title}</h2>
                        <div className="blog-meta flex justify-center text-white gap-6 items-center">
                            <div className="author-wrapper">
                                <div className="flex items-center gap-2">
                                    <div className="image-wrapper">
                                        <img src="https://randomuser.me/api/portraits/men/1.jpg" className='w-20 h-20 rounded-full' />
                                    </div>
                                    <div className="author border-r-2 pr-4">
                                        <p className='text-2xl font-dmsans font-semibold'>John Doe</p>
                                    </div>
                                </div>
                            </div>
                            <div className="post-date font-dmsans font-semibold">
                                {date.toFormat('LLLL dd, yyyy')}
                            </div>
                        </div>
                        <div className="post-image">
                            <div className="image-wrapper pt-12">
                                <img src={post?.image} alt="" className='mx-auto w-full rounded-2xl' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-section">
                    <div className="max-w-screen-xl mx-auto">
                        <div className="content-wrapper p-20">
                            <p className='font-dmsans text-[#666B68]/80 text-xl leading-relaxed font-normal'>{post?.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    )
}
