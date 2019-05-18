<template>
    <div :class="['navigation-container', {open:navigationOpenState}]">
        <div class="navigation-poly">
            <nav>
                <ul>
                    <li 
                        v-for="item in navItems"
                        :key="`${item.label}-${$uuid.v4()}`"
                        v-match-route:class.active="item.routeName"
                        class="nav-btn"
                        @click="navigateToRoute(item.routeName)">
                        <div class="nav-button">
                            <h1>{{ item.label }}</h1>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        <header :class="[{ open:headerState }]">
            <div class="header--logo-container">
                <div 
                    class="app-logo"
                    @click="navigateToRoute('home')">
                    <img :src="headerLogo"/>
                </div>
                <div class="divider"/>
                <div class="breadcrumb">
                    <p>{{routeName}}</p>
                </div>
            </div>
            <div 
                class="nav-menu-button"
                @click="toggleNavigationMenu">
                <hamburger-menu :menu-state="navigationOpenState"/>
            </div>
        </header>
        
    </div>
</template>


<script>
    import { mapState, mapActions } from 'vuex'


    import {
        VUEX_UI_NAVIGATION_TOGGLE_OPENSTATE,
        VUEX_UI_HEADER_LOGO
    } from '@/store/constants/ui'
    import {
        VUEX_ROUTING_NAVIGATE_TO_ROUTE
    } from '@/store/constants/routing'


    import sitenav from '@/config/sitenav'

    import HamburgerMenu from '@/components/_global/Hamburger_Menu'

    export default {
        name: 'navigation',

        components: {
            'hamburger-menu' : HamburgerMenu    
        },

        data:() => ({
            navItems: sitenav
        }),

        computed: {
            ...mapState({
                headerState : state => state.ui.headerState,
                navigationOpenState : state => state.ui.navigation.openState 
            }),

            headerLogo() {
                return VUEX_UI_HEADER_LOGO
            },

            routeName(){
                let name = this.$route.name
                return name !== 'home' ? name : ''
            }
        },

        methods: {
            ...mapActions({
                toggleNavigationMenu : VUEX_UI_NAVIGATION_TOGGLE_OPENSTATE,
                navigateToRoute      : VUEX_ROUTING_NAVIGATE_TO_ROUTE
            })
        }
    }
</script>
