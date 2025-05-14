<template>
  <div class="card h-full flex flex-col">
    <div class="relative pb-[60%]">
      <img 
        :src="post.coverImage || '/images/placeholder.jpg'" 
        :alt="post.title"
        class="absolute inset-0 w-full h-full object-cover"
      />

      <!-- Category Badge -->
      <div 
        v-if="post.category" 
        class="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded"
      >
        {{ post.category }}
      </div>
    </div>

    <div class="p-6 flex-grow flex flex-col">
      <div class="mb-3 text-sm text-gray-500 flex items-center">
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ formatDate(post.publishDate) }}
        </span>
      </div>

      <h3 class="text-xl font-bold mb-2 text-gray-900">{{ post.title }}</h3>

      <p class="text-gray-600 mb-4 flex-grow line-clamp-3">{{ post.excerpt || post.description }}</p>

      <router-link 
        :to="`/blog/${post.slug}`" 
        class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center group"
      >
        Leer más
        <svg 
          class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  post: {
    type: Object,
    required: true
  }
});

// Función para formatear fechas
const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
};
</script>