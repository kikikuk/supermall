// 防抖函数
export function   debounce(func,delay){
  let timer=null
  return function(...args){
    // 只要不是第一次就清空timer，直到最后一次,没有下一次函数来清空了，
    // 等到delay的时间到了函数func才会执行，但不一定只会执行一次，
    // 因为如果防抖的函数的间隔时间大于了delay的时间，那么也会执行，
    // 完全是有可能执行多次的，这取决于 delay 和 func被执行的时间间隔
    if(timer) clearTimeout(timer)
    timer= setTimeout(()=>{
      func.apply(this,args)
    },delay)
    }
  }


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