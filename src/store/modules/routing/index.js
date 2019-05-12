import router from '@/router'

import {
    VUEX_ROUTING_INIT,
    VUEX_ROUTING_NAVIGATE_TO_ROUTE,
    VUEX_ROUTING_EXIT_ROUTE_TEARDOWN,
    VUEX_ROUTING_PUSH_ROUTE,
    VUEX_ROUTING_ENTER_ROUTE
} from '@/store/constants/routing'
import {
    VUEX_UI_HEADER_SHOW,
    VUEX_UI_HEADER_HIDE,
    VUEX_UI_NAVIGATION_HIDE_OPENSTATE
} from '@/store/constants/ui'


const state = {
    route: {
        from    : '',
        current : ''
    }
}

const getters = {}

const actions = {
    // Get the entry point when app initially loaded
    [VUEX_ROUTING_INIT]:({ commit, dispatch }) => {
        setTimeout(() => {
            let route = router.history.current.name
            console.log(route)
            commit(VUEX_ROUTING_INIT, route)
            dispatch(VUEX_ROUTING_ENTER_ROUTE, route)
        },500)
    },


    /**************************/
    // ROUTE NAVIGATION FLOW
    /**************************/
    // 1.
    // Navigate to route action
    [VUEX_ROUTING_NAVIGATE_TO_ROUTE]: async ({ dispatch }, payload) => {
        await dispatch(VUEX_ROUTING_EXIT_ROUTE_TEARDOWN, payload)
        await dispatch(VUEX_ROUTING_PUSH_ROUTE, payload)
        dispatch(VUEX_ROUTING_ENTER_ROUTE, payload)
    },

    // 2.
    // Teardown actions for exiting a route/view
    [VUEX_ROUTING_EXIT_ROUTE_TEARDOWN]:({ dispatch, rootState }) => {
        if (rootState.ui.navigation.openState) 
            dispatch(VUEX_UI_NAVIGATION_HIDE_OPENSTATE)
    },

    // 3.
    // Push the route to the routeer 
    [VUEX_ROUTING_PUSH_ROUTE]:({}, payload) => {
        router.push({ name: payload })
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
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}