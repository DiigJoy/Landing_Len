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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../services/auth-service";

const router = useRouter();
const activeTab = ref<string>("posts");
const isSubmitting = ref<boolean>(false);
const user = ref<any>(null);
const isLoading = ref<boolean>(true);
const authError = ref<string>("");

// Verificar autenticación antes de montar el componente
onBeforeMount(async () => {
  console.log("Admin component - verificando autenticación");
  try {
    // Inicializar Auth0
    await authService.init();

    // Verificar si el usuario está autenticado
    const isAuthenticated = await authService.isAuthenticated();

    if (!isAuthenticated) {
      console.log("Usuario no autenticado, redirigiendo a login");
      await authService.login();
      return;
    }

    console.log("Usuario autenticado, cargando componente Admin");
  } catch (error) {
    console.error("Error en la verificación de autenticación:", error);
    authError.value = "Error al verificar la autenticación. Por favor, intenta de nuevo.";
  }
});

onMounted(async () => {
  console.log("Admin component mounted");
  console.log("Verificando variables de Auth0:");
  console.log("VITE_AUTH0_DOMAIN:", import.meta.env.VITE_AUTH0_DOMAIN);
  console.log("VITE_AUTH0_CLIENT_ID:", import.meta.env.VITE_AUTH0_CLIENT_ID);

  try {
    // Obtener información del usuario
    user.value = await authService.getUser();
    console.log("Usuario autenticado:", user.value);

    if (!user.value) {
      console.warn("No se pudo obtener información del usuario");
    }
  } catch (error) {
    console.error("Error al cargar datos del usuario:", error);
    authError.value = "Error al cargar datos del usuario. Por favor, recarga la página.";
  } finally {
    isLoading.value = false;
  }
});

// Definir tipos para datos
interface Stats {
  posts: number;
  contacts: number;
  downloads: number;
}

// Mock data
const stats = reactive<Stats>({
  posts: 12,
  contacts: 48,
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
