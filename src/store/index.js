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
import attachmentUpload from '@/store/modules/attachments/attachment_upload.js'
import attachmentQueueManager from '@/store/modules/attachments/attachment_queue_manager.js'
import contact from '@/store/modules/contact'
import notifications from '@/store/modules/notifications'
import projects from '@/store/modules/projects'
import projectTree from '@/store/modules/projects/project_tree'
import roles from '@/store/modules/roles'
import routing from '@/store/modules/routing'
import ui from '@/store/modules/ui'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
	modules: {
		config,

		auth,
		app,
		attachmentUpload,
		attachmentQueueManager,
		contact,
		notifications,
		projects,
		projectTree,
		roles,
		ui,
		routing
	},

	strict: debug,
	plugins: process.env.NODE_ENV === 'development' ? [logger({ 'collapsed': true })] : []
})

export default store
