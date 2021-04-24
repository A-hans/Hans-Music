import {request} from "network/Request"

//获取热门搜索
export function getHotSearch(){
  return request({
    url:"/search/hot"
  })
}

//搜索结果,1为单曲,10专辑,100歌手,1000歌单
export function getSearchInfo(keyWord,type){
  return request({
    url:"/cloudsearch",
    isActive:true,
    params:{
      keywords:keyWord,
      limit:50, //默认30条
      type:type
    }
  })
}

//关键字搜搜
export function getKeyWordResult(keyWord){
  return request({
      url:"/search/suggest",
      params:{
        keywords:keyWord
      }
  })
}
