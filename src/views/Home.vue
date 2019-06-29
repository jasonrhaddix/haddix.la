<template>
    <div class="home-view">
        <sphere-bg class="sphere-bg" />
        
        <div class="home-view--content">
            <logo class="animated-logo" />
            <p>Portfolio for Jason R Haddix</p>
            <div class="divider" />
            <div class="view-work-btn">
                <app-btn 
                    label="View Works"
                    @click.native="navigateToRoute({ name:'projects' })"/>
            </div>
        </div>
        
    </div>
</template>


<script>
    import { mapActions } from 'vuex'

    import { 
        VUEX_ROUTING_PUSH_ROUTE
    } from '@/store/constants/routing'
    
    import SphereBG from '@/components/SphereBG/Sphere_BG'
    import Logo from '@/components/AnimatedLogo/Animated_Logo'
    import AppButton from '@/components/_global/App_Button'


    export default {
        name : 'home-view',

        components : {
            'sphere-bg' : SphereBG,
            'logo'      : Logo,
            'app-btn'   : AppButton
        },

        methods : {
            ...mapActions({
                navigateToRoute: VUEX_ROUTING_PUSH_ROUTE
            })
        }
    }
</script>
