<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        return Inertia::render('Blogs/BlogsPage');
    }
    
    public function getAllPosts()
    {
        $posts = Post::with(['author:id,name'])
            ->select('id', 'title', 'created_at', 'slug', 'featured_image', 'content', 'categories', 'tags', 'excerpt', 'views', 'is_featured', 'published_at', 'author')
            ->published()
            ->orderBy('published_at', 'desc')
            ->paginate(12);
            
        // Load categories and tags
        $posts->getCollection()->transform(function ($post) {
            $post->category = $post->category();
            return $post;
        });
        
        // Get featured posts
        $featuredPosts = Post::with(['author:id,name'])
            ->select('id', 'title', 'created_at', 'slug', 'featured_image', 'content', 'categories', 'tags', 'excerpt', 'author')
            ->published()
            ->featured()
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();
            
        // Load categories and tags for featured posts
        $featuredPosts->transform(function ($post) {
            $post->category = $post->category();
            return $post;
        });
        
        // Get categories and tags for filtering
        $categories = Category::where('status', 'active')->get();
        $tags = Tag::where('status', 'active')->get();
            
        return response()->json([
            'posts' => $posts->items(),
            'featured_posts' => $featuredPosts,
            'categories' => $categories,
            'tags' => $tags,
            'next_page_url' => $posts->nextPageUrl(),
        ]);
    }

    public function show($slug)
    {
        $post = Post::with('author')->where('slug', $slug)->firstOrFail();
        
        // Increment view count
        $post->incrementViews();
        
        // Get related posts based on categories
        $categoryIds = $post->categories ? explode(',', $post->categories) : [];
        
        $relatedPosts = Post::published()
            ->where('id', '!=', $post->id)
            ->when(!empty($categoryIds), function ($query) use ($categoryIds) {
                foreach ($categoryIds as $categoryId) {
                    $query->orWhere('categories', 'like', "%$categoryId%");
                }
                return $query;
            })
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();
            
        $categories = Category::all();
        $tags = Tag::all();
        
        return Inertia::render('Blogs/SingleBlogPage', [
            'post' => $post,
            'categories' => $categories,
            'tags' => $tags,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    public function admin_blogs_index()
    {
        $posts = Post::with('author')
            ->withTrashed()
            ->orderBy('created_at', 'desc')
            ->get();
            
        $categories = Category::all();
        $tags = Tag::all();
        
        $stats = [
            'total' => Post::count(),
            'published' => Post::published()->count(),
            'drafts' => Post::drafts()->count(),
            'scheduled' => Post::scheduled()->count(),
            'trashed' => Post::onlyTrashed()->count(),
        ];
        
        return Inertia::render('Blogs/Admin/BlogsAdminPage', [
            'posts' => $posts,
            'categories' => $categories,
            'tags' => $tags,
            'stats' => $stats,
        ]);
    }

    public function admin_blogs_add()
    {
        $categories = Category::all();
        $tags = Tag::all();
        return Inertia::render('Blogs/Admin/BlogQuillEditor', [
            'categories' => $categories,
            'tags' => $tags,
            'csrf_token' => csrf_token(),
        ]);
    }

    public function admin_blogs_store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:' . Post::class,
            'status' => 'required|in:draft,published,scheduled',
            'featureImage' => 'required|mimes:png,jpg,jpeg',
            'excerpt' => 'nullable|string|max:500',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
            'is_featured' => 'nullable|boolean',
            'allow_comments' => 'nullable|boolean',
            'published_at' => 'nullable|date',
        ]);
        
        $file_path = '';
        if ($request->hasFile('featureImage')) {
            $name = now()->timestamp . "_{$request->file('featureImage')->getClientOriginalName()}";
            $path = $request->file('featureImage')->storeAs('post_images', $name, 'public');
            $file_path = "/storage/{$path}";
        }
        
        // Generate excerpt if not provided
        $excerpt = $request->input('excerpt');
        if (empty($excerpt) && !empty($request->input('content'))) {
            $excerpt = Str::limit(strip_tags($request->input('content')), 250);
        }
        
        // Set published_at date based on status
        $published_at = null;
        if ($request->input('status') === 'published') {
            $published_at = now();
        } elseif ($request->input('status') === 'scheduled') {
            $published_at = $request->input('published_at');
        }
        
        $post = Post::create([
            'title' => $request->input('title'),
            'slug' => $request->input('slug'),
            'featured_image' => $file_path,
            'content' => $request->input('content'),
            'excerpt' => $excerpt,
            'meta_title' => $request->input('meta_title') ?? $request->input('title'),
            'meta_description' => $request->input('meta_description') ?? $excerpt,
            'seo_keywords' => $request->input('seo_keywords'),
            'categories' => $request->input('categories') ? implode(',', $request->input('categories')) : '',
            'tags' => $request->input('tags') ? implode(',', $request->input('tags')) : '',
            'author' => Auth::id(),
            'status' => $request->input('status'),
            'published_at' => $published_at,
            'is_featured' => $request->input('is_featured') ?? false,
            'allow_comments' => $request->input('allow_comments') ?? true,
        ]);
        
        if ($post) {
            return to_route('admin.blogs.index')->with('success', 'Blog post created successfully.');
        }
        
        return back()->with('error', 'Failed to create blog post.');
    }

    public function admin_blogs_edit($id)
    {
        $post = Post::withTrashed()->findOrFail($id);
        $categories = Category::all();
        $tags = Tag::all();
        return Inertia::render('Blogs/Admin/BlogQuillEditorEdit', [
            'item' => $post,
            'categories' => $categories,
            'tags' => $tags,
            'csrf_token' => csrf_token(),
        ]);
    }

    public function admin_blogs_update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:posts,slug,' . $id,
            'status' => 'required|in:draft,published,scheduled',
            'excerpt' => 'nullable|string|max:500',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:255',
            'is_featured' => 'nullable|boolean',
            'allow_comments' => 'nullable|boolean',
            'published_at' => 'nullable|date',
        ]);

        $file_path = '';
        if ($request->hasFile('featureImage')) {
            if ($request->file('featureImage') !== null) {
                $request->validate([
                    'featureImage' => 'required|mimes:png,jpg,jpeg'
                ]);

                $name = now()->timestamp . "_{$request->file('featureImage')->getClientOriginalName()}";
                $path = $request->file('featureImage')->storeAs('post_images', $name, 'public');
                $file_path = "/storage/{$path}";
            }
        }

        $post = Post::withTrashed()->findOrFail($id);
        
        // Generate excerpt if not provided
        $excerpt = $request->input('excerpt');
        if (empty($excerpt) && !empty($request->input('content'))) {
            $excerpt = Str::limit(strip_tags($request->input('content')), 250);
        }
        
        // Set published_at date based on status
        $published_at = $post->published_at;
        if ($request->input('status') === 'published' && !$published_at) {
            $published_at = now();
        } elseif ($request->input('status') === 'scheduled') {
            $published_at = $request->input('published_at');
        }
        
        if ($post) {
            $post->title = $request->input('title');
            $post->slug = $request->input('slug');
            $post->content = $request->input('content');
            $post->excerpt = $excerpt;
            $post->meta_title = $request->input('meta_title') ?? $request->input('title');
            $post->meta_description = $request->input('meta_description') ?? $excerpt;
            $post->seo_keywords = $request->input('seo_keywords');
            $post->categories = $request->input('categories') ? implode(',', $request->input('categories')) : '';
            $post->tags = $request->input('tags') ? implode(',', $request->input('tags')) : '';
            $post->status = $request->input('status');
            $post->published_at = $published_at;
            $post->is_featured = $request->input('is_featured') ?? false;
            $post->allow_comments = $request->input('allow_comments') ?? true;
            
            if ($request->hasFile('featureImage')) {
                // Delete old image if exists
                if ($post->featured_image) {
                    $oldPath = str_replace('/storage/', '', $post->featured_image);
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }
                $post->featured_image = $file_path;
            }
            
            $post->save();
            
            return to_route('admin.blogs.index')->with('success', 'Blog post updated successfully.');
        }
        
        return back()->with('error', 'Failed to update blog post.');
    }

    public function admin_blogs_delete($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return to_route('admin.blogs.index')->with('success', 'Blog post moved to trash.');
    }
    
    public function admin_blogs_restore($id)
    {
        $post = Post::onlyTrashed()->findOrFail($id);
        $post->restore();
        return to_route('admin.blogs.index')->with('success', 'Blog post restored successfully.');
    }
    
    public function admin_blogs_force_delete($id)
    {
        $post = Post::withTrashed()->findOrFail($id);
        
        // Delete featured image if exists
        if ($post->featured_image) {
            $path = str_replace('/storage/', '', $post->featured_image);
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }
        
        $post->forceDelete();
        return to_route('admin.blogs.index')->with('success', 'Blog post permanently deleted.');
    }

    public function admin_categories_index()
    {
        $categories = Category::all();
        return Inertia::render('Blogs/Admin/Categories/CategoryAdminPage', [
            'categories' => $categories
        ]);
    }

    public function admin_categories_store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|unique:' . Category::class,
            'status' => 'required',
        ]);

        $category = Category::create([
            'title' => $request->input('title'),
            'slug' => $request->input('slug'),
            'description' => $request->input('description'),
            'status' => $request->input('status'),
        ]);
        if ($category) {
            return to_route('admin.blogs.categories.index');
        }
    }

    public function admin_categories_update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required',
            'status' => 'required',
        ]);

        $category = Category::findOrFail($id);
        if ($category) {
            $category->title = $request->input('title');
            $category->slug = $request->input('slug');
            $category->description = $request->input('description');
            $category->status = $request->input('status');
            $category->save();
        }
        return to_route('admin.blogs.categories.index');
    }

    public function admin_categories_delete($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return to_route('admin.blogs.categories.index');
    }

    public function admin_tags_index()
    {
        $tags = Tag::all();
        return Inertia::render('Blogs/Admin/Tags/TagsAdminPage', [
            'tags' => $tags
        ]);
    }

    public function admin_tags_store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|unique:' . Tag::class,
            'status' => 'required',
        ]);
        $tags = Tag::create([
            'title' => $request->input('title'),
            'slug' => $request->input('slug'),
            'status' => $request->input('status'),
        ]);
        if ($tags) {
            return to_route('admin.blogs.tags.index');
        }
    }

    public function admin_tags_update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required',
            'status' => 'required',
        ]);
        $tag = Tag::findOrFail($id);

        if ($tag) {
            $tag->title = $request->input('title');
            $tag->slug = $request->input('slug');
            $tag->status = $request->input('status');
            $tag->save();
        }
        return to_route('admin.blogs.tags.index');
    }

    public function admin_tags_delete($id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();
        return to_route('admin.blogs.tags.index');
    }

    public function admin_blogs_tempImg(Request $request){
        
        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);
           
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads/temp', $fileName, 'public');

       
            return response()->json([
                'success' => 1,
                'file' => [
                    'url' =>  asset('storage/' . $filePath),
                ],
                'caption' =>  $file->getClientOriginalName(),
                'withBorder' => false,
                'withBackground' => false,
                'stretched' => true,
            ]);
            
        }

        return response()->json(['success' => 0, 'message' => 'No file uploaded.'], 400);
    }
    public function fetchUrl(Request $request)
    {
        $url = $request->input('url');

        if (filter_var($url, FILTER_VALIDATE_URL)) {
            // Validate URL is from a trusted domain or has an image extension
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            $urlPath = parse_url($url, PHP_URL_PATH);
            $extension = strtolower(pathinfo($urlPath, PATHINFO_EXTENSION));
            
            if (!in_array($extension, $allowedExtensions)) {
                return response()->json(['success' => 0, 'message' => 'URL must point to an image file.'], 400);
            }
            
            try {
                // Use a timeout to prevent hanging on slow connections
                $context = stream_context_create([
                    'http' => [
                        'timeout' => 5
                    ]
                ]);
                
                $imageContents = file_get_contents($url, false, $context);
                
                if ($imageContents === false) {
                    return response()->json(['success' => 0, 'message' => 'Failed to fetch image.'], 400);
                }
                
                // Verify the file is actually an image
                $finfo = new \finfo(FILEINFO_MIME_TYPE);
                $mimeType = $finfo->buffer($imageContents);
                
                if (strpos($mimeType, 'image/') !== 0) {
                    return response()->json(['success' => 0, 'message' => 'URL does not point to a valid image.'], 400);
                }
                
                $fileName = time() . '_' . basename($url);
                $filePath = 'uploads/temp/' . $fileName;

                file_put_contents(public_path('storage/' . $filePath), $imageContents);

                return response()->json([
                    'success' => 1,
                    'file' => [
                        'url' =>  asset('storage/' . $filePath),
                    ],
                    'caption' => basename($url),
                    'withBorder' => false,
                    'withBackground' => false,
                    'stretched' => true,
                ]);
            } catch (\Exception $e) {
                return response()->json(['success' => 0, 'message' => 'Error processing image: ' . $e->getMessage()], 400);
            }
        }

        return response()->json(['success' => 0, 'message' => 'Invalid URL.'], 400);
    }

}
