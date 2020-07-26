<template>
  <div id="app">
    <router-view/>
    <template v-if="isLoading">
      <loading />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$route.meta.title,
      titleTemplate: '%s - 玖富犇犇'
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.viewLoad.isLoading
    })
  }
}
</script>

<style lang="stylus">

</style>
