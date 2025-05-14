<template>
  <div class="bg-gray-50 min-h-screen">
    <div v-if="post">
      <!-- Header -->
      <div class="relative">
        <!-- Background Image -->
        <div class="w-full h-96 relative">
          <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
          <img 
            :src="post.coverImage || '/images/placeholder.jpg'" 
            :alt="post.title"
            class="w-full h-full object-cover"
          />
          
          <!-- Content -->
          <div class="absolute inset-0 flex items-center">
            <div class="container-custom">
              <div class="max-w-2xl">
                <div 
                  v-if="post.category" 
                  class="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded mb-4"
                >
                  {{ post.category }}
                </div>
                <h1 class="text-white mb-4">{{ post.title }}</h1>
                <p class="text-gray-200 mb-6 text-lg">{{ post.excerpt }}</p>
                <div class="flex items-center text-gray-300 text-sm">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Publicado el {{ formatDate(post.publishDate) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Article Content -->
      <div class="container-custom py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <div class="bg-white p-8 rounded-lg shadow-sm">
              <!-- Article Body -->
              <div class="prose prose-lg max-w-none">
                <div v-if="post.content" v-html="processedContent"></div>
                <div v-else>
                  <p>
                    El contenido de este artículo no está disponible en este momento. Por favor, intenta más tarde.
                  </p>
                </div>
              </div>
              
              <!-- Tags -->
              <div class="mt-8 pt-6 border-t border-gray-200">
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="(tag, index) in post.tags || ['productividad', 'desarrollo', 'consejos']" 
                    :key="index"
                    class="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
              
              <!-- Share -->
              <div class="mt-8 flex items-center">
                <span class="text-gray-700 mr-4">Compartir:</span>
                <div class="flex space-x-3">
                  <a href="#" class="text-gray-500 hover:text-blue-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" class="text-gray-500 hover:text-blue-400">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" class="text-gray-500 hover:text-green-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM8.5 6.5h3v3h-3v-3zM6 15h12v2H6v-2zm3.5-4.5h5v2h-5v-2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Author -->
            <div class="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <div class="flex items-center">
                <div class="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mr-4">
                  <img src="/images/author.jpg" alt="Autor" class="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 class="font-bold text-lg">Juan Pérez</h3>
                  <p class="text-gray-600 text-sm">
                    Especialista en marketing digital con más de 10 años de experiencia ayudando a empresas a crecer online.
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Related Posts -->
            <div class="mt-12">
              <h3 class="text-2xl font-bold mb-6">Artículos Relacionados</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  v-for="(relatedPost, index) in relatedPosts" 
                  :key="index"
                  class="card flex flex-col h-full"
                >
                  <div class="h-48 relative">
                    <img 
                      :src="relatedPost.coverImage || '/images/placeholder.jpg'" 
                      :alt="relatedPost.title"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="p-4 flex-grow flex flex-col">
                    <h4 class="font-bold mb-1">{{ relatedPost.title }}</h4>
                    <p class="text-sm text-gray-600 mb-2 flex-grow">
                      {{ relatedPost.excerpt.substring(0, 80) }}...
                    </p>
                    <router-link 
                      :to="`/blog/${relatedPost.slug}`" 
                      class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Leer más →
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Download CTA -->
            <div class="bg-blue-50 p-6 rounded-lg shadow-sm mb-8">
              <h3 class="text-xl font-bold mb-4 text-blue-800">Descarga Nuestro Recurso</h3>
              <p class="text-gray-600 mb-4">
                Accede a nuestro ebook gratuito y descubre estrategias exclusivas para mejorar tus resultados.
              </p>
              <router-link 
                to="/#download-form" 
                class="btn-primary block text-center"
              >
                Descargar Gratis
              </router-link>
            </div>
            
            <!-- Popular Posts -->
            <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 class="text-lg font-bold mb-4">Artículos Populares</h3>
              <div class="space-y-4">
                <div 
                  v-for="(popularPost, index) in popularPosts" 
                  :key="index"
                  class="flex items-start"
                >
                  <div class="w-16 h-16 bg-gray-200 rounded overflow-hidden mr-3 flex-shrink-0">
                    <img 
                      :src="popularPost.coverImage || '/images/placeholder.jpg'" 
                      :alt="popularPost.title"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 class="font-bold text-sm mb-1">
                      <router-link 
                        :to="`/blog/${popularPost.slug}`" 
                        class="hover:text-blue-600"
                      >
                        {{ popularPost.title }}
                      </router-link>
                    </h4>
                    <p class="text-xs text-gray-500">
                      {{ formatDate(popularPost.publishDate) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Categories -->
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-bold mb-4">Categorías</h3>
              <div class="space-y-2">
                <router-link 
                  v-for="(category, index) in categories" 
                  :key="index"
                  :to="`/blog?category=${category}`"
                  class="block py-2 px-3 rounded hover:bg-gray-100 hover:text-blue-600 transition-colors"
                >
                  {{ category }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Loading -->
    <div v-else-if="isLoading" class="container-custom py-24 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
      <p class="text-gray-600">Cargando artículo...</p>
    </div>
    
    <!-- Not Found -->
    <div v-else class="container-custom py-24 text-center">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-2xl font-bold mb-2">Artículo No Encontrado</h2>
      <p class="text-gray-600 mb-6">
        Lo sentimos, el artículo que buscas no existe o ha sido eliminado.
      </p>
      <router-link to="/blog" class="btn-primary">
        Volver al Blog
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { marked } from 'marked';
import { getPostBySlug, getAllPosts, BlogPost } from '../services/contentService';

const route = useRoute();
const router = useRouter();

// Estado
const post = ref<BlogPost | null>(null);
const isLoading = ref(true);
const allPosts = ref<BlogPost[]>([]);

// Métodos
const fetchPost = async () => {
  isLoading.value = true;
  
  try {
    // Usar servicio para obtener el post y todos los posts
    const slug = route.params.slug as string;
    post.value = await getPostBySlug(slug);
    allPosts.value = await getAllPosts();
  } catch (error) {
    console.error('Error fetching post:', error);
    post.value = null;
  } finally {
    isLoading.value = false;
  }
};

// Procesar contenido Markdown si existe
const processedContent = computed(() => {
  if (!post.value?.content) return '';
  
  // Verificar si el contenido ya está en HTML
  if (post.value.content.trim().startsWith('<')) {
    return post.value.content;
  }
  
  // Convertir Markdown a HTML
  return marked(post.value.content);
});

// Computados
const categories = computed(() => {
  const allCategories = allPosts.value.map(post => post.category);
  return [...new Set(allCategories)].sort();
});

const relatedPosts = computed(() => {
  if (!post.value) return [];
  
  // Buscar posts de la misma categoría (excluyendo el post actual)
  return allPosts.value
    .filter(p => p.slug !== post.value?.slug && p.category === post.value?.category)
    .slice(0, 2);
});

const popularPosts = computed(() => {
  // En un escenario real, se ordenarían por visitas o interacciones
  return allPosts.value.slice(0, 3);
});

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
};

// Ciclo de vida
onMounted(() => {
  fetchPost();
});
</script>

<style>
/* Estilos adicionales para el contenido del artículo (prosa) */
.prose h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #1e3a8a;
}

.prose p {
  margin-bottom: 1.25rem;
  line-height: 1.7;
}

.prose ul {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
  list-style-type: disc;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  font-style: italic;
  margin: 1.5rem 0;
  color: #4b5563;
}
</style>