/* eslint-disable no-undef */
define(() => {
  /**
 * 格式化时间 
 * @param {Date} date 
 * @param {*} fmt eg ("yyyy-MM-dd hh:mm:ss.S")
 * @desc 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)    * 
 */
  return (date, fmt) => {
    let day = ['日', '一', '二', '三', '四', '五', '六']
    let o = {
      'M+': date.getMonth() + 1, // 月份   
      'd+': date.getDate(), // 日   
      'h+': date.getHours(), // 小时   
      'm+': date.getMinutes(), // 分   
      's+': date.getSeconds(), // 秒   
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度   
      'S': date.getMilliseconds(), // 毫秒
      'w': day[date.getDay()]
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    }
    return fmt
  }
})
