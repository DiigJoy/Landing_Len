import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './assets/main.css';

// Importar páginas
import Home from './views/Home.vue';
import Blog from './views/Blog.vue';
import PostDetail from './views/PostDetail.vue';
import Admin from './views/Admin.vue';
import NotFound from './views/NotFound.vue';

// Configurar rutas
const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: Blog },
  { path: '/blog/:slug', component: PostDetail },
  { path: '/admin', component: Admin },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Crear app
const app = createApp(App);

// Usar router
app.use(router);

// Montar app
app.mount('#app');