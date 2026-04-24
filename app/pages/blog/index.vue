<template>
  <main class="blog-page">
    <div class="blog-page-container">
      <div class="blog-page-header">
        <h1 class="blog-page-title">ProSicht <span class="text-gradient">Blog</span></h1>
        <p class="blog-page-subtitle">{{ $t('blog.title') }}</p>
      </div>

      <div class="blog-page-grid">
        <NuxtLink
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="blog-page-card group"
          :class="{ 'blog-page-card-featured': post.featured }"
        >
          <div class="blog-page-card-image">
            <img v-if="post.image" :src="post.image" :alt="post.title" />
            <div v-else class="blog-page-card-placeholder" />
          </div>
          <div class="blog-page-card-body">
            <div class="blog-page-tags">
              <span v-for="tag in post.tags" :key="tag" class="blog-tag">{{ tag }}</span>
            </div>
            <h2 class="blog-page-card-title">{{ post.title }}</h2>
            <p class="blog-page-card-desc">{{ post.description }}</p>
            <div class="blog-page-card-meta">
              <span class="blog-page-author">{{ post.author }}</span>
              <span class="blog-page-date">{{ post.date }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
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
}

const { locale } = useI18n()

const { data: posts } = await useFetch<BlogPost[]>('/api/content/blogs', {
  query: { locale: locale.value },
  default: () => [] as BlogPost[]
})

useSeoMeta({
  title: 'Blog | ProSicht',
  description: 'ProSicht AI kalite kontrol sistemleri hakkında güncel içerikler, sektör haberleri ve teknoloji yazıları.'
})
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  padding-top: 140px;
  padding-bottom: 6rem;
  background: var(--bg);
}

.blog-page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.blog-page-header {
  text-align: center;
  margin-bottom: 4rem;
}

.blog-page-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.dark .blog-page-title {
  color: #f1f5f9;
}

.blog-page-subtitle {
  font-size: 1.125rem;
  color: rgba(30, 41, 59, 0.6);
}

.dark .blog-page-subtitle {
  color: rgba(226, 232, 240, 0.6);
}

.blog-page-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

.blog-page-card {
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(61, 186, 162, 0.15);
  backdrop-filter: blur(12px);
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.dark .blog-page-card {
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(61, 186, 162, 0.2);
}

.blog-page-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(13, 124, 108, 0.15);
  border-color: rgba(61, 186, 162, 0.4);
}

.blog-page-card-featured {
  grid-column: span 2;
}

.blog-page-card-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.blog-page-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.blog-page-card:hover .blog-page-card-image img {
  transform: scale(1.05);
}

.blog-page-card-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0D7C6C22, #3DBAA222);
}

.blog-page-card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.blog-page-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.blog-page-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.4;
}

.dark .blog-page-card-title {
  color: #f1f5f9;
}

.blog-page-card-desc {
  font-size: 0.9rem;
  color: rgba(30, 41, 59, 0.65);
  line-height: 1.6;
  flex: 1;
}

.dark .blog-page-card-desc {
  color: rgba(226, 232, 240, 0.65);
}

.blog-page-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(30, 41, 59, 0.5);
  padding-top: 0.75rem;
  border-top: 1px solid rgba(61, 186, 162, 0.1);
}

.dark .blog-page-card-meta {
  color: rgba(226, 232, 240, 0.5);
}

@media (max-width: 768px) {
  .blog-page-title {
    font-size: 2rem;
  }

  .blog-page-grid {
    grid-template-columns: 1fr;
  }

  .blog-page-card-featured {
    grid-column: span 1;
  }
}
</style>
