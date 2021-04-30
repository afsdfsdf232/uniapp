<template>
  <!-- 运动感受 -->
  <view class="feeling-container">
    <view class="feel-title f-w6">运动感受</view>
    <view class="list">
      <view class="item">
        <view class="count f30 f-fo f-w">26</view>
        <image
          class="img"
          src="../../../static/images/relaxed-icon.png"
          mode="scaleToFill"
        />
        <view class="desc f24 f-w4">很轻松</view>
      </view>
      <view class="item">
        <view class="count f30 f-fo f-w">78</view>
        <image
          class="img"
          src="../../../static/images/commonly-icon.png"
          mode="scaleToFill"
        />
        <view class="desc f24 f-w4">一般般</view>
      </view>
      <view class="item">
        <view class="count f30 f-fo f-w">16</view>
        <image
          class="img"
          src="../../../static/images/hard-icon.png"
          mode="scaleToFill"
        />
        <view class="desc f24 f-w4">太难了</view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.feeling-container {
  .feel-title {
    font-size: 32rpx;
    color: $uni-text-color
  }
  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 262rpx;
    .item {
      width: 207rpx;
      text-align: center;
      .img {
        width: 96rpx;
        height: 96rpx;
        margin: 16rpx 0 8rpx;
      }
      .count {
        color: $uni-text-color
      }
      .desc {
        color: $uni-text-color-grey2;
      }
    }
  }
}
</style>
