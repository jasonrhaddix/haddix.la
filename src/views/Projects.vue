<template>
    <div class="projects-view">
        <div class="projects__add-btn">
            <v-btn
                fab
                color="primary"
                @click="addProject">
                <v-icon>add</v-icon>
            </v-btn>
        </div>
        <div
            v-if="hasProjects" 
            class="projects__list">
            <projects-item
                v-for="(item,i) in projects"
                :key="`project-${item.project_id}-${i}`"
                :id="item.project_id"
                :session-id="item.session_id"
                :client="getClientName(item.client)"
                :title="item.title"
                :is-guest-project="item.is_guest_project"
                :click-callback="navigateToProject"
                :image="getThumbnailImage(i)" />
        </div>
    </div>
</template>


<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    import {
        VUEX_UI_OVERLAY_CONTAINER_SHOW,
        VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT
    } from '@/store/constants/ui'
    import {
        VUEX_ROUTING_PUSH_ROUTE
    } from '@/store/constants/routing'

    import ProjectsItem from '@/components/Projects/Projects_Item.vue'
    
    export default {
        name : 'projects-view',

        components: {
            'projects-item' : ProjectsItem
        },

        computed: {
            ...mapState({
                projects : state => state.projects.projects
            }),

            ...mapGetters({
                hasProjects : 'hasProjects',
                attachmentsByUsageType : 'attachmentsByUsageType',
                getPropertyByKey : 'getPropertyByKey'
            }),

            getThumbnailImage() {
                return (index) => {
                    let images = this.attachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__THUMBNAIL, 'projects', index)
                    return (images.length > 0) ? images[0].uri : require('@/assets/app/images/projects/christmas_card/img-1.jpg')
                }
            },

            getClientName() {
                return (client) => {
                    if (!client) return ""
                    return this.getPropertyByKey('clients', client, 'value', 'name')
                }
            }

        },

        methods: {
            ...mapActions({
                openOverlayContainer : VUEX_UI_OVERLAY_CONTAINER_SHOW,
                setOverlayComponent  : VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT,
                navigateToRoute      : VUEX_ROUTING_PUSH_ROUTE
            }),

            addProject() {
                this.setOverlayComponent({ 
                    component:{ 
                        path:'Forms/CreateProject',
                        file:'Project_Create'
                    }, 
                    title:'Create Project'
                })
                
                this.openOverlayContainer()
            },

            navigateToProject(data) {
                console.log(data)
                this.navigateToRoute({ 
                    name: 'project-details',
                    params: {
                        ...data
                    }
                })
            }
        }
    }
</script>