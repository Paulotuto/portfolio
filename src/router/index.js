import { createRouter, createWebHistory } from 'vue-router'
import TerminalView from '../views/TerminalView.vue'
import ClassicView from '../views/ClassicView.vue'

const routes = [
    {
        path: '/',
        name: 'terminal',
        component: TerminalView
    },
    {
        path: '/classic',
        name: 'classic',
        component: ClassicView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
