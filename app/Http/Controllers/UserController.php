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
        $users = User::with('roles')->whereDoesntHave('roles', function ($query) {
            $query->where('role_id', 1);
        })->get();
        $roles = Role::where('name', '!=', 'super-admin')->get();
        return Inertia::render('Users/UserAdmin', [
            'users_list' => $users,
            'locale' => $locale,
            'roles' => $roles
        ]);
    }

    public function admin_user_store(Request $request)
    {
        try {
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'phone' => 'required|string|min:10',
                'local' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
                'password' => ['required', 'min:8', 'confirmed'],
            ]);
            
            $user = new User();
            $user->first_name = $request->input('first_name');
            $user->last_name = $request->input('last_name');
            $user->email = $request->input('email');
            $user->phone = $request->input('phone');
            $user->password = Hash::make($request->password);
            $user->local = $request->input('local');
            $user->privacy = 1;
            $user->admin_approved = 1; // Auto-approve users created by admin
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
            
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to create user: ' . $e->getMessage()]);
        }
    }

    public function admin_user_delete($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return to_route('admin.users.index');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to delete user: ' . $e->getMessage()]);
        }
    }

    public function admin_user_update(Request $request, $id)
    {
        try {
            $validationRules = [
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'phone' => 'required|string|min:10',
                'local' => 'required|string|max:255',
            ];
            
            if ($request->filled('password')) {
                $validationRules['password'] = ['required', 'min:8', 'confirmed'];
            }
            
            $request->validate($validationRules);
            
            $user = User::findOrFail($id);
            $user->first_name = $request->input('first_name');
            $user->last_name = $request->input('last_name');
            $user->phone = $request->input('phone');
            $user->local = $request->input('local');
            
            if ($request->filled('password')) {
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
            
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to update user: ' . $e->getMessage()]);
        }
    }

    public function admin_user_search(Request $request)
    {
        try {
            $users = User::query()->where(function ($query) use ($request) {
                $query->when(!empty($request->search_query), function ($q) use ($request) {
                    $q->where('email', 'like', "%$request->search_query%")
                        ->orWhere('first_name', 'like', "%$request->search_query%")
                        ->orWhere('last_name', 'like', "%$request->search_query%")
                        ->orWhere('phone', 'like', "%$request->search_query%");
                });
                $query->when(!empty($request->search_locale), function ($q) use ($request) {
                    $q->where('local', $request->search_locale);
                });
                $query->when(!empty($request->search_role), function ($q) use ($request) {
                    $q->whereHas('roles', function ($roleQuery) use ($request) {
                        $roleQuery->where('name', $request->search_role);
                    });
                });
            })->whereDoesntHave('roles', function ($query) {
                $query->where('role_id', 1);
            })->with('roles')->get();
            
            return response()->json($users);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to search users: ' . $e->getMessage()], 500);
        }
    }

    public function admin_user_approval(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|exists:users,id',
            ]);
            
            $user = User::findOrFail($request->id);
            $user->admin_approved = true;
            $user->save();
            
            $users = User::with('roles')->whereDoesntHave('roles', function ($query) {
                $query->where('role_id', 1);
            })->get();
            
            return response()->json([
                'status' => 'success',
                'users' => $users,
                'message' => 'User has been approved successfully',
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to approve user: ' . $e->getMessage()
            ], 500);
        }
    }
}
