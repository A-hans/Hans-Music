import {request} from "./Request";

export function getLogin(num,psd){
  return request({
    method:"POST",
    url:"/login/cellphone",
    isActive:true,
    params:{
      phone:num,
      password:psd
    }

  })
}