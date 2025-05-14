<template>
  <div class="min-h-screen bg-gray-50">
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue';
</script>