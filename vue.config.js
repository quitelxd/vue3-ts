
const path = require('path')
module.exports = {
    // 选项...
    outputDir:"docs",
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    lintOnSave: 'warning',
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
            path.resolve(__dirname, 'src/less/var.scss'),
        ]
      }
    },

}
