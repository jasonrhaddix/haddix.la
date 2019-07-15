<template>
    <v-flex xs12>
    <div class="form--project-create">
        <div class="form-section create__form">
            <v-layout row wrap>
                <v-flex xs4>
                    <v-select
                        filled dense
                        label="Project Type"
                        item-text="name"
                        :error="$v.model.type.$invalid && submitted"
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
                        filled
                        label="Title"
                        :error="$v.model.title.$invalid && submitted"
                        v-model="model.title"/>

                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs4>
                    <v-select
                        filled dense
                        label="Client"
                        item-text="name"
                        :items="clients"
                        :error="$v.model.client.$invalid && submitted"
                        v-model="model.client"/>
                </v-flex>
                <v-flex xs4>
                    <v-select
                        filled dense
                        label="Role"
                        item-text="name"
                        :items="projectRoles"
                        :error="$v.model.role.$invalid && submitted"
                        v-model="model.role"/>
                </v-flex>
                <v-flex xs4>
                    <v-menu
                        ref="projectDateMenu"
                        v-model="projectDateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value="formattedDate"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px">
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            filled
                            readonly
                            v-on="on"
                            append-icon="event"
                            label="Project Date"
                            :error="$v.model.project_date.$invalid && submitted"
                            v-model="formattedDateDisplay">
                        </v-text-field>
                        </template>
                        <v-date-picker v-model="formattedDate" type="month" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="projectDateMenu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.projectDateMenu.save(formattedDate)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12>
                    <v-text-field 
                        filled
                        label="Subtitle"
                        :error="$v.model.subtitle.$invalid && submitted"
                        v-model="model.subtitle"/>
                </v-flex>
            </v-layout>
            
            <v-layout row wrap>
                <v-flex xs12>
                    <v-textarea 
                        filled
                        label="Description"
                        :error="$v.model.description.$invalid && submitted"
                        v-model="model.description"/>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex>
                    <v-text-field 
                        filled
                        label="Project Link"
                        hint="Requires link format (Example: http://www.my-link.com)"
                        :error="$v.model.link.$invalid && submitted"
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
                            <p>Projects page thumbnail.</p>
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
                            <div
                                v-if="fileAttachments.length > 0" 
                                class="images__list">
                                <attachment-item 
                                    v-for="(file,i) in fileAttachments($store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__THUMBNAIL, true)"
                                    :key="`attachment-item--thumbnail-${i}-${$uuid.v4()}`"
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
                            <p>Header images.</p>
                        </div>
                        <div class="images__container">
                            <attachment-uploader
                                multiple
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
                            <div
                                v-if="fileAttachments.length > 0" 
                                class="images__list">
                                <attachment-item 
                                    v-for="(file,i) in fileAttachments($store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__CAROUSEL)"
                                    :key="`attachment-item--carousel-${i}-${$uuid.v4()}`"
                                    :data="file"/>
                            </div>
                        </div>
                    </div>
                </v-flex>

            <!-- <div class="inner__divider" /> -->

                <v-flex xs4 >
                    <div class="images-section images__body">
                        <div class="section__title">
                            <h3>Body Images <span class="caption">(Optional)</span></h3>
                            <p>Project images.</p>
                        </div>

                        <div class="images__container">
                            <attachment-uploader
                                multiple
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
                            <div
                                v-if="fileAttachments.length > 0" 
                                class="images__list">
                                <attachment-item         
                                    v-for="(file,i) in fileAttachments($store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__BODY)"
                                    :key="`attachment-item--body-${i}-${$uuid.v4()}`"
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
                    <h3>Body Videos <span class="caption">(Optional)</span></h3>
                    <p>Project videos.</p>
                </div>
                <div class="images__container">
                    <attachment-uploader
                        multiple
                        ref="attachmentUploader_Video"
                        :attach-to="getAttachTo"
                        :accepted-file-types="['video/mp4']"
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
                            v-for="(file,i) in fileAttachments($store.state.config.HADDIX_ATTACHMENT_USAGE_TYPE__VIDEO)"
                            :key="`attachment-item--video-${i}-${$uuid.v4()}`"
                            :data="file"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-section create__meta">
            <h2>Meta</h2>

            <div class="inner__divider" />

            <div class="meta-section project__languages">
                <div class="section__title">
                    <h3>Project Languages <span class="caption">(Optional)</span></h3>
                    <p>Languages used creating this project.</p>
                </div>
                <div class="languages__container">
                    <div 
                        v-ripple
                        class="language__add-button"
                        @click="addLanguage">
                        <div class="button__content">
                            <p class="subheading">Add Language</p>
                            <v-icon color="grey darken-1">add</v-icon>
                        </div>
                    </div>
                    <div class="language__list">
                        <language-item
                            v-for="(item,i) in model.languages"
                            :key="`language-item-${item.id})`"
                            :id="item.id"
                            :value="model.languages[i].value"
                            :value-callback="updateLanguage"
                            :language="model.languages[i].language"
                            :language-callback="updateLanguage"
                            :remove-callback="removeLanguage"/>
                    </div>
                </div>
            </div>

            <div class="meta-section project__languages">
                <div class="section__title">
                    <h3>Project Resources <span class="caption">(Optional)</span></h3>
                    <p>Resources used creating this project.</p>
                </div>
                <div class="languages__container">
                    <resource-picker 
                        :items="projectResources"
                        :items-selected-callback="resourceItemsSelected"/>
                </div>
            </div>

            <div class="meta-section project__file-tree">
                <div class="section__title">
                    <h3>File Structure <span class="caption">(Optional)</span></h3>
                    <p>Project file structure. Requires JSON file.</p>
                </div>
                <div class="tree__input">
                    <div 
                        v-ripple
                        class="tree__add-button"
                        @click="$refs.fileStructureControl.click()">
                        <div class="button__content">
                            <p class="subheading">Add JSON File</p>
                            <v-icon color="grey darken-1">add</v-icon>
                        </div>
                    </div>
                    <input 
                        hidden
                        ref="fileStructureControl"
                        class="file-structure-uploader__input"
                        accept="application/json"
                        type="file"
                        name="file"
                        @change="handleSelectedFileStructFiles"/>
                </div>
                <div class="tree__container">
                    <v-treeview
                        hoverable
                        open-on-click
                        :items="projectTree.tree_data"
                        :open="[1]">
                        <template v-slot:prepend="{ item, open }">
                            <font-awesome-icon 
                                v-if="!item.file"
                                :icon="['fas', open ? 'folder-open': 'folder']"/>
                            <font-awesome-icon 
                                v-else 
                                :icon="[treeOptions.fileIcons[item.file].prefix, treeOptions.fileIcons[item.file].icon]" />
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
            <div
                v-if="$v.$invalid && submitted"
                class="error-prompt">
                <p>Please complete all require fields</p>
                <div class="divider"/>
            </div>
            <app-btn 
                label="Save Project"
                :disabled="projectSaving"
                @click.native="submitForm"/>
        </div>

    </div>
    </v-flex>   
</template>


<script>
    import { required, maxValue, url } from 'vuelidate/lib/validators'
    
    import { mapState, mapGetters, mapActions } from 'vuex'

    import {
        VUEX_PROJECT_CREATE
    } from '@/store/constants/projects'
    import {
        VUEX_PROJECT_TREE_CREATE_REQUEST
    } from  '@/store/constants/projects/project_tree'

    import AttachmentUploader from '@/components/_global/Attachment_Uploader'
    import CreateAttachmentItem from '@/components/Forms/CreateProject/Project_Create__Attachment_Item'
    import CreateLanguageItem from '@/components/Forms/CreateProject/Project_Create__Language_Item'
    import CreateResourcePicker from '@/components/Forms/CreateProject/Project_Create__Resource_Picker'
    import AppButton from '@/components/_global/App_Button'


    export default {
        name: 'project-create-form',

        components: {
            'attachment-uploader' : AttachmentUploader,
            'app-btn'             : AppButton,
            'attachment-item'     : CreateAttachmentItem,
            'language-item'       : CreateLanguageItem,
            'resource-picker'     : CreateResourcePicker
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
                languages    : [],
                resources    : []
            },

            // TODO: Create as mixin
            treeFoldersOpen: [1],
            treeOptions: {
                fileIcons: {
                    css   : { prefix:'fab', icon:'css3' },
                    fav   : { prefix:'fas', icon:'star'},
                    group : { prefix:'fas', icon:'ellipsis-h' },
                    html  : { prefix:'fab', icon:'html5' },
                    image : { prefix:'fas', icon:'file-image'},
                    js    : { prefix:'fab', icon:'js' },
                    json  : { prefix:'fas', icon:'code' },
                    md    : { prefix:'fab', icon:'markdown' },
                    node  : { prefix:'fab', icon:'node-js' },
                    pdf   : { prefix:'fas', icon:'file-pdf' },
                    vieo  : { prefix:'fas', icon:'file-video'},
                    vue   : { prefix:'fab', icon:'vuejs' },
                    yarn  : { prefix:'fab', icon:'yarn' }
                },
            },

            projectDateMenu  : false,
            fileDragOver     : false,
            submitted        : false
        }),

        validations: {
            model: {
                type         : { required },
                title        : { required },
                client       : { required },
                role         : { required },
                project_date : { required },
                subtitle     : { required },
                description  : { required },
                link         : { url }
            }
        },

        computed: {
            ...mapState({
                projectSaving    : state => state.projects.projectSaving,

                projectTypes     : state => state.config.projectTypes,
                projectRoles     : state => state.config.projectRoles,
                projectResources : state => state.config.projectResources,
                clients          : state => state.config.clients,

                projectTree      : state => state.project_tree.projectTree
            }),

            ...mapGetters({
                appAuthenticated   : 'appAuthenticated',
                getQueuedFiles     : 'getQueuedFiles',
				getUploadingFiles  : 'getUploadingFiles',
				getProcessingFiles : 'getProcessingFiles',
				getCompletedFiles  : 'getCompletedFiles'
            }),

            fileAttachments() {

                return((usageType, singleReturn ) => {
                    let files = new Array()
                    
                    let paramsWithId = { 
                        attach_to: { 
                            model_id: this.model.project_id,
                            model: HADDIX_ATTACHMENT_TYPE__PROJECT
                        } 
                    }
    
                    files = files
                        .concat(this.getCompletedFiles(paramsWithId))
                        .concat(this.getUploadingFiles(paramsWithId))
                        .concat(this.getProcessingFiles(paramsWithId))
                        .concat(this.getQueuedFiles(paramsWithId))
                    
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
                    model: HADDIX_ATTACHMENT_TYPE__PROJECT,
                    model_id: this.model.project_id
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

            addLanguage() {
                this.model.languages.push({
                    id: this.$uuid.v4(),
                    value: 0,
                    language: ''
                })
            },

            updateLanguage(data) {
                let index = this.model.languages.findIndex(x => x.id === data.id)
                if (index > -1) {
                    Object.assign(this.model.languages[index], data)
                }

            },

            removeLanguage(id) {
                let index = this.model.languages.findIndex(x => x.id === id)
                if (index > -1) {
                    this.model.languages.splice(index, 1)
                }
                
            },

            resourceItemsSelected(items) {
                this.model.resources = items
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
                this.submitted = true

                if (!this.$v.$invalid) {
                    this.createProject(this.model)
                }
            }
        }
    }
</script>