module.exports ={
  configureWebpack: {
    resolve: {
      alias: {
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
        'store':'@/store'
      }
      } 
    },
    devServer: {
      proxy: {//解决跨域问题
          '/api': {
              // 此处的写法，目的是为了 将 /api 替换成 http://140.143.128.100:3000
              target: 'http://140.143.128.100:3000',
              // 允许跨域
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      }
  }
  }
