import React from 'react'
import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function HomePage({ auth }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <GuestLayout>
            <Head title="Home" />
            <div className='homepage-content'>
                <div className="hero-slider">
                    <Slider {...settings}>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_1.png" className='w-full object-contain h-full' />
                        </div>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_2.jpg" className='w-full object-contain h-full' />
                        </div>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_3.jpg" className='w-full object-contain h-full' />
                        </div>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_4.png" className='w-full object-contain h-full' />
                        </div>
                        <div className='slider-item lg:h-full'>
                            <img src="/images/slider/slider_5.png" className='w-full object-contain h-full' />
                        </div>                        
                    </Slider>
                </div>
            </div>
        </GuestLayout>
    )
}
