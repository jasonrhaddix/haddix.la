/**
* The root module of the Vuex store provides root level access to deep actions
* and choreographs more complex actions by composing them from other modules.
* @file
* @author Jason Haddix <jasonrhaddix@gmail.com>
*/
import Vue from 'vue'
import Vuex from 'vuex'

import logger from 'vuex/dist/logger'

// ALERT: does this collide with name 'app' var on @/main.js
import app from '@/store/modules/app'
import ui from '@/store/modules/ui'
import routing from '@/store/modules/routing'


Vue.use(Vuex)


const debug = process.env.NODE_ENV !== 'production'


const store = new Vuex.Store({
    modules: {
        app,
        ui,
        routing
    },

    strict: debug,
    
    plugins: process.env.NODE_ENV === 'development' ? [logger({ 'collapsed': true })] : []
})


export default store