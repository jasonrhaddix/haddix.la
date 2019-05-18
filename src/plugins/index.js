/**
 * Plugins
 * 
 */
// Global imports
import Vue from 'vue'


/**
 * Fontawesome
 * 
 */
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











/**
 * Google Maps
 * 
 */
import * as VueGoogleMaps from 'vue2-google-maps'

export const gmaps = Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyDtY7XcAta9D76108tUv_JIOOfCFvvx-uQ',
		//libraries: 'places', // This is required if you use the Autocomplete plugin
		// OR: libraries: 'places,drawing'
		// OR: libraries: 'places,drawing,visualization'
		// (as you require)

		//// If you want to set the version, you can do so:
		// v: '3.26',
	},
   
	//// If you intend to programmatically custom event listener code
	//// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
	//// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
	//// you might need to turn this on.
	// autobindAllEvents: false,
   
	//// If you want to manually install components, e.g.
	//// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
	//// Vue.component('GmapMarker', GmapMarker)
	//// then disable the following:
	// installComponents: true,
  })