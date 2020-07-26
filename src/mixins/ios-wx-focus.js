/**
 *  针对微信环境内，IOS系统表单输入页，不足一屏时导致页面上滑
 */
import userAgent from '@/utils/ua-parser'
import { scrollToTop } from '@/utils/dom'

export default {
  methods: {
    handlHackIosBlur() {
      // 仅IOS系统微信环境
      if (!userAgent.isWX && !userAgent.isIOS) return false
      this.$nextTick(() => {
        scrollToTop()
      })
    }
  }
}
