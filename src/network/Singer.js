import { request } from "./Request";

//获取歌手信息
export function getSingetList(num1,num2,word,num3,num4){
  return request({
    url:'/artist/list',
    isActive:true,  
    params:{
      type: num1,
      area: num2,
      initial: word,
      limit:num3,
      offset:num4
    },
  })
}

//获取歌手热门歌曲
export function getSingerHotSong(num){
  return request({
    url:'/artist/top/song',
    isActive:true,  
    params:{
      id:num
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
      id:num
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