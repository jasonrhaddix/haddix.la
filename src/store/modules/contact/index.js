import api from '@/api'

import {
    VUEX_CONTACT_SEND_EMAIL_REQUEST,
    VUEX_CONTACT_SEND_EMAIL_SUCCESS,
    VUEX_CONTACT_SEND_EMAIL_FAILURE,
    VUEX_CONTACT_SEND_EMAIL_RESET
} from '@/store/constants/contact'
import  {
    VUEX_NOTIFICATIONS_ADD_TO_QUEUE
} from '@/store/constants/notifications'


const state = {
    mailStatus: null,
    mailSending : false
}


const getters = {}


const actions = {
    [VUEX_CONTACT_SEND_EMAIL_REQUEST]:({ commit, dispatch }, payload) => {
        commit(VUEX_CONTACT_SEND_EMAIL_REQUEST)

        api.post(`/contact`, payload).then( response => {
            commit(VUEX_CONTACT_SEND_EMAIL_SUCCESS, response)

            dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
                component: {
                    path : 'Notifications',
                    file : 'Notification_Message'
                },
                data: {
                    type    : 'success',
                    message : 'Success: Your message has been sent',
                },
                timeout: 0
            })

            setTimeout(() => {
                commit(VUEX_CONTACT_SEND_EMAIL_RESET)
            },100)
        }).catch( err => {
            commit(VUEX_CONTACT_SEND_EMAIL_FAILURE, err)

            dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
                component: {
                    path : 'Notifications',
                    file : 'Notification_Message'
                },
                data: {
                    type    : 'error',
                    message : 'Error: Cannot send message',
                },
                timeout: 0
            })
        })
    }
}


const mutations = {
    [VUEX_CONTACT_SEND_EMAIL_REQUEST]:(state) => {
        state.mailSending = true
        state.mailStatus = HADDIX_CONTACT_STATUS__PENDING
    },

    [VUEX_CONTACT_SEND_EMAIL_SUCCESS]:(state) => {
        state.mailSending = false
        state.mailStatus = HADDIX_CONTACT_STATUS__SUCCESS
    },

    [VUEX_CONTACT_SEND_EMAIL_FAILURE]:(state) => {
        state.mailSending = false
        state.mailStatus = HADDIX_CONTACT_STATUS__FAILURE
    },

    [VUEX_CONTACT_SEND_EMAIL_RESET]:(state) => {
        state.mailStatus = HADDIX_CONTACT_STATUS__READY
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}