<template>
  <section class="partners-section">
    <div class="partners-container">
      <!-- Başlık -->
      <div class="partners-header">
        <h2 class="partners-title">{{ $t('partners.title') }}</h2>
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
</template>

<script setup lang="ts">
defineProps<{
  partners: Array<{
    name: string
    logo: string
  }>
}>()
</script>
