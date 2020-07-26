
// 关于表单输入在安卓移动端底部定位浮起
// 通过input聚焦与失焦来控制起位置
import userAgent from '@/utils/ua-parser'

export default {
  computed: {
    isAndroid() {
      return userAgent.isAndroid()
    },
    footDom() {
      return document.querySelector('.login-foot')
    },
    footDomTop() {
      return this.footDom.offsetTop
    }
  },
  mounted() {
    this.isAndroid && this.handleAndroidInput()
  },
  methods: {
    handleAndroidInput: function () {
      const domInput = document.querySelectorAll('input')
      domInput.forEach(item => {
        item.addEventListener('focus', this.handleFocus, false)
        item.addEventListener('blur', this.handleBlur, false)
      })

      // 退出后解绑
      this.$once('hook:beforeDestroy', function () {
        domInput.forEach(item => {
          item.removeEventListener('focus', this.handleFocus, false)
          item.removeEventListener('blur', this.handleBlur, false)
        })
      })
    },
    handleFocus() {
      this.footDom.style = `top: ${this.footDomTop}px; bottom: auto;`
    },
    handleBlur() {
      this.footDom.style = ''
    }
  }
}
