import userAgent from '../utils/ua-parser'
import { getURLParameters } from '../utils/url'

window.JFClient_H5CallBack_O = {}

window.JFClient_H5CallBack_queue = {}

window.JFClient_H5_CallBack = (res) => {
  if (!res) {
    console.log('callBack null', res)
    return
  }
  if (res.data instanceof Object) {
    res.data = JSON.stringify(res.data)
  }

  const [funcName, msg] = res.msg.split(':')
  console.log('JFClient_H5_CallBack：', funcName, msg)

  // 1.js调用app的处理消息队列 - 执行完删除
  const arr = window.JFClient_H5CallBack_queue[funcName] || []
  const obj = arr.shift()
  console.log('JFClient_H5_CallBack - queue：', obj)
  if (msg.toLowerCase() === 'ok') {
    obj && typeof obj.success === 'function' && obj.success(res, msg)
  } else {
    obj && typeof obj.fail === 'function' && obj.fail(res, msg)
  }
  obj && typeof obj.complete === 'function' && obj.complete(res)

  // 2.处理app调用js方法回调 - 永久存在
  console.log('JFClient_H5_CallBack - register')
  if (msg.toLowerCase() === 'ok') {
    typeof window.JFClient_H5CallBack_O[`${funcName}_Success`] === 'function' &&
      window.JFClient_H5CallBack_O[`${funcName}_Success`](res, msg)
  } else {
    typeof window.JFClient_H5CallBack_O[`${funcName}_Fail`] === 'function' &&
      window.JFClient_H5CallBack_O[`${funcName}_Fail`](res, msg)
  }
  typeof window.JFClient_H5CallBack_O[`${funcName}_Complete`] === 'function' &&
    window.JFClient_H5CallBack_O[`${funcName}_Complete`](res)
}

class JsBridge {
  static setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }

    // 如果是在微信小程序端打开，则不创建iframe调用native方法并返回
    const getAllUrlParams = getURLParameters(window.location.href)
    if (getAllUrlParams && getAllUrlParams.isMp === '1') return

    window.WVJBCallbacks = [callback]
    const WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(() => document.documentElement.removeChild(WVJBIframe), 0)
    return null
  }

  // 消息队列回调函数
  static setCallBackQueue(funcName, { success, fail, complete }) {
    if (!window.JFClient_H5CallBack_queue[funcName]) {
      window.JFClient_H5CallBack_queue[funcName] = []
    }

    window.JFClient_H5CallBack_queue[funcName].push({ success, fail, complete })
  }

  // 回调函数
  static setCallBack(funcName, { success, fail, complete }) {
    if (success && typeof success === 'function') {
      window.JFClient_H5CallBack_O[`${funcName}_Success`] = success
    }
    if (fail && typeof fail === 'function') {
      window.JFClient_H5CallBack_O[`${funcName}_Fail`] = fail
    }
    if (complete && typeof complete === 'function') {
      window.JFClient_H5CallBack_O[`${funcName}_Complete`] = complete
    }
  }

  static toAndroid(funcName, params) {
    if (typeof window.JFNewClient === 'object' && typeof window.JFNewClient[funcName] === 'function') {
      window.JFNewClient[funcName](JSON.stringify(params))
    }
  }

  static toIOS(funcName, params) {
    JsBridge.setupWebViewJavascriptBridge(bridge => {
      bridge.callHandler('JFNewClient', { function: funcName, data: params }, (res) => {
        console.log(`[ callHandler ${funcName} success ]`, res)
        window.JFClient_H5_CallBack(res)
      })
      bridge.registerHandler('JFNewClient_Back', (data, responseCallback) => {
        console.log(`ios back ${funcName}`)
        window.JFClient_H5_CallBack(data)
      })
    })
  }

  static toIOSNew(funcName, params) {
    JsBridge.setupWebViewJavascriptBridge(bridge => {
      bridge.callHandler(funcName, { function: funcName, data: params }, (res) => {
        console.log(`IOSNew callHandler ${funcName} success`, res)
        window.JFClient_H5_CallBack(res)
      })
      bridge.registerHandler(funcName, (data, responseCallback) => {
        console.log(`IOSNew back ${funcName}`)
        window.JFClient_H5_CallBack(data)
      })
    })
  }

  // js调用 app方法
  static toApp(funcName, { success, fail, complete, ...params }, isNew) {
    if (!funcName) return false

    JsBridge.setCallBackQueue(funcName, { success, fail, complete })

    if (!userAgent.isIOS()) {
      JsBridge.toAndroid(funcName, params)
    } else if (isNew) {
      JsBridge.toIOSNew(funcName, params)
    } else {
      JsBridge.toIOS(funcName, params)
    }

    return true
  }

  // app调用 js方法注册
  static toRegister(funcName, { success, fail, complete }) {
    if (!funcName) return false

    // android
    JsBridge.setCallBack(funcName, { success, fail, complete })
    if (userAgent.isAndroid()) return false

    // ios
    JsBridge.setupWebViewJavascriptBridge((bridge) => {
      // 声明 app 需要调用的 JS 方法。
      bridge.registerHandler(funcName, (data, responseCallback) => {
        // data 是 app 传递过来的数据.
        // responseCallback 是 JS 调用完毕之后传递给 app 的数据
        if (success && typeof success === 'function') {
          success(data)
        }
      })
    })
  }
}

const JsToNative = (funcName, res, isNew) => {
  JsBridge.toApp(funcName, res, isNew)
}

const NativeToJs = (funcName, res = {}) => {
  JsBridge.toRegister(funcName, res)
}

JsToNative.NativeToJs = NativeToJs

export default JsToNative