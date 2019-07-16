module.exports = {
	presets: [
		"@babel/preset-env",
		['@vue/app', {
			polyfills: [
				'es6.promise',
				'es6.array.iterator',
				'es6.symbol',
				'es6.object.assign'
			]
		}]
	]
}