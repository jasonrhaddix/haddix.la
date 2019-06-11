<template>
    <div class="form--project-create">
        
        <div class="form-section create__form">
            <div class="project__pending-id">
                <p>{{ model.project_id }}</p>
            </div>

            <v-text-field 
                box
                label="Title"/>
            <v-text-field
                box
                label="Client"/>
            <v-text-field 
                box
                label="Subtitle"/>
            <v-textarea 
                box
                label="Description"/>
            <v-text-field 
                box
                label="Project Link"/>
        </div>


        <div class="form-section create__images">
            <h2>Images</h2>
            

            <div class="images__divider" />

            <div class="images-section images__thumbnails">
                <div class="section__title">
                    <h3>Thumbnail Image</h3>
                    <p>Projects page image. Only one image can be selected.</p>
                </div>
                <div class="images__container">
                    <attachment-uploader
                        ref="attachmentUploader_Thumbnail"
                        :attach-to="getAttachTo"
                        :file-usage-type="$store.state.constants.HADDIX_ATTACHMENT_USAGE_TYPE__THUMBNAIL"/>
                    <div class="images__list">
                        <attachment-item 
                            v-if="fileAttachments.length > 0"
                            v-for="file in fileAttachments($store.state.constants.HADDIX_ATTACHMENT_USAGE_TYPE__THUMBNAIL, true)"
                            :key="$uuid.v4()"
                            :data="file"/>
                        <div :class="['images__dropzone', {'drag-over':fileDragOver}]">
                            <div 
                                v-ripple
                                class="dropzone__button"
                                @dragover.prevent
                                @dragenter.prevent.stop="uploadDragOver(true)"
                                @dragleave.prevent.stop="uploadDragOver(false)"
                                @drop.prevent.stop="dropFiles"
                                @click="$refs.attachmentUploader_Thumbnail.select()">
                                <div class="button__content">
                                    <p class="subheading">Upload Images</p>
                                    <v-icon color="grey darken-1">add</v-icon>
                                </div>
                            </div>
                            <div class="dropzone__scrim" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="images__divider" /> -->

            <div class="images-section images__carousel">
                <div class="section__title">
                    <h3>Carousel Images</h3>
                    <p>Project page carousel images.</p>
                </div>
                <div class="images__container">
                    <attachment-uploader
                        ref="attachmentUploader_Carousel"
                        :attach-to="getAttachTo"
                        :file-usage-type="$store.state.constants.HADDIX_ATTACHMENT_USAGE_TYPE__CAROUSEL"/>
                    <div class="images__list">
                        <attachment-item 
                            v-if="fileAttachments.length > 0"
                            v-for="file in fileAttachments($store.state.constants.HADDIX_ATTACHMENT_USAGE_TYPE__CAROUSEL)"
                            :key="$uuid.v4()"
                            :data="file"/>
                    </div>
                    <div :class="['images__dropzone', {'drag-over':fileDragOver}]">
                        <div 
                            v-ripple
                            class="dropzone__button"
                            @dragover.prevent
                            @dragenter.prevent.stop="uploadDragOver(true)"
                            @dragleave.prevent.stop="uploadDragOver(false)"
                            @drop.prevent.stop="dropFiles"
                            @click="$refs.attachmentUploader_Carousel.select()">
                            <div class="button__content">
                                <p class="subheading">Upload Images</p>
                                <v-icon color="grey darken-1">add</v-icon>
                            </div>
                        </div>
                        <div class="dropzone__scrim" />
                    </div>
                </div>
            </div>

            <!-- <div class="images__divider" /> -->
            
            <div class="images-section images__body">
                <div class="section__title">
                    <h3>Body Images</h3>
                    <p>Project page body images.</p>
                </div>

                <div class="images__container">
                    <attachment-uploader
                        ref="attachmentUploader_Body"
                        :attach-to="getAttachTo"
                        :file-usage-type="$store.state.constants.HADDIX_ATTACHMENT_USAGE_TYPE__BODY"/>
                    <div class="images__list">
                        <!-- <attachment-item 
                            v-if="fileAttachments.length > 0"
                            v-for="file in fileAttachments($store.state.constants.HADDIX_ATTACHMENT_USAGE_TYPE__BODY)"
                            :key="$uuid.v4()"
                            :data="file"/> -->
                    </div>
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
                                <p class="subheading">Upload Images</p>
                                <v-icon color="grey darken-1">add</v-icon>
                            </div>
                        </div>
                        <div class="dropzone__scrim" />
                    </div>
                </div>
            </div>
        </div>

        <div class="form-section create__images">
            <h2>Videos</h2>

            <div class="images__divider" />

            <div class="images-section images__thumbnails">
                <div class="section__title">
                    <h3>Body Videos</h3>
                    <p>Projects page image. Only one image can be selected.</p>
                </div>
                <div class="images__container">
                    <attachment-uploader
                        ref="attachmentUploader_Video"
                        :attach-to="getAttachTo"
                        :file-usage-type="$store.state.constants.HADDIX_ATTACHMENT_USAGE_TYPE__VIDEO"/>
                    <div class="images__list">
                        <!-- <attachment-item 
                            v-if="fileAttachments.length > 0"
                            v-for="file in fileAttachments($store.state.constants.HADDIX_ATTACHMENT_USAGE_TYPE__VIDEO)"
                            :key="$uuid.v4()"
                            :data="file"/> -->
                    </div>
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
                                <p class="subheading">Upload Images</p>
                                <v-icon color="grey darken-1">add</v-icon>
                            </div>
                        </div>
                        <div class="dropzone__scrim" />
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-section project__save-btn">
            <app-btn 
                label="Save Project"
                @click.native="submitForm"/>
        </div>

    </div>
</template>


<script>
    import { mapGetters, mapActions } from 'vuex'

    import {
        VUEX_PROJECT_CREATE
    } from '@/store/constants/projects'
    
    import AttachmentUploader from '@/components/_global/Attachment_Uploader'
    import AttachmentItem from '@/components/Forms/CreateProject/Attachment_Item'
    import AppButton from '@/components/_global/App_Button'

    export default {
        name: 'project-create-form',

        components: {
            'attachment-uploader' : AttachmentUploader,
            'app-btn'             : AppButton,
            'attachment-item'     : AttachmentItem
        },

        data:() => ({
            model: {
                project_id: null,
                title: "",
                client: "TEST",
                role: "ROLE",
                project_date: "03-27-1981 00:00:00",
                description: "TEST",
                article: "123",
                link: "http://google.com"
            },

            fileDragOver: false
        }),

        computed: {
            ...mapGetters({
                getQueuedFiles:     'getQueuedFiles',
				getUploadingFiles:  'getUploadingFiles',
				getProcessingFiles: 'getProcessingFiles',
				getCompletedFiles:  'getCompletedFiles'
            }),

            fileAttachments() {

                return((usageType, singleReturn ) => {
                    
                    let files = new Array()
                    
                    let paramsWithId = { attach_to:
                        { model_id: this.model.project_id, model: HADDIX_ATTACHMENT_MODEL__PROJECT } 
                    }
    
                    files = files
                        .concat(this.getCompletedFiles(paramsWithId))
                        .concat(this.getUploadingFiles(paramsWithId))
                        .concat(this.getProcessingFiles(paramsWithId))
                        .concat(this.getQueuedFiles(paramsWithId))
                    
                    // Then sort all of the files by the time they were added to the queue
                    // so things don't jump around in the uploader
                    files.sort(function(a, b) {
                        return a.addedToQueue - b.addedToQueue
                    })

                    let filteredFiles = files.filter(file => file.usage_type === usageType)

                    if (filteredFiles.length == 0) return []
                    return singleReturn ? new Array(filteredFiles[filteredFiles.length-1]) : filteredFiles
                })
			},

            getAttachTo() {
                return {
                    model: HADDIX_ATTACHMENT_MODEL__PROJECT,
                    model_id: this.model.project_id,
                }
			}
        },

        mounted() {
            this.model.project_id = this.$uuid.v4()
        },
        
        methods: {
            ...mapActions({
                createProject: VUEX_PROJECT_CREATE
            }),

            uploadDragOver(value) {
                this.fileDragOver = value
            },

            dropFiles(event) {
                this.fileDragOver = false
                this.$refs.attachmentUploader.loadFiles(event.dataTransfer.files)
            },

            submitForm() {
                this.createProject(this.model)
            }
        }
    }
</script>