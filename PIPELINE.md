# Article Publishing Pipeline
## brianssennoga.ca

*Last updated: May 2026*

This document covers the full pipeline for getting a piece of writing from any source onto the live site. Two operating modes: Claude Chat (daytime) and CoWork (evenings at home).

---

## The Short Version

1. Bring the content to Claude (any source — see below)
2. Claude produces a single `.mdx` file
3. Drop the file into `src/content/writing/`
4. `git add . && git commit -m "publish: [title]" && git push`
5. Live in ~60 seconds

---

## Step 1 — Bring the Content

### Source: LinkedIn article
LinkedIn blocks direct fetching. Open the article, select all text, paste it into Claude with:
> *"Publish this to brianssennoga.ca — Governance & Policy"* (or whatever category)

### Source: Google Drive doc
Share the Drive link with Claude directly. Claude can read Google Docs natively.
> *"Publish this doc to brianssennoga.ca — [category]"*

### Source: Uploaded .md or .docx file
Drag the file into the Claude chat window and say:
> *"Publish this to brianssennoga.ca — [category]"*

### Source: Write directly in Claude
Just describe or draft the piece in conversation. When it's ready:
> *"Convert this to a site article — [category]"*

---

## Step 2 — What Claude Produces

Claude will output a single `.mdx` file with:

- **Filename** following the sequence convention: `0009-slug-here.mdx`
  *(check the current highest number in `src/content/writing/` and go one higher)*
- **Frontmatter** with title, description, date, draft status, and tags
- **Body** cleaned and formatted for MDX (headings, blockquotes, lists, links)
- **Series nav** if the piece is part of a series

**Frontmatter template for reference:**
```yaml
---
title: "Full title here"
description: "One sentence. Shows on cards and in social previews."
date: 2026-05-28       # YYYY-MM-DD
draft: false
tags: ["Governance", "Policy"]   # must match a category — see below
---
```

---

## Category → Tag Mapping

The **My Written Thoughts** page organises articles by tag. Use the right tag and the article appears in the right category automatically.

| Category on site | Tag to use |
|---|---|
| AI & Machine Learning | `AI Policy` or `AI Literacy` |
| Governance & Policy | `Governance` or `Policy` |
| Immigration & Newcomers | `Newcomer` or `Immigration` |
| Leadership & Management | `Leadership` or `Management` |
| Family | `Family` |
| Satire | `Satire` |
| Personal | `Personal` or `Humour` |

An article can have multiple tags. The first tag matching a category determines where it appears.

---

## Step 3 — Drop the File

Place the `.mdx` file into:
```
src/content/writing/
```

**Filename convention:** `NNNN-slug-here.mdx` where `NNNN` is the next sequential number.

Current sequence as of May 2026:
```
0001 — ai-policy-conversations (placeholder, future AI policy essay)
0002 — burnout-battle-plan
0003 — divine-management
0004 — newcomer-part-1
0005 — newcomer-part-2
0006 — newcomer-part-3
0007 — newcomer-part-4
0008 — uganda-cabinet-plea
0009 — next article goes here
```

---

## Step 4 — Push

```bash
cd ~/path/to/site
git add .
git commit -m "publish: brief description of article"
git push
```

GitHub Actions rebuilds and the article is live within 60 seconds.

---

## Operating Mode: Claude Chat (daytime)

Works on any device, browser or mobile. Best for articles sourced from LinkedIn, Drive, or typed directly.

**Claude Chat flow:**
1. Share source content
2. Claude produces the `.mdx` file as a downloadable single file
3. Download the file to your machine
4. Drop it into `src/content/writing/` via VS Code or file manager
5. Push from terminal

**For LinkedIn specifically** — since fetching is blocked:
- Open the article on LinkedIn
- Select all → Copy
- Paste into Claude with the publish instruction

---

## Operating Mode: CoWork (evenings, home device)

CoWork has direct access to the file system. Claude can write the `.mdx` file directly into the correct folder and run the git commands — no manual file handling required.

**CoWork flow:**
1. Share source content in the CoWork session
2. Say: *"Write this directly to the site and push"*
3. Claude writes the file, runs `git add`, `git commit`, `git push`
4. Done — no downloads, no file manager

This is the faster mode for end-of-day publishing.

---

## Updating an Existing Article

To fix a typo, update a section, or add a note to a published article:

**Via Claude Chat:**
> *"Here is the slug: `0008-uganda-cabinet-plea`. Make this change: [describe change]."*
Claude produces the updated file. Replace the existing one and push.

**Via VS Code directly:**
Open the file in `src/content/writing/`, edit, save, push.

---

## Setting an Article to Draft

To hide a published article without deleting it, open the file and change:
```yaml
draft: false
```
to:
```yaml
draft: true
```
Push. The article disappears from the site but the file is preserved.

---

## Quick Reference — One Push Per Session

You don't need to push after every single file change. Batch your session:
- Make all edits (new articles, fixes, content updates)
- One `git add . && git commit -m "..." && git push` at the end
- Everything goes live together

---

## Troubleshooting

**Article not appearing on the site:**
- Check `draft: false` in frontmatter
- Check the tag matches a category in the table above
- Check the date is not in the future

**Build failing after adding an article:**
- Check for unclosed quotes or colons in the frontmatter `title` or `description` fields
- Wrap the title in double quotes if it contains a colon: `title: "Title: subtitle"`

**Wrong category:**
- Update the `tags` field in frontmatter to match the correct category tag
- Push again
