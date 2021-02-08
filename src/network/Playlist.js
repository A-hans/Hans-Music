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

//获取歌单详情数据
export function getPlaylistDetail(num){
  return request({
    url:'/playlist/detail',
    isActive:true,
    params:{
    id:num
  }
  })
} 

//获取歌曲详情
export function getSongDetail(id){
  return request({
    url:'/song/detail',
    isActive:true,
    params:{
      ids:id
    }
  })
}

//获取歌单热评信息(默认20条)
export function getCommentInfo(num){
  return request({
    url:"/comment/hot",
    isActive:true,
    params:{
      id:num,
      limit:10,
      type:2
    }
  })
}

//获取歌单收藏者
export function getPlaylistSubscriber(num){
  return request({
    url:'/playlist/subscribers',
    isActive:true,
    params:{
      id:num,
      limit:30 //默认为20
    }
  })
}
//获取相关歌单推荐
export function getRelatedList(num){
  return request({
    url:"/related/playlist",
    isActive:true,
    params:{
      id:num
    }
  })
}
