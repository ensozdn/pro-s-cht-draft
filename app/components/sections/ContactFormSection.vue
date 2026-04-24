<template>
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { t, locale } = useI18n()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  applicationArea: '',
  message: ''
})

const applicationAreas = computed(() => [
  { value: 'metal-celik', label: t('form.areas.metalSteel', {}, { locale: locale.value }) },
  { value: 'deri', label: t('form.areas.leather', {}, { locale: locale.value }) },
  { value: 'tekstil', label: t('form.areas.textile', {}, { locale: locale.value }) },
  { value: 'mobilya', label: t('form.areas.furniture', {}, { locale: locale.value }) },
  { value: 'mermer', label: t('form.areas.marble', {}, { locale: locale.value }) },
  { value: 'cam', label: t('form.areas.glass', {}, { locale: locale.value }) },
  { value: 'son-kalite', label: t('form.areas.finalQuality', {}, { locale: locale.value }) }
])

const handleSubmit = () => {
  console.log('Form gönderildi:', form.value)
  alert('Mesajınız başarıyla gönderildi!')
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    applicationArea: '',
    message: ''
  }
}
</script>
