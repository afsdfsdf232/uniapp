<template>
  <view :style="{'color': color, 'background-color': bgColor}" class="tag-container f24 f-w4">{{name}}</view>
</template>
<script>
export default {
  props: {
    name: String,
    state: {
      type: Number,
      default: 0 // 0 男 1 女 2 男女全部
    },
    color: {
      type: String,
      default: '#fff'
    },
    bgColor: {
      type: String,
      default: '#ffae00'
    }
  }
}
</script>
<style lang="scss" scoped>
  .tag-container {
      position: absolute;
      top: 0;
      left: 40rpx;
      box-sizing: border-box;
      padding: 0 16rpx 8rpx;
      border-radius: 0 0 16rpx 16rpx;
    }
</style>
