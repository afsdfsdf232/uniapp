import { compose } from '@/utils'
const components = require.context('./', false, /\.vue$/)
// 格式化字母，判断是否大写字母，是转为小写并添加'-'前缀
const formatLetter = str => {
  if (str === str.toUpperCase()) {
    return '-' + str.toLowerCase()
  }
  return str
}
// 格式化全局组件名称，g- 开头，后面为组件名称，例如：NavBar.vue => g-nav-bar
const formatComponentName = fileName => {
  const names = ['g']
  const len = fileName.length
  for (let i = 0; i < len; i++) {
    if (fileName[0] === fileName[0].toLowerCase()) {
      throw new Error(`${fileName}组件名称需以大写字母开头`)
    }
    names.push(formatLetter(fileName[i]))
  }
  return names.join('')
}
// 获取组件文件名
const replaceFileName = fileName => fileName.replace(/(\.\/|\.vue)/g, '')

const composeName = compose(formatComponentName, replaceFileName)

export default function regGlobalComponent (Vue) {
  components.keys().forEach(file => {
    Vue.component(composeName(file), components(file).default)
  })
}
