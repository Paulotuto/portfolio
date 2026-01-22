<script setup>
import { store } from '../../store'
import profileData from '../../data/profile.json'

const navLinks = [
  { name: 'Accueil', action: () => {} },
  { name: 'Projets', action: () => {} },
  { name: 'Profil', action: () => {} },
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-gradient-to-b from-black/80 to-transparent transition-all duration-300">
    <div class="flex items-center gap-10">
      <div class="text-red-600 font-bold text-3xl tracking-tighter" @click="store.setUiMode('terminal')">
        DEVFLIX
      </div>
      <div class="hidden md:flex gap-6 text-sm">
        <a v-for="link in navLinks" :key="link.name" href="#" class="text-gray-300 hover:text-white transition-colors">
          {{ link.name }}
        </a>
      </div>
    </div>
    
    <div class="flex items-center gap-4">
      <button 
        @click="store.setUiMode('terminal')"
        class="text-xs uppercase tracking-widest text-gray-400 hover:text-white border border-gray-700 px-3 py-1 rounded transition-all"
      >
        Terminal Mode
      </button>
      <div class="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded overflow-hidden cursor-pointer shadow-lg shadow-primary/20">
        <img :src="`https://ui-avatars.com/api/?name=${profileData.name}&background=random`" alt="User" />
      </div>
    </div>
  </nav>
</template>
