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
      console.log("Ruta protegida detectada");

      // Comprobar si el usuario está autenticado
      const isAuthenticated = await authService.isAuthenticated();

      if (isAuthenticated) {
        const user = await authService.getUser();
        console.log('Usuario autenticado:', user); // 👈 DEBUG

        const allowedEmails = [
          "jlbarriossouza@gmail.com",
          "sandra.castillo.mkt@gmail.com",
        ];
        if (user && allowedEmails.includes(user.email)) {
          console.log("Usuario autorizado, permitiendo acceso");
          return next();
        } else {
          console.warn("Usuario autenticado pero no autorizado");
          return next("/"); // Puedes cambiar esto por /unauthorized
        }
      } else {
        console.log("Usuario no autenticado, redirigiendo a login");
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
