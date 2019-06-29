<template>
    <div class="login-container">
        <div class="login-drawer__container">
            <v-navigation-drawer
                fixed
                temporary
                class="login-drawer"
                v-model="openState">

                <div class="login-input__container">
                    <div
                        v-if="!appAuthenticated" 
                        class="login-input__inner">
                        <h3>Admin Login</h3>
                        <v-text-field
                            solo dark
                            label="Email"
                            type="email"
                            v-model="model.email"/>
                        <v-text-field
                            solo dark
                            label="Password"
                            type="password"
                            v-model="model.password"/>
                        <v-btn
                            class="auth-btn login-btn"
                            :disabled="appAuthenticated"
                            :loading="isAuthorizing"
                            color="primary"
                            @click="submitCredentials">Login</v-btn>
                    </div>
                    <div 
                        v-else
                        class="login-input__inner">
                        <h3>You're currently logged in</h3>
                        <v-btn
                            class="auth-btn logout-btn"
                            color="primary"
                            @click="logout">Logout</v-btn>
                    </div>
                </div>

            </v-navigation-drawer>
        </div>

        <div class="login-btn__container">
            <v-btn
                flat fab small
                class="login-btn"
                @click="openLoginDrawer">
                <v-icon color="grey">vpn_key</v-icon>     
            </v-btn>           
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    import { 
        VUEX_UI_LOGIN_CONTAINER_SHOW
    } from '@/store/constants/ui'
    import { 
        VUEX_AUTH_REQUEST,
        VUEX_AUTH_LOGOUT
    } from '@/store/constants/auth'

    export default {
        name: 'login-container',

        data:() => ({
            model: {
                email: null,
                password: null
            }
        }),

        computed: {
            ...mapState({
                loginOpenState : state => state.ui.loginContainer.openState,
                isAuthorizing  : state => state.auth.authorizing
            }),

            ...mapGetters({
                appAuthenticated : 'appAuthenticated'
            }),

            openState: {
                get() { return this.loginOpenState },
                set(val) { this.$store.dispatch('VUEX_UI_LOGIN_CONTAINER_SET_STATE', val) }
            }
        },

        methods: {
            ...mapActions({
                openLoginDrawer : VUEX_UI_LOGIN_CONTAINER_SHOW,
                submitForAuth   : VUEX_AUTH_REQUEST,
                logout          : VUEX_AUTH_LOGOUT
            }),

            submitCredentials() {
                this.submitForAuth({...this.model})
            }
        }
    }
</script>
