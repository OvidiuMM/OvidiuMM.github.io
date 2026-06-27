# Ovidiu Moldovan — AI Consultancy Website

Bilingual (Spanish/English) one-page personal site offering **AI consultancy, training and development** for companies, the Spanish public administration and individuals.

Static site — plain HTML, CSS and JavaScript. No build step. Hosted on **GitHub Pages** at **https://ovidiu.moldovan.es**.

## Files

| File | Purpose |
|------|---------|
| `index.html` | All page content, both languages, SEO + Open Graph meta |
| `styles.css` | Modern minimal / tech responsive design |
| `script.js` | ES/EN language toggle, mobile nav, contact form |
| `CNAME` | Custom domain for GitHub Pages (`ovidiu.moldovan.es`) |
| `sitemap.xml`, `robots.txt` | SEO |
| `favicon.svg` | Site icon |

Content is already populated from Ovidiu Moldovan's CV (bio, experience, education, certifications, awards, skills, languages). Email is `ovidiu5891@gmail.com` and LinkedIn is `linkedin.com/in/ovidiumirceamoldovan`.

## One thing to set up before launch

**Contact form**: the form posts to [Formspree](https://formspree.io). Create a free form, then in `index.html` replace `https://formspree.io/f/TU_ID` with your real endpoint. Until you do, the form shows a friendly "not configured" message and points visitors to your email (`ovidiu5891@gmail.com`).

**Logo**: `logo.svg` and `favicon.svg` are a clean vector recreation of the "Moldovan Tech" emblem. To use your exact original image instead, drop it in this folder as `logo.svg`/`logo.png` and update the `<img src>` in `index.html`.

---

## Deploy step by step

### 1. Push the files to `OvidiuMM/OvidiuMM.github.io`

A repo named `OvidiuMM.github.io` is a GitHub **user site** and is served from the root of the domain automatically.

From this folder:

```bash
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/OvidiuMM/OvidiuMM.github.io.git
git push -u origin main
```

If the repo doesn't exist yet, create it first on github.com (name it exactly `OvidiuMM.github.io`, public).

### 2. Enable GitHub Pages

1. Go to the repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)**. Save.
4. Wait ~1 minute. Your site goes live at `https://OvidiuMM.github.io`.

### 3. Configure the custom domain

The `CNAME` file in this repo already contains `ovidiu.moldovan.es`, so GitHub picks it up automatically. To confirm:

1. **Settings → Pages → Custom domain** should show `ovidiu.moldovan.es`.
2. If empty, type `ovidiu.moldovan.es` and click **Save**.

### 4. DNS records in the 1&1 / IONOS control panel

`ovidiu.moldovan.es` is a **subdomain** of `moldovan.es`, so the recommended record is a **CNAME** pointing to your GitHub user site.

In IONOS: **Domains & SSL → moldovan.es → DNS**, then add:

| Type | Host / Name | Points to / Value | TTL |
|------|-------------|-------------------|-----|
| CNAME | `ovidiu` | `OvidiuMM.github.io.` | 1 hour |

> In IONOS the "Host name" field is just the subdomain part — enter `ovidiu` (not the full domain). Some panels require a trailing dot on the target; include it if offered.

**Alternative — if you ever use the apex `moldovan.es` itself**, use A records instead of a CNAME:

| Type | Host | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Optional IPv6 (AAAA): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

DNS changes can take up to 24 hours to propagate (usually much less).

### 5. Enable HTTPS

1. Back in **Settings → Pages**, wait until GitHub finishes the DNS check (a green tick appears).
2. Tick **Enforce HTTPS**. GitHub provisions a free Let's Encrypt certificate automatically — this can take a few minutes to an hour after DNS resolves.

That's it — your bilingual site is live and secure at **https://ovidiu.moldovan.es**.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
