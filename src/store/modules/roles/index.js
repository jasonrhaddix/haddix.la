import api from '@/api'

import {
    VUEX_ROLE_FETCH_REQUEST,
	VUEX_ROLE_FETCH_SUCCESS,
	VUEX_ROLE_FETCH_FAILURE,

	VUEX_ROLE_CREATE,
	VUEX_ROLE_CREATE_SUCCESS,
    VUEX_ROLE_CREATE_FAILURE,

    VUEX_ROLE_TEARDOWN
} from '@/store/constants/roles'

import {
	VUEX_UI_OVERLAY_CONTAINER_HIDE,
	VUEX_UI_NAVIGATION_SET_TITLE
} from '@/store/constants/ui'

import {
	VUEX_NOTIFICATIONS_ADD_TO_QUEUE
} from '@/store/constants/notifications'

import {
	VUEX_ROUTING_PUSH_ROUTE
} from '@/store/constants/routing'

const state = {
    roles: [],
    role: {},

    roleLoading: false,
    roleSaving: false
}

const getters = {
    roleHasProjects: state => {
		return state.role.projects.length > 0
	}
}

const actions = {
    [VUEX_ROLE_FETCH_REQUEST]: ({ dispatch, commit }, payload) => {
		let apiRoute = `/roles/${payload.role_id}`

		api.get(apiRoute).then(async response => {
			console.log(response)
			// await commit(VUEX_ROLE_FETCH_SUCCESS, response.data.data[0])
			// dispatch(VUEX_UI_NAVIGATION_SET_TITLE, response.data.data[0].job_title)

			// if project doesnt exist, route back to 'home'
			if (response.data.data.length === 0) {
				dispatch(VUEX_ROUTING_PUSH_ROUTE, { name: 'home' })
			}
		}).catch(err => {
			console.log(err)
			commit(VUEX_ROLE_FETCH_FAILURE, err)
			dispatch(VUEX_ROUTING_PUSH_ROUTE, { name: 'home' })

			dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
				component: {
					path: 'Notifications',
					file: 'Notification_Message'
				},
				data: {
					type: 'error',
					message: 'Error: Role fetch failed'
				},
				timeout: 0
			})
		})
    },

    [VUEX_ROLE_CREATE]: ({ rootState, rootGetters, commit, dispatch }, payload) => {
		commit(VUEX_ROLE_CREATE)

		let Authorization = `Bearer ${rootState.auth.appToken}`
		let headers = rootGetters.appAuthenticated ? { headers: { Authorization } } : null

		let data = {
			...payload,
			session_id: rootState.app.sessionToken
		}

		api.post(`/roles`, data, headers).then(async response => {
			await commit(VUEX_ROLE_CREATE_SUCCESS, response.data.data)
			await dispatch(VUEX_UI_OVERLAY_CONTAINER_HIDE)
			await dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
				component: {
					path: 'Notifications',
					file: 'Notification_Message'
				},
				data: {
					type: 'success',
					message: 'Success: Role created!'
				}
			})
			// Retrieve latest Roles
			// dispatch(VUEX_ROLES_FETCH_REQUEST)
		}).catch(async err => {
			await commit(VUEX_ROLE_CREATE_FAILURE, err)

			dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
				component: {
					path: 'Notifications',
					file: 'Notification_Message'
				},
				data: {
					type: 'error',
					message: 'Error: Role creatation failed'
				}
			})
		})
	}
}

const mutations = {
    /**
	 * Fetch Project Mutations
	 *
	 */
	[VUEX_ROLE_FETCH_REQUEST]: (state) => {
		state.role = {}
		state.roleLoading = true
	},
	[VUEX_ROLE_FETCH_SUCCESS]: (state, payload) => {
		state.role = payload
		state.roleLoading = false
	},
	[VUEX_ROLE_FETCH_FAILURE]: (state) => {
		state.roleLoading = false
	},

	/**
	 * Create Project Mutations
	 *
	 */
	[VUEX_ROLE_CREATE]: (state) => {
		state.roleSaving = true
	},
	[VUEX_ROLE_CREATE_SUCCESS]: (state, payload) => {
		state.project = payload
		state.roleSaving = false
	},
	[VUEX_ROLE_CREATE_FAILURE]: (state) => {
		state.roleSaving = false
	},

	[VUEX_ROLE_TEARDOWN]: (state) => {
		state.role = {}
	}
}

export default {
    state,
    getters,
    actions,
    mutations
}
