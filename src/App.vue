<template>
	<v-app id="app">
		<transition 
			name="fade">
			<router-view></router-view>
		</transition>
		<navigation />
	</v-app>
</template>


<script>
	import Navigation from '@/components/Navigation/Navigation'

	export default {
		name: 'app',

		components: {
			'navigation' : Navigation
		}
	}
</script>


<style lang="scss">
	@import '~vuetify/dist/vuetify.min.css';
	@import '@/styles/index.scss';
</style>
