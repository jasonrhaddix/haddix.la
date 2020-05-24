<template>
    <div class="roles-view">
		<v-data-table
			dark
			:headers="headers"
			:items="roles"
			:items-per-page="50"
			class="elevation-1"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'

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

	components: {
		//
	},

	computed: {
		...mapState({
			roles: state => state.roles.roles
		})
	},

	methods: {
		//
	}
}
</script>
