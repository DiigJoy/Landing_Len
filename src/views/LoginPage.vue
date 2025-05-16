<template>
  <div class="login-page">
    <h1>Iniciar sesión</h1>
    <div class="debug-info">
      <p><strong>AUTH0_DOMAIN:</strong> {{ domain }}</p>
      <p><strong>AUTH0_CLIENT_ID:</strong> {{ clientId }}</p>
    </div>
    <button @click="login" class="login-button">
      Iniciar sesión con Auth0
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const domain = ref(import.meta.env.VITE_AUTH0_DOMAIN || 'No disponible');
const clientId = ref(import.meta.env.VITE_AUTH0_CLIENT_ID || 'No disponible');

function login() {
  try {
    const redirectUri = encodeURIComponent(`${window.location.origin}/admin`);
    
    // Construir URL manualmente con parámetros mínimos
    const authUrl = `https://${domain.value}/authorize` +
      `?client_id=${encodeURIComponent(clientId.value)}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=code`;
    
    console.log('URL de Auth0:', authUrl);
    window.location.href = authUrl;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
}
</script>

<style scoped>
.login-page {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.debug-info {
  background-color: #e0e0e0;
  padding: 10px;
  margin: 20px 0;
  border-radius: 4px;
  font-family: monospace;
}

.login-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #2980b9;
}
</style>