<template>
  <div class="caseinfo-wrap">
    <div class="company">
      <h3>{{xtdsCase.companyName}}</h3>
      <div class="status">{{xtdsCase.status}}</div>
      <p>{{xtdsCase.statusDetail}}</p>
    </div>
    <div class="info">
      <div class="container">
        <p class="number">{{xtdsCase.highestNum}}</p>
        <p>{{xtdsCase.highest}}</p>
        <div class="questionmark"></div>
      </div>
      <div class="container r2l">
        <p>出现形态日期</p>
        <p>{{xtdsCase.dateDetail}}</p>
      </div>
      <div class="container">
        <p class="number">{{xtdsCase.expectationNum}}</p>
        <p>{{xtdsCase.expectation}}</p>
        <div class="questionmark"></div>
      </div>
      <div class="container r2l">
        <p>当天收市价格</p>
        <p>{{xtdsCase.closePrice}}</p>
      </div>
    </div>
    <div id="pic"></div>
  </div>
</template>

<script>
export default {
  name: 'CaseInfo',
  data() {
    return {
      xtdsCase: {
        companyName: '腾讯控股',
        status: '钻石底',
        statusDetail: '钻石底是看涨信号，通常预示着下跌趋势调整接近尾声。',
        highest: '累计最高涨幅',
        highestNum: '+31.1%',
        expectation: '形态预期涨幅',
        expectationNum: '+13.5%',
        dateDetail: '2019年12月10日',
        closePrice: '335.6',
        picName: 'tencent'
      }
    }
  },
  components: {},
  watch: {},
  mounted() {
    this.showBackgroundImage()
  },
  methods: {
    showBackgroundImage() {
      let ratio = window.devicePixelRatio
      let pic = document.getElementById('pic')
      pic.innerHTML = '123'
      if (ratio === 3) {
        pic.style.backgroundImage = `../../views/xingtaidashi/images/${this.xtdsCase.picName}@3x.png`
      } else {
        pic.style.backgroundImage = `../../views/xingtaidashi/images/${this.xtdsCase.picName}@2x.png`
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .caseinfo-wrap
    & p
      font-size 24px
      line-height 30px
      margin-top 14px
      color #666

    & .company
      margin-bottom 24px
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
        padding 5px 10px 5px
        color #fff
        border-radius 16px 16px 16px 0
        background-color #f8a55b

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
          color #ec7343

      & .r2l
        padding-top 16px
        text-align right

</style>
