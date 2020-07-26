<template>
  <login-form :login-other="status"></login-form>
</template>

<script>
import loginForm from '../components/loginForm'

export default {
  name: 'login-other',
  data() {
    return {
      status: true
    }
  },
  components: {
    loginForm
  }
}
</script>