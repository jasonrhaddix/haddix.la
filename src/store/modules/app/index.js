import { get as idbGet } from 'idb-keyval'

import {
	VUEX_APP_INIT,
	VUEX_APP_INITIALIZED,
	VUEX_APP_GENERATE_SESSION_TOKEN
} from '@/store/constants/app'
import {
	VUEX_CONSTANTS_INIT,
	VUEX_PROPERTIES_INIT
} from '@/store/constants/_config'
import {
	VUEX_ROUTING_INIT
} from '@/store/constants/routing'
import {
	VUEX_AUTH_HYDRATE_FROM_TOKEN
} from '@/store/constants/auth'
let uuid = require('uuid/v4')

const state = {
	sessionToken: null,
	initializing: false,
	initialized: false
}

const getters = {}

const actions = {
	[VUEX_APP_INIT]: async ({ commit, dispatch }) => {
		commit(VUEX_APP_GENERATE_SESSION_TOKEN)

		await dispatch(VUEX_CONSTANTS_INIT)
		await dispatch(VUEX_PROPERTIES_INIT)
		await dispatch(VUEX_ROUTING_INIT)

		await idbGet(process.env.VUE_APP_HADDIX_USER_TOKEN).then(async token => {
			commit(VUEX_APP_INIT)

			if (token && token !== undefined && token !== null) {
				await dispatch(VUEX_AUTH_HYDRATE_FROM_TOKEN, token).then(() => {
					commit(VUEX_APP_INITIALIZED)
				})
			} else {
				commit(VUEX_APP_INITIALIZED)
			}
		})
	}
}

const mutations = {
	[VUEX_APP_INIT]: (state) => {
		state.initializing = true
	},

	[VUEX_APP_INITIALIZED]: (state) => {
		state.initializing = false
		state.initialized = true
	},

	[VUEX_APP_GENERATE_SESSION_TOKEN]: (state) => {
		state.sessionToken = uuid()
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
