<template>
	<div class="video-viewer">
		<video
			autoplay
			controls
			loop
			:src="getVideo"></video>
	</div>
</template>

<script>
export default {
	name: 'video-viewer',

	props: {
		videos: {
			type: [Object, Array],
			required: false,
			default: null
		}
	},

	computed: {
		getVideo () {
			return this.videos.uri

			/* let index = this.videos.findIndex(i => i.attachment_id === this.startImageId)
			return this.video[index].uri */
		}
	}
}
</script>

<style lang="scss">
	.video-viewer {
		display: flex;

		video {
			height: 100%;
			width: 100%;
		}
	}
</style>
