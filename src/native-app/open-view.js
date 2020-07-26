import userAgent from '@/utils/ua-parser'
import { jumpUrl, jumpPage } from './native-api'

// 前端H5跳转
export function openUrl(url, options = {}) {
  // 默认配置
  const obj = {
    url,
    bottomTab: false, // 是否需要底部导航栏  //仅限于首页
    backHeader: true, // 是否需要后退按钮
    isFresh: false, // 是否下拉可刷新
    elasticBorder: true, // 是否弹性边框        //针对IOS
    isCloseBtn: true, // 是否关闭按钮
    isNeedHeader: true, // 是否需要头部
    isNewPage: true
  }

  // 合并参数
  const config = Object.assign({}, obj, options)
  // 在APP内屏蔽是否开新窗口, 参数为Y时打开新窗口
  if (userAgent.isApp()) {
    if (userAgent.isIOS()) {
      // ios
      console.log('ios-app')
      jumpUrl(config)
    } else if (userAgent.isAndroid()) {
      // andriod
      if (typeof window.JFNewClient === 'object' && typeof window.JFNewClient.jumpUrl === 'function') {
        console.log('andorid-JFNewClient')
        jumpUrl(config)
      } else {
        try {
          console.log('andorid-openaccount')
          window.OpenAccount.openAccount(url)
        } catch (e) {
          window.location.href = url
        }
      }
    }
  } else {
    window.location.href = url
  }
}

// 跳转app原生界面
export function openPage(name, callback) {
  jumpPage({
    name,
    success: res => {
      callback(res)
    }
  })
}