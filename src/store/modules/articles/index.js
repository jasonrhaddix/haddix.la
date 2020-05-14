import medium from '@/api/medium'

import {
	VUEX_ARTICLES_FETCH,
	VUEX_ARTICLES_SUCCESS,
	VUEX_ARTICLES_FAILURE
} from '@/store/constants/articles'

const state = {
	articlesRequest: null,
	articles: []
}

const getters = {}

const actions = {
	[VUEX_ARTICLES_FETCH]: ({ commit, dispatch }) => {
		// medium.get('latest?format=json').then(response => {
		// 	console.log(response)
		// })

		fetch('https://medium.com/@jasonrhaddix/latest?format=json').then(res => {
			console.log(res)
		})
	}
}

const mutations = {
	[VUEX_ARTICLES_FETCH]: state => {
		state.articlesRequest = 'Pending'
		state.articles = []
	},

	[VUEX_ARTICLES_SUCCESS]: (state, payload) => {
		state.articlesRequest = 'Success'
		state.articles = payload
	},

	[VUEX_ARTICLES_FAILURE]: state => {
		state.articlesRequest = 'Failure'
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
