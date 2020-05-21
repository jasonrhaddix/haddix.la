<template>
	<div class="photo-viewer">
		<img :src="getImage"/>
	</div>
</template>

<script>
export default {
	name: 'photo-viewer',

	props: {
		images: {
			type: [Object, Array],
			required: false,
			default: null
		},

		startImageId: {
			type: String,
			required: false,
			default: null
		}
	},

	data: () => ({
		currentImageId: null
	}),

	computed: {
		getImage () {
			if (this.images.hasOwnProperty('uri')) return this.images.uri

			let index = this.images.findIndex(i => i.attachment_id === this.startImageId)
			return this.images[index].uri
		}
	},

	mounted () {
		this.currentImageId = this.startImageId ? this.startImageId : null
	}
}
</script>

<style lang="scss">
	.photo-viewer {
		display: flex;
	}
</style>
