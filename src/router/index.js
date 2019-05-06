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
            name: 'no-route',
            component: loadView({ file:'Home' })
        },
        {
            path: '/',
            name: 'root-route',
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
        }
    ]
})


export default router