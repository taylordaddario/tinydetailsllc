# Tiny Details LLC — Website

A clean, mobile-friendly website for [tinydetailsllc.com](https://tinydetailsllc.com), hosted on GitHub Pages.

## Pages

- **Home** — Hero, featured designs, story teaser
- **About** — Brand story and values
- **Gallery** — Full portfolio with category filters
- **Contact** — Email, Instagram, and Etsy links

## Preview locally

Open `index.html` in your browser, or run a simple local server:

```powershell
cd Website
python -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

## Deploy to GitHub Pages

### Step 1 — Create a repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `tinydetailsllc` (or any name you like)
3. Set it to **Public**
4. Do **not** add a README, .gitignore, or license (we already have the files)
5. Click **Create repository**

### Step 2 — Push the website files

In PowerShell, from the `Website` folder:

```powershell
cd "c:\Users\taylo\OneDrive\Documents\Tiny Details LLC\Website"
git init
git add .
git commit -m "Initial Tiny Details website"
git branch -M main
git remote add origin https://github.com/taylordaddario/tinydetailsllc.git
git push -u origin main
```

> Replace the repo name in the URL if you chose a different one.

### Step 3 — Enable GitHub Pages

1. Open your repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set Source to **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Click **Save**
5. Wait 1–2 minutes — your site will be live at `https://taylordaddario.github.io/tinydetailsllc/`

### Step 4 — Connect your custom domain

The `CNAME` file in this folder tells GitHub to use `tinydetailsllc.com`.

1. In repo **Settings → Pages**, enter `tinydetailsllc.com` in **Custom domain** and save
2. In your domain registrar (Google Domains / Squarespace), update DNS:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| A     | @    | `185.199.108.153`        |
| A     | @    | `185.199.109.153`        |
| A     | @    | `185.199.110.153`        |
| A     | @    | `185.199.111.153`        |
| CNAME | www  | `taylordaddario.github.io` |

3. Enable **Enforce HTTPS** once DNS propagates (can take up to 48 hours)

### Step 5 — Cancel Google Sites (optional)

Once `tinydetailsllc.com` loads your new site, you can cancel your Google Workspace / Sites subscription and keep only the domain.

## Updating the site

After making changes locally:

```powershell
git add .
git commit -m "Describe your change"
git push
```

GitHub Pages will redeploy automatically within a minute or two.

## What you don't need to send anyone

Your GitHub account ([taylordaddario](https://github.com/taylordaddario)) is all that's needed — no passwords or tokens need to be shared. When you push from your computer, GitHub will prompt you to sign in.
