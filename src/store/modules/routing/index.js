import router from '@/router'

import {
    VUEX_ROUTING_NAVIGATE_TO_ROUTE,
    VUEX_ROUTING_PUSH_ROUTE,
    VUEX_ROUTING_EXIT_ROUTE_TEARDOWN,
} from '@/store/constants/routing'
import {
    VUEX_UI_NAVIGATION_HIDE_OPENSTATE
} from '@/store/constants/ui'


const state = {}

const getters = {}

const actions = {
    [VUEX_ROUTING_NAVIGATE_TO_ROUTE]: async ({ dispatch }, payload) => {
        await dispatch(VUEX_ROUTING_EXIT_ROUTE_TEARDOWN, payload)
        dispatch(VUEX_ROUTING_PUSH_ROUTE, payload)

    },

    [VUEX_ROUTING_PUSH_ROUTE]:({}, payload) => {
        router.push({ name: payload })
    },

    [VUEX_ROUTING_EXIT_ROUTE_TEARDOWN]:({ dispatch, rootState }, payload) => {
        if (rootState.ui.navigation.openState) 
            dispatch(VUEX_UI_NAVIGATION_HIDE_OPENSTATE)

        // TODO: pass teadown options instead of switch?
        switch(payload) {
            case 'home' :
                // 
                break
            case 'projects' :
                // 
                break
        }
    }
}
const mutations = {}


export default {
    state,
    getters,
    actions,
    mutations
}