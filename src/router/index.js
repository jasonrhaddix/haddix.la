import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

import { loadView } from '@/mixins/asyncLoaders'

import beforeEnterGuard from '@/router/navigationGuards/beforeEnter'

import roleRoutes from '@/router/modules/routes_roles'

import {
	VUEX_ROUTING_ENTER_PROJECT,
	VUEX_ROUTING_ENTER_EXPERIMENT
} from '@/store/constants/routing'

import {
	VUEX_UI_NAVIGATION_SET_TITLE
} from '@/store/constants/ui'

Vue.use(Router)

const router = new Router({
	/* scrollBehavior () {
		return { x: 0, y: 0 }
	}, */
	scrollBehavior (to, from, savedPosition) {
		let position = { x: 0, y: 0 }
		// Keep scroll position when using browser buttons
		if (savedPosition) {
			position = savedPosition
		}

		// Workaround for transitions scrolling to the top of the page
		// However, there are still some problems being fixed by the vue team
		return new Promise((resolve, reject) => {
			setTimeout(() => {
			resolve(position)
			}, 150)
		})
	},
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		roleRoutes,
		{
			path: '',
			name: 'home',
			component: loadView({ file: 'Home' }),
			beforeEnter: beforeEnterGuard,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, '')
					next()
				}
			}
		},
		{
			path: '/projects',
			name: 'projects',
			component: loadView({ file: 'Projects' }),
			beforeEnter: beforeEnterGuard,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'Projects')
					next()
				}
			}
		},
		{
			path: '/project/:project_id',
			name: 'project-details',
			component: loadView({ file: 'Project_Details' }),
			beforeEnter: beforeEnterGuard,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_ROUTING_ENTER_PROJECT, to.params).then(() => next())
				}
			}
		},
		{
			path: '/about',
			name: 'about',
			component: loadView({ file: 'About' }),
			beforeEnter: beforeEnterGuard,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'About')
					next()
				}
			}
		},
		{
			path: '/contact',
			name: 'contact',
			component: loadView({ file: 'Contact' }),
			beforeEnter: beforeEnterGuard,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'Contact')
					next()
				}
			}
		},
		{
			path: '/labs',
			name: 'labs',
			component: loadView({ file: 'Labs' }),
			beforeEnter: beforeEnterGuard,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'Labs')
					next()
				}
			}
		},
		{
			path: '/experiment/:id',
			name: 'experiment-details',
			component: loadView({ file: 'Experiment_Details' }),
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_ROUTING_ENTER_EXPERIMENT, to.params.id).then(() => next())
				}
			}
		}
	]
})

export default router
