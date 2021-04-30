<template>
  <view class="date-container">
    <view class="weeks f28 f-w4">
      <view v-for="item in dates" :key="item.w">
        <text>{{ item.w }}</text>
      </view>
    </view>
    <view class="dates f32 f-w6">
      <view :class="{'date-active': item.d === currentDate}" @click="change(item.d)" v-for="(item,index) in dates" :key="item.w">
        <text>{{ index===dates.length-1? '今': item.d}}</text>
      </view>
    </view>
  </view>
</template>
<script>
import { getNTime } from '@/utils'
export default {
  data () {
    return {
      currentDate: new Date().getDate(),
      dates: getNTime(-7).reverse()
    }
  },
  methods: {
    change (date) {
      if (date === this.currentDate) return
      this.currentDate = date
    }
  }
}
</script>

<style lang="scss" scoped>
.date-container {
  box-sizing: border-box;
  padding: 20rpx 0;
  .weeks,
  .dates {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(34,34,34,.8);
    view {
      box-sizing: border-box;
      width: 72rpx;
      text-align: center
    }
  }
  .dates {
    margin-top: 40rpx;
    view {
      height: 72rpx;
      line-height: 72rpx;
      text {
        color: $uni-text-color;
      }
    }
  }
  .date-active{
    background-color: $uni-btn-bg-primary;
    border-radius: 16rpx;
    text{
      color: #fff !important;
    }
  }
}
</style>
