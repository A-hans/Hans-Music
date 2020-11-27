import { request } from "./Request";

//获取登录信息
export function getLogin(num, psd) {
  return request({
    method: "POST",
    url: "/login/cellphone",
    isActive: true,
    params: {
      phone: num,
      password: psd
    }

  })
}

//获取用户听歌数据,type=1 week type=0 all
export function getUserRecord(id,num){
  return request({
    url:"/user/record",
    isActive:true,
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