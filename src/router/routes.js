// 路由懒加载
const _import = file => () => import('@/views/' + file + '/index.vue')

// 路由配置表
/**
 * 路由参数meta详解
 * title          页面标题
 * whiteAuth      是否白名单（即不需登录）
 *
 */
const routes = [
  //  形态大师引导页
  {
    path: '/',
    name: 'xingtaidashi',
    component: _import('xingtaidashi'),
    meta: { title: '形态大师引导页', whiteAuth: true }
  }
]

export default routes
