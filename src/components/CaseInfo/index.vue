<template>
  <div class="caseinfo-wrap">
    <div class="company">
      <h3>{{xtdsCase.companyName}}</h3>
      <div class="status">{{xtdsCase.status}}</div>
      <p class="statusbox">{{xtdsCase.statusDetail}}</p>
    </div>
    <div class="info">
      <div class="container">
        <p :class='classObject'>{{xtdsCase.highestNum}}</p>
        <p>累计最高{{trend}}幅 <span class="questionmark" @click="popOut"></span></p>
      </div>
      <div class="container r2l">
        <p>出现形态日期</p>
        <p>{{xtdsCase.dateDetail}}</p>
      </div>
      <div class="container">
        <p :class="classObject">{{xtdsCase.expectationNum}}</p>
        <p>形态预期{{trend}}幅 <span class="questionmark" @click='popOut'></span></p>
      </div>
      <div class="container r2l">
        <p>当天收市价格</p>
        <p>{{xtdsCase.closePrice}}</p>
      </div>
    </div>
    <slot name="pic"></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CaseInfo',
  data() {
    return {
      classObject: {
        number: true,
        rise: this.isRise,
        fall: !this.isRise
      },
      trend: '涨'
    }
  },
  computed: {
    ...mapState(['caseInfo'])
  },
  props: {
    xtdsCase: {
      type: Object
    },
    isRise: {
      type: Boolean,
      default: true
    }
  },
  created() {
    if (!this.isRise) {
      this.trend = '跌'
    }
  },
  methods: {
    popOut() {
      this.$store.commit('changePop')
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~assets/stylus/mixin'

  .caseinfo-wrap
    padding 0px 40px 72px
    & p
      font-size 24px
      line-height 34px
      margin-top 10px
      color #666

      & span
        display inline-block
        bg-image('question')
        vertical-align top

    & .company
      margin-bottom 34px
      & h3
        display inline-block
        font-size 34px
        line-height 34px
        font-weight bold
        color #333333
        vertical-align middle

      & .status
        display inline-block
        margin-left 14px
        padding 7px 10px 5px
        color #fff
        border-radius 16px 16px 16px 0
        background-color #f8a55b

      & .statusbox
        height 50px
        margin-top 20px
        white-space normal

    & .info
      display flex
      justify-content space-between
      flex-wrap wrap

      & .container
        width 50%
        margin-bottom 22px

        & .number
          font-size 46px
          line-height 46px
          font-weight bold
        & .rise
          color #ec7343
        & .fall
          color #51ad6b

        & .questionmark
          bg-image('question')

      & .r2l
        padding-top 16px
        text-align right

</style>
