import Vue from 'vue'
import router from '@/router'


export const matchRoute = Vue.directive('match-route', {
	bind(el, binding) {
		switch(binding.arg) {
			case 'class' :
				Object.keys(binding.modifiers).map(c => {
					el.classList.add(c)
				})
				break
		}
		
		let routeName = router.history.current.name
		if(routeName !== binding.value) {
			el.classList.remove('active')
			return
		}
	}
})