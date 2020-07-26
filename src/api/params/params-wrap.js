import auth from './auth'

// api接口公用参数
const WRAP = (data = {}) => ({
  id: '1460807082451000167',
  sign: 'b97RhZF5d/w94qsQDgJJROF6XQs=',
  version: '1.0',
  requestSrc: auth.getDevice(),
  params: {
    sessionId: auth.getAuthToken(),
    ...data
  }
})

// 接口数据包裹层
const COMMON = (data = {}) => ({
  requestSrc: auth.getDevice(),
  params: {
    sessionId: auth.getAuthToken(),
    ...data
  }
})

// 获取开户相关选项数据字典@params str
// 'WEB_OCCUPATION_TYPE' 所属行业
const OPTIONS = (str) => ({
  params: {
    mark: str
  }
})

// 更新/绑定
const PHONE = (data = {}) => ({
  requestSrc: auth.getDevice(),
  sessionId: auth.getAuthToken(),
  ...data
})

export default {
  WRAP,
  OPTIONS,
  COMMON,
  PHONE
}
