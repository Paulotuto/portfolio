<script setup>
import { store } from '../../store'

const props = defineProps({
  title: String,
  projects: Array
})
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl md:text-2xl font-bold text-gray-200 tracking-wide">{{ title }}</h2>
    
    <div class="flex gap-4 overflow-x-auto pb-8 pt-2 no-scrollbar scroll-smooth px-1">
      <div 
        v-for="project in projects" 
        :key="project.id"
        @click="store.setCurrentProject(project)"
        class="flex-none w-64 md:w-80 group cursor-pointer"
      >
        <div class="relative aspect-video rounded-md overflow-hidden transition-all duration-300 transform group-hover:scale-110 group-hover:z-30 shadow-lg group-hover:shadow-primary/30">
          <img :src="project.image" class="w-full h-full object-cover" :alt="project.title" />
          
          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <h3 class="font-bold text-white text-lg">{{ project.title }}</h3>
            <div class="flex gap-2 mt-2">
              <span v-for="tag in project.stack.slice(0, 2)" :key="tag" class="text-[10px] bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded">
                {{ tag }}
              </span>
            </div>
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
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
