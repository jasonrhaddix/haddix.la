<template>
  <div class="create-picker">
	<div class="create-picker__content">
		<div class="picker__title">
			<h1>Create New</h1>
		</div>
		<div class="picker__options">
			<div class="content__item">
				<div
					class="item"
					@click="openCreateForm($store.state.config.HADDIX_PROJECT_TYPE__WORK)">
					<v-icon
						size="170"
						color="white">dashboard</v-icon>
					<div>
						<h3>Project</h3>
					</div>
				</div>
			</div>
			<div class="content__item">
				<div
					class="item"
					@click="openCreateForm($store.state.config.HADDIX_PROJECT_TYPE__NEW_ROLE)">
					<v-icon
						size="170"
						color="white">person</v-icon>
					<div>
						<h3>Role</h3>
					</div>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import {
	VUEX_UI_DIALOG_CONTAINER_SHOW,
	VUEX_UI_DIALOG_CONTAINER_HIDE,
	VUEX_UI_OVERLAY_CONTAINER_SHOW,
	VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT
} from '@/store/constants/ui'

export default {
	name: 'create-picker',

	methods: {
		...mapActions({
			openDialog: VUEX_UI_DIALOG_CONTAINER_SHOW,
			closeDialog: VUEX_UI_DIALOG_CONTAINER_HIDE,
			openOverlayContainer: VUEX_UI_OVERLAY_CONTAINER_SHOW,
			setOverlayComponent: VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT
		}),

		openCreateForm (type) {
			switch (type) {
				case HADDIX_PROJECT_TYPE__WORK :
				case HADDIX_PROJECT_TYPE__COLLAB :
				case HADDIX_PROJECT_TYPE__PERSONAL :
				case HADDIX_PROJECT_TYPE__EXPERIMENT :
					this.setOverlayComponent({
						component: {
							path: 'Forms/CreateProject/Project',
							file: 'Project_Create'
						},
						title: 'Create Project'
					})

					this.openOverlayContainer()
					break

				case HADDIX_PROJECT_TYPE__NEW_ROLE :
					this.setOverlayComponent({
						component: {
							path: 'Forms/CreateProject/Role',
							file: 'Role_Create'
						},
						title: 'Create Role'
					})

					this.openOverlayContainer()
					break
			}

			this.closeDialog()
		}
	}
}
</script>
