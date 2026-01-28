# GitHub Pages Deployment Guide

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. The project built and tested locally

## Step-by-Step Deployment Instructions

### 1. Initialize Git Repository (if not already done)

```bash
cd c:\Users\TYC\Desktop\alwael_website
git init
git add .
git commit -m "Initial commit: Al-Wael website"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it: `alwael_website`
5. **Important**: Do NOT initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 3. Connect Local Repository to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/alwael_website.git
git branch -M main
git push -u origin main
```

If you're using the account `24nse`, use:

```bash
git remote add origin https://github.com/24nse/alwael_website.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. Click "Save"

### 5. Verify Deployment

1. Go to the "Actions" tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Once complete, your site will be live at:
   - `https://YOUR_USERNAME.github.io/alwael_website/`
   - For user `24nse`: `https://24nse.github.io/alwael_website/`

## Automatic Deployments

After the initial setup, every time you push to the `main` branch, the site will automatically rebuild and redeploy:

```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push
```

## Troubleshooting

### Build Fails

1. Check the Actions tab for error messages
2. Ensure all dependencies are in `package.json`
3. Test the build locally: `npm run build`

### 404 Errors

1. Verify the `base` path in `vite.config.ts` matches your repository name
2. Check that the `basename` in `src/App.tsx` matches
3. Ensure GitHub Pages is enabled in repository settings

### Blank Page

1. Check browser console for errors
2. Verify all asset paths are relative
3. Clear browser cache and hard reload (Ctrl+Shift+R)

## Custom Domain (Optional)

To use a custom domain:

1. Go to repository Settings > Pages
2. Enter your custom domain under "Custom domain"
3. Add a CNAME record in your domain's DNS settings pointing to:
   - `YOUR_USERNAME.github.io`
4. Wait for DNS propagation (can take up to 24 hours)

## Environment Variables

If your app needs environment variables:

1. Go to repository Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Add your secrets
4. Reference them in the workflow file with `${{ secrets.SECRET_NAME }}`

## Monitoring

- **Build Status**: Check the Actions tab
- **Site Status**: Visit your live URL
- **Analytics**: Consider adding Google Analytics or similar

## Support

For issues:
1. Check GitHub Actions logs
2. Review [GitHub Pages documentation](https://docs.github.com/en/pages)
3. Check [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
