# 🚀 Automated Deployment Guide

## Overview

Your project is now configured for **fully automated deployment** to GitHub Pages. Every time you push code to the `main` branch, GitHub Actions will automatically:

1. ✅ Install dependencies
2. ✅ Build the production version
3. ✅ Deploy to GitHub Pages
4. ✅ Make your site live at: **https://24nse.github.io/alwael_website/**

---

## 🎯 How to Deploy (3 Easy Methods)

### Method 1: Using npm (Recommended)

```bash
npm run deploy
```

This single command will:
- Add all your changes
- Commit them with a timestamp
- Push to GitHub
- Trigger automatic deployment

### Method 2: Using PowerShell Script (Windows)

```powershell
.\deploy.ps1
```

### Method 3: Using Bash Script (Linux/Mac)

```bash
chmod +x deploy.sh
./deploy.sh
```

### Method 4: Manual Git Commands

```bash
git add .
git commit -m "Your message here"
git push origin main
```

---

## 📋 What Happens After You Deploy?

1. **GitHub receives your code** (within seconds)
2. **GitHub Actions starts automatically** (check at: https://github.com/24nse/alwael_website/actions)
3. **Build process runs** (~2-3 minutes)
   - Installs dependencies
   - Runs `npm run build`
   - Creates optimized production files
4. **Deployment completes** (you'll see a green checkmark ✅)
5. **Your site is live!** Visit: https://24nse.github.io/alwael_website/

---

## 🔍 Monitoring Deployment

### Check Deployment Status

Visit the Actions tab on GitHub:
**https://github.com/24nse/alwael_website/actions**

You'll see:
- 🟡 **Yellow dot** = Building (in progress)
- ✅ **Green checkmark** = Deployed successfully
- ❌ **Red X** = Build failed (check logs)

### View Live Site

After successful deployment:
**https://24nse.github.io/alwael_website/**

---

## ⚙️ Configuration Files

Your project has these automated deployment files:

### 1. `.github/workflows/deploy.yml`
The GitHub Actions workflow that handles:
- Building your project
- Deploying to GitHub Pages
- Running on every push to `main`

### 2. `vite.config.ts`
Configured with:
```typescript
base: '/alwael_website/'
```
This ensures all assets load correctly on GitHub Pages.

### 3. Deployment Scripts
- `deploy.ps1` - PowerShell version
- `deploy.sh` - Bash version
- `package.json` - npm script

---

## 🛠️ Troubleshooting

### Issue: "404 Not Found" on the site

**Solution:**
1. Go to: https://github.com/24nse/alwael_website/settings/pages
2. Under "Build and deployment"
3. Change **Source** to: **GitHub Actions**
4. Wait 2-3 minutes for redeployment

### Issue: Build fails in GitHub Actions

**Solution:**
1. Check the Actions tab for error details
2. Common fixes:
   - Run `npm install` locally
   - Run `npm run build` to test locally
   - Fix any TypeScript/ESLint errors
   - Push the fixes

### Issue: Changes not appearing on the site

**Solution:**
1. Clear browser cache (Ctrl + Shift + R)
2. Wait 2-3 minutes after deployment
3. Check if the workflow completed successfully

---

## 📊 Deployment Workflow Diagram

```
Your Computer                 GitHub                    GitHub Pages
     |                          |                            |
     |  1. npm run deploy        |                            |
     |-------------------------->|                            |
     |                          |                            |
     |                          | 2. Trigger Actions         |
     |                          |--------------------------->|
     |                          |                            |
     |                          | 3. Build & Deploy          |
     |                          |<---------------------------|
     |                          |                            |
     |                          | 4. Site Live! ✅           |
     |                          |                            |
```

---

## 🎓 Best Practices

### Before Deploying

1. **Test locally:**
   ```bash
   npm run dev
   ```

2. **Build locally to check for errors:**
   ```bash
   npm run build
   ```

3. **Preview the production build:**
   ```bash
   npm run preview
   ```

### Deployment Frequency

- **Small changes**: Deploy anytime
- **Major updates**: Test thoroughly first
- **Emergency fixes**: Deploy immediately

### Commit Messages

Use clear commit messages:
- ✅ "Add WhatsApp integration"
- ✅ "Fix contact form validation"
- ✅ "Update testimonials section"
- ❌ "update"
- ❌ "fix"

---

## 🔐 Security Notes

- Never commit sensitive data (API keys, passwords)
- The workflow runs in a secure GitHub environment
- Your site is served over HTTPS automatically

---

## 📞 Quick Reference

| Action | Command |
|--------|---------|
| Deploy | `npm run deploy` |
| Test locally | `npm run dev` |
| Build | `npm run build` |
| Preview build | `npm run preview` |
| Check status | Visit Actions tab |
| View site | https://24nse.github.io/alwael_website/ |

---

## ✅ Deployment Checklist

Before each deployment:

- [ ] Code works locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors
- [ ] All images load correctly
- [ ] Forms work as expected
- [ ] Mobile responsive
- [ ] Clear commit message

After deployment:

- [ ] Check Actions tab (green checkmark)
- [ ] Visit live site
- [ ] Test on mobile
- [ ] Clear cache if needed

---

**🎉 You're all set! Just run `npm run deploy` whenever you want to update your site!**
