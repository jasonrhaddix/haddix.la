<template>
	<div class="form--role-create--item">
		<div class="inner">
			<v-row>
				<div class="col-12">
					<div class="section__title">
						<h3>Project Title</h3>
						<!-- <p>Only 1 video allowed</p> -->
					</div>
					<v-btn
						fab icon x-small
						class="remove-btn"
						@click="removeCallback(id)">
						<v-icon>remove</v-icon>
					</v-btn>
					<div class="title__container">
						<v-text-field
							filled hide-details
							v-model="model.title"/>
					</div>
				</div>
			</v-row>
			<v-row>
				<div class="col-12">
					<div class="section__title">
						<h3>Project Summary</h3>
						<!-- <p>Only 1 video allowed</p> -->
					</div>
					<div class="summary__container">
						<v-textarea
							filled hide-details
							v-model="model.summary"/>
					</div>
				</div>
			</v-row>
			<v-row>
				<v-col class="col-12 col-md-8">
					<div class="images-section images__thumbnails">
						<div class="section__title">
							<h3>Project Images</h3>
							<!-- <p>Projects page thumbnail.</p> -->
						</div>
						<div class="images__container">
							<attachment-uploader
								ref="attachmentUploader_Body"
								:attach-to="getAttachTo"
								:file-usage-type="$store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__BODY_ROLE"/>
							<div :class="['images__dropzone', {'drag-over':fileDragOver}]">
								<div
									v-ripple
									class="dropzone__button"
									@dragover.prevent
									@dragenter.prevent.stop="uploadDragOver(true)"
									@dragleave.prevent.stop="uploadDragOver(false)"
									@drop.prevent.stop="dropFiles"
									@click="$refs.attachmentUploader_Body.select()">
									<div class="button__content">
										<p class="subheading">Upload Image</p>
										<v-icon color="grey darken-1">add</v-icon>
									</div>
								</div>
								<div class="dropzone__scrim" />
							</div>
							<div
								v-if="fileAttachments.length > 0"
								class="images__list">
								<attachment-item
									v-for="(file,i) in fileAttachments($store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__BODY_ROLE)"
									:key="`attachment-item--thumbnail-${i}}`"
									:data="file"/>
							</div>
						</div>
					</div>
				</v-col>
				<v-col class="col-12 col-md-4">
					<div class="images-section videos__thumbnails">
						<div class="section__title">
							<h3>Project Video</h3>
							<!-- <p>Only 1 video allowed</p> -->
						</div>
						<div class="images__container">
							<attachment-uploader
								ref="attachmentUploader_Video"
								:attach-to="getAttachTo"
								:file-usage-type="$store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__VIDEO_ROLE"/>
							<div :class="['images__dropzone', {'drag-over':fileDragOver}]">
								<div
									v-ripple
									class="dropzone__button"
									@dragover.prevent
									@dragenter.prevent.stop="uploadDragOver(true)"
									@dragleave.prevent.stop="uploadDragOver(false)"
									@drop.prevent.stop="dropFiles"
									@click="$refs.attachmentUploader_Video.select()">
									<div class="button__content">
										<p class="subheading">Upload Video</p>
										<v-icon color="grey darken-1">add</v-icon>
									</div>
								</div>
								<div class="dropzone__scrim" />
							</div>
							<div
								v-if="fileAttachments.length > 0"
								class="images__list">
								<attachment-item
									v-for="(file,i) in fileAttachments($store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__VIDEO_ROLE)"
									:key="`attachment-item--thumbnail-${i}}`"
									:data="file"/>
							</div>
						</div>
					</div>
				</v-col>
			</v-row>
		</div>
		<div class="divider" />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	import AttachmentUploader from '@/components/_global/Attachment_Uploader'
	import CreateAttachmentItem from '@/components/Forms/CreateProject/Project/Project_Create__Attachment_Item'

	export default {

		components: {
			'attachment-uploader': AttachmentUploader,
			'attachment-item': CreateAttachmentItem
		},

		props: {
			id: {
				type: Number,
				required: true,
				default: null
			},

			roleId: {
				type: String,
				required: true,
				default: null
			},

			removeCallback: {
				type: Function,
				required: true,
				default: null
			}
		},

		data: () => ({
			blah: [],
			model: {
				project_id: null,
				title: '',
				summary: '',
				attachments: []
			},

			fileDragOver: false
		}),

		computed: {
			...mapGetters({
				appAuthenticated: 'appAuthenticated',
				getQueuedFiles: 'getQueuedFiles',
				getUploadingFiles: 'getUploadingFiles',
				getProcessingFiles: 'getProcessingFiles',
				getCompletedFiles: 'getCompletedFiles'
			}),

			fileAttachments () {
				return (usageType, singleReturn) => {
					let files = []

					let paramsWithId = {
						attach_to: {
							model_id: this.roleId,
							project_id: this.model.project_id,
							model: HADDIX_ATTACHMENT_TYPE__NEW_ROLE
						}
					}

					files = files
						.concat(this.getCompletedFiles(paramsWithId))
						.concat(this.getUploadingFiles(paramsWithId))
						.concat(this.getProcessingFiles(paramsWithId))
						.concat(this.getQueuedFiles(paramsWithId))

					files.sort(function (a, b) {
						return a.addedToQueue - b.addedToQueue
					})

					let filteredFiles = files.filter(file => file.usage_type === usageType)
					if (filteredFiles.length === 0) return []

					let data = singleReturn ? new Array(filteredFiles[filteredFiles.length - 1]) : filteredFiles

					// Add File to local attachments
					this.addToAttachments(data)

					return data
				}
			},

			getAttachTo () {
				return {
					model_id: this.roleId,
					project_id: this.model.project_id,
					model: HADDIX_ATTACHMENT_TYPE__NEW_ROLE
				}
			}
		},

		mounted () {
			this.model.project_id = this.$uuid.v4()
		},

		methods: {
			addToAttachments (files) {
				files.forEach(projectFile => {
					let idx = this.model.attachments.findIndex(item => item.file_id === projectFile.file_id)
					if (idx === -1) {
						// eslint-disable-next-line camelcase
						const { key, uri, file_id, filename, attach_to, project_id, usage_type } = projectFile

						this.model.attachments.push({
							key,
							uri,
							file_id,
							filename,
							attach_to,
							project_id,
							usage_type
						})
					}
				})
			},

			uploadDragOver (value) {
				this.fileDragOver = value
			},

			dropFiles (event) {
				console.error('Drag and Drop not setup |', event)
				// this.fileDragOver = false
				// this.$refs.attachmentUploader.loadFiles(event.dataTransfer.files)
			}
		}
	}
</script>
