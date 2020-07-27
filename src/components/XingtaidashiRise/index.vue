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

    &-wrap
      width 100%

      & .case-swipe
        width 620px
        // float left
        
    & .tencentPic
      bg-image('tencent')
    & .meituanPic
      bg-image('meituan')
    & .xiaomiPic
      bg-image('xiaomi')
  // #my-dot
  //   background-color #d7d7d7
</style>
