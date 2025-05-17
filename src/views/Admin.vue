<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Estado de carga -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p class="text-gray-600">Cargando panel de administración...</p>
      </div>
    </div>

    <!-- Error de autenticación -->
    <div v-else-if="authError" class="flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div class="text-red-500 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-center mb-4">Error de autenticación</h2>
        <p class="text-gray-600 mb-6 text-center">{{ authError }}</p>
        <div class="flex justify-center">
          <button
            @click="login"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div v-else>
      <!-- Admin Header -->
      <header class="bg-white shadow">
        <div class="container-custom py-4">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-900">
              Panel de Administración
            </h1>
            <div class="flex items-center">
              <div v-if="user" class="mr-4 text-sm text-gray-600">
                Hola, {{ user.name || user.email }}
              </div>
              <button
                @click="logout"
                class="px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Admin Content -->
      <div class="container-custom py-8">
        <!-- Estadísticas -->
        <div class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Stats Card: Artículos -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center">
                <div class="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Total de Artículos</p>
                  <p class="text-2xl font-bold">{{ stats.posts }}</p>
                </div>
              </div>
            </div>

            <!-- Stats Card: Contactos -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center">
                <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Total de Contactos</p>
                  <p class="text-2xl font-bold">{{ stats.contacts }}</p>
                </div>
              </div>
            </div>

            <!-- Stats Card: Descargas -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center">
                <div class="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Descargas del Recurso</p>
                  <p class="text-2xl font-bold">{{ stats.downloads }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pestañas de navegación -->
        <div class="mb-6 border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="activeTab = 'posts'"
              :class="[
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Blog
            </button>
            <button
              @click="activeTab = 'forms'"
              :class="[
                activeTab === 'forms'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Formularios
            </button>
            <button
              @click="activeTab = 'analytics'"
              :class="[
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Analíticas
            </button>
          </nav>
        </div>

        <!-- Contenido de las pestañas -->
        <div>
          <!-- Pestaña de Blog -->
          <div v-if="activeTab === 'posts'" class="space-y-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold">Gestión del Blog</h2>
              <button
                @click="showBlogEditor = true"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Nuevo Post
              </button>
            </div>

            <!-- Editor de Blog -->
            <BlogEditor
              v-if="showBlogEditor"
              :post-to-edit="postToEdit"
              @saved="handlePostSaved"
              @cancelled="handleEditorClosed"
            />

            <!-- Lista de Posts -->
            <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div v-if="isLoadingPosts" class="p-6 text-center">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                <p class="text-gray-600">Cargando posts...</p>
              </div>

              <div v-else-if="posts.length === 0" class="p-6 text-center">
                <p class="text-gray-600">No hay posts publicados aún.</p>
              </div>

              <table v-else class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="post in posts" :key="post.slug" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ post.title }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {{ post.category }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(post.publishDate) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        @click="editPost(post)"
                        class="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Editar
                      </button>
                      <a
                        :href="`/blog/${post.slug}`"
                        target="_blank"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        Ver
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Pestaña de Formularios -->
          <div v-else-if="activeTab === 'forms'" class="space-y-6">
            <h2 class="text-xl font-bold mb-4">Formularios de Contacto</h2>

            <div class="bg-white rounded-lg shadow-sm p-6">
              <p class="text-gray-600 mb-4">Aquí podrás ver los datos de los formularios enviados por los usuarios.</p>

              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recurso</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(submission, index) in formSubmissions" :key="index" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ submission.name }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ submission.email }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ submission.resource }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(submission.date) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Pestaña de Analíticas -->
          <div v-else-if="activeTab === 'analytics'" class="space-y-6">
            <h2 class="text-xl font-bold mb-4">Analíticas del Sitio</h2>

            <div class="bg-white rounded-lg shadow-sm p-6">
              <p class="text-gray-600 mb-4">Aquí podrás ver las estadísticas de visitas a tu sitio web.</p>

              <div class="mb-6">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Posts más visitados</h3>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vistas</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="(post, index) in postAnalytics" :key="index" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ post.title }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ post.views }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p class="text-sm text-gray-500">
                  Para estadísticas más detalladas, consulta
                  <a href="https://analytics.google.com" target="_blank" class="text-blue-600 hover:underline">Google Analytics</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../services/auth-service";
import BlogEditor from "../components/BlogEditor.vue";
import { createGitHubService } from "../services/githubService";

const router = useRouter();
const activeTab = ref<string>("posts");
const user = ref<any>(null);
const isLoading = ref<boolean>(true);
const authError = ref<string>("");

// Estado para la gestión del blog
const showBlogEditor = ref<boolean>(false);
const postToEdit = ref<any>(null);
const posts = ref<any[]>([]);
const isLoadingPosts = ref<boolean>(false);

// Estado para formularios
const formSubmissions = ref<any[]>([
  { name: "Juan Pérez", email: "juan@example.com", resource: "Guía de Marketing", date: "2023-05-15" },
  { name: "María García", email: "maria@example.com", resource: "Plantilla SEO", date: "2023-05-10" },
  { name: "Carlos López", email: "carlos@example.com", resource: "Ebook Productividad", date: "2023-05-05" }
]);

// Estado para analíticas
const postAnalytics = ref<any[]>([
  { title: "5 Estrategias para Mejorar tu Productividad", views: 245 },
  { title: "Guía Completa de Marketing Digital", views: 189 },
  { title: "Cómo Crear un Plan de Negocios Efectivo", views: 132 }
]);

onMounted(async () => {
  console.log("Admin component mounted");

  try {
    // Obtener información del usuario
    user.value = await authService.getUser();
    // Usuario autenticado correctamente

    if (!user.value) {
      console.warn("No se pudo obtener información del usuario");
    }

    // Cargar posts
    await loadPosts();
  } catch (error) {
    console.error("Error al cargar datos del usuario:", error);
    authError.value = "Error al cargar datos del usuario. Por favor, recarga la página.";
  } finally {
    isLoading.value = false;
  }
});

// Cargar posts desde GitHub
const loadPosts = async () => {
  try {
    isLoadingPosts.value = true;

    // Verificar si las variables de entorno están configuradas
    if (!import.meta.env.VITE_GITHUB_TOKEN ||
        !import.meta.env.VITE_GITHUB_OWNER ||
        !import.meta.env.VITE_GITHUB_REPO) {
      console.warn('Variables de entorno de GitHub no configuradas');
      // Usar datos de ejemplo para desarrollo
      setTimeout(() => {
        posts.value = [
          {
            title: "5 Estrategias para Mejorar tu Productividad",
            slug: "5-estrategias-productividad",
            excerpt: "Descubre cómo organizar mejor tu tiempo...",
            publishDate: "2023-04-15",
            category: "Productividad"
          },
          {
            title: "Guía Completa de Marketing Digital",
            slug: "guia-marketing-digital",
            excerpt: "Todo lo que necesitas saber para promocionar tu negocio...",
            publishDate: "2023-04-10",
            category: "Marketing"
          }
        ];
        isLoadingPosts.value = false;
      }, 1000);
      return;
    }

    // Cargar posts desde GitHub
    const githubService = createGitHubService();
    const allPosts = await githubService.getAllPosts();
    posts.value = allPosts;
  } catch (error) {
    console.error('Error al cargar posts:', error);
  } finally {
    isLoadingPosts.value = false;
  }
};

// Editar un post existente
const editPost = (post: any) => {
  postToEdit.value = post;
  showBlogEditor.value = true;
};

// Manejar el guardado de un post
const handlePostSaved = async (result: any) => {
  showBlogEditor.value = false;
  postToEdit.value = null;

  // Recargar la lista de posts
  await loadPosts();
};

// Manejar el cierre del editor
const handleEditorClosed = () => {
  showBlogEditor.value = false;
  postToEdit.value = null;
};

// Formatear fecha
const formatDate = (dateString: string) => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
};

// Definir tipos para datos
interface Stats {
  posts: number;
  contacts: number;
  downloads: number;
}

// Estadísticas
const stats = reactive<Stats>({
  posts: computed(() => posts.value.length),
  contacts: computed(() => formSubmissions.value.length),
  downloads: 156,
});

// Función para iniciar sesión
const login = async (): Promise<void> => {
  try {
    authError.value = "";
    isLoading.value = true;
    await authService.login();
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    authError.value = "Error al iniciar sesión. Por favor, intenta de nuevo.";
  } finally {
    isLoading.value = false;
  }
};

// Función para cerrar sesión
const logout = async (): Promise<void> => {
  try {
    isLoading.value = true;
    await authService.logout();
    router.push('/');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    router.push('/');
  } finally {
    isLoading.value = false;
  }
};
</script>
