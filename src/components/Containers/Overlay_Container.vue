<template>
    <v-dialog
        dark
        fullscreen
        persistent
        hide-overlay
        transition="transition-slide-up"
        content-class="overlay-container"
        v-model="openState">

        <div
            v-if="!appAuthenticated"
            class="overlay__guest-warning">
            <p><span>You're not currently logged in.</span> Projects created as Guest will be removed after each session.</p>
        </div>

        <v-container grid-list-md>
            <v-layout column>

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
            </v-layout>
        </v-container>
    </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import {
  VUEX_UI_OVERLAY_CONTAINER_HIDE
} from '@/store/constants/ui'

export default {
  name: 'overlay-container',

  computed: {
    ...mapState({
      overlayOpenState: state => state.ui.overlayContainer.openState,
      overlayComponent: state => state.ui.overlayContainer.component,
      overlayTitle: state => state.ui.overlayContainer.title
    }),

    ...mapGetters({
      appAuthenticated: 'appAuthenticated'
    }),

    loadComponent () {
      return this.overlayComponent ? this.$root.loadComponent(this.overlayComponent) : null
    },

    openState: {
      get () { return this.overlayOpenState },
      set (val) { this.$store.commit('VUEX_UI_OVERLAY_CONTAINER_SET_STATE', val) }
    }
  },

  methods: {
    ...mapActions({
      closeOverlay: VUEX_UI_OVERLAY_CONTAINER_HIDE
    })
  }
}
</script>
