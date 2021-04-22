import { getToken } from '@/utils/permission'
const { proTarget } = require('../../setting')
const BASE_URL = process.env.NODE_ENV === 'development' ? '' : proTarget

const HEADERS = {
  'content-type': 'application/json',
  Authorization: getToken()
}
const TIMEOUT = 5000

export function request ({
  url,
  data,
  method = 'GET',
  header = {}
}) {
  return new Promise((resolve, reject) => {
    console.log('proTarget:', proTarget)
    console.log('process.env:', process.env.NODE_ENV)
    uni.showLoading({
      title: '加载中'
    })
    uni.request({
      url: BASE_URL + url,
      data,
      header: Object.assign({}, HEADERS, header),
      method,
      timeout: TIMEOUT,
      success: res => {
        if (res.code === 0) {
          resolve(res.data)
        } else {
          // 判断code做一些权限操作
          uni.showToast({
            title: '加载失败',
            duration: 2000,
            icon: 'loading'
          })
          resolve(res.data)
        }
        uni.hideLoading()
      },
      fail: err => {
        uni.hideLoading()
        uni.showToast({
          title: '加载失败',
          duration: 2000,
          icon: 'loading'
        })
        reject(err)
      }
    })
  })
}

function get (url, data, header = {}) {
  return request({
    url,
    data,
    header,
    method: 'GET'
  })
}

function post (url, data, header = {}) {
  return request({
    url,
    data,
    header,
    method: 'POST'
  })
}

export {
  get,
  post
}
