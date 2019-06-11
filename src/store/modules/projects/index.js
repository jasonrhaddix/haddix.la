import api from '@/api'


import {
    VUEX_PROJECTS_FETCH_REQUEST,
    VUEX_PROJECTS_FETCH_SUCCESS,
    VUEX_PROJECTS_FETCH_FAILURE,

    VUEX_PROJECT_FETCH_REQUEST,
    VUEX_PROJECT_FETCH_SUCCESS,
    VUEX_PROJECT_FETCH_FAILURE,
    
    VUEX_PROJECT_CREATE,
    VUEX_PROJECT_CREATE_SUCCESS,
    VUEX_PROJECT_CREATE_FAILURE
} from '@/store/constants/projects'


const state = {
    projects: [],
    project: {},
}


const getters = {}


const actions = {

    /**
     * Fetch All Projects
     * 
     */
    [VUEX_PROJECTS_FETCH_REQUEST]:({commit}) => {
        api.get(`/projects`).then((response) => {
            commit(VUEX_PROJECTS_FETCH_SUCCESS, response.data.data)
        }).catch((err) => {
            commit(VUEX_PROJECTS_FETCH_FAILURE, err)
        })
    },

    /**
     * Fetch Project by ID (project_id)
     * 
     */
    [VUEX_PROJECT_FETCH_REQUEST]:({commit}, payload) => {
        api.get(`/projects/${payload}`).then((response) => {
            commit(VUEX_PROJECT_FETCH_SUCCESS, response.data.data)
        }).catch((err) => {
            commit(VUEX_PROJECT_FETCH_FAILURE, err)
        })
    },

    /**
     * Create Project
     * 
     */
    [VUEX_PROJECT_CREATE]:({commit}, payload) => {
        api.post(`/projects`, payload).then((response) => {
            commit(VUEX_PROJECT_CREATE_SUCCESS, response.data.data)
        }).catch((err) => {
            commit(VUEX_PROJECT_CREATE_FAILURE, err)
        })
    }
}


const mutations = {
    /**
     * Fetch Projects Mutations
     * 
     */
    [VUEX_PROJECTS_FETCH_REQUEST]:(state) => {
        state.projects = []
    },
    [VUEX_PROJECTS_FETCH_SUCCESS]:(state, payload) => {
        state.projects = payload
    },
    [VUEX_PROJECTS_FETCH_FAILURE]:(payload) => {
        console.log(payload)
    },

    /**
     * Fetch Project Mutations
     * 
     */
    [VUEX_PROJECT_FETCH_REQUEST]:(state) => {
        state.project = {}
    },
    [VUEX_PROJECT_FETCH_SUCCESS]:(state, payload) => {
        state.project = payload
    },
    [VUEX_PROJECT_FETCH_FAILURE]:(payload) => {
        console.log(payload)
    },

    /**
     * Create Project Mutations
     * 
     */
    [VUEX_PROJECT_CREATE]:(state) => {
        // 
    },
    [VUEX_PROJECT_CREATE_SUCCESS]:(state, payload) => {
        // 
    },
    [VUEX_PROJECT_CREATE_FAILURE]:(state, payload) => {
        // 
    },

}


export default {
    state,
    getters,
    actions,
    mutations
}