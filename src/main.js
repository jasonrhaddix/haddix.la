import Vue from 'vue'
import UUID from 'vue-uuid'

// import { sync } from 'vuex-router-sync'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import { matchRoute } from '@/directives/matchRoute'
import { fontawesome } from '@/directives/fontawesome'

import { 
	VUEX_APP_INIT
} from '@/store/constants/app'


// Vue - Use statements
Vue.use(UUID)


// TODO: configure this
Vue.config.productionTip = false


let app = null
store.dispatch(VUEX_APP_INIT).then(() => {
	app = new Vue({
		router,
		store,
/* 		methods: {

		}, */
		render: h => h(App)
	}).$mount('#app')
})

export default app