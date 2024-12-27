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

export const collections = { blog };
