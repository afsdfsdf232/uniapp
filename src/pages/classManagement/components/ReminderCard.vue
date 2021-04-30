<template>
  <view class="remind-container">
    <view class="remind-left flex f-y-center">
      <image
        class="warning-icon"
        src="../../../static/images/warning-icon.png"
        mode="scaleToFill"
      />
      <view class="desc f30 f-w4 flex f-y-center">{{title}} <text class="f40 f-w6">{{count || 0}}</text> 人</view>
    </view>
    <view @click="remindClick" class="remind-right f24 f-w6 t-c">{{ btnName || '去提醒'}}</view>
  </view>
</template>
<script>
export default {
  props: {
    title: String,
    count: [Number, String],
    btnName: {
      type: String,
      default: '去提醒'
    },
    prop: Object
  },
  methods: {
    remindClick () {
      this.$emit('remind-click', this.prop)
    }
  }
}
</script>
<style lang="scss" scoped>
.remind-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 120rpx;
  .remind-left {
    .desc {
      margin-left: 18rpx;
      color: $uni-text-color;
      text {
        margin: 0 4rpx
      }
    }
    .warning-icon{
      width: 48rpx;
      height: 48rpx;
    }
  }
  .remind-right {
    width: 120rpx;
    height: 48rpx;
    line-height: 48rpx;
    color: #fff;
    background-color: $uni-btn-bg-primary;
    border-radius: 32rpx;
  }
}
</style>
