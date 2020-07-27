<template>
  <div class="xtds-case-rise">
    <div class="wrap">
      <case-info class="swipe" :xtdsCase="this.caseData.tencentData">
        <div class="tencentPic" slot="pic"></div>
      </case-info>
      <case-info class="swipe"  :xtdsCase="this.caseData.meituanData">
        <div class="meituanPic" slot="pic"></div>
      </case-info>
      <case-info class="swipe"  :xtdsCase="this.caseData.xiaomiData">
        <div class="xiaomiPic" slot="pic"></div>
      </case-info>
    </div>
  </div>
</template>

<script>
import CaseInfo from '../CaseInfo'
import { CASE_DATA } from './config.js'

export default {
  name: 'XingtaidashiRise',
  data() {
    return {
      caseData: CASE_DATA
    }
  },
  components: {
    CaseInfo
  },
  watch: {},
  mounted() {},
  methods: {

  }
}
</script>

<style scoped lang="stylus">
@import '~assets/stylus/mixin'

  .xtds-case-rise
    position relative
    padding-top 40px
    overflow hidden

    & .riseBtn
      position absolute
      top -85px
      z-index 2
      width: 388px;
      height: 85px;
      background: linear-gradient(87deg, #f3c946 0%, #ffe155 100%);
      box-shadow: inset -3px 3px 0px 0px rgba(255, 255, 255, 0.4);
      border-radius 26px 30px 0 0/26px 26px
      border-right rotate(30deg)
      &:after //斜边实现
        content: ''
        position absolute
        z-index 1
        bottom 0
        right -23px
        border-style solid
        border-width 69px 26px
        border-color transparent transparent #ffe155 transparent

    & .wrap
      display flex
      width 300%
      clearfix()

      & .swipe
        width 33%
        float left
        padding 0 40px

    & .tencentPic
      bg-image('tencent')
    & .meituanPic
      bg-image('meituan')
    & .xiaomiPic
      bg-image('xiaomi')
</style>
