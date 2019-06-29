import Vue from 'vue'
import api from '@/api'


import { 
    VUEX_PROJECT_TREES_FETCH_REQUEST,
    VUEX_PROJECT_TREES_FETCH_FAILURE,
    VUEX_PROJECT_TREES_FETCH_SUCCESS,
    
    VUEX_PROJECT_TREE_FETCH_REQUEST,
    VUEX_PROJECT_TREE_FETCH_SUCCESS,
    VUEX_PROJECT_TREE_FETCH_FAILURE,

    VUEX_PROJECT_TREE_CREATE_REQUEST,
    VUEX_PROJECT_TREE_CREATE_SUCCESS,
    VUEX_PROJECT_TREE_CREATE_FAILURE
} from '../../constants/projects/project_tree';
import {
    VUEX_NOTIFICATIONS_ADD_TO_QUEUE
} from '@/store/constants/notifications'


const state = {
    projectTrees : [],
    projectTree  : {
        project_id : '',
        tree_data  : []
    }
}


const getters = {}


const actions = {
    [VUEX_PROJECT_TREES_FETCH_REQUEST]:({ dispatch, commit }) => {
        commit(VUEX_PROJECT_TREES_FETCH_REQUEST)

        api.get(`/project-trees`).then( response => {
            commit(VUEX_PROJECT_TREES_FETCH_SUCCESS, response.data.data)
        }).catch( err => {
            commit(VUEX_PROJECT_TREES_FETCH_FAILURE, err)

            dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
                component: {
                    path : 'Notifications',
                    file : 'Notification_Message'
                },
                data: {
                    type    : 'error',
                    message : "Error: Project trees fetch failed"
                }
            })
        })
    },

    [VUEX_PROJECT_TREE_FETCH_REQUEST]:({ dispatch, commit }, payload) => {
        commit(VUEX_PROJECT_TREE_FETCH_REQUEST)
        api.get(`/project-trees/${payload}`).then( response => {
            commit(VUEX_PROJECT_TREE_FETCH_SUCCESS, response.data.data)
        }).catch( err => {
            commit(VUEX_PROJECT_TREE_FETCH_FAILURE, err)

            dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
                component: {
                    path : 'Notifications',
                    file : 'Notification_Message'
                },
                data: {
                    type    : 'error',
                    message : "Error: Project tree fetch failed"
                }
            })
        })
    },

    [VUEX_PROJECT_TREE_CREATE_REQUEST]:({ rootState, dispatch, commit}, payload) => {
        commit(VUEX_PROJECT_TREE_CREATE_REQUEST)
        
        let data = { 
            project_id : payload.project_id,
            session_id: rootState.app.sessionToken,
            tree_data  : payload.tree_data
        }

        api.post(`/project-trees`, data).then( response => {
            commit(VUEX_PROJECT_TREE_CREATE_SUCCESS, response.data.data)
        }).catch( err => {
            dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
                component: {
                    path : 'Notifications',
                    file : 'Notification_Message'
                },
                data: {
                    type    : 'error',
                    message : "Error: Project tree creation failed"
                }
            })
        })
    }
}


const mutations = {
    [VUEX_PROJECT_TREES_FETCH_REQUEST]: (state) => {
        state.projectTrees = []
    },

    [VUEX_PROJECT_TREES_FETCH_SUCCESS]: (state, payload) => {
        state.projectTrees = payload
    },

    [VUEX_PROJECT_TREES_FETCH_FAILURE]: (state, payload) => {
        
    },



    [VUEX_PROJECT_TREE_FETCH_REQUEST]: (state) => {
        state.projectTree = {}
    },

    [VUEX_PROJECT_TREE_FETCH_SUCCESS]: (state, payload) => {
        if (payload.length == 0) return

        state.projectTree = {
            project_id : payload[0].id,
            tree_data  : [payload[0].tree_data]
        }
    },

    [VUEX_PROJECT_TREE_FETCH_FAILURE]: (state, payload) => {

    },


    
    [VUEX_PROJECT_TREE_CREATE_REQUEST]: (state) => {
        state.projectTree.project_id = null
        // state.projectTree.tree_data = []
    },
    
    [VUEX_PROJECT_TREE_CREATE_SUCCESS]: (state, payload) => {
        state.projectTree.project_id = payload.project_id
        state.projectTree.tree_data.push(payload.tree_data)
    },

    [VUEX_PROJECT_TREE_CREATE_FAILURE]: (state) => {
        
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}