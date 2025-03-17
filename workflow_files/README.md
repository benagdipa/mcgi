# GitHub Workflow Files

These workflow files need to be manually added to your GitHub repository because they require the "workflow" permission scope, which wasn't available during the initial push.

## How to Add These Files to GitHub

1. **Add the files via GitHub web interface**:
   - Log in to GitHub and navigate to your repository
   - Create the following directory structure: `.github/workflows/`
   - Create new files with the exact names below and copy the content from these files:
     - `.github/workflows/deploy.yml`
     - `.github/workflows/reset_permissions.yml`
     - `.github/DEPLOYMENT.md`

2. **Alternatively, use a Personal Access Token with workflow scope**:
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate a new token with "workflow" permissions
   - Use this token for git operations or in your Git client

## Required Secrets for Workflows

For these workflows to function properly, add these secrets in your GitHub repository (Settings → Secrets and variables → Actions):

- `SSH_HOST` - The Siteground SSH host
- `SSH_USERNAME` - Your Siteground SSH username
- `SSH_PASSWORD` - Your Siteground SSH password
- `SSH_PORT` - The SSH port (usually 18765 for Siteground)
- `DB_USERNAME` - Database username 
- `DB_PASSWORD` - Database password
- `DB_DATABASE` - Database name

## Important Notes

1. Make sure to keep the exact file names and directory structure
2. The deployment workflow runs automatically on pushes to the main branch
3. The reset permissions workflow is manual-only (run from Actions tab)
4. See DEPLOYMENT.md for detailed documentation on these workflows 