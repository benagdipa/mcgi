<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Inertia\Inertia;
use App\Models\Posts;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogsController extends Controller
{
    public function index()
    { 
        $posts = Posts::with('author')->get();
        return Inertia::render('Blogs/BlogsPage', [
            'posts' => $posts,
        ]);
    }

    public function show($slug)
    {
        $post = Posts::where('slug', $slug)->firstOrFail();
        $categories = Category::all();
        $tags = Tag::all();
        return Inertia::render('Blogs/SingleBlogPage', [
            'post' => $post,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    public function admin_blogs_index()
    {
        $posts = Posts::all();
        $categories = Category::all();
        $tags = Tag::all();
        return Inertia::render('Blogs/Admin/BlogsAdminPage', [
            'posts' => $posts,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    public function admin_blogs_add()
    {
        $categories = Category::all();
        $tags = Tag::all();
        return Inertia::render('Blogs/Admin/BlogsAddAdminPage', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    public function admin_blogs_store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:' . Posts::class,
            'status' => 'required',
            'featureImage' => 'required|mimes:png,jpg,jpeg'
        ]);
        $file_path = '';
        if ($request->hasFile('featureImage')) {
            $name = now()->timestamp . "_{$request->file('featureImage')->getClientOriginalName()}";
            $path = $request->file('featureImage')->storeAs('post_images', $name, 'public');
            $file_path = "/storage/{$path}";
        }
        $post = Posts::create([
            'title' => $request->input('title'),
            'slug' => $request->input('slug'),
            'featured_image' => $file_path,
            'content' => $request->input('content'),
            'categories' => $request->input('categories') ? implode(',', $request->input('categories')) : '',
            'tags' => $request->input('tags') ? implode(',', $request->input('tags')) : '',
            'author' => Auth::id(),
            'status' => $request->input('status'),
        ]);
        if ($post) {
            return to_route('admin.blogs.index');
        }
    }

    public function admin_blogs_edit($id)
    {
        $post = Posts::findOrFail($id);
        $categories = Category::all();
        $tags = Tag::all();
        return Inertia::render('Blogs/Admin/BlogsEditAdminPage', [
            'item' => $post,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    public function admin_blogs_update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|',
            'status' => 'required',
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

        $post = Posts::findOrFail($id);
        if ($post) {
            $post->title = $request->input('title');
            $post->slug = $request->input('slug');
            $post->content = $request->input('content');
            $post->categories = $request->input('categories') ? implode(',', $request->input('categories')) : '';
            $post->tags = $request->input('tags') ? implode(',', $request->input('tags')) : '';
            $post->status = $request->input('status');
            if ($request->hasFile('featureImage')) {
                $post->featured_image = $file_path;
            }
            $post->save();
        }
        return to_route('admin.blogs.index');
    }

    public function admin_blogs_delete($id)
    {
        $post = Posts::findOrFail($id);
        $post->delete();
        return to_route('admin.blogs.index');
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

}
