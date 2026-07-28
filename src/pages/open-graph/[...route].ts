import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const posts = await getCollection("blog");

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: Object.fromEntries(posts.map((post) => [post.id, post.data])),
  // Default slug mangling strips everything after the last dot, which breaks
  // post ids like "2025/foretagande.se-..." — keep the id verbatim instead.
  getSlug: (path) => `${path}.png`,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[17, 24, 39]],
    border: { color: [59, 130, 246], width: 12, side: "block-end" },
    padding: 72,
    font: {
      title: {
        size: 60,
        weight: "Bold",
        color: [255, 255, 255],
        lineHeight: 1.2,
      },
      description: {
        size: 32,
        color: [156, 163, 175],
        lineHeight: 1.4,
      },
    },
  }),
});
