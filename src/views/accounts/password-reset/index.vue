<template>
  <register-form :register-type="type" :placeholder="placeholder" :submit-text="text"></register-form>
</template>

<script>
import registerForm from '../components/registerForm'

export default {
  name: 'password-reset',
  data() {
    return {
      type: 2,
      text: '找回密码',
      placeholder: '请输入犇犇新密码（6-16位字符串）'
    }
  },
  components: {
    registerForm
  }
}
</script>