<template>
  <section class="blog-section" id="blog">
    <div class="blog-container">
      <!-- Başlık -->
      <div class="blog-header">
        <h2 class="blog-title">ProSicht - <span class="text-gradient">{{ $t('blog.title') }}</span></h2>
      </div>

      <!-- Asimetrik Bento Grid -->
      <div class="blog-grid">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="`/blog/${post.stem?.split('/').pop()}`"
          :class="['blog-card', 'group', { 'blog-card-featured': post.featured }]"
        >
          <div class="blog-image-wrapper">
            <img :src="post.image" :alt="post.title" class="blog-image" />
          </div>

          <div class="blog-content">
            <div class="blog-tags">
              <span v-for="tag in post.tags" :key="tag" class="blog-tag">{{ tag }}</span>
            </div>

            <h3 class="blog-post-title">{{ post.title }}</h3>

            <div class="blog-meta">
              <div class="blog-author">
                <div class="author-avatar">
                  <span class="author-initial">{{ post.author?.charAt(0) }}</span>
                </div>
                <span class="author-name">{{ post.author }}</span>
              </div>
              <span class="blog-date">{{ post.date }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="blog-button-wrapper">
        <NuxtLink to="/blog" class="blog-load-more">
          {{ $t('blog.allPosts') }}
          <svg class="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const { data: posts } = await useAsyncData(
  `blog-section-${locale.value}`,
  () => queryCollection('blog')
    .where('locale', '=', locale.value)
    .order('date', 'DESC')
    .limit(3)
    .all()
)
</script>
