import Vue from 'vue'

import {  library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { 
	faGithub, 
	faTwitter, 
	faCodepen, 
	faLinkedin
} from '@fortawesome/free-brands-svg-icons'

library.add(faGithub)
library.add(faTwitter)
library.add(faCodepen)
library.add(faLinkedin)

export const fontawesome = Vue.component('font-awesome-icon', FontAwesomeIcon)