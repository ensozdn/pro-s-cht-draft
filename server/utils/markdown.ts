import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  image: string
  locale: string
  featured: boolean
  body?: string
}

const CONTENT_DIR = join(process.cwd(), 'content', 'blog')

export function getBlogPosts(locale: string): BlogPost[] {
  const dir = join(CONTENT_DIR, locale)
  if (!existsSync(dir)) return []

  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const slug = file.replace('.md', '')
      const raw = readFileSync(join(dir, file), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? '',
        description: data.description ?? '',
        date: data.date ?? '',
        author: data.author ?? '',
        tags: data.tags ?? [],
        image: data.image ?? '',
        locale: data.locale ?? locale,
        featured: data.featured ?? false,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(locale: string, slug: string): BlogPost | null {
  const filePath = join(CONTENT_DIR, locale, `${slug}.md`)
  if (!existsSync(filePath)) return null

  const raw = readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    author: data.author ?? '',
    tags: data.tags ?? [],
    image: data.image ?? '',
    locale: data.locale ?? locale,
    featured: data.featured ?? false,
    body: marked(content) as string,
  }
}
