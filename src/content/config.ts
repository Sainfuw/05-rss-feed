import { defineCollection, reference, z } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      image: image().refine((v) => v !== undefined, {
        message: 'Image is required',
      }),
      tags: z.array(z.string()),
      // author: z.string(),
      author: reference('author'),
      isDraft: z.boolean().optional().default(false),
    }),
})

const authorCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image().refine((v) => v !== undefined, {
        message: 'Image is required',
      }),
      twitter: z.string().optional(),
      linkedIn: z.string().optional(),
      github: z.string().optional(),
      bio: z.string(),
      subtitle: z.string(),
    }),
})

export const collections = {
  blog: blogCollection,
  author: authorCollection,
}
