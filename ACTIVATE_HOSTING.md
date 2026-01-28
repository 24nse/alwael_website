# 🌐 How to Activate GitHub Hosting (Final Step)

Since your code is already pushed and valid, you just need to turn on the hosting switch on GitHub.

## 1. Go to Your Repository Settings

1. Open your repository on GitHub:
   - **https://github.com/24nse/alwael_website** (or your username)
2. Click on the **Settings** tab (top right of the repo menu).

## 2. Enable GitHub Pages

1. In the left sidebar, scroll down and click on **Pages**.
2. Look for the "Build and deployment" section.
3. Under **Source**, change "Deploy from a branch" to **GitHub Actions**.
   - *Note: This is crucial because we created a special workflow for you.*
4. It will save automatically or show a Save button.

## 3. That's It!

1. Go to the **Actions** tab in your repository.
2. You will see a workflow named "Deploy to GitHub Pages" running (or queued).
3. Wait for it to turn specific **Green**.
4. Once finished, your website will be live at:
   - **https://24nse.github.io/alwael_website/**

---

## 🛠 Troubleshooting

**Q: I don't see "GitHub Actions" in the source list.**
A: Make sure you have the file `.github/workflows/deploy.yml` in your repository. (We created this for you).

**Q: The site is 404.**
A: Wait 2-3 minutes after the green checkmark. It takes time for DNS to propagate.

**Q: Images are not loading.**
A: Ensure you are accessing the site via the generated URL. The base path `/alwael_website/` is required.
