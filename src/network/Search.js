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
    url:"/search",
    isActive:true,
    params:{
      keywords:keyWord,
      limit:50, //默认30条
      type:type
    }
  })
}
