import { request } from "./Request";

//获取热门歌单标签
export function getHotListTag(){
  return request({
    url:'/playlist/hot'
  })
}

//获取所有歌单标签
export function getAllListTag(){
  return request({
    url:'/playlist/catlist'
  })
}

//获取各标签歌单列表
export function getAllList(type,num,time){
  return request({
    url:'/top/playlist',
    isActive:true,
    params:{
      cat:type,
      limit:num,
      offset:time
    }
  })
}