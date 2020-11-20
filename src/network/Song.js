import {request} from "network/Request";


//获取音乐url
export function getMusicUrl(num){
  return request({
    url:"/song/url",
    params:{
      id:num,
      br:128000 //128Kbps码率播放
    }
  })
}