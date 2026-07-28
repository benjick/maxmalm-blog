import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    lang: z.union([z.literal("sv"), z.literal("en")]),
    tags: z.array(z.string()),
    refs: z.array(z.string()).optional(),
    linkTo: z.boolean().default(false),
    paper: z
      .object({
        name: z.string(),
        published: z.boolean().optional(),
        url: z.string().optional(),
      })
      .optional(),
  }),
});

const wunderkammer = defineCollection({
  loader: glob({ base: "./src/content/wunderkammer", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      creator: z.string().optional(),
      date: z.coerce.date(),
      source: z.string().url(),
      youtube: z.string().optional(),
      archive: z.string().optional(),
      torrent: z.string().url().optional(),
      thumbnail: image().optional(),
    }),
});

export const collections = { blog, wunderkammer };
