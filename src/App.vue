<template>
	<v-app id="app">
		<transition name="fade">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
		<under-construction-bar />
		<navigation />
		<!-- <footer-container /> -->
		<overlay-container />
		<login-container />
		<notification-container />
	</v-app>
</template>

<script>
import UnderContructionBar from '@/components/_global/Under_Construction_Bar'
import Navigation from '@/components/Navigation/Navigation'
// import Footer from '@/components/Footer/Footer'
import OverlayContainer from '@/components/Containers/Overlay_Container'
import NotificationContainer from '@/components/Containers/Notification_Container'
import LoginContainer from '@/components/Login/Login.vue'

export default {
	name: 'app',

	components: {
		'under-construction-bar': UnderContructionBar,
		'navigation': Navigation,
		// 'footer-container': Footer,
		'overlay-container': OverlayContainer,
		'notification-container': NotificationContainer,
		'login-container': LoginContainer
	}
}
</script>

<style lang="scss">
	@import '@/styles/index.scss';
</style>
