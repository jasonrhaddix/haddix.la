import store from '@/store'

import {
	VUEX_ROUTING_NAVIGATE_TO_ROUTE
} from '@/store/constants/routing'

const beforeEnterGuard = (to, from, next) => {
	// TODO: use if for auth route blocking | authenticated?
	// eslint-disable-next-line no-constant-condition
	if (true) {
		store.dispatch(VUEX_ROUTING_NAVIGATE_TO_ROUTE, { to: to, from: from })

		if (to.meta.hasOwnProperty('beforeEnterCallback')) {
			to.meta.beforeEnterCallback(to, from, next)
		}
	}
}

export default beforeEnterGuard
