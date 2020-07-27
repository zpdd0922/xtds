<template>
  <div class="xtds-case-wrap">
    <div class="xtds-case-switch">
      <span @click="toggle">看涨形态</span>
      <span @click="toggle">看跌形态</span>
      <div class="riseBtn" v-show="this.isRise">看涨形态</div>
      <div class="fallBtn" v-show="!this.isRise">看跌形态</div>
    </div>
    <xingtaidashi-rise v-if="this.isRise"></xingtaidashi-rise>
    <xingtaidashi-fall v-if="!this.isRise"></xingtaidashi-fall>
  </div>
</template>

<script>
import XingtaidashiRise from '../XingtaidashiRise'
import XingtaidashiFall from '../XingtaidashiFall'

export default {
  name: 'XingtaidashiCase',
  data() {
    return {
      isRise: true
    }
  },
  components: {
    XingtaidashiRise,
    XingtaidashiFall
  },
  methods: {
    toggle(e) {
      this.isRise = !this.isRise
    }
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
    position relative
    display flex
    justify-content space-around
    align-items center
    height 69px
    background-color #3e5ffd
    box-shadow inset 0px 4px 0px 0px rgba(255, 255, 255, 0.4)
    border-radius 26px 26px 0px 0px

    & .riseBtn
        position absolute
        bottom 0px
        left 0px
        width: 388px;
        height: 85px;
        background: linear-gradient(87deg, #f3c946 0%, #ffe155 100%);
        box-shadow: inset -3px 3px 0px 0px rgba(255, 255, 255, 0.4);
        border-radius 26px 30px 0 0/26px 26px
        font-size 32px
        font-weight bold
        text-align center
        line-height 85px
        color #925c0e

        &::after //斜边实现
          content: ''
          position absolute
          bottom 0
          right -23px
          border-style solid
          border-width 69px 26px
          border-color transparent transparent #ffe155 transparent

      & .fallBtn
        position absolute
        bottom 0px
        right 0px
        width: 388px;
        height: 85px;
        background: linear-gradient(87deg, #f3c946 0%, #ffe155 100%)
        box-shadow: inset -3px 3px 0px 0px rgba(255, 255, 255, 0.4);
        border-radius 30px 26px 0 0/26px 26px
        font-size 32px
        font-weight bold
        text-align center
        line-height 85px
        color #925c0e

        &::before //斜边实现
          content: ''
          position absolute
          bottom 0
          left -23px
          border-style solid
          border-width 69px 26px
          border-color transparent transparent #f3c946 transparent

    & span
      display inline-block
      font-size 32px
      line-height 32px
      letter-spacing 0px
      color: #ffffff

</style>