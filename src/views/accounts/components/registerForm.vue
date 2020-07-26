<template>
  <section class="login">
    <div class="login-form">
      <div class="form-item">
        <div class="item-input">
          <span @click="handleShowCountryList" class="item-country">
            +{{countryCode}}
          </span>
          <input v-model.trim="loginForm.certCode"
                 @blur="handlHackIosBlur"
                 type="text"
                 maxlength="20"
                 placeholder="请输入手机号码">
        </div>
        <div class="item-tips error-msg">{{loginRules.certCode.tips}}</div>
      </div>
      <div class="form-item">
        <div class="item-input">
          <input v-model.trim="loginForm.captcha"
                 @blur="handlHackIosBlur"
                 type="text"
                 maxlength="4"
                 placeholder="请输入短信验证码">
          <span :class="itemCodeClass" @click="handleSendCode">
            {{captchaTips}}
          </span>
        </div>
        <div class="item-tips error-msg">{{loginRules.captcha.tips}}</div>
      </div>
      <!-- 验证码滑块 -->
      <div class="form-item">
        <div class="slide-valid-block" id="_nc"></div>
        <div class="item-tips error-msg" v-if="isShowBlack"></div>
      </div>
      <div class="form-item">
        <div class="item-input">
          <input v-model.trim="loginForm.pwd"
                 @blur="handlHackIosBlur"
                 maxlength="16"
                 :type="passwordType"
                 :placeholder="placeholder">
          <span class="item-icon" @click="handleTogglePassword">
            <i :class="iconEyeClass"></i>
          </span>
        </div>
        <div class="item-tips error-msg">{{loginRules.pwd.tips}}</div>
      </div>

      <div class="form-item form-btn">
        <cube-button :disabled="isDisabled" @click="handleSubmit">{{submitText}}</cube-button>
      </div>
    </div>

    <template v-if="showCountryList">
      <country-list @selectItem="selectItem" />
    </template>
  </section>
</template>

<script type="text/ecmascript-6">
import { getURLParameters } from '@/utils/url'
import { toast } from '@/utils/tips'
import validate from '@/utils/validate'
import androidFocus from '@/mixins/android-focus'
import iosWXFocus from '@/mixins/ios-wx-focus'
import initNC from '@/utils/nc'

const defaultPassword = 'password'
const defaultTimeOut = 60
const defaultCountryCode = '86'
const defaultCaptchaTips = '获取验证码'

export default {
  mixins: [androidFocus, iosWXFocus],
  props: {
    registerType: {
      type: Number,
      default: 1
    },
    submitText: {
      type: String,
      default: '立即注册'
    },
    placeholder: {
      type: String,
      default: '请设置密码（6-16位字符）'
    }
  },
  data() {
    return {
      passwordType: defaultPassword,
      countryCode: defaultCountryCode,
      captchaTips: defaultCaptchaTips,
      showCountryList: false,
      isSendCode: false,
      timer: null,
      timeout: defaultTimeOut,
      loginForm: {
        certCode: '',
        pwd: '',
        captcha: '',
        eventId: 0
      },
      loginRules: {
        certCode: {
          tips: ''
        },
        pwd: {
          tips: ''
        },
        captcha: {
          tips: ''
        }
      },
      isShowBlack: false // 是否显示滑块
    }
  },
  computed: {
    query() {
      return this.$route.query
    },
    isCanSend() {
      return this.loginForm.certCode.length > 1
    },
    isDisabled() {
      const { certCode, pwd, captcha } = this.loginForm
      const result = certCode.length && pwd.length && captcha.length
      return result < 1
    },
    itemCodeClass() {
      return {
        'item-code': true,
        'active': this.isCanSend && !this.isSendCode
      }
    },
    iconEyeClass() {
      const hide = this.passwordType === defaultPassword
      return {
        'icon-eye': true,
        'icon-eye-close': hide,
        'icon-eye-open': !hide
      }
    }
  },
  methods: {
    handleShowCountryList() {
      this.showCountryList = true
    },
    selectItem(item) {
      const { value } = item
      this.countryCode = value
      this.showCountryList = false
    },
    handleSendCode() {
      if (this.isSendCode || !this.isCanSend) return false
      // 发送前 --> 校验手机是否合法
      const countryCode = this.countryCode
      const account = this.loginForm.certCode

      if (countryCode === defaultCountryCode && !validate.isMobile(account)) {
        this.loginRules.certCode.tips = '请输入有效的手机号码'
        return false
      } else {
        this.loginRules.certCode.tips = ''
      }

      if (!account) {
        this.loginRules.certCode.tips = '手机号码不能为空'
        return false
      } else {
        this.loginRules.certCode.tips = ''
      }
      const certCode = countryCode === defaultCountryCode ? account : `${countryCode}-${account}`
      const phoneParmas = { phoneNum: certCode }
      switch (this.registerType) {
      case 1:
        // 默认注册
        this.fetchRegister(phoneParmas)
        break
      case 2:
        // 找回密码
        this.fetchPasswordRest(phoneParmas)
        break
      default:
        this.fetchRegister(phoneParmas)
        break
      }
    },
    fetchRegister(phoneParmas) {
      // 检测手机号
      this.$store.dispatch('checkMobile', phoneParmas)
        .then(res => {
          const { isReg } = res
          if (isReg === 'Y') {
            toast({
              type: 'error',
              txt: '手机号已被其他用户注册',
              callback: () => {
                this.handleSendCodeFail()
              }
            })
            return false
          }

          this.fetchPasswordRest(phoneParmas)
        })
    },
    fetchPasswordRest(phoneParmas, sign) {
      // 是否启动滑块校验
      if (!this.isShowBlack) {
        this.isShowBlack = true
        this.NC.show()
      }
    },
    // 倒计时
    timeClock() {
      this.timeout--
      this.captchaTips = this.timeout + ' s'
      if (this.timeout <= 0) {
        this.handleSendCodeFail()
      }
    },
    handleSendCodeFail() {
      clearTimeout(this.timer)
      this.isSendCode = false
      this.timeout = defaultTimeOut
      this.captchaTips = defaultCaptchaTips
      this.isShowBlack = false
      this.NC.reset()
      this.NC.hide()
    },
    // 2.切换登录密码是否明文
    handleTogglePassword() {
      if (this.passwordType === defaultPassword) {
        this.passwordType = 'text'
      } else {
        this.passwordType = defaultPassword
      }
    },
    // 4.处理提交
    handleSubmit() {
      const isValid = this.chechFormRules()
      // 4.1验证通过
      if (isValid) {
        switch (this.registerType) {
        case 1:
          // 默认注册
          this.submitRegister()
          break
        case 2:
          // 找回密码
          this.submitPasswordReset()
          break
        case 3:
          // 手机号绑定
          this.submitPhoneBind()
          break
        default:
          this.submitRegister()
          break
        }
      }
    },
    submitPhoneBind() {
      const countryCode = this.countryCode
      const account = this.loginForm.certCode
      const phoneNum = countryCode === defaultCountryCode ? account : `${countryCode}-${account}`

      const params = Object.assign({}, this.loginForm, { phoneNum })
      this.$store.dispatch('updateMobile', params)
        .then(() => {
          toast({
            type: 'correct',
            txt: '绑定成功',
            callback: this.handleLoginSuccess
          })
        })
    },
    submitPasswordReset() {
      const countryCode = this.countryCode
      const newPwd = this.loginForm.pwd
      const account = this.loginForm.certCode
      const phoneNum = countryCode === defaultCountryCode ? account : `${countryCode}-${account}`

      const params = Object.assign({}, this.loginForm, { phoneNum, newPwd })
      this.$store.dispatch('resetPassword', params)
        .then(() => {
          toast({
            type: 'correct',
            txt: '操作成功，请返回重新登录',
            time: 1000,
            callback: this.handlePasswordSuccess
          })
        })
    },
    submitRegister() {
      const { channelId = 1, invUserId = 1, utm_source = 'Web', utm_medium = 'mobile-pc', sourceCode = '' } = getURLParameters()

      const countryCode = this.countryCode
      const account = this.loginForm.certCode
      const certCode = countryCode === defaultCountryCode ? account : `${countryCode}-${account}`
      const certType = 0

      const params = Object.assign({}, this.loginForm, { certCode, certType, invUserId, sourceCode, userSourceChannelId: channelId, regSourceType: utm_source, regSource: utm_medium })
      this.$store.dispatch('register', params)
        .then(res => {
          toast({
            type: 'correct',
            txt: '注册成功，请返回重新登录',
            time: 2000,
            callback: this.getUserType(this.handleLoginSuccess)
          })
        })
    },
    // 5.判断用户类型
    getUserType(callback) {
      this.$store.dispatch('getUserType')
        .then(res => {
          // 5.1判断用户
          if (res && res.type === 2) {
            // 5.1.1登出
            this.$store.dispatch('logout')
            // 5.1.2重定向去玖富股票APP下载
            location.href = window.STOCK_DOWNLOAD
          }
          // 5.2回调登录成功函数
          callback && callback()
        })
    },
    // 6.找回密码成功
    handlePasswordSuccess() {
      // 找回密码后 --> 登出 -> 回登录页 --> 重新登录
      this.$store.dispatch('logout')
        .then(() => {
          const { redirect = '/' } = this.query
          this.$router.replace({ name: 'login', query: { redirect } })
        })
    },
    // 7.登录成功后跳转页面
    handleLoginSuccess() {
      const { redirect = '/' } = this.query
      this.$router.replace({ path: redirect })
    },
    // 8.表单校验
    chechFormRules () {
      const { certCode, pwd, eventId, captcha } = this.loginForm

      if (!certCode) {
        this.loginRules.certCode.tips = '请输入有效的手机号码'
        return false
      } else {
        this.loginRules.certCode.tips = ''
      }

      if (eventId === 0) {
        this.loginRules.captcha.tips = '请先获取验证码'
        return false
      } else {
        this.loginRules.captcha.tips = ''
      }

      if (!captcha) {
        this.loginRules.captcha.tips = '请输入短信验证码'
        return false
      } else {
        this.loginRules.captcha.tips = ''
      }

      if (!pwd || pwd.length < 6 || pwd.length > 16) {
        this.loginRules.pwd.tips = '密码必须为6-16位字符'
        return false
      } else {
        this.loginRules.pwd.tips = ''
      }

      return true
    },
    // 启动滑块校验
    slideValid() {
      this.NC = initNC({
        callback: (data) => {
          // 启动倒计时
          clearTimeout(this.timer)
          this.timer = setInterval(() => this.timeClock(), 1000)
          const countryCode = this.countryCode
          const account = this.loginForm.certCode
          const certCode = countryCode === defaultCountryCode ? account : `${countryCode}-${account}`
          // 发送中
          this.isSendCode = true
          const codeParams = {
            certType: 0,
            phoneNum: certCode,
            ...data
          }
          this.$store.dispatch('sendCode', codeParams)
            .then(code => {
            // 发送完成
              const { eventId } = code
              this.loginForm.eventId = eventId
            })
            .catch(() => {
              this.handleSendCodeFail()
            })
        }
      })
    }
  },
  mounted() {
    this.slideValid()
  }
}
</script>

<style scoped lang="stylus">
.slide-valid-block
  margin-bottom 20px
.slide-valid-block >>> ._nc .stage1
  height 50px
.slide-valid-block >>> ._nc .stage1 .slider
  height 50px
  left 0
  right 0
.slide-valid-block >>> ._nc .stage1 .track div, .slide-valid-block >>> ._nc .stage1 .label
  line-height 50px
  height 50px
.slide-valid-block >>> ._nc .stage1 .button
  height 50px
</style>