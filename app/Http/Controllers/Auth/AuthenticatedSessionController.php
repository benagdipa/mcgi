<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'email' => '',
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $credentials = $request->only('email', 'password');
        $user = \App\Models\User::where('email', $credentials['email'])->first();
    
        // Check if user exists and is a guest pending approval
        if ($user && in_array($user->roles->pluck('name')->first(), ['guest', 'Guest']) && !$user->admin_approved) {
            return redirect()->route('login')->withErrors([
                'email' => 'Your account is pending approval by an admin.',
            ]);
        }
        
        $request->authenticate();
        $request->session()->regenerate();
    
        // For event-specific redirects (from forms)
        if ($request->event) {
            return redirect()->intended('/events');
        }

        $user = Auth::user();
        $role = $user->roles->pluck('name')->first();
        
        // Guest users with approval go to homepage
        if (in_array($role, ['guest', 'Guest'])) {
            if (!$user->admin_approved) {
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                
                return redirect()->route('login')->withErrors([
                    'email' => 'Your account is pending approval by an admin.',
                ]);
            }
            
            // Get the intended URL from session
            $intended = session()->pull('url.intended', route('home'));
            
            // If the intended URL is a dashboard URL, redirect to home page instead
            if (str_contains($intended, '/dashboard')) {
                return redirect()->route('home');
            }
            
            // Otherwise redirect to the intended URL
            return redirect($intended);
        }
        
        // Members and admins go to dashboard or their intended URL
        return redirect()->intended(RouteServiceProvider::HOME);
    }
    
    
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
