import router from '@/router'

import {
	VUEX_ROUTING_INIT,
	VUEX_ROUTING_NAVIGATE_TO_ROUTE,
	VUEX_ROUTING_EXIT_ROUTE_TEARDOWN,
	VUEX_ROUTING_PUSH_ROUTE,
	VUEX_ROUTING_ENTER_ROUTE,
	VUEX_ROUTING_SET_PREVIOUS_ROUTE,
	VUEX_ROUTING_SET_CURRENT_ROUTE,
	VUEX_ROUTING_ENTER_PROJECT,
	VUEX_ROUTING_ENTER_ROLES,
	VUEX_ROUTING_ENTER_ROLE,
	VUEX_ROUTING_PREVIOUS_PAGE
} from '@/store/constants/routing'

import {
	VUEX_UI_HEADER_SHOW,
	VUEX_UI_HEADER_HIDE,
	VUEX_UI_NAVIGATION_HIDE,
	VUEX_UI_NAVIGATION_DISABLED
} from '@/store/constants/ui'

import {
	VUEX_PROJECTS_FETCH_REQUEST,
	VUEX_PROJECT_FETCH_REQUEST,
	VUEX_PROJECT_TEARDOWN
} from '@/store/constants/projects'

import {
	VUEX_ROLES_FETCH_REQUEST,
	VUEX_ROLE_FETCH_REQUEST,
	VUEX_ROLE_TEARDOWN
} from '@/store/constants/roles'

const state = {
	route: {
		previous: null,
		current: null
	}
}

const getters = {}

const actions = {
	// Get the entry point when app initially loaded
	[VUEX_ROUTING_INIT]: ({ commit, dispatch }) => {
		setTimeout(() => {
			let route = router.history.current.name

			commit(VUEX_ROUTING_SET_CURRENT_ROUTE, route)
			dispatch(VUEX_ROUTING_PUSH_ROUTE, { name: route })
			dispatch(VUEX_PROJECTS_FETCH_REQUEST)
		}, 1000)
	},

	/**************************/
	// ROUTE NAVIGATION FLOW
	/**************************/
	// 1.
	// Push the route to the router
	[VUEX_ROUTING_PUSH_ROUTE]: async ({ rootState, dispatch }, payload) => {
		router.push({ ...payload }).catch(() => {})
	},

	// 2.
	// Navigate to route action call from router/index.js
	[VUEX_ROUTING_NAVIGATE_TO_ROUTE]: async ({ rootState, dispatch, commit }, payload) => {
		let toRoute = payload.to.name
		let fromRoute = payload.from.name

		if (rootState.ui.navigation.openState) { dispatch(VUEX_UI_NAVIGATION_DISABLED, 1000) }
		dispatch(VUEX_UI_NAVIGATION_HIDE)

		// Abort if incoming route is same as current current route
		if (toRoute === fromRoute) return

		await dispatch(VUEX_ROUTING_EXIT_ROUTE_TEARDOWN, toRoute)
		await commit(VUEX_ROUTING_SET_PREVIOUS_ROUTE)
		await commit(VUEX_ROUTING_SET_CURRENT_ROUTE, toRoute)
		dispatch(VUEX_ROUTING_ENTER_ROUTE, toRoute)
	},

	// 3.
	// Teardown actions for exiting a route/view
	[VUEX_ROUTING_EXIT_ROUTE_TEARDOWN]: ({ commit }, payload) => {
		switch (payload) {
			case 'project-details':
				commit(VUEX_PROJECT_TEARDOWN)
				break
			case 'role-details':
				commit(VUEX_ROLE_TEARDOWN)
				break
		}
	},

	// 4.
	// Enter route actions
	[VUEX_ROUTING_ENTER_ROUTE]: ({ dispatch }, payload) => {
		if (payload !== 'home') {
			dispatch(VUEX_UI_HEADER_SHOW)
		} else {
			dispatch(VUEX_UI_HEADER_HIDE)
		}
	},

	/**************************/
	/*  */
	/**************************/

	[VUEX_ROUTING_ENTER_PROJECT]: ({ dispatch }, payload) => {
		dispatch(VUEX_PROJECT_FETCH_REQUEST, payload)
	},

	[VUEX_ROUTING_ENTER_ROLES]: ({ dispatch }) => {
		dispatch(VUEX_ROLES_FETCH_REQUEST)
	},

	[VUEX_ROUTING_ENTER_ROLE]: ({ dispatch }, payload) => {
		dispatch(VUEX_ROLE_FETCH_REQUEST, payload)
	},

	[VUEX_ROUTING_PREVIOUS_PAGE]: async ({ commit, dispatch }) => {
		router.go(-1)
	}
}

const mutations = {
	[VUEX_ROUTING_INIT]: (state, payload) => {
		state.route.current = payload
	},

	[VUEX_ROUTING_SET_CURRENT_ROUTE]: (state, payload) => {
		state.route.current = payload
	},

	[VUEX_ROUTING_SET_PREVIOUS_ROUTE]: (state) => {
		state.route.previous = state.route.current
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
