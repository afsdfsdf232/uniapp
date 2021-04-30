<template>
  <view class="statistics-row">
    <view class="statistics-item" v-for="item in prop" :key="item.name">
      <view class="count f30 f-w f-fo">{{ item.value }}</view>
      <view class="desc f24 f-w4">{{ item.name }}</view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    prop: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>
.statistics-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 150rpx;
  background-color: #f5f5fa;
  border-radius: 16rpx;
  .statistics-item {
    width: 207rpx;
    view {
      width: 100%;
      text-align: center;
    }
    .count {
      color: $uni-text-color;
    }
    .desc {
      margin-top: 8rpx;
      color: $uni-text-color-grey2
    }
  }
}
</style>
