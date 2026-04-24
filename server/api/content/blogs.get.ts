import { getBlogPosts } from '../../utils/markdown'

export default defineEventHandler((event) => {
  const { locale = 'tr', limit } = getQuery(event)
  const posts = getBlogPosts(String(locale))
  return limit ? posts.slice(0, Number(limit)) : posts
})
