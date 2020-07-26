import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from './index'
import store from '@/store'
import storage from '@/utils/storage'
import userAgent from '@/utils/ua-parser'
import { KEY_USER_INFO, DEV } from '@/api/config'
import { getUserInfoAPP } from '@/native-app/native-api'

// 是否APP环境
const isApp = userAgent.isApp()
// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  store.commit('updateLoadingStatus', { isLoading: true })
  // 判断当前环境
  if (isApp) {
    // APP环境直接获取用户信息 -- 不存缓存
    getUserInfoAPP({
      success: (res) => {
        // 并修改手机字段统一为 --> phoneNum
        const result = JSON.parse(res.data)
        const { phoneNumber: phoneNum } = result
        store.dispatch('appLogin', { ...result, phoneNum })
          .then(() => {
            next()
          })
      }
    })
  } else {
    // 白名单
    if (to.matched.some(res => res.meta.whiteAuth)) {
      next()
    } else {
      // 用户信息
      const userInfo = storage.get(KEY_USER_INFO)
      // 判断是否登录
      if (userInfo) {
        // 检测用户信息是否失效
        store.dispatch('checkLogin')
          .then(() => {
            next()
          })
          .catch(() => {
            store.dispatch('fedLogout').then(() => {
              location.reload()
            })
          })
      } else {
        // 跳转到登录界面
        store.commit('updateLoadingStatus', { isLoading: false })
        // 根据编译环境区分是否调用本项目内登录注册模块
        if (DEV) {
          NProgress.start()
          next({
            name: 'login'
            // query: { redirect: to.fullPath },
            // replace: true
          })
        } else {
          const url = window.location.href.split('#')[0]
          const redirect_url = encodeURIComponent(url)
          window.location.href = window.USER_CENTER + `?redirect_url=${redirect_url}`
        }
      }
    }
  }
})

router.afterEach(transition => {
  store.commit('updateLoadingStatus', { isLoading: false })
  NProgress.done()
})
