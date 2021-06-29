
const path = require('path')
module.exports = {
    // 选项...
    outputDir:"docs",
    publicPath: './',
    lintOnSave: 'warning',

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
            path.resolve(__dirname, 'src/less/var.scss'),
        ]
      }
    }
}
