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

							<a class="social-list" href="https://medium.com/@jasonrhaddix" target="_blank">
                                 <font-awesome-icon :icon="['fab', 'medium']" size="2x" />
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

                <div class="about-bio">
                    <div class="about-bio--inner">
                        <h2>Hi, I'm Jason R. Haddix</h2>
                        <p>I’m a Software Engineer with experience in development of high-traffic, data-intensive web applications with a focus on architecting systems for scalability. I’m looking to take ownership in projects I enjoy and to expand my skillset, while making a collaborative effort toward a central goal. In my free time I enjoy DIY projects and being in nature with my family.</p>
                    </div>
                </div>

                <div class="section-divider" />

				<div class="section about--experience">
                    <div class="section--title">
                        <h2>Experience</h2>
                    </div>

                    <div class="subsection">
                        <h3>The Branding Farm</h3>
                        <div class="about-experience-role"><h4>Lead Front-end Engineer<span> | 2018 - PRESENT</span></h4></div>
                        <div class="about-experience-role"><h4>Contract Engineer<span> | 2009 - 2018</span></h4></div>
                        <p class="description">The Branding Farm primarily builds data-driven, client facing web applications for corporate entities. </p>
                        <div class="about-section-experience-roles">
                            <p>Roles Included:</p>
                            <ul>
                                <li><p>Font-end systems design for maintainability</p></li>
                                <li><p>Supporting engineers through development sprints</p></li>
                                <li><p>Updates to legacy applications</p></li>
                            </ul>
                        </div>
                    </div>

                    <div class="subsection">
                        <h3>Dot Squirrels</h3>
                        <div class="about-experience-role"><h4>Contract Developer<span> | 2016 - 2017</span></h4></div>
                        <p class="description">Dot Squirrels focuses mainly on retail and corporate websites with CMS integrations.</p>
                        <div class="about-section-experience-roles">
                            <p>Roles Included:</p>
                            <ul>
                                <li><p>Front-end development and CMS integration</p></li>
                                <li><p>Project concepting for client pitches</p></li>
                                <li><p>Guiding Junior developers</p></li>
                            </ul>
                        </div>
                    </div>

                    <div class="subsection">
                        <h3>The Gary Group</h3>
                        <div class="about-experience-role"><h4>Senior Developer<span> | 2012 - 2016</span></h4></div>
                        <div class="about-experience-role"><h4>Creative Developer<span> | 2008 - 2012</span></h4></div>
                        <p class="description">The Gary Group provides a range of services that include website development and digital advertising for a multitude of entertainment and retail clients.</p>
                        <div class="about-section-experience-roles">
                            <p>Roles Included:</p>
                            <ul>
                                <li><p>Overseeing development of products</p></li>
                                <li><p>Working directly with management and creative to understand and execute the client's needs</p></li>
                                <li><p>End-to-end management of stream events to digital products</p></li>
                            </ul>
                        </div>
                    </div>
                </div>

				<div class="section-divider" />

                <div class="section about--skillset">
                    <div class="section--title">
                        <h2>Skillset</h2>
                    </div>
                    <div class="subsection">
                        <h3>Key Skills</h3>
						<v-row class="about-items--list">
                            <v-col class="col-12 col-md-6 item-group">
								<h4>Front-end:</h4>
                                <ul>
                                    <li><p>Systems Architecture for scalability</p></li>
                                    <li><p>Code-splitting and optimization</p></li>
                                    <li><p>Building Large-scale data-intensive web applications</p></li>
                                    <li><p>Diverse experience with JavaScript/CSS/UI frameworks</p></li>
                                    <li><p>Consuming/Creating/Testing RESTful APIs</p></li>
                                    <li><p>Cross-browser compatibility</p></li>
                                    <li><p>Debugging and troubleshooting</p></li>
                                    <li><p>Understanding of UI/UX</p></li>
                                </ul>
                            </v-col>

                            <v-col class="col-12 col-md-6 item-group">
								<h4>Back-end:</h4>
                                <ul>
                                    <li><p>Creating REST API end-points</p></li>
                                    <li><p>AWS (EC2, S3, RDS, CodePipline, CodeBuild, API Gateway)</p></li>
                                    <li><p>Provisioning local dev servers with VirtualBox/Homestead</p></li>
                                </ul>
                            </v-col>

							<v-col class="col-12 col-md-6 item-group">
								<h4>General:</h4>
								<ul>
									<li><p>VCS with Git/GitHub and BitBucket</p></li>
									<li><p>Agile Methodology</p></li>
									<li><p>Atlassian Suite (JIRA, BitBucket, Confluence)</p></li>
									<li><p>CI/CD integration</p></li>
									<li><p>Algorithms and traversing data structures</p></li>
									<li><p>Aptitude for learning new technologies</p></li>
								</ul>
							</v-col>
						</v-row>
                    </div>

                    <div class="subsection">
                        <h3>Technical Skills</h3>
						<v-row class="about-items--list">
                            <v-col class="col-12 col-md-6 item-group">
								<h4>Technical Proficiencies</h4>
                                <ul>
                                    <li><p>HTML / CSS • JavaScript (ES5/6/7)</p></li>
                                    <li><p>VueJS / Vuex • Sass/SCSS</p></li>
                                    <li><p>Bootstrap • Handlebars • Vuetify</p></li>
                                    <li><p>Webpack • Babel • Gulp • NodeJS • Express</p></li>
                                    <li><p>Yarn / NPM • Electron</p></li>
                                </ul>
                            </v-col>

                            <v-col class="col-12 col-md-6 item-group">
								<h4>Technical Experience</h4>
                                <ul>
                                    <li><p>React / Redux • Angular • Backbone / Marionette</p></li>
                                    <li><p>Foundation • Stylus • Grunt • ThreeJS</p></li>
                                    <li><p>PHP • Laravel • Composer</p></li>
                                </ul>
                            </v-col>
						</v-row>
                    </div>

					<div class="subsection">
                        <h3>Exploring Interests</h3>
						<v-row class="about-items--list">
                            <v-col class="col-12 col-md-2 item-group">
                                <ul>
                                    <li><p>GraphQL</p></li>
                                    <li><p>NUXT</p></li>
                                </ul>
                            </v-col>
							<v-col class="col-12 col-md-2 item-group">
                                <ul>
                                    <li><p>TensorflowJS</p></li>
                                    <li><p>Gatsby</p></li>
                                </ul>
                            </v-col>
							<v-col class="col-12 col-md-2 item-group">
                                <ul>
                                    <li><p>RUST for WebAssembly</p></li>
                                </ul>
                            </v-col>
						</v-row>
                    </div>
                </div>

				<div class="section-divider" />

                <div class="section about--about-site">
                    <div class="client-list--inner">
                        <div class="section--title client-list--inner">
                            <h2>About this Site</h2>
                        </div>
						<div class="subsection">
							<p>Before I begin digging into my stack for this website, I need to preface that, this site the exact inverse of the rule of Least Power. I set out to build my site as a dual purpose medium; for updating and displaying my most recent/fun projects, and as a proving ground for my current skillset.</p>

							<div class="about--about-section">
								<h4>Front-end:</h4>
								<ul>
									<li><span>JS Framework: </span>Vue.js</li>
									<li><span>CSS Pre-Processor: </span>Sass (SCSS)</li>
									<li><span>Compiler: </span>Babel</li>
									<li><span>Bundler: </span>Webpack</li>
								</ul>
							</div>

							<div class="about--about-section">
								<h4>Back-end:</h4>
								<ul>
									<li><span>PHP Framework: </span>Laravel</li>
									<li><span>REST API: </span>Laravel</li>
									<li><span>DB: </span>MySQL</li>
								</ul>
							</div>

							<div class="about--about-section">
								<h4>Build/Deploy Process</h4>
								<p>Since I have a detached front- and back-end, I have two separate development and build processes.</p>
								<p>For the back-end, I run Laravel locally using a Homestead image for VirtualBox server. I also spin up a local MySQL instance for my DB. I run the build locally and then deploy on an AWS EC2 using an ElasticBeanstalk instance - I deploy using the ElasticBeanstalk API.</p>
								<p>The front-end runs locally on Webpack (webpack-dev-server), and accesses the local Laravel REST API served by the VirtualBox back-end. For my build process, I implemented CI/CD using AWS CodeBuild connected to my GitHub repo. This allows me to simply push commits and AWS will build and deploy my code to an S3 bucket (served through CloudFront).</p>
								<p>I have a login feature (authenticated using JSON Web Tokens), which allows me add projects through a custom CMS on the font-end. The CMS is also accessible on the front-end as a guest, but projects created as a guest will only be alive for the duration of the session. If the user refreshed the site the project will be gone. This is done by giving the user a session token, creating projects under that token. If the session token doesn't match the project token, it is not displayed. Further more saving projects as a guest are to a different DB table as an authenticated user, thus allow me to keep my 'guest' projects from contaminating my actual project table. The CMS supports asset uploads to an AWS S3 buck.</p>
								<p>I've also added section for displaying my experiments. I can create a new experiment project through the CMS,  which is great for localizing content creation. I will (eventually) populate this section with some, hopefully cool, projects.</p>
								<p>Since this site is also a proving ground for my skills, I plan on eventually adding features to extend functionality. I'd like to try adding facial recognition for quick login using Google's Tensorflow library.</p>
								<p>There's a lot going on in this site, so, please enjoy!</p>
							</div>

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
	VUEX_UI_ABOUT_BIO_PHOTO
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

	computed: {
		bioPhoto () { return VUEX_UI_ABOUT_BIO_PHOTO }
	},

	methods: {
		...mapActions({
			navigateToRoute: VUEX_ROUTING_PUSH_ROUTE
		}),

		navigateToExternalRoute (route) {
			// window.location
		}
	}
}
</script>
