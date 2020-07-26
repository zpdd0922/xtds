<template>
  <login-form :login-other="status"></login-form>
</template>

<script>
import loginForm from '../components/loginForm'

export default {
  name: 'login',
  data() {
    return {
      status: false
    }
  },
  components: {
    loginForm
  }
}
</script>