import {
    VUEX_UI_HEADER_SHOW,
    VUEX_UI_HEADER_HIDE,

    VUEX_UI_NAVIGATION_SHOW_OPENSTATE,
    VUEX_UI_NAVIGATION_HIDE_OPENSTATE,
    VUEX_UI_NAVIGATION_TOGGLE_OPENSTATE,

    VUEX_UI_NAVIGATION_ENABLED,
    VUEX_UI_NAVIGATION_DISABLED
} from '@/store/constants/ui'


const state = {
    headerState: false, 
    navigation: {
        isEnabled: true,
        openState: false
    }
}

const getters = {
    // 
}

const actions = {
    [VUEX_UI_HEADER_SHOW]:({ commit }) => {
        commit(VUEX_UI_HEADER_SHOW)
    },

    [VUEX_UI_HEADER_HIDE]:({ commit }) => {
        commit(VUEX_UI_HEADER_HIDE)
    },

    [VUEX_UI_NAVIGATION_SHOW_OPENSTATE]:({ commit }) => {
        commit(VUEX_UI_NAVIGATION_SHOW_OPENSTATE)
    },

    [VUEX_UI_NAVIGATION_HIDE_OPENSTATE]:({ commit }) => {
        commit(VUEX_UI_NAVIGATION_HIDE_OPENSTATE)
    },

    [VUEX_UI_NAVIGATION_TOGGLE_OPENSTATE]:({ commit }) => {
        commit(VUEX_UI_NAVIGATION_TOGGLE_OPENSTATE)
    },

    [VUEX_UI_NAVIGATION_ENABLED]:({commit}) => {
        commit(VUEX_UI_NAVIGATION_ENABLED)
    },

    [VUEX_UI_NAVIGATION_DISABLED]:({commit}, delay) => {
        commit(VUEX_UI_NAVIGATION_DISABLED)

        if (delay) {
            setTimeout(() => {
                commit(VUEX_UI_NAVIGATION_ENABLED)
            }, delay)
        }
    }
}

const mutations = {
    [VUEX_UI_HEADER_SHOW]:( state ) => {
        state.headerState = true;
    },

    [VUEX_UI_HEADER_HIDE]:( state ) => {
        state.headerState = false;
    },

    [VUEX_UI_NAVIGATION_SHOW_OPENSTATE]:( state ) => {
        state.navigation.openState = true
    },

    [VUEX_UI_NAVIGATION_HIDE_OPENSTATE]:( state ) => {
        state.navigation.openState = false
    },

    [VUEX_UI_NAVIGATION_TOGGLE_OPENSTATE]:( state ) => {
        state.navigation.openState = !state.navigation.openState
    },

    [VUEX_UI_NAVIGATION_ENABLED]:( state ) => {
        state.navigation.isEnabled = true
    },

    [VUEX_UI_NAVIGATION_DISABLED]:( state ) => {
        state.navigation.isEnabled = false
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}