# Permission System Changes Summary

This document summarizes the changes made to the MCGI website permission system.

## Issues Addressed

1. **Missing permissions**: The application lacked many required permissions in the database
2. **Super-admin role access**: Administrators were unable to access the dashboard and admin sections
3. **Deployment challenges**: The deployment process needed to properly handle permissions

## Changes Made

### 1. Permission Definitions

Added 40 different permissions across multiple categories:
- Blog management (create, edit, delete, view)
- Event management (create, edit, delete, view)
- Location management (create, edit, delete, view)
- User management (create, edit, delete, view)
- Role management (create, edit, delete, view)
- Album management (create, edit, delete, view)
- Banner management (create, edit, delete, view)
- Email template management (create, edit, delete, view)
- Dashboard and Admin access permissions
- Service management permissions (prayer meetings, thanksgiving services, worship services)

### 2. Database Seeders

Updated the following seeders:
- `RoleAndPermissionSeeder.php`: Now creates all permissions and assigns them to the super-admin role
- `SuperAdminSeeder.php`: Updated to ensure Benedick's account has both the super-admin role and direct permissions

### 3. New Artisan Command

Created `app/Console/Commands/ResetPermissions.php` command that can:
- Create all missing permissions
- Assign them to the super-admin role
- Assign the super-admin role to a specific user (defaults to Benedick)
- Assign all permissions directly to the user as well

### 4. PowerShell Script

Added `reset_permissions.ps1` script to easily run the reset permissions command locally.

### 5. Deployment Configuration

Updated GitHub Actions workflows:
- `deploy.yml`: Includes steps to run the permission seeders during deployment
- `reset_permissions.yml`: New workflow to reset permissions directly on Siteground when needed

### 6. Documentation

Added detailed documentation:
- `PERMISSIONS.md`: Complete documentation of the permission system
- `DEPLOYMENT.md`: Information about deployment workflows and permission handling
- `workflow_files/README.md`: Instructions for adding workflow files to GitHub

## How to Use These Changes

### For Local Development

1. **Reset permissions locally**:
   ```powershell
   .\reset_permissions.ps1
   ```

2. **Assign super-admin to a specific user**:
   ```powershell
   php artisan permissions:reset user@example.com
   ```

### For Production

1. **During deployment**: Permissions are automatically reset through the deploy.yml workflow

2. **Manual reset**: Use the Reset Permissions workflow in GitHub Actions when needed

## Next Steps

1. Add the workflow files to GitHub manually (see workflow_files/README.md)
2. Set up the required secrets in GitHub repository settings
3. Ensure new permissions are added to the seeder when adding new features 