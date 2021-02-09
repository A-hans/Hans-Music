import {request} from "network/Request";


//获取音乐url
export function getMusicUrl(num){
  return request({
    url:"/song/url",
    isActive:true,
    params:{
      id:num,
      br:320000 //320Kbps码率播放
    }
  })
}

//获取歌词
export function getMusicLrc(num){
  return request({
    url:"/lyric",
    params:{
      id:num
    }
  })
}

//喜欢音乐
export function likeMusic(id,isLike){
  return request({
    url:"/like",
    params:{
      id:id,
      like:!isLike
    }
  })
}

//喜欢音乐列表
export function likelist(userId){
  return request({
    url:"/likelist",
    params:{
      uid:userId
    }
  })
}

