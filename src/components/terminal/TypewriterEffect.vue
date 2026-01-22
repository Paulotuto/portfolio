<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  speed: {
    type: Number,
    default: 20
  }
})

const emit = defineEmits(['finished'])

const displayedText = ref('')

onMounted(() => {
  let i = 0
  const interval = setInterval(() => {
    if (i < props.text.length) {
      displayedText.value += props.text.charAt(i)
      i++
    } else {
      clearInterval(interval)
      emit('finished')
    }
  }, props.speed)
})
</script>

<template>
  <span>{{ displayedText }}</span>
</template>
