<?php

namespace App\Http\Controllers;

use App\Models\Locale;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function admin_user_index()
    {
        $locale = Locale::all();
        $users = User::with('roles.permissions')->get();
        return Inertia::render('Users/UserAdmin', [
            'users' => $users,
            'locale' => $locale
        ]);
    }

    public function admin_user_delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return to_route('admin.users.index');
    }
}
