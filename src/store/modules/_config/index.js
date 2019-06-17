import Vue from 'vue'

import constants from '@/store/constants/_config/constants.js'
import properties from '@/store/constants/_config/properties.js'

import {
    VUEX_CONSTANTS_INIT,
    VUEX_CONSTANTS_INITIALIZED,
    VUEX_CONSTANTS_SET_ALL,

    VUEX_PROPERTIES_INIT,
    VUEX_PROPERTIES_INITIALIZED,
    VUEX_PROPERTIES_SET_ALL
} from '@/store/constants/_config'

const state = {
    constants: {
        initialized : false
    },
    properties: {
        initialized : false
    }
}


const getters = {
    constantsAreLoaded: state => state.constants.initialized,
    propertiesAreLoaded: state => state.properties.initialized,
    
    getConst: (state) => (value) => {
        return state[value]
    },
    getProps: (state) => (value) => {
        return state[value]
    }
}


const actions = {
    [VUEX_CONSTANTS_INIT]: async ({commit}) => {
        await commit(VUEX_CONSTANTS_SET_ALL, constants)
        commit(VUEX_CONSTANTS_INITIALIZED)
    },

    [VUEX_PROPERTIES_INIT]: async ({ dispatch, commit }) => {
        await commit(VUEX_PROPERTIES_SET_ALL, properties)
        commit(VUEX_PROPERTIES_INITIALIZED)
    },
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
		state.constants.initialized = true
    },

    [VUEX_PROPERTIES_SET_ALL]: (state, payload) => {
        Object.keys(payload).forEach( function(property) {
            Vue.set(state, property, payload[property])

            /*jslint browser: true */
            // window[property] = payload[property]
        })
    },

    [VUEX_PROPERTIES_INITIALIZED]: (state) => {
		state.properties.initialized = true
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}