<template>
  <div class="home">
    <h1>玖富证券 - vue脚手架项目</h1>
    <cube-button @click.native="showDatePicker"
                 class="btn">
      Show DatePicker
    </cube-button>

    <cube-button :light="true"
                 :inline="true"
                 :outline="true"
                 @click="handleTestClick"
                 class="btn2">登录
    </cube-button>
    <template v-if="showInfo">
      <p>用户信息 ==> {{userInfo}}</p>
    </template>

    <template v-if="showInfo">
      <cube-button class="btn3" @click.native="handleLogout">
        退出登录
      </cube-button>
    </template>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DEV } from '@/api/config'

export default {
  data() {
    return {
      showInfo: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    // 点击按钮
    handleTestClick() {
      // 已登录情况下
      if (this.userInfo) {
        this.showInfo = !this.showInfo
      } else {
        if (DEV) {
          // 本地开发环境
          this.$router.push({ name: 'login' })
        } else {
          // 服务器地址
          const redirect_url = encodeURIComponent(location.href)
          window.location.href = window.USER_CENTER + `?redirect_url=${redirect_url}`
        }
      }
    },
    handleLogout() {
      this.$store.dispatch('logout')
        .then(() => {
          location.reload()
        })
    },
    // 触发时间选择
    showDatePicker() {
      this.$createDatePicker({
        title: 'Date Picker',
        min: new Date(2008, 7, 8),
        max: new Date(2020, 9, 20),
        value: new Date(),
        onSelect: this.selectHandle, // 确定回调
        onCancel: this.cancelHandle // 取消回调
      }).show()
    },
    selectHandle() {
      console.log('确定了')
    },
    cancelHandle() {
      console.log('取消了')
    }
  }
}
</script>

<style scoped lang="stylus">
@import './main'
</style>
