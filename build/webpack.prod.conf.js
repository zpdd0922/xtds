const path = require('path')
const OS = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: OS.cpus().length })
const TerserPlugin = require('terser-webpack-plugin')
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const merge = require('webpack-merge')
const base = require('./webpack.base.conf.js')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = merge(base, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'happypack/loader?id=happyBabel'
      }
    ]
  },
  plugins: [
    new HappyPack({
      // 这个HappyPack的“名字”就叫做js，和上面module里rules的查询参数一致
      id: 'happyBabel',
      loaders: ['babel-loader?cacheDirectory'],
      // 指定进程池
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    // 提高webpack的tree-shaking的效率
    new WebpackDeepScopeAnalysisPlugin()

    // 文件结构可视化，找出导致体积过大的原因
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: '.cache/',
        sourceMap: false,
        terserOptions: {
          output: {
            comments: false
          },
          warnings: false
        }
      })
    ]
  }
})
