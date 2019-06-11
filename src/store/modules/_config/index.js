import Vue from 'vue'

import constants from '@/store/constants/_config/constants.js'

import {
    VUEX_CONSTANTS_INIT,
    VUEX_CONSTANTS_INITIALIZED,
    VUEX_CONSTANTS_SET_ALL
} from '@/store/constants/_config'

const state = {
    initialized : false
}


const getters = {
    constantsAreLoaded: state => state.initialized,
    
    getConst: (state) => (value) => {
        return state[value]
    }
}


const actions = {
    [VUEX_CONSTANTS_INIT]: async ({commit}) => {
        await commit(VUEX_CONSTANTS_SET_ALL, constants)
        commit(VUEX_CONSTANTS_INITIALIZED)
    }
}


const mutations = {
    [VUEX_CONSTANTS_SET_ALL]: (state, payload) => {
        Object.keys(payload).forEach( function(constant) {
            Vue.set(state, constant, payload[constant])

            /*jslint browser: true */
            window[constant] = payload[constant]
        })
    },

    [VUEX_CONSTANTS_INITIALIZED]: (state) => {
		state.initialized = true
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}