<template>
  <view class="content u-skeleton">
    <view>
      <text class="title">{{ title }}</text>
    </view>
    <button @click="getUserInfo">获取用户信息</button>
    <view class="text">登录用户信息: {{ userInfo }}</view>
    <button @click="back">返回原生页面</button>
    <text class="u-skeleton-fillet">{{ userInfo }}</text>
    <button @click="getS">getSetting</button>
    <input class="uni-input" maxlength="10" v-model="user" placeholder="请输入电话号码" />
    <input class="uni-input" type="password" v-model="pwd"  placeholder="请输入密码" />
    <button @click="login">登录</button>
  </view>
</template>

<script>
import { getUserInfo, setting } from '@/api/user'
import { TestModule } from '@/utils/nativeCommon'
import { getNTime } from '@/utils'
export default {
  data () {
    return {
      title: '测试页面',
      userInfo: null,
      user: '',
      pwd: ''
    }
  },
  onLoad () {},
  methods: {
    async getUserInfo () {
      try {
        const res = await getUserInfo({ id: 'showtoast' })
        console.log('res-get:', res)
      } catch (err) {}

      //   #ifdef APP-PLUS
      const testModules = uni.requireNativePlugin('TestModule')
      console.log('testModules:', uni.requireNativePlugin, testModules)
      TestModule('getUserInfo', { name: '我是h5页面调用接口' }, (res) => {
        console.log('res:', res)
        this.userInfo = res
        uni.showToast({
          title: '获取成功',
          icon: 'none'
        })
      })
      // #endif

      // #ifndef APP-PLUS
      console.log('adada', this.$store.state.user.userInfo)
      uni.showToast({
        title: '暂无数据',
        icon: 'none'
      })
      // #endif
    },
    back () {
      // #ifdef APP-Plus
      const testModules = uni.requireNativePlugin('TestModule')
      console.log('testModules:', testModules)
      TestModule('back', { name: '我是要返回原生页面' }, () => {
        uni.showToast({
          title: '返回成功',
          icon: 'none'
        })
      })
      //   #endif

      // #ifndef APP-Plus
      uni.showToast({
        title: 'H5平台返回成功',
        icon: 'none'
      })
      // #endif
    },
    getS () {
      setting({}).then(res => console.log('ress:', res)).catch(err => console.log('err:', err))
    },
    login () {
      console.log(this.user, this.pwd)
      console.log('getNTime:', getNTime(-10))
    }
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
