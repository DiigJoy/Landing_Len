// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import { authService } from "../services/auth-service";
import Home from "../views/Home.vue";
import Blog from "../views/Blog.vue";
import PostDetail from "../views/PostDetail.vue";
import Admin from "../views/Admin.vue";
import NotFound from "../views/NotFound.vue";

// Configuración de rutas
const routes = [
  { path: "/", component: Home },
  { path: "/blog", component: Blog },
  { path: "/blog/:slug", component: PostDetail },
  {
    path: "/admin",
    component: Admin,
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardián de navegación para rutas protegidas
router.beforeEach(async (to, from, next) => {
  try {
    // Verificar si la ruta requiere autenticación
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Comprobar si el usuario está autenticado
      const isAuthenticated = await authService.isAuthenticated();

      if (isAuthenticated) {
        // El usuario está autenticado, verificar si está autorizado
        const user = await authService.getUser();

        if (user && user.email) {
          // El usuario está autorizado (la verificación de email ya se hizo en auth-service)
          return next();
        } else {
          // Usuario sin información completa
          await authService.logout();
          return next("/");
        }
      } else {
        // Usuario no autenticado, iniciar flujo de login
        next(false); // Cancelar navegación actual
        authService.login(); // Lanzar login con Auth0
        return;
      }
    }

    // Si la ruta no requiere autenticación, permitir acceso
    return next();
  } catch (error) {
    console.error("Error en el guardián de navegación:", error);
    return next(false); // Cancelar navegación en caso de error
  }
});

export default router;
