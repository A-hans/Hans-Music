import {request} from './Request';

//获取排行榜数据
export function getRankList(){
  return request({
    url:'/toplist'
  })
}