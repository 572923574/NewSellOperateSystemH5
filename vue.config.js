const path = require('path');
module.exports = {
  devServer: {
    port: 80,
    // open: true, //浏览器自动打开页面
    // host: "localhost", //如果是真机测试，就使用这个IP
    // https: false,
    // hotOnly: false, //热更新（webpack已实现了，这里false即可）
    // proxy: {
    //   //配置跨域
    //   '/api': {//路径别名
    //     target: "https://dev.sentree.shop/mts-spa/spa", //目标路径
    //     ws:true, //是否支持ws协议
    //     changOrigin:true, //是否支持跨域
    //     pathRewrite:{
    //       '^/api':'' //重写路径
    //     }
    //   }
    // }
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
