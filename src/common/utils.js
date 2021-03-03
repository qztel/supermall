export function formatDate(date, fmt) {
  //在这里判断传入年的个数，也就是y
  //
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  //在这里判断传入字符串的个数，月是从0开始，所以需要加1
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
  //在这里，后面的月，日，时，分，秒，不能直接4/4 3:2:1
  //所以给所有传入的字符串，加上两个0，然后再截取传入字符串的长度
  //比如传入04，就会变成0004，然后再截取两位，变成04
  //比如传入4，就变成004，截取两位，就变成了04
  return ('00' + str).substr(str.length);
};
