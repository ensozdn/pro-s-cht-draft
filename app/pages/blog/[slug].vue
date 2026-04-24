<template>
  <main class="blog-detail-page">
    <div class="blog-detail-container">

      <NuxtLink to="/blog" class="back-link">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="back-icon">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Blog
      </NuxtLink>

      <article v-if="post" class="blog-article">
        <header class="blog-article-header">
          <div class="blog-detail-tags">
            <span v-for="tag in post.tags" :key="tag" class="blog-tag">{{ tag }}</span>
          </div>
          <h1 class="blog-article-title">{{ post.title }}</h1>
          <p class="blog-article-desc">{{ post.description }}</p>
          <div class="blog-article-meta">
            <div class="blog-article-author">
              <div class="author-avatar-lg">
                <span>{{ post.author?.charAt(0) }}</span>
              </div>
              <span class="author-name-lg">{{ post.author }}</span>
            </div>
            <span class="blog-article-date">{{ post.date }}</span>
          </div>
        </header>

        <div v-if="post.image" class="blog-article-cover">
          <img :src="post.image" :alt="post.title" />
        </div>

        <div class="blog-article-body prose">
          <div v-html="post.body" />
        </div>
      </article>

      <div v-else class="blog-not-found">
        <p>İçerik bulunamadı.</p>
        <NuxtLink to="/blog" class="back-link">Bloga dön</NuxtLink>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blog' })

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  image: string
  locale: string
  featured: boolean
  body: string
}

const route = useRoute()
const { locale } = useI18n()

const { data: post } = await useFetch<BlogPost>(`/api/content/blog/${route.params.slug}`, {
  query: { locale: locale.value },
})

if (post.value) {
  useSeoMeta({
    title: `${post.value.title} | ProSicht Blog`,
    description: post.value.description,
    ogTitle: post.value.title,
    ogDescription: post.value.description,
    ogImage: post.value.image
  })
}
</script>

<style scoped>
.blog-detail-page {
  min-height: 100vh;
  padding-top: 140px;
  padding-bottom: 6rem;
}

.blog-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3DBAA2;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 2.5rem;
  transition: gap 0.2s ease;
}

.back-link:hover {
  gap: 0.75rem;
}

.back-icon {
  width: 18px;
  height: 18px;
}

.blog-article-header {
  margin-bottom: 2.5rem;
}

.blog-detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.blog-article-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.3;
  margin-bottom: 1rem;
}

.dark .blog-article-title {
  color: #f1f5f9;
}

.blog-article-desc {
  font-size: 1.1rem;
  color: rgba(30, 41, 59, 0.65);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.dark .blog-article-desc {
  color: rgba(226, 232, 240, 0.65);
}

.blog-article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 1px solid rgba(61, 186, 162, 0.15);
  border-bottom: 1px solid rgba(61, 186, 162, 0.15);
}

.blog-article-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar-lg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0D7C6C, #3DBAA2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
}

.author-name-lg {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
}

.dark .author-name-lg {
  color: #e2e8f0;
}

.blog-article-date {
  font-size: 0.85rem;
  color: rgba(30, 41, 59, 0.5);
}

.dark .blog-article-date {
  color: rgba(226, 232, 240, 0.5);
}

.blog-article-cover {
  margin-bottom: 2.5rem;
  border-radius: 1rem;
  overflow: hidden;
  max-height: 480px;
}

.blog-article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-article-body {
  font-size: 1.05rem;
  line-height: 1.85;
  color: rgba(30, 41, 59, 0.85);
}

.dark .blog-article-body {
  color: rgba(226, 232, 240, 0.85);
}

.blog-article-body :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 2rem 0 1rem;
}

.dark .blog-article-body :deep(h2) {
  color: #f1f5f9;
}

.blog-article-body :deep(h3) {
  font-size: 1.2rem;
  font-weight: 600;
  color: #0D7C6C;
  margin: 1.5rem 0 0.75rem;
}

.blog-article-body :deep(p) {
  margin-bottom: 1.25rem;
}

.blog-article-body :deep(strong) {
  color: #0D7C6C;
  font-weight: 700;
}

.blog-article-body :deep(ul),
.blog-article-body :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.blog-article-body :deep(li) {
  margin-bottom: 0.5rem;
}

.blog-not-found {
  text-align: center;
  padding: 4rem 0;
  color: rgba(30, 41, 59, 0.5);
}

@media (max-width: 768px) {
  .blog-article-title {
    font-size: 1.6rem;
  }

  .blog-article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>
