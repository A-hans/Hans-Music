import { request } from "./Request";

//获取登录信息
export function getLogin(num, psd) {
  return request({
    method: "POST",
    url: "/login/cellphone",
    isActive: true,
    params: {
      phone: num,
      password: psd,
    }

  })
}

//获取用户听歌数据,type=1 week type=0 all
export function getUserRecord(id,num){
  return request({
    url:"/user/record",
    params:{
      uid:id,
      type:num
    }
  })
}

//获取用户歌单
export function getUserPlaylist(id){
  return request({
    url:"/user/playlist",
    isActive:true,
    params:{
      uid:id
    }
  })
}

//获取用户详情
export function getUserInfo(id){
  return request({
    url:"/user/detail",
    isActive:true,
    params:{
      uid:id
    }
  })
}

//获取用户等级
export function getUserLevel(){
  return request({
    url:"/user/level",
  })
}

//退出登录
export function userLogOut(){
  return request({
    url:"/logout"
  })
}

//获取登录状态
export function getLoginState(){
  return request({
    url:"/login/refresh"
  })
}