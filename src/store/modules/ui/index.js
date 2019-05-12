import {
    VUEX_UI_HEADER_SHOW,
    VUEX_UI_HEADER_HIDE,

    VUEX_UI_NAVIGATION_SHOW_OPENSTATE,
    VUEX_UI_NAVIGATION_HIDE_OPENSTATE,
    VUEX_UI_NAVIGATION_TOGGLE_OPENSTATE
} from '@/store/constants/ui'


const state = {
    headerState: false, 
    navigation: {
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
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}