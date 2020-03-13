<template>
    <div class="create-attachment-item">
        <div class="item__inner">
            <div class="item__image">
                <video
                    v-if="data.file.type == 'video/mp4' || data.file.type == 'video/quicktime'"
                    autoplay loop
                    controls muted
                    :src="compileVideoSrc"></video>

                <img v-else :src="data.preview" />
            </div>
            <div :class="['item__progress', `upload_${data.upload_status}`]">
                <div
                    v-if="data.status == $store.state.config.HADDIX_UPLOAD_ATTACHMENT_STATUS__STARTED"
                    class="progress">
                    <div class="progress__ind-background"/>
                    <div class="progress__ind" :style="fileProgress"/>
                    <div class="progress__percentage">
                        <p>{{fileProgressPercent}}</p>
                    </div>
                </div>

                <div
                    v-else-if="$store.state.config.HADDIX_UPLOAD_ATTACHMENT_STATUS__SUCCESS"
                    class="status">
                    <div><v-icon color="success">check_circle_outline</v-icon></div>
                </div>

                <div
                    v-else-if="$store.state.config.HADDIX_UPLOAD_ATTACHMENT_STATUS__FAILURE"
                    class="status">
                    <div><v-icon color="error">highlight_off</v-icon></div>
                </div>
            </div>
           <!--  <div class="item__actions">
                Remove
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
	name: 'create-attachment-item',

	props: {
		data: {
			type: Object,
			required: true
		}
	},

	computed: {
		fileProgressPercent () {
			let total = this.data.progress.total
			let loaded = this.data.progress.loaded
			return (total) ? Math.round(loaded / total * 100) + '%' : '0%'
			// return (total) ? (loaded/total * 100).toFixed(1) + "%" : "0.0%"
		},

		fileProgress () {
			let total = this.data.progress.total
			let loaded = this.data.progress.loaded

			if (!total) return 0
			return { transform: 'scaleX(' + loaded / total + ')' }
		},

		compileVideoSrc () {
			return URL.createObjectURL(this.data.file)
		}
	}
}
</script>
