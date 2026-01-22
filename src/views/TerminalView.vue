<script setup>
import { ref, onMounted, nextTick } from 'vue'
import TerminalPrompt from '../components/terminal/TerminalPrompt.vue'
import TerminalOutput from '../components/terminal/TerminalOutput.vue'
import profileData from '../data/profile.json'
import projectsData from '../data/projects.json'

const history = ref([
  { type: 'output', content: `Bienvenue dans l'interface de ${profileData.name}.\nTapez "$help$" pour commencer.` }
])

const isTyping = ref(true)
const terminalContainer = ref(null)
const promptRef = ref(null)

const handleGlobalClick = () => {
  // Wait a tiny bit for the selection to manifest
  setTimeout(() => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim().length > 0) {
      return
    }
    if (promptRef.value) {
      promptRef.value.focusInput()
    }
  }, 10)
}

const fillPrompt = (cmd) => {
  if (promptRef.value) {
    promptRef.value.setInput(cmd)
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (terminalContainer.value) {
    terminalContainer.value.scrollTop = terminalContainer.value.scrollHeight
  }
}

const commands = {
  help: () => {
    return [
      'Commandes disponibles:',
      '  $help$           - affiche toutes les commandes',
      '  $about$          - présentation professionnelle',
      '  $skills$         - compétences techniques',
      '  $projects$       - liste des projets',
      '  $experience$     - parcours professionnel',
      '  $education$      - formations et diplômes',
      '  $open [id]$      - détail d\'un projet',
      '  $clear$          - nettoie l\'écran',
      '  $contact$        - infos de contact',
      '  $sudo hire-me$   - message spécial'
    ]
  },
  about: () => [profileData.bio],
  skills: () => {
    return profileData.skills.map(s => `${s.name}: ${s.items.join(', ')}`)
  },
  experience: () => {
    const list = []
    profileData.experience.forEach(exp => {
      list.push(`>> ${exp.role} @ ${exp.company}`)
      list.push(`   ${exp.duration} | ${exp.location}`)
      list.push(`   ${exp.description}`)
      list.push('')
    })
    return list
  },
  education: () => {
    const list = []
    profileData.education.forEach(edu => {
      list.push(`>> ${edu.degree}`)
      list.push(`   ${edu.institution} | ${edu.duration}`)
      list.push('')
    })
    return list
  },
  projects: () => {
    return projectsData.map(p => `[${p.id}] - ${p.title}`)
  },
  open: (id) => {
    const project = projectsData.find(p => p.id === id)
    if (project) {
      const list = [
        `Titre: ${project.title}`,
        `Description: ${project.description}`,
        `Stack: ${project.stack.join(', ')}`
      ]
      
      if (project.github) {
        list.push(`GitHub: $${project.github}|${project.github}$`)
      }
      
      if (project.demo) {
        list.push(`Demo: $${project.demo}|${project.demo}$`)
      }
      
      return list
    }
    return [`Projet "${id}" non trouvé.`]
  },
  clear: () => {
    history.value = []
    return null
  },
  contact: () => {
    return Object.entries(profileData.contact).map(([key, val]) => `${key}: ${val}`)
  },
  sudo: (arg) => {
    if (arg === 'hire-me') {
      return ['Processus d\'embauche initié...', 'Vérification des compétences... OK.', 'Vérification de la passion... OK.', 'Résultat: Vous devriez absolument m\'embaucher.']
    }
    return ['Permission non accordée.']
  }
}

const handleCommand = (cmdStr) => {
  const parts = cmdStr.trim().split(' ')
  const cmd = parts[0].toLowerCase()
  const arg = parts.slice(1).join(' ')

  history.value.push({ type: 'input', content: cmdStr })

  if (commands[cmd]) {
    const output = commands[cmd](arg)
    if (output) {
      isTyping.value = true
      history.value.push({ type: 'output', content: output.join('\n') })
    }
  } else if (cmd !== '') {
    isTyping.value = true
    history.value.push({ type: 'output', content: `Commande non reconnue: ${cmd}. Tapez "$help$" pour voir la liste.` })
  }
  
  scrollToBottom()
}

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div 
    class="h-full w-full bg-[#0d0d0d] p-6 font-mono text-green-500 overflow-hidden flex flex-col"
    @mouseup="handleGlobalClick"
  >
    <div ref="terminalContainer" class="flex-grow overflow-y-auto scroll-smooth custom-scrollbar">
      <div v-for="(entry, index) in history" :key="index" class="mb-2">
        <div v-if="entry.type === 'input'" class="flex">
          <span class="mr-2 text-blue-400">➜</span>
          <span class="text-white">{{ entry.content }}</span>
        </div>
        <div v-else class="whitespace-pre-wrap leading-relaxed opacity-90">
          <TerminalOutput 
            :text="entry.content" 
            @command-click="fillPrompt" 
            @finished="isTyping = false"
          />
        </div>
      </div>
      <TerminalPrompt v-if="!isTyping" ref="promptRef" @submit="handleCommand" />
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #333;
}
</style>
