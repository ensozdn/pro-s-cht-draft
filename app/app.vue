<template>
  <div :class="isDark ? 'bg-slate-900' : 'bg-slate-50'" class="overflow-x-hidden w-full">
    <!-- Premium Preloader -->
    <div ref="preloader" class="preloader">
      <div class="preloader-content">
        <img src="/images/logo.png" alt="ProSicht Logo" class="preloader-logo-img" />
        <div class="preloader-bar-wrapper">
          <div ref="preloaderBar" class="preloader-bar"></div>
        </div>
        <p ref="preloaderText" class="preloader-text">0%</p>
      </div>
    </div>

    <!-- Premium Header -->
    <header class="header-bar">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo-container">
          <img src="/images/logo.png" alt="ProSicht Logo" class="logo-img" />
        </div>

        <!-- Desktop Navigation -->
        <nav class="nav-menu desktop-nav">
          <a href="#applications" class="nav-link">Uygulama Alanlarımız</a>
          <a href="#why-us" class="nav-link">Neden Biz</a>
          <a href="#contributions" class="nav-link">Katkılarımız</a>
          <a href="#blog" class="nav-link">Blog</a>
          <a href="#contact" class="nav-cta">İletişim</a>
        </nav>

        <!-- LOKMA 25: Mobile Right Side (Theme + Hamburger) -->
        <div class="mobile-right-controls">
          <!-- LOKMA 24: Premium Theme Toggle -->
          <button 
            @click="toggleTheme"
            class="theme-toggle"
            aria-label="Toggle theme"
          >
            <!-- Sun Icon (Light Mode) -->
            <svg
              :class="['theme-icon', 'sun-icon', { 'icon-hidden': isDark }]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>

            <!-- Moon Icon (Dark Mode) -->
            <svg
              :class="['theme-icon', 'moon-icon', { 'icon-visible': isDark }]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- Mobile Hamburger Menu -->
          <button class="mobile-menu-btn" @click="isMobileMenuOpen = true">
            <svg class="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- LOKMA 26: Premium Mobile Drawer Menu -->
    <Transition name="drawer">
      <div v-if="isMobileMenuOpen" class="mobile-drawer-overlay" @click="closeMobileMenu">
        <div class="mobile-drawer-panel" @click.stop>
          <!-- Close Button -->
          <button class="drawer-close-btn" @click="closeMobileMenu">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Navigation Links -->
          <nav class="drawer-nav">
            <a href="#" class="drawer-link" @click="closeMobileMenu">Anasayfa</a>
            <a href="#" class="drawer-link" @click="closeMobileMenu">Uygulamalarımız</a>
            <a href="#" class="drawer-link" @click="closeMobileMenu">Hakkımızda</a>
            <a href="#" class="drawer-link" @click="closeMobileMenu">Fiyatlandırma</a>
            <a href="#" class="drawer-link" @click="closeMobileMenu">İletişim</a>
          </nav>
        </div>
      </div>
    </Transition>

    <!-- Fixed Three.js canvas -->
    <div class="scene-container">
      <canvas ref="canvasRef" />
    </div>
    
    <!-- HTML Overlay - Metin Katmanı -->
    <div class="content-wrapper">
      <section ref="section1" class="content-section">
        <div class="glass-card">
          <h1 class="content-title">
            <span class="text-gradient">Üretimde</span> Mükemmeli Yakalayın
          </h1>
          <p class="content-description">
            Yapay zeka destekli kalite kontrol sistemiyle üretim hatalarını anlık tespit edin
          </p>
          <button class="cta-button">
            Daha Fazla Keşfet
          </button>
        </div>
      </section>
      
      <section ref="section2" class="content-section">
        <div class="glass-card">
          <h1 class="content-title">
            <span class="text-gradient">Otonom</span> Karar Sistemi
          </h1>
          <p class="content-description">
            Gerçek zamanlı analiz ve otomatik kalite değerlendirmesi
          </p>
          <button class="cta-button cta-button-secondary">
            Sistemi İncele
          </button>
        </div>
      </section>
      
      <section ref="section3" class="content-section">
        <div class="glass-card">
          <h1 class="content-title">
            Maliyetleri <span class="text-gradient">Minimuma</span> İndirin
          </h1>
          <p class="content-description">
            %40'a varan maliyet tasarrufu ve sıfır kusurlu üretim
          </p>
          <button class="cta-button">
            Hemen Başlayın
          </button>
        </div>
      </section>

      <!-- İstatistikler Bölümü -->
      <section ref="statsSection" class="content-section">
        <div class="glass-card stats-card">
          <h2 class="stats-title">Sayılarla <span class="text-gradient">ProSicht</span></h2>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">
                <span class="stat-number" data-target="99">0</span>
                <span class="stat-symbol">%</span>
              </div>
              <div class="stat-label">Doğruluk Oranı</div>
            </div>

            <div class="stat-item">
              <div class="stat-value">
                <span class="stat-number" data-target="15">0</span>
                <span class="stat-symbol">ms</span>
              </div>
              <div class="stat-label">Yanıt Süresi</div>
            </div>

            <div class="stat-item">
              <div class="stat-value">
                <span class="stat-number" data-target="1000">0</span>
                <span class="stat-symbol">+</span>
              </div>
              <div class="stat-label">Dakikada Parça</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Neden Biz? Bölümü -->
    <section class="why-us-section">
      <div class="why-us-container">
        <h2 class="why-us-title">Neden <span class="text-gradient">Biz?</span></h2>
        
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
    <section ref="sectorsSection" class="applications-section">
      <div class="applications-container">
        <!-- Başlık -->
        <h2 class="applications-title">Uygulama <span class="text-gradient">Alanlarımız</span></h2>
        
        <!-- Tab Butonları -->
        <div class="tabs-wrapper">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="activeTab = category.id"
            :class="['tab-button', { active: activeTab === category.id }]"
            :style="getButtonStyle(category.id)"
          >
            {{ category.title }}
          </button>
        </div>

        <!-- İçerik Alanı -->
        <div class="tab-content">
          <div class="content-grid">
            <!-- Sol: Açıklama -->
            <div class="content-left">
              <h3 class="content-title">{{ activeCategory?.title }}</h3>
              <p class="content-description">{{ activeCategory?.description }}</p>
            </div>

            <!-- Sağ: Görsel Alanı -->
            <div class="content-right">
              <div class="image-placeholder">
                <img 
                  v-if="activeCategory?.image" 
                  :src="activeCategory.image" 
                  :alt="activeCategory.title"
                  class="category-image"
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
        <h2 class="contributions-title">InspectAI Ürününün İşletmeye <span class="text-gradient">Katkıları</span></h2>
        
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
          <h2 class="blog-title">ProSicht - <span class="text-gradient">Blog</span></h2>
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
            Daha Fazla Göster
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
        <h2 class="contact-main-title">İletişim</h2>
        
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
            <h3 class="contact-info-title">İletişim Bilgileri</h3>
            
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
          <h2 class="form-main-title">Bize <span class="text-gradient">Ulaşın</span></h2>
          
          <form @submit.prevent="handleSubmit" class="premium-form">
            <!-- İsim ve Soyisim -->
            <div class="form-grid-row">
              <div class="form-field">
                <input
                  v-model="form.firstName"
                  type="text"
                  placeholder="Adınız"
                  class="form-elite-input"
                  required
                />
              </div>
              <div class="form-field">
                <input
                  v-model="form.lastName"
                  type="text"
                  placeholder="Soyadınız"
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
                  placeholder="E-posta Adresiniz"
                  class="form-elite-input"
                  required
                />
              </div>
              <div class="form-field">
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="Telefon Numaranız"
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
                  <option value="" disabled selected>Uygulama Alanı Seçiniz</option>
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
                  placeholder="Mesajınız..."
                  rows="5"
                  class="form-elite-input form-textarea"
                  required
                ></textarea>
              </div>
            </div>

            <!-- Gönder Butonu -->
            <div class="form-submit-wrapper">
              <button type="submit" class="form-premium-button">
                <span class="button-text">Gönder</span>
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

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <span class="footer-logo">ProSicht</span>
          <span class="footer-copyright">© 2026 Tüm hakları saklıdır.</span>
        </div>
        <div class="footer-links">
          <a href="#privacy" class="footer-link">Gizlilik Politikası</a>
          <a href="#terms" class="footer-link">Kullanım Şartları</a>
        </div>
        <div class="footer-social">
          <a href="#" class="social-link">🔗</a>
          <a href="#" class="social-link">📘</a>
          <a href="#" class="social-link">🐦</a>
        </div>
      </div>
    </footer>

    <!-- Scroll area -->
    <div ref="scrollAreaRef" class="scroll-area"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as THREE from 'three'

// Categories Data
const categories = ref([
  {
    id: 'metal-celik',
    title: 'Metal-Çelik',
    description: 'Yüksek hassasiyetli yüzey kontrolü, kaynak kalitesi tespiti ve çatlak analizi ile üretim süreçlerinizde maksimum güvenilirlik sağlıyoruz.',
    image: '/images/metal-celik.png'
  },
  {
    id: 'deri',
    title: 'Deri',
    description: 'Deri ürünlerinde renk tutarlılığı, yüzey kusurları ve dikiş kalitesi kontrolü ile premium standartları garanti ediyoruz.',
    image: '/images/deri.png'
  },
  {
    id: 'tekstil',
    title: 'Tekstil',
    description: 'Kumaş hataları, renk uyumsuzlukları, desen bozuklukları ve dikiş kalitesi analizinde yapay zeka destekli çözümler sunuyoruz.',
    image: '/images/tekstil.png'
  },
  {
    id: 'mobilya',
    title: 'Mobilya',
    description: 'Ahşap yüzey kalitesi, birleştirme noktaları, boya-vernik uygulamaları ve montaj doğruluğu kontrolünde sektörün öncüsüyüz.',
    image: '/images/mobilya.png'
  },
  {
    id: 'mermer',
    title: 'Mermer',
    description: 'Mermer ve doğal taş ürünlerde damar deseni, renk tonları, yüzey işleme kalitesi ve boyut hassasiyeti kontrolü yapıyoruz.',
    image: '/images/mermer.png'
  },
  {
    id: 'cam',
    title: 'Cam',
    description: 'Cam ürünlerde hava kabarcıkları, çizikler, şeffaflık kontrolü ve kenar işleme kalitesi analizinde uzmanız.',
    image: '/images/cam.png'
  },
  {
    id: 'son-kalite',
    title: 'Son Kalite Kontrol',
    description: 'Tüm sektörlerde üretim hattının son aşamasında, ürünlerinizin piyasaya çıkmadan önce mükemmel standartta olmasını sağlıyoruz.',
    image: '/images/son-kalite.png'
  }
])

// Neden Biz? Features
const whyUsFeatures = ref([
  {
    title: 'Hızlı Kurulum',
    desc: 'Sistemimiz, hat yapısını bozmadan hızlı kurulum ile sisteme entegre olur. Üretim hattınızı ve iş akışınızı bozmadan devreye alınabilir.',
    icon: 'Rocket'
  },
  {
    title: 'Otonom Karar Sistemi',
    desc: 'Yapay zeka destekli sistem, otomatik ve bağımsız kararlar alarak verimliliği artırır, insan müdahalesini minimuma indirir.',
    icon: 'BrainCircuit'
  },
  {
    title: 'İşçi Kazancı',
    desc: 'Verimlilik artışı ve hızlı kusur tespiti, işçi performansını iyileştirir, iş gücü kaynaklarının daha verimli kullanılmasını sağlar.',
    icon: 'Users'
  },
  {
    title: 'Kalite Takibi',
    desc: 'Sistem, sürekli olarak ürünlerin kalitesini izler ve takip eder, bu da ürün kalitesinde sürekli gelişimi sağlar.',
    icon: 'Activity'
  }
])

// InspectAI'ın İşletmeye Katkıları
const contributions = ref([
  {
    title: 'Kalite Kontrolünde Yüksek Hassasiyet',
    desc: 'Yapay zeka, insan gözüne göre daha hassas bir şekilde kusurları tespit edebilir. Bu, ürünlerin daha yüksek kalitede ve hatasız olarak üretilmesini sağlar.',
    icon: 'CheckCircle'
  },
  {
    title: 'Üretim Sürecindeki Hataları Azaltma',
    desc: 'Kusur tespiti sistemi, üretim hattındaki hataları erken aşamada tespit ederek hatalı ürünlerin üretime girmesini önler. Bu da maliyet tasarrufu sağlar.',
    icon: 'TrendingDown'
  },
  {
    title: 'Müşteri Memnuniyetini Artırma',
    desc: 'Kaliteli ve hatasız ürünler, müşteri memnuniyetini artırır ve müşteri şikayetlerini azaltır. Bu da marka itibarını koruma açısından önemlidir.',
    icon: 'Smile'
  },
  {
    title: 'Geri Çağırma Maliyetlerini Azaltma',
    desc: 'Kusursuz ürünlerin üretilmesi, geri çağırma maliyetlerini azaltır. Hatalı ürünlerin piyasadan çekilmesi veya yeniden üretilmesi gerekmeyeceği için maliyet tasarrufu sağlar.',
    icon: 'ShieldAlert'
  },
  {
    title: 'Verimliliği Artırma',
    desc: 'Otomatik kusur tespiti, işçilik maliyetlerini azaltır ve üretim süreçlerini hızlandırır. Bu, üreticinin verimliliğini artırır.',
    icon: 'Zap'
  },
  {
    title: 'Veri ve Analiz İmkanı',
    desc: 'Kusur tespiti sistemi, ürünlerin üretim süreci hakkında veri toplar ve analiz eder. Bu veriler, üretim süreçlerini optimize etmek ve gelecekteki geliştirmeler için kullanılabilir.',
    icon: 'BarChart'
  }
])

// İletişim Bilgileri
const contactInfo = ref([
  {
    icon: 'MapPin',
    text: 'TR - Sakarya Teknokent - Esentepe Mah. Akademiyolu Sk. Teknoloji Geliştirme Bölgeleri Sitesi B Blok No: 10b İç Kapı No: Z05 Serdivan / Sakarya'
  },
  {
    icon: 'MapPin',
    text: 'TR - Bilişim Vadisi - Muallimköy Mahallesi, Deniz Cd. No:143-5, 41400 Gebze/Kocaeli'
  },
  {
    icon: 'Phone',
    text: '+90 549 202 90 44'
  },
  {
    icon: 'MapPin',
    text: 'GER - Wabestr. 8, 38122 Braunschweig / Germany'
  },
  {
    icon: 'Phone',
    text: '+49 176 32385710'
  },
  {
    icon: 'Mail',
    text: 'info@prosicht.com'
  }
])

// LOKMA 24: Theme Toggle (Light/Dark)
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  // Dark mode class'ı body'ye ekle/çıkar
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// LOKMA 26: Mobile Menu Drawer
const isMobileMenuOpen = ref(false)

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Bize Ulaşın Formu
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  applicationArea: '',
  message: ''
})

const applicationAreas = ref([
  { value: 'metal-celik', label: 'Metal-Çelik' },
  { value: 'deri', label: 'Deri' },
  { value: 'tekstil', label: 'Tekstil' },
  { value: 'mobilya', label: 'Mobilya' },
  { value: 'mermer', label: 'Mermer' },
  { value: 'cam', label: 'Cam' },
  { value: 'son-kalite', label: 'Son Kalite Kontrol' }
])

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

// LOKMA 23: Blog & Haberler (Asimetrik Bento Grid)
const blogPosts = ref([
  {
    id: 1,
    title: 'Doğal Bir "Budak" mı, Yoksa Kritik Bir "Çatlak" mı?',
    image: '/images/blog/blog1.jpg',
    tags: ['AI', 'Endüstri 4.0', 'Technology'],
    author: 'İdil Karabaş',
    date: '2 ay ago',
    featured: true
  },
  {
    id: 2,
    title: 'Otomotiv Üretiminde Yapay Zeka Destekli Kalite Kontrol Dönemi',
    image: '/images/blog/blog2.jpg',
    tags: ['AI', 'Endüstri 4.0', 'Technology'],
    author: 'İdil Karabaş',
    date: 'Şubat 24, 2026',
    featured: false
  },
  {
    id: 3,
    title: 'Pro Sicht ve BIOS\'tan Güç Birliği: Kalite Kontrolde Uçtan Uca Otonom Dönem',
    image: '/images/blog/blog3.jpg',
    tags: ['AI', 'Technology'],
    author: 'İdil Karabaş',
    date: 'Şubat 24, 2026',
    featured: false
  }
])

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
const preloader = ref<HTMLDivElement | null>(null)
const preloaderBar = ref<HTMLDivElement | null>(null)
const preloaderText = ref<HTMLParagraphElement | null>(null)

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

  // GSAP'i client-side import et
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Preloader Animasyonu
  const loadingProgress = { value: 0 }
  
  gsap.to(loadingProgress, {
    value: 100,
    duration: 2,
    ease: 'power2.inOut',
    onUpdate: () => {
      const progress = Math.round(loadingProgress.value)
      if (preloaderBar.value) {
        preloaderBar.value.style.width = `${progress}%`
      }
      if (preloaderText.value) {
        preloaderText.value.textContent = `${progress}%`
      }
    },
    onComplete: () => {
      // Preloader'ı kaldır
      gsap.to(preloader.value, {
        y: '-100%',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          if (preloader.value) {
            preloader.value.style.display = 'none'
          }
          
          // Hero giriş animasyonları
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
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false
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
  //  3. SOĞUTUCU IZGARALAR (Heat Sinks - 5 Adet)
  // ═══════════════════════════════════════════════════════════════
  
  const heatSinkGeo = new THREE.BoxGeometry(0.12, 0.5, 0.03)
  const heatSinkPositions = [-0.3, -0.15, 0, 0.15, 0.3]
  
  heatSinkPositions.forEach(xPos => {
    // Üst kanatçık
    const topFin = new THREE.Mesh(heatSinkGeo, matBlackMaterial)
    topFin.position.set(xPos, 0.43, 0)
    conveyorGroup.add(topFin)
    
    // Alt kanatçık
    const bottomFin = new THREE.Mesh(heatSinkGeo, matBlackMaterial)
    bottomFin.position.set(xPos, -0.43, 0)
    conveyorGroup.add(bottomFin)
  })

  // Yan soğutucu paneller (daha belirgin)
  const sidePanelGeo = new THREE.BoxGeometry(0.8, 0.06, 0.48)
  const topPanel = new THREE.Mesh(sidePanelGeo, matBlackMaterial)
  topPanel.position.set(0, 0.46, 0)
  conveyorGroup.add(topPanel)
  
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
  //  7. LED GÖSTERGE PANELI (Üstte)
  // ═══════════════════════════════════════════════════════════════
  
  // Panel arka planı
  const ledPanelGeo = new THREE.BoxGeometry(0.4, 0.12, 0.02)
  const ledPanel = new THREE.Mesh(ledPanelGeo, matBlackMaterial)
  ledPanel.position.set(-0.2, 0, 0.42)
  conveyorGroup.add(ledPanel)

  // LED'ler
  const ledGeo = new THREE.CircleGeometry(0.02, 16)
  
  // Power (yeşil)
  const powerLed = new THREE.Mesh(ledGeo, new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    emissive: 0x00ff00,
    emissiveIntensity: 1.2,
    transparent: true,
    opacity: 0
  }))
  powerLed.position.set(-0.32, 0.04, 0.43)
  conveyorGroup.add(powerLed)

  // Activity (turkuaz)
  const activityLed = new THREE.Mesh(ledGeo, new THREE.MeshStandardMaterial({
    color: 0x3DBAA2,
    emissive: 0x3DBAA2,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0
  }))
  activityLed.position.set(-0.2, 0.04, 0.43)
  conveyorGroup.add(activityLed)

  // Error (kırmızı)
  const errorLed = new THREE.Mesh(ledGeo, new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 0,
    transparent: true,
    opacity: 0
  }))
  errorLed.position.set(-0.08, 0.04, 0.43)
  conveyorGroup.add(errorLed)

  
  const beamMaterial = new THREE.MeshBasicMaterial({
    color: 0x3DBAA2,
    transparent: true,
    opacity: 0,          // Başlangıçta görünmez
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,  // Parlama efekti
    depthWrite: false
  })

  // Koni şekilli ışın (lens'ten çıkacak) - ELİT VE İNCE
  const beamGeometry = new THREE.ConeGeometry(
    0.25,   // Uç genişlik (daha ince, elit)
    5.5,    // Uzunluk (daha uzun, profesyonel)
    24,     // Segment (optimize)
    1,
    true    // Open ended
  )
  const scanBeam = new THREE.Mesh(beamGeometry, beamMaterial)
  scanBeam.rotation.z = -Math.PI / 2  // Sağa doğru
  scanBeam.position.set(3.5, 0, 0)    // Lens önünden başla
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
    new THREE.ConeGeometry(0.23, 5.48, 12, 6, true),  // Daha ince grid
    gridMaterial
  )
  gridBeam.rotation.z = -Math.PI / 2
  gridBeam.position.set(3.5, 0, 0)
  conveyorGroup.add(gridBeam)

  // SpotLight (gerçek ışık kaynağı) - ELİT AYARLAR
  const scanLight = new THREE.SpotLight(0x3DBAA2, 0)  // Başta kapalı
  scanLight.position.set(1.2, 0, 0)    // Lens pozisyonu
  scanLight.target.position.set(6.5, 0, 0)  // Daha uzak hedef
  scanLight.angle = Math.PI / 10  // Daha dar açı (elit, odaklanmış)
  scanLight.penumbra = 0.3  // Keskin kenarlar
  scanLight.decay = 1.2
  scanLight.distance = 12
  conveyorGroup.add(scanLight)
  conveyorGroup.add(scanLight.target)

  // Parçacık sistemi (ışın içinde uçuşan noktalar) - DAHA AZ YOĞUN
  const particleCount = 30  // 50'den 30'a (daha az, elit)
  const particlesGeometry = new THREE.BufferGeometry()
  const particlePositions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = 1.5 + Math.random() * 5      // X (lens → kart, daha uzun)
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.3  // Y spread (daha dar)
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3  // Z spread (daha dar)
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
  
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x3DBAA2,
    size: 0.02,  // Daha küçük parçacıklar (0.03'ten 0.02)
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
  
  const scanParticles = new THREE.Points(particlesGeometry, particlesMaterial)
  conveyorGroup.add(scanParticles)

  // Kamerayı sahneye ekle
  scene.add(conveyorGroup)

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
    conveyorGroup.rotation.y = currentRotation.y
    
    if (scanParticles && particlesMaterial.opacity > 0) {
      const posAttr = particlesGeometry.attributes.position
      if (posAttr && posAttr.array) {
        const positions = posAttr.array as Float32Array
        for (let i = 0; i < particleCount; i++) {
          // Parçacıklar lens'ten kartlara doğru akıyor
          positions[i * 3] += 0.02  // X ekseninde ileri
          
          // Eğer çok uzağa gittiyse başa sar (daha uzun ışın için)
          if (positions[i * 3] > 7) {
            positions[i * 3] = 1.5
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
    
    // LOKMA 30: Card 1 aktifken - TARAMA IŞINI AÇIK 🔦 (ELİT)
    timeline1.to(beamMaterial, {
      opacity: 0.25,  // Daha ince, elit opacity (0.35'ten düşük)
      duration: 0.8
    }, 0)
    
    timeline1.to(gridMaterial, {
      opacity: 0.15,  // Daha hafif grid (0.25'ten düşük)
      duration: 0.8
    }, 0)
    
    timeline1.to(scanLight, {
      intensity: 2.8,  // Daha soft ışık (3.5'ten düşük)
      duration: 0.8
    }, 0)
    
    timeline1.to(particlesMaterial, {
      opacity: 0.8,  // Parçacıklar uçuşuyor
      duration: 0.8
    }, 0)
    
    // KAMERA ROTASYON: Card 1'de SOLA baksın 👈
    timeline1.to(conveyorGroup.rotation, {
      y: -0.25,  // Sola doğru hafif dönüş
      ease: 'power2.inOut'
    }, 0)
    
    // LOKMA 26: Mobilde 3D sahne yukarıda sabit kalır
    timeline1.to(conveyorGroup.position, {
      x: isMobile ? 0 : -4,    // Mobilde hareket yok
      y: isMobile ? 1 : 0,     // Mobilde yukarıda tut
      z: isMobile ? -2 : 0,    // Mobilde arkada sabit
      ease: 'power2.inOut'
    }, 0)
    
    // İlk kart hafif kayarak kaybolur
    timeline1.to(section1.value, {
      opacity: 0,
      x: isMobile ? 0 : -120,  // Mobilde yatay kayma yok
      y: isMobile ? -50 : 0,   // Mobilde yukarı kayar
      rotateY: isMobile ? 0 : 4,
      ease: 'power2.inOut'
    }, 0)
    
    // LOKMA 30: Card 1 kaybolurken - IŞIN KAPANIYOR 🔦
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
    
    // KAMERA ROTASYON: Card 2'de SAĞA baksın 👉
    timeline2.to(conveyorGroup.rotation, {
      y: 0.25,  // Sağa doğru dönüş (pozitif değer)
      ease: 'power2.inOut'
    }, 0)
    
    // LOKMA 26: Mobilde 3D sahne yukarıda sabit kalır
    timeline2.to(conveyorGroup.position, {
      x: isMobile ? 0 : 4,
      y: isMobile ? 1 : 0,     // Mobilde yukarıda tut
      z: isMobile ? -2 : 0,    // Mobilde arkada sabit
      ease: 'power2.inOut'
    }, 0)
    
    // LOKMA 30: Card 2 aktifken - TARAMA IŞINI TEKRAR AÇIK 🔦 (ELİT)
    timeline2.to(beamMaterial, {
      opacity: 0.25,  // Elit opacity
      duration: 0.8
    }, 0)
    
    timeline2.to(gridMaterial, {
      opacity: 0.15,  // Hafif grid
      duration: 0.8
    }, 0)
    
    timeline2.to(scanLight, {
      intensity: 2.8,  // Soft ışık
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
    
    // KAMERA ROTASYON: Card 3'te tekrar SOLA baksın 👈
    timeline3.to(conveyorGroup.rotation, {
      y: -0.25,  // Tekrar sola dönüş
      ease: 'power2.inOut'
    }, 0)
    
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

  // Uygulama Alanları bölümü için basit fade-in animasyonu
  if (sectorsSection.value) {
    gsap.from(sectorsSection.value.querySelectorAll('.tab-button'), {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      scrollTrigger: {
        trigger: sectorsSection.value,
        start: 'top 80%'
      }
    })
  }

  // İletişim Bölümü Fade-Up Animasyonu
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

<style>
/* ProSicht Premium Colors: Indigo & Turkuaz */
/* Preloader */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fafafa;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .preloader {
  background: #0f172a;
}

.preloader-content {
  text-align: center;
}

.preloader-logo-img {
  height: 250px;
  width: auto;
  margin: 6rem auto 3rem;
  display: block;
  opacity: 0;
  animation: fadeInLogo 0.8s ease 0.2s forwards;
  filter: drop-shadow(0 10px 30px rgba(13, 124, 108, 0.15));
}

@keyframes fadeInLogo {
  to {
    opacity: 1;
    transform: scale(1);
  }
  from {
    opacity: 0;
    transform: scale(0.95);
  }
}

.preloader-logo {
  font-size: 4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #0D7C6C 0%, #3DBAA2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  margin-bottom: 3rem;
}

.preloader-bar-wrapper {
  width: 300px;
  height: 4px;
  background: rgba(13, 124, 108, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto 1.5rem;
}

.preloader-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #0D7C6C 0%, #3DBAA2 100%);
  border-radius: 2px;
  transition: width 0.1s ease;
}

.preloader-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  opacity: 0.6;
}

.dark .preloader-text {
  color: #f1f5f9;
}

/* Header */
.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  backdrop-filter: blur(16px) saturate(180%);
  background: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgba(61, 186, 162, 0.1);
  transition: all 0.3s ease;
}

.dark .header-bar {
  background: rgba(15, 23, 42, 0.8);
  border-bottom: 1px solid rgba(61, 186, 162, 0.2);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-img {
  height: 110px;
  width: auto;
  transition: all 0.3s ease;
  cursor: pointer;
}

.logo-img:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 12px rgba(13, 124, 108, 0.2));
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.desktop-nav {
  display: flex;
}

.nav-link {
  position: relative;
  color: #1e293b;
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: 0.01em;
  padding-bottom: 0.25rem;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, #0D7C6C 0%, #3DBAA2 100%);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #0D7C6C;
}

.nav-link:hover::after {
  width: 100%;
}

.dark .nav-link {
  color: #e2e8f0;
}

.dark .nav-link:hover {
  color: #3DBAA2;
}

.nav-cta {
  padding: 0.625rem 1.5rem;
  background: #0D7C6C;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(13, 124, 108, 0.25);
}

.nav-cta:hover {
  background: #3DBAA2;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(61, 186, 162, 0.3);
}

/* LOKMA 25: Mobile Right Controls (Theme + Hamburger) */
.mobile-right-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #1e293b;
  transition: color 0.3s ease;
}

.mobile-menu-btn:hover {
  color: #0D7C6C;
}

.hamburger-icon {
  width: 28px;
  height: 28px;
}

/* ═══════════════════════════════════════════════════════════════ */
/* LOKMA 24: PREMIUM THEME TOGGLE - MIKRO ANİMASYON */
/* ═══════════════════════════════════════════════════════════════ */
.theme-toggle {
  position: relative;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 1rem;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(61, 186, 162, 0.4);
  box-shadow: 0 0 15px rgba(61, 186, 162, 0.3);
  transform: translateY(-2px);
}

.theme-toggle:active {
  transform: scale(0.95);
}

/* İkon Container */
.theme-icon {
  position: absolute;
  width: 24px;
  height: 24px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Sun Icon (Light Mode - Default) */
.sun-icon {
  color: #0D7C6C;
  transform: scale(1) rotate(0deg);
  opacity: 1;
}

.sun-icon.icon-hidden {
  transform: scale(0) rotate(90deg);
  opacity: 0;
}

/* Moon Icon (Dark Mode) */
.moon-icon {
  color: #3DBAA2;
  transform: scale(0) rotate(-90deg);
  opacity: 0;
}

.moon-icon.icon-visible {
  transform: scale(1) rotate(0deg);
  opacity: 1;
}

/* Dark Mode için buton stil değişimi */
.dark .theme-toggle {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(71, 85, 105, 0.6);
}

.dark .theme-toggle:hover {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(61, 186, 162, 0.4);
}

/* Mobile Responsive */
/* LOKMA 25: PREMIUM MOBİL OPTİMİZASYON */
@media (max-width: 768px) {
  /* Navigation mobilde tamamen gizle */
  .nav-menu {
    display: none !important;
  }
  
  .desktop-nav {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .logo-img {
    height: 60px; /* Mobilde biraz daha büyük */
  }
  
  .header-content {
    padding: 0.75rem 1rem;
    width: 100%;
    justify-content: space-between;
  }
  
  /* Theme toggle mobilde küçült */
  .theme-toggle {
    width: 42px;
    height: 42px;
  }
  
  .theme-icon {
    width: 20px;
    height: 20px;
  }
  
  /* Hamburger icon boyutu */
  .hamburger-icon {
    width: 24px;
    height: 24px;
  }
  
  /* Content wrapper mobilde padding ayarı */
  .content-wrapper {
    padding-top: 70px;
  }
  
  /* Glass cards mobilde tam genişlik ve küçük padding */
  .glass-card {
    width: 92%;
    max-width: 100%;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    border-radius: 1.5rem;
  }
  
  /* Title ve description mobilde küçült */
  .content-title {
    font-size: 1.75rem !important;
    line-height: 1.3;
  }
  
  .content-description {
    font-size: 0.95rem !important;
    margin-bottom: 1.5rem;
  }
  
  /* CTA buton mobilde daha küçük */
  .cta-button {
    padding: 0.75rem 1.75rem;
    font-size: 0.9rem;
  }
  
  /* Scene container mobilde ortala */
  .scene-container {
    overflow: hidden;
    
    height: 40vh;
  }
  
  canvas {
    transform: scale(0.6);
    transform-origin: center top;
  }
}

/* LOKMA 26: Premium Mobile Drawer Styles */
.mobile-drawer-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
}

.mobile-drawer-panel {
  position: relative;
  width: 75%;
  max-width: 280px;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border-left: 1px solid rgba(13, 124, 108, 0.2);
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.2);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.drawer-close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(13, 124, 108, 0.1);
  border-radius: 10px;
  color: #0D7C6C;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.drawer-close-btn:hover {
  background: rgba(13, 124, 108, 0.2);
  transform: rotate(90deg);
}

.drawer-nav {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.drawer-link {
  color: #1e293b;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.drawer-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: linear-gradient(135deg, #0D7C6C 0%, #3DBAA2 100%);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.drawer-link:hover {
  background: rgba(13, 124, 108, 0.1);
  color: #0D7C6C;
  padding-left: 1.5rem;
}

.drawer-link:hover::before {
  transform: scaleY(1);
}

/* Dark mode drawer styles */
.dark .mobile-drawer-panel {
  background: rgba(15, 23, 42, 0.95);
  border-left-color: rgba(61, 186, 162, 0.2);
}

.dark .drawer-close-btn {
  background: rgba(61, 186, 162, 0.1);
  color: #3DBAA2;
}

.dark .drawer-close-btn:hover {
  background: rgba(61, 186, 162, 0.2);
}

.dark .drawer-link {
  color: #e2e8f0;
}

.dark .drawer-link:hover {
  background: rgba(61, 186, 162, 0.1);
  color: #3DBAA2;
}

/* Drawer slide-in animation */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-active .mobile-drawer-panel,
.drawer-leave-active .mobile-drawer-panel {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .mobile-drawer-panel,
.drawer-leave-to .mobile-drawer-panel {
  transform: translateX(100%);
}

/* Scene */

/* Scene */
.scene-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  z-index: 0;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  pointer-events: none;
  padding-top: 80px;
  perspective: 1500px; /* LOKMA 21: 3D perspektif container */
}

.content-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  padding: 2rem;
  position: relative; /* LOKMA 21: Kartların overlap için */
  transform-style: preserve-3d; /* LOKMA 21: 3D transform korunur */
}

.glass-card {
  backdrop-filter: blur(16px) saturate(180%);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(61, 186, 162, 0.2);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-radius: 2rem;
  padding: 3rem 2.5rem;
  max-width: 900px;
  text-align: center;
  transition: all 0.4s ease;
  will-change: transform, opacity; /* LOKMA 21: Performans optimizasyonu */
  transform-style: preserve-3d; /* LOKMA 21: 3D derinlik */
}

.glass-card:hover {
  border-color: rgba(61, 186, 162, 0.4);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(61, 186, 162, 0.15);
}

.dark .glass-card {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(61, 186, 162, 0.3);
}

.dark .glass-card:hover {
  background: rgba(15, 23, 42, 0.5);
  border-color: rgba(61, 186, 162, 0.5);
}

.content-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.dark .content-title {
  color: #f1f5f9;
}

.content-description {
  font-size: 1.125rem;
  color: rgba(30, 41, 59, 0.8);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.dark .content-description {
  color: rgba(226, 232, 240, 0.8);
}

.text-gradient {
  background: linear-gradient(135deg, #0D7C6C 0%, #3DBAA2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* CTA Buttons */
.cta-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: #0D7C6C;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 25px -5px rgba(13, 124, 108, 0.4);
  letter-spacing: 0.01em;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0D7C6C 0%, #3DBAA2 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.cta-button:hover::before {
  opacity: 1;
}

.cta-button:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 
    0 20px 35px -5px rgba(13, 124, 108, 0.5),
    0 0 30px rgba(61, 186, 162, 0.3);
}

.cta-button > * {
  position: relative;
  z-index: 1;
}

.cta-button-secondary {
  background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);
  box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.4);
}

.cta-button-secondary::before {
  background: linear-gradient(135deg, #6366F1 0%, #EC4899 100%);
}

.cta-button-secondary:hover {
  box-shadow: 
    0 20px 35px -5px rgba(124, 58, 237, 0.5),
    0 0 30px rgba(236, 72, 153, 0.3);
}

.scroll-area {
  position: relative;
  z-index: 1;
  pointer-events: none;
  height: 0;
}

/* İstatistikler */
.stats-card {
  max-width: 1100px;
  padding: 4rem 3rem;
}

.stats-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
}

.dark .stats-title {
  color: #f1f5f9;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #0D7C6C 0%, #3DBAA2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-number {
  display: inline-block;
  min-width: 2ch;
  text-align: center;
}

.stat-symbol {
  font-size: 2.5rem;
  margin-left: 0.25rem;
  opacity: 0.8;
}

.stat-label {
  font-size: 1.125rem;
  font-weight: 500;
  color: rgba(30, 41, 59, 0.7);
  letter-spacing: 0.01em;
}

.dark .stat-label {
  color: rgba(226, 232, 240, 0.7);
}

/* Neden Biz? Bölümü */
.why-us-section {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .why-us-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.why-us-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.why-us-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
}

.why-us-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

@media (min-width: 768px) {
  .why-us-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .why-us-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.feature-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
}

.dark .feature-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(61, 186, 162, 0.2);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    0 0 30px rgba(61, 186, 162, 0.1);
  border-color: rgba(61, 186, 162, 0.3);
}

.dark .feature-card:hover {
  background: rgba(15, 23, 42, 0.6);
  border-color: rgba(61, 186, 162, 0.4);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(13, 124, 108, 0.1) 0%, rgba(61, 186, 162, 0.1) 100%);
  border-radius: 1rem;
  color: #3DBAA2;
}

.feature-icon .icon {
  width: 32px;
  height: 32px;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.dark .feature-title {
  color: #f1f5f9;
}

.feature-description {
  font-size: 1rem;
  color: rgba(30, 41, 59, 0.7);
  line-height: 1.7;
}

.dark .feature-description {
  color: rgba(226, 232, 240, 0.7);
}

/* InspectAI'ın İşletmeye Katkıları */
.contributions-section {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .contributions-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}

.contributions-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.contributions-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.contributions-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

@media (min-width: 768px) {
  .contributions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .contributions-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.contribution-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.dark .contribution-card {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(61, 186, 162, 0.2);
}

.contribution-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #0D7C6C 0%, #3DBAA2 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.contribution-card:hover::before {
  transform: scaleX(1);
}

.contribution-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 10px 30px rgba(6, 182, 212, 0.15),
    0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: rgba(61, 186, 162, 0.4);
}

.contribution-icon-wrapper {
  margin-bottom: 1.5rem;
}

.contribution-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(13, 124, 108, 0.1) 0%, rgba(61, 186, 162, 0.15) 100%);
  border-radius: 1rem;
  color: #0D7C6C;
}

.contribution-icon .icon {
  width: 28px;
  height: 28px;
  stroke-width: 2.5;
}

.contribution-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.dark .contribution-title {
  color: #f1f5f9;
}

.contribution-description {
  font-size: 0.95rem;
  color: rgba(30, 41, 59, 0.7);
  line-height: 1.7;
}

.dark .contribution-description {
  color: rgba(226, 232, 240, 0.7);
}

/* Uygulama Alanları - Tab Yapısı */
.applications-section {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .applications-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.applications-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  overflow: visible;
}

.applications-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
}

.dark .applications-title {
  color: #f1f5f9;
}

.tabs-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
  overflow: visible;
  position: relative;
  z-index: 10;
}

@media (max-width: 1024px) {
  .tabs-wrapper {
    gap: 0.75rem;
    padding: 0 1rem;
  }
}

@media (max-width: 768px) {
  .tabs-wrapper {
    gap: 0.5rem;
    flex-direction: column;
  }
}

.tab-button {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid #3DBAA2;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  color: #1e293b;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.1),
    0 2px 6px rgba(61, 186, 162, 0.15);
  white-space: nowrap;
  text-align: center;
  position: relative;
  overflow: visible;
  backdrop-filter: blur(10px);
  z-index: 1;
  opacity: 1 !important;
  visibility: visible !important;
  flex: 0 0 auto;
  min-width: 160px;
  height: auto;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .tab-button {
  background: rgba(15, 23, 42, 0.8);
  color: #e2e8f0;
  border-color: rgba(61, 186, 162, 0.5);
}

.tab-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(13, 124, 108, 0.05) 0%, rgba(61, 186, 162, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.tab-button:hover::before {
  opacity: 1;
}

.tab-button:hover {
  background: rgba(255, 255, 255, 1);
  border-color: #3DBAA2;
  transform: scale(1.05) translateY(-3px);
  box-shadow: 
    0 12px 30px rgba(61, 186, 162, 0.25),
    0 4px 15px rgba(0, 0, 0, 0.1),
    0 0 20px rgba(61, 186, 162, 0.15);
  color: #0D7C6C;
}

.dark .tab-button:hover {
  background: rgba(15, 23, 42, 0.95);
  color: #3DBAA2;
}

.tab-button.active {
  background: linear-gradient(135deg, #0D7C6C 0%, #3DBAA2 100%);
  color: white;
  font-weight: 700;
  border-color: transparent;
  box-shadow: 
    0 15px 40px rgba(13, 124, 108, 0.4),
    0 8px 20px rgba(61, 186, 162, 0.3),
    0 0 30px rgba(61, 186, 162, 0.2);
  transform: scale(1.08) translateY(-4px);
}

.tab-button.active::before {
  opacity: 0;
}

.tab-content {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.content-left {
  animation: fadeInLeft 0.5s ease;
}

.content-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.content-description {
  font-size: 1.125rem;
  color: rgba(30, 41, 59, 0.8);
  line-height: 1.8;
}

.content-right {
  animation: fadeInRight 0.5s ease;
}

.image-placeholder {
  aspect-ratio: 4/3;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(61, 186, 162, 0.3);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.12),
    0 8px 20px rgba(61, 186, 162, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .image-placeholder {
  background: rgba(15, 23, 42, 0.6);
  border-color: rgba(61, 186, 162, 0.4);
}

.image-placeholder:hover {
  transform: scale(1.02);
  box-shadow: 
    0 25px 60px rgba(0, 0, 0, 0.15),
    0 10px 25px rgba(61, 186, 162, 0.2);
  border-color: rgba(61, 186, 162, 0.5);
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-placeholder:hover .category-image {
  transform: scale(1.05);
}

.placeholder-icon {
  color: rgba(61, 186, 162, 0.3);
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* İletişim Bölümü */
.contact-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 6rem 2rem;
}

.dark .contact-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.contact-container {
  max-width: 1400px;
  width: 100%;
}

.contact-main-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
}

.dark .contact-main-title {
  color: #f1f5f9;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

/* Harita */
.map-wrapper {
  width: 100%;
  height: 100%;
  min-height: 500px;
}

.map-frame {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1.5rem;
  padding: 1rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.08),
    0 8px 16px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.dark .map-frame {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(61, 186, 162, 0.2);
}

.map-iframe {
  width: 100%;
  height: 100%;
  min-height: 480px;
  border: none;
  border-radius: 1rem;
}

/* İletişim Bilgileri */
.contact-info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-info-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.dark .contact-info-title {
  color: #f1f5f9;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.dark .contact-info-item {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(61, 186, 162, 0.2);
}

.contact-info-item:hover {
  transform: translateX(4px);
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(61, 186, 162, 0.3);
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.08),
    0 0 15px rgba(61, 186, 162, 0.1);
}

.dark .contact-info-item:hover {
  background: rgba(15, 23, 42, 0.7);
  border-color: rgba(61, 186, 162, 0.4);
}

.contact-icon-wrapper {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(13, 124, 108, 0.1) 0%, rgba(61, 186, 162, 0.1) 100%);
  border-radius: 0.75rem;
  color: #0D7C6C;
  transition: all 0.3s ease;
}

.contact-info-item:hover .contact-icon-wrapper {
  background: linear-gradient(135deg, rgba(13, 124, 108, 0.15) 0%, rgba(61, 186, 162, 0.15) 100%);
  color: #3DBAA2;
  transform: scale(1.1);
}

.contact-svg-icon {
  width: 22px;
  height: 22px;
  stroke-width: 2;
}

.contact-info-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(30, 41, 59, 0.8);
  margin: 0;
  flex: 1;
}

.dark .contact-info-text {
  color: rgba(226, 232, 240, 0.8);
}

/* Eski İletişim Stilleri (Yedek) */
.old-contact-form-section {
  display: none;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info {
  padding: 2rem 0;
}

.contact-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}

.contact-description {
  font-size: 1.25rem;
  color: rgba(30, 41, 59, 0.7);
  line-height: 1.6;
  margin-bottom: 3rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.125rem;
  color: #1e293b;
}

.contact-icon {
  font-size: 1.5rem;
}

.contact-form-wrapper {
  backdrop-filter: blur(16px) saturate(180%);
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2rem;
  padding: 3rem 2.5rem;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  outline: none;
  transition: all 0.3s ease;
  font-family: 'Space Grotesk', sans-serif;
  color: #1e293b;
}

.form-input::placeholder {
  color: rgba(30, 41, 59, 0.5);
}

.form-input:focus {
  background: rgba(255, 255, 255, 0.7);
  border-color: #3DBAA2;
  box-shadow: 0 0 0 3px rgba(61, 186, 162, 0.1);
  transform: translateY(-1px);
}

.form-button {
  width: 100%;
  padding: 1.125rem 2.5rem;
  background: #0D7C6C;
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 25px -5px rgba(13, 124, 108, 0.4);
  letter-spacing: 0.01em;
  position: relative;
  overflow: hidden;
}

.form-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0D7C6C 0%, #3DBAA2 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.form-button:hover::before {
  opacity: 1;
}

.form-button:hover {
  transform: scale(1.02) translateY(-2px);
  box-shadow: 
    0 20px 35px -5px rgba(13, 124, 108, 0.5),
    0 0 30px rgba(61, 186, 162, 0.3);
}

/* Bize Ulaşın Formu */
.contact-form-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 6rem 2rem;
}

.dark .contact-form-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.form-outer-container {
  max-width: 56rem;
  width: 100%;
  margin: 0 auto;
}

.form-glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 2rem;
  padding: 3rem 2.5rem;
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.08),
    0 8px 20px rgba(0, 0, 0, 0.04);
}

.dark .form-glass-card {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(61, 186, 162, 0.2);
}

.form-main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
}

.dark .form-main-title {
  color: #f1f5f9;
}

.premium-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .form-grid-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-grid-full {
  display: grid;
  grid-template-columns: 1fr;
}

.form-field {
  width: 100%;
}

.form-elite-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  background: rgba(248, 250, 252, 0.5);
  border: 1px solid rgba(226, 232, 240, 1);
  border-radius: 0.75rem;
  color: #1e293b;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .form-elite-input {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(61, 186, 162, 0.3);
  color: #e2e8f0;
}

.form-elite-input::placeholder {
  color: rgba(100, 116, 139, 0.5);
}

.dark .form-elite-input::placeholder {
  color: rgba(148, 163, 184, 0.5);
}

.form-elite-input:focus {
  background: rgba(255, 255, 255, 0.9);
  border-color: #3DBAA2;
  box-shadow: 0 0 0 3px rgba(61, 186, 162, 0.1);
  transform: translateY(-1px);
}

.dark .form-elite-input:focus {
  background: rgba(15, 23, 42, 0.8);
  border-color: #3DBAA2;
  box-shadow: 0 0 0 3px rgba(61, 186, 162, 0.2);
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 3rem;
}

.dark .form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
}

.form-textarea {
  resize: vertical;
  min-height: 130px;
  line-height: 1.6;
}

.form-submit-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
}

.form-premium-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: #0D7C6C;
  color: white;
  font-weight: 600;
  font-size: 1.05rem;
  font-family: 'Space Grotesk', sans-serif;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(13, 124, 108, 0.3);
  position: relative;
  overflow: hidden;
}

.form-premium-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #3DBAA2;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
  z-index: 0;
}

.form-premium-button:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

.form-premium-button:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 25px rgba(61, 186, 162, 0.4),
    0 4px 12px rgba(13, 124, 108, 0.2);
}

.button-text,
.button-icon {
  position: relative;
  z-index: 1;
}

.button-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.form-premium-button:hover .button-icon {
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .form-glass-card {
    padding: 2rem 1.5rem;
  }
  
  .form-main-title {
    font-size: 2rem;
  }
  
  .form-premium-button {
    width: 100%;
    justify-content: center;
  }
  
  .form-submit-wrapper {
    justify-content: stretch;
  }
}

/* ═══════════════════════════════════════════════════════════════ */
/* LOKMA 22: PARTNERLER VE İŞBİRLİKLERİ - PREMIUM GLASSMORPHISM */
/* ═══════════════════════════════════════════════════════════════ */
.partners-section {
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 6rem 2rem;
}

.dark .partners-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.partners-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

/* Başlık ve Alt Çizgi */
.partners-header {
  text-align: center;
  margin-bottom: 4rem;
}

.partners-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.dark .partners-title {
  color: #f1f5f9;
}

.partners-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #0D7C6C 0%, #3DBAA2 100%);
  margin: 0 auto;
  border-radius: 2px;
}

/* Grid Dizilimi */
.partners-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);  /* Mobil: 2 kolon */
  gap: 2rem;
}

@media (min-width: 640px) {
  .partners-grid {
    grid-template-columns: repeat(3, 1fr);  /* Tablet: 3 kolon */
  }
}

@media (min-width: 1024px) {
  .partners-grid {
    grid-template-columns: repeat(4, 1fr);  /* Desktop: 4 kolon */
    gap: 2.5rem;
  }
}

@media (min-width: 1280px) {
  .partners-grid {
    grid-template-columns: repeat(5, 1fr);  /* Geniş ekran: 5 kolon */
  }
}

/* Elite Glassmorphism Kart */
.partner-card {
  position: relative;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px) saturate(180%);
  border: 1px solid rgba(226, 232, 240, 0.5);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.dark .partner-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(61, 186, 162, 0.2);
}

/* Hover Efekti */
.partner-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(61, 186, 162, 0.3);
  box-shadow: 
    0 20px 40px -10px rgba(13, 124, 108, 0.15),
    0 0 0 1px rgba(61, 186, 162, 0.1);
}

.dark .partner-card:hover {
  background: rgba(15, 23, 42, 0.7);
  border-color: rgba(61, 186, 162, 0.4);
}

/* Logo Stili - GRAYSCALE Efekti */
.partner-logo {
  width: 100%;
  height: auto;
  max-width: 160px;
  max-height: 80px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.5s ease-out;
}

/* Hover'da Logo Orijinal Renge Döner */
.partner-card:hover .partner-logo {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.05);
}

/* Responsive Başlık */
@media (max-width: 768px) {
  .partners-title {
    font-size: 2rem;
  }
  
  .partners-section {
    padding: 4rem 1.5rem;
  }
  
  .partner-card {
    padding: 2rem 1.5rem;
    min-height: 120px;
  }
  
  .partner-logo {
    max-width: 120px;
    max-height: 60px;
  }
}

/* ═══════════════════════════════════════════════════════════════ */
/* LOKMA 23: BLOG & HABERLER - ASİMETRİK BENTO GRID */
/* ═══════════════════════════════════════════════════════════════ */
.blog-section {
  position: relative;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 6rem 2rem;
}

.dark .blog-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}

.blog-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

/* Başlık */
.blog-header {
  text-align: center;
  margin-bottom: 4rem;
}

.blog-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em;
}

.dark .blog-title {
  color: #f1f5f9;
}

/* Asimetrik Bento Grid */
.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
  
  /* Featured post - sol kolon, 2 satır */
  .blog-card-featured {
    grid-row: span 2;
  }
}

/* Premium Glassmorphism Kart */
.blog-card {
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.dark .blog-card {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(61, 186, 162, 0.2);
}

.blog-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(61, 186, 162, 0.4);
  box-shadow: 
    0 25px 50px -12px rgba(13, 124, 108, 0.15),
    0 0 0 1px rgba(61, 186, 162, 0.1);
}

.dark .blog-card:hover {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(61, 186, 162, 0.4);
}

/* Resim Konteyneri */
.blog-image-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  border-radius: 1.5rem 1.5rem 0 0;
}

.blog-card-featured .blog-image-wrapper {
  height: 400px;
}

@media (min-width: 1024px) {
  .blog-card-featured .blog-image-wrapper {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 1.5rem;
  }
  
  .blog-card-featured .blog-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%);
    padding: 3rem;
    color: white;
  }
  
  .blog-card-featured .blog-post-title,
  .blog-card-featured .blog-meta,
  .blog-card-featured .author-name,
  .blog-card-featured .blog-date {
    color: white !important;
  }
  
  .blog-card-featured .blog-tag {
    background: rgba(61, 186, 162, 0.3);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .blog-card-featured .author-avatar {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }
}

/* Resim Hover Efekti */
.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .blog-image {
  transform: scale(1.05);
}

/* İçerik */
.blog-content {
  padding: 2rem;
}

/* Etiketler */
.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.blog-tag {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: rgba(61, 186, 162, 0.1);
  color: #0D7C6C;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
}

.blog-tag:hover {
  background: rgba(61, 186, 162, 0.2);
  transform: translateY(-2px);
}

/* Başlık */
.blog-post-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.4;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
}

.dark .blog-post-title {
  color: #f1f5f9;
}

.blog-card:hover .blog-post-title {
  color: #0D7C6C;
}

.dark .blog-card:hover .blog-post-title {
  color: #3DBAA2;
}

.blog-card-featured .blog-post-title {
  font-size: 2rem;
}

/* Meta Bilgileri */
.blog-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.blog-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0D7C6C 0%, #3DBAA2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid rgba(61, 186, 162, 0.3);
}

.author-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
}

.dark .author-name {
  color: #cbd5e1;
}

.blog-date {
  font-size: 0.875rem;
  color: #94a3b8;
  font-style: italic;
}

.dark .blog-date {
  color: #64748b;
}

/* Daha Fazla Göster Butonu */
.blog-button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}

.blog-load-more {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: #0D7C6C;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.blog-load-more::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(61, 186, 162, 0.3), transparent);
  transition: left 0.6s ease;
}

.blog-load-more:hover::before {
  left: 100%;
}

.blog-load-more:hover {
  background: #3DBAA2;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(13, 124, 108, 0.3);
}

.button-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.blog-load-more:hover .button-arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .blog-title {
    font-size: 2rem;
  }
  
  .blog-section {
    padding: 4rem 1.5rem;
  }
  
  .blog-post-title {
    font-size: 1.25rem;
  }
  
  .blog-card-featured .blog-post-title {
    font-size: 1.5rem;
  }
  
  .blog-card-featured .blog-image-wrapper {
    height: 280px;
  }
}

/* Footer */
.footer {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 2rem;
  border-top: 1px solid rgba(61, 186, 162, 0.2);
}

.dark .footer {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-top: 1px solid rgba(61, 186, 162, 0.3);
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.footer-logo {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, #0D7C6C 0%, #3DBAA2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-copyright {
  color: rgba(30, 41, 59, 0.6);
  font-size: 0.875rem;
}

.dark .footer-copyright {
  color: rgba(226, 232, 240, 0.6);
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  color: rgba(30, 41, 59, 0.7);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.dark .footer-link {
  color: rgba(226, 232, 240, 0.7);
}

.footer-link:hover {
  color: #3DBAA2;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  font-size: 1.5rem;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .content-title {
    font-size: 2rem;
  }
  
  .content-description {
    font-size: 1rem;
  }
  
  .glass-card {
    padding: 2rem 1.5rem;
  }
  
  .cta-button {
    padding: 0.875rem 2rem;
    font-size: 0.9rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .stats-title {
    font-size: 1.75rem;
  }

  .stat-value {
    font-size: 3rem;
  }

  .stat-symbol {
    font-size: 2rem;
  }

  .stats-card {
    padding: 2.5rem 2rem;
  }

  .applications-title {
    font-size: 1.75rem;
  }

  .tabs-wrapper {
    gap: 0.5rem;
  }

  .tab-button {
    padding: 0.625rem 1rem;
    font-size: 0.85rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .content-title {
    font-size: 1.75rem;
  }

  .content-description {
    font-size: 1rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact-title {
    font-size: 2rem;
  }

  .contact-description {
    font-size: 1rem;
  }

  .contact-form-wrapper {
    padding: 2rem 1.5rem;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-left {
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-links {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Force refresh */
</style>
