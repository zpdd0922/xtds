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
          <input v-model.trim="loginForm.pwd"
                 @blur="handlHackIosBlur"
                 type="text"
                 maxlength="4"
                 placeholder="请输入短信验证码">
          <span :class="itemCodeClass" @click="handleSendCode">
            {{captchaTips}}
          </span>
        </div>
        <div class="item-tips error-msg">{{loginRules.pwd.tips}}</div>
      </div>
      <!-- 验证码滑块 -->
      <div class="form-item">
        <div class="slide-valid-block" id="_nc"></div>
        <div class="item-tips error-msg" v-if="isShowBlack"></div>
      </div>

      <template v-if="showCaptcha">
        <div class="form-item">
          <div class="item-input">
            <input v-model.trim="loginForm.captcha"
                   @blur="handlHackIosBlur"
                   type="text"
                   maxlength="6"
                   placeholder="请输入图形验证码">
            <img
              class="item-captcha"
              :src="captchaSrc"
              @click="handleCaptchaSrc"/>
          </div>
          <div class="item-tips error-msg">{{loginRules.captcha.tips}}</div>
        </div>
      </template>

      <div class="form-item">
        <div class="item-link">
          <router-link :to="{name: 'login', query }">账号密码登录</router-link>
        </div>
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
import { mapGetters } from 'vuex'
import { getURLParameters } from '@/utils/url'
import { toast } from '@/utils/tips'
import { HOST } from '@/api/config'
import validate from '@/utils/validate'
import androidFocus from '@/mixins/android-focus'
import iosWXFocus from '@/mixins/ios-wx-focus'
import initNC from '@/utils/nc'

const defaultTimeOut = 60
const defaultCountryCode = '86'
const defaultCaptchaTips = '获取验证码'
const defaultSrc = HOST + '/capt/showCaptcha.jpg?v='

export default {
  mixins: [androidFocus, iosWXFocus],
  props: {
    submitText: {
      type: String,
      default: '登录'
    }
  },
  data() {
    return {
      countryCode: defaultCountryCode,
      captchaTips: defaultCaptchaTips,
      showCountryList: false,
      isSendCode: false,
      timer: null,
      timeout: defaultTimeOut,
      captchaSrc: '',
      loginForm: {
        certCode: '',
        pwd: '',
        eventId: 0,
        captcha: ''
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
  created() {
    this.fetchNeedCaptcha()
  },
  computed: {
    ...mapGetters([
      'showCaptcha'
    ]),
    query() {
      return this.$route.query
    },
    isCanSend() {
      return this.loginForm.certCode.length > 1
    },
    isDisabled() {
      const { certCode, pwd, captcha } = this.loginForm
      const nocaptchaReg = certCode.length && pwd.length
      const result = this.showCaptcha ? (nocaptchaReg && captcha.length) : nocaptchaReg
      return result < 1
    },
    itemCodeClass() {
      return {
        'item-code': true,
        'active': this.isCanSend && !this.isSendCode
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
    // 1.检验是否需要图形验证码
    fetchNeedCaptcha() {
      this.$store.dispatch('needCaptcha')
        .then(res => {
          // 1.1成功则执行获取图形验证码
          res && this.handleCaptchaSrc()
        })
    },
    // 1.获取验证码
    handleCaptchaSrc() {
      this.captchaSrc = defaultSrc + Date.now()
    },
    // 3.获取短信验证码
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

      // // 启动倒计时
      // clearTimeout(this.timer)
      // this.timer = setInterval(() => this.timeClock(), 1000)

      // // 发送中
      // this.isSendCode = true
      const certCode = countryCode === defaultCountryCode ? account : `${countryCode}-${account}`
      const phoneParmas = { phoneNum: certCode }
      // 默认免密登录
      this.fetchCheckMobile(phoneParmas)
    },
    fetchCheckMobile(phoneParmas) {
      // 检测手机号
      this.$store.dispatch('checkMobile', phoneParmas)
        .then(res => {
          const { isReg } = res
          // 已注册
          if (isReg === 'Y') {
            this.fetchLoginCode(phoneParmas)
          } else {
            toast({
              type: 'warn',
              txt: '该手机号码尚未注册',
              callback: () => {
                this.handleSendCodeFail()
              }
            })
            return false
          }
        })
    },
    fetchLoginCode(phoneParmas) {
      // 是否启动滑块校验
      if (!this.isShowBlack) {
        this.isShowBlack = true
        this.NC.show()
      }

      // const codeParams = Object.assign({}, { certType: 0 }, phoneParmas)
      // this.$store.dispatch('sendCode', codeParams)
      //   .then(code => {
      //     // 发送完成
      //     const { eventId } = code
      //     this.loginForm.eventId = eventId
      //     toast({ txt: '发送成功', time: 1000 })
      //   })
      //   .catch(() => {
      //     this.handleSendCodeFail()
      //   })
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
    // 4.处理提交
    handleSubmit() {
      const isValid = this.chechFormRules()
      // 4.1验证通过
      if (isValid) {
        // 默认登录
        this.submitLogin()
      }
    },
    // 5.登录
    submitLogin() {
      const { invUserId = 1, sourceCode = '' } = getURLParameters()

      // 5.1对当前登录账户类型判断
      const countryCode = this.countryCode
      const account = this.loginForm.certCode
      const certCode = countryCode === defaultCountryCode ? account : `${countryCode}-${account}`

      const params = Object.assign({}, this.loginForm, { certCode, certType: 9, invUserId, sourceCode })
      this.$store.dispatch('login', params)
        .then(res => {
          // 5.2登录成功
          this.getUserType(this.handleLoginSuccess)
        })
        .catch(() => {
          // 5.3是否需要验证码
          this.fetchNeedCaptcha()
        })
    },
    // 6.判断用户类型
    getUserType(callback) {
      this.$store.dispatch('getUserType')
        .then(res => {
          // 6.1判断用户
          if (res && res.type === 2) {
            // 6.1.1登出
            this.$store.dispatch('logout')
            // 6.1.2重定向去玖富股票APP下载
            location.href = window.STOCK_DOWNLOAD
          }
          // 6.2回调登录成功函数
          callback && callback()
        })
    },
    // 7.登录成功后跳转页面
    handleLoginSuccess() {
      const { redirect = '/' } = this.query
      this.$router.replace({ path: redirect })
    },
    // 8.表单校验
    chechFormRules () {
      const { certCode, eventId, pwd, captcha } = this.loginForm

      if (!certCode) {
        this.loginRules.certCode.tips = '请输入有效的手机号码'
        return false
      } else {
        this.loginRules.certCode.tips = ''
      }

      if (eventId === 0) {
        this.loginRules.pwd.tips = '请先获取验证码'
        return false
      } else {
        this.loginRules.pwd.tips = ''
      }

      if (!pwd) {
        this.loginRules.pwd.tips = '请输入短信验证码'
        return false
      } else {
        this.loginRules.pwd.tips = ''
      }

      if (this.showCaptcha && !captcha) {
        this.loginRules.captcha.tips = '请输入图形验证码'
        return false
      } else {
        this.loginRules.captcha.tips = ''
      }

      return true
    },
    slideValid() {
      this.NC = initNC({
        callback: (data) => {
          // 启动倒计时
          clearTimeout(this.timer)
          this.timer = setInterval(() => this.timeClock(), 1000)
          // 发送中
          this.isSendCode = true
          const countryCode = this.countryCode
          const account = this.loginForm.certCode
          const certCode = countryCode === defaultCountryCode ? account : `${countryCode}-${account}`
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
              toast({ txt: '发送成功', time: 1000 })
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