//封装网路请求模块
import axios from 'axios'
import { Loading } from 'element-ui'

export function request(config) {
  //创建局部请求对象
  const instance = axios.create({
     baseURL:'http://140.143.128.100:3000',
    //  baseURL: 'https://nicemusic-api.lxhcool.cn/',
    timeout: 5000
  })
  
  //配置element Loading
  let loading;
  function startLoading() { 
    loading = Loading.service({
      lock: true,
      text: '加载中……',
      spinner:"el-icon-loading",
      customClass: 'create-isLoading',
      background: 'rgba(0, 0, 0, 0.1)'
    })
  }
  function endLoading() {
      loading.close();
  }

  // 请求拦截器
  instance.interceptors.request.use((config) => {
    //动态决定是否开启加载中
    if(config.isActive){
      startLoading();
    }
      return config;
      
    }, (err) => {
      return Promise.reject(err);
    })

// 响应拦截器
  instance.interceptors.response.use((res) => {

    if(config.isActive){
      endLoading();
    }
    return res.data;
    
  }, (err) => {
    return Promise.reject(err);
  })

  //instance本身就是一个promis对象
  return instance(config);
}