<template>
  <nav class="bg-white shadow">
    <div class="container-custom py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-blue-600">Brand</span>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="/" class="text-gray-600 hover:text-blue-600 transition-colors duration-300">Inicio</a>
          <a href="/blog" class="text-gray-600 hover:text-blue-600 transition-colors duration-300">Blog</a>
          <button 
            @click="scrollToForm" 
            class="btn-primary"
          >
            Descargar Recurso
          </button>
        </div>

        <!-- Mobile Navigation Button -->
        <div class="md:hidden">
          <button 
            @click="isMenuOpen = !isMenuOpen" 
            class="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                v-if="!isMenuOpen" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div 
        v-if="isMenuOpen" 
        class="md:hidden mt-4 pt-4 border-t border-gray-200"
      >
        <div class="flex flex-col space-y-4 pb-4">
          <a 
            href="/"
            class="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            @click="isMenuOpen = false"
          >
            Inicio
          </a>
          <a 
            href="/blog"
            class="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            @click="isMenuOpen = false"
          >
            Blog
          </a>
          <button 
            @click="scrollToFormMobile" 
            class="btn-primary w-full text-center"
          >
            Descargar Recurso
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const scrollToForm = () => {
  const formElement = document.getElementById('download-form');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToFormMobile = () => {
  isMenuOpen.value = false;
  setTimeout(() => {
    scrollToForm();
  }, 100);
};
</script>