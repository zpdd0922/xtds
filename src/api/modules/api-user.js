import apiAsync from '../axios'
import { InterFaceUrl } from '../config'

export default {

  /**
   * 获取用户IP
   *  0 香港 1 大陆
   */
  getIpAddr: () => apiAsync({
    method: 'get',
    url: InterFaceUrl('/user_api/get_ip_addr')
  }),

  isMediaShow: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/is_media_show'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 是否登录
   *
   * @return JSON/Boolean
   */
  checkLogin: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/is_login'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 登录
   *
   * @param certCode 犇犇号/手机
   * @param pwd 密码
   * @param invUserId int 推荐人id,默认：1
   * @param captcha 验证码
   * @param sourceCode 活动渠道
   * @param certType 类型
   * 0 手机 | 1 邮箱 | 2 微信APP openId
   * 3 微博 | 4 QQ   | 5 微信uniconid
   * 6 微信公众号 |  7 交易账号 | 8 犇犇号
   *
   * @return JSON { code: integer, message: string, result: {} }
   */
  login: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/user_login'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 登出
   *
   * @return JSON { code: integer, message: string, result: {} }
   */
  logout: () => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/loginOut'),
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 是否需要图形验证码
   *
   * @return JSON { code: integer, message: string, result: true/false}
   */
  needCaptcha: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/capt/needCaptcha'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 注册
   *
   * @param certCode 手机号码
   * @param certType --> 0：手机
   * @param pwd 登录密码
   * @param captcha  验证码
   * @param eventId    验证码相关ID
   * @param userSourceChannelId  用户注册来源ID
   * @param invUserId  邀请人
   * @param regSourceType  注册来源
   * @param regSource  渠道
   * @param sourceCode  活动渠道
   *
   * @return JSON { code: integer, message: string, result: {}}
   */
  register: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/user_register'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 检查手机号码是否可用
   *
   * @param phoneNum 新手机号码
   *
   * @return JSON { code: integer, message: string, result: {}}
   */
  checkMobile: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/valid_phone'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 发送短信验证码
   *
   * @param certType 默认类型 --> 手机：0
   * @param phoneNum 手机号码
   *
   * @return JSON { code: integer, message: string, result: {eventId}}
   */
  sendCode: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/reg_valcode'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 检查验证码是否可用
   *
   * @param phoneNum 手机号码
   * @param eventId  验证码相关ID
   * @param captcha  验证码
   * @param certType 默认类型 --> 手机：0
   *
   */
  checkCode: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/repeat_valid_captcha'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 更换手机 --> 绑定手机
   *
   * @param phoneNum 新手机号码
   * @param certType 默认类型 --> 手机：0
   * @param captcha  验证码
   * @param pwd      登录密码
   * @param eventId   验证码相关ID
   * @param requestSrc  请求来源 --> 'H5':'APP'
   * @param sessionId  用户状态ID
   *
   * @return JSON { code: integer, message: string, result: {}}
   */
  updateMobile: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/update_user_phone_num'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 修改登录密码
   *
   * @param pwd 旧密码
   * @param newPwd 新密码
   *
   * @return JSON { code: integer, message: string, result: {} }
   */
  updatePassword: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/update_pwd'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 修改交易密码
   *
   * @param pwd 旧密码
   * @param newPwd 新密码
   *
   * @return JSON { code: integer, message: string, result: {} }
   */
  updateTradePassword: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/update_trade_pwd'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 获取用户渠道类别
   * @method POST/JSON user_api/find_chl_skip
   * @return JSON { code: integer, message: string, result }
   */
  getUserType: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/find_chl_skip'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  }),

  /**
   * 忘记密码 --> 重置登录密码
   *
   * @param phoneNum 手机号码
   * @param captcha 验证码
   * @param newPwd 新密码
   * @param eventId   验证码相关ID
   */
  resetPassword: data => apiAsync({
    method: 'post',
    url: InterFaceUrl('/user_api/user_back_pwd'),
    data: data,
    loading: true,
    catchs: true,
    toast: true
  })
}
