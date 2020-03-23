<template>
	<div class="photo-viewer">
		<img
			v-if="currentImageId"
			:src="getImage.uri"/>
	</div>
</template>

<script>
export default {
	name: 'photo-viewer',

	props: {
		images: {
			type: Array,
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
			let index = this.images.findIndex(i => i.attachment_id === this.startImageId)
			return this.images[index]
		}
	},

	mounted () {
		this.currentImageId = this.startImageId ? this.startImageId : null
	}
}
</script>

<style lang="scss">
	/* .photo-viewer {
		background: {
			color: white;
		}
	} */
</style>
