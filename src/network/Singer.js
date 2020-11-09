import { request } from "./Request";

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