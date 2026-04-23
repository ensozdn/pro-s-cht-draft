<template>
  <!-- HTML Overlay - Metin Katmanı -->
  <div class="content-wrapper">
    <section ref="section1El" class="content-section">
      <div class="glass-card">
        <h1 class="content-title">
          <span class="text-gradient">{{ $t('hero.title1') }}</span> {{ $t('hero.title2') }}
        </h1>
        <p class="content-description">
          {{ $t('hero.description') }}
        </p>
        <button class="cta-button">
          {{ $t('hero.cta') }}
        </button>
      </div>
    </section>

    <section ref="section2El" class="content-section">
      <div class="glass-card">
        <h1 class="content-title">
          <span class="text-gradient">{{ $t('section2.title1') }}</span> {{ $t('section2.title2') }}
        </h1>
        <p class="content-description">
          {{ $t('section2.description') }}
        </p>
        <button class="cta-button cta-button-secondary">
          {{ $t('section2.cta') }}
        </button>
      </div>
    </section>

    <section ref="section3El" class="content-section">
      <div class="glass-card">
        <h1 class="content-title">
          {{ $t('section3.title1') }} <span class="text-gradient">{{ $t('section3.title2') }}</span> {{ $t('section3.title3') }}
        </h1>
        <p class="content-description">
          {{ $t('section3.description') }}
        </p>
        <button class="cta-button">
          {{ $t('hero.cta') }}
        </button>
      </div>
    </section>

    <!-- İstatistikler Bölümü -->
    <section ref="statsSectionEl" class="content-section">
      <div class="glass-card stats-card">
        <h2 class="stats-title">{{ $t('stats.title') }} <span class="text-gradient">{{ $t('stats.brand') }}</span></h2>

        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">
              <span class="stat-number" data-target="99">0</span>
              <span class="stat-symbol">%</span>
            </div>
            <div class="stat-label">{{ $t('stats.accuracy') }}</div>
          </div>

          <div class="stat-item">
            <div class="stat-value">
              <span class="stat-number" data-target="15">0</span>
              <span class="stat-symbol">ms</span>
            </div>
            <div class="stat-label">{{ $t('stats.responseTime') }}</div>
          </div>

          <div class="stat-item">
            <div class="stat-value">
              <span class="stat-number" data-target="1000">0</span>
              <span class="stat-symbol">+</span>
            </div>
            <div class="stat-label">{{ $t('stats.throughput') }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const section1El = ref<HTMLElement | null>(null)
const section2El = ref<HTMLElement | null>(null)
const section3El = ref<HTMLElement | null>(null)
const statsSectionEl = ref<HTMLElement | null>(null)

defineExpose({ section1El, section2El, section3El, statsSectionEl })
</script>
