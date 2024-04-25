
import Guest from '@/Layouts/GuestLayout'
import { Head, Link } from '@inertiajs/react'
import React, { useState } from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import { IconDownload } from '@tabler/icons-react'

export default function GalleryPage({ auth, albums }) {

    const handleDownload = (imageURL) => {
        if (imageURL) {
            const fileName = imageURL.substring(imageURL.lastIndexOf('/') + 1);
            const link = document.createElement('a');
            link.href = imageURL;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    const scrollToTop = (albumElement) => {
        const element = document.getElementById(`${albumElement}`);
        const elementPosition = element.getBoundingClientRect().top;
        const offset = elementPosition + window.scrollY - 140;
        window.scrollTo({ top: offset, behavior: 'smooth' });

    };


    const ShowGallery = ({ attachments, albumElement }) => {
        if (attachments.length > 0) {
            const [currentPage, setCurrentPage] = useState(1);
            const itemsPerPage = 10;
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            const currentItems = attachments.slice(indexOfFirstItem, indexOfLastItem);

            const paginate = (pageNumber) => {
                setTimeout(() => {
                    setCurrentPage(pageNumber);
                    scrollToTop(albumElement);
                }, 1500);
            };

            return (
                <React.Fragment>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                        <Gallery>
                            {currentItems.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className="relative group">
                                            {auth?.user && (
                                                <div className="download-icon absolute top-1 right-1 bg-white/80 p-3 rounded-full cursor-pointer transition duration-300 ease-in-out invisible group-hover:visible ">
                                                    <IconDownload color='black' onClick={() => handleDownload(item.path)} />
                                                </div>
                                            )}
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
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </Gallery>
                    </div>
                    {attachments.length > 10 && (
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={attachments.length}
                            paginate={paginate}
                            current={currentPage}
                        />
                    )}
                </React.Fragment>
            )


        }
    }
    const Pagination = ({ itemsPerPage, totalItems, paginate, current }) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <ul className="pagination flex justify-center items-center gap-2 py-12">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <div
                            onClick={() => paginate(number)}
                            className={`font-semibold bg-yellow-500 py-2 px-4 rounded cursor-pointer ${current === number ? 'active' : ''}`}
                        >
                            {number}
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

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
                                    <div key={index} className='lg:m-12' id={`album_${album.id}`}>
                                        <h1 className='text-3xl font-semibold mb-3'>{album.name}</h1>
                                        <ShowGallery attachments={album.attachments} albumElement={`album_${album.id}`} />
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
