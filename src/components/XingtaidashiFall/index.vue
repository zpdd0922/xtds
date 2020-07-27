<template>
  <div class="xtds-case-fall">
    <div class="xtds-case-fall-wrap">
      <cube-slide :auto-play="false" :loop="false" ref="slide">
        <cube-slide-item>
          <case-info class="case-swipe" :xtdsCase="this.caseData.zhongyaoData" :isRise="false" slot="default">
            <div class="zhongyaoPic" slot="pic"></div>
          </case-info>
        </cube-slide-item>
        <cube-slide-item>
          <case-info class="case-swipe"  :xtdsCase="this.caseData.tiejianData" :isRise="false" slot="default">
            <div class="tiejianPic" slot="pic"></div>
          </case-info>
        </cube-slide-item>
        <cube-slide-item>
          <case-info class="case-swipe"  :xtdsCase="this.caseData.longguangData" :isRise="false" slot="default">
            <div class="longguangPic" slot="pic"></div>
          </case-info>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import CaseInfo from '../CaseInfo'
import { CASE_DATA } from './config.js'

export default {
  name: 'XingtaidashiFall',
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

  .xtds-case-fall
    position relative
    padding-top 40px
    overflow hidden

    &-wrap
      width 100%

      & .case-swipe
        width 620px

    & .zhongyaoPic
      bg-image('zhongyao')
    & .tiejianPic
      bg-image('tiejian')
    & .longguangPic
      bg-image('longguang')
</style>
