<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogsController extends Controller
{
    public function index()
    {
        return Inertia::render('Blogs/BlogsPage');
    }

    public function show($slug)
    {
        $response = file_get_contents('https://jsonplaceholder.org/posts/1');
        $post = json_decode($response);
        ;
        return Inertia::render('Blogs/SingleBlogPage', [
            'post' => $post
        ]);
    }

    public function admin_blogs_index()
    {
        return Inertia::render('Blogs/Admin/BlogsAdminPage');
    }

    public function admin_blogs_add()
    {
        return Inertia::render('Blogs/Admin/BlogsAddAdminPage');
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
