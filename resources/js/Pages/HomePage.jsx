import React, { useState } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "@/Components/Modal";
import { IconPlayerPlay } from "@tabler/icons-react";
import { DateTime } from "luxon";
import WOW from "react-wow";

export default function HomePage({ auth, posts, events, banners }) {

    const [prayModalState, setPrayModalState] = useState(false);
    var settings = {
        dots: true,
        infinite: banners?.length > 1 ? true : false,
        speed: 500,
        height: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const togglePrayModal = () => {
        setPrayModalState(!prayModalState);
    };

    const daysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function formatDateRange(start_date_str, end_date_str) {
        const startDateObj = new Date(start_date_str);
        const endDateObj = new Date(end_date_str);
        const startDateFormat = startDateObj.toLocaleString("default", {
            month: "long",
            day: "numeric",
        });
        const endDateFormat = endDateObj.toLocaleString("default", {
            month: "long",
            day: "numeric",
        });
        const startTimeFormat = startDateObj.toLocaleString("default", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        const endTimeFormat = endDateObj.toLocaleString("default", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        if (startDateObj.toDateString() === endDateObj.toDateString()) {
            return `${startDateFormat} @ ${startTimeFormat} - ${endTimeFormat}`;
        } else {
            return `${startDateFormat} @ ${startTimeFormat} - ${endDateFormat} @ ${endTimeFormat}`;
        }
    }

    return (
        <GuestLayout user={auth?.user}>
            <Head title="Home">
                <meta name="title" content="Members Church of God International Australia" />
                <meta name="keywords" content="Members Church of God International MCGI Australia Christian Community Australia Spiritual Guidance Biblical Teachings Christian Fellowship Religious Services Australia Christian Charity Work Bible Study Sessions Faith-Based Community" />
                <meta name="description" content="oin the Members Church of God International in Australia for spiritual growth and community service. Explore our faith-based teachings, Bible study sessions, and opportunities for Christian fellowship and charity work. Discover a welcoming community dedicated to spreading love, hope, and the teachings of the Bible." />
            </Head>
            <div className="homepage-content">
                <div className="hero-slider">
                    <Slider {...settings} className="lg:h-[800px] md:h-[438px]">
                        {banners.map((itm, index) => {
                            return (
                                <div key={itm.id} className="slider-item lg:h-full">
                                    <img
                                        src={`${itm?.bannerpath}`}
                                        alt={`${itm?.title}`}
                                        className="w-full object-cover h-[380px] md:h-[438px] lg:h-[800px]"
                                    />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
                <WOW animation="fadeIn">
                    <div className="welcome-section py-36">
                        <div className="w-full px-6">
                            <div className="max-w-screen-xl mx-auto">
                                <div className="content font-roboto">
                                    <div className="title-wrapper text-center">
                                        <h1 className="text-4xl lg:text-6xl font-extrabold mb-3 text-[#0f0f0f]">
                                            Welcome to{" "}
                                            <span className="text-[#f5cd06]">
                                                MCGI Australia
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="content pt-3 text-justify md:text-center w-full lg:w-4/5 mx-auto md:px-6 lg:px-0">
                                        <p className="mb-3 text-[#666B68] font-normal text-lg lg:text-xl leading-relaxed ">
                                            Welcome to Members Church of God
                                            International (MCGI) in Australia, a
                                            place where faith is nurtured, and
                                            spirituality flourishes. Our
                                            congregation is united by a shared
                                            belief in the teachings of Jesus
                                            Christ and a commitment to spreading
                                            His message of faith, hope and love.
                                            We embrace all who seek spiritual
                                            growth, offering a sanctuary of
                                            worship and a community of support.
                                        </p>
                                        <div className="more-link pt-6 inline-flex">
                                            <Link
                                                href={route("about")}
                                                className="bg-[#0077CC] text-white px-6 py-4 font-bold text-lg rounded-full "
                                            >
                                                More About Us
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </WOW>

                <div className="beliefs-section py-20 md:py-48 rounded-[20px] md:rounded-[80px]">
                    <div className="w-full">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="flex flex-col lg:flex-row gap-8">
                                <WOW animation="slideLeftToRight">
                                    <div className="w-11/12 lg:w-1/2 text-white mx-auto">
                                        <div className="title-wrapper">
                                            <h1 className="font-marcellus text-5xl md:text-6xl pb-12 font-bold">
                                                Our Beliefs and <br />
                                                Mission
                                            </h1>
                                            <div className="content pl-8 md:pl-16">
                                                <p className="text-xl text-left font-montserrat">
                                                    At MCGI Australia, our
                                                    mission is deeply rooted in
                                                    the teachings of the Bible,
                                                    guiding our journey in faith
                                                    and community service. We
                                                    strive to live by Christ's
                                                    teachings, fostering love,
                                                    humility, and compassion
                                                    within our diverse
                                                    congregation. Our dedication
                                                    to spreading the gospel and
                                                    serving the community is
                                                    unwavering, as we seek to
                                                    embody the spirit of Christ
                                                    in all our actions.
                                                </p>
                                                <div className="more-link pt-10  inline-flex">
                                                    <Link
                                                        href={route("about")}
                                                        className="bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-10 py-4 font-bold text-lg rounded-full "
                                                    >
                                                        View More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </WOW>
                                <WOW animation="slideRightToLeft">
                                    <div className="w-11/12 lg:w-1/2 mx-auto">
                                        <img
                                            src="/images/events.jpg"
                                            className="rounded-[30px] w-full h-auto"
                                        />
                                    </div>
                                </WOW>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pray-section py-36" id="prayer">
                    <div className="lg:w-full w-11/12 mx-auto">
                        <div className="max-w-screen-lg mx-auto">
                            <div className="title-wrapper pb-24">
                                <h1 className="text-center text-5xl md:text-6xl font-marcellus font-bold">
                                    PRAY WITH US
                                </h1>
                            </div>
                            <WOW animation="fadeIn">
                                <div className="video-wrapper flex items-center justify-center">
                                    <div className="play-icon w-24 h-24 bg-white flex items-center justify-center rounded-full drop-shadow-md shadow-white cursor-pointer">
                                        <IconPlayerPlay
                                            color="#666B68"
                                            size={42}
                                            onClick={togglePrayModal}
                                        />
                                    </div>
                                </div>
                            </WOW>
                            <WOW animation="fadeIn">
                                <div className="content  text-center text-xl text-[#666B68] mx-auto py-10">
                                    <p className="mb-3 text-justify md:text-center">
                                        The Community Prayer broadcast aims to
                                        connect everyone across the globe to
                                        pray together at certain hours of the
                                        day (Matthew 18:19-20). Before the short
                                        prayer, everyone is invited to sing
                                        hymns and songs of praise to God (James
                                        5:13).
                                    </p>
                                    <p className="mb-3 text-justify md:text-center">
                                        The live prayer broadcast on this page
                                        is set in the Filipino language. Every
                                        day, participants can join the
                                        top-of-the-hour prayer that starts at 12
                                        a.m. Philippine Time. The live prayer
                                        broadcast is also available in other
                                        languages.
                                    </p>
                                </div>
                            </WOW>
                            <div className="more-link pt-6  text-center flex items-center justify-center">
                                <a
                                    href="https://mcgi.org/community-prayer/"
                                    target="_blank"
                                    className="bg-[#f5cd06] text-[#0f0f0f] shadow-lg px-10 py-4 font-bold text-lg rounded-full "
                                >
                                    View More
                                </a>
                            </div>
                            <Modal
                                show={prayModalState}
                                onClose={togglePrayModal}
                                maxWidth={"xxl"}
                            >
                                <iframe
                                    width="100%"
                                    height="620"
                                    src="https://www.youtube.com/embed/uOeK-LssfiM?si=4NQc4Gc7A0BwafuY"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </Modal>
                        </div>
                    </div>
                </div>

                <div
                    className="charity-section pt-36 pb-52 rounded-tl-[30px] rounded-tr-[30px] md:rounded-tl-[80px] md:rounded-tr-[80px]"
                    id="charity"
                >
                    <div className="w-full">
                        <div className="w-11/12 md:max-w-screen-xl mx-auto">
                            <WOW animation="fadeIn">
                                <div className="title-wrapper relative">
                                    <h1 className="md:text-6xl text-4xl font-bold text-white font-marcellus">
                                        Charity and Community Service
                                    </h1>
                                    <p className="font-roboto text-4xl lg:text-7xl text-[#ECECEC] opacity-35 absolute md:top-11 top-15">
                                        Give, and it will be given to you
                                    </p>
                                </div>
                            </WOW>
                            <WOW animation="fadeIn">
                                <div className="content pt-32">
                                    <div className="bg-white rounded-[30px]">
                                        <div className="flex flex-col md:flex-row gap-6 items-center py-10 md:py-0 justify-center">
                                            <div className="md:w-1/2 w-11/12">
                                                <img
                                                    src="/images/charity.png"
                                                    className="w-full rounded-[20px] md:rounded-tl-[30px] md:rounded-bl-[30px] md:rounded-tr-[0px] md:rounded-br-[0px] md:h-[600px] object-cover"
                                                />
                                            </div>
                                            <div className="md:w-1/2 w-11/12">
                                                <div className="text-xl  text-[#666B68]">
                                                    <p className="mb-3">
                                                        At the heart of our
                                                        church's ethos is a
                                                        profound commitment to
                                                        charity and service.
                                                        MCGI Australia actively
                                                        engages in outreach
                                                        programs, community
                                                        service, and
                                                        humanitarian efforts,
                                                        driven by a
                                                        compassionate desire to
                                                        help those in need and
                                                        make a positive impact.
                                                    </p>
                                                    <p>
                                                        Our commitment to
                                                        charity and community
                                                        service is a cornerstone
                                                        of our faith. Through
                                                        acts of kindness and
                                                        generosity, we express
                                                        our devotion and fulfill
                                                        our mission to spread
                                                        love and compassion,
                                                        creating a better world
                                                        for all.
                                                    </p>
                                                </div>
                                                <div className="more-link pt-6 inline-flex">
                                                    <a
                                                        href="https://www.mcgi.org/charities/"
                                                        target="_blank"
                                                        className="bg-[#f5cd06] text-[#0f0f0f] shadow-lg px-10 py-4 font-bold text-lg rounded-full "
                                                    >
                                                        View More
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </WOW>
                        </div>
                    </div>
                </div>

                <div className="event-section -mt-[75px]">
                    <div className="w-full bg-[#10102e] px-6 rounded-[50px] lg:rounded-[80px]">
                        <WOW animation="fadeIn">
                            <div className="max-w-screen-xl mx-auto py-20 lg:py-36">
                                <div className="title-wrapper text-white relative">
                                    <h1 className="text-white text-3xl lg:text-6xl font-bold uppercase font-marcellus">
                                        Upcoming Events
                                    </h1>
                                    <p className="text-3xl lg:text-7xl text-[#ECECEC] opacity-35 absolute top-6 md:top-12">
                                        join us in worship and fellowship
                                    </p>
                                </div>
                                <div className="events-wrapper pt-16 lg:pt-40 pb-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                                        {events.length > 0 &&
                                            events?.map((item, index) => {
                                                const date = new Date(
                                                    item?.start_date
                                                );
                                                const dayOfWeek = date.getDay();
                                                return (
                                                    <div
                                                        className="event-item text-white"
                                                        key={index}
                                                    >
                                                        <div className="flex gap-6 items-start justify-start">
                                                            <div className="event-date text-center">
                                                                <p className="text-2xl lg:text-3xl font-bold ">
                                                                    {
                                                                        daysList[
                                                                        dayOfWeek
                                                                        ]
                                                                    }
                                                                </p>
                                                                <p className="text-4xl lg:text-6xl font-normal pt-4 ">
                                                                    {date.getDate()}
                                                                </p>
                                                            </div>
                                                            <div className="pl-3 info">
                                                                <div className="event-time">
                                                                    <p className=" text-sm font-semibold">
                                                                        {formatDateRange(
                                                                            item?.start_date,
                                                                            item?.end_date
                                                                        )}
                                                                    </p>
                                                                </div>
                                                                <div className="event-title pt-2">
                                                                    <p className="text-xl lg:text-4xl font-normal uppercase font-marcellus">
                                                                        {
                                                                            item?.title
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="mt-8 text-sm cursor-pointer">
                                                                    {item?.isImminent && <Link href={route("events.index")}>Register Now</Link>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                                <div className="btn-wrapper more-link">
                                    <Link
                                        href={route("events.index")}
                                        className="inline-block bg-[#f5cd06] text-[#0f0f0f] px-6 py-4 font-semibold text-lg rounded-full capitalize "
                                    >
                                        View more events
                                    </Link>
                                </div>
                            </div>
                        </WOW>
                    </div>
                </div>

                <WOW animation="fadeIn">
                    <div className="blogs-section py-20 lg:py-40">
                        <div className="w-full px-6">
                            <div className="max-w-screen-xl mx-auto">
                                <div className="title-wrapper relative">
                                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-3 text-[#0f0f0f] font-marcellus">
                                        Stories &{" "}
                                        <span className="text-[#f5cd06]">
                                            Articles
                                        </span>
                                    </h1>
                                    <p className="text-4xl lg:text-7xl text-[#000] absolute top-7  md:top-14 opacity-35">
                                        find inspiration in God
                                    </p>
                                </div>
                                <div className="blog-items pt-16 lg:pt-32">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                        {posts?.length > 0 &&
                                            posts.map((post) => {
                                                const date = DateTime.fromISO(
                                                    post?.created_at,
                                                    { zone: "utc" }
                                                );
                                                return (
                                                    <React.Fragment
                                                        key={post?.id}
                                                    >
                                                        <div className="blog-item ">
                                                            <Link
                                                                href={route(
                                                                    "blogs.show",
                                                                    `${post.slug}`
                                                                )}
                                                                className="font-semibold border-b-2 border-black pb-1"
                                                            >
                                                                <div className="image">
                                                                    <img
                                                                        src={
                                                                            post?.featured_image
                                                                        }
                                                                        className="h-[250px] object-cover rounded-3xl w-full"
                                                                    />
                                                                </div>
                                                            </Link>
                                                            <div className="content pt-3">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="date text-[#9f9f9f] font-medium">
                                                                        {date.toFormat(
                                                                            "LLLL dd, yyyy"
                                                                        )}
                                                                    </div>
                                                                    {/* <div className="text-[#9f9f9f] font-medium">{`${post?.author?.first_name} ${post?.author?.last_name}`}</div> */}
                                                                </div>
                                                                <div className="title pt-1 pb-3">
                                                                    <Link
                                                                        href={route(
                                                                            "blogs.show",
                                                                            `${post.slug}`
                                                                        )}
                                                                        className="font-semibold border-b-2 border-black pb-1"
                                                                    >
                                                                        <h4 className="text-[#0f0f0f] font-bold text-2xl capitalize">
                                                                            {
                                                                                post?.title
                                                                            }
                                                                        </h4>
                                                                    </Link>
                                                                </div>
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: post?.content
                                                                            ? post.content
                                                                                .replace(
                                                                                    /<img.*?>/g,
                                                                                    ""
                                                                                )
                                                                                .replace(
                                                                                    /<[^>]+>/g,
                                                                                    ""
                                                                                )
                                                                                .split(
                                                                                    " "
                                                                                )
                                                                                .slice(
                                                                                    0,
                                                                                    20
                                                                                )
                                                                                .join(
                                                                                    " "
                                                                                )
                                                                            : "",
                                                                    }}
                                                                />
                                                                <div className="link">
                                                                    <Link
                                                                        href={route(
                                                                            "blogs.show",
                                                                            `${post.slug}`
                                                                        )}
                                                                        className="font-semibold border-b-2 border-black pb-1"
                                                                    >
                                                                        Read
                                                                        More
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="link  pt-24 text-center">
                            <button className="bg-[#f5cd06] more-links-posts text-[#0f0f0f] shadow-lg px-10 py-4 font-bold text-lg rounded-full ">
                                <Link href="/blogs">View More Posts</Link>
                            </button>
                        </div>
                    </div>
                </WOW>
            </div >
        </GuestLayout >
    );
}
