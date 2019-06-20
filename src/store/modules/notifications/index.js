
import {
    VUEX_NOTIFICATIONS_ADD_TO_QUEUE,
    VUEX_NOTIFICATIONS_PROCCESS,
    VUEX_NOTIFICATIONS_CYCLE_COMPLETE
} from '@/store/constants/notifications'
import {
    VUEX_UI_NOTIFICATIONS_CONTAINER_SHOW
} from '@/store/constants/ui'


const state = {
    notificationsQueue: [],
    hasNotificationsPending: false
}


const getters = {
    numberOfNotifications: state => {
        return state.notificationsQueue.length
    },
}


const actions = {
    [VUEX_NOTIFICATIONS_ADD_TO_QUEUE]: async ({ dispatch, commit }, payload) => {
        await commit(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, payload)
        dispatch(VUEX_NOTIFICATIONS_PROCCESS)
    },

    [VUEX_NOTIFICATIONS_PROCCESS]:({rootState, state, getters, dispatch, commit}) => {
       if (getters.numberOfNotifications > 0 && !rootState.ui.notificationsContainer.openState) {
            // Kick-off Notification Queue
            dispatch(VUEX_UI_NOTIFICATIONS_CONTAINER_SHOW, state.notificationsQueue[0])
        }
    },

    [VUEX_NOTIFICATIONS_CYCLE_COMPLETE]: async ({dispatch, commit}) => {
        await commit(VUEX_NOTIFICATIONS_CYCLE_COMPLETE)
        dispatch(VUEX_NOTIFICATIONS_PROCCESS)
    }
}


const mutations = {
    [VUEX_NOTIFICATIONS_ADD_TO_QUEUE]:(state, payload) => {
        state.notificationsQueue.push(payload)
    },

    [VUEX_NOTIFICATIONS_CYCLE_COMPLETE]:(state) => {
        state.notificationsQueue.shift()
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}