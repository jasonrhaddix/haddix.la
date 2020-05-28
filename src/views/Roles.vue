<template>
    <div class="roles-view">
		<div class="projects__add-btn">
			<create-button />
        </div>

		<div class="roles__inner">
			<v-data-table
				dark
				:headers="headers"
				:items="roles"
				:items-per-page="50"
				class="elevation-1">

				<template
					v-slot:body="{ items }">

					<tbody>
						<tr
							v-for="(item, index) in items"
							:key="`role--items--${index}`"
							class="">
							<!-- Job Title -->
							<td>{{ item.job_title || `--` }}</td>
							<!-- Role ID -->
							<td class="col__role-id" @click="roleClick(item.role_id)">{{ item.role_id || `--`  }}</td>
							<!-- Client -->
							<td>{{ getClient(item.client) || `--` }}</td>
							<!-- Department -->
							<td>{{ item.department || `--` }}</td>
							<!-- Recruiter -->
							<td>{{ item.recruiter || `--` }}</td>
							<!-- Published -->
							<td class="col__publish"><v-icon color="green">{{ getPublished(item.published) }}</v-icon></td>
						</tr>
					</tbody>
				</template>
			</v-data-table>
		</div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import {
	VUEX_ROUTING_PUSH_ROUTE
} from '@/store/constants/routing'

import CreateButton from '@/components/_global/Create_Button'

export default {
	name: 'roles-view',

	components: {
		'create-button': CreateButton
	},

	data: () => ({
		headers: [
			{ text: 'Job Title', value: 'job_title' },
			{ text: 'Role ID', value: 'role_id' },
			{ text: 'Client', value: 'client' },
			{ text: 'Department', value: 'department' },
			{ text: 'Recruiter', value: 'recruiter' },
			{ text: 'Published', value: 'published', align: 'center' }
		]
	}),

	computed: {
		...mapState({
			roles: state => state.roles.roles
		}),

		...mapGetters({
			getPropertyByKey: 'getPropertyByKey'
		}),

		publishedRoles () {
			return this.roles.filter(role => role.published)
		},

		getClient () {
			return client => {
				if (!client) return null
				return this.getPropertyByKey('roleClients', client, 'value', 'name')
			}
		},

		getPublished () {
			return published => published ? 'check_circle_outline' : null
		}
	},

	methods: {
		...mapActions({
			navigateToRoute: VUEX_ROUTING_PUSH_ROUTE
		}),

		roleClick (id) {
			this.navigateToRoute({
				name: 'role-details',
				params: {
					role_id: id
				}
			})
		}
	}
}
</script>
