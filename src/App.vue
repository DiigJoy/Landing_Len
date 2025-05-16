<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Pantalla de carga global -->
    <LoadingScreen :show="loadingStore.state.isLoading" :message="loadingStore.state.message" />

    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import { useLoadingStore } from './stores/loadingStore';

const loadingStore = useLoadingStore();
</script>