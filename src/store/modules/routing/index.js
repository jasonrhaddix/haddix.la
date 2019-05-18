import router from '@/router'

import {
    VUEX_ROUTING_INIT,
    VUEX_ROUTING_NAVIGATE_TO_ROUTE,
    VUEX_ROUTING_EXIT_ROUTE_TEARDOWN,
    VUEX_ROUTING_PUSH_ROUTE,
    VUEX_ROUTING_ENTER_ROUTE,
    VUEX_ROUTING_SET_PREVIOUS_ROUTE,
    VUEX_ROUTING_SET_CURRENT_ROUTE
} from '@/store/constants/routing'
import {
    VUEX_UI_HEADER_SHOW,
    VUEX_UI_HEADER_HIDE,
    VUEX_UI_NAVIGATION_HIDE_OPENSTATE
} from '@/store/constants/ui'


const state = {
    route: {
        previous : null,
        current  : null
    }
}

const getters = {}

const actions = {
    // Get the entry point when app initially loaded
    [VUEX_ROUTING_INIT]:({ commit, dispatch }) => {
        setTimeout(() => {
            let route = router.history.current.name
            commit(VUEX_ROUTING_SET_CURRENT_ROUTE, route)
            dispatch(VUEX_ROUTING_ENTER_ROUTE, route)
        },500)
    },


    /**************************/
    // ROUTE NAVIGATION FLOW
    /**************************/
    // 1.
    // Navigate to route action
    [VUEX_ROUTING_NAVIGATE_TO_ROUTE]: async ({ state, dispatch, rootState }, payload) => {
        if (rootState.ui.navigation.openState) 
            dispatch(VUEX_UI_NAVIGATION_HIDE_OPENSTATE)

        // Abort is incoming route if same as current route
        if (payload === state.route.current) return
        
        await dispatch(VUEX_ROUTING_EXIT_ROUTE_TEARDOWN, payload)
        await dispatch(VUEX_ROUTING_PUSH_ROUTE, payload)
        dispatch(VUEX_ROUTING_ENTER_ROUTE, payload)
    },

    // 2.
    // Teardown actions for exiting a route/view
    [VUEX_ROUTING_EXIT_ROUTE_TEARDOWN]:({}) => {
        /* ADD TEARDOWN */
    },

    // 3.
    // Push the route to the routeer 
    [VUEX_ROUTING_PUSH_ROUTE]: async ({ commit }, payload) => {
        await commit(VUEX_ROUTING_SET_PREVIOUS_ROUTE)
        router.push({ name: payload })
        commit(VUEX_ROUTING_SET_CURRENT_ROUTE, payload)
    },

    // 4.
    // Enter route actions
    [VUEX_ROUTING_ENTER_ROUTE]:({ dispatch }, payload) => {
        if (payload !== 'home') {
            dispatch(VUEX_UI_HEADER_SHOW)
        } else {
            dispatch(VUEX_UI_HEADER_HIDE)
        }
    }
    /**************************/
    /**************************/


}
const mutations = {
    [VUEX_ROUTING_INIT]:(state, payload) => {
        state.route.current = payload
    },

    [VUEX_ROUTING_SET_CURRENT_ROUTE]:(state, payload) => {
        state.route.current = payload
    },

    [VUEX_ROUTING_SET_PREVIOUS_ROUTE]:(state) => {
        state.route.previous = state.route.current
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}