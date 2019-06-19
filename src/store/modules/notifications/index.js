
import {
    VUEX_NOTIFICATIONS_ADD_TO_QUEUE,
    VUEX_NOTIFICATIONS_CLEAR_NOTIFICATION
} from '@/store/constants/notifications'
import {
    VUEX_UI_NOTIFICATIONS_CONTAINER_SHOW,
    VUEX_UI_NOTIFICATIONS_CONTAINER_HIDE
} from '@/store/constants/ui'


const state = {
    notification: {
        type: 'success | error | alert | etc',
        message: '',
    },
    notificationQueue: []
}


const getters = {
    // 
}


const actions = {
    [VUEX_NOTIFICATIONS_ADD_TO_QUEUE]:({ dispatch, commit }, payload) => {
        dispatch(VUEX_UI_NOTIFICATIONS_CONTAINER_SHOW, payload)
    },

    [VUEX_NOTIFICATIONS_CLEAR_NOTIFICATION]:({ dispatch, commit }) => {
        commit(VUEX_NOTIFICATIONS_CLEAR_NOTIFICATION)
        dispatch(VUEX_UI_NOTIFICATIONS_CONTAINER_HIDE)
    }
}


const mutations = {
    [VUEX_NOTIFICATIONS_ADD_TO_QUEUE]:(state, payload) => {
        state.notificationQueue.push(payload)
    },

    [VUEX_NOTIFICATIONS_CLEAR_NOTIFICATION]:(state) => {

    }
}


export default {
    state,
    getters,
    actions,
    mutations
}