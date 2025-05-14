<template>
  <div class="bg-gray-50 min-h-screen flex items-center justify-center py-12">
    <div class="max-w-md mx-auto text-center px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <svg class="w-24 h-24 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p class="text-xl font-medium text-gray-900 mb-6">Página no encontrada</p>
      <p class="text-gray-600 mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/" class="btn-primary">
          Volver al Inicio
        </router-link>
        <router-link to="/blog" class="btn-secondary">
          Explorar el Blog
        </router-link>
      </div>
    </div>
  </div>
</template>