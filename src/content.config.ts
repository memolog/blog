import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/` directory.
  loader: glob({ base: "./src/content", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    featured: z
      .object({
        image: z.string().optional(),
        author: z.string().optional(),
        authorLink: z.string().optional(),
        color: z.string().optional(),
      })
      .optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = { blog };
