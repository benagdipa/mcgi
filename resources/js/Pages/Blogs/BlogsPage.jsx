import Guest from '@/Layouts/GuestLayout'
import { Head, Link } from '@inertiajs/react'
import React,{useState,useEffect} from 'react'
import { DateTime } from 'luxon';
import WOW from 'react-wow';

export default function BlogsPage({ auth,  }) {

    const [posts, setPosts] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchPosts = async (url) => {
        setLoading(true);
        try {
          const response = await axios.get('/blogs/getAllPost');
          setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
          setNextPageUrl(response.data.next_page_url); // Set the URL for the next page
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchPosts();
      }, []);
    
      // Handle load more
      const handleLoadMore = () => {
        if (nextPageUrl) {
          fetchPosts(nextPageUrl); // Fetch next set of posts
        }
      };


    const extractWords = (inputString, numWords) => {
        let words = inputString.split(/\s+/);
        let extractedWords = words.slice(0, numWords);
        let result = extractedWords.join(" ");
        return result;
    }
    return (
        <Guest user={auth?.user}>
            <Head>
                <title>News, Blogs and Features</title>
                <meta name="title" content="News, Blogs and Features"/>
                <meta name="keywords" content="News, Blogs and Features"/>
                <meta name="descriptions" content="Be informed and stay updated with the latest news and features from and about the Members Church of God International."/>
            </Head>
            <div className="contact-page blog-page">

                <div className="page-header pt-40 lg:pt-80 pb-28 ">
                    <div className="w-full">
                        <WOW animation='slideLeftToRight'>
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
                        </WOW>
                    </div>
                </div>
            <>
            
                <div className="lg:max-w-screen-xl w-11/12 mx-auto">
                    <WOW animation='fadeIn'>
                        <div className="blog-items py-16 lg:py-32">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                {posts?.length > 0 && posts.map((post) => {
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
                                                    <div className="flex gap-4">
                                                        <div className="date text-[#9f9f9f] font-medium">{date.toFormat('LLLL dd, yyyy')}</div>
                                                        {/* <div className="text-[#9f9f9f] font-medium">{`${post?.author?.first_name} ${post?.author?.last_name}`}</div> */}
                                                    </div>
                                                    <div className="title pt-1 pb-3">
                                                        <Link href={route('blogs.show', `${post.slug}`)} className='font-semibold border-b-2 border-black pb-1'>
                                                            <h4 className='text-[#0f0f0f] font-bold text-2xl capitalize'>
                                                                {post?.title}
                                                            </h4>
                                                        </Link>
                                                    </div>
                                                    <div class="description" dangerouslySetInnerHTML={{
                                                        __html: post?.content ? post.content
                                                            .replace(/<img.*?>/g, '') // Remove image tags
                                                            .replace(/<[^>]+>/g, '') // Remove all other HTML tags
                                                            .replace(/&nbsp;/g, ' ') // Replace &nbsp; with regular space
                                                            .split(' ')
                                                            .slice(0, 20)
                                                            .join(' ')
                                                        : ''
                                                    }} />

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
                            {false &&  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src='../images/loading-effect.gif' alt='Loading........' className='spinner text-center' />
                </div>}
                            <div className="flex justify-center mt-6">
                      
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className={`px-6 py-2 mt-10 text-white font-semibold rounded-md shadow-lg transition-all duration-300 focus:outline-none ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <svg
              role="status"
              className="inline w-6 h-6 text-white animate-spin"
              viewBox="0 0 100 101"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                fill="currentColor"
                d="M99.9 50.2c0-27.5-22.4-49.9-49.9-49.9-27.5 0-49.9 22.4-49.9 49.9 0 27.5 22.4 49.9 49.9 49.9 27.5 0 49.9-22.4 49.9-49.9ZM92.5 50.2c0 23.6-19.1 42.7-42.7 42.7-23.6 0-42.7-19.1-42.7-42.7 0-23.6 19.1-42.7 42.7-42.7 23.6 0 42.7 19.1 42.7 42.7Z"
              />
              <path
                fill="currentFill"
                d="M93.8 27.8c-.4 0-.8.1-1.1.2-.4.1-.8.3-1.2.5-.7.4-1.4.9-2 1.4-1.1.9-2.1 1.9-3.1 3.1-1.6 2.1-3.1 4.5-4.5 6.9-.1-.1-.2-.1-.3-.2-3.7-6.3-7.8-13-11.5-19.8-.1 0-.2 0-.3-.1-2.1 4.3-4.4 8.5-6.7 12.7-.1.2-.2.3-.3.5 1.3.2 2.6.6 3.8 1.1 1-.4 2-.8 2.9-1.3 2.5-1.6 4.8-3.3 7.2-5 1.6-.9 3.3-1.8 5-2.8z"
              />
            </svg>
          ) : (
            "Load More"
          )}
        </button>
      </div>
                        </div>
                    </WOW>
                    
                </div>
           
                </>
            </div>
        </Guest>
    )
}
