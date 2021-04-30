<template>
  <!-- 运动感受 -->
  <view class="feeling-container">
    <view class="feel-title">运动感受</view>
    <view class="list">
      <view class="item">
        <view class="count f30 f-fo">26</view>
        <image
          class="img"
          src="../../../static/images/relaxed-icon.png"
          mode="scaleToFill"
        />
        <view class="desc f24 f-w4">很轻松</view>
      </view>
      <view class="item">
        <view class="count f30 f-fo">78</view>
        <image
          class="img"
          src="../../../static/images/commonly-icon.png"
          mode="scaleToFill"
        />
        <view class="desc f24 f-w4">一般般</view>
      </view>
      <view class="item">
        <view class="count f30 f-fo">16</view>
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
    margin-bottom: 32rpx;
    font-size: 32rpx;
    color: $uni-text-color;
    font-weight: bold;
  }
  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      width: 207rpx;
      text-align: center;
      .img {
        width: 96rpx;
        height: 96rpx;
        margin: 16rpx 0 8rpx;
      }
      .count {
        color: $uni-text-color;
        font-weight: bold;
      }
      .desc {
        color: $uni-text-color-grey2;
      }
    }
  }
}
</style>
