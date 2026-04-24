import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        author: z.string(),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        locale: z.string().default('tr'),
        featured: z.boolean().default(false),
      })
    })
  }
})
