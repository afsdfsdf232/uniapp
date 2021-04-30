/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export const deepClone = source => {
  const cache = []

  function findCache (source) {
    for (let i = 0; i < cache.length; i++) {
      if (cache[i][0] === source) {
        return cache[i][1]
      }
    }
    return undefined
  }
  if (source instanceof Object) { // eslint-disable-line
    const cacheDist = findCache(source)
    if (cacheDist) {
      return cacheDist
    } else {
      let dist
      if (source instanceof Array) { // eslint-disable-line
        dist = []
      } else if (source instanceof Function) {
        dist = function () {
          return source.apply(this, arguments)
        }
      } else if (source instanceof RegExp) {
        dist = new RegExp(source.source, source.flags)
      } else if (source instanceof Date) {
        dist = new Date(source)
      } else {
        dist = {}
      }
      // 数据源 和 副本 都存入缓存 ，注意一定要 在 dist创建成功之后就把它 存入，防止重复的生成
      cache.push([source, dist])
      for (const key in source) {
        if (source.hasOwnProperty(key)) { // eslint-disable-line
          dist[key] = deepClone(source[key])
        }
      }
      return dist
    }
  }
  return source
}

// 组合式函数，执行顺序从右至左顺序执行
export const compose = (...fns) => (...args) => fns.reduceRight((acc, fn) => fn(acc), ...args)

// 缓存函数，用于存储大量数据的重复计算
export const memorize = fn => {
  const cache = {} // 存储缓存数据对象
  return (...args) => {
    const _args = JSON.stringify(args) // 将参数作为cache的key
    return cache[_args] || (cache[_args] = fn(...args)) // 先从缓存中取，存在直接取值否则执行计算
  }
}

// 防抖
export const debounce = (fn, wait = 500) => {
  let timer
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, wait)
  }
}

//  节流
export const throttling = (fn, wait = 500) => {
  let prev = 0
  return (...args) => {
    const now = Date.now()
    if (now - prev > wait) {
      fn(...args)
      prev = now
    }
  }
}

// 获取过去或者未来n天的日期和周
export const getNTime = (n = 0) => {
  if (isNaN(n)) throw new Error(`参数“${n}”不是一个数字，期待值是一个数字`)
  const dates = []
  const len = Math.abs(n)
  const positive = n > 0
  const weeks = ['日', '一', '二', '三', '四', '五', '六']
  const timestamp = new Date().getTime()
  const getScure = (tims) => {
    const now = new Date(tims)
    const D = now.getDate()
    const M = now.getMonth() + 1
    return {
      y: now.getFullYear(), // 年
      m: M > 9 ? M : '0' + M, // 月
      d: D > 9 ? D : '0' + D, // 日
      w: weeks[now.getDay()] // 周
    }
  }
  // 保存当天
  dates.push(getScure(timestamp))
  for (let i = 1; i < len; i++) {
    if (positive) {
      dates.push(getScure(timestamp + i * 24 * 3600 * 1000))
    } else {
      dates.push(getScure(timestamp - i * 24 * 3600 * 1000))
    }
  }
  return dates
}
