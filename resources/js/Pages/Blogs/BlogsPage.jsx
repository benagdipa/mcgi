import Guest from '@/Layouts/GuestLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

export default function BlogsPage({ auth }) {
    return (
        <Guest user={auth?.user}>
            <Head title='Blogs' />
            <div className="contact-page">
                <div className="page-header pt-80 pb-28 ">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto">
                            <h1 className='font-bold text-7xl text-white'>Articles</h1>
                            <div className="breadcrumbs pt-5">
                                <div className="flex gap-4 font-semibold uppercase font-dmsans text-white">
                                    <div className="item"><Link href={route('home')} className="breadcrumb-link">HOME</Link></div>
                                    <div className="divider"> | </div>
                                    <div className="item"><Link href={route('blogs.index')} className="breadcrumb-link text-gray-200">Articles</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-screen-xl mx-auto">
                    <div className="blog-items py-16 lg:py-32">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="blog-item font-dmsans">
                                <div className="image">
                                    <img src="/images/slider/slider_1.png" className='h-[250px] object-cover rounded-3xl' />
                                </div>
                                <div className="content pt-3">
                                    <div className="date text-[#9f9f9f] font-medium">January 19, 2024</div>
                                    <div className="title pt-1 pb-3">
                                        <h4 className='text-[#0f0f0f] font-bold text-2xl'>Fourth Sunday of Great Lent</h4>
                                    </div>
                                    <div className="content mb-3">
                                        <p className='text-[#666B68]'>The question of the origins of the Christian tradition
                                            called Baptist has been, and to some extent still is, a much-debated issue.</p>
                                    </div>
                                    <div className="link">
                                        <Link href={route('blogs.show', 'random-post')} className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-item font-dmsans">
                                <div className="image">
                                    <img src="/images/slider/slider_1.png" className='h-[250px] object-cover rounded-3xl' />
                                </div>
                                <div className="content pt-3">
                                    <div className="date text-[#9f9f9f] font-medium">January 19, 2024</div>
                                    <div className="title pt-1 pb-3">
                                        <h4 className='text-[#0f0f0f] font-bold text-2xl'>Fourth Sunday of Great Lent</h4>
                                    </div>
                                    <div className="content mb-3">
                                        <p className='text-[#666B68]'>The question of the origins of the Christian tradition
                                            called Baptist has been, and to some extent still is, a much-debated issue.</p>
                                    </div>
                                    <div className="link">
                                        <Link href={route('blogs.show', 'random-post')} className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-item font-dmsans">
                                <div className="image">
                                    <img src="/images/slider/slider_1.png" className='h-[250px] object-cover rounded-3xl' />
                                </div>
                                <div className="content pt-3">
                                    <div className="date text-[#9f9f9f] font-medium">January 19, 2024</div>
                                    <div className="title pt-1 pb-3">
                                        <h4 className='text-[#0f0f0f] font-bold text-2xl'>Fourth Sunday of Great Lent</h4>
                                    </div>
                                    <div className="content mb-3">
                                        <p className='text-[#666B68]'>The question of the origins of the Christian tradition
                                            called Baptist has been, and to some extent still is, a much-debated issue.</p>
                                    </div>
                                    <div className="link">
                                        <Link href={route('blogs.show', 'random-post')} className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-item font-dmsans">
                                <div className="image">
                                    <img src="/images/slider/slider_1.png" className='h-[250px] object-cover rounded-3xl' />
                                </div>
                                <div className="content pt-3">
                                    <div className="date text-[#9f9f9f] font-medium">January 19, 2024</div>
                                    <div className="title pt-1 pb-3">
                                        <h4 className='text-[#0f0f0f] font-bold text-2xl'>Fourth Sunday of Great Lent</h4>
                                    </div>
                                    <div className="content mb-3">
                                        <p className='text-[#666B68]'>The question of the origins of the Christian tradition
                                            called Baptist has been, and to some extent still is, a much-debated issue.</p>
                                    </div>
                                    <div className="link">
                                        <Link href={route('blogs.show', 'random-post')} className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-item font-dmsans">
                                <div className="image">
                                    <img src="/images/slider/slider_1.png" className='h-[250px] object-cover rounded-3xl' />
                                </div>
                                <div className="content pt-3">
                                    <div className="date text-[#9f9f9f] font-medium">January 19, 2024</div>
                                    <div className="title pt-1 pb-3">
                                        <h4 className='text-[#0f0f0f] font-bold text-2xl'>Fourth Sunday of Great Lent</h4>
                                    </div>
                                    <div className="content mb-3">
                                        <p className='text-[#666B68]'>The question of the origins of the Christian tradition
                                            called Baptist has been, and to some extent still is, a much-debated issue.</p>
                                    </div>
                                    <div className="link">
                                        <Link href={route('blogs.show', 'random-post')} className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-item font-dmsans">
                                <div className="image">
                                    <img src="/images/slider/slider_1.png" className='h-[250px] object-cover rounded-3xl' />
                                </div>
                                <div className="content pt-3">
                                    <div className="date text-[#9f9f9f] font-medium">January 19, 2024</div>
                                    <div className="title pt-1 pb-3">
                                        <h4 className='text-[#0f0f0f] font-bold text-2xl'>Fourth Sunday of Great Lent</h4>
                                    </div>
                                    <div className="content mb-3">
                                        <p className='text-[#666B68]'>The question of the origins of the Christian tradition
                                            called Baptist has been, and to some extent still is, a much-debated issue.</p>
                                    </div>
                                    <div className="link">
                                        <Link className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-item font-dmsans">
                                <div className="image">
                                    <img src="/images/slider/slider_1.png" className='h-[250px] object-cover rounded-3xl' />
                                </div>
                                <div className="content pt-3">
                                    <div className="date text-[#9f9f9f] font-medium">January 19, 2024</div>
                                    <div className="title pt-1 pb-3">
                                        <h4 className='text-[#0f0f0f] font-bold text-2xl'>Fourth Sunday of Great Lent</h4>
                                    </div>
                                    <div className="content mb-3">
                                        <p className='text-[#666B68]'>The question of the origins of the Christian tradition
                                            called Baptist has been, and to some extent still is, a much-debated issue.</p>
                                    </div>
                                    <div className="link">
                                        <Link href='#' className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-item font-dmsans">
                                <div className="image">
                                    <img src="/images/slider/slider_1.png" className='h-[250px] object-cover rounded-3xl' />
                                </div>
                                <div className="content pt-3">
                                    <div className="date text-[#9f9f9f] font-medium">January 19, 2024</div>
                                    <div className="title pt-1 pb-3">
                                        <h4 className='text-[#0f0f0f] font-bold text-2xl'>Fourth Sunday of Great Lent</h4>
                                    </div>
                                    <div className="content mb-3">
                                        <p className='text-[#666B68]'>The question of the origins of the Christian tradition
                                            called Baptist has been, and to some extent still is, a much-debated issue.</p>
                                    </div>
                                    <div className="link">
                                        <Link className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-item font-dmsans">
                                <div className="image">
                                    <img src="/images/slider/slider_1.png" className='h-[250px] object-cover rounded-3xl' />
                                </div>
                                <div className="content pt-3">
                                    <div className="date text-[#9f9f9f] font-medium">January 19, 2024</div>
                                    <div className="title pt-1 pb-3">
                                        <h4 className='text-[#0f0f0f] font-bold text-2xl'>Fourth Sunday of Great Lent</h4>
                                    </div>
                                    <div className="content mb-3">
                                        <p className='text-[#666B68]'>The question of the origins of the Christian tradition
                                            called Baptist has been, and to some extent still is, a much-debated issue.</p>
                                    </div>
                                    <div className="link">
                                        <Link className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    )
}
