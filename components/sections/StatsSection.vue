<template>
  <section ref="statsSectionEl" class="content-section">
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
</template>

<script setup lang="ts">
import { ref } from 'vue'

const statsSectionEl = ref<HTMLElement>()

defineExpose({
  statsSectionEl
})
</script>

<style scoped>
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

@media (max-width: 768px) {
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

  .stats-card {
    padding: 2.5rem 2rem;
  }
}
</style>
