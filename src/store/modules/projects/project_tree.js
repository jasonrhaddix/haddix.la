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


const state = {
    projectTrees: [],
    projectTree: {}
}


const getters = {}


const actions = {
    [VUEX_PROJECT_TREES_FETCH_REQUEST]:({commit}) => {
        commit(VUEX_PROJECT_TREES_FETCH_REQUEST)

        api.get(`/project-trees`).then((response) => {
            commit(VUEX_PROJECT_TREES_FETCH_SUCCESS, response.data.data)
        }).catch((err) => {
            commit(VUEX_PROJECT_TREES_FETCH_FAILURE, err)
        })
    },

    [VUEX_PROJECT_TREE_FETCH_REQUEST]:({commit}, payload) => {
        commit(VUEX_PROJECT_TREE_FETCH_REQUEST)

        api.get(`/project-trees`, payload).then((response) => {
            commit(VUEX_PROJECT_TREES_FETCH_SUCCESS, response.data.data)
        }).catch((err) => {
            commit(VUEX_PROJECT_TREES_FETCH_FAILURE, err)
        })
    },

    [VUEX_PROJECT_TREE_CREATE_REQUEST]:({commit}, payload) => {
        commit(VUEX_PROJECT_TREE_CREATE_REQUEST)

        let obj = { 
            project_id: '123123',
            tree: payload
        }

        api.post(`/project-trees`, obj).then((response) => {
            commit(VUEX_PROJECT_TREE_CREATE_SUCCESS, response.data.data)
        }).catch((err) => {
            commit(VUEX_PROJECT_TREE_CREATE_FAILURE, err)
        })
    }
}


const mutations = {
    [VUEX_PROJECT_TREES_FETCH_REQUEST]: (state) => {
        state.projectTrees = []
    },

    [VUEX_PROJECT_TREES_FETCH_SUCCESS]: (state, payload) => {
        state.projectTrees = payload
        console.log(payload)
    },

    [VUEX_PROJECT_TREES_FETCH_FAILURE]: (state, payload) => {
        console.log(payload)
    },



    [VUEX_PROJECT_TREE_FETCH_REQUEST]: (state) => {
        state.projectTree = {}
    },

    [VUEX_PROJECT_TREE_FETCH_SUCCESS]: (state, payload) => {
        state.projectTree = payload
        console.log(payload)
    },

    [VUEX_PROJECT_TREE_FETCH_FAILURE]: (state, payload) => {
        console.log(payload)
    },


    
    [VUEX_PROJECT_TREE_CREATE_REQUEST]: (state) => {
        // 
    },

    [VUEX_PROJECT_TREE_CREATE_SUCCESS]: (state) => {
        
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