<template>
  <div class="download-form bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-bold mb-4">{{ title }}</h3>
    <p class="text-gray-600 mb-4">{{ description }}</p>
    
    <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      <p>¡Gracias por registrarte! Tu descarga comenzará en unos segundos.</p>
    </div>
    
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <p>{{ error }}</p>
    </div>
    
    <!-- Formulario de Netlify -->
    <form 
      v-if="!success" 
      name="download-resource" 
      method="POST" 
      data-netlify="true" 
      netlify-honeypot="bot-field"
      @submit.prevent="submitForm"
    >
      <!-- Campo oculto para Netlify Forms -->
      <input type="hidden" name="form-name" value="download-resource" />
      <input type="hidden" name="resource" :value="resourceId" />
      
      <!-- Campo honeypot para evitar spam -->
      <p class="hidden">
        <label>No llenar si eres humano: <input name="bot-field" /></label>
      </p>
      
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
        <input 
          type="text" 
          id="name" 
          name="name"
          v-model="form.name" 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
      </div>
      
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          v-model="form.email" 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
      </div>
      
      <div class="flex items-center justify-between">
        <button 
          type="submit" 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Procesando...</span>
          <span v-else>Descargar ahora</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// Propiedades del componente
const props = defineProps({
  title: {
    type: String,
    default: 'Descarga nuestro recurso gratuito'
  },
  description: {
    type: String,
    default: 'Completa el formulario para recibir acceso inmediato.'
  },
  resourceId: {
    type: String,
    required: true
  },
  resourceUrl: {
    type: String,
    default: ''
  }
});

// Estado del formulario
const form = reactive({
  name: '',
  email: ''
});

const isSubmitting = ref(false);
const success = ref(false);
const error = ref('');

// Enviar formulario
const submitForm = async (event: Event) => {
  try {
    isSubmitting.value = true;
    error.value = '';
    
    // Crear objeto FormData con los datos del formulario
    const formData = new FormData(event.target as HTMLFormElement);
    
    // Enviar formulario a Netlify
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString()
    });
    
    if (!response.ok) {
      throw new Error('Error al enviar el formulario');
    }
    
    // Registrar evento en Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download', {
        'event_category': 'resources',
        'event_label': props.resourceId,
        'value': 1
      });
    }
    
    // Marcar como exitoso
    success.value = true;
    
    // Iniciar descarga automática después de un breve retraso
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = props.resourceUrl || `/recursos/${props.resourceId}.pdf`;
      link.download = `${props.resourceId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
    
  } catch (err: any) {
    error.value = err.message || 'Ocurrió un error inesperado';
    console.error('Error en formulario de descarga:', err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
