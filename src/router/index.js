import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

import { loadView } from '@/mixins/asyncLoaders'

import {
	VUEX_ROUTING_ENTER_PROJECT,
	// VUEX_ROUTING_ENTER_EXPERIMENT,
	VUEX_ROUTING_NAVIGATE_TO_ROUTE,
	VUEX_ROUTING_ENTER_ARTICLES
} from '@/store/constants/routing'

import {
	VUEX_UI_NAVIGATION_SET_TITLE
} from '@/store/constants/ui'

Vue.use(Router)

const beforeEnterWatcher = (to, from, next) => {
	// TODO: use if for auth route blocking | authenticated?
	// eslint-disable-next-line no-constant-condition
	if (true) {
		store.dispatch(VUEX_ROUTING_NAVIGATE_TO_ROUTE, { to: to, from: from })

		if (to.meta.hasOwnProperty('beforeEnterCallback')) {
			to.meta.beforeEnterCallback(to, from, next)
		}
	}
}

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
		{
			path: '',
			name: 'home',
			component: loadView({ file: 'Home' }),
			beforeEnter: beforeEnterWatcher,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, '').then(() => next())
				}
			}
		},
		{
			path: '/projects',
			name: 'projects',
			component: loadView({ file: 'Projects' }),
			beforeEnter: beforeEnterWatcher,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'Projects').then(() => next())
				}
			}
		},
		{
			path: '/project/:project_id',
			name: 'project-details',
			component: loadView({ file: 'Project_Details' }),
			beforeEnter: beforeEnterWatcher,
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
			beforeEnter: beforeEnterWatcher,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'About').then(() => next())
				}
			}
		},
		{
			path: '/articles',
			name: 'articles',
			component: loadView({ file: 'Articles' }),
			beforeEnter: beforeEnterWatcher,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_ROUTING_ENTER_ARTICLES, 'Articles').then(() => next())
				}
			}
		},
		{
			path: '/contact',
			name: 'contact',
			component: loadView({ file: 'Contact' }),
			beforeEnter: beforeEnterWatcher,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'Contact').then(() => next())
				}
			}
		},
		{
			path: '/labs',
			name: 'labs',
			component: loadView({ file: 'Labs' }),
			beforeEnter: beforeEnterWatcher,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'Labs').then(() => next())
				}
			}
		}/* ,
		{
			path: '/experiment/:id',
			name: 'experiment-details',
			component: loadView({ file: 'Experiment_Details' }),
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_ROUTING_ENTER_EXPERIMENT, to.params.id).then(() => next())
				}
			}
		} */
	]
})

export default router
