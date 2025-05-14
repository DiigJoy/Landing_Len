<template>
  <div>
    <!-- Hero Section - Mailchimp Style -->
    <section class="bg-yellow-300 text-gray-900 py-16 md:py-24">
      <div class="container-custom">
        <!-- Header with Logo and Navigation -->
        <div class="flex justify-between items-center mb-16">
          <div class="flex items-center">
            <span class="text-2xl font-bold">Laura Martínez</span>
          </div>
          <div class="hidden md:flex items-center space-x-6">
            <a href="#servicios" class="text-gray-800 hover:text-gray-600 font-medium">Servicios</a>
            <a href="#resultados" class="text-gray-800 hover:text-gray-600 font-medium">Resultados</a>
            <a href="/blog" class="text-gray-800 hover:text-gray-600 font-medium">Blog</a>
            <button
              @click="scrollToForm"
              class="bg-blue-600 text-white hover:bg-blue-700 font-medium px-4 py-2 rounded"
            >
              Contactar
            </button>
          </div>
        </div>

        <!-- Main Hero Content -->
        <div class="text-center mb-16">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Sé tú misma en<br>un escenario más grande</h1>
          <button
            @click="scrollToForm"
            class="bg-blue-600 text-white hover:bg-blue-700 font-medium px-6 py-3 rounded text-lg"
          >
            Agenda una Consulta
          </button>
        </div>

        <!-- Illustration -->
        <div class="flex justify-center">
          <img
            src="/images/marketing-illustration.png"
            alt="Marketing Illustration"
            class="max-w-md mx-auto"
            onerror="this.src='/images/ebook-mockup.png'"
          />
        </div>
      </div>
    </section>

    <!-- Value Proposition -->
    <section class="bg-white py-12 border-b border-gray-200">
      <div class="container-custom text-center">
        <p class="text-xl md:text-2xl font-medium text-gray-800">
          Laura Martínez te ayuda a encontrar tu audiencia ideal y mantenerla<br class="hidden md:block">
          comprometida para que puedas hacer crecer tu negocio.
        </p>
      </div>
    </section>

    <!-- Services Section - Mailchimp Style -->
    <section id="servicios" class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="flex justify-center mb-16">
          <div class="w-16 border-t-2 border-gray-300"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
          <!-- Service 1 -->
          <div class="text-center">
            <div class="mb-6 flex justify-center">
              <img
                src="/images/icon-workflows.png"
                alt="Workflows"
                class="w-24 h-24"
                onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2296%22 height=%2296%22 viewBox=%220 0 24 24%22><path fill=%22%23666%22 d=%22M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z%22/></svg>'"
              />
            </div>
            <h3 class="text-xl font-bold mb-3">Estrategia de Marketing</h3>
            <p class="text-gray-600">
              Personaliza tu estrategia y obtén resultados concretos con un enfoque adaptado a tu negocio.
            </p>
          </div>

          <!-- Service 2 -->
          <div class="text-center">
            <div class="mb-6 flex justify-center">
              <img
                src="/images/icon-revolutionize.png"
                alt="Revolutionize"
                class="w-24 h-24"
                onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2296%22 height=%2296%22 viewBox=%220 0 24 24%22><path fill=%22%23666%22 d=%22M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z%22/></svg>'"
              />
            </div>
            <h3 class="text-xl font-bold mb-3">Gestión de Redes Sociales</h3>
            <p class="text-gray-600">
              Tecnologías avanzadas para optimizar tu presencia en redes sociales y conectar con tu audiencia.
            </p>
          </div>

          <!-- Service 3 -->
          <div class="text-center">
            <div class="mb-6 flex justify-center">
              <img
                src="/images/icon-powerpack.png"
                alt="Powerpack"
                class="w-24 h-24"
                onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2296%22 height=%2296%22 viewBox=%220 0 24 24%22><path fill=%22%23666%22 d=%22M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z%22/></svg>'"
              />
            </div>
            <h3 class="text-xl font-bold mb-3">Análisis y Optimización</h3>
            <p class="text-gray-600">
              Utiliza datos para personalizar tus campañas y hacerte más productiva con resultados medibles.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- Why Choose Us Section - Mailchimp Style -->
    <section id="resultados" class="py-16 bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Image -->
          <div>
            <img
              src="/images/marketing-specialist.jpg"
              alt="Marketing Specialist"
              class="rounded-lg shadow-lg"
              onerror="this.onerror=null; this.src='/images/testimonial-1.jpg'"
            />
          </div>

          <!-- Content -->
          <div>
            <h2 class="text-3xl font-bold mb-6">Por Qué Elegirme</h2>
            <p class="text-gray-600 mb-8">
              Me enorgullezco de ofrecer servicios de marketing que cumplen con los más altos estándares de calidad. Cada estrategia es cuidadosamente diseñada, probada y adaptada para garantizar resultados y satisfacción del cliente.
            </p>

            <!-- Accordion -->
            <div class="space-y-4">
              <!-- Item 1 -->
              <div class="border-b border-gray-200 pb-4">
                <div class="flex justify-between items-center cursor-pointer">
                  <h3 class="text-lg font-semibold">Calidad Inigualable</h3>
                  <span class="text-2xl">+</span>
                </div>
                <div class="mt-2">
                  <p class="text-gray-600">
                    Cada estrategia es personalizada y basada en investigación profunda de tu mercado y audiencia.
                  </p>
                </div>
              </div>

              <!-- Item 2 -->
              <div class="border-b border-gray-200 pb-4">
                <div class="flex justify-between items-center cursor-pointer">
                  <h3 class="text-lg font-semibold">Resultados Comprobables</h3>
                  <span class="text-2xl">+</span>
                </div>
                <div class="mt-2">
                  <p class="text-gray-600">
                    Trabajo con métricas claras y reportes detallados para que puedas ver el retorno de tu inversión.
                  </p>
                </div>
              </div>

              <!-- Item 3 -->
              <div class="border-b border-gray-200 pb-4">
                <div class="flex justify-between items-center cursor-pointer">
                  <h3 class="text-lg font-semibold">Variedad de Servicios</h3>
                  <span class="text-2xl">-</span>
                </div>
                <div class="mt-2">
                  <p class="text-gray-600">
                    Ofrezco soluciones integrales que abarcan desde estrategia de contenidos hasta campañas de publicidad digital y análisis de datos.
                  </p>
                </div>
              </div>

              <!-- Item 4 -->
              <div class="border-b border-gray-200 pb-4">
                <div class="flex justify-between items-center cursor-pointer">
                  <h3 class="text-lg font-semibold">Experiencia Comprobada</h3>
                  <span class="text-2xl">+</span>
                </div>
                <div class="mt-2">
                  <p class="text-gray-600">
                    Con más de 8 años de experiencia en marketing digital, he ayudado a más de 50 empresas a crecer su presencia online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Latest Blog Posts -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="mb-4">Últimos Artículos</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora nuestro contenido más reciente y mantente actualizado con las últimas tendencias.
          </p>
        </div>

        <div v-if="latestPosts.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BlogCard
            v-for="post in latestPosts"
            :key="post.slug"
            :post="post"
          />
        </div>
        <div v-else class="text-center py-8">
          <p class="text-gray-500">Cargando artículos...</p>
        </div>

        <div class="mt-12 text-center">
          <router-link to="/blog" class="btn-primary">
            Ver Todos los Artículos
          </router-link>
        </div>
      </div>
    </section>



    <!-- Download Form -->
    <DownloadForm />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BlogCard from '../components/BlogCard.vue';
import DownloadForm from '../components/DownloadForm.vue';
import { getAllPosts, BlogPost } from '../services/contentService';

// Obtener posts más recientes para la sección de blog
const latestPosts = ref<BlogPost[]>([]);

// Función para desplazarse al formulario
const scrollToForm = () => {
  const formElement = document.getElementById('download-form');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' });
  }
};

// Cargar posts desde el servicio
onMounted(async () => {
  try {
    const allPosts = await getAllPosts();
    // Ordenar por fecha de publicación (más reciente primero) y tomar los 3 primeros
    latestPosts.value = allPosts
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, 3);
  } catch (error) {
    console.error('Error loading posts:', error);
  }
});
</script>