import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import UUID from 'vue-uuid'


import App from '@/App.vue'
import router from '@/router'
import store from '@/store'


// Mixins
import { loadView, loadComponent } from '@/mixins/asyncLoaders'
// Directives
import { Ripple } from 'vuetify/es5/directives'
import { MatchRoute } from '@/directives'
//Plugins
import { fontawesome, gmaps } from '@/plugins'


import { 
	VUEX_APP_INIT
} from '@/store/constants/app'



// Vue - Directive statements
Vue.directive('match-route', MatchRoute)



// Vue - Use statements
Vue.use(UUID)
Vue.use(Vuelidate)
Vue.use(Vuetify, {
	directives: {
		Ripple
	},
	theme: {
		primary: '#3100BD',
		accent: '#3100BD'
	}
})



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
		methods: {
			loadView,
			loadComponent
		},
		render: h => h(App)
	}).$mount('#app')
})


export default app