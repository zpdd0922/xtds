<template>
  <div class='xdts' ref='xtds'>
    <div class="xtds-top">
      <div class="xtds-top-logo"></div>
      <div class="xtds-top-head"></div>
      <div class="xtds-top-figure"></div>
    </div>
    <div class="xtds-body">
      <xingtaidashi-card class="xtds-body-info">
        <div class="xtds-body-info-head" slot='head'></div>
        <div class="xtds-body-info-content-wrap" slot="body">
          <div class="content">形态大师采用最新的人工智能技术，识别K线模式。将华尔街技术分析大师的上百种技术形态，与玖富犇犇APP的K线行情相结合，识别并提炼出个股K线上的典型形态，帮助用户在短时间内做趋势分析，提升用户的决策效率和投资收益表现。</div>
          <div class="front-quote"></div>
          <div class="back-quote"></div>
        </div>
      </xingtaidashi-card>
      <xingtaidashi-card class="xtds-body-adv">
        <div class="xtds-body-adv-head" slot='head'></div>
        <div class="xtds-body-adv-content-wrap" slot="body">
          <div class="content1">
            <div class="content1-figure"></div>
            <div class="content1-sup"></div>
            <h3>智能高效</h3>
            <p>上百种形态模型动态识别<br />每秒百亿次推演分析能力</p>
          </div>
          <div class="content2">
            <div class="content2-figure"></div>
            <div class="content2-sup"></div>
            <h3>权威先进</h3>
            <p>华尔街团队数十年打磨<br />运用先进的AI识别技术</p>
          </div>
          <div class="content3">
            <div class="content3-figure"></div>
            <div class="content3-sup"></div>
            <h3>简易操作</h3>
            <p>预测趋势及目标价<br />提升用户决策效率</p>
          </div>
        </div>
      </xingtaidashi-card>
      <div class="xtds-body-case-head"></div>
      <xingtaidashi-case></xingtaidashi-case>
      <xingtaidashi-card class="xtds-body-use">
        <div class="xtds-body-use-head" slot="head"></div>
        <div class="xtds-body-use-content" slot="body">
          <xingtaidashi-use :dataUse='dataUse[0]'>
            <div class="xtdsentry1" slot="figure1"></div>
            <div class="xtdsentry2" slot="figure2"></div>
          </xingtaidashi-use>
          <xingtaidashi-use :dataUse='dataUse[1]'>
            <div class="xtdshome1" slot="figure1"></div>
            <div class="xtdshome2" slot="figure2"></div>
          </xingtaidashi-use>
          <xingtaidashi-use :dataUse='dataUse[2]'>
            <div class="xtdsintro1" slot="figure1"></div>
            <div class="xtdsintro2" slot="figure2"></div>
          </xingtaidashi-use>
          <div class="tips">Tips</div>
          <xingtaidashi-use :dataUse='dataUse[3]' class="xtdstips" :isHead="false">
            <div class="xtdstips-figure" slot="figure1"></div>
          </xingtaidashi-use>
        </div>
      </xingtaidashi-card>
      <xingtaidashi-card class="xtds-body-quesion">
        <div class="xtds-body-question-head" slot="head"></div>
        <div class="xtds-body-question-content" slot="body">
          <div class="question-wrap">
            <div class="number">Q1</div>
            <h3>{{dataQuestion[0].question}}</h3>
            <p>{{dataQuestion[0].answer}}</p>
          </div>
          <div class="question-wrap">
            <div class="number">Q2</div>
            <h3>{{dataQuestion[1].question}}</h3>
            <p>{{dataQuestion[1].answer}}</p>
          </div>
          <div class="question-wrap">
            <div class="number">Q3</div>
            <h3>{{dataQuestion[2].question}}</h3>
            <p>{{dataQuestion[2].answer}}</p>
          </div>
        </div>
      </xingtaidashi-card>
      <div class="disclaimer">{{disclaimer}}</div>
      <div class="btn">限时免费开放体验</div>
    </div>
    <div class="popout-wrap" v-if="isPop">
      <div class="box">
        <div class="explaination">
          <h4>累计最高涨跌幅</h4>
          <p>指下一个形态出现之前的最高涨跌幅。</p>
          <h4>形态预期涨跌幅</h4>
          <p>指当前形态目标价的涨跌幅。</p>
        </div>
        <div class="known" @click='popIn'>我知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
import XingtaidashiCard from '../../components/XingtaidashiCard'
import XingtaidashiCase from '../../components/XingtaidashiCase'
import XingtaidashiUse from '../../components/XingtaidashiUse'
import { DATA_USE, DATA_QUESTION, DISCLAIMER } from './config'

export default {
  name: '',
  data() {
    return {
      dataUse: DATA_USE,
      dataQuestion: DATA_QUESTION,
      disclaimer: DISCLAIMER
    }
  },
  computed: {
    isPop() {
      return this.$store.state.isPop
    }
  },
  components: {
    XingtaidashiCard,
    XingtaidashiCase,
    XingtaidashiUse
  }
}
</script>

<style scoped lang="stylus">
@import '~assets/stylus/mixin'
@import '~assets/stylus/variable'

.xtds-top {
  position relative
  padding-top 25px
  bg-image('topbg')

  &-logo {
    margin-left 25px
    margin-bottom 30px
    bg-image('logo')
  }

  &-head {
    position relative
    margin: 0 auto 29px;
    z-index 2
    bg-image('head')
  }

  &-figure {
    position absolute
    bottom 12px
    left 50%
    transform translateX(-50%)
    z-index 1
    bg-image('figure')
  }
}

.xtds-body {
  &-info {
    &-head {
      position relative
      top -10px
      margin 0 auto 5px
      bg-image('xtdsinfo')
    }

    &-content-wrap {
      position relative
      width 607px
      height 228px
      margin-left 51px
      padding-bottom 70px

      .content {
        position relative
        vertical-align text-top
        font-size 26px
        line-height 48px
        letter-spacing 0px
        color #333333
        z-index 2
      }

      .front-quote {
        position absolute
        top -21px
        left -21px
        bg-image('frontquote')
        z-index 1
      }

      .back-quote {
        position absolute
        top 207px
        left 354px
        bg-image('backquote')
        z-index 1
      }
    }
  }

  &-adv {
    &-head {
      position relative
      top -10px
      margin 0 auto 63px
      bg-image('xtdsadv')
    }

    &-content-wrap {
      margin 0 80px
      clearfix()

      & h3 {
        font-size: 34px;
        line-height: 30px;
        letter-spacing: 0px;
        font-weight bold
        margin-bottom 20px
      }

      & p {
        font-size 26px
        line-height 42px
        letter-spacing 0px
        color #666666
      }

      .content1 {
        position relative
        margin-bottom 121px
        &-sup {
          position absolute
          left 102px
          top -30px
          bg-image('01')
        }
        &-figure {
          position absolute
          top -45px
          right 0
          bg-image('advfigure1')
        }
      }
      .content2 {
        position relative
        margin-right -16px
        margin-bottom 119px
        padding-left 294px
        &-sup {
          position absolute
          left 396px
          top -30px
          bg-image('02')
        }
        &-figure {
          position absolute
          left 0px
          bottom -18px
          bg-image('advfigure2')
        }
      }
      .content3 {
        position relative
        margin-bottom 78px
        &-sup {
          position absolute
          left 102px
          top -30px
          bg-image('03')
        }
        &-figure {
          position absolute
          right 0
          bottom -18px
          bg-image('advfigure3')
        }
      }
    }
  }

  &-case {
    &-head {
      margin 0 auto 38px
      bg-image('xtdscase')
    }
  }

  &-use {
    &-head {
      position relative
      top -10px
      margin 0 auto 7px
      bg-image('xtdsuse')
    }

    &-content {
      .xtdsentry1 {
        bg-image('xtdsentry1')
      }
      .xtdsentry2 {
        bg-image('xtdsentry2')
      }
      .xtdshome1 {
        bg-image('xtdshome1')
      }
      .xtdshome2 {
        bg-image('xtdshome2')
      }
      .xtdsintro1 {
        bg-image('xtdsintroduction1')
      }
      .xtdsintro2 {
        bg-image('xtdsintroduction2')
      }
      .xtdstips-figure {
        bg-image('tips')
      }

      & .tips {
        position relative
        width 47px
        margin 0 0 17px 38px
        padding 9px 10px 9px 10px
        background-color #f1f1f1
        font-size 24px
        line-height 24px
        color #666666
        border-radius 5px

        &:after {
          position absolute
          right -20px
          bottom 10 px
          content ''
          display block
          triangle(10px, #f1f1f1, right )
        }
      }
    }
  }

  &-question {
    &-head {
      position relative
      top -9px
      margin 0 auto 5px
      bg-image('xtdsquestion')
    }

    &-content {
      & h3{
        font-size: 32px;
        line-height: 42px;
        letter-spacing: 0px;
        font-weight bold
        color: #333333;
        margin-bottom 15px
      }
      & p {
        font-size: 26px;
        line-height: 42px;
        letter-spacing: 0px;
        color: #666666;
      }

      & .question-wrap{
        position relative
        width 546px
        margin 0 0 48px 106px

        & .number {
          position absolute
          left -64px
          padding 5px
          background-color #4c67eb
          font-size 30px
          line-height 30px
          font-weight bold
          color #ffffff
          &:after {
            position absolute
            left  0
            bottom -9px
            content ''
            display block
            triangle(10px, #4c67eb, right)
          }
        }
      }
    }
  }

  & .disclaimer {
    margin -26px 42px 40px
    font-size: 22px;
    line-height: 36px;
    letter-spacing: 0px;
    color: #afafaf;
  }

  & .btn {
    width 100vw
    height 100px
    background: linear-gradient(-79deg, #f3c946 0%, #ffe155 100%), linear-gradient(#ffffff, #ffffff);
    font-size 34px
    font-weight bold
    line-height 100px
    text-align center
    letter-spacing 0px
    color #925c0e
  }
}

.xtds
  & .popout-wrap
    position fixed
    left 0
    top 0
    bottom 0
    right 0
    background-color rgba(0,0,0,0.5)
    z-index 1000

    & .box
      position fixed
      left 50%
      top 50%
      width 620px
      height 403px
      transform translate(-50%, -50%)
      border-radius 10px
      overflow hidden

      & .explaination
        padding 49px 49px 9px 49px
        background-color #fff
        & h4
          font-size 30px
          line-hight 30px
          color #333
        & p
          margin 19px 0px 49px 0px
          font-size 26px
          line-height 26px
          color #666

      & .known
        height 100px
        font-size 32px
        line-height 100px
        text-align center
        color #fff
        letter-spacing 2px
        background-color #3e5ffd
</style>
