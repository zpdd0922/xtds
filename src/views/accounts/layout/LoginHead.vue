<template>
  <div class="login-head">
    <div class="login-logo">
      <div class="logo-bg"></div>
    </div>
    <div class="login-tab">
      <template v-if="showLoginTab">
        <span :class="loginClassObj" @click="handleGoto('login')">登录</span>
        <span :class="registerClassObj" @click="handleGoto('register')">注册</span>
      </template>
      <template v-else>
        <span>{{$route.meta.title}}</span>
      </template>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    return {}
  },
  created() {
  },
  methods: {
    handleGoto(name) {
      const query = this.$route.query
      this.$router.push({ name, query })
    }
  },
  computed: {
    pathName() {
      return this.$route.name
    },
    showLoginTab() {
      return this.$route.meta.tabStatus
    },
    loginClassObj() {
      // 需要保持登录页相关的tab项高亮
      const isActive = this.pathName.indexOf('login') > -1
      return {
        'tab-item': true,
        'active': isActive
      }
    },
    registerClassObj() {
      const isActive = this.pathName === 'register'
      return {
        'tab-item': true,
        'active': isActive
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable'
@import '~assets/stylus/mixin'

.login-logo
  width 100%
  height 234px
  display flex
  justify-content center
  align-items center
  .logo-bg
    width 468px
    height 112px
    background url('../images/logo.png') center center no-repeat
    background-size 341px 76px

</style>
