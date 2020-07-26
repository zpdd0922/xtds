import axios from 'axios'

// 实例化
const instance = axios.create({
  responseType: 'json', // 数据格式
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json;charset=UTF-8' // json格式数据
  }
})

// http请求拦截器<pendding>
instance.interceptors.request.use(
  config => {
    // 防止get请求获取数据304缓存，必须保证状态为200
    if (config.method === 'get') {
      if (config.params) {
        config.params['_'] = +new Date()
      } else {
        config.params = { '_': +new Date() }
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http响应拦截器<done>
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance