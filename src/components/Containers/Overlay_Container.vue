<template>
    <v-dialog
        dark
        fullscreen
        hide-overlay
        transition="transition-slide-up"
        content-class="overlay-container"
        v-model="overlayOpenState">

        <div class="section section__header">
            <h1 class="header__title">{{ overlayTitle }}</h1>
            <v-btn 
                light fab small
                class="header__close-btn"
                @click="closeOverlay">
                <v-icon>close</v-icon>
            </v-btn>
        </div>
        <div class="section section__content">
            <component :is="loadComponent" />
        </div>
    </v-dialog>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    import {
        VUEX_UI_OVERLAY_CONTAINER_HIDE
    } from '@/store/constants/ui'

    export default {
        name: 'overlay-container',

        computed: {
            ...mapState({
                overlayOpenState: state => state.ui.overlayContainer.openState,
                overlayComponent: state => state.ui.overlayContainer.component,
                overlayTitle:     state => state.ui.overlayContainer.title
            }),

            loadComponent() {
                return this.overlayComponent ? this.$root.loadComponent(this.overlayComponent) : null
            }
        },

        methods: {
            ...mapActions({
                closeOverlay: VUEX_UI_OVERLAY_CONTAINER_HIDE
            })
        }
    }
</script>