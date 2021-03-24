import { request } from "./Request";

//获取歌手信息
export function getSingetList(typeNum,areaNum,initial,limit,offset){
  return request({
    url:'/artist/list',
    // isActive:true,  
    params:{
      type: typeNum,
      area: areaNum,
      initial: initial,
      limit:limit,
      offset:offset
    },
  })
}

//获取歌手热门歌曲
export function getSingerHotSong(num){
  return request({
    url:'/artist/top/song',
    isActive:true,  
    params:{
      id:num,
    }
  })
}

//获取歌手描述 
export function getSingerDesc(num){
  return request({
    url:'/artist/desc',
    isActive:true,  
    params:{
      id:num
    }
  })
}

//获取歌手专辑
export function getSingerAlbum(num){
  return request({
    url:'/artist/album',
    isActive:true,  
    params:{
      id:num,
      limit:12
    }
  })
}

//获取相似歌手 
export function getRelatedSinger(num){
  return request({
    url:'/simi/artist',
    isActive:true,  
    params:{
      id:num
    }
  })
}