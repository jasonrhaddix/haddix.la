<template>
	<v-app id="app">
		<transition 
			name="fade">
			<router-view></router-view>
		</transition>
		<navigation />
		<overlay-container />
	</v-app>
</template>


<script>
	import Navigation from '@/components/Navigation/Navigation'
	import OverlayContainer from '@/components/Containers/Overlay_Container'

	export default {
		name: 'app',

		components: {
			'navigation' : Navigation,
			'overlay-container' : OverlayContainer
		}
	}
</script>


<style lang="scss">
	@import '~vuetify/dist/vuetify.min.css';
	@import '@/styles/index.scss';
</style>
