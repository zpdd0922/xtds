<template>
  <div class="use-wrap" key="randomKey">
    <h3 v-if='isHead'>{{dataUse.head}}</h3>
    <p v-html="dataUse.content"></p>
    <div class="use-figure">
      <slot name='figure1'></slot>
      <slot name='figure2'></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XingtaidashiUse',
  data() {
    return {
      toggleHead: this.isHead || true,
      randomKey: Math.random()
    }
  },
  watch: {
    toggleHead() {
      this.randomKey = Math.random()
    }
  },
  props: {
    dataUse: {
      type: Object,
      default: function() {
        return {
          head: '标题',
          content: '详情'
        }
      }
    },
    isHead: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="stylus">
.use-wrap {
  margin 0px 38px 49px 38px
  & h3 {
    font-size: 32px;
    line-height: 32px;
    letter-spacing: 0px;
    font-weight bold
    color: #333333;
    margin-bottom 16px
  }
  & p {
    font-size: 26px;
    line-height: 42px;
    letter-spacing: 0px;
    color: #666666;
    margin-right -20px
  }
}
.use-figure {
  display flex
  justify-content space-between
  margin-top 22px
}
</style>
