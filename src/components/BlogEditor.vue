<template>
  <div class="blog-editor bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Editar Post' : 'Crear Nuevo Post' }}</h2>
    
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <p>{{ error }}</p>
    </div>
    
    <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      <p>¡Post creado exitosamente! El sitio se actualizará en unos minutos.</p>
    </div>
    
    <form @submit.prevent="submitPost" class="space-y-4">
      <!-- Título -->
      <div>
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Título</label>
        <input 
          type="text" 
          id="title" 
          v-model="post.title" 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
      </div>
      
      <!-- Extracto -->
      <div>
        <label for="excerpt" class="block text-gray-700 text-sm font-bold mb-2">Extracto</label>
        <textarea 
          id="excerpt" 
          v-model="post.excerpt" 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="2"
          required
        ></textarea>
      </div>
      
      <!-- Categoría -->
      <div>
        <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Categoría</label>
        <select 
          id="category" 
          v-model="post.category" 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Selecciona una categoría</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      
      <!-- Imagen de portada -->
      <div>
        <label for="coverImage" class="block text-gray-700 text-sm font-bold mb-2">Imagen de portada</label>
        <div class="flex items-center">
          <input 
            type="file" 
            id="coverImage" 
            @change="handleImageUpload"
            accept="image/*"
            class="hidden"
            ref="fileInput"
          >
          <button 
            type="button"
            @click="$refs.fileInput.click()"
            class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Seleccionar imagen
          </button>
          <span v-if="imageUploading" class="text-gray-600">Subiendo...</span>
          <span v-else-if="post.coverImage" class="text-green-600">Imagen cargada</span>
        </div>
        <div v-if="post.coverImage" class="mt-2">
          <img :src="post.coverImage" alt="Vista previa" class="h-32 object-cover rounded">
        </div>
      </div>
      
      <!-- Etiquetas -->
      <div>
        <label for="tags" class="block text-gray-700 text-sm font-bold mb-2">Etiquetas (separadas por coma)</label>
        <input 
          type="text" 
          id="tags" 
          v-model="tagsInput" 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="marketing, diseño, productividad"
        >
      </div>
      
      <!-- Contenido -->
      <div>
        <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Contenido (Markdown)</label>
        <textarea 
          id="content" 
          v-model="post.content" 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
          rows="10"
          required
        ></textarea>
      </div>
      
      <!-- Botones -->
      <div class="flex justify-end">
        <button 
          type="button" 
          @click="resetForm"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Guardando...</span>
          <span v-else>{{ isEditing ? 'Actualizar' : 'Publicar' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { createGitHubService, BlogPostInput } from '../services/githubService';

const props = defineProps({
  postToEdit: {
    type: Object as () => BlogPostInput & { slug?: string } | null,
    default: null
  }
});

const emit = defineEmits(['saved', 'cancelled']);

// Estado
const isSubmitting = ref(false);
const success = ref(false);
const error = ref('');
const imageUploading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// Categorías disponibles
const categories = [
  'Productividad',
  'Marketing',
  'Negocios',
  'Diseño',
  'Finanzas',
  'Tecnología',
  'Liderazgo',
  'Bienestar'
];

// Post
const post = reactive<BlogPostInput>({
  title: '',
  excerpt: '',
  content: '',
  category: '',
  tags: [],
  coverImage: ''
});

// Input para etiquetas
const tagsInput = ref('');

// Computados
const isEditing = computed(() => !!props.postToEdit);

// Métodos
const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;
  
  const file = target.files[0];
  imageUploading.value = true;
  
  try {
    const githubService = createGitHubService();
    const result = await githubService.uploadImage(file);
    
    if (result.success && result.url) {
      post.coverImage = result.url;
    } else {
      throw new Error(result.error || 'Error al subir la imagen');
    }
  } catch (err: any) {
    error.value = err.message || 'Error al subir la imagen';
    console.error('Error al subir imagen:', err);
  } finally {
    imageUploading.value = false;
  }
};

const submitPost = async () => {
  try {
    isSubmitting.value = true;
    error.value = '';
    success.value = false;
    
    // Procesar etiquetas
    if (tagsInput.value) {
      post.tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
    
    const githubService = createGitHubService();
    let result;
    
    if (isEditing.value && props.postToEdit?.slug) {
      // Actualizar post existente
      result = await githubService.updatePost(props.postToEdit.slug, post);
    } else {
      // Crear nuevo post
      result = await githubService.createPost(post);
    }
    
    if (result.success) {
      success.value = true;
      emit('saved', result);
      
      // Resetear formulario después de un tiempo
      setTimeout(() => {
        if (!isEditing.value) {
          resetForm();
        }
      }, 3000);
    } else {
      throw new Error(result.error || 'Error al guardar el post');
    }
  } catch (err: any) {
    error.value = err.message || 'Error al guardar el post';
    console.error('Error al guardar post:', err);
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  // Resetear formulario
  post.title = '';
  post.excerpt = '';
  post.content = '';
  post.category = '';
  post.tags = [];
  post.coverImage = '';
  tagsInput.value = '';
  success.value = false;
  error.value = '';
  
  // Limpiar input de archivo
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  
  emit('cancelled');
};

// Inicializar formulario si hay un post para editar
onMounted(() => {
  if (props.postToEdit) {
    post.title = props.postToEdit.title;
    post.excerpt = props.postToEdit.excerpt;
    post.content = props.postToEdit.content;
    post.category = props.postToEdit.category;
    post.coverImage = props.postToEdit.coverImage || '';
    
    if (props.postToEdit.tags && props.postToEdit.tags.length > 0) {
      post.tags = [...props.postToEdit.tags];
      tagsInput.value = props.postToEdit.tags.join(', ');
    }
  }
});
</script>
