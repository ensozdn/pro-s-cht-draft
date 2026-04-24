import { getBlogPost } from '../../../utils/markdown'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const { locale = 'tr' } = getQuery(event)
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Slug required' })
  const post = getBlogPost(String(locale), slug)
  if (!post) throw createError({ statusCode: 404, statusMessage: 'Not found' })
  return post
})
