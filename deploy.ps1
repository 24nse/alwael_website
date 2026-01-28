# Auto-Deploy Script for GitHub Pages
# This script will trigger automatic deployment

Write-Host "🚀 Starting Auto-Deploy Process..." -ForegroundColor Cyan
Write-Host ""

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "❌ Error: Not a git repository" -ForegroundColor Red
    exit 1
}

# Check for uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-Host "📝 Found uncommitted changes. Committing..." -ForegroundColor Yellow
    git add .
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto-deploy: $timestamp"
    Write-Host "✅ Changes committed" -ForegroundColor Green
} else {
    Write-Host "✅ No uncommitted changes" -ForegroundColor Green
}

# Push to trigger deployment
Write-Host ""
Write-Host "📤 Pushing to GitHub to trigger deployment..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎯 Deployment Status:" -ForegroundColor Cyan
    Write-Host "   - GitHub Actions will automatically build and deploy" -ForegroundColor White
    Write-Host "   - Check progress at: https://github.com/24nse/alwael_website/actions" -ForegroundColor White
    Write-Host "   - Site will be live at: https://24nse.github.io/alwael_website/" -ForegroundColor White
    Write-Host ""
    Write-Host "⏱️  Deployment usually takes 2-3 minutes" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 To check deployment status, run:" -ForegroundColor Cyan
    Write-Host "   gh run list --limit 1" -ForegroundColor White
} else {
    Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
    Write-Host "   Please check your internet connection and GitHub credentials" -ForegroundColor Yellow
    exit 1
}
