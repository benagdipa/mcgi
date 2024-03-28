<?php

namespace App\Http\Controllers;

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
        return Inertia::render('Blogs/Admin/Categories/CategoryAdminPage');
    }

    public function admin_tags_index()
    {
        return Inertia::render('Blogs/Admin/Tags/TagsAdminPage');
    }
}
