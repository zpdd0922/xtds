/***************************
 * 处理表单验证相关的一些常规方法
 * ↓↓↓↓↓↓↓ 使用正则判断 ↓↓↓↓↓↓↓
 ***************************/

export default {
  // 手机号码
  isMobile: str => {
    const reg = /^1[3-9]\d{9}$/
    return reg.test(str)
  },
  // 身份证号码
  isIdCard: str => {
    const reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
    return reg.test(str)
  },
  isChinese: str => {
    const reg = /[\u4e00-\u9fa5]+/gi
    return reg.test(str)
  }
}

export const reg = {}

// 匹配相应的正则码
const regexes = {
  // 仅中文
  chinese: /[\u4e00-\u9fa5]/gm,
  // 仅英文
  english: /^[a-z]+$/i,
  // 仅大写英文
  capitalized: /^[A-Z]+$/,
  // 仅数字
  number: /^\d+$/,
  // 邮箱
  email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  // 邮编
  postCode: /^[1-9]\d{5}(?!\d)$/,

  // 仅英文加数字
  alphaNumeric: /^[A-Za-z0-9]+$/,
  // IP
  ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
  // 身份证
  idCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
  // URL
  url: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
  // 日期(yy-MM-dd)
  date: /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/
}

const regexpCheck = regexp => {
  reg[regexp] = val => val !== null && regexes[regexp].test(val)
}

for (let reg in regexes) {
  regexes.hasOwnProperty(reg) && regexpCheck(reg)
}
