<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Spatie\Permission\Models\Role;

class UserRedirectTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        // Create roles
        Role::create(['name' => 'super-admin']);
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'member']);
        Role::create(['name' => 'guest']);
    }

    /**
     * Test that super-admin users are redirected to admin dashboard.
     *
     * @return void
     */
    public function test_super_admin_redirected_to_admin_dashboard(): void
    {
        // Create a super-admin user
        $superAdmin = User::factory()->create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'superadmin@example.com',
            'admin_approved' => true,
        ]);
        $superAdmin->assignRole('super-admin');

        // Attempt login
        $response = $this->post('/login', [
            'email' => 'superadmin@example.com',
            'password' => 'password', // Default from factory
        ]);

        // Assert redirect to admin dashboard
        $response->assertRedirect(route('admin.dashboard'));
    }

    /**
     * Test that admin users are redirected to user dashboard.
     *
     * @return void
     */
    public function test_admin_redirected_to_dashboard(): void
    {
        // Create an admin user
        $admin = User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'admin_approved' => true,
        ]);
        $admin->assignRole('admin');

        // Attempt login
        $response = $this->post('/login', [
            'email' => 'admin@example.com',
            'password' => 'password', // Default from factory
        ]);

        // Assert redirect to user dashboard
        $response->assertRedirect(route('dashboard'));
    }

    /**
     * Test that member users are redirected to user dashboard.
     *
     * @return void
     */
    public function test_member_redirected_to_dashboard(): void
    {
        // Create a member user
        $member = User::factory()->create([
            'first_name' => 'Member',
            'last_name' => 'User',
            'email' => 'member@example.com',
            'admin_approved' => true,
        ]);
        $member->assignRole('member');

        // Attempt login
        $response = $this->post('/login', [
            'email' => 'member@example.com',
            'password' => 'password', // Default from factory
        ]);

        // Assert redirect to user dashboard
        $response->assertRedirect(route('dashboard'));
    }

    /**
     * Test that guest users are redirected to home page.
     *
     * @return void
     */
    public function test_guest_redirected_to_home(): void
    {
        // Create a guest user
        $guest = User::factory()->create([
            'first_name' => 'Guest',
            'last_name' => 'User',
            'email' => 'guest@example.com',
            'admin_approved' => true,
        ]);
        $guest->assignRole('guest');

        // Attempt login
        $response = $this->post('/login', [
            'email' => 'guest@example.com',
            'password' => 'password', // Default from factory
        ]);

        // Assert redirect to home
        $response->assertRedirect(route('home'));
    }

    /**
     * Test that unapproved guest users cannot login.
     *
     * @return void
     */
    public function test_unapproved_guest_cannot_login(): void
    {
        // Create an unapproved guest user
        $unapprovedGuest = User::factory()->create([
            'first_name' => 'Unapproved',
            'last_name' => 'Guest',
            'email' => 'unapproved@example.com',
            'admin_approved' => false,
        ]);
        $unapprovedGuest->assignRole('guest');

        // Attempt login
        $response = $this->post('/login', [
            'email' => 'unapproved@example.com',
            'password' => 'password', // Default from factory
        ]);

        // Assert redirect back to login with errors
        $response->assertRedirect(route('login'));
        $response->assertSessionHasErrors('email');
    }

    /**
     * Test that users with no role are assigned guest role by default.
     *
     * @return void
     */
    public function test_user_with_no_role_gets_guest_role(): void
    {
        $user = User::factory()->create([
            'first_name' => 'No',
            'last_name' => 'Role',
            'email' => 'norole@example.com',
            'admin_approved' => true,
        ]);
        
        // No role assigned
        
        $response = $this->post('/login', [
            'email' => 'norole@example.com',
            'password' => 'password',
        ]);
        
        // User with no role should be redirected to home
        $response->assertRedirect(route('home'));
    }
}
