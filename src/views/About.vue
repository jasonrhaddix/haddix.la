<template>
    <div class="about-view">
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
                            <a class="social-list" href="http://github.com/jasonrhaddix" target="_blank">
                                <font-awesome-icon :icon="['fab', 'github']" size="2x" />
                            </a>

                            <a class="social-list" href="https://codepen.io/Jasonrhaddix/" target="_blank">
                                 <font-awesome-icon :icon="['fab', 'codepen']" size="2x" />
                            </a>

                            <a class="social-list" href="https://twitter.com/jasonrhaddix" target="_blank">
                                <font-awesome-icon :icon="['fab', 'twitter']" size="2x" />
                            </a>

                            <a class="social-list" href="https://www.linkedin.com/in/jasonrhaddix/" target="_blank">
                                <font-awesome-icon :icon="['fab', 'linkedin']" size="2x" />
                            </a>
                        </div>
                    </div>
                </div>

                <div class="section-divider" />

                <div class="about--bio">
                    <div class="about-bio--inner">
                        <h2>Hi, I'm Jason Haddix</h2>
                        <p>I'm a Web Engineer living in the Los Angeles area where I develop web apps and creative projects for leading lifestyle and entertainment companies. I have previously lead developers, consulted with agencies and collaborated with many talented engineers and designers to create digital products for companies like Skechers, Universal Studios and Showtime. My experience as a developer has been highlighted with many projects that I can proudly add my name to. </p>
                        <p>My free time is spent with my family, tinkering with emerging technologies and spearfishing in our beautiful Pacific Ocean. I am eagerly looking forward to upcoming challenges to conquer.</p>
                    </div>
                </div>

                <div class="section-divider" />

                <!-- <div class="quote-container">
                    <blockquote>Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.</blockquote>
                    <p>Thomas A. Edison</p>
                </div>

                <div class="section-divider" /> -->

                <div class="section about--skillset">
                    <div class="section--title">
                        <h2>Skillset</h2>
                    </div>
                    <div class="subsection">
                        <h3>Languages | Frameworks | Libs</h3>
						<v-row class="about-items--list">
                            <v-col class="col-12 col-md-6 item-group">
                                <ul>
                                    <li><p>HTML</p></li>
                                    <li><p>CSS3 / SASS</p></li>
                                    <li><p>Javascript</p></li>
                                    <li><p>XML</p></li>
                                    <li><p>PHP</p></li>
                                    <li><p>JSON</p></li>
                                    <li><p>ReactJS</p></li>
                                    <li><p>Redux</p></li>
                                    <li><p>VueJS</p></li>
                                    <li><p>AngularJS</p></li>
                                </ul>
                            </v-col>

                            <v-col class="col-12 col-md-6 item-group">
                                <ul>
                                    <li><p>ActionScript</p></li>
                                    <li><p>Backbone-Marionette</p></li>
                                    <li><p>jQuery</p></li>
                                    <li><p>Handlebars / Mustache</p></li>
                                    <li><p>Bootstrap</p></li>
                                    <li><p>Grunt / Gulp</p></li>
                                    <li><p>NodeJS</p></li>
                                    <li><p>Yarn / NPM</p></li>
                                    <li><p>ThreeJS</p></li>
                                </ul>
                            </v-col>
						</v-row>
                    </div>

                    <div class="subsection">
                        <h3>Services</h3>
						<v-row class="about-items--list">
                            <v-col class="col-12 col-md-6 item-group">
                                <ul>
                                    <li><p>Git / GitHub</p></li>
                                    <li><p>RESTful APIs</p></li>
                                    <li><p>Google Cloud Platform</p></li>
                                    <li><p>Amazon Web Services</p></li>
                                    <li><p>Akamai CDN</p></li>
                                    <li><p>Atlassian / JIRA</p></li>
                                </ul>
                            </v-col>

                            <v-col class="col-12 col-md-6 item-group">
                                <ul>
                                    <li><p>Plesk / Paralells</p></li>
                                    <li><p>Wordpress</p></li>
                                    <li><p>Sizmek</p></li>
                                    <li><p>DoubleClick</p></li>
                                    <li><p>WAMP</p></li>
                                </ul>
                            </v-col>
						</v-row>
                    </div>

                    <div class="subsection">
						<h3>Applications</h3>
						<v-row class="about-items--list">
                            <v-col class="col-12 col-md-6 item-group">
                                <ul>
                                    <li><p>Photoshop</p></li>
                                    <li><p>Illustrator</p></li>
                                    <li><p>Sublime Text</p></li>
                                    <li><p>Git GUI / GitKraken</p></li>
                                    <li><p>After Effects</p></li>
                                    <li><p>Flash / Animate CC</p></li>
                                </ul>
                            </v-col>

                            <v-col class="col-12 col-md-6 item-group">
                                <ul>
                                    <li><p>Indesign</p></li>
                                    <li><p>Audition</p></li>
                                    <li><p>Particle Illusion</p></li>
                                    <li><p>PuTTy SSH</p></li>
                                </ul>
                            </v-col>
						</v-row>
					</div>
                </div>

                <div class="section-divider" />

                <div class="section about--experience">
                    <div class="section--title">
                        <h2>Experience</h2>
                    </div>

                    <div class="subsection">
                        <h3>The Branding Farm</h3>
                        <div class="about-experience-role"><h4>Engineer<span> | 2018 - PRESENT</span></h4></div>
                        <div class="about-experience-role"><h4>Contract Developer<span> | 2007 - 2018</span></h4></div>
                        <p class="description">The Branding Farm focuses mainly on lifestyle and entertainment clients - providing web applications and engaging experiences for their clients.</p>
                        <div class="about-section-experience-roles">
                            <p>Roles Included :</p>
                            <ul>
                                <li><p>Front-end development of web applications</p></li>
                                <li><p>Interactive Kiosk development</p></li>
                                <li><p>Updates to legacy Flash applications</p></li>
                                <li><p>Motion graphics creation</p></li>
                            </ul>
                        </div>
                    </div>

                    <div class="subsection">
                        <h3>Dot Squirrels</h3>
                        <div class="about-experience-role"><h4>Contract Developer<span> | 2016 - 2017</span></h4></div>
                        <p class="description">Dot Squirrels focuses mainly on retail and coporate websites with CMS integration.</p>
                        <div class="about-section-experience-roles">
                            <p>Roles Included :</p>
                            <ul>
                                <li><p>Front-end and Back-end development including custom Wordpress templates and backend CMS</p></li>
                                <li><p>Project concepting</p></li>
                                <li><p>Design and motion graphic work</p></li>
                            </ul>
                        </div>
                    </div>

                    <div class="subsection">
                        <h3>The Gary Group</h3>
                        <div class="about-experience-role"><h4>Senior Engineer<span> | 2013 - 2016</span></h4></div>
                        <div class="about-experience-role"><h4>Engineer / Creative Developer<span> | 2007 - 2013</span></h4></div>
                        <p class="description">The Gary Group handles a range of services that include web application development and advertising for a multitude of entertainment and retail clients.</p>
                        <div class="about-section-experience-roles">
                            <p>Roles Included :</p>
                            <ul>
                                <li><p>Heading development on projects and facilitating developers</p></li>
                                <li><p>Lead development of advertising products and integration</p></li>
                                <li><p>Working directly with management and creative to understand and execute clients needs</p></li>
                                <li><p>Setting up live broadcast events to be streamed over hundreds of products</p></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="section-divider" />

                <div class="section about--client-list">
                    <div class="client-list--inner">
                        <div class="section--title client-list--inner">
                            <h2>Notable Clients</h2>
                        </div>
                        <v-row class="client-list">
                            <v-col align-self="center" class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/universal.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/amazon.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/mgm-grand.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/skechers.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/nike-swoosh.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/itunes.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/fx.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/chevron.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/cirq-du-soleil.svg')" alt="">
                                </div>
                             </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/disney.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/propel.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/showtime.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/best-buy.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/cvs.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/directv.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/hbo.svg')" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-6 col-md-4 col-lg-3 client-item">
                                <div class="item">
                                    <img :src="require('@/assets/app/icons/client_logos/espn.svg')" alt="">
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </div>

                <div class="section-divider" />

                <div class="section about--footer">
                    <app-btn
                        light
                        label="Contact"
                        @click.native="navigateToRoute({ name:'contact' })"/>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import {
	VUEX_UI_ABOUT_BIO_PHOTO,
	VUEX_UI_LOGO_UNIVERSAL
} from '@/store/constants/ui'
import {
	VUEX_ROUTING_PUSH_ROUTE
} from '@/store/constants/routing'

import AppButton from '@/components/_global/App_Button'

export default {
	name: 'about-view',

	components: {
		'app-btn': AppButton
	},

	data: () => ({

	}),

	computed: {
		bioPhoto () { return VUEX_UI_ABOUT_BIO_PHOTO }
	},

	methods: {
		...mapActions({
			navigateToRoute: VUEX_ROUTING_PUSH_ROUTE
		}),

		navigateToExternalRoute (route) {
			window.location
		}
	}
}
</script>
