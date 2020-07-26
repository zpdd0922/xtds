import Vue from 'vue'
import Vuex from 'vuex'

// 自动从modules文件读取模块
import modules from './modules'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules,
  strict: debug
})
