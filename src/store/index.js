/**
* The root module of the Vuex store provides root level access to deep actions
* and choreographs more complex actions by composing them from other modules.
* @file
* @author Jason Haddix <jasonrhaddix@gmail.com>
*/
import Vue from 'vue'
import Vuex from 'vuex'

import logger from 'vuex/dist/logger'

import config from '@/store/modules/_config'

import auth from '@/store/modules/auth'
import app from '@/store/modules/app'
import attachment_upload from '@/store/modules/attachments/attachment_upload.js'
import attachment_queue_manager from '@/store/modules/attachments/attachment_queue_manager.js'
import notifications from  '@/store/modules/notifications'
import projects from '@/store/modules/projects'
import project_tree from '@/store/modules/projects/project_tree'
import routing from '@/store/modules/routing'
import ui from '@/store/modules/ui'


Vue.use(Vuex)


const debug = process.env.NODE_ENV !== 'production'


const store = new Vuex.Store({
    modules: {
        config,
        
        auth,
        app,
        attachment_upload,
        attachment_queue_manager,
        notifications,
        projects,
        project_tree,
        ui,
        routing
    },

    strict: debug,
    // plugins: process.env.NODE_ENV === 'development' ? [logger({ 'collapsed': true })] : []
})


export default store