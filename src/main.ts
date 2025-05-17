// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import { trackPageView } from './services/analyticsService';
import { authService } from './services/auth-service';


async function bootstrap() {
  // Inicializar Auth0
  await authService.init();

  // Crear app
  const app = createApp(App);

  // Usar router
  app.use(router);

  // Google Analytics
  router.afterEach((to) => {
    trackPageView({
      path: to.fullPath,
      title: to.meta.title as string || to.name as string
    });
  });

  // Montar
  app.mount('#app');
}

bootstrap(); // 👈 Esto sí se puede hacer en cualquier entorno