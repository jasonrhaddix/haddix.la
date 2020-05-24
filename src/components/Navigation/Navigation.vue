<template>
    <div :class="['navigation-container', {'open':navigationOpenState}, {'endabled':navigationIsEnabled}]">
		<div
			:class="['navigation-skrim', {'enabled':navigationOpenState}]"
			@click="toggleNavigationMenu" />
        <div class="navigation-poly">
            <nav>
				<template
					v-for="item in navItems">
					<navigation-item
					v-if="hasAccess(item)"
                    :key="`${item.label}-${$uuid.v4()}`"
                    v-match-route:class.active="item.routeName"
                    :text="item.label"
                    :styles="{ color:'#646468', fontSize:'3rem' }"
                    @click.native="navigateToRoute({ name: item.routeName })"/>
				</template>
            </nav>
        </div>
        <header :class="[{ open:headerState }]">
            <div class="header--logo-container">
                <div
                    class="app-logo"
                    @click="navigateToRoute({ name: 'home' })">
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
import { mapState, mapGetters, mapActions } from 'vuex'

import {
	VUEX_UI_NAVIGATION_TOGGLE_OPENSTATE,
	VUEX_UI_HEADER_LOGO
} from '@/store/constants/ui'
import {
	VUEX_ROUTING_PUSH_ROUTE
} from '@/store/constants/routing'

import sitenav from '@/config/sitenav'

import HamburgerMenu from '@/components/_global/Hamburger_Menu'
import NavigationItem from '@/components/Navigation/Navigation_Item'

export default {
	name: 'navigation',

	components: {
		'hamburger-menu': HamburgerMenu,
		'navigation-item': NavigationItem
	},

	data: () => ({
		navItems: sitenav
	}),

	computed: {
		...mapState({
			headerState: state => state.ui.headerState,
			navigationOpenState: state => state.ui.navigation.openState,
			navigationIsEnabled: state => state.ui.navigation.isEnabled,
			routeTitle: state => state.ui.navigation.title
		}),

		...mapGetters({
			appAuthenticated: 'appAuthenticated'
		}),

		headerLogo () {
			return VUEX_UI_HEADER_LOGO
		},

		hasAccess (item) {
			return item => {
				return (!item.needsAuth || (item.needsAuth && this.appAuthenticated))
			}
		},

		routeName () {
			return this.routeTitle ? this.routeTitle : this.$route.name
		}
	},

	methods: {
		...mapActions({
			toggleNavigationMenu: VUEX_UI_NAVIGATION_TOGGLE_OPENSTATE,
			navigateToRoute: VUEX_ROUTING_PUSH_ROUTE
		})
	}
}
</script>
