# AI Prompt Book — Website

Marketing site + SEO blog for the [AI Prompt Book Android app](https://play.google.com/store/apps/details?id=in.ni18.aipromptbook). Built with **Jekyll**, hosted on **GitHub Pages** (native build — no CI needed).

## Structure

- `index.html` — landing page (features, blog preview, download CTAs)
- `how-to-use.md` — app usage guide (`/how-to-use/`)
- `blog/index.html` — blog listing (`/blog/`)
- `_posts/` — blog posts (the SEO engine — add Markdown files here)
- `privacy-policy.md`, `terms.md` — legal pages
- `_layouts/`, `_includes/` — shared templates (header, footer, post layout)
- `css/style.css`, `js/app.js` — design system and interactions

Sitemap, RSS feed, canonical URLs, Open Graph/Twitter meta, and JSON-LD are generated automatically by `jekyll-seo-tag`, `jekyll-sitemap`, and `jekyll-feed`.

## Writing a blog post

Create `_posts/YYYY-MM-DD-your-slug.md`:

```yaml
---
title: "Post Title (put the focus keyword near the front)"
description: "150-160 char meta description with the focus keyword."
category: Tutorial   # Tutorial | Guide | Showcase | Industry
image: "https://...featured-image.jpg"
image_alt: "Descriptive alt text"
---
Markdown content here...
```

Push to `main` — GitHub Pages rebuilds automatically. The post appears at `/blog/your-slug/`, on the blog index, on the homepage preview, in the sitemap, and in the RSS feed.

## Local preview (optional)

Requires Ruby: `bundle install && bundle exec jekyll serve` → http://localhost:4000/ai-prompt-book/

## Custom domain (future)

1. In repo **Settings → Pages**, set the custom domain (GitHub creates the `CNAME` file).
2. In `_config.yml`, set `url: "https://yourdomain.com"` and `baseurl: ""`.
3. Enable **Enforce HTTPS** once the certificate is issued.
4. Re-submit the sitemap in Google Search Console for the new domain.

All internal links use `relative_url`, so nothing else needs to change.
