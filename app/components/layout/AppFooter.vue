<template>
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
</template>

<style scoped>
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
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-left {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
