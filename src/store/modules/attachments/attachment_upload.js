import api from '@/api'
import s3 from '@/api/aws'

import {
    VUEX_UPLOAD_S3_REQUEST,
    VUEX_UPLOAD_S3_REQUEST_SUCCESS,
    VUEX_UPLOAD_S3_REQUEST_FAILURE,

    VUEX_UPLOAD_ATTACHMENT_REQUEST,
    VUEX_UPLOAD_ATTACHMENT_REQUEST_SUCCESS,
    VUEX_UPLOAD_ATTACHMENT_REQUEST_FAILURE
} from '@/store/constants/attachments/attachment_upload'
import {
    VUEX_ATTACHMENT_QUEUE_MANAGER_ASSIGN_S3_KEY,
    VUEX_ATTACHMENT_QUEUE_MANAGER_UPLOAD_PROGRESS,
    VUEX_ATTACHMENT_QUEUE_MANAGER_HANDLE_UPLOAD_RESULT,
    VUEX_ATTACHMENT_QUEUE_MANAGER_CHANGE_STATUS
} from '@/store/constants/attachments/attachment_queue_manager'



const state = {}


const getters = {}


const actions = {
    [VUEX_UPLOAD_S3_REQUEST]: ({dispatch, commit}, payload) => {

        dispatch(VUEX_ATTACHMENT_QUEUE_MANAGER_HANDLE_UPLOAD_RESULT, {
			hashId: payload.hashId,
			status: HADDIX_UPLOAD_S3_UPLOAD_STATUS__STARTED
		})

        let destinationFileKey = `files/${payload.project_id}/${payload.file_id}_${payload.filename}`

        dispatch(VUEX_ATTACHMENT_QUEUE_MANAGER_ASSIGN_S3_KEY, { 
			hashId: payload.hashId, 
			key:    destinationFileKey
		})
        
        const handleS3Response = async function(error, data) {
			if (error) {
				// S3 UPLOAD - FAILURE
				dispatch(VUEX_UPLOAD_S3_REQUEST_FAILURE, {
					hashId: payload.hashId,
					error: error
                })
			} else {
                // S3 UPLOAD - SUCCESS
                await dispatch(VUEX_UPLOAD_S3_REQUEST_SUCCESS, {
                    hashId: payload.hashId,
					data: data
                })
                
                // ATTACHMENT REQUEST
                dispatch(VUEX_UPLOAD_ATTACHMENT_REQUEST, {
                    hashId        : payload.hashId,
                    attachment_id : payload.file_id,
                    model_id      : payload.attach_to.model_id,
                    model         : payload.attach_to.model,
                    name          : payload.filename,
                    filename      : payload.filename,
                    usage_type    : payload.usage_type,
                    mimetype      : payload.file.type,
                    size          : payload.file.size,
                    uri           : payload.uri
                })
			}
        }
        
        const handleS3UploadProgress = function(evt) {
            commit(VUEX_ATTACHMENT_QUEUE_MANAGER_UPLOAD_PROGRESS, evt)
        }

        var params = {
			Key:  destinationFileKey,
			Body: payload.file,
			ACL:  'public-read',
		}

		var options = {
			partSize:  5 * 1024 * 1024,
			queueSize: 4
		}
        
        s3.upload(params, options, handleS3Response).on('httpUploadProgress', handleS3UploadProgress)
    },

    /**
	 * Amend the DB record upon success
	 */
	[VUEX_UPLOAD_S3_REQUEST_SUCCESS]: async({ commit, dispatch }, payload) => {

		dispatch(VUEX_ATTACHMENT_QUEUE_MANAGER_HANDLE_UPLOAD_RESULT, {
			hashId: payload.hashId,
			uri: payload.data.Location,
			status: HADDIX_UPLOAD_S3_UPLOAD_STATUS__SUCCESS
		})
	},

	/**
	 * Amend the DB record upon failure
	 */
	[VUEX_UPLOAD_S3_REQUEST_FAILURE]: async({ dispatch }, payload) => {
		dispatch(VUEX_ATTACHMENT_QUEUE_MANAGER_HANDLE_UPLOAD_RESULT, {
			hashId: payload.hashId,
			status: HADDIX_UPLOAD_S3_UPLOAD_STATUS__FAILURE
		})
    },

    [VUEX_UPLOAD_ATTACHMENT_REQUEST]: ({commit}, payload) => {
        commit(VUEX_ATTACHMENT_QUEUE_MANAGER_CHANGE_STATUS, {
            hashId: payload.hashId,
            status: HADDIX_UPLOAD_ATTACHMENT_STATUS__STARTED
        })

        api.post(`/attachments`, payload).then((response) => {
            console.log(response)
            commit(VUEX_ATTACHMENT_QUEUE_MANAGER_CHANGE_STATUS, {
                hashId: payload.hashId,
                status: HADDIX_UPLOAD_ATTACHMENT_STATUS__SUCCESS
            })
        }).catch((err) => {
            console.log(err)
            commit(VUEX_ATTACHMENT_QUEUE_MANAGER_CHANGE_STATUS, {
                hashId: payload.hashId,
                status: HADDIX_UPLOAD_ATTACHMENT_STATUS__FAILURE
            })
        })
    }
}


const mutations = {}


export default {
    state,
    getters,
    actions,
    mutations
}