import api from '@/api'

import {
	VUEX_PROJECTS_FETCH_REQUEST,
	VUEX_PROJECTS_FETCH_SUCCESS,
	VUEX_PROJECTS_FETCH_FAILURE,

	VUEX_PROJECTS_GUEST_FETCH_REQUEST,
	VUEX_PROJECTS_GUEST_FETCH_SUCCESS,
	VUEX_PROJECTS_GUEST_FETCH_FAILURE,

	VUEX_PROJECT_FETCH_REQUEST,
	VUEX_PROJECT_FETCH_SUCCESS,
	VUEX_PROJECT_FETCH_FAILURE,

	VUEX_PROJECT_CREATE,
	VUEX_PROJECT_CREATE_SUCCESS,
	VUEX_PROJECT_CREATE_FAILURE,

	VUEX_PROJECT_TEARDOWN
} from '@/store/constants/projects'

import {
	VUEX_PROJECT_TREE_FETCH_REQUEST
} from '@/store/constants/projects/project_tree'

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
	projects: [],
	project: {},

	projectsLoading: false,
	projectLoading: false,
	projectSaving: false
}

const getters = {
	hasProjects: state => {
		return state.projects.length > 0
	},

	attachmentsByUsageType: state => (type = null, obj = null, id = null) => {
		if (!type || !obj) return

		let attachments = (obj === 'projects')
			? state.projects.find(p => p.project_id === id).attachments
			: state.project.attachments

		if (!attachments || attachments.length === 0) return []
		return attachments.filter(item => item.usage_type === type)
	}
}

const actions = {

	/**
     * Fetch All Projects
     *
     */
	[VUEX_PROJECTS_FETCH_REQUEST]: ({ rootState, dispatch, commit }) => {
		api.get(`/projects`, {
			params: { session_id: rootState.app.sessionToken }
		}).then(response => {
			commit(VUEX_PROJECTS_FETCH_SUCCESS, response.data.data)

			/* Promise.all([
				dispatch(VUEX_PROJECTS_GUEST_FETCH_REQUEST)
			]) */
		}).catch(err => {
			commit(VUEX_PROJECTS_FETCH_FAILURE, err)

			dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
				component: {
					path: 'Notifications',
					file: 'Notification_Message'
				},
				data: {
					type: 'error',
					message: 'Error: Projects fetch failed'
				},
				timeout: 0
			})
		})
	},

	[VUEX_PROJECTS_GUEST_FETCH_REQUEST]: ({ rootState, dispatch, commit }) => {
		api.get(`/projects/guest/${rootState.app.sessionToken}`).then(response => {
			commit(VUEX_PROJECTS_GUEST_FETCH_SUCCESS, response.data.data)
		}).catch(err => {
			commit(VUEX_PROJECTS_GUEST_FETCH_FAILURE, err)

			dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
				component: {
					path: 'Notifications',
					file: 'Notification_Message'
				},
				data: {
					type: 'error',
					message: 'Error: Guest Projects fetch failed'
				},
				timeout: 0
			})
		})
	},

	/**
     * Fetch Project by ID (project_id)
     *
     */
	[VUEX_PROJECT_FETCH_REQUEST]: ({ dispatch, commit }, payload) => {
		let apiRoute = `/projects/${payload.project_id}`

		api.get(apiRoute).then(async response => {
			await commit(VUEX_PROJECT_FETCH_SUCCESS, response.data.data[0])

			dispatch(VUEX_UI_NAVIGATION_SET_TITLE, response.data.data[0].title)

			if (response.data.data[0].hasTree) {
				dispatch(VUEX_PROJECT_TREE_FETCH_REQUEST, payload.project_id)
			}

			// if project doesnt exist, route back to 'home'
			if (response.data.data.length === 0) {
				dispatch(VUEX_ROUTING_PUSH_ROUTE, { name: 'home' })
			}
		}).catch(err => {
			commit(VUEX_PROJECT_FETCH_FAILURE, err)
			dispatch(VUEX_ROUTING_PUSH_ROUTE, { name: 'home' })

			dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
				component: {
					path: 'Notifications',
					file: 'Notification_Message'
				},
				data: {
					type: 'error',
					message: 'Error: Project fetch failed'
				},
				timeout: 0
			})
		})
	},

	/**
	 * Create Project
	 *
	 */
	[VUEX_PROJECT_CREATE]: ({ rootState, rootGetters, commit, dispatch }, payload) => {
		commit(VUEX_PROJECT_CREATE)

		// console.log(payload)

		// let apiRoute = rootGetters.appAuthenticated ? `/projects` : `/projects/guest`
		let Authorization = `Bearer ${rootState.auth.appToken}`
		let headers = rootGetters.appAuthenticated ? { headers: { Authorization } } : null

		let data = {
			...payload,
			session_id: rootState.app.sessionToken
		}

		api.post(`/projects`, data, headers).then(async response => {
			// Save returned data back in state.project
			await commit(VUEX_PROJECT_CREATE_SUCCESS, response.data.data)
			// Close Create Form
			await dispatch(VUEX_UI_OVERLAY_CONTAINER_HIDE)
			// Send success notification
			await dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
				component: {
					path: 'Notifications',
					file: 'Notification_Message'
				},
				data: {
					type: 'success',
					message: 'Success: Project created!'
				}
			})
			// Retrieve latest Projects
			dispatch(VUEX_PROJECTS_FETCH_REQUEST)
		}).catch(async err => {
			await commit(VUEX_PROJECT_CREATE_FAILURE, err)

			dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
				component: {
					path: 'Notifications',
					file: 'Notification_Message'
				},
				data: {
					type: 'error',
					message: 'Error: Project creatation failed'
				}
			})
		})
	}
}

const mutations = {
	/**
	 * Fetch Projects Mutations
	 *
	 */
	[VUEX_PROJECTS_FETCH_REQUEST]: (state) => {
		state.projects = []
		state.projectsLoading = true
	},
	[VUEX_PROJECTS_FETCH_SUCCESS]: (state, payload) => {
		state.projects = payload
		state.projectsLoading = false
	},
	[VUEX_PROJECTS_FETCH_FAILURE]: (state) => {
		state.projectsLoading = false
	},

	/**
	 * Fetch GUEST Projects Mutations
	 *
	 */
	[VUEX_PROJECTS_GUEST_FETCH_REQUEST]: (state) => {
	// state.projects = []
		state.projectsLoading = true
	},
	[VUEX_PROJECTS_GUEST_FETCH_SUCCESS]: (state, payload) => {
		if (payload) {
			payload.flatMap(project => {
				state.projects.unshift(project)
			})
		}

		state.projectsLoading = false
	},
	[VUEX_PROJECTS_GUEST_FETCH_FAILURE]: (state) => {
		state.projectsLoading = false
	},

	/**
	 * Fetch Project Mutations
	 *
	 */
	[VUEX_PROJECT_FETCH_REQUEST]: (state) => {
		state.project = {}
		state.projectLoading = true
	},
	[VUEX_PROJECT_FETCH_SUCCESS]: (state, payload) => {
		state.project = payload
		state.projectLoading = false
	},
	[VUEX_PROJECT_FETCH_FAILURE]: (state) => {
		state.projectLoading = false
	},

	/**
	 * Create Project Mutations
	 *
	 */
	[VUEX_PROJECT_CREATE]: (state) => {
		state.projectSaving = true
	},
	[VUEX_PROJECT_CREATE_SUCCESS]: (state, payload) => {
		state.project = payload
		state.projectSaving = false
	},
	[VUEX_PROJECT_CREATE_FAILURE]: (state) => {
		state.projectSaving = false
	},

	[VUEX_PROJECT_TEARDOWN]: (state) => {
		state.project = {}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
