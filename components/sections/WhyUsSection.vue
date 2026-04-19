<template>
  <section class="why-us-section">
    <div class="why-us-container">
      <h2 class="why-us-title">Neden <span class="text-gradient">Biz?</span></h2>
      
      <div class="why-us-grid">
        <div
          v-for="feature in features"
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
</template>

<script setup lang="ts">
defineProps<{
  features: Array<{
    title: string
    desc: string
    icon: string
  }>
}>()
</script>

<style scoped>
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

.dark .why-us-title {
  color: #f1f5f9;
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
  background: linear-gradient(135deg, rgba(13, 124, 108, 0.1) 0%, rgba(61, 186, 162, 0.1) 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
  background: linear-gradient(135deg, rgba(13, 124, 108, 0.2) 0%, rgba(61, 186, 162, 0.2) 100%);
  transform: scale(1.1);
}

.icon {
  width: 32px;
  height: 32px;
  color: #0D7C6C;
}

.dark .icon {
  color: #3DBAA2;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.dark .feature-title {
  color: #f1f5f9;
}

.feature-description {
  font-size: 0.95rem;
  color: rgba(30, 41, 59, 0.7);
  line-height: 1.6;
}

.dark .feature-description {
  color: rgba(226, 232, 240, 0.7);
}

@media (max-width: 768px) {
  .why-us-title {
    font-size: 2rem;
  }

  .why-us-section {
    padding: 4rem 1rem;
  }
}
</style>
