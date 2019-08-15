<template>
    <div class="labs-view">
		<div class="labs__header">
			<div class="header__content">
				<particle-text text="HADDIX"/>
				<p>Experiments for Jason R. Haddix</p>
				<div class="divider"/>
				<div class="coming-soon"><h3>--> {{getMessage}} <--</h3></div>
			</div>
			<div
				v-if="false"
				:class="['header__scroll', {'visible':scrollIndVisible}]">
				<p>SCROLL</p>
				<v-icon>keyboard_arrow_down</v-icon>
			</div>
		</div>

		<!-- <div>
			<p v-for="item in 35">EXPERIMENTS</p>
		</div> -->
    </div>
</template>

<script>
	import ParticleText from '@/components/_global/Particle_Text.vue'

	export default {
		name: 'labs-view',

		components: {
			'particle-text' : ParticleText
		},

		data:() => ({
			scrollListener: null,
			scrollIndVisible: true,
			comingSoonMessages: [
				"Nope...Not Yet",
				"Coming Soon-ish",
				"Workin' On It"
			]
		}),

		computed: {
			getMessage() {
				return this.comingSoonMessages[Math.round(Math.random()*this.comingSoonMessages.length-1)]
			}
		},

		mounted() {
			window.addEventListener('scroll', this.checkScroll)
		},

		beforeDestroy() {
			window.removeEventListener('scroll', this.checkScroll)
		},

		methods: {
			checkScroll(e) {
				let scrollPos = e.target.scrollingElement.scrollTop
				if (scrollPos > 100) {
					this.scrollIndVisible = false
					window.removeEventListener('scroll', this.checkScroll)
				}
			}
		}
	}
</script>
