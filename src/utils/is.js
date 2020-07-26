/***************************
 * 处理类型参数判断的方法
 ***************************/

const toString = Object.prototype.toString

/**
 *  检查给定参数是否为数组
 * “使用Array.isArray()检查某个值是否属于数组。”
 * Example:  isArray([10, 1, 5]) -> true
 */
export const isArray = val => !!val && Array.isArray(val)

/**
 *  检查给定参数是否为布尔元素
 * Example:  isBoolean(null) -> false
 * Example:  isBoolean(false) -> true
 */
export const isBool = val => typeof val === 'boolean'

/**
 *  检查给定参数是否为函数
 * Example:  isFunction('x') -> false
 * Example:  isFunction(x => x) -> true
 */
export const isFunction = val => val && typeof val === 'function'

/**
 *  检查给定参数是否为数字
 * Example:  isNumber('1') -> false
 * Example:  isNumber(1) -> true
 */
export const isNumber = val => typeof val === 'number'

/**
 *  检查给定参数是否为字符串
 * Example:  isString(10) -> false
 * Example:  isString('10') -> true
 */
export const isString = val => typeof val === 'string'

/**
 *  检查给定参数是否为Symbol类型
 * Example:  isSymbol('x') -> false
 * Example:  isSymbol(Symbol('x')) -> true
 */
export const isSymbol = val => typeof val === 'symbol'

/**
 *  检查给定参数是否为NaN
 * Example:  isSymbol('x') -> false
 * Example:  isSymbol(Symbol('x')) -> true
 */
export const isNaN = val => isNaN(val)

/**
 *  检查给定参数是否为对象
 */
export const isObj = val => Object(val) === val

/**
 *  检查给定参数是否为日期
 */
export const isDate = val => toString.call(val) === '[object Date]'

/**
 *  检查给定参数是DOM节点
 */
export const isDomNode = object => isObj(object) && object.nodeType > 0

/**
 *  检查给定参数是否为falsy值
 */
export const isFalsy = val => !val

/**
 *  检查给定参数是否为truthy值
 */
export const isTruthy = val => !!val

/**
 *  检查给定参数是否为奇数
 */
export const isEven = n => isNumber(n) && n % 2 === 0

/**
 *  检查给定参数是否为偶数
 */
export const isOdd = n => isNumber(n) && (n % 2 === 1 || n % 2 === -1)

/**
 *  检查设备是否是竖屏状态
 */
export const isVertical = () =>
  window.orientation === 180 || window.orientation === 0

/**
 *  检查设备是否是横屏状态
 */
export const isLandscape = () =>
  window.orientation === 90 || window.orientation === -90
