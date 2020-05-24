<template>
    <div class="roles-view">
		<v-data-table
			dark
			:headers="headers"
			:items="roles"
			:items-per-page="50"
			class="elevation-1"
			@click:row="roleClick"/>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import {
	VUEX_ROUTING_PUSH_ROUTE
} from '@/store/constants/routing'

export default {
	name: 'roles-view',

	data: () => ({
		headers: [
			{ text: 'Job Title', value: 'job_title' },
			{ text: 'Role ID', value: 'role_id' },
			{ text: 'Client', value: 'client' },
			{ text: 'Department', value: 'department' },
			{ text: 'Recruiter', value: 'recruiter' },
			{ text: 'published', value: 'published' }
		]
	}),

	computed: {
		...mapState({
			roles: state => state.roles.roles
		})
	},

	methods: {
		...mapActions({
			navigateToRoute: VUEX_ROUTING_PUSH_ROUTE
		}),

		roleClick (e) {
			this.navigateToRoute({
				name: 'role-details',
				params: {
					role_id: e.role_id
				}
			})
		}
	}
}
</script>
