// const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
	configureWebpack: {
		// plugins: [ new GenerateSW() ],
		optimization: {
			runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 30000,
				cacheGroups: {
					vendors: {
						reuseExistingChunk: true,
						test: /[\\/]node_modules[\\/]/,
						name (module) {
							const name = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)
							const packageName = (name !== null) ? name[1] : ''
							return `npm.${packageName.replace('@', '')}`
						}
					}
				}
			}
		}
	},

	pwa: {
		name: 'My App',
		themeColor: '#4DBA87',
		msTileColor: '#000000',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black',

		// configure the workbox plugin
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			// swSrc is required in InjectManifest mode.
			swSrc: 'src/serviceWorker.js'
			// ...other Workbox options...
		}
	},

	chainWebpack: config => {
		config.plugins.delete('prefetch')

		/* config.module
            .rule('css')
            .oneOf('module')
            .resourceQuery(/module/)
            .use('css-loader')
            .loader('css-loader')
            .options({
                sourceMap: false,
                importLoaders: 2,
                modules: true,
                localIdentName: '[name]-[hash]'
            }) */
	}
}
