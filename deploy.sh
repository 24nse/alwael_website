#!/bin/bash

# Auto-Deploy Script for GitHub Pages
# This script will trigger automatic deployment

echo "🚀 Starting Auto-Deploy Process..."
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Error: Not a git repository"
    exit 1
fi

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Found uncommitted changes. Committing..."
    git add .
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    git commit -m "Auto-deploy: $timestamp"
    echo "✅ Changes committed"
else
    echo "✅ No uncommitted changes"
fi

# Push to trigger deployment
echo ""
echo "📤 Pushing to GitHub to trigger deployment..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎯 Deployment Status:"
    echo "   - GitHub Actions will automatically build and deploy"
    echo "   - Check progress at: https://github.com/24nse/alwael_website/actions"
    echo "   - Site will be live at: https://24nse.github.io/alwael_website/"
    echo ""
    echo "⏱️  Deployment usually takes 2-3 minutes"
    echo ""
    echo "💡 To check deployment status, run:"
    echo "   gh run list --limit 1"
else
    echo "❌ Failed to push to GitHub"
    echo "   Please check your internet connection and GitHub credentials"
    exit 1
fi
