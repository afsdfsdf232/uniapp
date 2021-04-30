<template>
  <view class="navbar-contaiiner">
    <view class="nav-bar">
      <view class="nav-left flex f-y-center" @click="back">
        <image
          v-if="isBack"
          class="back-icon"
          src="../../../static/images/back.png"
          mode="scaleToFill"
        />
        <text :class="[align]" class="nav-title f40 f-w6 t-c">{{title}}</text>
      </view>
      <view class="nav-right"><slot></slot></view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    isBack: {
      type: Boolean,
      default: true
    },
    title: String,
    align: {
      type: String,
      default: 'left'
    }
  },
  methods: {
    back () {
      uni.navigateBack({ delta: 1, animationType: 'pop-out', animationDuration: 200 })
    }
  }
}
</script>
<style lang="scss" scoped>
  .navbar-contaiiner{
    position: relative;
    height: 132rpx;
    .nav-bar{
      position: fixed;
      left: 0;
      right: 0;
      height: 132rpx;
      box-sizing: border-box;
      padding:40rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      z-index: 99;
      .nav-left{
        width: 100%;
        .back-icon{
          width: 40rpx;
          height: 40rpx;
        }
        .nav-title{
          margin-left: 16rpx;
          color: $uni-text-color;
        }
        .center{
          display: inline-block;
          margin: 0;
          width:calc( 100% - 40rpx);
        }
      }
    }
  }
</style>
