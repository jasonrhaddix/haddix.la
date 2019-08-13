import router from '@/router'

export const MatchRoute = {
	bind (el, binding) {
		switch (binding.arg) {
		case 'class' :
			Object.keys(binding.modifiers).map(c => {
				el.classList.add(c)
			})
			break
		}

		let routeName = router.history.current.name
		if (routeName !== binding.value) {
			el.classList.remove('active')
		}
	}
}
