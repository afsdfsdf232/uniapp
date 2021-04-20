// 原生通信事件方法

// 用户模块
export function userModule (methodName = 'undefined', ...args) {
  const userModules = uni.requireNativePlugin(userModule.name)
  if (!userModules[methodName]) {
    console.warn(`${methodName} is undefined`)
    return false
  }
  if (typeof userModules[methodName] !== 'function') {
    console.warn(`${methodName} is not a function`)
    return false
  }
  return userModules[methodName](...args)
}

// 测试模块
export function TestModule (methodName, ...args) {
  /*
    获取用户登录信息：getUserInfo(params: Object,res=>void)
    返回原生页面：back(params：Object，()=>void)
  */
  const testModule = uni.requireNativePlugin('TestModule')
  return testModule[methodName](...args)
}
