import {request} from './Request';

//轮播图网络请求
export function getHomeBanner(){
  return request({
    url:'/banner',
    isActive:true
  })
}

//推荐歌单网络请求
export function getHomePlaylist(num){
  return request({
    url:'/personalized',
    params:{
    limit:num //接收需要多少条数据
    },
    isActive:true
  })
}

//推荐歌曲网络请求
export function getHomeRecommendSong(){
  return request({
    url:'/personalized/newsong',
    isActive:true
  })
}

//获取推荐歌手数据
export function getRecommendSinger(num1,num2){
  return request({
    url:'/top/artists',
    isActive:true,
    params:{
      offset: num1,
      limit: num2
    }
  })
}
