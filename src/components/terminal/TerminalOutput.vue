<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import TypewriterEffect from './TypewriterEffect.vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['command-click', 'finished'])

const visiblePartsCount = ref(1)

// Pattern to find $command$ in text
const parts = computed(() => {
  const result = []
  const regex = /\$([^$]+)\$/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(props.text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      result.push({
        type: 'text',
        content: props.text.slice(lastIndex, match.index)
      })
    }
    
    const content = match[1]
    if (content.includes('|') && content.startsWith('http')) {
      const [url, label] = content.split('|')
      result.push({
        type: 'link',
        url,
        label
      })
    } else {
      // Add as a command
      result.push({
        type: 'command',
        content
      })
    }
    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < props.text.length) {
    result.push({
      type: 'text',
      content: props.text.slice(lastIndex)
    })
  }

  // If no commands found, just return full text as a single part
  if (result.length === 0) {
    return [{ type: 'text', content: props.text }]
  }

  return result
})

const handleCommandClick = (cmd) => {
  emit('command-click', cmd)
}

const nextPart = () => {
  if (visiblePartsCount.value < parts.value.length) {
    visiblePartsCount.value++
  } else {
    emit('finished')
  }
}

// Ensure first part starts if it's a command
onMounted(() => {
  if (parts.value.length > 0 && parts.value[0].type === 'command') {
    nextPart()
  }
})

// If a part is a command or link, immediately (or after tiny delay) move to next
watch(visiblePartsCount, (newVal) => {
  const currentPart = parts.value[newVal - 1]
  if (currentPart && (currentPart.type === 'command' || currentPart.type === 'link')) {
    // Small delay for interactive element appearance "feel"
    setTimeout(nextPart, 50)
  }
})
</script>

<template>
  <div class="inline">
    <template v-for="(part, index) in parts" :key="index">
      <template v-if="index < visiblePartsCount">
        <TypewriterEffect 
          v-if="part.type === 'text'" 
          :text="part.content" 
          @finished="nextPart"
        />
        <a 
          v-else-if="part.type === 'link'" 
          :href="part.url" 
          target="_blank" 
          class="text-green-400 cursor-pointer hover:underline font-bold transition-all"
        >
          {{ part.label }}
        </a>
        <span 
          v-else-if="part.type === 'command'" 
          class="text-blue-400 cursor-pointer hover:underline hover:text-blue-300 transition-colors font-bold"
          @click="handleCommandClick(part.content)"
        >
          {{ part.content }}
        </span>
      </template>
    </template>
  </div>
</template>
