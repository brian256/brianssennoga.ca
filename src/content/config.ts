import { defineCollection, z } from 'astro:content';

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const thoughts = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    url: z.string().url(),
    source: z.string().default('LinkedIn'),
    tag: z.string().optional(),
  }),
});

export const collections = { writing, thoughts };
