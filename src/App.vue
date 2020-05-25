<template>
	<v-app id="app">
		<transition name="fade">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
		<!-- <under-construction-bar /> -->
		<navigation />
		<!-- <footer-container /> -->
		<login-container />
		<overlay-container />
		<dialog-container />
		<notification-container />
	</v-app>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation'
import OverlayContainer from '@/components/Containers/Overlay_Container'
import DialogContainer from '@/components/Containers/Dialog_Container'
import NotificationContainer from '@/components/Containers/Notification_Container'
import LoginContainer from '@/components/Login/Login.vue'
// import UnderContructionBar from '@/components/_global/Under_Construction_Bar'
// import Footer from '@/components/Footer/Footer'

export default {
	name: 'app',

	components: {
		'navigation': Navigation,
		'overlay-container': OverlayContainer,
		'dialog-container': DialogContainer,
		'notification-container': NotificationContainer,
		'login-container': LoginContainer
		// 'under-construction-bar': UnderContructionBar,
		// 'footer-container': Footer,
	},

	created () {
    if (this.$workbox) {
		this.$workbox.addEventListener('waiting', () => {
			this.showUpgradeUI = true
		})
    }
  },

  methods: {
    async accept () {
      this.showUpgradeUI = false
      await this.$workbox.messageSW({ type: 'SKIP_WAITING' })
    }
  }
}
</script>

<style lang="scss">
	@import '@/styles/index.scss';
</style>
