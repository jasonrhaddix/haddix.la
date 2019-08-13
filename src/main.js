import Vue from 'vue'
import Vuelidate from 'vuelidate'
import UUID from 'vue-uuid'

// Mixins
import { loadView, loadComponent } from '@/mixins/asyncLoaders'
// Directives
import { MatchRoute } from '@/directives'
// Plugins
import vuetify from '@/plugins/vuetify'
import { fontawesome, gmaps } from '@/plugins'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import {
	VUEX_APP_INIT
} from '@/store/constants/app'

// Vue - Directive statements
Vue.directive('match-route', MatchRoute)

// Vue - Use statements
Vue.use(UUID)
Vue.use(Vuelidate)

// TODO: configure this
Vue.config.productionTip = false

let app = null
store.dispatch(VUEX_APP_INIT).then(() => {
	app = new Vue({
		vuetify,
		router,
		store,
		created () {
			// For Electron app
			// this.$router.push('/')
		},
		methods: {
			loadView,
			loadComponent
		},
		render: h => h(App)
	}).$mount('#app')
})

export default app
