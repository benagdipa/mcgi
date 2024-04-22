
import Guest from '@/Layouts/GuestLayout'
import { Head, Link } from '@inertiajs/react'
import React, { useState } from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import WOW from 'react-wow';
export default function GalleryPage({ auth }) {

    const [imageIndex, setImageIndex] = useState(-1)

    const desktop_inspirational = [
        "https://mcgi.org/wp-content/uploads/photo-gallery/DESKTOP-MOBILE-WALLPAPER-VERSE-ROMANS12_12-REJOICING-IN-HOPE_-PATIENT-IN-TRIBULATION-1.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HB-DESKTOP-MOBILE-WALLPAPER-VERSE-BRO.ELI-SORIANO-DELIGHT-THYSELF-ALSO-IN-THE-LORD.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-MOBILE-DESKTOP-WALLPAPER-BIBLE-VERSE-ISAIAH26_3-THOU-WILT-KEEP-HIM-IN-PERFECT-PEACE.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-MOBILE-DESKTOP-WALLPAPER-BIBLE-VERSE-1JOHN-4_4-YE-ARE-GODS-LITTLE-CHILDREN.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-DESKTOP-MOBILE-WALLPAPER-PSALM-55_22-CAST-THY-BURDEN-UPON-THE-LORD.jpg.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-DESKTOP-MOBILE-WALLPAPER-THE-LORD-ALSO-WILL-BE-A-REFUGE-PSALM-9_9.jpg.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-DESKTOP-MOBILE-WALLPAPER-PROVERBS_31_30-FAVOUR_IS_DECEITFUL_AND_BEAUTY_IS_VAIN.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-MOBILE-DESKTOP-WALLPAPER-PSALMS_147_3-HE-HEALETH-THE-BROKEN-IN-HEART(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-MOBILE-DESKTOP-WALLPAPER-VERSE-ROMANS8_28-AND-WEKNOW-THAT-ALL-THINGS-WORK-TOGETHER.jpg.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-MOBILE-DESKTOP-WALLPAPER-VERSE-PSALM121_2-May-Help-cometh-from-the-Lord(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Deut-3_22-Ye-shall-not-fear-them-for-the-Lord-your-God-He-shall-fight-for-you.jpg.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Psalms-73_26-My-flesh-and-my-heart-faileth-but-God-is-the-stregnth-of-my-heart.jpg.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Isaiah-14_29-He-giveth-power-to-the-fainth.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MOBILE-DESKTOP-WALLPAPER-GAWIN-NINYO-SA-PAGIBIG-ANG-LAHAT-NINYONG-GINAGAWA-1_COR_14_16(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MOBILE-DESKTOP-WALLPAPER-AND-ABOVE-ALL-THESE-THINGS-PUT-ON-CHARITY-EHICH-IS-BOND-OF-PERFECTNESS-COL_3_14-.jpg",
    ]
    const desktop_quote = [
        "https://mcgi.org/wp-content/uploads/photo-gallery/DESKTOP-MOBILE-WALLPAPER-INSPIRATIONAL-QUOTE-BRO-DANIEL-RAZON-LET-US-BE-HUMBLE-IN-THE-SIGHT-OF-GOD.jpg.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/DESKTOP-MOBILE-WALLPAPER-INSPIRATIONAL-QUOTE-BRO.ELI-SORIANO-WORDS-ARE-POWERFUL-SPECIALLY-THE-WORDS-OF-GOD.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-DESKTOP-MOBILE-WALLPAPER-QUOTE-IF-YOU-HAVE-HOPE-YOU-HAVE-PEACE-BRO.DANIEL-RAZON1.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-MOBILE-DESKTOP-WALLPAPER-INSPIRATIONAL-QUOTE-BRO.ELI-LET-US-LEARN-TO-BE-LOWLY-IN-EVERY-ASPECT-OF-LIFE.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-MOBILE-DESKTOP-WALLPAPER-INSPIRATIONAL-QUOTE-BRO.DANIEL-WE-SHOULD-LIVE-IN-HOPE.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-MOBILE-DESKTOP-WALLPAPER-INSPIRATIONAL-QUOTE-BRO.ELI-SORIANO-HOPE-MUST-DWELL-IN-OUR-HEARTS-ALWAYS.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-MOBILE-DESKTOP-WALLPAPER-INSPIRATIONAL-QUOTE-BRO.ELI-ITS-AN-HONOR-THAT-GOD-WANTS-TO-USE-YOU-FOR-HIS-WORK-ITS-AN-HONORABLE-PRIVILAGE.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-DESKTOP-MOBILE-WALLPAPER-PSALM-55_22-CAST-THY-BURDEN-UPON-THE-LORD.jpg.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-DESKTOP-MOBILE-WALLPAPER-THE-LORD-ALSO-WILL-BE-A-REFUGE-PSALM-9_9.jpg.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-MOBILE-DESKTOP-WALLPAPER-inspirational-quote-BRO.DANIEL-BE-CONTENT-THAT-YOU-HAVE-GOD-IN-YOUR-LIFE-2.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HB-MOBILE-DESKTOP-WALLPAPER-INSPIRATIONAL-QUOTE-BRO.DANIEL-Just-awhole-day-of-Gods-Kindness(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Bro-Eli-Soriano-Let-us-make-our-God-Proud-Of-Us.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Bro-Eli-Soriano-Let-Let-us-allow-God_s-will.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Bro-Eli-Soriano-Everyday-that-comes-to-our-lives-is-a-blessing(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Bro-Eli-Soriano-this-is-the-duty-of-every-one-of-us-to-observe-one-anpther.jpg",
    ]
    const mobile_insp = [
        "https://mcgi.org/wp-content/uploads/photo-gallery/DESKTOP-MOBILE-WALLPAPER-VERSE-ROMANS12_12-REJOICING-IN-HOPE_-PATIENT-IN-TRIBULATION-.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HB-DESKTOP-MOBILE-WALLPAPER-VERSE-BRO.ELI-SORIANO-DELIGHT-THYSELF-ALSO-IN-THE-LORD.jpg.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-MOBILE-DESKTOP-WALLPAPER-BIBLE-VERSE-ISAIAH26_3-THOU-WILT-KEEP-HIM-IN-PERFECT-PEACE_(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-MOBILE-DESKTOP-WALLPAPER-BIBLE-VERSE-1JOHN-4_4-YE-ARE-GODS-LITTLE-CHILDREN_(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-DESKTOP-MOBILE-WALLPAPER-THE-LORD-ALSO-WILL-BE-A-REFUGE-PSALM-9_9.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-DESKTOP-MOBILE-WALLPAPER-PSALM-55_22-CAST-THY-BURDEN-UPON-THE-LORD.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-MOBILE-DESKTOP-WALLPAPER-PSALMS_147_3-HE-HEALETH-THE-BROKEN-IN-HEART.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-DESKTOP-MOBILE-WALLPAPER-PROVERBS_31_30-FAVOUR_IS_DECEITFUL_AND_BEAUTY_IS_VAIN.jpg.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-MOBILE-DESKTOP-WALLPAPER-VERSE-ROMANS8_28-AND-WEKNOW-THAT-ALL-THINGS-WORK-TOGETHER.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-MOBILE-DESKTOP-WALLPAPER-VERSE-PSALM121_2-May-Help-cometh-from-the-Lord.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Psalms-73_26-My-flesh-and-my-heart-faileth-but-God-is-the-stregnth-of-my-heart.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Deut-3_22-Ye-shall-not-fear-them-for-the-Lord-your-God-He-shall-fight-for-you.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Isaiah-14_29-He-giveth-power-to-the-fainth(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MOBILE-DESKTOP-WALLPAPER-GAWIN-NINYO-SA-PAGIBIG-ANG-LAHAT-NINYONG-GINAGAWA-1_COR_14_16.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MOBILE-DESKTOP-WALLPAPER-LET-ALL-THAT-YOU-DO-BE-DONE-WITH-LOVE-1_COR_14_16.jpg",
    ]
    const mobile_quote = [
        "https://mcgi.org/wp-content/uploads/photo-gallery/DESKTOP-MOBILE-WALLPAPER-INSPIRATIONAL-QUOTE-BRO.ELI-SORIANO-WORDS-ARE-POWERFUL-SPECIALLY-THE-WORDS-OF-GOD1.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/DESKTOP-MOBILE-WALLPAPER-INSPIRATIONAL-QUOTE-BRO-DANIEL-RAZON-LET-US-BE-HUMBLE-IN-THE-SIGHT-OF-GOD.jpg1_.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-DESKTOP-MOBILE-WALLPAPER-QUOTE-IF-YOU-HAVE-HOPE-YOU-HAVE-PEACE-BRO.DANIEL-RAZON.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-MOBILE-DESKTOP-WALLPAPER-INSPIRATIONAL-QUOTE-BRO.ELI-LET-US-LEARN-TO-BE-LOWLY-IN-EVERY-ASPECT-OF-LIFE_(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-MOBILE-DESKTOP-WALLPAPER-INSPIRATIONAL-QUOTE-BRO.DANIEL-WE-SHOULD-LIVE-IN-HOPE_(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-MOBILE-DESKTOP-WALLPAPER-INSPIRATIONAL-QUOTE-BRO.ELI-SORIANO-HOPE-MUST-DWELL-IN-OUR-HEARTS-ALWAYS_(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-MOBILE-DESKTOP-WALLPAPER-INSPIRATIONAL-QUOTE-BRO.ELI-ITS-AN-HONOR-THAT-GOD-WANTS-TO-USE-YOU-FOR-HIS-WORK-ITS-AN-HONORABLE-PRIVILAGE_(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-DESKTOP-MOBILE-WALLPAPER-THE-LORD-ALSO-WILL-BE-A-REFUGE-PSALM-9_9.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-DESKTOP-MOBILE-WALLPAPER-PSALM-55_22-CAST-THY-BURDEN-UPON-THE-LORD.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HD-MOBILE-DESKTOP-WALLPAPER-inspirational-quote-BRO.DANIEL-BE-CONTENT-THAT-YOU-HAVE-GOD-IN-YOUR-LIFE.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/HB-MOBILE-DESKTOP-WALLPAPER-INSPIRATIONAL-QUOTE-BRO.DANIEL-Just-awhole-day-of-Gods-Kindness.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Bro-Eli-Soriano-Let-us-make-our-God-Proud-Of-Us(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Bro-Eli-Soriano-Let-Let-us-allow-God_s-will.jpg.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Bro-Eli-Soriano-this-is-the-duty-of-every-one-of-us-to-observe-one-another.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-HD-desktop-mobile-wallpaper-biblical-inspirational-quote-Bro-Eli-Soriano-Everyday-that-comes-to-our-lives-is-a-blessing.jpg",
    ]
    const backgrounds = [
        "https://mcgi.org/wp-content/uploads/photo-gallery/Brethren-VBG-4.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/Brethren-VBG-Blurred.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-TEENS.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-KIDS-VG.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-CARES-3.png",
        "https://mcgi.org/wp-content/uploads/photo-gallery/MCGI-CARES-BG-2.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/BG_5.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/KNC_BG_2.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/BG_2A.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/BG_4.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/KNC_BG.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/KNC_BG_1_(1)_(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/BG_1.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/NY_4.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/KNC_BG_1_(1).jpg",
    ]
    const templates = [
        "https://mcgi.org/wp-content/uploads/photo-gallery/Day-1.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/Day-2.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/Day-3.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/Day-1_(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/Day-2_(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/Day-3_(1).jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/PBB-Blue-June.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/PBB-Blue-June-IG.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/PBB-Yellow-June.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/PBB-Yellow-June-IG.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/PBB-Violet-June.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/PBB-Violet-June-IG.jpg",
        "https://mcgi.org/wp-content/uploads/photo-gallery/collage-fb.png",
        "https://mcgi.org/wp-content/uploads/photo-gallery/collage-tw.png",
        "https://mcgi.org/wp-content/uploads/photo-gallery/collage-ig.png",
    ]
    return (
        <Guest user={auth?.user}>
            <Head>
                <title>Wallpaper Image Gallery</title>
                <meta name="title" content="Wallpapers Image Gallery"/>
                <meta name="keywords" content="Wallpaper Image Gallery"/>
                <meta name="descriptions" content="May these Bible verses and quotes remind us that we are not alone, and that we have God on our side. Download these wallpapers on your mobile and desktop devices today. May God keep you all safe!"/>
            </Head>
            <div className="image-gallery-page">
                <div className="page-header pt-[70px] md:pt-80 pb-28 ">
                    <WOW animation='slideLeftToRight'>
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
                    </WOW>
                </div>

                    <div className="content-wrapper py-12">
                    <WOW animation='fadeIn'>
                        <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                            <h1 className='text-center text-4xl font-bold uppercase'>Wallpapers</h1>
                            <div className="desktop-section">
                                <div className="section-header">
                                    <h1 className='text-2xl font-semibold'>Desktop</h1>
                                    <p>Inspirational Bible Verses (KJV)</p>
                                    <div className="grid grid-cols-3 gap-3 mt-4">
                                        <Gallery>
                                            {desktop_inspirational.length > 0 && desktop_inspirational.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <Item
                                                            original={item}
                                                            thumbnail={item}
                                                            width="1600"
                                                            height="1068"
                                                        >
                                                            {({ ref, open }) => (
                                                                <img ref={ref} onClick={open} src={item} className='w-full h-80 object-cover' />
                                                            )}
                                                        </Item>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </Gallery>
                                    </div>
                                    <p className='py-4'>Inspirational Quotes</p>
                                    <div className="grid grid-cols-3 gap-3 mt-4">
                                        <Gallery>
                                            {desktop_quote.length > 0 && desktop_quote.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <Item
                                                            original={item}
                                                            thumbnail={item}
                                                            width="1600"
                                                            height="1068"
                                                        >
                                                            {({ ref, open }) => (
                                                                <img ref={ref} onClick={open} src={item} className='w-full h-80 object-cover' />
                                                            )}
                                                        </Item>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </Gallery>
                                    </div>
                                </div>
                            </div>
                            <div className="mobile-section mt-8">
                                <div className="section-header">
                                    <h1 className='text-2xl font-semibold'>Mobile</h1>
                                    <p>Inspirational Bible Verses (KJV)</p>
                                    <div className="grid grid-cols-3 gap-3 mt-4">
                                        <Gallery>
                                            {mobile_insp.length > 0 && mobile_insp.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <Item
                                                            original={item}
                                                            thumbnail={item}
                                                            width="1600"
                                                            height="1068"
                                                        >
                                                            {({ ref, open }) => (
                                                                <img ref={ref} onClick={open} src={item} className='w-full h-80 object-cover' />
                                                            )}
                                                        </Item>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </Gallery>
                                    </div>
                                    <p>Inspirational Quotes</p>
                                    <div className="grid grid-cols-3 gap-3 mt-4">
                                        <Gallery>
                                            {mobile_quote.length > 0 && mobile_quote.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <Item
                                                            original={item}
                                                            thumbnail={item}
                                                            width="1600"
                                                            height="1068"
                                                        >
                                                            {({ ref, open }) => (
                                                                <img ref={ref} onClick={open} src={item} className='w-full h-80 object-cover' />
                                                            )}
                                                        </Item>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </Gallery>
                                    </div>
                                </div>
                            </div>
                            <div className="background-section mt-4">
                                <div className="section-header">
                                    <h1 className='text-2xl font-semibold'>Backgrounds</h1>
                                    <div className="grid grid-cols-3 gap-3 mt-4">
                                        <Gallery>
                                            {backgrounds.length > 0 && backgrounds.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <Item
                                                            original={item}
                                                            thumbnail={item}
                                                            width="1600"
                                                            height="1068"
                                                        >
                                                            {({ ref, open }) => (
                                                                <img ref={ref} onClick={open} src={item} className='w-full h-80 object-cover' />
                                                            )}
                                                        </Item>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </Gallery>
                                    </div>
                                </div>
                            </div>
                            <div className="template-section mt-4">
                                <div className="section-header">
                                    <h1 className='text-2xl font-semibold'>Templates</h1>
                                    <div className="grid grid-cols-3 gap-3 mt-4">
                                        <Gallery>
                                            {templates.length > 0 && templates.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <Item
                                                            original={item}
                                                            thumbnail={item}
                                                            width="1600"
                                                            height="1068"
                                                        >
                                                            {({ ref, open }) => (
                                                                <img ref={ref} onClick={open} src={item} className='w-full h-80 object-cover' />
                                                            )}
                                                        </Item>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </Gallery>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </WOW>
                </div>
            </div>
        </Guest>
    )
}
