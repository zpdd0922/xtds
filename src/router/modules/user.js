// 登陆注册用户主视图
import Accounts from '@/views/accounts/index'

// 用户登录注册路由模块
const userRouter = [
  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts,
    redirect: '/accounts/login',
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('@/views/accounts/login/index'),
        meta: { title: '登录', whiteAuth: true, tabStatus: true }
      },
      {
        name: 'login-captcha',
        path: 'login-captcha',
        component: () => import('@/views/accounts/login-captcha/index'),
        meta: { title: '免密登录', whiteAuth: true, tabStatus: true }
      },
      {
        name: 'login-other',
        path: 'login-other',
        component: () => import('@/views/accounts/login-other/index'),
        meta: { title: '境外手机号登录', whiteAuth: true, tabStatus: true }
      },
      {
        name: 'register',
        path: 'register',
        component: () => import('@/views/accounts/register/index'),
        meta: { title: '注册', whiteAuth: true, tabStatus: true }
      },
      {
        name: 'password-reset',
        path: 'password-reset',
        component: () => import('@/views/accounts/password-reset/index'),
        meta: { title: '忘记密码', whiteAuth: true, tabStatus: false }
      }
    ]
  }
]

export default userRouter