# Quick Setup Script for Git and GitHub

# This script will help you initialize the repository and push to GitHub
# Run these commands one by one in PowerShell

# 1. Initialize Git repository
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: Al-Wael website with GitHub Pages deployment"

# 4. Rename branch to main (if needed)
git branch -M main

# 5. Add remote origin (replace YOUR_USERNAME with your GitHub username)
# For user 24nse:
git remote add origin https://github.com/24nse/alwael_website.git

# OR if using a different username:
# git remote add origin https://github.com/YOUR_USERNAME/alwael_website.git

# 6. Push to GitHub
git push -u origin main

# After pushing, go to GitHub repository settings and:
# 1. Navigate to Settings > Pages
# 2. Under "Build and deployment", select "GitHub Actions" as the source
# 3. The workflow will automatically deploy your site

# Your site will be available at:
# https://24nse.github.io/alwael_website/
# OR
# https://YOUR_USERNAME.github.io/alwael_website/
