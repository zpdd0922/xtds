<template>
  <div class="full">
    <div class="login-container">
      <div class="container-wrap">
        <login-head></login-head>
        <login-main></login-main>
      </div>
      <login-foot></login-foot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { LoginHead, LoginMain, LoginFoot } from './layout'

export default {
  metaInfo() {
    return {
      title: this.$route.meta.title
    }
  },
  data () {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  components: {
    LoginHead,
    LoginMain,
    LoginFoot
  }
}
</script>

<style lang="stylus">
@import './main'
</style>
