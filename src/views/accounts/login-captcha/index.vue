<template>
  <login-captcha-form :submit-text="btnTxt"></login-captcha-form>
</template>

<script>
import loginCaptchaForm from '../components/loginCaptchaForm'

export default {
  name: 'login-captcha',
  data() {
    return {
      btnTxt: '登录'
    }
  },
  components: {
    loginCaptchaForm
  }
}
</script>