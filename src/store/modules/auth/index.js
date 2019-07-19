import { set as idbSet, del as idbDel } from 'idb-keyval'

import api from '@/api'

import {
  VUEX_AUTH_REQUEST,
  VUEX_AUTH_HYDRATE_FROM_TOKEN,
  VUEX_AUTH_LOGOUT,

  VUEX_AUTH_AUTHORIZATION_SUCCESS,
  VUEX_AUTH_AUTHORIZATION_ERROR
} from '@/store/constants/auth'
import {
  VUEX_NOTIFICATIONS_ADD_TO_QUEUE
} from '@/store/constants/notifications'
import {
  VUEX_UI_LOGIN_CONTAINER_HIDE
} from '@/store/constants/ui'

const state = {
  appToken: null,

  authorizationStatus: null,
  authorizing: false
}

const getters = {
  appAuthenticated: state => {
    return !!state.appToken
  },

  userIsAuthorized: state => {
    // return (!state.authorizationStatus || state.authorizationStatus === HADDIX_APP_AUTHORIZATION_AUTHORIZED) ? true : false
  }
}

const actions = {
  [VUEX_AUTH_REQUEST]: ({ dispatch, commit }, payload) => {
    commit(VUEX_AUTH_REQUEST)

    api.post(`/auth/login`, payload).then(response => {
      let token = response.data.access_token

      dispatch(VUEX_AUTH_HYDRATE_FROM_TOKEN, token).then(() => {
        commit(VUEX_AUTH_AUTHORIZATION_SUCCESS, token)
      })

      dispatch(VUEX_UI_LOGIN_CONTAINER_HIDE)

      dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
        component: {
          path: 'Notifications',
          file: 'Notification_Message'
        },
        data: {
          type: 'success',
          message: "You've successfully logged in"
        }
      })
    }).catch(err => {
      idbDel(process.env.VUE_APP_HADDIX_USER_TOKEN).then(() => {
        commit(VUEX_AUTH_AUTHORIZATION_ERROR, err.response.data.error)
      })

      dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
        component: {
          path: 'Notifications',
          file: 'Notification_Message'
        },
        data: {
          type: 'error',
          message: 'Wrong username or password'
        }
      })
    })
  },

  [VUEX_AUTH_HYDRATE_FROM_TOKEN]: async ({ commit }, token) => {
    /* let payload = {}
		payload.token = token */

    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    await idbSet(process.env.VUE_APP_HADDIX_USER_TOKEN, token).then(() => {
      commit(VUEX_AUTH_HYDRATE_FROM_TOKEN, token)
    })
  },

  [VUEX_AUTH_LOGOUT]: async ({ commit }) => {
    await idbDel(process.env.VUE_APP_HADDIX_USER_TOKEN).then(() => {
      // api.defaults.headers.common['Authorization'] = null
      commit(VUEX_AUTH_LOGOUT)
    })
  }
}

const mutations = {
  [VUEX_AUTH_REQUEST]: (state) => {
    state.authorizing = true
  },

  [VUEX_AUTH_AUTHORIZATION_SUCCESS]: (state, payload) => {
    state.authorizationStatus = HADDIX_APP_AUTHORIZATION_AUTHORIZED
    state.authorizing = false
  },

  [VUEX_AUTH_AUTHORIZATION_ERROR]: (state) => {
    state.authorizationStatus = HADDIX_APP_AUTHORIZATION_NOT_AUTHORIZED
    state.authorizing = false
  },

  [VUEX_AUTH_HYDRATE_FROM_TOKEN]: (state, payload) => {
    state.appToken = payload
    /* state.currentUser = payload.user
		if (payload.token) state.token = payload.token
		state.status = VUEX_AUTH_REQUEST_STATE_SUCCESS */
  },

  [VUEX_AUTH_LOGOUT]: (state) => {
    state.appToken = null
    state.authorizationStatus = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
