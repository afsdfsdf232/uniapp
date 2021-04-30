<template>
  <view class="ranking-list">
    <view class="list-row">
      <view class="ranking-col w150 f24 f-w4">排名范围</view>
      <view class="ranking-col w290 f24 f-w4">详情数据</view>
      <view class="ranking-col w120 f24 f-w4">超过百分比</view>
    </view>
    <view class="list-row">
      <view class="ranking-col w150 f24 f-w4">
        <text class="ranking-name f30 f-w4">全校</text>
      </view>
      <view class="ranking-col ranking-detail w290 f24 f-w4">
        <view class="progress-item">
          <view class="progress-bg"></view>
          <view class="current-progress"></view>
        </view>
        <view class="progress-detail f24 f-w4">
          <text>85分</text>
          <text>56个班</text>
        </view>
      </view>
      <view class="ranking-col w120 right f24 f-w4">
        <text class="ranking-name f-fo  f30 f-w4">98%</text>
      </view>
    </view>
    <view class="list-row">
      <view class="ranking-col w150 f24 f-w4"
        ><text class="ranking-name  f30 f-w4">全区</text></view
      >
      <view class="ranking-col w290 ranking-detail f24 f-w4">
        <view class="progress-item">
          <view class="progress-bg"></view>
          <view class="current-progress"></view>
        </view>
        <view class="progress-detail f24 f-w4">
          <text>85分</text>
          <text>56个班</text>
        </view>
      </view>
      <view class="ranking-col w120 right f24 f-w4"
        ><text class="ranking-name f-fo f30 f-w4">98%</text></view
      >
    </view>
    <view class="list-row">
      <view class="ranking-col w150 f24 f-w4"
        ><text class="ranking-name f30 f-w4">全市</text></view
      >
      <view class="ranking-col w290 ranking-detail f24 f-w4">
        <view class="progress-item">
          <view class="progress-bg"></view>
          <view class="current-progress"></view>
        </view>
        <view class="progress-detail f24 f-w4">
          <text>85分</text>
          <text>2356个班</text>
        </view>
      </view>
      <view class="ranking-col w120 right f24 f-w4"
        ><text class="ranking-name f-fo f30 f-w4">98%</text></view
      >
    </view>
    <view class="list-row">
      <view class="ranking-col w150 f24 f-w4"
        ><text class="ranking-name f30 f-w4">全省</text></view
      >
      <view class="ranking-col w290 ranking-detail f24 f-w4">
        <view class="progress-item">
          <view class="progress-bg"></view>
          <view class="current-progress"></view>
        </view>
        <view class="progress-detail f24 f-w4">
          <text>85分</text>
          <text>2W+个班</text>
        </view>
      </view>
      <view class="ranking-col w120 right f24 f-w4"
        ><text class="ranking-name f-fo f30 f-w4">98%</text></view
      >
    </view>
  </view>
</template>
<style lang="scss" scoped>
.ranking-list {
  border-radius: 24rpx;
  box-shadow: 0px 0px 4rpx 0 rgba(235, 235, 235, 1);
  .list-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 20rpx;
    &:nth-of-type(odd) {
      background-color: #fff9f0;
    }
    &:last-child {
      border-bottom-left-radius: 20rpx;
      border-bottom-right-radius: 20rpx;
    }
    &:first-child {
      border-top-left-radius: 20rpx;
      border-top-right-radius: 20rpx;
    }
    .ranking-col {
      flex-shrink: 0;
      color: $uni-text-color-grey;
      .ranking-name {
        color: $uni-text-color;
      }
    }
    .ranking-detail {
      .progress-item {
        position: relative;
        width: 100%;
        height: 24rpx;
        .progress-bg {
          width: 100%;
          height: 24rpx;
          background: linear-gradient(
            180deg,
            rgba(255, 235, 179, 1) 0%,
            rgba(255, 215, 128, 1) 100%
          );
          border-radius: 12rpx;
        }
        .current-progress {
          position: absolute;
          left: 0;
          top: 0;
          height: 24rpx;
          width: 80%;
          background: linear-gradient(
            180deg,
            rgba(255, 237, 38, 1) 0%,
            rgba(255, 204, 0, 1) 45%,
            rgba(255, 149, 0, 1) 100%
          );
          border-radius: 12rpx;
        }
      }
      .progress-detail {
        display: flex;
        justify-content: space-between;
        margin-top: 16rpx;
        color: $uni-text-color-grey;
      }
    }
  }
    .w290 {
    width: 280rpx;
  }
  .w150 {
    width: 150rpx;
  }
  .w120 {
    width: 120rpx;
  }
}
</style>
