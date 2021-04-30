<template>
  <view>
    <ug-nav-bar />
    <ug-form :model="rules" class="login-form" ref="loginRef">
      <ug-form-item prop="user" label="用户名：">
        <ug-input
          placeholder="请输入用户名"
          v-model="userInfo.user"
        />
      </ug-form-item>
      <ug-form-item prop="pwd" label="密码：">
        <ug-input
          placeholder="请输入密码"
          v-model="userInfo.pwd"
          type="password"
        />
      </ug-form-item>
      <button @click="submit">登录</button>
    </ug-form>
  </view>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        user: '',
        pwd: ''
      },
      rules: {
        user: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['change', 'blur']
          },
          {
            validator: function (rule, value, cb) {
              if (value === '12') {
                // eslint-disable-next-line node/no-callback-literal
                cb('不能为12')
              } else {
                cb()
              }
              // console.log('validator:', rule, value)
            }
          }
        ],
        pwd: {
          required: true,
          message: '请输入密码'
        }

      }
    }
  },
  methods: {
    submit () {
      this.$refs.loginRef.validate(valid => {
        console.log('login:', valid)
        if (valid) {
          uni.navigateTo({ url: '/pages/home/index' })
        } else {
          // alert('登录失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-form{
    box-sizing: border-box;
    padding: 10px;
  }
</style>
