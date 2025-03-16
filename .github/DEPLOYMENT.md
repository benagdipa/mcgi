# Deployment Workflows

This document explains the GitHub Actions workflows for deploying to Siteground and managing permissions.

## Deployment Workflow

The main deployment workflow (`deploy.yml`) is triggered automatically when changes are pushed to the `main` branch, or can be triggered manually from the GitHub Actions tab.

### What the Deployment Does

1. Checks out the code
2. Sets up PHP 8.2 with necessary extensions
3. Installs Composer dependencies
4. ~~Builds assets~~ (Skipped - assets must be built locally and committed)
5. Prepares files for deployment
6. Creates a backup of the current version on the server
7. Uploads new files to the server
8. Runs database migrations
9. Runs permission seeders to ensure all roles and permissions are up-to-date
10. Clears and rebuilds Laravel caches

### Required Secrets

For the deployment to work, the following secrets must be set in your GitHub repository:

- `SSH_HOST` - The Siteground SSH host
- `SSH_USERNAME` - Your Siteground SSH username
- `SSH_PASSWORD` - Your Siteground SSH password
- `SSH_PORT` - The SSH port (usually 18765 for Siteground)

### Important: Building Assets for Deployment

Since Siteground doesn't have Node.js/npm installed, you must build assets locally before pushing:

```bash
# Always build assets before pushing to main
npm run build

# Then commit the build files
git add public/build public/css public/js public/mix-manifest.json
git commit -m "Build assets for deployment"
git push
```

This ensures that the compiled JS, CSS, and other assets are included in the deployment.

## Reset Permissions Workflow

A separate workflow (`reset_permissions.yml`) is provided to reset and reassign permissions when needed. This workflow can only be triggered manually from the GitHub Actions tab.

### What the Reset Permissions Workflow Does

1. Creates a temporary PHP script on the server
2. Creates all permissions in the database if they don't exist
3. Assigns all permissions to the super-admin role
4. Assigns the super-admin role to the specified user (defaults to Benedick's email)
5. Also assigns all permissions directly to the user
6. Clears Laravel caches
7. Removes the temporary script

### How to Run the Reset Permissions Workflow

1. Go to the Actions tab in your GitHub repository
2. Select "Reset Permissions" from the workflows list
3. Click "Run workflow"
4. Optionally, enter an email address if you want to assign super-admin to a different user
5. Click "Run workflow" again to execute

### Additional Database Secrets

For the Reset Permissions workflow, you'll need these additional secrets:

- `DB_USERNAME` - The database username
- `DB_PASSWORD` - The database password
- `DB_DATABASE` - The database name

## Important Notes

- Both workflows preserve the existing `.env` file on the server
- The deployment workflow creates backups before making changes
- When deploying, the `RoleAndPermissionSeeder` and `SuperAdminSeeder` are both run to ensure permissions are up-to-date
- If you still have permission issues after deployment, use the Reset Permissions workflow 