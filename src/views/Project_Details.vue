<template>
    <v-container fluid class="project-details-view">
        <div class="details__content">
            <div class="header__container">
                <v-img 
                    
                    v-if="headerImage"
                    :src="headerImage"></v-img>
            </div>
            <div>SUBTITLE</div>
            <div>VIDEO</div>
            <div>DESCRIPTION</div>
            <div>PHOTOS</div>
            <div>META</div>
        </div>
    </v-container>
</template>


<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        name:'project-details-view',

        computed: {
            ...mapState({
                project : state => state.projects.project
            }),

            ...mapGetters({
                attachmentsByUsageType : 'attachmentsByUsageType'
            }),

            headerImage() {
                let images = this.attachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__CAROUSEL, 'project-details')
                return (images.length > 0) ? images[0].uri : null
            }
        }
    }
</script>