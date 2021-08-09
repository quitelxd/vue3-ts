
console.log("process.env.BASE_URL"+process.env.BASE_URL)
const path = require('path')
module.exports = {
    // 选项...
    outputDir:"docs",
    publicPath: process.env.BASE_URL,
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
