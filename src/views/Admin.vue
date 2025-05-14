<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Header -->
    <header class="bg-white shadow">
      <div class="container-custom py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Panel de Administración</h1>
          <button 
            @click="logout" 
            class="px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Cerrar sesión
          </button>
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
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
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
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
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

      <!-- Admin Tabs -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button 
              @click="activeTab = 'posts'" 
              class="py-4 px-6 text-center border-b-2 font-medium text-sm" 
              :class="activeTab === 'posts' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            >
              Artículos
            </button>
            <button 
              @click="activeTab = 'contacts'" 
              class="py-4 px-6 text-center border-b-2 font-medium text-sm" 
              :class="activeTab === 'contacts' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            >
              Contactos
            </button>
            <button 
              @click="activeTab = 'emails'" 
              class="py-4 px-6 text-center border-b-2 font-medium text-sm" 
              :class="activeTab === 'emails' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            >
              Envío de Emails
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Posts Tab -->
          <div v-if="activeTab === 'posts'">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-medium text-gray-900">Administrar Artículos</h2>
              <a 
                href="/admin/cms" 
                target="_blank" 
                class="btn-primary"
              >
                Ir a Netlify CMS
              </a>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(post, index) in posts" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ post.title }}</div>
                      <div class="text-sm text-gray-500">{{ post.slug }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {{ post.category }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(post.publishDate) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                        {{ post.published ? 'Publicado' : 'Borrador' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Editar</a>
                      <a href="#" class="text-red-600 hover:text-red-900">Eliminar</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Contacts Tab -->
          <div v-if="activeTab === 'contacts'">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-medium text-gray-900">Lista de Contactos</h2>
              <button class="btn-secondary">
                Exportar CSV
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de registro
                    </th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(contact, index) in contacts" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ contact.name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-500">{{ contact.email }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(contact.date) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Ver detalles</a>
                      <a href="#" class="text-red-600 hover:text-red-900">Eliminar</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Emails Tab -->
          <div v-if="activeTab === 'emails'">
            <div class="mb-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Enviar Email a Contactos</h2>
              
              <div class="bg-gray-50 p-4 rounded-lg mb-6">
                <form @submit.prevent="sendEmail">
                  <div class="mb-4">
                    <label for="email-subject" class="block text-sm font-medium text-gray-700 mb-2">
                      Asunto
                    </label>
                    <input 
                      type="text" 
                      id="email-subject" 
                      v-model="emailForm.subject"
                      class="form-input"
                      placeholder="Ingresa el asunto del email"
                      required
                    />
                  </div>
                  
                  <div class="mb-4">
                    <label for="email-content" class="block text-sm font-medium text-gray-700 mb-2">
                      Contenido
                    </label>
                    <textarea 
                      id="email-content" 
                      v-model="emailForm.content"
                      rows="6"
                      class="form-input"
                      placeholder="Escribe el contenido del email..."
                      required
                    ></textarea>
                  </div>
                  
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Enviar a:
                    </label>
                    <div class="flex items-center">
                      <input 
                        type="radio" 
                        id="send-all" 
                        name="send-type" 
                        value="all"
                        v-model="emailForm.sendType"
                        class="mr-2"
                      />
                      <label for="send-all" class="mr-4">Todos los contactos</label>
                      
                      <input 
                        type="radio" 
                        id="send-selected" 
                        name="send-type" 
                        value="selected"
                        v-model="emailForm.sendType"
                        class="mr-2"
                      />
                      <label for="send-selected">Contactos seleccionados</label>
                    </div>
                  </div>
                  
                  <div v-if="emailForm.sendType === 'selected'" class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Selecciona contactos:
                    </label>
                    <div class="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                      <div 
                        v-for="(contact, index) in contacts" 
                        :key="index"
                        class="flex items-center p-2 hover:bg-gray-100"
                      >
                        <input 
                          type="checkbox" 
                          :id="`contact-${index}`" 
                          :value="contact.email"
                          v-model="emailForm.selectedContacts"
                          class="mr-2"
                        />
                        <label :for="`contact-${index}`" class="text-sm">
                          {{ contact.name }} ({{ contact.email }})
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex justify-end">
                    <button 
                      type="submit" 
                      class="btn-primary"
                      :disabled="isSubmitting"
                    >
                      <span v-if="isSubmitting">Enviando...</span>
                      <span v-else>Enviar Email</span>
                    </button>
                  </div>
                </form>
              </div>
              
              <h3 class="text-md font-medium text-gray-900 mb-4">Emails Enviados</h3>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Asunto
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de envío
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Destinatarios
                      </th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(email, index) in sentEmails" :key="index">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ email.subject }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatDate(email.date) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ email.recipientCount }} contactos
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" class="text-blue-600 hover:text-blue-900">Ver detalles</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('posts');
const isSubmitting = ref(false);

// Mock data
const stats = reactive({
  posts: 12,
  contacts: 48,
  downloads: 156
});

const posts = ref([
  {
    title: "5 Estrategias para Mejorar tu Productividad",
    slug: "5-estrategias-productividad",
    category: "Productividad",
    publishDate: "2023-04-15",
    published: true
  },
  {
    title: "Guía Completa de Marketing Digital para Principiantes",
    slug: "guia-marketing-digital-principiantes",
    category: "Marketing",
    publishDate: "2023-04-10",
    published: true
  },
  {
    title: "Cómo Crear un Plan de Negocios Efectivo",
    slug: "como-crear-plan-negocios-efectivo",
    category: "Negocios",
    publishDate: "2023-04-05",
    published: true
  },
  {
    title: "10 Tendencias de Diseño Web para este Año",
    slug: "tendencias-diseno-web",
    category: "Diseño",
    publishDate: "2023-03-28",
    published: true
  },
  {
    title: "SEO Avanzado: Estrategias para 2023",
    slug: "seo-avanzado-estrategias",
    category: "Marketing",
    publishDate: "2023-03-20",
    published: false
  }
]);

const contacts = ref([
  {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    date: "2023-04-15"
  },
  {
    name: "María García",
    email: "maria.garcia@example.com",
    date: "2023-04-14"
  },
  {
    name: "Carlos López",
    email: "carlos.lopez@example.com",
    date: "2023-04-12"
  },
  {
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    date: "2023-04-10"
  },
  {
    name: "Luis Rodríguez",
    email: "luis.rodriguez@example.com",
    date: "2023-04-08"
  }
]);

const sentEmails = ref([
  {
    subject: "Nuevo recurso disponible: Guía de SEO",
    date: "2023-04-16",
    recipientCount: 48
  },
  {
    subject: "Descubre nuestros últimos artículos",
    date: "2023-04-10",
    recipientCount: 42
  },
  {
    subject: "¡Oferta especial por tiempo limitado!",
    date: "2023-04-01",
    recipientCount: 35
  }
]);

const emailForm = reactive({
  subject: '',
  content: '',
  sendType: 'all',
  selectedContacts: [] as string[]
});

// Métodos
const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
};

const sendEmail = async () => {
  isSubmitting.value = true;
  
  try {
    // Aquí iría la lógica para enviar el email
    // Simulamos un retraso
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Añadir el email enviado a la lista
    const recipients = emailForm.sendType === 'all' 
      ? contacts.value.length 
      : emailForm.selectedContacts.length;
    
    sentEmails.value.unshift({
      subject: emailForm.subject,
      date: new Date().toISOString().split('T')[0],
      recipientCount: recipients
    });
    
    // Limpiar formulario
    emailForm.subject = '';
    emailForm.content = '';
    emailForm.sendType = 'all';
    emailForm.selectedContacts = [];
    
    alert('Email enviado correctamente');
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Error al enviar el email. Por favor intenta nuevamente.');
  } finally {
    isSubmitting.value = false;
  }
};

const logout = () => {
  // Aquí iría la lógica para cerrar sesión
  // Por ahora solo redirigimos a la página inicial
  router.push('/');
};

onMounted(() => {
  // Aquí se cargarían los datos reales desde una API
});
</script>