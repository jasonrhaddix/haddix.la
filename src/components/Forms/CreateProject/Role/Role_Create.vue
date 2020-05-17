<template>
    <v-container class="form--role-create">
        <div class="form-section create__form">
			<v-row>
				<v-col class="col-12 order-md-12 offset-md-4 col-md-4">
					<div class="project__pending-id">
						<p>{{ model.role_id }}</p>
					</div>
				</v-col>
				<v-col class="col-12 col-md-4">
                    <v-select
                        filled dense
                        label="Client"
                        item-text="name"
                        :items="roleClients"
                        v-model="model.client"/>
                </v-col>
			</v-row>

            <v-row>
                <v-col class="col-12">
                    <v-text-field
                        filled
                        label="Job Title"
                        v-model="model.title"/>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="col-12">
                    <v-text-field
                        filled
                        label="Department"
                        v-model="model.department"/>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="col-12">
                    <v-textarea
                        filled
                        label="Description"
                        v-model="model.description"/>
                </v-col>
            </v-row>

			<v-row>
                <v-col class="col-12">
                    <v-text-field
                        filled
                        label="Recruiter"
                        v-model="model.recruiter"/>
                </v-col>
            </v-row>
        </div>

        <div class="form-section create__projects">
            <h2>Projects</h2>

            <div class="inner__divider" />

            <v-row>
                <v-col class="col-12">
                    <div class="projects-section">
                        <div class="projects__container">
							<div>
								<role-project
									ref="roleProjects"
									v-for="(project, i) in model.projects"
									:key="`project-item--${i}`"
									:id="i"
									:role-id="model.role_id"
									:removeCallback="removeProjectCallback"/>

								<div
									v-ripple
									class="add-project-btn"
									@click="addProject">
									<div class="button__content">
										<p class="subheading">Add Project</p>
										<v-icon color="grey darken-1">add</v-icon>
									</div>
								</div>
							</div>
                        </div>
                    </div>
                </v-col>
			</v-row>
        </div>

        <div class="form-section role__save-btn">
            <v-progress-circular
                v-if="roleSaving"
                indeterminate
                class="progress__ind"
                color="primary"
                width="8"
                size="38"/>
            <app-btn
                label="Save Role"
                :disabled="roleSaving"
                @click.native="submitForm"/>
        </div>

    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import {
	VUEX_ROLE_CREATE
} from '@/store/constants/roles'

import RoleProjectItem from '@/components/Forms/CreateProject/Role/Role_Create__Project_item'
import AppButton from '@/components/_global/App_Button'

export default {
	name: 'project-create-form',

	components: {
		'app-btn': AppButton,
		'role-project': RoleProjectItem
	},

	data: () => ({
		model: {
			role_id: null,
			client: null,
			job_title: null,
			department: null,
			recruiter: null,
			description: null,
			projects: [],
			published: true
		},

		submitted: false
	}),

	computed: {
		...mapState({
			roleSaving: state => state.roles.roleSaving,
			roleClients: state => state.config.roleClients
		})
	},

	mounted () {
		this.model.role_id = this.$uuid.v4()
	},

	methods: {
		...mapActions({
			createRole: VUEX_ROLE_CREATE
		}),

		addProject () {
			this.model.projects.push({})
		},

		removeProjectCallback (id) {
			this.model.projects.splice(id, 1)
		},

		submitForm () {
			this.submitted = true

			this.model.projects = this.$refs.roleProjects.map(project => project.model)

			// Clean model before send
			Object.keys(this.model).forEach(k => {
				if (this.model[k] === null ||
					this.model[k] === undefined ||
					this.model[k].length === 0) delete this.model[k]
			})

			console.log(this.model)

			this.createRole(this.model)
		}
	}
}
</script>
