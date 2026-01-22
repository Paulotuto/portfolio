<script setup>
import { store } from '../../store'

const project = store.currentProject

const close = () => {
  store.closeProject()
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm" @click.self="close">
    <div class="relative w-full max-w-5xl max-h-full overflow-y-auto bg-[#141414] rounded-xl shadow-2xl border border-gray-800 flex flex-col no-scrollbar">
      
      <!-- Close Button -->
      <button 
        @click="close"
        class="absolute top-4 right-4 z-[110] bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Header Media -->
      <div class="relative aspect-video w-full">
        <img :src="project.image" class="w-full h-full object-cover" :alt="project.title" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
        
        <div class="absolute bottom-8 left-8 space-y-4 right-8">
          <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight">{{ project.title }}</h2>
          <div class="flex gap-4">
             <a :href="project.demo" target="_blank" class="bg-white text-black px-6 py-2 rounded font-bold hover:bg-white/90 transition-all">
               Voir le site
             </a>
             <a :href="project.github" target="_blank" class="bg-gray-500/50 text-white px-6 py-2 rounded font-bold hover:bg-gray-500/70 transition-all border border-gray-400/20">
               Code GitHub
             </a>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
        <div class="md:col-span-2 space-y-6">
          <div>
            <h3 class="text-green-500 font-bold mb-2 uppercase tracking-widest text-sm">Description</h3>
            <p class="text-lg leading-relaxed">{{ project.description }}</p>
          </div>
          
          <div>
            <h3 class="text-green-500 font-bold mb-2 uppercase tracking-widest text-sm">Problèmes résolus</h3>
            <p class="leading-relaxed">{{ project.problems_solved }}</p>
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="text-gray-400 font-bold mb-3 uppercase tracking-widest text-sm">Stack Technique</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in project.stack" :key="tag" class="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded text-sm">
                {{ tag }}
              </span>
            </div>
          </div>

          <div>
            <h3 class="text-gray-400 font-bold mb-3 uppercase tracking-widest text-sm">Catégorie</h3>
            <p class="text-white">{{ project.category }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
