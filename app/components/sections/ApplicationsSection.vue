<template>
  <!-- Apple Style Horizontal Pinned Scroll -->
  <section ref="horizontalSectionEl" class="horizontal-scroll-section" id="applications">
    <div class="horizontal-scroll-wrapper">
      <!-- Sticky Title -->
      <div class="horizontal-title-container">
        <h2 class="horizontal-scroll-title">
          {{ $t('applications.title') }}
          <span class="text-gradient">{{ $t('applications.subtitle') }}</span>
        </h2>
      </div>

      <!-- Horizontal Track -->
      <div ref="horizontalTrackEl" class="horizontal-track">
        <div
          v-for="(category, index) in categories"
          :key="category.id"
          class="horizontal-card group"
        >
          <div class="horizontal-card-inner">
            <!-- Category Number Badge -->
            <div class="category-badge">
              <span class="category-number">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>

            <!-- Image Container -->
            <div class="horizontal-image-container">
              <div class="horizontal-image-wrapper">
                <img
                  v-if="category.image"
                  :src="category.image"
                  :alt="category.title"
                  class="horizontal-image"
                />
                <div v-else class="placeholder-icon-horizontal">
                  <svg class="w-20 h-20 text-teal-300/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="horizontal-card-content">
              <h3 class="horizontal-card-title">{{ category.title }}</h3>
              <p class="horizontal-card-description">{{ category.description }}</p>
            </div>

            <!-- Decorative Elements -->
            <div class="horizontal-card-glow"></div>
            <div class="horizontal-card-shine"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  categories: Array<{
    id: string
    title: string
    description: string
    image?: string
  }>
}>()

const horizontalSectionEl = ref<HTMLElement | null>(null)
const horizontalTrackEl = ref<HTMLElement | null>(null)

defineExpose({ horizontalSectionEl, horizontalTrackEl })
</script>
