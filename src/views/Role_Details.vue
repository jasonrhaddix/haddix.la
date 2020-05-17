<template>
    <v-container fluid class="role-details-view">

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
                    <h3>{{ subtitle }}</h3>
                </div>

				<div class="project-info__container">
					<v-row class="project-info__inner">
						<v-col align-self="center" class="col-6 col-md-4 project-info__item">
							<div class="item">
								<h4>Client</h4>
								<p>{{ client }}</p>
							</div>
						</v-col>

						<v-col align-self="center" class="col-6 col-md-4 project-info__item">
							<div class="item">
								<h4>Role</h4>
								<p>{{ role }}</p>
							</div>
						</v-col>

						<v-col align-self="center" class="d-none d-md-block col-12 col-md-4 project-info__item">
							<div class="item">
								<div
									v-if="link"
									class="project-btn__container"
									@click="navigateToProject">
									<app-btn class="project-btn" label="View Project"/>
								</div>
							</div>
						</v-col>
					</v-row>
				</div>

                <v-btn
                    fab small depressed
                    class="header__close-btn"
                    @click="navigateToPreviousPage">
                    <v-icon>close</v-icon>
                </v-btn>
            </div>

            <v-container class="content__container">
                <!-- <div class="divider" /> -->

                <div class="section excerpt__container">
                    <h3 class="headline">{{ excerpt }}</h3>
                </div>

                <div
                  v-if="videos"
                  class="divider" />

                <div class="section video__container">
                    <div
                        v-if="videos"
                        class="video__inner">
                        <video
                            loop muted autoplay
                            controls playsInline
                            class="project-video">
                            <source :src="videos.uri" :type="videos.mimetype"/>
                        </video>
                    </div>
                </div>

                <div
					v-if="description"
					class="divider" />

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
                            :key="`project-photo-${$uuid.v4()}-${i}`"
							@click="showFullsizeImage(item)">

							<div class="photo">
								<img :src="item.uri" />

								<div class="img-hover">
									<div class="skrim"/>
									<v-icon
										size="32"
										class="icon"
										color="white">
										search
									</v-icon>
								</div>
							</div>

                        </v-flex>
                    </v-layout>
                </div>

                <div
					v-if="languages || resources"
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
                </div>
            </v-container>
        </div>

		<div
			v-if="link"
			class="d-sm-block d-md-none footer__container">
			<v-row class="footer__inner">
				<v-col align-self="center" class="col-12 project-info__item">
					<div
						class="project-btn__container"
						@click="navigateToProject">
						<app-btn class="project-btn" label="View Project"/>
					</div>
				</v-col>
			</v-row>
		</div>
    </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import {
	VUEX_ROUTING_PREVIOUS_PAGE
} from '@/store/constants/routing'

import {
	VUEX_UI_DIALOG_CONTAINER_SHOW
} from '@/store/constants/ui'

import LanguageGraph from '@/components/_global/Language_Graph'
import AppButton from '@/components/_global/App_Button.vue'

export default {
	name: 'project-details-view',

	components: {
		'language-graph': LanguageGraph,
		'app-btn': AppButton
	},

	data: () => ({

	}),

	computed: {
		...mapState({
			project: state => state.projects.project
		}),

		...mapGetters({
			attachmentsByUsageType: 'attachmentsByUsageType',
			getPropertyByKey: 'getPropertyByKey'
		}),

		headerImage () {
			let images = this.attachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__CAROUSEL, 'project-details')
			return (images && images.length > 0)
				? images[0].uri
				: null
		},

		client () {
			return this.getPropertyByKey('clients', this.project.client, 'value', 'name')
		},

		title () {
			return this.project.title
		},

		subtitle () {
			return this.project.subtitle
		},

		excerpt () {
			return this.project.excerpt
		},

		link () {
			return this.project.link
		},

		role () {
			return this.getPropertyByKey('projectRoles', this.project.role, 'value', 'name')
		},

		videos () {
			let videos = this.attachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__VIDEO, 'project-details')
			return (videos && videos.length > 0)
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
			return (this.project.languages && this.project.languages.length > 0) ? this.project.languages : null
		},

		resources () {
			return (this.project.resources && this.project.resources.length > 0) ? this.project.resources : null
		}
	},

	methods: {
		...mapActions({
			navigateToPreviousPage: VUEX_ROUTING_PREVIOUS_PAGE,
			showDialog: VUEX_UI_DIALOG_CONTAINER_SHOW
		}),

		navigateToProject () {
			window.location.href = this.project.link
		},

		showFullsizeImage (item) {
			this.showDialog({
				component: {
					path: '_global',
					file: 'Photo_Viewer'
				},
				props: {
					images: this.photos,
					startImageId: item.attachment_id
				}
			})
		}
	}
}
</script>
