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
        <div class="projects__list">
            <projects-item
                client="The Gary Group"
                title="Christmas Card"
                :image="require('@/assets/app/images/projects/christmas_card/img-1.jpg')" />
            <projects-item
                client="Skechers"
                title="Wayfinder Kiosk"
                :image="require('@/assets/app/images/projects/skechers_kiosk/img-1.png')" />
            <projects-item
                client="The Gary Group"
                title="Christmas Card"
                :image="require('@/assets/app/images/projects/christmas_card/img-1.jpg')" />
            <projects-item
                client="Skechers"
                title="Wayfinder Kiosk"
                :image="require('@/assets/app/images/projects/skechers_kiosk/img-1.png')" />
        </div>
    </div>
</template>


<script>
    import { mapActions } from 'vuex'

    import {
        VUEX_UI_OVERLAY_CONTAINER_SHOW,
        VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT
    } from '@/store/constants/ui'

    import ProjectsItem from '@/components/Projects/Projects_Item.vue'
    
    export default {
        name : 'projects-view',

        components: {
            'projects-item' : ProjectsItem
        },

        methods: {
            ...mapActions({
                openOverlayContainer: VUEX_UI_OVERLAY_CONTAINER_SHOW,
                setOverlayComponent: VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT
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
            }
        }
    }
</script>