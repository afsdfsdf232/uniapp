<template>
  <view class="module-container">
    <view class="list-box">
      <navigator class="link-item" :url="nav.url" :open-type="nav.openType || 'navigate'" v-for="(nav,index) in navigatorList" :key="index">
        <text>{{nav.title}}</text>
      </navigator>
    </view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      navigatorList: [
        {
          title: '运动统计',
          url: '/pages/sportsStatistics/index'
        },
        {
          title: '班级管理',
          url: '/pages/classManagement/index'
        },
        {
          title: '运动统计',
          url: '/pages/sportsStatistics/index'
        },
        {
          title: '班级管理',
          url: '/pages/classManagement/index'
        },
        {
          title: '运动统计',
          url: '/pages/sportsStatistics/index'
        },
        {
          title: '班级管理',
          url: '/pages/classManagement/index'
        },
        {
          title: '运动统计',
          url: '/pages/sportsStatistics/index'
        },
        {
          title: '班级管理',
          url: '/pages/classManagement/index'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.module-container {
  .list-box {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 30rpx 20rpx;
    .link-item {
      width: 120rpx;
      height: 120rpx;
      line-height: 120rpx;
      text-align: center;
      font-size: 26rpx;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      border-radius: 6rpx;
      color: #fff;
      background-color: $u-type-warning-dark;
    }
  }
}
</style>
