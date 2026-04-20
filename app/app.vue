<template>
  <div :class="isDark ? 'bg-slate-900' : 'bg-slate-50'" class="overflow-x-hidden w-full">
    <Preloader ref="preloaderComponent" />
    
    <AppHeader :is-dark="isDark" @toggle-menu="isMobileMenuOpen = true" />
    
    <MobileDrawer :is-open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />

    <!-- Fixed Three.js canvas -->
    <div class="scene-container">
      <canvas ref="canvasRef" />
    </div>
    
    <!-- HTML Overlay - Metin Katmanı -->
    <div class="content-wrapper">
      <section ref="section1" class="content-section">
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
      
      <section ref="section2" class="content-section">
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
      
      <section ref="section3" class="content-section">
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
      <section ref="statsSection" class="content-section">
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

    <!-- Neden Biz? Bölümü -->
    <section class="why-us-section">
      <div class="why-us-container">
        <h2 class="why-us-title">{{ $t('whyUs.title') }} <span class="text-gradient">{{ $t('whyUs.subtitle') }}</span></h2>
        
        <div class="why-us-grid">
          <div
            v-for="feature in whyUsFeatures"
            :key="feature.title"
            class="feature-card"
          >
            <div class="feature-icon">
              <svg v-if="feature.icon === 'Rocket'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <svg v-else-if="feature.icon === 'BrainCircuit'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <svg v-else-if="feature.icon === 'Users'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <svg v-else-if="feature.icon === 'Activity'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Uygulama Alanlarımız - Tab Yapısı -->
    <section ref="sectorsSection" class="applications-section-scroll">
      <div class="applications-scroll-container">
        <h2 class="applications-scroll-title">{{ $t('applications.title') }} <span class="text-gradient">{{ $t('applications.subtitle') }}</span></h2>
        
        <div 
          v-for="(category, index) in categories" 
          :key="category.id"
          :ref="el => { if (el) categoryRefs[index] = el as HTMLElement }"
          class="category-fullscreen"
        >
          <div class="category-content">
            <div class="category-left">
              <h3 class="category-title-large">{{ category.title }}</h3>
              <p class="category-description-large">{{ category.description }}</p>
            </div>
            <div class="category-right">
              <div class="category-image-container">
                <img 
                  v-if="category.image" 
                  :src="category.image" 
                  :alt="category.title"
                  class="category-image-large"
                />
                <div v-else class="placeholder-icon">
                  <svg class="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- InspectAI'ın İşletmeye Katkıları -->
    <section class="contributions-section">
      <div class="contributions-container">
        <h2 class="contributions-title">{{ $t('contributions.title') }} <span class="text-gradient">{{ $t('contributions.subtitle') }}</span></h2>
        
        <div class="contributions-grid">
          <div
            v-for="contribution in contributions"
            :key="contribution.title"
            class="contribution-card"
          >
            <div class="contribution-icon-wrapper">
              <div class="contribution-icon">
                <svg v-if="contribution.icon === 'CheckCircle'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else-if="contribution.icon === 'TrendingDown'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                <svg v-else-if="contribution.icon === 'Smile'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else-if="contribution.icon === 'ShieldAlert'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                </svg>
                <svg v-else-if="contribution.icon === 'Zap'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <svg v-else-if="contribution.icon === 'BarChart'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <h3 class="contribution-title">{{ contribution.title }}</h3>
            <p class="contribution-description">{{ contribution.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LOKMA 22: Partnerler ve İşbirlikleri -->
    <section class="partners-section">
      <div class="partners-container">
        <!-- Başlık ve Alt Çizgi -->
        <div class="partners-header">
          <h2 class="partners-title">Partnerlerimiz ve İşbirliklerimiz</h2>
          <div class="partners-divider"></div>
        </div>

        <!-- Partnerler Grid -->
        <div class="partners-grid">
          <div
            v-for="partner in partners"
            :key="partner.name"
            class="partner-card"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="partner-logo"
              :title="partner.name"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- LOKMA 23: Blog & Haberler (Asimetrik Bento Grid) -->
    <section class="blog-section">
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

    <!-- İletişim Bölümü -->
    <section ref="contactSection" class="contact-section">
      <div class="contact-container">
        <h2 class="contact-main-title">{{ $t('nav.contact') }}</h2>
        
        <div class="contact-grid">
          <!-- Sol: Harita -->
          <div class="map-wrapper">
            <div class="map-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.1234567890!2d30.123456!3d40.789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSakarya%20Teknokent!5e0!3m2!1str!2str!4v1234567890"
                class="map-iframe"
                :allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <!-- Sağ: İletişim Bilgileri -->
          <div class="contact-info-wrapper">
            <h3 class="contact-info-title">{{ $t('contact.title') }}</h3>
            
            <div class="contact-list">
              <div
                v-for="(contact, index) in contactInfo"
                :key="index"
                class="contact-info-item"
              >
                <div class="contact-icon-wrapper">
                  <svg v-if="contact.icon === 'MapPin'" class="contact-svg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <svg v-else-if="contact.icon === 'Phone'" class="contact-svg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <svg v-else-if="contact.icon === 'Mail'" class="contact-svg-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p class="contact-info-text">{{ contact.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bize Ulaşın Formu -->
    <section class="contact-form-section">
      <div class="form-outer-container">
        <div class="form-glass-card">
          <h2 class="form-main-title">{{ $t('nav.contact') }} <span class="text-gradient"></span></h2>
          
          <form @submit.prevent="handleSubmit" class="premium-form">
            <!-- İsim ve Soyisim -->
            <div class="form-grid-row">
              <div class="form-field">
                <input
                  v-model="form.firstName"
                  type="text"
                  :placeholder="$t('form.firstName')"
                  class="form-elite-input"
                  required
                />
              </div>
              <div class="form-field">
                <input
                  v-model="form.lastName"
                  type="text"
                  :placeholder="$t('form.lastName')"
                  class="form-elite-input"
                  required
                />
              </div>
            </div>

            <!-- E-posta ve Telefon -->
            <div class="form-grid-row">
              <div class="form-field">
                <input
                  v-model="form.email"
                  type="email"
                  :placeholder="$t('form.email')"
                  class="form-elite-input"
                  required
                />
              </div>
              <div class="form-field">
                <input
                  v-model="form.phone"
                  type="tel"
                  :placeholder="$t('form.phone')"
                  class="form-elite-input"
                  required
                />
              </div>
            </div>

            <!-- Uygulama Alanı -->
            <div class="form-grid-full">
              <div class="form-field">
                <select
                  v-model="form.applicationArea"
                  class="form-elite-input form-select"
                  required
                >
                  <option value="" disabled selected>{{ $t('form.selectArea') }}</option>
                  <option
                    v-for="area in applicationAreas"
                    :key="area.value"
                    :value="area.value"
                  >
                    {{ area.label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Mesaj -->
            <div class="form-grid-full">
              <div class="form-field">
                <textarea
                  v-model="form.message"
                  :placeholder="$t('form.message')"
                  rows="5"
                  class="form-elite-input form-textarea"
                  required
                ></textarea>
              </div>
            </div>

            <!-- Gönder Butonu -->
            <div class="form-submit-wrapper">
              <button type="submit" class="form-premium-button">
                <span class="button-text">{{ $t('form.submit') }}</span>
                <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Eski Form Bölümü (Yedek) -->
    <section class="old-contact-form-section" style="display: none;">
      <div class="contact-container">
        <div class="contact-content">
          <div class="contact-info">
            <h2 class="contact-title">
              Üretiminizi <span class="text-gradient">Yapay Zeka</span> İle Dönüştürün
            </h2>
            <p class="contact-description">
              ProSicht ile kalite kontrolünüzü yeni nesil teknolojiye taşıyın. 
              Ücretsiz demo için hemen iletişime geçin.
            </p>
            <div class="contact-details">
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <span>info@prosicht.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span>+90 (212) 555 00 00</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <form class="contact-form">
              <div class="form-group">
                <input 
                  type="text" 
                  placeholder="Adınız Soyadınız" 
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <input 
                  type="email" 
                  placeholder="E-posta Adresiniz" 
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <input 
                  type="tel" 
                  placeholder="Telefon Numaranız" 
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <textarea 
                  placeholder="Mesajınız" 
                  rows="4" 
                  class="form-input"
                ></textarea>
              </div>
              <button type="submit" class="form-button">
                Demo Talebinde Bulun
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />

    <div ref="scrollAreaRef" class="scroll-area"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, provide } from 'vue'
import * as THREE from 'three'
import AppHeader from '../components/layout/AppHeader.vue'
import MobileDrawer from '../components/layout/MobileDrawer.vue'
import Preloader from '../components/layout/Preloader.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import { useTheme } from '../composables/useTheme'
import '../assets/styles/main.css'

const { isDark, toggleTheme, initTheme } = useTheme()
const { t, locale } = useI18n()  // locale'i de alıyoruz reactive olması için

provide('toggleTheme', toggleTheme)

const isMobileMenuOpen = ref(false)
const preloaderComponent = ref<InstanceType<typeof Preloader>>()

// Categories - i18n ile FULL reactive
const categories = computed(() => {
  const currentLocale = locale.value  // Reactive dependency
  return [
    {
      id: 'metal-celik',
      title: t('categories.metalSteel.title'),
      description: t('categories.metalSteel.description'),
      image: '/images/metal-celik.png'
    },
    {
      id: 'deri',
      title: t('categories.leather.title'),
      description: t('categories.leather.description'),
      image: '/images/deri.png'
    },
    {
      id: 'tekstil',
      title: t('categories.textile.title'),
      description: t('categories.textile.description'),
      image: '/images/tekstil.png'
    },
    {
      id: 'mobilya',
      title: t('categories.furniture.title'),
      description: t('categories.furniture.description'),
      image: '/images/mobilya.png'
    },
    {
      id: 'mermer',
      title: t('categories.marble.title'),
      description: t('categories.marble.description'),
      image: '/images/mermer.png'
    },
    {
      id: 'cam',
      title: t('categories.glass.title'),
      description: t('categories.glass.description'),
      image: '/images/cam.png'
    },
    {
      id: 'son-kalite',
      title: t('categories.finalQuality.title'),
      description: t('categories.finalQuality.description'),
      image: '/images/son-kalite.png'
    }
  ]
})

// Neden Biz? Features - i18n ile FULL reactive
const whyUsFeatures = computed(() => {
  // locale.value'yu kullanarak computed'ın locale değişikliğini izlemesini sağlıyoruz
  const currentLocale = locale.value
  
  return [
    {
      title: t('whyUs.speed.title'),
      desc: t('whyUs.speed.description'),
      icon: 'Rocket'
    },
    {
      title: t('whyUs.ai.title'),
      desc: t('whyUs.ai.description'),
      icon: 'BrainCircuit'
    },
    {
      title: t('whyUs.support.title'),
      desc: t('whyUs.support.description'),
      icon: 'Users'
    },
    {
      title: t('whyUs.realtime.title'),
      desc: t('whyUs.realtime.description'),
      icon: 'Activity'
    }
  ]
})

// InspectAI'ın İşletmeye Katkıları - i18n ile FULL reactive
const contributions = computed(() => {
  // locale.value'yu kullanarak computed'ın locale değişikliğini izlemesini sağlıyoruz
  const currentLocale = locale.value
  
  return [
    {
      title: t('contributions.quality.title'),
      desc: t('contributions.quality.description'),
      icon: 'CheckCircle'
    },
    {
      title: t('contributions.reduce.title'),
      desc: t('contributions.reduce.description'),
      icon: 'TrendingDown'
    },
    {
      title: t('contributions.satisfaction.title'),
      desc: t('contributions.satisfaction.description'),
      icon: 'Smile'
    },
    {
      title: t('contributions.recall.title'),
      desc: t('contributions.recall.description'),
      icon: 'ShieldAlert'
    },
    {
      title: t('contributions.efficiency.title'),
      desc: t('contributions.efficiency.description'),
      icon: 'Zap'
    },
    {
      title: t('contributions.compliance.title'),
      desc: t('contributions.compliance.description'),
      icon: 'BarChart'
    }
  ]
})

// İletişim Bilgileri - i18n ile FULL reactive
const contactInfo = computed(() => {
  const currentLocale = locale.value  // Reactive dependency
  return [
    {
      icon: 'MapPin',
      text: t('contact.location.tr1')
    },
    {
      icon: 'MapPin',
      text: t('contact.location.tr2')
    },
    {
      icon: 'Phone',
      text: t('contact.phone.tr')
    },
    {
      icon: 'MapPin',
      text: t('contact.location.germany')
    },
    {
      icon: 'Phone',
      text: t('contact.phone.germany')
    },
    {
      icon: 'Mail',
      text: t('contact.email')
    }
  ]
})

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  applicationArea: '',
  message: ''
})

// Application Areas - i18n ile FULL reactive
const applicationAreas = computed(() => {
  const currentLocale = locale.value  // Reactive dependency
  return [
    { value: 'metal-celik', label: t('form.areas.metalSteel') },
    { value: 'deri', label: t('form.areas.leather') },
    { value: 'tekstil', label: t('form.areas.textile') },
    { value: 'mobilya', label: t('form.areas.furniture') },
    { value: 'mermer', label: t('form.areas.marble') },
    { value: 'cam', label: t('form.areas.glass') },
    { value: 'son-kalite', label: t('form.areas.finalQuality') }
  ]
})

const handleSubmit = () => {
  console.log('Form gönderildi:', form.value)
  // Form submit logic buraya eklenebilir
  alert('Mesajınız başarıyla gönderildi!')
  
  // Form reset
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    applicationArea: '',
    message: ''
  }
}

// LOKMA 22: Partnerler ve İşbirlikleri
const partners = ref([
  { name: 'KOSGEB', logo: '/images/partners/kosgeb.png' },
  { name: 'TÜBİTAK', logo: '/images/partners/tubitak.png' },
  { name: 'BTM', logo: '/images/partners/btm.png' },
  { name: 'Sakarya Uygulamalı Bilimler Üniversitesi', logo: '/images/partners/subu.png' },
  { name: 'TOYOTA', logo: '/images/partners/toyota.png' },
  { name: 'İTÜ Çekirdek', logo: '/images/partners/itu-cekirdek.png' },
  { name: 'Ford', logo: '/images/partners/ford.png' },
  { name: 'Sakarya Üniversitesi', logo: '/images/partners/sau.png' },
  { name: 'Sakarya Teknokent', logo: '/images/partners/sakarya-teknokent.png' },
  { name: 'NVIDIA Inception Program', logo: '/images/partners/nvidia.png' },
  { name: 'Bilişim Vadisi', logo: '/images/partners/bilisim-vadisi.png' }
])

// LOKMA 23: Blog & Haberler (Asimetrik Bento Grid) - i18n ile FULL reactive
const blogPosts = computed(() => {
  const currentLocale = locale.value  // Reactive dependency
  return [
    {
      id: 1,
      title: t('blog.post1.title'),
      image: '/images/blog/blog1.jpg',
      tags: ['AI', 'Endüstri 4.0', 'Technology'],  // Tags statik kalabilir
      author: t('blog.post1.author'),
      date: t('blog.post1.date'),
      featured: true
    },
    {
      id: 2,
      title: t('blog.post2.title'),
      image: '/images/blog/blog2.jpg',
      tags: ['AI', 'Endüstri 4.0', 'Technology'],
      author: t('blog.post2.author'),
      date: t('blog.post2.date'),
      featured: false
    },
    {
      id: 3,
      title: t('blog.post3.title'),
      image: '/images/blog/blog3.jpg',
      tags: ['AI', 'Technology'],
      author: t('blog.post3.author'),
      date: t('blog.post3.date'),
      featured: false
    }
  ]
})

const categoryRefs = ref<(HTMLElement | null)[]>([])
const activeTab = ref('metal-celik')
const activeCategory = computed(() => categories.value.find(c => c.id === activeTab.value))

// Buton pozisyonları - her butonu ayrı ayarla
const getButtonStyle = (buttonId: string) => {
  const positions: Record<string, string> = {
    'metal-celik': '0px',    // Metal-Çelik
    'deri': '0px',           // Deri
    'tekstil': '2px',        // Tekstil (şu an 2px aşağıda)
    'mobilya': '0px',        // Mobilya
    'mermer': '0px',         // Mermer
    'cam': '0px',            // Cam
    'son-kalite': '0px'      // Son Kalite Kontrol
  }
  
  const translateY = positions[buttonId] || '0px'
  return { transform: `translateY(${translateY})` }
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const scrollAreaRef = ref<HTMLDivElement | null>(null)
const section1 = ref<HTMLElement | null>(null)
const section2 = ref<HTMLElement | null>(null)
const section3 = ref<HTMLElement | null>(null)
const statsSection = ref<HTMLElement | null>(null)
const sectorsSection = ref<HTMLElement | null>(null)
const sectorsContainer = ref<HTMLDivElement | null>(null)
const contactSection = ref<HTMLElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let conveyorGroup: THREE.Group
let animationId: number
let lenis: any
let beltMaterial: THREE.MeshStandardMaterial
let rollerMaterial: THREE.MeshStandardMaterial

// Mouse parallax değişkenleri
const mouse = { x: 0, y: 0 }
const targetRotation = { x: 0, y: 0 }
const currentRotation = { x: 0, y: 0 }

// Resize handler
const handleResize = () => {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Mouse move handler - Parallax efekti
const handleMouseMove = (event: MouseEvent) => {
  // Fare koordinatlarını normalize et (-1 ile 1 arası)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  
  // Hedef rotasyonu hafif bir şekilde ayarla
  targetRotation.x = mouse.y * 0.15
  targetRotation.y = mouse.x * 0.15
}

onMounted(async () => {
  if (!canvasRef.value) return

  initTheme()

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const loadingProgress = { value: 0 }
  
  gsap.to(loadingProgress, {
    value: 100,
    duration: 2,
    ease: 'power2.inOut',
    onUpdate: () => {
      const progress = Math.round(loadingProgress.value)
      
      // Update progress bar
      if (preloaderComponent.value?.preloaderBarEl) {
        preloaderComponent.value.preloaderBarEl.style.width = `${progress}%`
      }
      
      // Update percentage text
      if (preloaderComponent.value?.preloaderTextEl) {
        preloaderComponent.value.preloaderTextEl.textContent = `${progress}%`
      }
    },
    onComplete: () => {
      if (!preloaderComponent.value?.preloaderEl) return
      
      // Exit animation - slide up
      gsap.to(preloaderComponent.value.preloaderEl, {
        y: '-100%',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          if (preloaderComponent.value?.preloaderEl) {
            preloaderComponent.value.preloaderEl.style.display = 'none'
          }
          
          if (section1.value) {
            const heroElements = section1.value.querySelectorAll('.content-title, .content-description, .cta-button')
            gsap.fromTo(
              heroElements,
              { opacity: 0, y: 30 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
              }
            )
          }
          
          // 3D model fade-in
          gsap.to([beltMaterial, rollerMaterial], {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out'
          })
        }
      })
    }
  })

  // Lenis Smooth Scroll başlat
  const Lenis = (await import('lenis')).default
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  })

  // Lenis ve GSAP ScrollTrigger senkronizasyonu
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  // Sahne oluştur
  scene = new THREE.Scene()

  // Kamera oluştur
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 2, 5)
  camera.lookAt(0, 0, 0)

  // Renderer oluştur
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // LOKMA 30: Premium Işıklandırma (Metalik Yansımalar İçin)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)  // Artırıldı
  scene.add(ambientLight)

  // Ana Directional Light (Güçlü, keskin gölgeler)
  const mainLight = new THREE.DirectionalLight(0xffffff, 1.8)  // Artırıldı
  mainLight.position.set(6, 10, 8)
  mainLight.castShadow = true
  scene.add(mainLight)

  // Dolgu ışığı (Gölge detayları için)
  const fillLight = new THREE.DirectionalLight(0xaaccff, 0.6)
  fillLight.position.set(-6, 4, -6)
  scene.add(fillLight)

  // Spot ışık (Metalik highlight için)
  const spotLight1 = new THREE.SpotLight(0xffffff, 2.0)  // Artırıldı
  spotLight1.position.set(7, 7, 7)
  spotLight1.angle = Math.PI / 3
  scene.add(spotLight1)

  // Turkuaz accent ışık
  const accentLight = new THREE.SpotLight(0x3DBAA2, 1.2)  // Artırıldı
  accentLight.position.set(-4, 5, 4)
  accentLight.angle = Math.PI / 4
  scene.add(accentLight)

  // LOKMA 30: AĞIR SANAYİ ENDÜSTRİYEL YAPAY ZEKA KAMERASI 🏭
  conveyorGroup = new THREE.Group()

  
  // 1. PREMIUM METALİK MATERYALLER
  const titaniumMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,        // Titanyum/Gümüş
    metalness: 0.85,
    roughness: 0.25,
    transparent: true,
    opacity: 0
  })

  const matBlackMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,        // Mat Siyah
    metalness: 0.3,
    roughness: 0.8,
    transparent: true,
    opacity: 0
  })

  const neonTurquoiseMaterial = new THREE.MeshStandardMaterial({
    color: 0x3DBAA2,        // Bizim turkuaz
    emissive: 0x3DBAA2,
    emissiveIntensity: 1.5, // Parlayan halka
    metalness: 0.4,
    roughness: 0.3,
    transparent: true,
    opacity: 0
  })

  // ═══════════════════════════════════════════════════════════════
  //  2. KASLI GÖVDE İNŞASI (Köşeli Prizma Yapı)
  // ═══════════════════════════════════════════════════════════════
  
  // Ana gövde (8 kenarlı prizma - köşeli)
  const mainBodyGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.2, 8)
  const mainBody = new THREE.Mesh(mainBodyGeo, titaniumMaterial)
  mainBody.rotation.z = Math.PI / 2  // Yatay
  mainBody.position.set(0, 0, 0)
  conveyorGroup.add(mainBody)

  // Ön kalın çerçeve (mat siyah)
  const frontRingGeo = new THREE.CylinderGeometry(0.45, 0.4, 0.15, 8)
  const frontRing = new THREE.Mesh(frontRingGeo, matBlackMaterial)
  frontRing.rotation.z = Math.PI / 2
  frontRing.position.set(0.7, 0, 0)
  conveyorGroup.add(frontRing)

  // Arka kalın segment (titanyum)
  const backSegmentGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.4, 8)
  const backSegment = new THREE.Mesh(backSegmentGeo, titaniumMaterial)
  backSegment.rotation.z = Math.PI / 2
  backSegment.position.set(-0.7, 0, 0)
  conveyorGroup.add(backSegment)

  // ═══════════════════════════════════════════════════════════════
  //  3. SOĞUTUCU IZGARALAR (Heat Sinks - KALDIRILDI) ❌
  // ═══════════════════════════════════════════════════════════════
  
  // Üst parçalar kaldırıldı - daha temiz görünüm
  
  // Sadece alt kanatçıklar ve paneller kalacak
  const heatSinkGeo = new THREE.BoxGeometry(0.12, 0.5, 0.03)
  const heatSinkPositions = [-0.3, -0.15, 0, 0.15, 0.3]
  
  heatSinkPositions.forEach(xPos => {
    // Üst kanatçık - KALDIRILDI ❌
    // const topFin = new THREE.Mesh(heatSinkGeo, matBlackMaterial)
    // topFin.position.set(xPos, 0.43, 0)
    // conveyorGroup.add(topFin)
    
    // Alt kanatçık
    const bottomFin = new THREE.Mesh(heatSinkGeo, matBlackMaterial)
    bottomFin.position.set(xPos, -0.43, 0)
    conveyorGroup.add(bottomFin)
  })

  // Yan soğutucu paneller
  const sidePanelGeo = new THREE.BoxGeometry(0.8, 0.06, 0.48)
  
  // Üst panel - KALDIRILDI ❌
  // const topPanel = new THREE.Mesh(sidePanelGeo, matBlackMaterial)
  // topPanel.position.set(0, 0.46, 0)
  // conveyorGroup.add(topPanel)
  
  const bottomPanel = new THREE.Mesh(sidePanelGeo, matBlackMaterial)
  bottomPanel.position.set(0, -0.46, 0)
  conveyorGroup.add(bottomPanel)

  // ═══════════════════════════════════════════════════════════════
  //  4. KADEMELİ LENS KASASI (3 Katman)
  // ═══════════════════════════════════════════════════════════════
  
  // Katman 1: Dış (gümüş, büyük)
  const lensHood1Geo = new THREE.CylinderGeometry(0.45, 0.42, 0.2, 16)
  const lensHood1 = new THREE.Mesh(lensHood1Geo, titaniumMaterial)
  lensHood1.rotation.z = Math.PI / 2
  lensHood1.position.set(0.9, 0, 0)
  conveyorGroup.add(lensHood1)

  // Katman 2: Orta (mat siyah, orta)
  const lensHood2Geo = new THREE.CylinderGeometry(0.40, 0.38, 0.15, 16)
  const lensHood2 = new THREE.Mesh(lensHood2Geo, matBlackMaterial)
  lensHood2.rotation.z = Math.PI / 2
  lensHood2.position.set(1.05, 0, 0)
  conveyorGroup.add(lensHood2)

  // Katman 3: İç (turkuaz neon ring)
  const neonRingGeo = new THREE.TorusGeometry(0.35, 0.04, 16, 32)
  const neonRing = new THREE.Mesh(neonRingGeo, neonTurquoiseMaterial)
  neonRing.rotation.y = Math.PI / 2
  neonRing.position.set(1.13, 0, 0)
  conveyorGroup.add(neonRing)

  // Lens cam (koyu, gümüş kenarlı)
  const lensGlassGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.05, 32)
  const lensGlass = new THREE.Mesh(lensGlassGeo, new THREE.MeshPhysicalMaterial({
    color: 0x334455,
    metalness: 0,
    roughness: 0.1,
    transmission: 0.7,
    thickness: 0.3,
    transparent: true,
    opacity: 0
  }))
  lensGlass.rotation.z = Math.PI / 2
  lensGlass.position.set(1.15, 0, 0)
  conveyorGroup.add(lensGlass)

  // Sensör merkezi
  const sensorGeo = new THREE.CircleGeometry(0.12, 32)
  const sensor = new THREE.Mesh(sensorGeo, matBlackMaterial)
  sensor.rotation.y = Math.PI / 2
  sensor.position.set(1.16, 0, 0)
  conveyorGroup.add(sensor)

  // ═══════════════════════════════════════════════════════════════
  //  5. MONTAJ BRAKETİ (Kalın L-Braket - Alt)
  // ═══════════════════════════════════════════════════════════════
  
  // Ana dikey blok (kalın, köşeli)
  const bracketVerticalGeo = new THREE.BoxGeometry(0.2, 0.6, 0.2)
  const bracketVertical = new THREE.Mesh(bracketVerticalGeo, matBlackMaterial)
  bracketVertical.position.set(0, -0.6, 0)
  conveyorGroup.add(bracketVertical)

  // Yatay montaj plakası
  const bracketHorizontalGeo = new THREE.BoxGeometry(0.7, 0.12, 0.3)
  const bracketHorizontal = new THREE.Mesh(bracketHorizontalGeo, titaniumMaterial)
  bracketHorizontal.position.set(0, -0.9, 0)
  conveyorGroup.add(bracketHorizontal)

  // Yan destek kanatları (L-şekil güçlendirme)
  const supportWingGeo = new THREE.BoxGeometry(0.15, 0.25, 0.08)
  
  const leftWing = new THREE.Mesh(supportWingGeo, matBlackMaterial)
  leftWing.rotation.z = Math.PI / 6
  leftWing.position.set(-0.15, -0.7, -0.12)
  conveyorGroup.add(leftWing)
  
  const rightWing = new THREE.Mesh(supportWingGeo, matBlackMaterial)
  rightWing.rotation.z = -Math.PI / 6
  rightWing.position.set(-0.15, -0.7, 0.12)
  conveyorGroup.add(rightWing)

  // ═══════════════════════════════════════════════════════════════
  //  6. VİDALAR VE DETAYLAR (16 Adet Vida)
  // ═══════════════════════════════════════════════════════════════
  
  const boltGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.05, 6)
  const boltHeadGeo = new THREE.CylinderGeometry(0.03, 0.02, 0.01, 6)
  
  // 8 vida ön lens çevresinde
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    const bolt = new THREE.Mesh(boltGeo, matBlackMaterial)
    bolt.rotation.z = Math.PI / 2
    bolt.position.set(
      0.88,
      Math.cos(angle) * 0.42,
      Math.sin(angle) * 0.42
    )
    conveyorGroup.add(bolt)
    
    const boltHead = new THREE.Mesh(boltHeadGeo, matBlackMaterial)
    boltHead.rotation.z = Math.PI / 2
    boltHead.position.set(
      0.9,
      Math.cos(angle) * 0.42,
      Math.sin(angle) * 0.42
    )
    conveyorGroup.add(boltHead)
  }

  // 8 vida arka segment
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    const bolt = new THREE.Mesh(boltGeo, matBlackMaterial)
    bolt.rotation.z = Math.PI / 2
    bolt.position.set(
      -0.7,
      Math.cos(angle) * 0.36,
      Math.sin(angle) * 0.36
    )
    conveyorGroup.add(bolt)
  }

  // ═══════════════════════════════════════════════════════════════
  //  7. PRO-SICHT LOGO (Texture) 🏢
  // ═══════════════════════════════════════════════════════════════
  
  // Logo texture yükleme
  const textureLoader = new THREE.TextureLoader()
  const logoTexture = textureLoader.load('/images/logo.png')
  
  // ÖN TARAF LOGO
  const logoPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.5),  // LED panel boyutunda
    new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0.9,  // Hafif şeffaf
      side: THREE.DoubleSide
    })
  )
  
  // LED panelin olduğu pozisyon (ön taraf)
  logoPlane.position.set(-0.2, 0, 0.43)  // Üst yüzeyde
  logoPlane.rotation.x = 0  // Düz baksın
  
  conveyorGroup.add(logoPlane)

  // ARKA TARAF LOGO (aynı logo, ters tarafta)
  const logoPlaneBack = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.5),  // Aynı boyut
    new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    })
  )
  
  // Arka taraf pozisyonu (Z ekseninde ters)
  logoPlaneBack.position.set(-0.2, 0, -0.43)  // Negatif Z = arka taraf
  logoPlaneBack.rotation.x = 0
  logoPlaneBack.rotation.y = Math.PI  // 180 derece döndür (logo düzgün görünsün)
  
  conveyorGroup.add(logoPlaneBack)

  
  const beamMaterial = new THREE.MeshBasicMaterial({
    color: 0x3DBAA2,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })

  const beamGeometry = new THREE.ConeGeometry(
    0.4,
    4.0,
    32,
    1,
    true
  )
  const scanBeam = new THREE.Mesh(beamGeometry, beamMaterial)
  scanBeam.rotation.z = -Math.PI / 2
  scanBeam.position.set(3.5, 0, 0)
  conveyorGroup.add(scanBeam)

  // Işın içi grid pattern (profesyonel tarama efekti) - ELİT
  const gridMaterial = new THREE.MeshBasicMaterial({
    color: 0x3DBAA2,
    transparent: true,
    opacity: 0,
    wireframe: true,
    blending: THREE.AdditiveBlending
  })
  const gridBeam = new THREE.Mesh(
    new THREE.ConeGeometry(0.78, 5.98, 32, 8, true),
    gridMaterial
  )
  gridBeam.rotation.z = -Math.PI / 2
  gridBeam.position.set(3.5, 0, 0)
  conveyorGroup.add(gridBeam)

  // SpotLight (gerçek ışık kaynağı) - ELİT AYARLAR
  const scanLight = new THREE.SpotLight(0x3DBAA2, 0)
  scanLight.position.set(1.2, 0, 0)
  scanLight.target.position.set(6.5, 0, 0)
  scanLight.angle = Math.PI / 10
  scanLight.penumbra = 0.3
  scanLight.decay = 1.2
  scanLight.distance = 12
  conveyorGroup.add(scanLight)
  conveyorGroup.add(scanLight.target)

  // Parçacık sistemi (ışın içinde uçuşan noktalar) - DAHA AZ YOĞUN
  const particleCount = 15  // 50'den 30'a (daha az, elit)
  const particlesGeometry = new THREE.BufferGeometry()
  const particlePositions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = 1.5 + Math.random() * 5      // X (lens → kart, SAĞA pozitif - eski)
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.3  // Y spread (daha dar)
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3  // Z spread (daha dar)
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
  
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x3DBAA2,
    size: 0.02,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
  
  const scanParticles = new THREE.Points(particlesGeometry, particlesMaterial)
  conveyorGroup.add(scanParticles)

  // Kamerayı sahneye ekle
  scene.add(conveyorGroup)
  
  // BAŞLANGIÇ ROTASYONU: Kamerayı TAM 180 derece çevir (TERS YÖN) 🎯
  conveyorGroup.rotation.y = -Math.PI  // -180 derece (saat yönü tersine)

  // LED Ring referansını sakla (animasyon için)
  beltMaterial = neonTurquoiseMaterial
  rollerMaterial = titaniumMaterial

  // Scroll progress objesi
  const scrollProgress = { value: 0 }

  // GSAP ScrollTrigger - scroll ile kamerayı döndür
  gsap.to(scrollProgress, {
    value: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.content-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    }
  })

  // Render loop - scroll progress'e göre konveyörü döndür
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    
    // Lerp (Linear Interpolation) - Yumuşak geçiş
    const lerpFactor = 0.05
    currentRotation.x += (targetRotation.x - currentRotation.x) * lerpFactor
    currentRotation.y += (targetRotation.y - currentRotation.y) * lerpFactor
    
    // Scroll progress'e göre base rotasyonu ayarla
    const baseRotationX = scrollProgress.value * Math.PI * 2
    
    // Base rotasyon + Mouse parallax
    conveyorGroup.rotation.x = baseRotationX + currentRotation.x
    conveyorGroup.rotation.y = Math.PI + currentRotation.y
    
    if (scanParticles && particlesMaterial.opacity > 0) {
      const posAttr = particlesGeometry.attributes.position
      if (posAttr?.array) {
        const positions = posAttr.array as Float32Array
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3
          if (positions[idx] !== undefined) {
            positions[idx] += 0.02
            
            if (positions[idx] > 7) {
              positions[idx] = 1.5
            }
          }
        }
        posAttr.needsUpdate = true
      }
    }
    
    renderer.render(scene, camera)
  }
  animate()

  // Mouse parallax event listener ekle
  window.addEventListener('mousemove', handleMouseMove)

  // ═══════════════════════════════════════════════════════════════
  //  PREMIUM 3D SAHNE + HERO KARTLARI SİNEMATİK DANSI 
  // ═══════════════════════════════════════════════════════════════
  
  // Hero Kartları Referansları
  const heroSections = [section1.value, section2.value, section3.value]
  
  // LOKMA 25: Mobile check için MediaQuery
  const isMobile = window.innerWidth < 768

  // LOKMA 29: Kamera Parçalarını Fade-In Animasyonu
  // Tüm kamera parçalarını topla ve görünür yap
  conveyorGroup.traverse((child: any) => {
    if (child.isMesh && child.material) {
      gsap.to(child.material, {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.3
      })
    }
  })

  // LOKMA 29: Kamerayı daha büyük ve belirgin yap
  conveyorGroup.scale.set(1.8, 1.8, 1.8)  // 1.8x daha büyük
  
  // BAŞLANGIÇ POZİSYONU: Kart sol-orta, 3D sağda (dengeli kompozisyon)
  // LOKMA 26: Mobilde 3D obje yukarıda kalır, kartlar altta
  gsap.set(conveyorGroup.position, { 
    x: isMobile ? 0 : 3,    // Mobilde ortala
    y: isMobile ? 1 : 0,    // Mobilde yukarı çek
    z: isMobile ? -2 : 0    // Mobilde daha uzağa
  })
  
  // STEP 1: İlk Kart → İkinci Kart Geçişi (3D Sahne MERKEZE gelir)
  if (section1.value && section2.value) {
    // İlk kartı dengeli pozisyonda + hafif 3D ile başlat
    // LOKMA 25: Mobilde kartlar ortalı
    gsap.set(section1.value, { 
      opacity: 1, 
      x: isMobile ? 0 : -280,  // Mobilde merkez
      rotateY: isMobile ? 0 : 2,  // Mobilde düz
      transformPerspective: 1200,
      transformStyle: 'preserve-3d'
    })
    gsap.set(section2.value, { 
      opacity: 0, 
      x: isMobile ? 0 : 280, 
      rotateY: isMobile ? 0 : 2 
    })
    
    // 3D sahneyi ve kartları senkronize et
    const timeline1 = gsap.timeline({
      scrollTrigger: {
        trigger: section1.value,
        start: 'top top',
        end: '+=70%',
        scrub: 1.2,
        pin: false
      }
    })
    
    timeline1.to(beamMaterial, {
      opacity: 0.15,
      duration: 0.8
    }, 0)
    
    timeline1.to(gridMaterial, {
      opacity: 0.20,
      duration: 0.8
    }, 0)
    
    timeline1.to(scanLight, {
      intensity: 3.0,
      duration: 0.8
    }, 0)
    
    timeline1.to(particlesMaterial, {
      opacity: 0.8,
      duration: 0.8
    }, 0)
    
    timeline1.to(conveyorGroup.position, {
      x: isMobile ? 0 : -4,
      y: isMobile ? 1 : 0,
      z: isMobile ? -2 : 0,
      ease: 'power2.inOut'
    }, 0)
    
    timeline1.to(section1.value, {
      opacity: 0,
      x: isMobile ? 0 : -120,
      y: isMobile ? -50 : 0,
      rotateY: isMobile ? 0 : 4,
      ease: 'power2.inOut'
    }, 0)
    
    timeline1.to([beamMaterial, gridMaterial], {
      opacity: 0,
      duration: 0.5
    }, 0.3)
    
    timeline1.to(scanLight, {
      intensity: 0,
      duration: 0.5
    }, 0.3)
    
    timeline1.to(particlesMaterial, {
      opacity: 0,
      duration: 0.5
    }, 0.3)
    
    // İkinci kart belirer
    timeline1.to(section2.value, {
      opacity: 1,
      x: isMobile ? 0 : 280,
      y: isMobile ? 0 : 0,
      rotateY: isMobile ? 0 : -3,
      ease: 'power2.inOut'
    }, 0)
  }
  
  // STEP 2: İkinci Kart → Üçüncü Kart Geçişi (3D Sahne SAĞA kayar)
  if (section2.value && section3.value) {
    gsap.set(section3.value, { 
      opacity: 0, 
      x: isMobile ? 0 : -280, 
      rotateY: isMobile ? 0 : 2 
    })
    
    const timeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: section2.value,
        start: 'top top',
        end: '+=70%',
        scrub: 1.2,
        pin: false
      }
    })
    
    // KAMERA ROTASYON: Kaldırıldı (ışınlar sabit pozisyonda)
    
    // LOKMA 26: Mobilde 3D sahne yukarıda sabit kalır
    timeline2.to(conveyorGroup.position, {
      x: isMobile ? 0 : 4,
      y: isMobile ? 1 : 0,     // Mobilde yukarıda tut
      z: isMobile ? -2 : 0,    // Mobilde arkada sabit
      ease: 'power2.inOut'
    }, 0)
    
    // LOKMA 30: Card 2 aktifken - TARAMA IŞINI TEKRAR AÇIK 🔦 (ELİT + KOYU RENK)
    timeline2.to(beamMaterial, {
      opacity: 0.35,  // Biraz artırıldı
      duration: 0.8
    }, 0)
    
    timeline2.to(gridMaterial, {
      opacity: 0.20,  // Biraz artırıldı
      duration: 0.8
    }, 0)
    
    timeline2.to(scanLight, {
      intensity: 3.0,  // Biraz artırıldı
      duration: 0.8
    }, 0)
    
    timeline2.to(particlesMaterial, {
      opacity: 0.8,
      duration: 0.8
    }, 0)
    
    // İkinci kart kaybolur
    timeline2.to(section2.value, {
      opacity: 0,
      x: isMobile ? 0 : 320,
      y: isMobile ? -50 : 0,
      rotateY: isMobile ? 0 : 4,
      ease: 'power2.inOut'
    }, 0)
    
    // LOKMA 30: Card 2 kaybolurken - IŞIN KAPANIYOR 🔦
    timeline2.to([beamMaterial, gridMaterial], {
      opacity: 0,
      duration: 0.5
    }, 0.3)
    
    timeline2.to(scanLight, {
      intensity: 0,
      duration: 0.5
    }, 0.3)
    
    timeline2.to(particlesMaterial, {
      opacity: 0,
      duration: 0.5
    }, 0.3)
    
    // Üçüncü kart belirer
    timeline2.to(section3.value, {
      opacity: 1,
      x: isMobile ? 0 : -280,  // Mobilde merkez
      y: isMobile ? 0 : 0,
      rotateY: isMobile ? 0 : 2,
      ease: 'power2.inOut'
    }, 0)
  }
  
  // STEP 3: Stats bölümüne gelince 3D sahneyi merkeze geri getir + IŞIN TAMAMEN KAPALI
  // LOKMA 26: Mobilde yukarıda sabit kalır
  if (statsSection.value) {
    const timeline3 = gsap.timeline({
      scrollTrigger: {
        trigger: statsSection.value,
        start: 'top center',
        end: 'center center',
        scrub: true
      }
    })
    
    // KAMERA ROTASYON: Kaldırıldı (ışınlar sabit pozisyonda)
    
    timeline3.to(conveyorGroup.position, {
      x: 0,  // Hem mobil hem desktop merkezde
      y: isMobile ? 1 : 0,     // Mobilde yukarıda tut
      z: isMobile ? -2 : 0    // Mobilde arkada tut
    }, 0)
    
    // LOKMA 30: Stats bölümünde tarama bitti - ışın kapalı
    timeline3.to([beamMaterial, gridMaterial, particlesMaterial], {
      opacity: 0,
      duration: 0.3
    }, 0)
    
    timeline3.to(scanLight, {
      intensity: 0,
      duration: 0.3
    }, 0)
  }

  // İstatistik Counter Animasyonları
  if (statsSection.value) {
    const statNumbers = statsSection.value.querySelectorAll('.stat-number')
    
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target') || '0')
      const counter = { value: 0 }
      
      gsap.to(counter, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsSection.value,
          start: 'top center',
          once: true
        },
        onUpdate: () => {
          stat.textContent = Math.round(counter.value).toString()
        }
      })
    })
  }

  if (sectorsSection.value && categoryRefs.value.length > 0) {
    categoryRefs.value.forEach((categoryEl, index) => {
      if (!categoryEl) return
      
      gsap.timeline({
        scrollTrigger: {
          trigger: categoryEl,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      })
      .fromTo(categoryEl.querySelector('.category-left'), 
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      )
      .fromTo(categoryEl.querySelector('.category-right'), 
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        '<0.2'
      )
    })
  }

  if (contactSection.value) {
    gsap.fromTo(
      contactSection.value.querySelector('.contact-content'),
      {
        opacity: 0,
        y: 80
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactSection.value,
          start: 'top 70%',
          once: true
        }
      }
    )
  }

  // ═══════════════════════════════════════════════════════
  // SCROLL REVEAL ANIMATIONS - Organized by Section
  // ═══════════════════════════════════════════════════════

  // Why Us Section - Feature Cards Stagger
  const featureCards = document.querySelectorAll('.feature-card')
  if (featureCards.length > 0) {
    gsap.fromTo(
      featureCards,
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-us-grid',
          start: 'top 75%',
          once: true
        }
      }
    )
  }

  // Contributions Section - Cards with Elastic Effect
  const contributionCards = document.querySelectorAll('.contribution-card')
  if (contributionCards.length > 0) {
    gsap.fromTo(
      contributionCards,
      {
        opacity: 0,
        y: 80,
        rotateX: -15
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: '.contributions-grid',
          start: 'top 70%',
          once: true
        }
      }
    )
  }

  // Partners Section - Logo Reveal
  const partnerCards = document.querySelectorAll('.partner-card')
  if (partnerCards.length > 0) {
    gsap.fromTo(
      partnerCards,
      {
        opacity: 0,
        scale: 0.7,
        rotateY: -25
      },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.partners-grid',
          start: 'top 75%',
          once: true
        }
      }
    )
  }

  // Blog Section - Bento Grid Reveal
  const blogCards = document.querySelectorAll('.blog-card')
  if (blogCards.length > 0) {
    gsap.fromTo(
      blogCards,
      {
        opacity: 0,
        y: 50,
        clipPath: 'inset(10% 10% 10% 10% round 1rem)'
      },
      {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% 0% 0% round 1rem)',
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.blog-grid',
          start: 'top 70%',
          once: true
        }
      }
    )
  }

  // Section Titles - Fade In from Bottom
  const sectionTitles = document.querySelectorAll('.why-us-title, .contributions-title, .partners-title, .blog-title')
  sectionTitles.forEach(title => {
    gsap.fromTo(
      title,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          once: true
        }
      }
    )
  })

  // Stats Cards - Individual Stat Items
  const statItems = document.querySelectorAll('.stat-item')
  if (statItems.length > 0) {
    gsap.fromTo(
      statItems,
      {
        opacity: 0,
        y: 30,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 75%',
          once: true
        }
      }
    )
  }
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(async () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  // Lenis'i durdur
  if (lenis) {
    lenis.destroy()
  }
  
  // ScrollTrigger'ı temizle
  try {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  } catch (e) {
    // ignore
  }
  
  // Event listener'ları temizle
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>
