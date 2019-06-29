import { set as idbSet, del as idbDel } from 'idb-keyval'

import api from '@/api'

import {
    VUEX_AUTH_REQUEST,
    VUEX_AUTH_HYDRATE_FROM_TOKEN,
    
    VUEX_AUTH_AUTHORIZATION_SUCCESS,
    VUEX_AUTH_AUTHORIZATION_ERROR
} from '@/store/constants/auth'


const state = {
	appToken: null,
}


const getters = {
	appAuthenticated : state => {
		return !!state.appToken
	},

	userIsAuthorized : state => {
		// return (!state.authorizationStatus || state.authorizationStatus === HADDIX_APP_AUTHORIZATION_AUTHORIZED) ? true : false
	}
}


const actions = {
    [VUEX_AUTH_REQUEST]: ({ dispatch, commit }, payload) => {
        
        api.post(`/auth/login`, payload).then( response => {
			let token = response.data.access_token

            dispatch(VUEX_AUTH_HYDRATE_FROM_TOKEN, token).then(() => {
				commit(VUEX_AUTH_AUTHORIZATION_SUCCESS, token)
			})
		}).catch( err => {
			idbDel(process.env.VUE_APP_HADDIX_USER_TOKEN).then(() => {
				commit(VUEX_AUTH_AUTHORIZATION_ERROR, err.response.data.error)
			})
		})
    },

    [VUEX_AUTH_HYDRATE_FROM_TOKEN]: async ({ commit }, token) => {
		let payload = {}
		payload.token = token

		api.defaults.headers.common['Authorization'] = `Bearer ${token}`
		
		await idbSet(process.env.VUE_APP_HADDIX_USER_TOKEN, token).then(() => {
			commit(VUEX_AUTH_HYDRATE_FROM_TOKEN, token)
		})
	},
}


const mutations = {
    [VUEX_AUTH_REQUEST]:( state ) => {
		// 
    },

    [VUEX_AUTH_AUTHORIZATION_SUCCESS]:(state, payload) => {
		state.authorizationStatus = HADDIX_APP_AUTHORIZATION_AUTHORIZED
    },

    [VUEX_AUTH_AUTHORIZATION_ERROR]:(state) => {
		state.authorizationStatus = HADDIX_APP_AUTHORIZATION_NOT_AUTHORIZED
    },

    [VUEX_AUTH_HYDRATE_FROM_TOKEN]: (state, payload) => {
		state.appToken = payload
		/* state.currentUser = payload.user
		if (payload.token) state.token = payload.token
		state.status = VUEX_AUTH_REQUEST_STATE_SUCCESS */
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}