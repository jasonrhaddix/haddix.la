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
import { 
    VUEX_UI_OVERLAY_CONTAINER_HIDE
} from '@/store/constants/ui'
import {
    VUEX_NOTIFICATIONS_ADD_TO_QUEUE
} from '@/store/constants/notifications'


const state = {
    projects        : [],
    project         : {},

    projectsLoading : false,
    projectLoading  : false,
    projectSaving   : false
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
    [VUEX_PROJECT_CREATE]:({commit, dispatch}, payload) => {
        api.post(`/projects`, payload).then( async (response) => {
            // Save returned data back in state.project
            await commit(VUEX_PROJECT_CREATE_SUCCESS, response.data.data)
            // Close Create Form
            await dispatch(VUEX_UI_OVERLAY_CONTAINER_HIDE)
            // Send success notification
            await dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
                component: {
                    path : 'Notifications',
                    file : 'Notification_Message'
                },
                data: {
                    type    : 'success',
                    message : 'Success: Project created!',
                },
                timeout: 0
            })
            // Retrieve latest Projects
            dispatch(VUEX_PROJECTS_FETCH_REQUEST)
        }).catch( async (err) => {
            await commit(VUEX_PROJECT_CREATE_FAILURE, err)

            dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
                component: {
                    path : 'Notifications',
                    file : 'Notification_Message'
                },
                data: {
                    type    : 'error',
                    message : 'Error: Project creatation failed'
                }
            })
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
        state.projectsLoading = true
    },
    [VUEX_PROJECTS_FETCH_SUCCESS]:(state, payload) => {
        state.projects = payload
        state.projectsLoading = false
    },
    [VUEX_PROJECTS_FETCH_FAILURE]:(state) => {
        state.projectsLoading = false
    },

    /**
     * Fetch Project Mutations
     * 
     */
    [VUEX_PROJECT_FETCH_REQUEST]:(state) => {
        state.project = {}
        state.projectLoading = true
    },
    [VUEX_PROJECT_FETCH_SUCCESS]:(state, payload) => {
        state.project = payload
        state.projectLoading = false
    },
    [VUEX_PROJECT_FETCH_FAILURE]:(state) => {
        state.projectLoading = false
    },

    /**
     * Create Project Mutations
     * 
     */
    [VUEX_PROJECT_CREATE]:(state) => {
        state.projectSaving = true
    },
    [VUEX_PROJECT_CREATE_SUCCESS]:(state, payload) => {
        state.project = payload
        state.projectSaving = false
    },
    [VUEX_PROJECT_CREATE_FAILURE]:(state) => {
        state.projectSaving = false
    },

}


export default {
    state,
    getters,
    actions,
    mutations
}