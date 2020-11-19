import {request} from "./Request";

//获取专辑详细信息
export function getAlbumDetail(num){
  return request ({
    url:"/album",
    isActive:true,
    params:{
      id:num
    }
  })
}

//获取专辑动态信息
export function getAlbumActiveInfo(num){
  return request ({
    url:"/album/detail/dynamic",
    isActive:true,
    params:{
      id:num
    }
  })
}
//获取专辑评论信息
export function getAlbumComment(num){
  return request ({
    url:"/comment/album",
    isActive:true,
    params:{
      id:num,
      limit:10//默认20条.只接收10条
    }
  })
}