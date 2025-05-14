<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
      <div class="container-custom">
        <h1 class="text-center text-white mb-4">Nuestro Blog</h1>
        <p class="text-xl text-center text-blue-100 max-w-2xl mx-auto">
          Explora nuestros artículos y mantente actualizado con las últimas tendencias y consejos.
        </p>
      </div>
    </div>
    
    <!-- Content -->
    <div class="container-custom py-12">
      <!-- Search and Filter -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full md:w-2/3">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar artículos..." 
              class="form-input w-full"
            />
          </div>
          <div class="w-full md:w-1/3">
            <select 
              v-model="selectedCategory" 
              class="form-input w-full"
            >
              <option value="">Todas las categorías</option>
              <option 
                v-for="category in categories" 
                :key="category" 
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Blog Posts Grid -->
      <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCard 
          v-for="post in filteredPosts" 
          :key="post.slug" 
          :post="post" 
        />
      </div>
      
      <!-- No Results -->
      <div v-else-if="!isLoading" class="text-center py-16">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 class="text-xl font-bold mb-2">No se encontraron resultados</h3>
        <p class="text-gray-600 mb-4">
          No se encontraron artículos que coincidan con tu búsqueda.
        </p>
        <button 
          @click="resetFilters" 
          class="btn-secondary"
        >
          Reiniciar filtros
        </button>
      </div>
      
      <!-- Loading -->
      <div v-else class="text-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
        <p class="text-gray-600">Cargando artículos...</p>
      </div>
      
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-12 flex justify-center">
        <div class="flex space-x-2">
          <button 
            @click="currentPage > 1 && (currentPage--)" 
            :disabled="currentPage === 1" 
            class="px-3 py-1 rounded-md" 
            :class="currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'"
          >
            &lt; Anterior
          </button>
          
          <button 
            v-for="page in paginationArray" 
            :key="page" 
            @click="currentPage = page" 
            class="px-3 py-1 rounded-md" 
            :class="currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'"
          >
            {{ page }}
          </button>
          
          <button 
            @click="currentPage < totalPages && (currentPage++)" 
            :disabled="currentPage === totalPages" 
            class="px-3 py-1 rounded-md" 
            :class="currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'"
          >
            Siguiente &gt;
          </button>
        </div>
      </div>
    </div>
    
    <!-- CTA -->
    <div class="bg-blue-50 py-12">
      <div class="container-custom">
        <div class="max-w-xl mx-auto text-center">
          <h2 class="mb-4">¿Te gustaría recibir más consejos?</h2>
          <p class="text-lg text-gray-600 mb-6">
            Descarga nuestro recurso gratuito y obtén acceso a estrategias exclusivas.
          </p>
          <router-link to="/#download-form" class="btn-primary">
            Descargar Recurso Gratuito
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue';
import BlogCard from '../components/BlogCard.vue';
import { getAllPosts, BlogPost } from '../services/contentService';

// Estado
const posts = ref<BlogPost[]>([]);
const isLoading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref('');
const currentPage = ref(1);
const postsPerPage = ref(9);

// Mock datos para ejemplo
const mockPosts = [
  {
    title: "5 Estrategias para Mejorar tu Productividad",
    slug: "5-estrategias-productividad",
    excerpt: "Descubre cómo organizar mejor tu tiempo y lograr más resultados en menos tiempo...",
    description: "En este artículo, exploraremos cinco estrategias comprobadas para aumentar significativamente tu productividad diaria...",
    publishDate: "2023-04-15",
    coverImage: "/images/blog/productivity.jpg",
    category: "Productividad"
  },
  {
    title: "Guía Completa de Marketing Digital para Principiantes",
    slug: "guia-marketing-digital-principiantes",
    excerpt: "Todo lo que necesitas saber para comenzar a promocionar tu negocio en el mundo digital...",
    description: "Si estás dando tus primeros pasos en el marketing digital, esta guía te proporcionará los fundamentos esenciales...",
    publishDate: "2023-04-10",
    coverImage: "/images/blog/marketing.jpg",
    category: "Marketing"
  },
  {
    title: "Cómo Crear un Plan de Negocios Efectivo",
    slug: "como-crear-plan-negocios-efectivo",
    excerpt: "Aprende los elementos esenciales para desarrollar un plan de negocios que atraiga inversionistas...",
    description: "Un plan de negocios sólido es fundamental para el éxito de cualquier empresa. En este artículo, te mostramos cómo crear uno paso a paso...",
    publishDate: "2023-04-05",
    coverImage: "/images/blog/business.jpg",
    category: "Negocios"
  },
  {
    title: "10 Tendencias de Diseño Web para este Año",
    slug: "tendencias-diseno-web",
    excerpt: "Mantente al día con las últimas tendencias en diseño web que marcarán este año...",
    description: "El diseño web evoluciona constantemente. Descubre las tendencias más innovadoras que dominarán el panorama digital...",
    publishDate: "2023-03-28",
    coverImage: "/images/blog/web-design.jpg",
    category: "Diseño"
  },
  {
    title: "Finanzas Personales: Cómo Crear un Presupuesto",
    slug: "finanzas-personales-presupuesto",
    excerpt: "Guía paso a paso para organizar tus finanzas y crear un presupuesto que realmente funcione...",
    description: "Tomar control de tus finanzas comienza con un presupuesto bien estructurado. Aprende cómo crear uno que se adapte a tus necesidades...",
    publishDate: "2023-03-20",
    coverImage: "/images/blog/finance.jpg",
    category: "Finanzas"
  },
  {
    title: "Inteligencia Artificial: Aplicaciones Prácticas para Negocios",
    slug: "inteligencia-artificial-negocios",
    excerpt: "Descubre cómo implementar IA en tu negocio para optimizar procesos y aumentar la productividad...",
    description: "La inteligencia artificial ya no es solo para grandes corporaciones. Conoce aplicaciones prácticas que pueden transformar tu empresa...",
    publishDate: "2023-03-15",
    coverImage: "/images/blog/ai.jpg",
    category: "Tecnología"
  },
  {
    title: "Storytelling: El Arte de Contar Historias en Marketing",
    slug: "storytelling-marketing",
    excerpt: "Aprende a conectar emocionalmente con tu audiencia a través de historias memorables...",
    description: "El storytelling es una herramienta poderosa en marketing. Descubre cómo crear narrativas que resuenen con tu público objetivo...",
    publishDate: "2023-03-10",
    coverImage: "/images/blog/storytelling.jpg",
    category: "Marketing"
  },
  {
    title: "Gestión del Tiempo: Técnicas para Profesionales Ocupados",
    slug: "gestion-tiempo-profesionales",
    excerpt: "Estrategias efectivas para optimizar tu tiempo y alcanzar un mejor equilibrio entre vida y trabajo...",
    description: "Para los profesionales con agendas saturadas, dominar la gestión del tiempo es esencial. Estas técnicas te ayudarán a maximizar tu productividad...",
    publishDate: "2023-03-05",
    coverImage: "/images/blog/time-management.jpg",
    category: "Productividad"
  },
  {
    title: "SEO Local: Cómo Posicionar tu Negocio en tu Ciudad",
    slug: "seo-local-negocios",
    excerpt: "Guía práctica para mejorar la visibilidad de tu negocio en búsquedas locales...",
    description: "El SEO local es fundamental para negocios con presencia física. Aprende estrategias específicas para destacar en tu área geográfica...",
    publishDate: "2023-02-28",
    coverImage: "/images/blog/local-seo.jpg",
    category: "Marketing"
  },
  {
    title: "Liderazgo Efectivo en Equipos Remotos",
    slug: "liderazgo-equipos-remotos",
    excerpt: "Claves para dirigir con éxito equipos distribuidos geográficamente en la era del trabajo remoto...",
    description: "El trabajo remoto presenta desafíos únicos para los líderes. Descubre cómo mantener a tu equipo motivado y productivo a distancia...",
    publishDate: "2023-02-20",
    coverImage: "/images/blog/remote-leadership.jpg",
    category: "Liderazgo"
  },
  {
    title: "Métricas Clave para Evaluar el Éxito de tu Estrategia de Contenidos",
    slug: "metricas-estrategia-contenidos",
    excerpt: "Aprende qué indicadores debes monitorear para medir la efectividad de tu marketing de contenidos...",
    description: "No basta con crear contenido, es crucial medir su desempeño. Estas métricas te ayudarán a evaluar y optimizar tu estrategia...",
    publishDate: "2023-02-15",
    coverImage: "/images/blog/content-metrics.jpg",
    category: "Marketing"
  },
  {
    title: "Mindfulness en el Trabajo: Técnicas para Reducir el Estrés",
    slug: "mindfulness-trabajo-estres",
    excerpt: "Prácticas sencillas para aumentar la concentración y disminuir la ansiedad en el entorno laboral...",
    description: "El mindfulness puede transformar tu experiencia laboral. Conoce ejercicios prácticos que puedes incorporar a tu rutina diaria...",
    publishDate: "2023-02-10",
    coverImage: "/images/blog/mindfulness.jpg",
    category: "Bienestar"
  }
];

// Computados
const categories = computed(() => {
  const allCategories = posts.value.map(post => post.category);
  return [...new Set(allCategories)].sort();
});

const filteredPosts = computed(() => {
  let result = [...posts.value];
  
  // Filtrar por categoría
  if (selectedCategory.value) {
    result = result.filter(post => post.category === selectedCategory.value);
  }
  
  // Filtrar por búsqueda
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query) ||
      (post.description && post.description.toLowerCase().includes(query))
    );
  }
  
  // Ordenar por fecha (más reciente primero)
  result.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  
  return result;
});

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value;
  const end = start + postsPerPage.value;
  return filteredPosts.value.slice(start, end);
});

const totalPages = computed(() => 
  Math.ceil(filteredPosts.value.length / postsPerPage.value)
);

const paginationArray = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i);
  }
  return pages;
});

// Métodos
const fetchPosts = async () => {
  isLoading.value = true;
  
  try {
    // Obtenemos los posts desde nuestro servicio
    posts.value = await getAllPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
    posts.value = [];
  } finally {
    isLoading.value = false;
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  currentPage.value = 1;
};

// Observadores
watchEffect(() => {
  // Cuando cambian los filtros, volver a la primera página
  if (searchQuery.value || selectedCategory.value) {
    currentPage.value = 1;
  }
});

// Ciclo de vida
onMounted(() => {
  fetchPosts();
});
</script>