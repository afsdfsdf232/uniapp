<template>
  <view class="swiper-box">
    <scroll-view
      :scroll-with-animation="true"
      :scroll-left="8000"
      @scroll="scrollEvent"
      scroll-x="true"
      class="box-container"
    >
      <text class="view-item" v-for="item in list" :key="item">
        <text>{{ item }}</text>
      </text>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6, 8, 9, 10],
    }
  },
  methods: {
    scrollEvent (event) {
      console.log('event:', event)
    }
  }
}
</script>

<style lang="scss">
.swiper-box {
  width: 750rpx;
  height: 500px;
  box-sizing: border-box;
  padding: 0 20rpx;
  border: 1px solid red;
  overflow: hidden;
}
.box-container {
  width: 750rpx;
  border: 1px solid yellow;
  display: flex;
  // align-items: flex-end;
  flex-wrap: no-wrap;
  // flex-shrink: 1;
  // box-sizing: border-box;
  // padding: 10px;
  // overflow:scroll;
  // border: 1px solid yellow;
  // width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.view-item {
  display:inline-flex;
  width: 200rpx;
  height: 300rpx;
  background-color: aquamarine;
  margin-right: 20rpx;
}
</style>
