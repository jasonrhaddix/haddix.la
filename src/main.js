import Vue from 'vue'
import UUID from 'vue-uuid'
import Vuetify from 'vuetify'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import { 
	VUEX_APP_INIT
} from '@/store/constants/app'

// Directives
import { matchRoute } from '@/directives'
//Plugins
import { fontawesome, gmaps } from '@/plugins'




// Vue - Use statements
Vue.use(
	Vuetify,
	{
		theme: {
			primary: '#3100bd'
		}
	}
)
Vue.use(UUID)

// TODO: configure this
Vue.config.productionTip = false

let app = null
store.dispatch(VUEX_APP_INIT).then(() => {
	app = new Vue({
		router,
		store,
		created() {
			// For Electron app
			// this.$router.push('/')
		},
		render: h => h(App)
	}).$mount('#app')
})

export default app