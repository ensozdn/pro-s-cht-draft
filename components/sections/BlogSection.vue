<template>
  <section class="blog-section" id="blog">
    <div class="blog-container">
      <!-- Başlık -->
      <div class="blog-header">
        <h2 class="blog-title">ProSicht - <span class="text-gradient">{{ $t('blog.title') }}</span></h2>
      </div>

      <!-- Asimetrik Bento Grid -->
      <div class="blog-grid">
        <article
          v-for="post in blogPosts"
          :key="post.id"
          :class="['blog-card', 'group', { 'blog-card-featured': post.featured }]"
        >
          <!-- Resim Konteyneri -->
          <div class="blog-image-wrapper">
            <img
              :src="post.image"
              :alt="post.title"
              class="blog-image"
            />
          </div>

          <!-- İçerik -->
          <div class="blog-content">
            <!-- Etiketler -->
            <div class="blog-tags">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="blog-tag"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Başlık -->
            <h3 class="blog-post-title">{{ post.title }}</h3>

            <!-- Yazar ve Tarih -->
            <div class="blog-meta">
              <div class="blog-author">
                <div class="author-avatar">
                  <span class="author-initial">İ</span>
                </div>
                <span class="author-name">{{ post.author }}</span>
              </div>
              <span class="blog-date">{{ post.date }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Daha Fazla Göster Butonu -->
      <div class="blog-button-wrapper">
        <button class="blog-load-more">
          {{ $t('blog.allPosts') }}
          <svg class="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  blogPosts: Array<{
    id: number
    title: string
    image: string
    tags: string[]
    author: string
    date: string
    featured: boolean
  }>
}>()
</script>
