<template>
    <v-flex xs12>
    <div class="form--project-create">
        
        <div class="form-section create__form">
            <v-layout row wrap>
                <v-flex xs4>
                    <v-select
                        box dense
                        label="Project Type"
                        item-text="name"
                        :items="projectTypes"
                        v-model="model.type"/>
                </v-flex>
                <v-flex xs4 offset-xs4>
                    <div class="project__pending-id">
                        <p>{{ model.project_id }}</p>
                    </div>        
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12>
                    <v-text-field 
                        box
                        label="Title"
                        v-model="model.title"/>

                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs4>
                    <v-select
                        box dense
                        label="Client"
                        item-text="name"
                        :items="clients"
                        v-model="model.client"/>
                </v-flex>
                <v-flex xs4>
                    <v-select
                        box dense
                        label="Role"
                        item-text="name"
                        :items="projectRoles"
                        v-model="model.role"/>
                </v-flex>
                <v-flex xs4>
                    <v-menu
                        ref="projectDateMenu"
                        v-model="projectDateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value="formattedDate"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px">
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            box
                            readonly
                            v-on="on"
                            append-icon="event"
                            label="Project Date"
                            v-model="formattedDateDisplay">
                        </v-text-field>
                        </template>
                        <v-date-picker v-model="formattedDate" type="month" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="projectDateMenu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.projectDateMenu.save(formattedDate)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12>
                    <v-text-field 
                        box
                        label="Subtitle"
                        v-model="model.subtitle"/>
                </v-flex>
            </v-layout>
            
            <v-layout row wrap>
                <v-flex xs12>
                    <v-textarea 
                        box
                        label="Description"
                        v-model="model.description"/>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex>
                    <v-text-field 
                        box
                        label="Project Link"
                        v-model="model.link"/>
                </v-flex>
            </v-layout>
        </div>


        <div class="form-section create__images">
            <h2>Images</h2>
            
            <div class="inner__divider" />

            <v-layout row wrap>
                <v-flex xs4 align-content-center>
                    <div class="images-section images__thumbnails">
                        <div class="section__title">
                            <h3>Thumbnail Image</h3>
                            <p>Projects page image.</p>
                        </div>
                        <div class="images__container">
                            <attachment-uploader
                                ref="attachmentUploader_Thumbnail"
                                :attach-to="getAttachTo"
                                :file-usage-type="$store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__THUMBNAIL"/>
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
                            <div class="images__list">
                                <attachment-item 
                                    v-if="fileAttachments.length > 0"
                                    v-for="(file,i) in fileAttachments($store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__THUMBNAIL, true)"
                                    :key="`attachment-item--thumbnail-${$uuid.v4()}`"
                                    :data="file"/>
                            </div>
                        </div>
                    </div>
                </v-flex>

                <!-- <div class="inner__divider" /> -->

                <v-flex xs4 align-content-center>
                    <div class="images-section images__carousel">
                        <div class="section__title">
                            <h3>Carousel Images</h3>
                            <p>Project page carousel images.</p>
                        </div>
                        <div class="images__container">
                            <attachment-uploader
                                ref="attachmentUploader_Carousel"
                                :attach-to="getAttachTo"
                                :file-usage-type="$store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__CAROUSEL"/>
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
                            <div class="images__list">
                                <attachment-item 
                                    v-if="fileAttachments.length > 0"
                                    v-for="(file,i) in fileAttachments($store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__CAROUSEL)"
                                    :key="`attachment-item--carousel-${$uuid.v4()}`"
                                    :data="file"/>
                            </div>
                        </div>
                    </div>
                </v-flex>

            <!-- <div class="inner__divider" /> -->

                <v-flex xs4 >
                    <div class="images-section images__body">
                        <div class="section__title">
                            <h3>Body Images</h3>
                            <p>Project page body images.</p>
                        </div>

                        <div class="images__container">
                            <attachment-uploader
                                ref="attachmentUploader_Body"
                                :attach-to="getAttachTo"
                                :file-usage-type="$store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__BODY"/>
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
                            <div class="images__list">
                                <attachment-item 
                                    v-if="fileAttachments.length > 0"
                                    v-for="(file,i) in fileAttachments($store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__BODY)"
                                    :key="`attachment-item--body-${$uuid.v4()}`"
                                    :data="file"/>
                            </div>
                        </div>
                    </div>
                </v-flex>
            </v-layout>
        </div>

        <div class="form-section create__images">
            <h2>Videos</h2>

            <div class="inner__divider" />

            <div class="images-section images__thumbnails">
                <div class="section__title">
                    <h3>Body Videos</h3>
                    <p>Projects page image.</p>
                </div>
                <div class="images__container">
                    <attachment-uploader
                        ref="attachmentUploader_Video"
                        :attach-to="getAttachTo"
                        :file-usage-type="$store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__VIDEO"/>
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
                    <div class="images__list">
                        <attachment-item 
                            v-if="fileAttachments.length > 0"
                            v-for="(file, i) in fileAttachments($store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__VIDEO)"
                            :key="`attachment-item--video-${$uuid.v4()}`"
                            :data="file"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-section create__meta">
            <h2>Meta</h2>

            <div class="inner__divider" />

            <div class="meta-section project__resources">
                <div class="section__title">
                    <h3>Project Languages</h3>
                    <p>Projects page image.</p>
                </div>
                <div class="resources__container">
                    <div 
                        v-ripple
                        class="resource__add-button"
                        @click="addResource">
                        <div class="button__content">
                            <p class="subheading">Add Resource</p>
                            <v-icon color="grey darken-1">add</v-icon>
                        </div>
                    </div>
                    <div class="resource__list">
                        <resource-item
                            v-for="(item,i) in model.resources"
                            :key="`resource-item-${item.id})`"
                            :id="item.id"
                            :value-callback="updateResource"
                            :resource-callback="updateResource"
                            :remove-callback="removeResource"/>
                    </div>
                </div>
            </div>

            <div class="meta-section project__file-tree">
                <div class="section__title">
                    <h3>File Structure</h3>
                    <p></p>
                </div>
                <div class="tree__input">
                    <input 
                        ref="fileStructureControl"
                        class="file-structure-uploader__input"
                        accept="application/json"
                        type="file"
                        name="file"
                        @change="handleSelectedFileStructFiles"/>
                </div>
                <div class="tree__container">
                    <v-treeview
                        :items="projectTree.tree_data"
                        :open.sync="openFolders">
                        <template v-slot:prepend="{ item }">
                        <v-icon
                            v-if="item.children"
                            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
                        ></v-icon>
                        </template>
                    </v-treeview>
                </div>
            </div>

            <!-- <div class="meta-section project__code-sample">
                <div class="section__title">
                    <h3>Code Sample</h3>
                    <p>Projects page image.</p>
                </div>
                <div class="code-sample__container">
                     <codemirror v-model="model.code" :options="cmOptions"></codemirror>
                </div>
            </div> -->
        </div>
        
        <div class="form-section project__save-btn">
            <v-progress-circular
                v-if="projectSaving"
                indeterminate
                class="progress__ind" 
                color="primary"
                width="8"
                size="38"/>
            <app-btn 
                label="Save Project"
                :disabled="projectSaving"
                @click.native="submitForm"/>
        </div>

    </div>
    </v-flex>   
</template>


<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    import {
        VUEX_PROJECT_CREATE
    } from '@/store/constants/projects'
    import {
        VUEX_PROJECT_TREE_CREATE_REQUEST
    } from  '@/store/constants/projects/project_tree'

    import AttachmentUploader from '@/components/_global/Attachment_Uploader'
    import CreateAttachmentItem from '@/components/Forms/CreateProject/Project_Create__Attachment_Item'
    import CreateResourceItem from '@/components/Forms/CreateProject/Project_Create__Resource_Item'
    import AppButton from '@/components/_global/App_Button'


    export default {
        name: 'project-create-form',

        components: {
            'attachment-uploader' : AttachmentUploader,
            'app-btn'             : AppButton,
            'attachment-item'     : CreateAttachmentItem,
            'resource-item'       : CreateResourceItem
        },

        data:() => ({
            model: {
                project_id   : null,
                type         : null,
                title        : null,
                client       : null,
                role         : null,
                project_date : null,
                subtitle     : null,
                description  : null,
                link         : null,
                resources    : []
            },

            openFolders: [1],

            projectDateMenu  : false,
            fileDragOver     : false,

            /* cmOptions: {
                tabSize      : 4,
                mode         : 'text/javascript',
                theme        : 'base16-dark',
                lineNumbers  : true,
                line         : true
            } */
        }),

        computed: {
            ...mapState({
                projectSaving : state => state.projects.projectSaving,

                projectTypes  : state => state.config.projectTypes,
                projectRoles  : state => state.config.projectRoles,
                clients       : state => state.config.clients,

                projectTree   : state => state.project_tree.projectTree
            }),

            ...mapGetters({
                getQueuedFiles:     'getQueuedFiles',
				getUploadingFiles:  'getUploadingFiles',
				getProcessingFiles: 'getProcessingFiles',
				getCompletedFiles:  'getCompletedFiles'
            }),

            fileAttachments() {

                return((usageType, singleReturn ) => {
                    let files = new Array()
                    
                    let paramsWithId = { 
                        attach_to: { 
                            model_id: this.model.project_id,
                            model: HADDIX_PROJECT_TYPE__WORK
                        } 
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
                    model: HADDIX_PROJECT_TYPE__WORK,
                    model_id: this.model.project_id,
                }
            },
            
            formattedDate: {
                get() { 
                    if (!this.model.project_date) return

                    let [month, day, year] = this.model.project_date.split(' ')[0].split('-')
                    return `${year}-${month}`
                },
                set(val) { 
                    let [year, month] = val.split('-')
                    this.model.project_date = `${month}-01-${year} 00:00:00`
                }
            },

            formattedDateDisplay() {
                if (!this.model.project_date) return
                return `${this.formattedDate.split('-').reverse().join('/')}`
            }
        },

        mounted() {
            this.model.project_id = this.$uuid.v4()
        },
        
        methods: {
            ...mapActions({
                createProject: VUEX_PROJECT_CREATE,
                createProjectTree : VUEX_PROJECT_TREE_CREATE_REQUEST
            }),

            uploadDragOver(value) {
                this.fileDragOver = value
            },

            dropFiles(event) {
                this.fileDragOver = false
                this.$refs.attachmentUploader.loadFiles(event.dataTransfer.files)
            },

            addResource() {
                this.model.resources.push({
                    id: this.$uuid.v4(),
                    value: 0,
                    resource: ''
                })
            },

            updateResource(data) {
                let index = this.model.resources.findIndex(x => x.id === data.id)
                if (index > -1) {
                    Object.assign(this.model.resources[index], data)
                }

            },

            removeResource(id) {
                let index = this.model.resources.findIndex(x => x.id === id)
                if (index > -1) {
                    this.model.resources.splice(index, 1)
                }
                
            },

            handleSelectedFileStructFiles(event) {
                let file = this.$refs.fileStructureControl.files[0]

                let reader = new FileReader()
                reader.onload = this.onReaderLoad
                reader.readAsText(file)
            },

            onReaderLoad(event){
                var json_tree = JSON.parse(event.target.result);
                this.createProjectTree(
                    {
                        project_id : this.model.project_id,
                        tree_data  : json_tree
                    }
                )
            },

            submitForm() {
                this.createProject(this.model)
            }
        },
        watch: {
            model: {
                deep: true,
                handler(val) {
                    // console.log(val)
                } 
            }
        }
    }
</script>