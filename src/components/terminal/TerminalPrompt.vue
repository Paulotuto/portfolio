<script setup>
import { ref, nextTick, onMounted } from 'vue'

const emit = defineEmits(['submit'])
const input = ref('')
const inputElement = ref(null)

const handleSubmit = () => {
  if (input.value.trim()) {
    emit('submit', input.value)
    input.value = ''
  }
}

const focusInput = () => {
  if (inputElement.value) {
    inputElement.value.focus()
  }
}

const setInput = (val) => {
  input.value = val
  nextTick(() => focusInput())
}

onMounted(() => {
  focusInput()
})

defineExpose({
  focusInput,
  setInput
})
</script>

<template>
  <div class="flex items-center relative">
    <span class="mr-2 text-blue-400">➜</span>
    <div class="relative flex items-center flex-1">
      <span class="text-white whitespace-pre font-mono">{{ input }}</span>
      <span class="w-2 h-5 bg-green-500 animate-pulse ml-0.5"></span>
      <input
        ref="inputElement"
        v-model="input"
        type="text"
        class="absolute inset-0 bg-transparent border-none outline-none text-transparent caret-transparent w-full font-mono"
        autofocus
        @keydown.enter="handleSubmit"
      />
    </div>
  </div>
</template>
