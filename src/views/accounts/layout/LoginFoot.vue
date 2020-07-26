<template>
  <div :class="footClass">
    <p>版权所有© 深圳市玖富网络科技有限公司丨粤ICP备17038015号-1</p>
  </div>
</template>

<script type="text/ecmascript-6">
import { isLandscape } from '@/utils/is'

export default {
  data () {
    return {
      isLandscape: false
    }
  },
  computed: {
    footClass() {
      return {
        'login-foot': true,
        'foot-landscape': this.isLandscape
      }
    }
  },
  methods: {
    bindOrientation() {
      // 先执行一次
      this.handleOrientation()
      // 事件触发
      window.addEventListener('orientationchange', this.handleOrientation)
      // 退出后摧毁实例
      this.$once('hook:beforeDestroy', function () {
        window.removeEventListener('orientationchange', this.handleOrientation)
      })
    },
    handleOrientation() {
      this.isLandscape = isLandscape()
    }
  },
  created() {
    this.bindOrientation()
  }
}
</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable'
@import '~assets/stylus/mixin'

.login-foot
  width 100%
  font-size 28px
  line-height 1em
  color #dcdcdc
  background #fff
  text-align center
  margin-top 38px
  padding-bottom 38px
  z-index 1

.foot-landscape
  position relative
</style>
