# Deployment Guide — Vercel (Primary) + Alternatives 🚀

This file contains step-by-step deployment instructions for the TASKFLOW static site.

 

## Deploying to Vercel (recommended)

Vercel is optimized for static sites and provides automatic deployments from GitHub repos and a CDN edge network.

### Steps

1. Create a GitHub repository and push your project:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

2. Sign in to https://vercel.com using your GitHub account.
3. Click **New Project** → **Import Git Repository** → select your repo.
4. When asked for Framework Preset, choose **Other** (no build). Ensure the Root is the project root where `index.html` lives.
5. Click **Deploy**. Vercel will build and publish your site and provide a unique `*.vercel.app` URL.
6. (Optional) Add a custom domain in Project Settings → Domain and follow DNS instructions.

### Notes
- Vercel serves files from a CDN so requests are fast and globally distributed.
- Future pushes to `main` will automatically trigger new deployments.

 

## Alternative: GitHub Pages

1. Push repo to GitHub.
2. Go to the repo → Settings → Pages.
3. Under "Source" select `main` branch and `/ (root)` folder.
4. Save — GitHub Pages will publish your site at `https://yourusername.github.io/your-repo/`.

Notes: Good for simple static hosting; no preview deployments.

 

## Alternative: Netlify

1. Sign in to https://app.netlify.com and click **New site from Git**.
2. Connect your GitHub repo and follow the prompts. Build command: leave empty; Publish directory: `.` (root).
3. Deploy — Netlify will give you a `*.netlify.app` domain.

 

## Testing & Verification

- Verify `index.html` loads and the app functions (create tasks, complete/delete, refresh to check localStorage).
- Check browser DevTools → Network to confirm CSS & JS are served as static assets with 200 responses.
- Optionally use `curl -I` to inspect HTTP headers and confirm status codes and caching headers.

 

## Troubleshooting

- 404 or missing assets: check that `index.html`, `style.css`, and `script.js` are in the repo root or specify correct publish directory.
- CORS issues: not applicable for static same-origin files.

 

Anytime you want, I can publish the repo for you (I can provide a commit/pull request or instructions to add me as a collaborator).