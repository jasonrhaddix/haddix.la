<template>
    <v-snackbar
        bottom right
        v-model="openState"
        :timeout="notificationTimeout"
        class="notifications-container"
        :vertical="false">

        <div class="notifications__content">
            <component :is="loadComponent" :data="notificationData"/>
        </div>

        <v-btn
            v-if="notificationTimeout == 0"
            small
            color="primary"
            class="notification__clear-btn"
            @click="clearNotification">OK</v-btn>

    </v-snackbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import {
	VUEX_NOTIFICATIONS_CLEAR_NOTIFICATION
} from '@/store/constants/notifications'

export default {
	name: 'notification-container',

	data: () => ({
		//
	}),

	computed: {
		...mapState({
			notificationsOpenState: state => state.ui.notificationsContainer.openState,
			notificationTimeout: state => state.ui.notificationsContainer.timeout,
			notificationData: state => state.ui.notificationsContainer.data,
			notificationsComponent: state => state.ui.notificationsContainer.component
		}),

		loadComponent () {
			return this.notificationsComponent ? this.$root.loadComponent(this.notificationsComponent) : null
		},

		openState: {
			get () { return this.notificationsOpenState },
			set (val) { this.$store.dispatch('VUEX_UI_NOTIFICATIONS_CONTAINER_SET_STATE', val) }
		}
	},

	methods: {
		...mapActions({
			clearNotification: VUEX_NOTIFICATIONS_CLEAR_NOTIFICATION
		})
	}
}
</script>
