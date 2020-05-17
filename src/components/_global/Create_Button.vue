<template>
	<div class="create__button">
		<v-menu dark>
			<template v-slot:activator="{ on }">
				<v-btn
					fab
					color="primary"
					v-on="on">
					<v-icon>add</v-icon>
				</v-btn>
			</template>
			<v-list>
				<v-list-item
					v-for="(item, index) in menuItems"
					:key="`create-new--item--${index}`"
					@click="addProject(item)">
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	import {
		VUEX_UI_OVERLAY_CONTAINER_SHOW,
		VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT
	} from '@/store/constants/ui'

	export default {
		name: 'create-button',

		data: () => ({
			menuItems: [
				{
					title: 'Create New Role',
					component: {
						path: 'Forms/CreateProject/Role',
						file: 'Role_Create'
					}
				},
				{
					title: 'Create Project',
					component: {
						path: 'Forms/CreateProject/Project',
						file: 'Project_Create'
					}
				}
			]
		}),

		methods: {
			...mapActions({
				openOverlayContainer: VUEX_UI_OVERLAY_CONTAINER_SHOW,
				setOverlayComponent: VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT
			}),

			addProject (item) {
				this.setOverlayComponent({
					component: item.component,
					title: item.title
				})

				this.openOverlayContainer()
			}
		}
	}
</script>
