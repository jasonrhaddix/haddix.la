import store from '@/store'

import { loadView } from '@/mixins/asyncLoaders'

import beforeEnterGuard from '@/router/navigationGuards/beforeEnter'

import {
	VUEX_ROUTING_ENTER_ROLE
} from '@/store/constants/routing'

/* import {
	VUEX_UI_NAVIGATION_SET_TITLE
} from '@/store/constants/ui' */

export default {
	path: '/roles',
	name: 'roles',
	redirect: { name: 'projects' },
	component: loadView({ file: 'Roles' }),
	/* beforeEnter: beforeEnterGuard,
	meta: {
		beforeEnterCallback: (to, from, next) => {
			store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'Roles')
			next()
		}
	}, */
	children: [
		{
			path: '/roles/:role_id',
			name: 'role-details',
			component: loadView({ file: 'Role_Details' }),
			beforeEnter: beforeEnterGuard,
			meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_ROUTING_ENTER_ROLE, to.params).then(() => next())
				}
			}
		}
	]
}
