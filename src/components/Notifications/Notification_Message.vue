<template>
    <div class="notification-message">
        <div v-if="notificationIcon">
            <v-icon :color="notificationIcon.color">{{ notificationIcon.icon }}</v-icon>
        </div>
        <div>
            <p>{{ data.message }}</p>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'notification-message',

        props: {
            data: {
                type: Object,
                required: true,
                default: null
            }
        },

        computed: {
            notificationIcon() {
                if (!this.data.type) return null
                switch( this.data.type ) {
                    case 'success' :
                        return {
                            color : 'green',
                            icon  : 'check_circle'
                        }
                    case 'alert' :
                        return {
                            color : 'yellow',
                            icon  : 'warning'
                        }
                    case 'error' :
                        return {
                            color : 'red',
                            icon  : 'error'
                        }
                    default :
                        return null
                }
            }
        }
    }
</script>