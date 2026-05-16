# brianssennoga.ca

Personal hub for Brian Ssennoga — writing, the long-form bio, and the
credibility arc that sits behind the consulting work at
[Olympia & Associates](https://olympia-associates.ca).

Built with [Astro](https://astro.build), deployed to GitHub Pages on the
custom domain `brianssennoga.ca`.

---

## What this site is (and is not)

- **Is:** personal hub, credibility anchor, long-form writing home.
- **Is not:** the consulting site. For commercial enquiries, send people
  to [olympia-associates.ca](https://olympia-associates.ca).

---

## Local development

```bash
# install
npm install

# dev server at http://localhost:4321
npm run dev

# production build (outputs to ./dist)
npm run build

# preview the production build
npm run preview
```

Node 20+ recommended.

---

## How the site is structured

```
src/
  content/
    writing/     ← long-form essays (MDX). Each file = one article.
    thoughts/    ← short LinkedIn-style entries (JSON). Each file = one card.
  pages/
    index.astro      ← home (all sections live here)
    bio.astro        ← /bio long-form biography
    writing/
      [...slug].astro    ← dynamic route for individual essays
      rss.xml.js         ← RSS feed
  components/
    Header.astro, Footer.astro
  layouts/
    BaseLayout.astro     ← head tags, OpenGraph, JSON-LD, header, footer
  styles/
    global.css           ← all design tokens and component styles
public/
  CNAME                  ← brianssennoga.ca (required for GitHub Pages)
  favicon.svg
```

---

## The writing pipeline (Drive → Claude → repo)

Articles are drafted in Google Drive, finalised, then pushed into the
repo as MDX. The flow:

1. Draft and edit the piece in Google Drive until it is publication-ready.
2. Bring the final draft to Claude in the Business Brain project (or a
   dedicated writing project) with a simple instruction: *"Publish this
   to brianssennoga.ca."*
3. Claude generates the MDX file with the correct frontmatter and the
   filename convention `NNNN-slug.mdx` (sequential ordering), commits it
   to `src/content/writing/`, and confirms.
4. GitHub Actions rebuilds and deploys automatically on push to `main`.

### Frontmatter schema

```yaml
---
title: "Title in sentence case"
description: "One-line summary. Shows on the home page card and in OG previews."
date: 2026-05-15           # YYYY-MM-DD — controls sort order
updated: 2026-05-20        # optional — set if the piece is revised
draft: false               # true to hide from production
tags: ["AI Policy", "Governance"]   # optional, first tag shows on cards
---
```

The body is standard MDX — Markdown with optional inline components.

---

## The Latest Thoughts pipeline

The "Latest Thoughts" section on the home page mirrors selected LinkedIn
posts. No scraping — entries are added manually when there is something
worth surfacing.

Add a JSON file to `src/content/thoughts/` named `NNNN-slug.json`:

```json
{
  "title": "The headline the post is known by",
  "excerpt": "One or two sentences. Pulls the reader toward LinkedIn.",
  "date": "2026-05-15",
  "url": "https://www.linkedin.com/posts/...",
  "source": "LinkedIn"
}
```

Latest four sort to the top of the section automatically.

---

## WordPress migration plan

The legacy WordPress site at brianssennoga.ca has an XML export ready
for triage. The plan, when ready:

1. Review the export and mark the posts worth keeping forward.
2. Convert each kept post to MDX with the original publish date
   preserved in frontmatter.
3. Place them under `src/content/writing/` with sequential filenames
   that respect chronology (e.g. `0001-...`, `0002-...`).
4. Set up redirect stubs for any old URLs that may have been indexed,
   using the pattern in `html-site-builder` skill scripts.

This is a separate task from initial launch — the site can ship without
it.

---

## Deployment

### One-time GitHub Pages setup

1. Push the repo to `github.com/brian256/<repo-name>`.
2. In repo **Settings → Pages**, set Source to **GitHub Actions**.
3. Set Custom domain to `brianssennoga.ca` and enable HTTPS.
4. Configure DNS at the registrar:
   - `A` records for the apex pointing to GitHub Pages IPs (185.199.108.153,
     185.199.109.153, 185.199.110.153, 185.199.111.153), **or**
   - `CNAME` record on `www` → `brian256.github.io`.

### Subsequent deploys

Push to `main`. The workflow at `.github/workflows/deploy.yml` builds
and deploys automatically. Manual trigger available via the Actions tab.

---

## Design system reference

All design tokens live in `src/styles/global.css` under `:root`. The
palette:

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#F7F4ED` | Default surface (paper) |
| `--color-bg-deep` | `#F0EBDB` | Section alternates, hover states |
| `--color-ink` | `#1A1A1A` | Headlines, dark UI |
| `--color-body` | `#3C3C3C` | Body copy |
| `--color-rule` | `#DDD1B6` | Hairlines, borders |
| `--color-gold` | `#90660C` | Accents, links, CTAs |
| `--color-gold-deep` | `#6F4F09` | Hover for gold |
| `--color-muted` | `#6B6357` | Dates, meta, captions |

Typography: **Fraunces** (variable serif, display) + **Inter** (body).
Both loaded from Google Fonts. Fraunces variable axes (`opsz`, `wght`,
`SOFT`) are used throughout for editorial warmth at large sizes and
crisp tightness at small sizes.

---

## Pre-launch checklist

- [ ] Real headshot replaces `.portrait` placeholder in `src/pages/index.astro`
- [ ] First real essay published (replace seed entry)
- [ ] At least three Latest Thoughts entries linking to real LinkedIn posts
- [ ] OG image generated at `/public/og-default.png` (1200×630)
- [ ] DNS configured and propagated for `brianssennoga.ca`
- [ ] GitHub Pages custom domain set and HTTPS enabled
- [ ] Test pass on mobile (320px), tablet (768px), desktop (1440px)
- [ ] Run Lighthouse: target 95+ on Performance, Accessibility, SEO

---

*Last updated: May 2026.*
