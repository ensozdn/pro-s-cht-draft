<template>
  <section ref="contactSectionEl" class="contact-section" id="contact">
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
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  contactInfo: Array<{
    icon: string
    text: string
  }>
}>()

const contactSectionEl = ref<HTMLElement | null>(null)

defineExpose({ contactSectionEl })
</script>
