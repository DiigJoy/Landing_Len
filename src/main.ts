// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';

// Crear app
const app = createApp(App);

// Usar router
app.use(router);

// Montar app
app.mount('#app');