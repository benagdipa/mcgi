import Guest from '@/Layouts/GuestLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { DateTime } from 'luxon';

export default function BlogsPage({ auth, posts }) {

    const extractWords = (inputString, numWords) => {
        let words = inputString.split(/\s+/);
        let extractedWords = words.slice(0, numWords);
        let result = extractedWords.join(" ");
        return result;
    }

    return (
        <Guest user={auth?.user}>
            <Head title='Blogs' />
            <div className="contact-page blog-page">
                <div className="page-header pt-40 lg:pt-80 pb-28 ">
                    <div className="w-full">
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
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
                <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                    <div className="blog-items py-16 lg:py-32">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {posts?.length && posts.map((post) => {
                                const date = DateTime.fromISO(post?.created_at, { zone: 'utc' })
                                return (
                                    <React.Fragment key={post?.id}>
                                        <div className="blog-item font-dmsans">
                                            <Link href={route('blogs.show', `${post.slug}`)} className='font-semibold border-b-2 border-black pb-1'>
                                                <div className="image">
                                                    <img src={post?.featured_image} className='h-[250px] object-cover rounded-3xl w-full' />
                                                </div>
                                            </Link>
                                            <div className="content pt-3">
                                                <div className="date text-[#9f9f9f] font-medium">{date.toFormat('LLLL dd, yyyy')}</div>
                                                <div className="title pt-1 pb-3">
                                                    <Link href={route('blogs.show', `${post.slug}`)} className='font-semibold border-b-2 border-black pb-1'>
                                                        <h4 className='text-[#0f0f0f] font-bold text-2xl capitalize'>
                                                            {post?.title}
                                                        </h4>
                                                    </Link>
                                                 </div>
                                                 <div dangerouslySetInnerHTML={{ __html: post?.content? post.content.replace(/<img.*?>/g, '') // Remove image tags
                                                                            .replace(/<[^>]+>/g, '') // Remove all other HTML tags
                                                                            .split(' ').slice(0, 20).join(' ')
                                                            : ''
                                                        }}
                                                />
                                                {/* <div className="content mb-3"><p className='text-[#666B68]'>{extractWords(post?.content, 20)}</p></div> */}
                                                <div className="link">
                                                    <Link href={route('blogs.show', `${post.slug}`)} className='font-semibold border-b-2 border-black pb-1'>Read More</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    )
}
