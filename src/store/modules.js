/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('./', true, /index\.js$/)
const modules = {}

files.keys().forEach(filePath => {
  // 排除文件
  if (filePath === './index.js') return
  // 正则匹配取出模块名
  // 示例： 文件 ./user/index.js --> user
  const key = filePath.replace(/(\.\/|\/index\.js)/g, '')
  modules[key] = files(filePath).default
})

export default modules
