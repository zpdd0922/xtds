/***************************
 * 处理数据格式化 信息
 ***************************/

/**
 * 银行卡 - 4位数字分割
 */
export function formateBankCard(val) {
  if (!val) return ''
  return val.replace(/(.{4})/g, '$1 ').replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 把输入的字符串转换为半角
 * input： Str 任意字符串
 * output：DBCStr 半角字符串
 * 说明：1、全角空格为12288，半角空格为32
        2、其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
*/
export function toDBC(Str) {
  if (!Str || (typeof Str === 'object')) return Str
  let DBCStr = ''
  for (let i = 0; i < Str.length; i++) {
    const c = Str.charCodeAt(i)
    if (c === 12288) {
      DBCStr += String.fromCharCode(32)
      continue
    }

    if (c > 65280 && c < 65375) {
      DBCStr += String.fromCharCode(c - 65248)
      continue
    }

    DBCStr += String.fromCharCode(c)
  }
  return DBCStr
}
