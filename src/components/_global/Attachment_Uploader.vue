<template>
    <div class="attahment-uploader">
        <div>
            <video
                ref="videoControl"
                type="video/mp4"
                :style="{width: 'auto', display:'none'}"></video>
            <canvas
                ref="videoControlCanvas"
                :style="{width: 'auto', display:'none'}"></canvas>
            <v-img :src="base64" alt=""></v-img>
        </div>
        <input
            hidden
			ref="fileControl"
			class="attachment-uploader__input"
			:multiple="multiple"
			:accept="acceptedFileTypes"
			type="file"
			name="file"
			@change="handleSelectedFiles">
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import {
	VUEX_ATTACHMENT_QUEUE_MANAGER_ADD_FILES
} from '@/store/constants/attachments/attachment_queue_manager'

export default {
	name: 'attachment-uploader',

	props: {
		attachTo: {
			type: [Object, Array],
			required: true,
			default: () => ({})
		},
		fileUsageType: {
			type: String,
			required: true,
			default: null
		},
		setProps: {
			type: Object,
			required: false,
			default: null
		},
		multiple: {
			type: Boolean,
			required: false,
			default: false
		},
		acceptedFileTypes: {
			type: [Array, String],
			required: false,
			default: '*'
		},
		dispatchOnItemsSelected: {
			type: [Function, Promise],
			required: false,
			default: null
		}
	},

	data: () => ({
		files: [],
		processedFiles: [],

		previewsPending: [],
		previewLoadTicker: null,

		base64: ''
	}),

	methods: {
		...mapActions({
			addFilesToAQM: VUEX_ATTACHMENT_QUEUE_MANAGER_ADD_FILES
		}),

		select () {
			this.$refs.fileControl.click()
		},

		loadFiles (files) {
			this.handleSelectedFiles(files)
		},

		handleSelectedFiles (event) {
			let self = this

			// 1) Freshly read the files array in each change
			// there is a bug where sometimes fileControl appears as undefined
			// so grab files from the path
			if (this.$refs.fileControl !== undefined) {
				this.files = this.$refs.fileControl.files
			} else {
				if (event.path && event.path[0].files) {
					this.files = event.path[0].files
				}
			}

			// 2) Abort if no files are selected
			if (!this.files.length) return

			// 3) Loop through files
			Array.prototype.forEach.call(this.files, (file, index) => {
				let	data = {
					project_id: this.attachTo.model_id,
					file_id: this.$uuid.v4(),
					file: file,
					filename: file.name.replace(/\s/g, '_'),
					usage_type: this.fileUsageType,
					usage_sub_type: null,
					progress: {},
					status: HADDIX_UPLOAD_ATTACHMENT_STATUS__PENDING,
					upload_status: HADDIX_UPLOAD_S3_UPLOAD_STATUS__PENDING,
					attach_to: this.attachTo
				}

				// Assign props from incoming 'setProps Obj'
				if (this.setProps) Object.assign(data, this.setProps)

				if (file.type == 'video/mp4') {
					let video = this.$refs.videoControl
					let canvas = this.$refs.videoControlCanvas

					video.src = URL.createObjectURL(file)
					video.currentTime = 15

					let ctx = canvas.getContext('2d')

					video.onloadedmetadata = function () {
						ctx.canvas.width = video.videoWidth
						ctx.canvas.height = video.videoHeight

						setTimeout(() => {
							ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

							let base64Img = canvas.toDataURL('image/jpeg')
							Object.assign(data, { preview: base64Img })

							self.addFilesToAQM([data])
						}, 1000)
					}
				} else {
					// FILES LESS THAT 20MB get preview
					if (file.size < 20 * 1024 * 1024) {
						var fr = new FileReader()
						fr.onload = function () {
							Object.assign(data, { preview: fr.result })
							self.processedFiles.push(data)
						}

						fr.readAsDataURL(file)
						self.previewsPending.push(fr)
					} else {
						Object.assign(data, { preview: null })
						self.processedFiles.push(data)

						self.previewsPending.push(null)
					}
				}

				this.previewLoadTicker = setInterval(this.checkPreviewsReadyState, 100)
			})
		},

		checkPreviewsReadyState () {
			let isPending = this.previewsPending.filter(item => {
				if (!item) return
				return item['readyState'] != 2 // is finished
			})

			if (isPending.length == 0) {
				clearInterval(this.previewLoadTicker)

				this.addFilesToAQM(this.processedFiles)

				if (this.dispatchOnItemsSelected) { this.dispatchOnItemsSelected(this.processedFiles) }

				// there is a bug where sometimes fileControl appears as undefined
				if (this.$refs.fileControl !== undefined) {
					this.$refs.fileControl.value = null
				}
				this.processedFiles = []
			}
		}
	}
}
</script>
