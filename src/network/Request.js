//封装网路请求模块
import axios from 'axios'

export function request(config) {
  //创建局部请求对象
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
  })

  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  //instance本身就是一个promis对象
  return instance(config);
}