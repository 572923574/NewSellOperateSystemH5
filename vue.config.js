const path = require('path');
module.exports = {
  devServer: {
    port: 80
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
          patterns: [
            path.resolve(__dirname, './src/style/app.less')
      ]
    }
  }
}
