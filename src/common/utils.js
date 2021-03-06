//为解决刷新频繁的问题，使用防抖函数
export function debounce(func,delay){
  let timer=null;
  return function(){
    var context = this
    var args = arguments
    if(timer) clearTimeout(timer);
    timer=setTimeout(()=>{
      func.apply(context,args)
    },delay)
  }
}
//节流函数
export function throttle(fn,wait){
  var timer = null;
  return function(){
      var context = this;
      var args = arguments;
      if(!timer){
          timer = setTimeout(function(){
              fn.apply(context,args);
              timer = null;
          },wait)
      }
  }
}

//时间格式化函数
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

//播放量格式化函数(已用过滤器替代)
export function formartPlayCount(list){
  for (let item of list) {
    if (parseInt(item.playCount / 10000).toString().length >= 5) {
      item.playCount = parseInt(item.playCount / 100000000) + "亿";
    } else {
      item.playCount = parseInt(item.playCount / 10000) + "万";
    }
  }
}

