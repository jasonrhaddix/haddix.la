const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    runtimeCompiler: process.env.USE_RUNTIME_COMPILER,

    configureWebpack: {
        plugins: [
            new VuetifyLoaderPlugin()
        ]
    },

    chainWebpack : config => {

        config.module
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
            })
    }
}