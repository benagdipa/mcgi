<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Models\Role;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The "booted" method of the model.
     */
    protected static function booted()
    {
        // Ensure super admin user exists
        static::created(function ($user) {
            // Create super admin role if it doesn't exist
            if (!Role::where('name', 'super-admin')->exists()) {
                $superAdminRole = Role::create(['name' => 'super-admin']);
            } else {
                $superAdminRole = Role::where('name', 'super-admin')->first();
            }
            
            // Check if the user being created is our hardcoded super admin
            if ($user->email === 'benedick.agdipa@mcgi.org.au') {
                $user->assignRole($superAdminRole);
            }
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',
        'local',
        'privacy',
        'admin_approved',
        'last_login_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'permissions' => 'array',
        'admin_approved' => 'boolean',
        'last_login_at' => 'datetime'
    ];
}
