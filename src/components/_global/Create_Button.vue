<template>
	<div class="create__button">
		<v-btn
			fab
			color="primary"
			@click="createClick">
			<v-icon>add</v-icon>
		</v-btn>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	import {
		VUEX_UI_OVERLAY_CONTAINER_SHOW,
		VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT,
		VUEX_UI_DIALOG_CONTAINER_SHOW
	} from '@/store/constants/ui'

	export default {
		name: 'create-button',

		data: () => ({}),

		computed: {
			...mapGetters({
				appAuthenticated: 'appAuthenticated'
			})
		},

		methods: {
			...mapActions({
				openOverlayContainer: VUEX_UI_OVERLAY_CONTAINER_SHOW,
				setOverlayComponent: VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT,
				showDialog: VUEX_UI_DIALOG_CONTAINER_SHOW
			}),

			createClick () {
				if (this.appAuthenticated) {
					this.showDialog({
						component: {
							path: '_global',
							file: 'Create_Picker'
						},
						width: 900
					})
				} else {
					this.setOverlayComponent({
						component: {
							path: 'Forms/CreateProject/Project',
							file: 'Project_Create'
						},
						title: 'Create Project'
					})

					this.openOverlayContainer()
				}
			}
		}
	}
</script>
