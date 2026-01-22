<script setup>
import { store } from '../../store'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="relative h-[80vh] w-full flex items-center px-6 md:px-12 overflow-hidden">
    <!-- Hero Background Image with Gradient Overlay -->
    <div class="absolute inset-0 z-0">
      <img :src="project.image" class="w-full h-full object-cover opacity-60" alt="Hero" />
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-2xl space-y-6">
      <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-white animate-fade-in">
        {{ project.title }}
      </h1>
      <p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
        {{ project.description }}
      </p>
      
      <div class="flex flex-wrap gap-4 pt-4">
        <button 
          @click="store.setCurrentProject(project)"
          class="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-white/90 transition-all transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Étude de cas
        </button>
        <a 
          :href="project.demo" 
          target="_blank"
          class="flex items-center gap-2 bg-gray-500/30 backdrop-blur-md text-white px-8 py-3 rounded font-bold hover:bg-gray-500/50 transition-all border border-gray-400/30"
        >
          Voir la démo
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}
</style>
