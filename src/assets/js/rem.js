const BASE_SIZE = 100 // 基准大小
const DEVICE_WIDTH = 750 // 设备宽度

// 设置 rem 函数
const setRem = () => {
  const scale = document.documentElement.clientWidth / DEVICE_WIDTH
  if (scale > 1) {
    // 最大尺寸
    document.documentElement.style.fontSize = BASE_SIZE + 'px'
  } else {
    // 最小尺寸
    document.documentElement.style.fontSize = BASE_SIZE * scale + 'px'
  }
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = setRem
