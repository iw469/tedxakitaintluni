# TEDxAkitaIntlU Website Manual

This manual explains how this site is structured, what each part does, and how to update it safely.

## 1) Project Purpose

This is an Astro + Tailwind website for TEDxAkitaIntlU. It includes:

- Japanese and English pages
- Homepage sections (overview, schedule, venue, theme, sponsors, team)
- Speaker pages
- Ticket/pricing page
- Contact form
- Team and blog content collections

## 2) Tech Stack

- Framework: Astro
- Styling: Tailwind CSS 4
- Content collections: `astro:content`
- SEO: `astro-seo`, schema JSON-LD in page/layout files
- Assets: `astro:assets` optimized images

Main config files:

- `astro.config.mjs`: Astro config, `SITE_URL`, integrations
- `package.json`: scripts and dependencies
- `tsconfig.json`: path aliases like `@/`

## 3) Local Development

Install dependencies:

```bash
pnpm install
```

Run dev server:

```bash
pnpm dev
```

Build production:

```bash
pnpm build
```

Preview production build:

```bash
pnpm preview
```

## 4) Environment Variables

Set `SITE_URL` so canonical URLs, sitemap, and social/SEO metadata are correct.

Create a `.env` file in the project root:

```env
SITE_URL=https://your-domain.example
```

`SITE_URL` is read in `astro.config.mjs`.

## 5) Folder Guide (What Each Part Does)

- `src/pages/`: route files (each file = page URL)
	- `index.astro`: Japanese homepage
	- `en/index.astro`: English homepage
	- `about.astro`, `speaker.astro`, `pricing.astro`, `contact.astro`: Japanese subpages
	- `en/about.astro`, `en/speaker.astro`, `en/pricing.astro`, `en/contact.astro`: English subpages
	- `ono.astro`, `united.astro`, `yuri.astro`: sponsor detail pages
	- `blog.astro`, `blog/[slug].astro`: blog list and detail pages

- `src/components/`: reusable sections/components
	- `hero.astro`: top visual block
	- `features.astro`: event overview panel
	- `schedule.astro`: event timeline area
	- `route.astro`: venue and access section
	- `theme.astro`: event theme statement
	- `talktheme.astro`: why talk themes were selected
	- `logos.astro`: sponsor logos and group levels
	- `team.astro`: team member grid (from content collection)
	- `cta.astro`: call-to-action ticket block
	- `contactform.astro`: web form integration
	- `navbar/navbar.astro`: top navigation and language switch
	- `footer.astro`: footer legal/copyright text

- `src/content/`: structured content
	- `team/*.md`: team entries displayed in `team.astro`
	- `blog/*.md|*.mdx`: blog entries
	- `config.ts`: schema validation for blog/team entries

- `src/layouts/`
	- `Layout.astro`: shared page shell, SEO tags, alternate language links
	- `BlogLayout.astro`: blog layout (if used by specific entries)

- `src/assets/`: local images used by pages/components
- `public/`: static files served directly (`robots.txt`, etc.)
- `src/utils/i18n.ts`: locale detection/path localization helper

## 6) How to Update Each Site Area

### A. Homepage section order

Files:

- `src/pages/index.astro` (JA)
- `src/pages/en/index.astro` (EN)

Update by editing component order inside `<Container>`.

### B. Hero image and top message

File:

- `src/components/hero.astro`

What to edit:

- Background image import (`src/assets/...`)
- Main message text
- Instagram/news link

### C. Overview, schedule, venue, theme, talk theme

Files:

- `src/components/features.astro`
- `src/components/schedule.astro`
- `src/components/route.astro`
- `src/components/theme.astro`
- `src/components/talktheme.astro`

What to edit:

- Japanese and English copy (already implemented with `lang` prop)
- Section images and media
- Venue links/maps and logistics details

### D. Sponsor list and sponsor levels

File:

- `src/components/logos.astro`

What to edit:

- Logos imported from `src/assets/`
- Grouping (First/Second/Third/In-kind)
- Click-through links to sponsor pages

### E. Sponsor detail pages

Files:

- `src/pages/ono.astro`
- `src/pages/united.astro`
- `src/pages/yuri.astro`
- English equivalents in `src/pages/en/` if present

What to edit:

- Company name and description text
- External URL
- Company logo/image

### F. Team members

Files:

- `src/content/team/*.md`
- `src/content/config.ts` (schema)
- `src/components/team.astro` (rendering)

How it works:

- Entries render only when:
	- `draft: false`
	- `publishDate` is earlier than current time

To add a member:

1. Create a new markdown file in `src/content/team/`.
2. Follow existing frontmatter fields exactly: `draft`, `name`, `title`, `avatar`, `publishDate`.
3. Put image in `public/` (or adjust path strategy consistently).

### G. Speakers page

Files:

- `src/pages/speaker.astro` (JA)
- `src/pages/en/speaker.astro` (EN)
- `src/components/speakerIntro.astro` (card layout)

What to edit:

- `speakers` array content (name, talk theme, intro, image)
- Past-year video sections via:
	- `src/components/pastyearvideo2025.astro`
	- `src/components/pastyearvideo2024.astro`

### H. Ticket page

Files:

- `src/pages/pricing.astro` (JA)
- `src/pages/en/pricing.astro` (EN)
- `src/components/pricing.astro` (card UI)

What to edit:

- Pricing tiers
- Ticket form links
- Explanatory text (payment notes, dates)

### I. Contact page and form

Files:

- `src/pages/contact.astro` (JA)
- `src/pages/en/contact.astro` (EN)
- `src/components/contactform.astro`

What to edit:

- Intro copy, address, contact email
- Form labels/messages
- Web3Forms `access_key`

Important:

- The current `access_key` is hardcoded in `contactform.astro`.
- Move this to an environment variable for security before public release.

### J. Navigation and language switching

Files:

- `src/components/navbar/navbar.astro`
- `src/utils/i18n.ts`

What to edit:

- Menu labels and destinations
- Language button text
- Locale path logic (`/` for JA and `/en` for EN)

### K. SEO and metadata

Files:

- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/blog/[slug].astro`
- `public/robots.txt`
- `astro.config.mjs`

What to edit:

- Page titles/descriptions
- Open Graph image (`/opengraph.jpg`)
- Structured data JSON-LD
- Canonical/alternate links (already generated in layout)

## 7) Blog Update Guide

Files:

- `src/content/blog/template_for_blog.md`
- `src/content/blog/*.md` or `*.mdx`
- `src/content/config.ts`

To publish a post:

1. Copy the template file and rename it with a unique slug-style name.
2. Fill frontmatter fields required by schema:
	 - `draft`, `title`, `snippet`, `image`, `publishDate`, `category`, `author`, `tags`
3. Set `draft: false`.
4. Ensure `publishDate` is not in the future.

The blog list is generated from content collection entries in `src/pages/blog.astro`.

## 8) Publishing Workflow (Recommended)

1. Create a feature branch.
2. Edit content/components.
3. Run:

	 ```bash
	 pnpm build
	 ```

4. Confirm no build errors.
5. Open PR and request review.
6. Merge after review.
7. Deploy with your hosting workflow.

## 9) Common Pitfalls

- Missing `SITE_URL` causes incomplete canonical/Open Graph absolute URLs.
- Wrong frontmatter field names in content files break collection validation.
- Leaving `draft: true` or future `publishDate` hides content.
- Forgetting EN page updates creates JA/EN inconsistency.
- Large image files can slow pages; optimize before commit.

## 10) Quick Contributor Checklist

- [ ] Updated both JA and EN content when needed
- [ ] Verified links/forms/sponsor URLs
- [ ] Verified images load correctly
- [ ] Ran `pnpm build` successfully
- [ ] Confirmed SEO title/description for changed pages

---

If you want, this manual can be split into:

- `README.md` (short project overview)
- `docs/CONTENT-UPDATE-GUIDE.md` (editor-focused guide)
- `docs/DEPLOYMENT.md` (release checklist)
