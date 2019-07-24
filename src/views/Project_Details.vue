<template>
    <v-container fluid class="project-details-view">
        <div class="footer__container">
        <img
            contain
            :src="require('@/assets/app/images/project-details-footer-grey.jpg')"></img>
        </div>

        <div class="details__content">
            <div class="header__container">
                <v-img
                    contain
                    v-if="headerImage"
                    :src="headerImage"></v-img>

                <div class="scrim"/>

                <div class="title__container">
                    <h3>{{ client }}</h3>
                    <h1>{{ title }}</h1>
                </div>
                <v-btn
                    fab small depressed
                    class="header__close-btn"
                    @click="navigateToRoute({name:'projects'})">
                    <v-icon>close</v-icon>
                </v-btn>
            </div>

            <v-container class="content__container">
                <!-- <div class="divider" /> -->

                <div class="section subtitle__container">
                    <h3 class="headline">{{ subtitle }}</h3>
                </div>

                <div
                  v-if="videos" 
                  class="divider" />

                <div class="section video__container">
                    <div
                        v-if="videos"
                        class="video__inner">
                        <video
                            loop
                            muted
                            autoplay
                            controls
                            playsInline
                            class="project-video">
                            <source :src="videos.uri" :type="videos.mimetype"/>
                        </video>
                    </div>
                </div>

                <div class="divider" />

                <div class="section description__container">
                    <div class="description__inner">
                        <div class="description" v-html="description">
                            <!-- {{ description }} -->
                        </div>
                    </div>
                </div>

                <div
					v-if="photos" 
					class="divider" />

                <div class="section photos__container">
                    <v-layout 
                      row wrap 
                      class="photos__inner">
                        <v-flex
                            xs6
                            align-content-center
                            v-for="(item,i) in photos"
                            :key="`project-photo-${$uuid.v4()}-${i}`">
                            <v-img
                                :src="item.uri"></v-img>
                        </v-flex>
                    </v-layout>
                </div>

                <div 
					v-if="languages || resources || tree"
					class="divider" />

                <div class="section meta__container">
                    <div 
						v-if="languages"
						class="meta__title languages">
                        <h4>Languages</h4>
                    </div>
                    <div
						v-if="languages" 
						class="subsection meta_languages">
                        <v-layout class="languages__inner">
                            <language-graph
                                v-for="(item, i) in languages"
                                :key="`project-language-${$uuid.v4()}-${i}`"
                                :value="item.value"
                                :language="item.language"/>
                        </v-layout>
                    </div>

                    <div 
						v-if="resources" 
						class="meta__title languages">
                        <h4>Resources</h4>
                    </div>
                    <div
						v-if="resources" 
						class="subsection meta_resources">
                        <v-layout row wrap class="resources__inner">
                            <v-flex xs6
                                v-for="(item,i) in resources"
                                :key="`resource-item-${i}`"
                                class="resource-item">
                                <p> {{ item.value }}</p>
                            </v-flex>
                        </v-layout>
                    </div>

                    <div
                        v-if="tree" 
                        class="meta__title languages">
                        <h4>File Structure</h4>
                    </div>
                    <div
                        v-if="tree" 
                        class="subsection meta_tree">
                        <div class="tree__inner">
                            <v-treeview
                                hoverable
                                open-on-click
                                :items="tree"
                                :open="[1]">
                                <template v-slot:prepend="{ item, open }">
                                    <font-awesome-icon
                                        v-if="!item.file"
                                        color="grey"
                                        :icon="['fas', open ? 'folder-open': 'folder']"/>
                                    <font-awesome-icon
                                        v-else
                                        color="grey"
                                        :icon="[treeOptions.fileIcons[item.file].prefix, treeOptions.fileIcons[item.file].icon]" />
                                </template>
                            </v-treeview>
                        </div>
                    </div>
                </div>
            </v-container>
        </div>
    </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

// import VuePureLightbox from 'vue-pure-lightbox'

import {
  VUEX_ROUTING_PUSH_ROUTE
} from '@/store/constants/routing'

import LanguageGraph from '@/components/_global/Language_Graph'

export default {
  name: 'project-details-view',

  components: {
    'language-graph': LanguageGraph
  },

  data: () => ({
    treeFoldersOpen: [1],
    treeOptions: {
      fileIcons: {
        css: { prefix: 'fab', icon: 'css3' },
        fav: { prefix: 'fas', icon: 'star' },
        group: { prefix: 'fas', icon: 'ellipsis-h' },
        html: { prefix: 'fab', icon: 'html5' },
        image: { prefix: 'fas', icon: 'file-image' },
        js: { prefix: 'fab', icon: 'js' },
        json: { prefix: 'fas', icon: 'code' },
        md: { prefix: 'fab', icon: 'markdown' },
        node: { prefix: 'fab', icon: 'node-js' },
        pdf: { prefix: 'fas', icon: 'file-pdf' },
        vieo: { prefix: 'fas', icon: 'file-video' },
        vue: { prefix: 'fab', icon: 'vuejs' },
        yarn: { prefix: 'fab', icon: 'yarn' }
      }
    }
  }),

  computed: {
    ...mapState({
      project: state => state.projects.project,
      projectTree: state => state.project_tree.projectTree
    }),

    ...mapGetters({
      attachmentsByUsageType: 'attachmentsByUsageType'
    }),

    headerImage () {
      let images = this.attachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__CAROUSEL, 'project-details')
      return (images.length > 0)
        ? images[0].uri
        : null
    },

    client () {
      return this.project.client
    },

    title () {
      return this.project.title
    },

    subtitle () {
      return this.project.subtitle
    },

    videos () {
      let videos = this.attachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__VIDEO, 'project-details')
      return (videos.length > 0)
        ? videos[0]
        : null
    },

    description () {
      return this.project.description
    },

    photos () {
      let photos = this.attachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__BODY, 'project-details')
      return (photos.length > 0)
        ? photos
        : null
    },

    languages () {
      return (this.project.languages.length > 0) ? this.project.languages : null
    },

    resources () {
	  return (this.project.resources.length > 0) ? this.project.resources : null
    },

    tree () {
      return this.projectTree.tree_data ? this.projectTree.tree_data : null
    }
  },

  methods: {
    ...mapActions({
      navigateToRoute: VUEX_ROUTING_PUSH_ROUTE
    })
  }
}
</script>
