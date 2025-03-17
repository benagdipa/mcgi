import React from "react";
import { Link } from "@inertiajs/react";
import Badge from "@/Components/Badge";
import Card from "@/Components/Card";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { DateTime } from "luxon";

export default function FeaturedBlogs({ posts }) {
    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <section className="blogs-section py-12 md:py-20" aria-labelledby="latest-articles-heading">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-10">
                    <div>
                        <Badge 
                            color="primary" 
                            variant="soft" 
                            size="lg" 
                            className="mb-3"
                        >
                            Blog
                        </Badge>
                        <h2 id="latest-articles-heading" className="text-2xl sm:text-3xl font-bold text-tertiary">Latest Articles</h2>
                    </div>
                    <Link
                        href={route('blogs.index')}
                        className="text-primary font-semibold flex items-center hover:underline mt-4 sm:mt-0"
                        aria-label="View all articles"
                    >
                        View All
                        <FaArrowRight className="ml-2" size={14} aria-hidden="true" />
                    </Link>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {posts.slice(0, 3).map((post) => {
                        const date = DateTime.fromISO(post?.created_at, { zone: "utc" });
                        return (
                            <Card 
                                key={post?.id}
                                className="overflow-hidden border-none shadow-lg rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col"
                                hover={true}
                            >
                                <Link
                                    href={route("blogs.show", post.slug)}
                                    className="block overflow-hidden h-48"
                                    aria-label={`View article: ${post.title}`}
                                >
                                    <img
                                        src={post?.featured_image || "/images/blog-placeholder.jpg"}
                                        alt={post?.title}
                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 24 24" fill="none" stroke="%230077cc" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polygon points="10 9 9 9 8 9"></polygon></svg>';
                                        }}
                                    />
                                </Link>
                                
                                <div className="p-4 sm:p-5 flex-grow flex flex-col">
                                    <div className="flex items-center text-gray-500 text-sm mb-3">
                                        <FaCalendarAlt className="mr-1 text-primary" aria-hidden="true" />
                                        <time dateTime={post?.created_at}>{date.toFormat('LLL dd, yyyy')}</time>
                                    </div>

                                    {post.category && (
                                        <Badge 
                                            color="secondary" 
                                            variant="light"
                                            className="mb-2 self-start"
                                        >
                                            {post.category.name}
                                        </Badge>
                                    )}
                                    
                                    <Link
                                        href={route("blogs.show", post.slug)}
                                        className="block mb-3"
                                    >
                                        <h3 className="text-lg font-bold text-tertiary hover:text-primary transition-colors">
                                            {post?.title}
                                        </h3>
                                    </Link>
                                    
                                    <p className="text-gray-600 mb-4 flex-grow text-sm">
                                        {post.excerpt || post.content?.replace(/<[^>]+>/g, '').substring(0, 100) + '...'}
                                    </p>
                                    
                                    <Link
                                        href={route("blogs.show", post.slug)}
                                        className="inline-flex items-center text-primary font-semibold mt-auto"
                                        aria-label={`Read more about ${post.title}`}
                                    >
                                        Read More
                                        <FaArrowRight className="ml-2" size={14} aria-hidden="true" />
                                    </Link>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
} 