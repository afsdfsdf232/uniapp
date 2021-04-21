import { compose } from '@/utils'
const components = require.context('./', false, /\.vue$/)
const letters = {
  A: '-a',
  B: '-b',
  C: '-c',
  D: '-d',
  E: '-e',
  F: '-f',
  G: '-g',
  H: '-h',
  I: '-i',
  J: '-j',
  K: '-k',
  L: '-l',
  M: '-m',
  N: '-n',
  O: '-o',
  P: '-p',
  Q: '-q',
  R: '-r',
  S: '-s',
  T: '-t',
  U: '-u',
  V: '-v',
  W: '-w',
  X: '-x',
  Y: '-y',
  Z: '-z'
}
// 格式化全局组件名称，g- 开头，后面为组件名称，大写转小写，并且以 ‘-’ 拼接，例如：NavBar.vue => g-nav-bar
const formatComponentName = fileName => {
  const names = ['g']
  const len = fileName.length
  for (let i = 0; i < len; i++) {
    if (!letters[fileName[0]]) {
      throw new Error(`${fileName}组件名称需以大写字母开头`)
    }
    // eslint-disable-next-line
    if (!!letters[fileName[i]]) {
      names.push(letters[fileName[i]])
    } else {
      names.push(fileName[i])
    }
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
