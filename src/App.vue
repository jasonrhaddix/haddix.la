<template>
	<div id="app">
		<transition 
			name="fade"
			mode="out-in">
			<router-view></router-view>
		</transition>
		<navigation />
	</div>
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
	@import '@/styles/index.scss';
</style>
