import {request} from "./Request";

//获取专辑详细信息
export function getAlbumDetail(num){
  return request ({
    url:"/album",
    params:{
      id:num
    }
  })
}