// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,

	parserOptions: {
		parser: 'babel-eslint'
	},

	env: {
		browser: true,
		node: true
	},
  
	"globals": {
		"HADDIX_APP_AUTHORIZATION_AUTHORIZED": 'readonly',
		"HADDIX_APP_AUTHORIZATION_NOT_AUTHORIZED": 'readonly',

		"HADDIX_PROJECT_TYPE__WORK": 'readonly',
		"HADDIX_PROJECT_TYPE__COLLAB": 'readonly',
		"HADDIX_PROJECT_TYPE__PERSONAL": 'readonly',
		"HADDIX_PROJECT_TYPE__EXPERIMENT": 'readonly',

		"HADDIX_CONTACT_STATUS__READY": 'readonly',
		"HADDIX_CONTACT_STATUS__PENDING": 'readonly',
		"HADDIX_CONTACT_STATUS__SUCCESS": 'readonly',
		"HADDIX_CONTACT_STATUS__FAILURE": 'readonly',

		"HADDIX_ATTACHMENT_USAGE_TYPE__THUMBNAIL": 'readonly',
		"HADDIX_ATTACHMENT_USAGE_TYPE__CAROUSEL": 'readonly',
		"HADDIX_ATTACHMENT_USAGE_TYPE__BODY": 'readonly',
		"HADDIX_ATTACHMENT_USAGE_TYPE__VIDEO": 'readonly',

		"HADDIX_ATTACHMENTS_S3_QUEUE_SIZE": 'readonly',

		"HADDIX_ATTACHMENT_TYPE__PROJECT": 'readonly',

		"HADDIX_UPLOAD_ATTACHMENT_STATUS__PENDING": 'readonly',
		"HADDIX_UPLOAD_ATTACHMENT_STATUS__STARTED": 'readonly',
		"HADDIX_UPLOAD_ATTACHMENT_STATUS__SUCCESS": 'readonly',
		"HADDIX_UPLOAD_ATTACHMENT_STATUS__FAILURE": 'readonly',

		"HADDIX_UPLOAD_S3_UPLOAD_STATUS__PENDING": 'readonly',
		"HADDIX_UPLOAD_S3_UPLOAD_STATUS__STARTED": 'readonly',
		"HADDIX_UPLOAD_S3_UPLOAD_STATUS__SUCCESS": 'readonly',
		"HADDIX_UPLOAD_S3_UPLOAD_STATUS__FAILURE": 'readonly'
	},

	extends: [
		// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
		// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
		'plugin:vue/essential', 
		// https://github.com/standard/standard/blob/master/docs/RULES-en.md
		'standard'
	],

	// required to lint *.vue files
	plugins: [
		'vue'
	],

	// add your custom rules here
	rules: {
		'generator-star-spacing': 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	},

	'extends': [
		'plugin:vue/essential',
		'standard',
		'@vue/standard'
	]
}
