<template>
  <register-form :register-type="type"></register-form>
</template>

<script>
import registerForm from '../components/registerForm'

export default {
  name: 'register',
  data() {
    return {
      type: 1
    }
  },
  components: {
    registerForm
  }
}
</script>