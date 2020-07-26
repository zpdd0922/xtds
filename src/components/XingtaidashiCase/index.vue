<template>
  <div class="xtds-case-wrap">
    <div class="xtds-case-switch">
      <span>看涨形态</span>
      <span>看跌形态</span>
    </div>
    <xingtaidashi-rise></xingtaidashi-rise>
    <xingtaidashi-fall></xingtaidashi-fall>
  </div>
</template>

<script>
import XingtaidashiRise from '../XingtaidashiRise'
import XingtaidashiFall from '../XingtaidashiFall'

export default {
  name: 'XingtaidashiCase',
  components: {
    XingtaidashiRise,
    XingtaidashiFall
  }
}
</script>

<style lang="stylus">
@import '~assets/stylus/mixin'

.xtds-case-wrap
  margin 0 26px 60px
  background-color #ffffff
  box-shadow 0px 6px 26px 0px rgba(92, 134, 241, 0.31)
  border-radius 26px

  .xtds-case-switch
    display flex
    justify-content space-around
    align-items center
    height 69px
    background-color #3e5ffd
    box-shadow inset 0px 4px 0px 0px rgba(255, 255, 255, 0.4)
    border-radius 26px 26px 0px 0px

    & span
      display inline-block
      font-size 32px
      line-height 32px
      letter-spacing 0px
      color: #ffffff

</style>