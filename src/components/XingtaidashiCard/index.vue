<template>
  <div class="xtds-card-wrap">
    <slot name="head"></slot>
    <slot name="body"></slot>
  </div>
</template>

<script>
export default {
  name: 'XingtaidashiCard',
  data() {
    return {
      imageName: 'xtdsheadbg'
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~assets/stylus/mixin'
@import '~assets/stylus/variable'

.xtds-card-wrap {
  margin 0 26px 60px
  border-radius: 26px;
  box-shadow: 0px 6px 26px 0px rgba(92, 134, 241, 0.31);
  clearfix()
}
</style>
