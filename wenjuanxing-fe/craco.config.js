
// commonJS的导出语法
module.exports={
    webpack: {
    configure(webpackConfig) {
      if (webpackConfig.mode === 'production') {
        // 抽离公共代码，只在生产环境
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98,
            },
          },
        }
      }
      return webpackConfig
    },
  },
    // 开发环境下的server
    devServer:{
        // B端 前端
        // 设置端口号
        port:8000,
        // 代理 
        proxy:{ 
            // 当匹配到/api开头的路由
            // =>指向3001端口
            '/api':'http://localhost:3005'
        }
    }
}