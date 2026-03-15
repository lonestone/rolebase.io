import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date().optional(),
    update: z.coerce.date().optional(),
    lang: z.enum(['en', 'fr']),
    image: z.string().optional(),
    author: z.string().optional(),
    similarPosts: z.array(z.string()).optional(),
  }),
})

const clientCases = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/client-cases',
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    lang: z.enum(['en', 'fr']),
    sector: z.string().optional(),
    teamSize: z.string().optional(),
    logo: z.string().optional(),
  }),
})

export const collections = { blog, 'client-cases': clientCases }
