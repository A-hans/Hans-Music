module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'store': '@/store'
      }
    }
  },
  devServer: { 
    //解决跨域问题
    proxy: {// 输入/api 让其去访问http://localhost:3000/api
    '/api': {
      target: 'http://47.115.119.92:3000', // 设置调用的接口域名和端口号 ( 设置代理目标)
      changeOrigin: true,//是否跨域
      pathRewrite: {
        '^/api': '' // 这是一个通配符，设置完了之后每个接口都要在前面加上/api（特别注意这一点）
      }
    }
  },
    open: true, //是否自动打开浏览器
    hotOnly: true //热更新
  }
}
