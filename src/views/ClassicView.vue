<script setup>
import { ref } from 'vue'
import profileData from '../data/profile.json'
import projectsData from '../data/projects.json'

const { name, title, bio, skills, experience, education, contact } = profileData

const sliderRef = ref(null)

const scrollSlider = (direction) => {
  if (sliderRef.value) {
    const scrollAmount = sliderRef.value.clientWidth * 0.5
    sliderRef.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}


const scrollToId = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Helper to get initials
const initials = name.split(' ').map(n => n[0]).join('')
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#7000ff] selection:text-white p-4 md:p-8">
    <!-- Navbar / Back Bridge -->
    <div class="fixed top-8 right-8 z-50">
      <router-link 
        to="/" 
        class="group flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 transition-all duration-500 hover:scale-105 active:scale-95"
      >
        <span class="font-mono text-[#7000ff] group-hover:rotate-12 transition-transform">./terminal</span>
        <span class="text-xs uppercase tracking-widest font-bold opacity-50 group-hover:opacity-100 transition-opacity">Esc</span>
      </router-link>
    </div>

    <!-- Bento Grid -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-20 md:mt-0">
      
      <!-- Profile Card (Hero) -->
      <div class="md:col-span-4 lg:col-span-4 bg-[#111] rounded-[2rem] p-8 md:p-12 flex flex-col justify-end relative overflow-hidden group border border-white/5 min-h-[400px]">
        <div class="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div class="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#7000ff] blur-[120px] rounded-full animate-pulse"></div>
        </div>
        <div class="relative z-10">
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-[0.8]">
            {{ name.split(' ')[0] }}<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#7000ff] to-[#00d1ff]">{{ name.split(' ')[1] }}</span>
          </h1>
          <p class="text-xl md:text-2xl font-medium text-white/60 max-w-lg leading-tight">
            {{ title }}
          </p>
        </div>
      </div>

      <!-- Image Card -->
      <div class="md:col-span-2 lg:col-span-2 bg-[#7000ff] rounded-[2rem] overflow-hidden relative group min-h-[300px]">
        <img src="/moi.png" alt="Paul Tallon" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
          <p @click="scrollToId('socials')" class="font-bold text-sm tracking-widest uppercase cursor-pointer">Available for freelance</p>
        </div>
      </div>

      <!-- Project Slider -->
      <div class="md:col-span-6 lg:col-span-6 bg-[#111] rounded-[2rem] p-8 md:p-10 border border-white/5 relative overflow-hidden group">
        <div class="flex justify-between items-center mb-8 relative z-10">
          <div class="text-xs font-black uppercase tracking-[0.3em] text-[#7000ff]">Projects // Showcase</div>
          <div class="flex gap-4">
            <button 
              @click="scrollSlider('left')"
              class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7000ff] hover:border-[#7000ff] transition-all active:scale-95"
            >
              <svg class="w-5 h-5 translate-x-[-1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button 
              @click="scrollSlider('right')"
              class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7000ff] hover:border-[#7000ff] transition-all active:scale-95"
            >
              <svg class="w-5 h-5 translate-x-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
        
        <div 
          ref="sliderRef"
          class="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 relative z-10 scroll-smooth"
        >
          <div v-for="project in projectsData" :key="project.id" 
            class="min-w-[300px] md:min-w-[450px] aspect-video bg-black/40 rounded-3xl border border-white/5 overflow-hidden snap-center relative group/project">
            <img :src="project.image" :alt="project.title" class="w-full h-full object-cover opacity-50 group-hover/project:opacity-80 transition-opacity">
            <div class="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
              <h3 class="text-2xl md:text-3xl font-black mb-2 tracking-tighter">{{ project.title }}</h3>
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tag in project.stack.slice(0, 3)" :key="tag" class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-white/10 rounded backdrop-blur-md">
                  {{ tag }}
                </span>
              </div>
              <div class="flex gap-4 opacity-0 group-hover/project:opacity-100 transition-all translate-y-4 group-hover/project:translate-y-0 duration-500">
                <a :href="project.demo" target="_blank" v-if="project.demo" class="text-xs font-black uppercase tracking-widest text-[#7000ff] hover:text-[#00d1ff]">View Demo</a>
                <a :href="project.github" target="_blank" v-if="project.github" class="text-xs font-black uppercase tracking-widest text-white/50 hover:text-white">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- About Card -->
      <div class="md:col-span-3 lg:col-span-3 bg-[#111] rounded-[2rem] p-8 md:p-10 border border-white/5 flex flex-col justify-between group hover:border-[#7000ff]/30 transition-colors">
        <div class="text-xs font-black uppercase tracking-[0.3em] text-[#7000ff] mb-8">Bio // Summary</div>
        <p class="text-xl md:text-2xl leading-tight font-medium text-white/90">
          {{ bio }}
        </p>
        <div class="mt-8 flex gap-4">
          <div class="w-12 h-1 bg-[#7000ff] rounded-full"></div>
          <div class="w-4 h-1 bg-white/10 rounded-full"></div>
        </div>
      </div>

      <!-- Skills Card -->
      <div class="md:col-span-3 lg:col-span-3 bg-[#111] rounded-[2rem] p-8 md:p-10 border border-white/5 group relative overflow-hidden">
        <div class="text-xs font-black uppercase tracking-[0.3em] text-[#00d1ff] mb-8">Stack // Skills</div>
        <div class="flex flex-wrap gap-2 relative z-10">
          <template v-for="category in skills" :key="category.name">
            <span v-for="skill in category.items" :key="skill" 
              class="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-[#7000ff] transition-all duration-300">
              {{ skill }}
            </span>
          </template>
        </div>
        <div class="absolute -bottom-20 -right-20 text-[200px] font-black text-white/[0.02] select-none pointer-events-none group-hover:text-[#00d1ff]/[0.05] transition-colors">
          {{ initials }}
        </div>
      </div>

      <!-- Experience Highlight -->
      <div class="md:col-span-4 lg:col-span-4 bg-[#111] rounded-[2rem] p-8 md:p-10 border border-white/5 space-y-8">
        <div class="flex justify-between items-center">
          <div class="text-xs font-black uppercase tracking-[0.3em] text-white/30">Experience // Timeline</div>
          <div class="text-[10px] font-bold px-2 py-1 bg-white/5 rounded border border-white/10 uppercase tracking-tighter">Scrollable</div>
        </div>
        <div class="space-y-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
          <div v-for="exp in experience" :key="exp.company" class="group/item">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <h3 class="text-2xl font-black group-hover/item:text-[#7000ff] transition-colors">{{ exp.role }}</h3>
              <span class="text-xs font-bold text-white/30 font-mono">{{ exp.duration }}</span>
            </div>
            <div class="text-sm font-bold text-white/50 mb-3">{{ exp.company }} — {{ exp.location }}</div>
            <p class="text-sm text-white/40 leading-relaxed max-w-2xl">{{ exp.description }}</p>
          </div>
        </div>
      </div>

      <!-- Links & Education -->
      <div class="md:col-span-2 lg:col-span-2 grid grid-rows-2 gap-4">
        <!-- Education Mini Card -->
        <div class="bg-[#111] rounded-[2rem] p-6 border border-white/5 flex flex-col justify-between group hover:bg-[#7000ff] transition-all duration-500">
          <div class="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-white/100">Study //</div>
          <div>
            <div class="font-bold text-lg leading-tight group-hover:text-white">{{ education[0].degree }}</div>
            <div class="text-xs font-medium text-white/40 group-hover:text-white/80">{{ education[0].institution }}</div>
          </div>
        </div>
        <!-- Socials Card -->
        <div id="socials" class="bg-white text-black rounded-[2rem] p-6 flex flex-col justify-between group overflow-hidden relative">
          <div class="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Connect //</div>
          <div class="flex flex-col gap-1 relative z-10">
            <a :href="'https://' + contact.linkedin" target="_blank" class="text-2xl font-black hover:translate-x-2 transition-transform">LinkedIn</a>
            <a :href="'https://' + contact.github" target="_blank" class="text-2xl font-black hover:translate-x-2 transition-transform">GitHub</a>
            <a :href="'mailto:' + contact.email" class="text-2xl font-black hover:translate-x-2 transition-transform">Email</a>
          </div>
          <div class="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
            <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/></svg>
          </div>
        </div>
      </div>

    </div>

    <!-- Minimal Footer -->
    <footer class="max-w-7xl mx-auto mt-24 pb-12 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-12">
      <div class="text-xs font-bold text-white/20 uppercase tracking-[0.4em]">© 2026 Crafted with my hands and a little help from AI ;)</div>
      <div class="flex gap-8 text-[10px] uppercase font-black tracking-widest text-white/40">
        <router-link to="/" class="hover:text-[#7000ff] transition-colors">Terminal</router-link>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');

.font-sans {
  font-family: 'Inter', sans-serif;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 2px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #7000ff;
}

/* Base style overrides if necessary */
:deep(body) {
  margin: 0;
  background-color: #050505;
}
</style>
