<template>
  <div class="xtds-case-rise">
    <div class="xtds-case-rise-wrap">
      <cube-slide :auto-play="false" :loop="false" ref="slide">
        <cube-slide-item>
          <case-info class="case-swipe" :xtdsCase="this.caseData.tencentData" slot="default">
            <div class="tencentPic" slot="pic"></div>
          </case-info>
        </cube-slide-item>
        <cube-slide-item>
          <case-info class="case-swipe"  :xtdsCase="this.caseData.meituanData" slot="default">
            <div class="meituanPic" slot="pic"></div>
          </case-info>
        </cube-slide-item>
        <cube-slide-item>
          <case-info class="case-swipe"  :xtdsCase="this.caseData.xiaomiData" slot="default">
            <div class="xiaomiPic" slot="pic"></div>
          </case-info>
        </cube-slide-item>
        <template slot="dots" slot-scope="props">
          <span class="my-dot" :class="{ active: props.current === index}" v-for="(item, index) in props.dots" :key="index">{{index + 1}}</span>
        </template>
      </cube-slide>
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

    &-wrap
      width 100%
      // 修改小圆点样式
      &/deep/.cube-slide-dots
        bottom 13px
        & .my-dot
          height 10px
          border-radius 50%
          margin 0px 5px
          background-color #d7d7d7

        & .active
          background-color #4c67eb

      & .case-swipe
        width 620px

    & .tencentPic
      bg-image('tencent')
    & .meituanPic
      bg-image('meituan')
    & .xiaomiPic
      bg-image('xiaomi')

</style>
