import { reactive } from 'vue'

export const store = reactive({
    uiMode: 'terminal', // 'terminal' or 'devflix'
    currentProject: null, // For the project modal in DEVFLIX

    setUiMode(mode) {
        this.uiMode = mode
    },

    setCurrentProject(project) {
        this.currentProject = project
    },

    closeProject() {
        this.currentProject = null
    }
})
