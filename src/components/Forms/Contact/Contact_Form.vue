<template>
    <div class="contact-form">
        <div class="contact--title">
            <h2>Drop Me a Line</h2>
        </div>
        <div class="contact--form">
            <v-row class="form-flield--name">
                <v-col class="py-0 col-12 col-sm-12 col-md-6">
                  <v-text-field
                      filled
                      label="First Name"
                      :error="$v.model.first_name.$invalid && submitted"
                      v-model="model.first_name" />
                </v-col>
                <v-col class="py-0 col-12 col-sm-12 col-md-6">
                  <v-text-field
                      filled
                      label="Last Name"
                      v-model="model.last_name" />
                </v-col>
            </v-row>
            <v-row>
                <v-col xs12 class="py-0">
                  <v-text-field
                    filled
                    label="Email"
                    :error="$v.model.email.$invalid && submitted"
                    v-model="model.email" />
                </v-col>
            </v-row>
            <v-row>
                <v-col xs12 class="py-0">
                  <v-textarea
                    filled
                    no-resize
                    label="Message"
                    :error="$v.model.message.$invalid && submitted"
                    v-model="model.message" />
                </v-col>
            </v-row>
            <div class="form-submit--container">
                <div class="form-submit__inner">
                    <v-progress-circular
                        v-if="mailSending"
                        indeterminate
                        class="progress__ind"
                        color="primary"
                        width="8"
                        size="38"/>
                    <app-btn
                        class="form-submit--btn"
                        light
                        label="Submit"
                        @click.native="sendEmail"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

import { mapState, mapActions } from 'vuex'

import {
	VUEX_CONTACT_SEND_EMAIL_REQUEST
} from '@/store/constants/contact'

import AppButton from '@/components/_global/App_Button'

export default {
	name: 'contact-form',

	components: {
		'app-btn': AppButton
	},

	data: () => ({
		model: {
			first_name: null,
			last_name: null,
			email: null,
			message: null
		},
		submitted: false
	}),

	validations: {
		model: {
			first_name: { required },
			email: { required, email },
			message: { required }
		}
	},

	computed: {
		...mapState({
			mailSending: state => state.contact.mailSending,
			mailStatus: state => state.contact.mailStatus
		})
	},

	methods: {
		...mapActions({
			submitForm: VUEX_CONTACT_SEND_EMAIL_REQUEST
		}),

		sendEmail () {
			this.submitted = true

			if (!this.$v.$invalid) {
				this.submitForm(this.model)
			}
		}
	},

	watch: {
		mailStatus: {
			deep: true,
			handler (val) {
				if (val === HADDIX_CONTACT_STATUS__READY) {
					this.submitted = false
					this.model = {
						first_name: null,
						last_name: null,
						email: null,
						message: null
					}
				}
			}
		}
	}
}
</script>
