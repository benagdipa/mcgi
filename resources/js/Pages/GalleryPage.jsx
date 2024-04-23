
import Guest from '@/Layouts/GuestLayout'
import { Head, Link } from '@inertiajs/react'
import React, { useState } from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

export default function GalleryPage({ auth, albums }) {
    const [imageIndex, setImageIndex] = useState(-1)
    return (
        <Guest user={auth?.user}>
            <Head>
                <title>Wallpaper Image Gallery</title>
                <meta name="title" content="Wallpapers Image Gallery" />
                <meta name="keywords" content="Wallpaper Image Gallery" />
                <meta name="descriptions" content="May these Bible verses and quotes remind us that we are not alone, and that we have God on our side. Download these wallpapers on your mobile and desktop devices today. May God keep you all safe!" />
            </Head>
            <div className="image-gallery-page">
                <div className="page-header pt-[70px] md:pt-80 pb-28 ">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <h1 className='font-bold text-7xl text-white'>Image Gallery</h1>
                        <div className="breadcrumbs pt-5">
                            <div className="flex gap-4 font-semibold uppercase  text-white">
                                <div className="item"><Link href={route('home')} className="breadcrumb-link">HOME</Link></div>
                                <div className="divider"> | </div>
                                <div className="item"><Link href={route('gallery')} className="breadcrumb-link text-gray-200">Image gallery</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper py-12">
                    <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                        <h1 className='text-center text-4xl font-bold uppercase mb-12 md:mb-0'>Wallpapers</h1>
                        <div className="gallery-item">
                            {albums.length > 0 && albums.map((album, index) => {
                                return (
                                    <div key={index} className='lg:m-12'>
                                        <h1 className='text-3xl font-semibold mb-3'>{album.name}</h1>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                                            <Gallery>
                                                {album.attachments.length > 0 && album.attachments.map((item, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <Item
                                                                original={item.path}
                                                                thumbnail={item.path}
                                                                width="1600"
                                                                height="1068"
                                                            >
                                                                {({ ref, open }) => (
                                                                    <img ref={ref} onClick={open} src={item.path} className='w-full h-80 object-cover' />
                                                                )}
                                                            </Item>
                                                        </React.Fragment>
                                                    )
                                                })}
                                            </Gallery>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    )
}
