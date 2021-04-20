<template>
  <view class="content u-skeleton">
    <view>
      <text class="title">{{ title }}</text>
    </view>
    <button @click="getUserInfo">获取用户信息</button>
    <view class="text">登录用户信息: {{ userInfo }}</view>
    <button @click="back">返回原生页面</button>
    <block>
      <!--u-skeleton-circle 绘制圆形-->
      <image class="userinfo-avatar u-skeleton-circle" :src="userInfo"></image>
      <!--u-skeleton-fillet 绘制圆角矩形-->
      <text class="u-skeleton-fillet">{{ userInfo }}</text>
    </block>
    <!-- <u-action-sheet :list="list" v-model="show"></u-action-sheet> -->
    <u-skeleton
      :loading="loading"
      :animation="true"
      bgColor="#FFF"
    ></u-skeleton>
    <u-swiper :effect3d="true" class="swiper" :list="swiperList"></u-swiper>
  </view>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      title: '测试页面',
      userInfo: null,
      loading: false,
      swiperList: [
        {
          image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东'
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          title: '身无彩凤双飞翼，心有灵犀一点通'
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
        }
      ],
      list: [
        {
          text: '点赞',
          color: 'blue',
          fontSize: 28
        },
        {
          text: '分享'
        },
        {
          text: '评论'
        }
      ],
      show: true
    }
  },
  onLoad () {},
  methods: {
    async getUserInfo () {
      let a = 1;;;;;
      let b= 200;;;;
      try {
        const res = await getUserInfo({ id: 'showtoast' })
        console.log('res-get:', res)
      } catch (err) {}

      //   #ifdef APP-PLUS
      const testModule = uni.requireNativePlugin('TestModule')
      console.log('testModule:', uni.requireNativePlugin)
      if (testModule && testModule.getUserInfo) {
        testModule.getUserInfo({ name: '我是h5页面调用接口' }, (res) => {
          console.log('res:', res)
          this.userInfo = res
          uni.showToast({
            title: '获取成功',
            icon: 'none'
          })
        })
      }
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
      const testModule = uni.requireNativePlugin('TestModule')
      if (testModule && testModule.back) {
        testModule.back({ name: '我是要返回原生页面' }, () => {
          uni.showToast({
            title: '返回成功',
            icon: 'none'
          })
        })
      }
      //   #endif
      // #ifndef APP-Plus
      uni.showToast({
        title: 'H5平台返回成功',
        icon: 'none'
      })
      // #endif
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

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.text {
  font-size: 28rpx;
}
.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}
.swiper {
  width: 750rpx;
}
</style>
