<template>
  <div class="country-list">
    <cube-index-list :data="countryList">
      <cube-index-list-group
        v-for="(group, index) in countryList"
        :key="index"
        :group="group">
        <cube-index-list-item
          v-for="(item, index) in group.items"
          :key="index"
          :item="item"
          @select="selectItem">
          <div class="cube-index-list-item-def custom-item">
            <span class="custom-item-name">{{item.name}}</span>
            <span>+{{item.value}}</span>
          </div>
        </cube-index-list-item>
      </cube-index-list-group>
    </cube-index-list>
  </div>
</template>

<script type="text/ecmascript-6">
import countryList from './country-list'

export default {
  data () {
    return {
      countryList
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    selectItem(val) {
      this.$emit('selectItem', val)
    }
  }
}
</script>

<style scoped lang="stylus">

.country-list
  width 100%
  height 100%
  position fixed
  left 0
  top 0
  z-index 100
  background #fff

.custom-item
  display flex
  justify-content space-between
  padding-right 12%
  .custom-item-name
    text-overflow ellipsis
    white-space nowrap
    overflow hidden
</style>
