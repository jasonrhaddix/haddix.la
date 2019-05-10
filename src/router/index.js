import Vue from 'vue'
import Router from 'vue-router'

import { loadView, loadComponent } from '@/mixins/asyncLoaders'


Vue.use(Router)


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            name: 'home',
            component: loadView({ file:'Home' })
        },
        {
            path: '/projects',
            name: 'projects',
            component: loadView({ file:'Projects' }),
        },
        {
            path: '/project/:projectId',
            name: 'project',
            component: loadView({ file:'Project_Details' }),
        },
        {
            path: '/about',
            name: 'about',
            component: loadView({ file:'About' })
        },
        {
            path: '/contact',
            name: 'contact',
            component: loadView({ file:'Contact' })
        },
        {
            path: '/labs',
            name: 'labs',
            component: loadView({ file:'Labs' })
        }
    ]
})


export default router