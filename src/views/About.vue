<template>
    <div class="about-view--container">
        <div class="about-view--inner">
            <div class="about-view--content">
                
                <div class="about--header">
                    <div class="header--photo-container">
                        <div class="header--photo">
                            <img :src="bioPhoto"/>
                        </div>
                    </div>
                    <div class="social-media--container">
                        <div class="social-media--list">
                            <font-awesome-icon :icon="['fab', 'github']" size="2x" />
                            <font-awesome-icon :icon="['fab', 'codepen']" size="2x" />
                            <font-awesome-icon :icon="['fab', 'twitter']" size="2x" />
                            <font-awesome-icon :icon="['fab', 'linkedin']" size="2x" />
                        </div>
                    </div>
                </div>

                <div class="section-divider" />

                <div class="about--bio">
                    <div className="about-bio--inner">
                        <h1>Hi, I'm jason</h1>
                        <p>I’m a front-end web developer currently living in Los Angeles. My main area of focus is building small and medium Javascript sites with some experience developing in enterprise level web applications. My  passion for development started with Flash/Actionscript in 2005 and eventually spread into HTML/CSS and Javascript, where working outside of a self-contained application framework has its challenges and its advantages. I love experiementing with trending web technologies including WebGL and WebRTC, and frameworks such as React and VueJS.</p>
                    </div>
                </div>

                <div class="section-divider" />

                <div class="about--skillset">
                    SKILLSET
                </div>

                <div class="section-divider" />

                <div class="about--experience">
                    EXPERIENCE
                </div>

                <div class="section-divider" />

                <div class="about--client-list">
                    CLIENT LIST
                </div>

                <div class="section-divider" />

                <div class="about--footer">
                    FOOTER
                </div>

            </div>
        </div>
    </div>
</template>


<script>
    import {
        VUEX_UI_ABOUT_BIO_PHOTO
    } from '@/store/constants/ui'

    export default {
        name: 'about-view',

        data:() => ({
           
        }),

        computed: {
            bioPhoto() { return VUEX_UI_ABOUT_BIO_PHOTO }
        },

        methods: {

        }
    }
</script>