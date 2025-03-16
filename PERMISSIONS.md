# MCGI Permissions System

This document explains the permissions system in the MCGI website and how to manage user roles.

## Available Permissions

The system includes the following permission categories:

### Blog Permissions
- `create blog` - Create new blog posts
- `edit blog` - Edit existing blog posts
- `delete blog` - Delete blog posts
- `view blog` - View all blog posts (including unpublished)

### Event Permissions
- `create event` - Create new events
- `edit event` - Edit existing events
- `delete event` - Delete events
- `view event` - View all events (including unpublished)

### Location Permissions
- `create location` - Create new locations
- `edit location` - Edit existing locations
- `delete location` - Delete locations
- `view location` - View all locations

### User Permissions
- `create user` - Create new users
- `edit user` - Edit existing users
- `delete user` - Delete users
- `view user` - View all users

### Role Permissions
- `create role` - Create new roles
- `edit role` - Edit existing roles
- `delete role` - Delete roles
- `view role` - View all roles

### Album Permissions
- `create album` - Create new albums
- `edit album` - Edit existing albums
- `delete album` - Delete albums
- `view album` - View all albums

### Banner Permissions
- `create banner` - Create new banners
- `edit banner` - Edit existing banners
- `delete banner` - Delete banners
- `view banner` - View all banners

### Email Template Permissions
- `create email-template` - Create new email templates
- `edit email-template` - Edit existing email templates
- `delete email-template` - Delete email templates
- `view email-template` - View all email templates

### Additional Permissions
- `access dashboard` - Access the admin dashboard
- `access admin` - Access the admin section
- `manage settings` - Manage site settings
- `manage services` - Manage services
- `manage service times` - Manage service times
- `manage prayer meetings` - Manage prayer meetings
- `manage thanksgiving services` - Manage thanksgiving services
- `manage worship services` - Manage worship services

## Roles

### Super Admin
The `super-admin` role has all permissions and full access to the system.

### Guest
The `guest` role is for basic site visitors with limited permissions.

## Managing Permissions

### Resetting Permissions
If you need to reset all permissions and ensure they are properly assigned, you can:

1. Run the artisan command directly:
   ```
   php artisan permissions:reset
   ```
   This will create all permissions, assign them to the super-admin role, and assign the super-admin role to Benedick Agdipa.

2. Use the provided PowerShell script:
   ```
   .\reset_permissions.ps1
   ```

### Assigning Super Admin to a Different User
To assign the super-admin role with all permissions to a different user:

```
php artisan permissions:reset user@example.com
```

Replace `user@example.com` with the email of the user you want to make a super admin.

## Access Control in Routes

The application uses middleware to control access to different routes:

- `auth` - Requires user to be logged in
- `role:super-admin` - Requires user to have the super-admin role
- `permission:access dashboard` - Requires user to have the specific permission

These can be seen in the `routes/web.php` file.

## Technical Implementation

The permission system uses the Spatie Laravel Permission package. Key files:

- `database/seeders/RoleAndPermissionSeeder.php` - Creates all permissions and roles
- `database/seeders/SuperAdminSeeder.php` - Sets up the super admin user
- `app/Console/Commands/ResetPermissions.php` - Command to reset permissions 