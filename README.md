#  玖富Vue-cli种子项目介绍

# 概览

本脚手架主要针对玖富证券使用，已内置用户登录注册中心模块接口及视图；

1. 本项目默认配置请求测试地址，具体可查看[vue.config.js](./vue.config.js)文件，对代理地址target进行配置（`注意：`接口配置需与[api](./src/api/config/index.js)中定义的模块前缀一致）；

2. `注意：`本地用户登录注册模块仅适用于开发阶段，全局路由钩子[permission](./src/router/permission.js)中会对用户登录态判断，控制跳转不同地址；
    > 本地开发阶段 =>  本项目内登录注册视图
    > 服务器环境   =>  服务器环境用户模块项目*sunline-user-center*，具体可自行前往查看

3. 若项目不需要用户模块，可自行去除account目录，及其router内user模块视图；

4. 安装@babel/polyfill，兼容ES6 => ES5，如不需要兼容，可自行删除[入口](./src/main.js)；

## 命令操作

```
 npm install          安装依赖node_modules
```

```
 npm run dev          本地开发环境
```

```
 npm run build        打包编译
```

```
 npm run build:debug  打包编译 ==> 含vsconsole调试窗口
```

## 注入插件

+ **PostCss** => *支持px单位自动换算*
+ **Stylus + Stylus-loader** => *支持Stylus语法糖*
+ **VConsole** => *支持移动端调试控制台*
+ **Lodash-es**  => *支持Js工具库*
+ **NProgress** => *支持页面跳转顶部loading*
+ **axios**  => *支持ajax数据请求和数据劫持*
+ **mock.js** => *支持前端mock静态数据*
+ **.editorConfig** => *支持编辑器统一代码格式化*
+ **vue-meta**  => *支持SPA下单独设置页面title以及元信息*
+ **husky + lint-staged**  => *支持Git钩子验证*
+ **vue-lazyload**  => *支持图片懒加载*
+ **vuex**  => *支持状态管理器*
+ **vue-router** => *支持路由跳转管理*
+ ...

## Webpack 优化
+ **Happypack**  => *多进程打包*
+ **webpack-parallel-unglify-plugin** => *利用缓存快速压缩*
+ **webpack-deep-scope-plugin** => *提高webpack tree-shaking的效率*
+ **webpack-bundle-analyzer** =>  *文件结构可视化，找出导致体积过大的原因*
+ ...

## 目录结构


```
├── package.json					# npm包管理
├── .postcssrc.js					# postcss配置
├── .eslintrc.js					# eslint配置
├── .prettierrc						# prettier格式化规则配置
├── .stylelintrc.json				# stylelint规则配置
├── .editorconfig					# editorconfig配置
├── babel.config.js				    # babel配置文件
│── main.js                         # 项目入口文件
├── build		 					# webpack配置
│   ├── config.js					# 参数配置文件
│   ├── webpack.base.conf.js		# 公共打包执行任务
│   ├── webpack.dev.conf.js		    # 开发环境打包执行任务
│   └── webpack.prod.conf.js		# 生产环境打包执行任务
├── public
│   ├── config            # 全局静态配置文件
│   ├── favicon.ico
│   └── index.html					# 入口页面
├── src
│   ├── App.vue					    # 入口组件
│   ├── api						    # 接口请求处理
│   │   ├── axios.js				# axios请求拦截封装
│   │   ├── config.js				# axios请求参数配置
│   │   └── index.js				# 接口请求封装
│   ├── assets
│   │   ├── image
│   │   │   └── default.png			# 懒加载替换图片
│   │   └── stylus
│   │   	├── common
│   │           └── base.styl		# 公共全局样式
│   │           └── border.styl		# 移动端1像素封装
│   │           └── iconfont.styl   # 字体icon的class
│   │           └── reset.styl		# 重置浏览器默认样式
│   │       ├── index.styl			# 入口文件
│   │       ├── mixin.styl			# 常用mixin<长期维护>
│   │       ├── theme.styl			# cube-ui的主题覆盖
│   │       └── variable.styl		# 全局定义变量
│   ├── components
│   │   └── Skeleton.vue			# 骨架屏组件
│   │   └── register.js 		    # 自动注册组件脚本
|   ├── mock
│   |    └── user_api						# mock接口前缀
│   │         └── is_login.js     # 接口数据
│   |    └── index.js					# mock配置文件
│   ├── routers
│   │   └── index.js				# 路由入口
│   │   └── permission.js			# 路由权限配置文件
│   │   └── routes.js				# 路由配置表
│   ├── store
│   │   ├── modules			     	# 功能模块配置
│   │   ├── modlues.js				# 自动读取功能模块
│   │   ├── index.js				# store入口
│   ├── utils						# 工具方法库<长期维护>
│   │   ├── array.js
│   │   ├── cache.js
│   │   ├── common.js
│   │   ├── date.js
│   │   ├── dom.js
│   │   ├── is.js
│   │   ├── object.js
│   │   ├── storage.js
│   │   ├── string.js
│   │   └── url.js
│   └── views						# 页面组件
│       ├── home        # 首页
│       │   └── index.vue
│       │   └── main.styl
│       ├── account     # 用户登录注册相关
└── vue.config.js				    #vue全局配置
```

---

# Base 脚手架
> 主要基于vue-cli 3.0 版本做了一些提高团队生产力和开发效率的事情。推荐阅读[vue-cli官方文档](https://cli.vuejs.org/zh/)。
---


# 插件说明

## PostCss

> 这里是使用了`postcss-pxtorem`插件，开发时直接按照实际 效果图的px单位就行了

`main.js`里引入'rem.js'

```js
import './common/js/rem'
```


```js
// 基准大小
const baseSize = 32
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
// 初始化
setRem()

// 监听窗口大小时重新设置 rem
window.onresize = () => { setRem() }
```
> 编译前

![stylus](https://github.com/kpengWang/Blog-images-storage/blob/master/2018-08-17/7.png?raw=true)

> 编译后

![css1](https://github.com/kpengWang/Blog-images-storage/blob/master/2018-08-17/8.png?raw=true)
![css2](https://github.com/kpengWang/Blog-images-storage/blob/master/2018-08-17/9.png?raw=true)


## Stylus + Stylus-loader

> 推荐使用Stylus，语法简练。
> 具体语法可参考[Stylus cheatsheet](https://devhints.io/stylus)


## VConsole

> 真机调试，在`main.js`里已配置。

```js
// 开发环境开启vConsole
if (process.env.VUE_APP_CONSOLE === 'show') {
  const vConsole = new VConsole()
  console.log(vConsole.version)
}
```
![vconsole](https://github.com/kpengWang/Blog-images-storage/blob/master/2018-08-17/6.jpg?raw=true)


## NProgress
> 页面切换进度条功能组件
```js
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
```

## router
> 在`router.js`的钩子函数里根据不同场景做配置
> 比如鉴权 permission登录处理

## axios
> axios除了做接口请求，主要还做了拦截处理，利于接口数据异常统一管理，相关代码都在`src/api`文件夹内。

请求拦截的逻辑放在`src/api/axios`里。

## mock
> 很多时候我们前端来定接口数据结构，`easy-mock`等在线工具也好用，但是经常出现不稳定，网址频繁挂掉。这里的moack主要引入[axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter)，一样配合axios来做了拦截处理。mock的语法请参考官方文档[Mock](https://github.com/nuysoft/Mock/wiki)。

所有的mock数据接口每条单独一份放在`src/mock`文件夹下，数据对象使用`COMMON`语法暴露出来。

```js
// user_login.js
module.exports = {
  'newer|1-2': false,
  clientId: null,
  email: '@email()',
  imId: '1975641086072068242',
  imPwd: '1950903380538526578',
  invUserId: 1,
  nickName: '@cname()',
  openstatus: null,
  phoneNum: '15600001001',
  sessionId: '4a05d265aece4d848bd9ca2fb9d9d83c193445',
  trdAccount: '',
  uId: '@integer(1000000, 9999999)',
  uImg: null,
  uName: null,
  uType: 1,
  userIcon: null,
  userSourceChannelId: '1'
}
```

在`src/mock/index.js`里封装了一个`CreateInterface`类：

## .editorConfig
> 可操作的配置虽然不多，但是能覆盖大部分情况。

```bash
root = true #表明是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件

[*] # 对所有文件生效
charset = utf-8
indent_style = space #tab为hard-tabs，space为soft-tabs
indent_size = 2 #设置整数表示规定每级缩进的列数和soft-tabs的宽度
end_of_line = lf #定义换行符，支持lf、cr和crlf
insert_final_newline = true #设为true表明使文件以一个空白行结尾，false反之
trim_trailing_whitespace = true #设为true表示会除去换行行首的任意空白字符，false反之
```
 编辑器一样还是推荐使用VsCode，里面有个插件支持可以安装下。
![editorConfig for VsCode](https://github.com/kpengWang/Blog-images-storage/blob/master/2018-08-17/2.png?raw=true)

## vue-meta
> 视情况使用，一般在PC端应用的相对比较多。在`main.js`里引入后全局注册。
```js
import VueMeta from 'vue-meta'

// 单独设置页面的title和meta信息
Vue.use(VueMeta)
```

具体在vue文件内使用方法如下
```js
export default {
  data() {
    return {
      pageTitle: '个人中心'
    }
  },
  metaInfo() {
    return {
      title: this.pageTitle,
      titleTemplate: '%s - Test',
      script: [{ innerHTML: 'console.log("Hey!~~!")', type: 'text/javascript' }]
    }
  }
}
```
![title](https://raw.githubusercontent.com/kpengWang/Blog-images-storage/master/2018-08-17/3.png)

![控制台console](https://github.com/kpengWang/Blog-images-storage/blob/master/2018-08-17/4.png?raw=true)


## husky + lint-staged

> 主要是在把 Lint 挪到本地，并且每次提交只检查本次提交所修改的文件，使用 `git commit -a`，或者先 `git add `然后 `git commit` 的时候，你的修改代码都会经过待提交区。

主要配置在`package.js`配置文件里.
```js
{
  // ...
   "lint-staged": {
    "**/**.{js,json,pcss,md,vue}": [
      "prettier --write",
      "git add"
    ],
    "*.styl": [
      "stylelint --fix",
      "git add"
    ],
    "*.{png,jpeg,jpg,gif,svg}": [
      "imagemin-lint-staged",
      "git add"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run precommit-msg && lint-staged"
    }
  }
  //...
}

```

## vue-lazyload

> 它其实就是注册一个全局指令，然后使用一个默认图片。


```js
//main.js

// do something
Vue.use(VueLazyLoad, {
  loading: require('./assets/image/default.png')
})
// do something
```

``` html
 <img class="img"  v-lazy="item.url">
```

## vuex
> 推荐直接阅读[vuex官方文档](https://vuex.vuejs.org/zh/guide/)。项目结构一样是使用的官方推荐的。

# UI库

## Cube-UI

> cube-ui 是基于 Vue.js 实现的精致移动端组件库。推荐阅读[官方文档](https://didi.github.io/cube-ui/#/zh-CN/docs/introduction)。
+ PC门户网站：使用[Muse-UI](https://muse-ui.org/#/zh-CN/installation)
+ PC后台CMS：使用[vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide/)。

常用的组件我们可以直接在`main.js`里全局注册

```javascript
import {
  // eslint-disable-next-line
  Style,  // 引入 Style 加载基础样式
  Loading,
  Button,
  Dialog,
  Toast,
  Scroll
} from 'cube-ui'

Vue.use(Scroll)
Vue.use(Loading)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Toast)
```

---

# Webpack优化

> 与2.x相同，在根目录下新建了`build`文件夹。所有可以优化webpack相关的代码逻辑放入这里，仍然通过node环境变量来使用`webpack-merge`做逻辑合并。

+ **webpack.base.conf.js** 共用的配置文件
+ **webpack.dev.conf.js**  走开发环境的配置文件
+ **webpack.prod.conf.js**  走生产环境的配置文件
+ **config.js**           配置参数

## happypack
> 通过多进程模型，来加速代码构建，代码在`webpack.prod.conf.js`文件中，主要使用了Happypack的`ThreadPool`方法，HappyThreadPool(“进程池”) 对象来管理生成的子进程对象。利用缓存来使得rebuild 更快。


> 推荐阅读[happypack 原理解析](http://taobaofed.org/blog/2016/12/08/happypack-source-code-analysis/)。

具体操作方法如下：

```js
// webpack.prod.conf.js

const OS = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: OS.cpus().length })

  {
  // do something...
      plugins: [
        new HappyPack({
          id: 'happybabel',
          loaders: ['babel-loader'],
          threadPool: happyThreadPool,
          cache: true,
          verbose: true
        })
    ]
  }
```
## webpack-parallel-unglify-plugin
> webpack提供的UglifyJS插件由于采用单线程压缩，速度很慢； 使用`webpack-parallel-unglify-plugin`可以并行运行UglifyJS插件，这可以有效减少构建时间多线程压缩js。

```js
// webpack.prod.conf.js
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

  {
  // do something...
      plugins: [
        new ParallelUglifyPlugin({
          cacheDir: '.cache/',
          sourceMap: false,
          uglifyJS: {
            output: { comments: false },
            compress: { warnings: false }
          }
        })
    ]
  }
```