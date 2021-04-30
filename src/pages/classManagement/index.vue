<template>
  <view
    class="management-container"
    :class="{ 'hidden-scroll': scrollPage, 'open-scroll': !scrollPage }"
  >
    <!-- 固定时间选择器和头部班级 -->
    <view class="sticky-box">
      <view class="sticky-container">
        <view class="class-tabs">
          <view class="left">
            <view class="class-name f40 f-w6">
              <text>四年级1班</text>
            </view>
            <switch-class @switch-change="switchChange" />
          </view>
          <view class="right f30 f-w4" @click="goClass">
            <text>管理</text>
          </view>
        </view>
        <!-- 时间选择器 -->
        <view class="date-row">
          <date-tabs />
        </view>
      </view>
    </view>

    <!-- 运动总览 -->
    <overview class="overview-row">
      <view class="row-count">
        <text class="name f40 f-w6">运动总览</text>
        <text class="count f24 f-w4">该班共150人</text>
      </view>
      <view class="row-tow">
        <view>
          <view class="count f-fo f40 f-w">128</view>
          <view class="des f24 f-w4">已运动(人)</view>
        </view>
        <view>
          <view class="count f-fo f40 f-w">24</view>
          <view class="des f24 f-w4">平均每人(分钟)</view>
        </view>
        <view>
          <view class="count f-fo f40 f-w">32</view>
          <view class="des f24 f-w4">平均每次(分钟)</view>
        </view>
      </view>
    </overview>
    <!-- 运动计划 -->
    <overview class="plan-row">
      <plan-tag name="男女全部" />
      <!-- <plan-tag name="男生计划" bgColor="#6196FF"/> -->
      <!-- <plan-tag name="女生计划" bgColor="#FC658B"/> -->
      <!-- 计划名称 -->
      <view class="plan-title-content">
        <view class="plan-name f40 f-w6">男女通用体考冲刺计划</view>
        <view class="plan-sub-title f28">
          <text class="tag-bg f22">第6天</text>
          <text>无脑疯狂鬼畜训练</text>
        </view>
      </view>
      <!-- 完成情况 -->
      <view class="plan-completion">
        <view class="title f32 f-w8">完成情况</view>
        <completion :chartData="chartData" :chartTitle="chartTitle" />
        <!-- 分数，时间统计 -->
        <statistics-panel :prop="statisticsPanel" />
        <!-- 提醒栏 -->
        <reminder-card title="待补练" count="10" @remind-click="remindClick(1)" />
        <reminder-card title="待完成" count="20" @remind-click="remindClick(2)" />
        <!-- 运动感受 -->
        <view class="feel-row">
          <feeling-movement />
        </view>
        <!-- 实时排名 -->
        <view class="ranking-row">
          <view class="ranking-title f32 f-w">实时排名</view>
          <ranking-list />
        </view>
        <!-- 查看计划详情 -->
        <view class="detail-btn" @click="showDetail('1')">
          <view class="f30 f-w t-c">查看计划详情</view>
        </view>
      </view>
    </overview>
    <!-- 暂无计划状态显示或者暂无班级状态显示 empty：plan class-->
    <empty-plan class="empty-plan-row" v-if="false" :empty="empty" />
    <!-- 热门单项 -->
    <overview class="hot-item-row">
      <view class="hot-title f40 f-w6">当日热门单项</view>
      <view class="hot-sub-title f24 f-w4"
        >除计划项目外，学生练得最多的单项</view
      >
      <view class="hot-list-container">
        <view class="hot-list-row">
          <view class="hot-list-col">
            <image
              class="hot-img"
              src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
              mode="scaleToFill"
            />
            <text class="hot-name f30 f-w4">开合跳</text>
          </view>
          <view class="hot-list-col">
            <text class="hot-num f30 f-w4">96</text>
          </view>
        </view>
        <view class="hot-list-row">
          <view class="hot-list-col">
            <image
              class="hot-img"
              src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
              mode="scaleToFill"
            />
            <text class="hot-name f30 f-w4">前后并脚小跳</text>
          </view>
          <view class="hot-list-col">
            <text class="hot-num f30 f-w4">96</text>
          </view>
        </view>
        <view class="hot-list-row">
          <view class="hot-list-col">
            <image
              class="hot-img"
              src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
              mode="scaleToFill"
            />
            <text class="hot-name f30 f-w4">左右并脚小跳</text>
          </view>
          <view class="hot-list-col">
            <text class="hot-num f30 f-w4">96</text>
          </view>
        </view>
        <view class="hot-list-row">
          <view class="hot-list-col">
            <image
              class="hot-img"
              src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
              mode="scaleToFill"
            />
            <text class="hot-name f30 f-w4">卷腹</text>
          </view>
          <view class="hot-list-col">
            <text class="hot-num f30 f-w4">96</text>
          </view>
        </view>
      </view>
    </overview>

    <!-- 待补练弹窗 -->
    <ug-popup-bottom
      @close="closeRePop"
      @open="openRePop"
      height="1148rpx"
      :visible="remindPopup"
      @touchmove.stop.prevent
      @tap.stop.prevent
      title="待补练"
    >
      <view class="pop-container">
        <scroll-view scroll-y class="remind-pop-list">
          <view class="remind-list-item">
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left flex f-y-center">
                <image
                  class="head-portrait"
                  src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
                  mode="scaleToFill"
                />
                <text class="name f32 f-w6">刘旻蓝</text>
              </view>
              <view class="list-sub-item-right">
                <view class="btn-text f30 f-w4">已提醒</view>
              </view>
            </view>
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left ml120">
                <text class="label f24">1月24日</text>
                <view class="f30 f-w4 label-name">无脑疯狂鬼畜训练训练</view>
              </view>
              <view class="list-sub-item-right">
                <view class="btn-text-d f30 f-w6">待补练</view>
              </view>
            </view>
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left ml120">
                <text class="label f24">1月24日</text>
                <view class="f30 f-w4 label-name">无脑疯狂鬼畜训练训练</view>
              </view>
              <view class="list-sub-item-right">
                <view class="btn-text-d f30 f-w6">待补练</view>
              </view>
            </view>
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left ml120">
                <text class="label f24">1月24日</text>
                <view class="f30 f-w4 label-name">无脑疯狂鬼畜训练训练</view>
              </view>
              <view class="list-sub-item-right">
                <view class="btn-text f30 f-w6">已补练</view>
              </view>
            </view>
          </view>
          <view class="remind-list-item">
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left flex f-y-center">
                <image
                  class="head-portrait"
                  src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
                  mode="scaleToFill"
                />
                <text class="name f32 f-w6">刘旻蓝</text>
              </view>
              <view class="list-sub-item-right">
                <view class="f28 f-w6 remind-btn t-c">提醒</view>
              </view>
            </view>
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left ml120">
                <text class="label f24">1月24日</text>
                <view class="f30 f-w4 label-name">无脑疯狂鬼畜训练训练</view>
              </view>
              <view class="list-sub-item-right">
                <view class="btn-text-d f30 f-w6">待补练</view>
              </view>
            </view>
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left ml120">
                <text class="label f24">1月24日</text>
                <view class="f30 f-w4 label-name">无脑疯狂鬼畜训练训练</view>
              </view>
              <view class="list-sub-item-right">
                <view class="btn-text-d f30 f-w6">待补练</view>
              </view>
            </view>
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left ml120">
                <text class="label f24">1月24日</text>
                <view class="f30 f-w4 label-name">无脑疯狂鬼畜训练训练</view>
              </view>
              <view class="list-sub-item-right">
                <view class="btn-text f30 f-w6">已补练</view>
              </view>
            </view>
          </view>
          <view class="remind-list-item">
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left flex f-y-center">
                <image
                  class="head-portrait"
                  src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
                  mode="scaleToFill"
                />
                <text class="name f32 f-w6">刘旻蓝</text>
              </view>
              <view class="list-sub-item-right">
                <view class="btn-text f30 f-w4">已提醒</view>
              </view>
            </view>
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left ml120">
                <text class="label f24">1月24日</text>
                <view class="f30 f-w4 label-name">无脑疯狂鬼畜训练训练</view>
              </view>
              <view class="list-sub-item-right">
                <view class="btn-text-d f30 f-w6">待补练</view>
              </view>
            </view>
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left ml120">
                <text class="label f24">1月24日</text>
                <view class="f30 f-w4 label-name">无脑疯狂鬼畜训练训练</view>
              </view>
              <view class="list-sub-item-right">
                <view class="btn-text-d f30 f-w6">待补练</view>
              </view>
            </view>
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left ml120">
                <text class="label f24">1月24日</text>
                <view class="f30 f-w4 label-name">无脑疯狂鬼畜训练训练</view>
              </view>
              <view class="list-sub-item-right">
                <view class="btn-text f30 f-w6">已补练</view>
              </view>
            </view>
          </view>
        </scroll-view>
        <view class="footer-btn flex">
          <view class="footer-btn-left">
            <view class="f30 row1">四年级1班 <text class="f40 f-w6">12</text> 人 </view>
            <view class="row2">已设置休息日20:00自动提醒</view>
          </view>
          <view @click="remiState=true" hover-class="u-hover-class" class="footer-btn-right f28 f-w6 t-c">
            一键提醒
          </view>
        </view>
      </view>
    </ug-popup-bottom>

    <!-- 待完成弹窗 -->
    <ug-popup-bottom
      @close="closeRePop"
      @open="openRePop"
      height="1148rpx"
      :visible="completeProp"
      @touchmove.stop.prevent
      @tap.stop.prevent
      title="待完成"
    >
      <view class="pop-container">
        <scroll-view scroll-y class="remind-pop-list">
          <view class="remind-list-item">
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left flex f-y-center">
                <image
                  class="head-portrait"
                  src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
                  mode="scaleToFill"
                />
                <text class="name f32 f-w6">刘旻蓝</text>
              </view>
            </view>
          </view>
          <view class="remind-list-item">
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left flex f-y-center">
                <image
                  class="head-portrait"
                  src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
                  mode="scaleToFill"
                />
                <text class="name f32 f-w6">刘旻蓝</text>
              </view>
            </view>
          </view>
          <view class="remind-list-item">
            <view class="remind-list-sub-item flex">
              <view class="list-sub-item-left flex f-y-center">
                <image
                  class="head-portrait"
                  src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
                  mode="scaleToFill"
                />
                <text class="name f32 f-w6">刘旻蓝</text>
              </view>
            </view>
          </view>
        </scroll-view>
        <view class="footer-btn flex">
          <view class="footer-btn-left">
            <view class="f30 row1">四年级1班 <text class="f40 f-w6">12</text> 人 </view>
            <view class="row2">已设置休息日20:00自动提醒</view>
          </view>
          <view hover-class="u-hover-class" class="footer-btn-right f28 f-w6 t-c">
            一键提醒
          </view>
        </view>
      </view>
    </ug-popup-bottom>

  <!-- 点击提醒弹窗 -->
  <ug-popup
    mode="center"
    v-model="remiState"
    height="488rpx"
    width="640rpx"
    border-radius="24"
    :safe-area-inset-bottom="true"
    :closeable="true"
    close-icon-pos="top-right"
  >
    <view class="confirm-container">
      <view class="f34 f-w5 t-c title"> 是否向您管理的全部班级的未完成学生发送提醒</view>
      <view class="flex f-center">
        <view @click="confirmSend(1)" hover-class="u-hover-class" class="confirm-btn t-c f34 f-w4">全部发送</view>
      </view>
      <view><view @click="confirmSend(2)" hover-class="u-hover-class" class="confirm-sub-btn t-c f34 f-w4">仅本班</view></view>
    </view>
  </ug-popup>
  </view>
</template>
<script>
import DateTabs from './components/DateTabs'
import Overview from './components/Overview'
import switchClass from './components/switchClass'
import Completion from './components/Completion'
import StatisticsPanel from './components/StatisticsPanel'
import ReminderCard from './components/ReminderCard'
import FeelingMovement from './components/FeelingMovement'
import RankingList from './components/RankingList'
import EmptyPlan from './components/EmptyPlan'
import PlanTag from './components/PlanTag'
export default {
  data () {
    return {
      empty: 'plan',
      scrollPage: false,
      switchClass: false,
      remindPopup: false, // 待补练弹窗开闭状态
      completeProp: false, // 待完成弹窗开闭状态
      remiState: false, // 点击一键提醒发送弹窗状态
      chartData: {
        series: [
          {
            data: [
              {
                name: 'S级',
                value: 18
              },
              {
                name: 'A级',
                value: 38
              },
              {
                name: 'B级',
                value: 58
              },
              {
                name: 'C级',
                value: 14
              }
            ]
          }
        ]
      },
      chartTitle: {
        title: '75%',
        subTitle: '完成率'
      },
      statisticsPanel: [
        {
          name: '平均分',
          value: 86
        },
        {
          name: '平均运动(分钟)',
          value: 22
        },
        {
          name: '平均休息(分钟)',
          value: 12
        }
      ]
    }
  },
  components: {
    'date-tabs': DateTabs,
    overview: Overview,
    'switch-class': switchClass,
    completion: Completion,
    'statistics-panel': StatisticsPanel,
    'reminder-card': ReminderCard,
    'feeling-movement': FeelingMovement,
    'ranking-list': RankingList,
    'empty-plan': EmptyPlan,
    'plan-tag': PlanTag
  },
  onLoad (options) {
    uni.$on('scrollState', (state) => {
      this.scrollPage = state
    })
  },
  onUnload () {
    uni.$off('add', this.add)
  },
  methods: {
    goClass () {
      uni.navigateTo({ url: '/pages/classManagement/pages/classStudents' })
    },
    showDetail (id) {
      // 查看计划详情，id：计划id
      uni.navigateTo({ url: '/pages/classManagement/pages/planDetail' })
    },
    switchChange (prop) {
      this.switchClass = true
      console.log('切换班级：', prop)
    },
    // 提醒按钮事件
    remindClick (prop) {
      console.log(prop)
      if (prop === 1) {
        this.remindPopup = true
      }
      if (prop === 2) {
        this.completeProp = true
      }
    },
    closeRePop () {
      // 待补练弹窗
      this.scrollPage = false
      this.remindPopup = false
    },
    openRePop () {
      // 待补练弹窗
      // this.scrollPage = true
    },
    confirmSend () {
      this.remiState = false
      uni.showToast({
        title: '操作成功',
        icon: 'success',
        duration: 2000
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.management-container {
  box-sizing: border-box;
  padding: 0 40rpx 64rpx;
  background-color: #fff;
  .sticky-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    padding: 40rpx 40rpx 0;
    background-color: #fff;
    z-index: 9;
  }
  .sticky-box {
    height: 400rpx;
  }
  .class-tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .class-name {
        color: $uni-text-color;
      }
    }
    .right {
      color: $uni-text-color;
    }
  }
  .date-row {
    box-sizing: border-box;
    padding: 40rpx 0 50rpx;
  }
  .overview-row {
    .row-count {
      .name {
        color: $uni-text-color;
      }
      .count {
        margin-left: 16rpx;
        color: $uni-text-color-grey;
      }
    }
    .row-tow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 40rpx;
      view {
        text-align: center;
        .count {
          color: $uni-text-color;
        }
        .des {
          margin-top: 8rpx;
          color: $uni-text-color-grey;
        }
      }
    }
  }
  .empty-plan-row {
    margin-top: 120rpx;
  }
  .plan-row {
    position: relative;
    margin-top: 32rpx;
    .plan-title-content {
      margin-top: 70rpx;
      .plan-name {
        color: $uni-text-color;
      }
      .plan-sub-title {
        box-sizing: border-box;
        padding: 5rpx 8rpx;
        color: $uni-text-color-grey;
        .tag-bg {
          box-sizing: border-box;
          padding: 0 8rpx;
          border-radius: 8rpx;
          margin-right: 16rpx;
          background-color: #e2fbf2;
          color: #40c79a;
        }
      }
    }
    .plan-completion {
      width: 100%;
      .title {
        box-sizing: border-box;
        padding: 60rpx 0 20rpx;
        color: $uni-text-color;
      }
    }

    .feel-row {
      margin: 32rpx 0;
    }
    .ranking-row {
      .ranking-title {
        margin: 32rpx 0 24rpx;
        color: $uni-text-color;
      }
    }
    .detail-btn {
      display: flex;
      justify-content: center;
      margin: 40rpx 0 8rpx;
      view {
        width: 180rpx;
        color: $uni-color-primary;
      }
    }
  }
  .hot-item-row {
    margin-top: 32rpx;
    .hot-title {
      margin: 40rpx 0 8rpx;
      color: $uni-text-color;
    }
    .hot-sub-title {
      color: $uni-text-color-grey2;
    }
    .hot-list-container {
      margin-top: 24rpx;
      box-sizing: border-box;
      border-radius: 24rpx;
      box-shadow: 0px 0px 4rpx 0 rgba(235, 235, 235, 1);
      .hot-list-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 32rpx 24rpx;
        &:nth-of-type(even) {
          background-color: #f5f5fa;
        }
        &:last-child {
          border-bottom-left-radius: 20rpx;
          border-bottom-right-radius: 20rpx;
        }
        .hot-list-col {
          display: flex;
          align-items: center;
          .hot-name,
          .hot-num {
            margin-left: 24rpx;
            color: $uni-text-color;
          }
          .hot-img {
            width: 120rpx;
            height: 120rpx;
            border-radius: 16rpx;
          }
        }
      }
    }
  }
  // 补练，待完成弹窗样式
  .pop-container {
    position: relative;
    box-sizing: border-box;
    padding: 90rpx 40rpx 0;
    .remind-pop-list {
      height: 832rpx;
      .remind-list-item {
        box-sizing: border-box;
        padding: 32rpx 0;
        border-bottom: .5px solid #f0f0f0;
        .remind-list-sub-item {
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12rpx;
          .list-sub-item-left {
            .head-portrait {
              width: 96rpx;
              height: 96rpx;
              border-radius: 50%;
            }
            .name {
              color: $uni-text-color;
              margin-left: 24rpx;
            }
            .label {
              color: $uni-text-color-grey2;
            }
            .label-name {
              margin-top: 8rpx;
              color: $uni-text-color;
            }
          }
          .list-sub-item-right {
            .btn-text {
              color: $uni-text-color-grey2;
            }
            .btn-text-d {
              color: $uni-color-error;
            }
            .remind-btn{
              width: 120rpx;
              height: 60rpx;
              line-height: 60rpx;
              border-radius: 30rpx;
              color: $uni-btn-color-primary;
              background-color: #F5F5FA;
            }
          }
        }
        .ml120 {
          margin-left: 120rpx;
        }
      }
    }
    .footer-btn{
      position: absolute;
      left: 0;
      right: 0;
      bottom: -168rpx;
      box-sizing: border-box;
      padding: 23rpx 40rpx ;
      align-items: center;
      justify-content: space-between;
      border-top: .5px solid #F0F0F0;
      height: 168rpx;
      width: 100%;
      .row1{
        color: $uni-text-color;
      }
      .row2{
        margin-top: 15rpx;
        color: $uni-text-color-grey2;
      }
      .footer-btn-right{
        width: 176rpx;
        height: 64rpx;
        line-height: 64rpx;
        color: #fff;
        border-radius: 32rpx;
        background-color: $uni-btn-bg-primary;

      }
    }
  }
  // 确认弹窗
  .confirm-container {
    color: $uni-text-color;
    .title {
      line-height: 48rpx;
    }
    .confirm-btn{
      margin: 64rpx 0 32rpx;
      width: 400rpx;
      height: 88rpx;
      line-height: 88rpx;
      border-radius: 44rpx;
      background-color: $uni-btn-bg-primary;
      color: #fff;
    }
    .confirm-sub-btn{
      color: $uni-btn-color-primary;
    }
  }
}
</style>
