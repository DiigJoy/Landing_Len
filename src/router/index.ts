// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { authService } from '../services/auth-service';
import Home from '../views/Home.vue';
import Blog from '../views/Blog.vue';
import PostDetail from '../views/PostDetail.vue';
import Admin from '../views/Admin.vue';
import NotFound from '../views/NotFound.vue';

// Configuración de rutas
const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: Blog },
  { path: '/blog/:slug', component: PostDetail },
  {
    path: '/admin',
    component: Admin,
    meta: { requiresAuth: true }
  },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardián de navegación para rutas protegidas
router.beforeEach(async (to, from, next) => {
  try {
    // Inicializar Auth0 en cada navegación
    await authService.init();

    // Verificar si la ruta requiere autenticación
    if (to.matched.some(record => record.meta.requiresAuth)) {
      console.log('Ruta protegida detectada');

      // Comprobar si el usuario está autenticado
      const isAuthenticated = await authService.isAuthenticated();

      if (isAuthenticated) {
        console.log('Usuario autenticado, permitiendo acceso');
        return next(); // Usar return para asegurar que la función termina aquí
      } else {
        console.log('Usuario no autenticado, redirigiendo a login');

        // Importante: llamar a next(false) para cancelar la navegación actual
        // antes de redirigir a Auth0
        next(false);

        // Iniciar el proceso de login (que ya incluye la pantalla de carga)
        authService.login();

        return; // Terminar la ejecución del guardián
      }
    }

    // Si la ruta no requiere autenticación, permitir acceso
    return next();
  } catch (error) {
    console.error('Error en el guardián de navegación:', error);
    return next(false); // Cancelar navegación en caso de error
  }
});

export default router;