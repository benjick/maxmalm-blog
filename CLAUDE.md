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

### Content collection → URLs

Everything revolves around the single `blog` collection defined in `src/content.config.ts`, loaded via glob from `src/content/blog/**/*.{md,mdx}`. Each post is a directory (e.g. `src/content/blog/2025/<slug>/index.md`, legacy posts under `src/content/blog/blog/<date-slug>/index.md`) with images co-located next to `index.md`.

The post's collection id is its directory path relative to `src/content/blog`, and `src/pages/[...slug].astro` (a root-level catch-all) uses that id directly as the URL — so `2025/foo/index.md` is served at `/2025/foo/`. Renaming or moving a post directory changes its public URL.

### Frontmatter drives visibility and rendering

Schema in `src/content.config.ts`:

- `linkTo` (default `false`): only posts with `linkTo: true` appear on the homepage (`src/pages/index.astro`). All posts appear in `/arkiv` and the RSS feed regardless.
- `lang`: `"sv"` or `"en"`, required; set as the `<html lang>` on the post page.
- `tags`: required; tag pages are generated at `/tag/<tag>` from the union of all tags.
- `refs` (optional): list of URLs rendered as a "Referenser" section at the bottom of the post.
- `paper` (optional): tracks a submission to a newspaper; `BlogPost.astro` renders a footer note with three states — published (`published: true`, optionally with `url`), rejected (`published: false`), or pending (only `name` set).

### Pages/layouts

- `src/pages/index.astro` — homepage with bio + featured (`linkTo: true`) posts
- `src/pages/arkiv.astro` — all posts
- `src/pages/rss.xml.js` — RSS feed at `/rss.xml`
- `src/layouts/BlogPost.astro` — post layout, including the `paper`/`refs` sections
- `src/consts.ts` — site title/description
