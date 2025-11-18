# Deployment Guide

This site is configured to automatically deploy to GitHub Pages whenever changes are pushed to the `main` branch.

## Automatic Deployment

The site uses GitHub Actions to automatically build and deploy on every push to `main`. The workflow:

1. Checks out the code
2. Installs dependencies
3. Builds the React app
4. Deploys to GitHub Pages

**No manual deployment needed!** Just merge your changes to `main` and the site will automatically update.

## GitHub Pages Settings

Make sure your repository settings are configured:

1. Go to: Settings → Pages
2. **Source**: GitHub Actions (not "Deploy from a branch")
3. **Custom domain**: tylercartwright.co.uk
4. **Enforce HTTPS**: Enabled

## CNAME Configuration

The `public/CNAME` file contains your custom domain (tylercartwright.co.uk). This file is automatically included in deployments and should not be removed.

## Manual Deployment (Optional)

If you need to manually deploy (e.g., for testing):

```bash
npm run deploy
```

This uses `gh-pages` package to deploy the build folder to the `gh-pages` branch.

## Workflow File

The deployment workflow is defined in `.github/workflows/deploy.yml`. It:

- Triggers on push to `main` branch
- Can be manually triggered from the Actions tab
- Uses Node.js 18
- Builds with `CI=false` to prevent warnings from failing the build

## Troubleshooting

### 500 Internal Server Error

If you see a 500 error:

1. Check the Actions tab to see if the deployment succeeded
2. Verify GitHub Pages settings (Settings → Pages)
3. Make sure "Source" is set to "GitHub Actions" (not gh-pages branch)
4. Wait a few minutes for DNS propagation after deployment

### Build Failures

Check the Actions tab for detailed error logs. Common issues:

- Missing dependencies: Run `npm ci` locally first
- Build errors: Run `npm run build` locally to test
- Node version mismatch: Workflow uses Node 18

### Custom Domain Not Working

1. Verify `public/CNAME` contains: `tylercartwright.co.uk`
2. Check DNS settings point to GitHub Pages
3. Wait for DNS propagation (can take up to 24 hours)
4. Re-verify custom domain in Settings → Pages

## Development Workflow

1. Create a feature branch (e.g., `claude/redesign-portfolio-2025-*`)
2. Make your changes
3. Test locally with `npm start`
4. Build and test with `npm run build`
5. Commit and push to your branch
6. Create a pull request to `main`
7. Merge to `main` → Automatic deployment!

## First Time Setup

If switching from gh-pages branch deployment to GitHub Actions:

1. Push this code to `main` branch
2. Go to Settings → Pages
3. Change Source from "Deploy from a branch" to "GitHub Actions"
4. The next push to `main` will automatically trigger deployment

That's it! Your site will now auto-deploy on every push to main.
