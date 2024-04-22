import Guest from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/react';
import { DateTime } from 'luxon';
import React from 'react'

export default function SingleBlogPage({ auth, post, categories, tags }) {
    const date = DateTime.fromISO(post?.created_at, 'MM/dd/yyyy HH:mm:ss')
    const ShowCategories = ({ list }) => {
        if (list) {
            const postCategories = list.split(',')
            return postCategories?.map((cat, index) => {
                const postCategory = categories.filter(item => item.id === parseInt(cat))
                return (
                    <span className='text-white font-bold font-dmsans rounded text-xl' key={postCategory[0].id}>{postCategory[0].title} {index < postCategories.length - 1 ? ',' : ''}</span>
                )
            })
        }
    }

    const ShowTags = ({ list }) => {
        if (list) {
            const postTags = list.split(',')
            return postTags?.map((tag) => {
                const postTag = tags.filter(item => item.id === parseInt(tag))
                return (
                    <span className='px-2 bg-gray-300 py-2 rounded font-dmsans' key={postTag[0].id}>{postTag[0].title}</span>
                )
            })
        }
    }
    return (
        <Guest user={auth?.user}>
            <Head title={post.title} />
            <div className="single-post">
                <div className="top-section bg-[#0077CC] py-20">
                    <div className="max-w-screen-xl mx-auto">
                        <p className='text-center mb-3'>
                            <span className='bg-[#f5cd06] py-2 px-4 rounded-full capitalize font-semibold'>{post.category}</span>
                        </p>
                        <h2 className='xl:w-full w-11/12 mx-auto text-center text-white font-marcellus lg:text-6xl text-4xl font-semibold leading-tight mb-10'>{post.title}</h2>
                        <div className="lg:w-full w-11/12 mx-auto blog-meta flex justify-center text-white lg:gap-6 gap-2 items-center">
                            <div className="author-wrapper">
                                <div className="flex items-center gap-2">
                                    {/* <div className="image-wrapper">
                                        <img src="https://randomuser.me/api/portraits/men/1.jpg" className='lg:w-20 lg:h-20 w-15 h-15 rounded-full' />
                                    </div> */}
                                    {/* <div className="author border-r-2 pr-4">
                                        <p className='text-2xl font-dmsans font-semibold'>{`${post?.author?.first_name} ${post?.author?.last_name}`} </p>
                                    </div> */}
                                    {/* <div className="author border-r-2 pr-4">
                                        <p className='lg:text-2xl font-dmsans font-semibold'>{`${post?.author?.first_name} ${post?.author?.last_name}`} </p>
                                    </div> */}

                                </div>
                            </div>
                            <div className="post-date font-dmsans font-semibold">
                                {date.toFormat('LLLL dd, yyyy')}
                            </div>
                        </div>
                        <div className="categories flex items-center justify-center pt-5">
                            <div className="space-x-1">
                                <ShowCategories list={post?.categories} />
                            </div>
                        </div>
                        <div className="post-image">
                            <div className="image-wrapper pt-12">
                                <img src={post?.featured_image} alt="" className='mx-auto w-full rounded-2xl max-h-[400px] object-contain' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-section pt-20 mb-20">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <div className="content-wrapper">
                            <div dangerouslySetInnerHTML={{ __html: post?.content }} />
                        </div>
                        <div className='tags pt-10'>
                            <div className=" space-x-3">
                                <ShowTags list={post?.tags} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Guest>
    )
}
