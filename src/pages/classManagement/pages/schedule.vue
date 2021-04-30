<template>
  <view class="schedule-container">
    <nav-bar title="每日进度" align="center"/>
    <view class="time-line-content">
      <view class="time-line-item flex" v-for="(item,index) in list" :key="index">
        <view class="time-line-left">
          <view class="f32 title f-w6">{{item.date}}</view>
          <view class="sub-title f24 f-w4">{{item.subDate}}</view>
        </view>
        <view class="time-line-right flex1">
          <view class="f32 title f-w6">{{item.name}}</view>
          <view class="sub-title f28 f-w4" :class="{'complete': index !== 0 && index !== 3, 'have': index === 0, 'air': index === 3}">{{item.speed}}</view>
        </view>
      </view>
    </view>
    <view class="flex f-center loading">
      <u-loading  mode="flower" size="50" :show="loading"></u-loading>
    </view>
  </view>
</template>
<script>
import NavBar from '../components/NavBar'
export default {
  data () {
    return {
      loading: true,
      list: [
        {
          date: '第18天',
          subDate: '2020.12.24',
          name: '有氧拉伸训练',
          speed: '进行中(完成率92%)'
        },
        {
          date: '第18天',
          subDate: '2020.12.24',
          name: '有氧拉伸训练hhhhhhhhhhhhh',
          speed: '进行中(完成率92%)'
        },
        {
          date: '第18天',
          subDate: '2020.12.24',
          name: '有氧拉伸训练',
          speed: '进行中(完成率92%)'
        },
        {
          date: '第18天',
          subDate: '2020.12.24',
          name: '有氧拉伸训练',
          speed: '进行中(完成率92%)'
        },
        {
          date: '第18天',
          subDate: '2020.12.24',
          name: '有氧拉伸训练',
          speed: '进行中(完成率92%)'
        },
        {
          date: '第18天',
          subDate: '2020.12.24',
          name: '有氧拉伸训练',
          speed: '进行中(完成率92%)'
        },
        {
          date: '第18天',
          subDate: '2020.12.24',
          name: '有氧拉伸训练',
          speed: '进行中(完成率92%)'
        },
        {
          date: '第18天',
          subDate: '2020.12.24',
          name: '有氧拉伸训练',
          speed: '进行中(完成率92%)'
        },
        {
          date: '第18天',
          subDate: '2020.12.24',
          name: '有氧拉伸训练',
          speed: '进行中(完成率92%)'
        },
        {
          date: '第18天',
          subDate: '2020.12.24',
          name: '有氧拉伸训练',
          speed: '进行中(完成率92%)'
        }
      ]
    }
  },
  components: {
    'nav-bar': NavBar
  },
  onLoad (options) {
    console.log('options:', options)
  },
  onReachBottom (opt) {
    console.log('滚动：', opt)
    this.loading = true
    setTimeout(() => {
      for (let key = 0; key < 10; key++) {
        this.list.push({
          date: '第18天',
          subDate: '2020.12.24',
          name: '有氧拉伸训练',
          speed: '进行中(完成率92%)'
        })
      }
      this.loading = false
    }, 2000)
  }
}
</script>
<style lang="scss" scoped>
  .schedule-container{
    box-sizing: border-box;
    padding: 0 40rpx;
    .time-line-content{
      width: 100%;
      .time-line-left{
        box-sizing: border-box;
        padding-right: 48rpx;
        width: 214rpx;
        text-align: right;
        position: relative;
        .sub-title{
          color: $uni-text-color-grey2;
        }
        &::after {
          content: '';
          display: inline-block;
          position: absolute;
          right: -27rpx;
          top: 0;
          width: 16rpx;
          height: 16rpx;
          border: 6rpx solid #C3C2CC;
          border-radius: 50%;
        }
        &::before{
          content: '';
          display: inline-block;
          position: absolute;
          right: -15.5rpx;
          top: 32rpx;
          bottom: 10rpx;
          width: 4rpx;
          background-color: #C3C2CC;
          border-radius: 2rpx;
        }
      }
      .time-line-right{
        box-sizing: border-box;
        padding: 0 10rpx;
        margin-left: 50rpx;
      }
      .title{
        color: $uni-text-color;
      }
      .have{
        color: $uni-color-success;
      }
      .complete{
        color: $uni-text-color-grey2;
      }
      .air{
        color: $uni-color-error;
      }
      .sub-title{
        margin-top: 10rpx;
        margin-bottom: 50rpx;
      }
      .loading{
        box-sizing: border-box;
        padding: 20rpx 0;
      }
    }
  }
</style>
