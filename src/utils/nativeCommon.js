// 原生通信事件方法

// 用户模块
export function userModule (methodName = 'undefined', ...args) {
  const userModules = uni.requireNativePlugin(userModule.name)
  if (!userModules[methodName]) throw new Error(`${methodName} is undefined`)
  if (typeof userModules[methodName] !== 'function') throw new Error(`${methodName} is not a function`)
  return userModules[methodName](...args)
}

// 测试模块
export function TestModule (methodName, ...args) {
  /*
    获取用户登录信息：getUserInfo(params: Object,res=>void)
    返回原生页面：back(params：Object，()=>void)
  */
  // eslint-disable-next-line
  const result = {
    id: '', // 用户ID
    token: '', // token
    refreshToken: '', // 刷新令牌
    expired: '', // 失效时间
    mobile: '', // 用户电话号码
    userName: '', // 用户名
    gender: '', // 性别
    accountStatus: '', // 账户状态
    type: '' // 账户类型
  }
  const testModule = uni.requireNativePlugin('TestModule')
  return testModule[methodName](...args)
}
