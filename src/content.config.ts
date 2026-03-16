import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ensayos = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/ensayos' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    year: z.string(),
    description: z.string(),
    ogDescription: z.string().optional(),
  }),
});

const peliculas = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/peliculas' }),
  schema: z.object({
    title: z.string(),
    director: z.string(),
    year: z.string(),
    label: z.string(),
    description: z.string(),
    image: z.string(),
    thumb: z.string(),
    ogDescription: z.string().optional(),
  }),
});

export const collections = { ensayos, peliculas };
