<template>
  <view v-bind="$attrs" class="overview-container">
    <slot></slot>
  </view>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
  .overview-container{
    width: 100%;
    box-shadow:0 8rpx 32rpx 0 rgba(56,54,77,0.12);
    border-radius: 32rpx;
  }
</style>
