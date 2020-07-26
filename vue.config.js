const path = require('path')
const DEV = process.env.NODE_ENV !== 'production'
const webpackDevConf = require('./build/webpack.dev.conf')
const webpackProdConf = require('./build/webpack.prod.conf')
const TransformModulesPlugin = require('webpack-transform-modules-plugin')
const PostCompilePlugin = require('webpack-post-compile-plugin')

const resolve = dir => path.join(__dirname, dir)

// 代理对象 - 依据api/config内配置同步地址
const proxy = {}
const prefixs = [
  {
    path: '/dev-url',
    target: 'http://121.35.249.14:9003',
    pathRewrite: {
      '^/dev-url': ''
    }
  },
  {
    path: '/dev-sec',
    target: 'http://121.35.249.14:9011',
    pathRewrite: {
      '^/dev-sec': ''
    }
  }
]
prefixs.forEach(item => {
  const { path, target, pathRewrite } = item
  proxy[path] = {
    target,
    pathRewrite,
    changeOrigin: true
  }
})

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: './',
  // 生产环境构建文件的目录
  outputDir: 'dist',
  // 生成的静态资源 - 相对于 outputDir 的 目录
  assetsDir: './static',
  // 生成的 index.html 的输出路径 - 相对于 outputDir 的 目录
  indexPath: './index.html',
  productionSourceMap: false,
  chainWebpack: config => {
    // 修改插件
    const conf = config.toConfig()
    // 自定义cube-ui样式
    config.plugin('post-compile').use(PostCompilePlugin, [
      {
        config: {
          module: {
            rules: [...conf.module.rules]
          }
        }
      }
    ])

    config
      .plugin('html')
      .tap(args => {
        args[0].time = +new Date()
        return args
      })

    config.plugin('transform-modules').use(TransformModulesPlugin)

    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
  },
  configureWebpack: () => {
    // 根据Node变量环境返回对应的自定义配置来合并config
    return DEV ? webpackDevConf : webpackProdConf
  },
  // css相关配置
  css: {
    // css预设器配置项
    loaderOptions: {
      stylus: {
        'resolve url': true,
        // 这里 新增 import 配置项，指向自定义主题文件
        import: [path.resolve(__dirname, './src/assets/stylus/base/theme')]
      }
    }
  },
  // dev-server 服务代理配置
  devServer: {
    open: false, // 配置自启浏览器
    host: '0.0.0.0',
    port: 8088,
    https: false,
    hotOnly: false,
    proxy // 设置代理
  }
}
