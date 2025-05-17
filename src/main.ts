// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import { trackPageView } from './services/analyticsService';
import { authService } from './services/auth-service';

// Crear app
const app = createApp(App);

// Usar router
app.use(router);

// Configurar seguimiento de navegación para Google Analytics
router.afterEach((to) => {
  // Registrar cambio de página en Google Analytics
  trackPageView({
    path: to.fullPath,
    title: to.meta.title as string || to.name as string
  });
});
await authService.init(); // Esperar inicialización completa antes de continuar

// Montar app
app.mount('#app');