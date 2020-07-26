// 应用类型标识。它和使用场景标识（scene字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在人机验证控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
export const APP_KEY = 'FFFF0N00000000008624'

// 使用场景标识。它和应用类型标识（appkey字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在人机验证控制台的配置管理页签找到对应的scene值，请务必正确填写。
export const SCENE = 'nc_message_h5'

/* eslint-disable */
export default function initNC({ callback }) {
  const ncToken = [APP_KEY, (new Date()).getTime(), Math.random()].join(':')
  const initParams = {
    // 声明滑动验证需要渲染的目标元素ID。
    renderTo: '#_nc',
    // 应用类型标识。它和使用场景标识（scene字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在人机验证控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
    appkey: APP_KEY,
    // 使用场景标识。它和应用类型标识（appkey字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在人机验证控制台的配置管理页签找到对应的scene值，请务必正确填写。
    scene: SCENE,
    // 滑动验证码的主键，请勿将该字段定义为固定值。确保每个用户每次打开页面时，其token值都是不同的。系统默认的格式为：”您的appkey”+”时间戳”+”随机数”。
    token: ncToken,
    // 是否自定义配置底层采集组件。如无特殊场景，请使用默认值（0），即不自定义配置底层采集组件。
    is_Opt: 0,
    // 语言，默认值为cn（中文）。HTML5应用类型默认支持简体中文、繁体中文、英文语言。
    language: 'cn',
    // 内部网络请求的超时时间。一般情况建议保持默认值（10000ms）。
    timeout: 10000,
    // 允许服务器超时重复次数，默认5次。
    retryTimes: 5,
    // 用于自定义滑动验证各项请求的接口地址。一般情况，请勿配置该参数。
    apimap: {
      // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
      // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
    },
    // 验证通过后，验证码组件是否自动隐藏，默认不隐藏（false）。
    bannerHidden: false,
    // 是否默认不渲染，默认值false。当设置为true时，不自动渲染，需要自行调用show方法进行渲染。
    initHidden: true,
    // 前端滑动验证通过时会触发该回调参数。您可以在该回调参数中将请求标识（token）、会话ID（sessionid）、签名串（sig）字段记录下来，随业务请求一同发送至您的服务端调用验签。
    callback: (data) => {
      callback && callback({
        afsSessionId: data.csessionid,
        sig: data.sig,
        token: ncToken
      })
    },
    error: function (s) {
    }
  }
  const nc = NoCaptcha.init(initParams)
  NoCaptcha.setEnabled(true)
  // 请务必在此处调用一次reset()方法。
  nc.reset()
  NoCaptcha.upLang('cn', {
    // 验证通过状态提示。
    'CHECK_Y': '验证成功',
    // 验证失败触发拦截状态提示。
    'ERROR_TITLE': '验证失败'
  })
  return nc
}
/* eslint-disable */
