<template>
    <div class="labs-view">
		<div class="labs__add-btn">
            <v-btn
                fab
                color="primary"
                @click="addProject">
                <v-icon>add</v-icon>
            </v-btn>
        </div>

		<div class="labs__header">
			<div class="header__content">
				<particle-text text="HADDIX"/>
				<p>Experiments for Jason R. Haddix</p>
				<div class="scroll-arrow"><v-icon color="grey darken-2">keyboard_arrow_down</v-icon></div>
				<div
					v-if="!hasProjects"
					class="coming-soon">
					<h3><span>¯\_(ツ)_/¯</span> {{getMessage}}</h3>
					<p><small>Instead, try looking at this pretty animation.</small></p>
				</div>
			</div>
			<!-- <div
				v-if="true"
				:class="['header__scroll', {'visible':scrollIndVisible}]">
				<p>SCROLL</p>
				<v-icon>keyboard_arrow_down</v-icon>
			</div> -->
		</div>

		<div
            v-if="!hasProjects && projectsLoading">
            <v-progress-circular
                indeterminate
                class="progress__ind"
                color="primary"
                width="8"
                size="38"/>
        </div>

		<div
            v-if="hasProjects"
            class="projects__list">
            <projects-item
                v-for="(item,i) in filteredProjects"
                :key="`project-${item.project_id}-${i}`"
                :id="item.project_id"
                :session-id="item.session_id"
                :client="getClientName(item.client)"
                :title="item.title"
                :subtitle="item.subtitle"
                :link="item.link"
                :image="getThumbnailImage(item.project_id)" />
        </div>
    </div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex'

	import {
		VUEX_UI_OVERLAY_CONTAINER_SHOW,
		VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT
	} from '@/store/constants/ui'

	import ParticleText from '@/components/_global/Particle_Text.vue'
	import ProjectsItem from '@/components/Projects/Projects_Item.vue'

	export default {
		name: 'labs-view',

		components: {
			'particle-text': ParticleText,
			'projects-item': ProjectsItem
		},

		data: () => ({
			scrollListener: null,
			scrollIndVisible: true,
			comingSoonMessages: [
				'Nope...Not Yet',
				'Coming Soon-ish',
				"Workin' On It",
				'Nothing Here',
				''
			]
		}),

		computed: {
			...mapState({
				projects: state => state.projects.projects,
				projectsLoading: state => state.projects.projectsLoading

			}),

			...mapGetters({
				hasProjects: 'hasProjects',
				attachmentsByUsageType: 'attachmentsByUsageType',
				getPropertyByKey: 'getPropertyByKey'
			}),

			filteredProjects () {
			return this.projects.filter(p => {
				if (p.type === HADDIX_PROJECT_TYPE__EXPERIMENT && (!p.is_guest_project || p.session_id === this.sessionId)) return p
			})
		},

			getThumbnailImage () {
				return (id) => {
					let images = this.attachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__THUMBNAIL, 'projects', id)
					return (images.length > 0) ? images[0].uri : require('@/assets/app/images/project-placeholder-thumb.jpg')
				}
			},

			getClientName () {
				return (client) => {
					if (!client) return ''
					return this.getPropertyByKey('clients', client, 'value', 'name')
				}
			},

			getMessage () {
				return this.comingSoonMessages[Math.round(Math.random() * this.comingSoonMessages.length - 1)]
			}
		},

		mounted () {
			window.addEventListener('scroll', this.checkScroll)
		},

		beforeDestroy () {
			window.removeEventListener('scroll', this.checkScroll)
		},

		methods: {
			...mapActions({
				openOverlayContainer: VUEX_UI_OVERLAY_CONTAINER_SHOW,
				setOverlayComponent: VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT
			}),
			checkScroll (e) {
				let scrollPos = e.target.scrollingElement.scrollTop
				if (scrollPos > 100) {
					this.scrollIndVisible = false
					window.removeEventListener('scroll', this.checkScroll)
				}
			},

			addProject () {
				this.setOverlayComponent({
					component: {
						path: 'Forms/CreateProject',
						file: 'Project_Create'
					},
					title: 'Create Project'
				})

				this.openOverlayContainer()
			}
		}
	}
</script>
