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
                    <h4>Relevant experience for</h4>
                    <h1>{{ job_title }}</h1>
                    <h3><span>at</span> {{ client }}</h3>
                </div>

				<div class="project-info__container">
					<v-row class="project-info__inner">
						<v-col align-self="center" class="col-4 project-info__item">
							<div class="item">
								<h4>Company</h4>
								<p>{{ client }}</p>
							</div>
						</v-col>

						<v-col align-self="center" class="col-4 project-info__item">
							<div class="item">
								<h4>Organization</h4>
								<p>{{ department }}</p>
							</div>
						</v-col>
						<v-col align-self="center" class="col-4 project-info__item">
							<div class="item">
								<h4>Recruiter</h4>
								<p>{{ recruiter }}</p>
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

			<div class="project-info__container__mobile">
				<v-row class="project-info__inner">
					<v-col align-self="center" class="col-4 project-info__item">
						<div class="item">
							<h4>Company</h4>
							<p>{{ client }}</p>
						</div>
					</v-col>

					<v-col align-self="center" class="col-4 project-info__item">
						<div class="item">
							<h4>Organization</h4>
							<p>{{ department }}</p>
						</div>
					</v-col>
					<v-col align-self="center" class="col-4 project-info__item">
						<div class="item">
							<h4>Recruiter</h4>
							<p>{{ recruiter }}</p>
						</div>
					</v-col>
				</v-row>
			</div>

            <v-container class="content__container">
                <div class="section description__container">
                    <p class="" v-html="description"/>
                </div>

                <div class="divider" />

				<div class="section project__container">
					<!-- <div class="section-title">
						<h2>Projects</h2>
					</div> -->

					<div
						class="project-item"
						v-for="project in role.projects"
						:key="`project-item--${project.project_id}}`">
						<div>
							<div class="title__container">
								<div class="title__info">
									<h3>{{ project.title }}</h3>
									<p v-html="project.summary"/>
								</div>

								<div
									v-if="projectVideos(project.project_id)"
									class="watch__btn">
									<app-btn
										light label="Watch Video"
										@click.native="loadVideo(projectVideos(project.project_id))"/>
								</div>
							</div>

							<v-container>
								<v-layout row wrap class="photos__inner">
									<v-flex
										xs12 md6 align-content-center
										v-for="(item,i) in projectImages(project.project_id)"
										:key="`project-photo-${$uuid.v4()}-${i}`"
										@click="showFullsizeImage(item)">
										<div class="photo">
											<img :src="item.uri" />
											<div class="img-hover">
												<div class="skrim"/>
												<v-icon size="32" class="icon" color="white">search</v-icon>
											</div>
										</div>
									</v-flex>
								</v-layout>
							</v-container>
						</div>
						<div class="divider"/>
					</div>
				</div>
            </v-container>
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

import AppBtn from '@/components/_global/App_Button'

export default {
	name: 'project-details-view',

	components: {
		'app-btn': AppBtn
	},

	computed: {
		...mapState({
			role: state => state.roles.role
		}),

		...mapGetters({
			projectAttachmentsByUsageType: 'projectAttachmentsByUsageType',
			getPropertyByKey: 'getPropertyByKey'
		}),

		headerImage () {
			return require('@/assets/app/images/project-placeholder-thumb.jpg')
		},

		client () {
			return this.getPropertyByKey('roleClients', this.role.client, 'value', 'name') || ''
		},

		job_title () {
			return this.role.job_title
		},

		department () {
			return this.role.department
		},

		description () {
			return this.role.description
		},

		recruiter () {
			return this.role.recruiter
		},

		projectVideos () {
			return projectId => {
				let videos = this.projectAttachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__VIDEO_ROLE, 'roles', projectId)
				return (videos.length > 0)
					? videos[0]
					: null
			}
		},

		projectImages () {
			return projectId => {
				let images = this.projectAttachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__BODY_ROLE, 'roles', projectId)
				return (images.length > 0)
					? images
					: require('@/assets/app/images/project-placeholder-thumb.jpg')
			}
		}
	},

	methods: {
		...mapActions({
			navigateToPreviousPage: VUEX_ROUTING_PREVIOUS_PAGE,
			showDialog: VUEX_UI_DIALOG_CONTAINER_SHOW
		}),

		showFullsizeImage (item) {
			this.showDialog({
				component: {
					path: '_global',
					file: 'Photo_Viewer'
				},
				props: {
					images: item
				}
			})
		},

		loadVideo (item) {
			this.showDialog({
				component: {
					path: '_global',
					file: 'Video_Viewer'
				},
				props: {
					videos: item
				}
			})
		}
	}
}
</script>
