<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function admin_user_index()
    {
        return Inertia::render('Users/UserAdmin');
    }
}
