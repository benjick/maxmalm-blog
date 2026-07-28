# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Uses pnpm (pnpm-lock.yaml).

- `pnpm dev` — dev server at localhost:4321
- `pnpm build` — static build to `./dist/`
- `pnpm preview` — serve the built site locally
- `pnpm type-check` — `tsc --noEmit`

There are no tests or linter.

## Architecture

Personal blog (maxmalm.se, mostly Swedish content) built with Astro 5, Tailwind (v3 via `@astrojs/tailwind` + `@tailwindcss/typography`), MDX, sitemap, and RSS.

### Content collections → URLs

Two collections are defined in `src/content.config.ts`: `blog` (posts) and `wunderkammer` (curated works from the internet — embeds with preservation links).

The `blog` collection is loaded via glob from `src/content/blog/**/*.{md,mdx}`. Each post is a directory (e.g. `src/content/blog/2025/<slug>/index.md`, legacy posts under `src/content/blog/blog/<date-slug>/index.md`) with images co-located next to `index.md`.

The post's collection id is its directory path relative to `src/content/blog` run through the glob loader's default slugification, and `src/pages/[...slug].astro` (a root-level catch-all) uses that id directly as the URL — so `2025/foo/index.md` is served at `/2025/foo/`. Beware: slugification is lossy (e.g. `foretagande.se-...` becomes `foretagandese-...`), and its behavior has changed between Astro versions. Renaming or moving a post directory changes its public URL, and so can an Astro upgrade — after upgrading Astro, diff the built page paths against the live sitemap (`https://maxmalm.se/sitemap-0.xml`) before deploying.

### Frontmatter drives visibility and rendering

Schema in `src/content.config.ts`:

- `linkTo` (default `false`): only posts with `linkTo: true` appear on the homepage (`src/pages/index.astro`). All posts appear in `/arkiv` and the RSS feed regardless.
- `lang`: `"sv"` or `"en"`, required; set as the `<html lang>` on the post page.
- `tags`: required; tag pages are generated at `/tag/<tag>` from the union of all tags.
- `refs` (optional): list of URLs rendered as a "Referenser" section at the bottom of the post.
- `paper` (optional): tracks a submission to a newspaper; `BlogPost.astro` renders a footer note with three states — published (`published: true`, optionally with `url`), rejected (`published: false`), or pending (only `name` set).

### Wunderkammer collection

Curated internet finds live flat (no year) under `src/content/wunderkammer/<slug>/index.md`, served at `/wunderkammer/<slug>/` with a feed page at `/wunderkammer/`. Schema fields: `title`, `date` (when added), `source` (original URL, required), and optional `description`, `creator`, `youtube` (video id → youtube-nocookie embed via `YouTubeEmbed.astro`), `archive` (archive.org identifier → renders an archive.org link; only set for items that actually exist on archive.org), `torrent` (URL → renders a torrent download link; verify the URL exists before setting it, since not all IA items have an `_archive.torrent` file), `thumbnail` (local image → frontpage card background and click-to-play facade on entry pages). The markdown body is commentary. `WunderkammerEntry.astro` renders an item on both the feed and permalink pages. The four latest items appear on the homepage; all items are merged into the RSS feed alongside blog posts.

### OG images

`src/pages/open-graph/[...route].ts` generates a 1200x630 PNG card per blog post at build time via `astro-og-canvas` (custom `getSlug` keeps post ids verbatim). `BlogPost.astro` derives the image URL from the page path; wunderkammer pages pass their thumbnail through `getImage()` instead. `BaseHead` renders `og:image`/`twitter:image` only when given an `image` prop, absolutized against the site URL.

### Pages/layouts

- `src/pages/index.astro` — homepage with bio + featured (`linkTo: true`) posts + latest wunderkammer items
- `src/pages/arkiv.astro` — all posts
- `src/pages/rss.xml.js` — RSS feed at `/rss.xml` (blog + wunderkammer)
- `src/layouts/BlogPost.astro` — post layout, including the `paper`/`refs` sections
- `src/consts.ts` — site title/description
