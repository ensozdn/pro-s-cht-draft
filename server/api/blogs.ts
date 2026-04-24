import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const locale = (query.locale as string) || 'tr'

  const dir = join(process.cwd(), 'content', 'blog', locale)

  let files: string[] = []
  try {
    files = readdirSync(dir).filter(f => f.endsWith('.md'))
  } catch {
    return []
  }

  const posts = files.map(file => {
    const raw = readFileSync(join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug: file.replace(/\.md$/, ''),
      title: data.title ?? '',
      description: data.description ?? '',
      date: data.date ?? '',
      author: data.author ?? '',
      tags: data.tags ?? [],
      image: data.image ?? '',
      locale: data.locale ?? locale,
      featured: data.featured ?? false,
      content
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
