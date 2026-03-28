import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date().optional(),
      update: z.coerce.date().optional(),
      image: image().optional(),
      author: z.string().optional(),
      similarPosts: z.array(z.string()).optional(),
    }),
})

const clientCases = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/client-cases',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      sector: z.string().optional(),
      teamSize: z.string().optional(),
      logo: image().optional(),
    }),
})

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
})

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
})

const developers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/developers' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
})

const apiCategories = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/api-categories',
  }),
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
  }),
})

const api = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/api' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    entity: z.string().optional(),
    category: z.string().optional(),
  }),
})

const glossary = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/glossary',
  }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    update: z.coerce.date().optional(),
    draft: z.boolean().optional(),
  }),
})

const translations = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/translations' }),
})

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
  }),
})

export const collections = {
  blog,
  'client-cases': clientCases,
  docs,
  guides,
  developers,
  'api-categories': apiCategories,
  api,
  glossary,
  translations,
  pages,
}
