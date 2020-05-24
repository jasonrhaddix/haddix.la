import store from '@/store'
import router from '@/router'

import {
	VUEX_ROUTING_NAVIGATE_TO_ROUTE
} from '@/store/constants/routing'

import {
	VUEX_NOTIFICATIONS_ADD_TO_QUEUE
} from '@/store/constants/notifications'

const beforeEnterGuard = (to, from, next) => {
	if (to.name === 'roles' && !store.getters.appAuthenticated) {
		store.dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
			component: {
				path: 'Notifications',
				file: 'Notification_Message'
			},
			data: {
				type: 'error',
				message: "You're not authorized to access this route"
			},
			timeout: 0
		})

		router.push({ name: 'home' })
	}

	store.dispatch(VUEX_ROUTING_NAVIGATE_TO_ROUTE, { to: to, from: from })

	if (to.meta.hasOwnProperty('beforeEnterCallback')) {
		to.meta.beforeEnterCallback(to, from, next)
	} else {
		next()
	}
}

export default beforeEnterGuard
