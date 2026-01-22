<script setup>
import { onMounted, onUnmounted } from 'vue'
import TerminalView from './views/TerminalView.vue'

let originalTitle = document.title

const handleVisibilityChange = () => {
  if (document.hidden) {
    document.title = 'Mon portfolio te manque !'
  } else {
    document.title = originalTitle
  }
}

onMounted(() => {
  originalTitle = document.title
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <div class="h-screen w-screen overflow-hidden bg-dark text-white select-none">
    <TerminalView key="terminal" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

/* Main layout styles */
.bg-dark {
  background-color: #000000;
}
</style>
