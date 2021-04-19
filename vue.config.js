const path = require("path");
const settingTarget = require('./setting')

console.log('devTarget:', settingTarget.devTarget)
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.join(__dirname, "src"))

    config.optimization.minimizer('terser').tap((args) => {
      const compress = args[0].terserOptions.compress
      // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
      compress.drop_console = true
      compress.pure_funcs = [
        '__f__', // App 平台 vue 移除日志代码
        // 'console.debug' // 可移除指定的 console 方法
      ]
      return args
    })

  },
  devServer: {
    port: 8089,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: settingTarget.devTarget,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}