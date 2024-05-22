<?php

namespace App\Http\Controllers;

use App\Models\User;

use Inertia\Inertia;
use App\Models\Locale;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class UserController extends Controller
{
    public function admin_user_index()
    {
        $locale = Locale::all();
        $users = User::with('roles')->get();
        $roles = Role::where('name', '!=', 'super-admin')->get();
        return Inertia::render('Users/UserAdmin', [
            'users_list' => $users,
            'locale' => $locale,
            'roles' => $roles
        ]);
    }

    public function admin_user_store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|numeric|min:10',
            'local' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed'],
        ]);
        $user = new User();
        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->email = $request->input('email');
        $user->phone = $request->input('phone');
        $user->password = Hash::make($request->password);
        $user->local = $request->input('local');
        $user->privacy = 1;
        $user->save();

        if ($request->input('role')) {
            $user->roles()->detach();
            $newRole = Role::where('name', $request->input('role'))->first();
            if ($newRole) {
                $user->assignRole($newRole);
            }
        }
        event(new Registered($user));

        return to_route('admin.users.index');
    }

    public function admin_user_delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return to_route('admin.users.index');
    }

    public function admin_user_update(Request $request, $id)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|numeric|min:10',
            'local' => 'required|string|max:255',
        ]);
        if ($request->input('password')) {
            $request->validate([
                'password' => ['required', 'confirmed'],
            ]);
        }
        $user = User::findOrFail($id);
        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->phone = $request->input('phone');
        $user->local = $request->input('local');
        if ($request->input('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->update();
        if ($request->input('role')) {
            $user->roles()->detach();
            $newRole = Role::where('name', $request->input('role'))->first();
            if ($newRole) {
                $user->assignRole($newRole);
            }
        }
        return to_route('admin.users.index');
    }

    public function admin_user_search(Request $request)
    {
        $users = User::query()->where(function ($query) use ($request) {
            $query->when(!empty ($request->search_query), function ($q) use ($request) {
                $q->where('email', 'like', "%$request->search_query%")
                    ->orWhere('first_name', 'like', "%$request->search_query%")
                    ->orWhere('last_name', 'like', "%$request->search_query%")
                    ->orWhere('phone', 'like', "%$request->search_query%");
            });
            $query->when(!empty ($request->search_locale), function ($q) use ($request) {
                $q->where('local', $request->search_locale);
            });
            $query->when(!empty ($request->search_role), function ($q) use ($request) {
                $q->whereHas('roles', function ($roleQuery) use ($request) {
                    $roleQuery->where('name', $request->search_role);
                });
            });
        })->get();
        return $users;
    }
}
