import store from '@/store'
import { toast } from '@/utils/tips'
import { ERR_OK } from '../config'

/**
 * 仅支持请求头为application/json格式上传
 * 附带上传进度
 */

export const STATUS_UPLOADING = 'uploading'
export const STATUS_SUCCESS = 'success'
export const STATUS_ERROR = 'error'

export default function upload(url, options) {
  return new Promise((resolve, reject) => {
    const {
      imgType,
      callback,
      ...obj
    } = options

    // 若没有上传进度函数，直接显示loading菊花图
    if (!callback) {
      store.commit('updateLoadingStatus', { isLoading: true })
    }

    const xhr = new XMLHttpRequest()

    const sendData = JSON.stringify(obj)

    if (xhr.upload) {
      xhr.upload.onprogress = function progress(e) {
        if (e.total > 0) {
          e.percent = Math.floor(e.loaded / e.total * 100)
        }
        setStatus(e, STATUS_UPLOADING)
      }
    }

    xhr.onload = function onload(e) {
      if (xhr.status < 200 || xhr.status >= 300) {
        setStatus(e, STATUS_ERROR)
        return reject(setResponse())
      }

      const res = setResponse()
      const { code, message = '上传失败', result } = res
      if (code !== ERR_OK) {
        // -9999 未登录或者session已失效
        if (code === -9999) {
          toast({
            type: 'error',
            txt: '登录信息已失效，请先登录',
            callback: () => {
              // 前端登出 --> 清除缓存数据
              store.dispatch('fedLogout').then(() => {
                location.reload()
              })
            }
          })
        } else {
          toast({
            type: 'error',
            txt: message
          })
        }
        setStatus(e, STATUS_ERROR)
        return reject(res)
      }
      setStatus(e, STATUS_SUCCESS)
      return resolve(result)
    }

    xhr.onerror = function error(e) {
      setStatus(e, STATUS_ERROR)
      return reject(setResponse())
    }

    function setStatus(e, status) {
      e.status = status
      // 处理回调或者结束loading菊花图
      if (callback) {
        callback(imgType, e)
      } else {
        store.commit('updateLoadingStatus', { isLoading: false })
      }
    }

    function setResponse() {
      let response = xhr.responseText || xhr.response
      try {
        response = JSON.parse(response)
      } catch (e) { }
      return response
    }

    xhr.open('post', url, true)
    xhr.withCredentials = true
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.setRequestHeader('accept', 'application/json;charset=UTF-8')
    xhr.send(sendData)
  })
}