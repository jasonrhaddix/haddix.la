<template>
	<v-app id="app">
		<transition 
			name="fade">
			<router-view></router-view>
		</transition>
		<!-- <navigation /> -->
		<overlay-container />
		<login-container />
		<notification-container />
	</v-app>
</template>


<script>
	// import Navigation from '@/components/Navigation/Navigation'
	import OverlayContainer from '@/components/Containers/Overlay_Container'
	import NotificationContainer from '@/components/Containers/Notification_Container'
	import LoginContainer from '@/components/Login/Login.vue'

	export default {
		name: 'app',

		components: {
			// 'navigation' : Navigation,
			'overlay-container' : OverlayContainer,
			'notification-container' : NotificationContainer,
			'login-container' : LoginContainer
		}
	}
</script>


<style lang="scss">
	// @import '~codemirror/lib/codemirror.css';
	@import '@/styles/index.scss';
</style>
