<template>
  <view class="plan-detail-container">
    <nav-bar align="center" title="四年级1班" />
    <!-- 内容块 -->
    <view class="plan-detail-content">
      <!-- 标题 -->
      <view class="plan-title f48 f-w6"
        >男女通用体考冲刺计划，计划名称两行可全部展示(20字)</view
      >
      <!-- Tag标签 -->
      <view class="tag-box f24 t-c">男女全部</view>
      <!-- 计划进度 -->
      <view class="current-press">
        <view class="press-title f40 f-w6">计划进度</view>
        <view class="press-desc">
          <text class="press-date f30 f-w4">2020.12.7~2021.1.31</text>
          <text class="press-sub-desc f24 f-w4">还剩18天，含12个训练日</text>
        </view>
        <u-line-progress
          inactive-color="#F5F5FA"
          :show-percent="false"
          active-color="#40C79A"
          height="16"
          :striped="true"
          :percent="70"
          :striped-active="true"
        ></u-line-progress>
      </view>
      <!-- 完成情况 -->
      <view class="plan-completion">
        <view class="plan-completion-title">
          <view class="left">
            <text class="title f40 f-w6">完成情况</text>
            <text class="sub-title f24 f-w4">截至昨天</text>
          </view>
          <view class="right" @click="goSchedule('1')">
            <text class="f24 f-w4">每日进度</text>
            <image
              class="next-icon"
              src="../../../static/images/next-icon.png"
              mode="scaleToFill"
            />
          </view>
        </view>
        <!-- Echarts 图表 -->
        <completion :chartData="chartData" :chartTitle="chartTitle" />
      </view>
      <!-- 分数，时间统计 -->
      <statistics-panel :prop="statisticsPanel" />
      <!-- 提醒功能 -->
      <reminder-card />
      <!-- 运动感受 -->
      <view class="feeling-movement">
<feeling-movement />
      </view>
      <!-- 班级排名 -->
      <view class="class-ranking">
        <view class="ranking-title flex f-y-center">
          <text class="f40 f-w6">累计排名</text>
          <image
          @click="rankingRule= true"
          class="problem-icon"
            src="../../../static/images/problem-icon.png"
            mode="scaleToFill"
          />
        </view>
        <ranking-list />
      </view>
      <!-- 单项成绩 -->
      <view class="individual-result">
        <view class="individual-title f40 f-w6">单项成绩</view>
        <view class="individual-list-container">
          <view class="list-row list-header">
            <view class="col w65 f24 f-w4">序号</view>
            <view class="col f1 f24 f-w4">项目</view>
            <view
              class="col w80  f24 f-w4"
              :class="{ 'dow-sort': sort === 0, 'up-sort': sort === 1 }"
            >
              <text>等级</text>
              <view class="all-s-icon">
                <view class="up-icon"></view>
                <view class="down-icon"></view>
              </view>
            </view>
            <view
              class="col w140  f24 f-w4"
              :class="{ 'dow-sort': sort === 0, 'up-sort': sort === 1 }"
              @click="switchSort"
            >
              <text>平均得分</text>
              <view class="all-s-icon">
                <view class="up-icon"></view>
                <view class="down-icon"></view>
              </view>
            </view>
          </view>
          <view class="list-row list-row-item">
            <view class="col w65 f28 f-w4">1</view>
            <view class="col f1 f28 f-w4">佟新志</view>
            <view class="col w80 f28 f-w4">男</view>
            <view class="col w140 f28 f-w4">18.5h</view>
          </view>
          <view class="list-row list-row-item">
            <view class="col w65 f28 f-w4">2</view>
            <view class="col f1 f28 f-w4">佟新志得到</view>
            <view class="col w80 f28 f-w4">男</view>
            <view class="col w140 f28 f-w4">13.5h</view>
          </view>
          <view class="list-row list-row-item">
            <view class="col flex1 t-c">
              <text class="show-btn f28 f-w4">展开全部</text>
            </view>
          </view>
          <view class="list-row list-row-item">
            <view class="col w65 f28 f-w4">3</view>
            <view class="col f1 f28 f-w4">佟新</view>
            <view class="col w80 f28 f-w4">女</view>
            <view class="col w140 f28 f-w4">1388888.5h</view>
          </view>
          <view class="list-row list-row-item">
            <view class="col w65 f28 f-w4">4</view>
            <view class="col f1 f28 f-w4">佟新</view>
            <view class="col w80 f28 f-w4">女</view>
            <view class="col w140 f28 f-w4">1388888.5h</view>
          </view>
          <view class="list-row list-row-item">
            <view class="col w65 f28 f-w4">5</view>
            <view class="col f1 f28 f-w4">佟新</view>
            <view class="col w80 f28 f-w4">女</view>
            <view class="col w140 f28 f-w4">1388888.5h</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 排名规则说明弹窗 -->

  </view>
</template>
<script>
import NavBar from '../components/NavBar'
import Completion from '../components/Completion'
import StatisticsPanel from '../components/StatisticsPanel'
import ReminderCard from '../components/ReminderCard'
import FeelingMovement from '../components/FeelingMovement'
import RankingList from '../components/RankingList'
export default {
  data () {
    return {
      chartData: {
        series: [
          {
            data: [
              {
                name: 'S级',
                value: 0
              },
              {
                name: 'A级',
                value: 0
              },
              {
                name: 'B级',
                value: 0
              },
              {
                name: 'C级',
                value: 0
              }
            ]
          }
        ]
      },
      chartTitle: {
        title: '79%',
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
      ],
      sort: 0,
      rankingRule: false
    }
  },
  components: {
    'nav-bar': NavBar,
    completion: Completion,
    'statistics-panel': StatisticsPanel,
    'reminder-card': ReminderCard,
    'feeling-movement': FeelingMovement,
    'ranking-list': RankingList
  },
  methods: {
    goSchedule (id) {
      // 每日进度页面，进度ID
      uni.navigateTo({ url: '/pages/classManagement/pages/schedule?id=' + id })
    }
  }
}
</script>
<style lang="scss" scoped>
.plan-detail-container {
  .plan-detail-content {
    box-sizing: border-box;
    padding: 0 40rpx;
    .plan-title {
      color: $uni-text-color
    }
    .tag-box {
      margin: 16rpx 0 0;
      width: 128rpx;
      height: 48rpx;
      line-height: 48rpx;
      color: #fff;
      border-radius: 12rpx;
      background-color: #ffae00;
    }
    .current-press {
      .press-title {
         margin: 72rpx 0 24rpx;
        color: $uni-text-color;
      }
      .press-desc {
        .press-date {
          color: $uni-text-color
        }
        .press-sub-desc {
          margin-left: 16rpx;
          color: $uni-text-color-grey
        }
      }
    }
    .plan-completion {
      box-sizing: border-box;
      padding: 65rpx 0 40rpx;
      .plan-completion-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40rpx;
        .left {
          .title {
            color: $uni-text-color
          }
          .sub-title {
            margin-left: 8rpx;
            color: $uni-text-color-grey;
          }
        }
        .right {
          .next-icon {
            width: 16rpx;
            height: 16rpx;
          }
          text {
            margin-right: 4rpx;
            color: $uni-text-color-grey;
          }
        }
      }
    }
    .feeling-movement{
      margin-top: 72rpx;
    }
    .class-ranking {
      .ranking-title {
        margin: 72rpx 0 24rpx;
        color: $uni-text-color;
        .problem-icon{
          margin-left: 8rpx;
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
    .individual-result {
      margin-top: 72rpx;
      box-sizing: border-box;
      padding: 0 0 40rpx;
      .individual-title {
        color: $uni-text-color
      }
      .individual-list-container {
        margin-top: 25rpx;
        .list-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
          padding: 40rpx;
          &:nth-of-type(odd) {
            background-color: #f5f5fa;
          }
        }
        .list-header {
          height: 80rpx;
        }
        .list-header .col {
          color: $uni-text-color-grey;
        }
        .list-row-item .col {
          color: $uni-text-color
        }
        .show-btn {
          color: $uni-btn-color-primary;
        }
        .w65 {
          width: 65rpx;
          margin-right: 48rpx;
        }
        .w80 {
          width: 80rpx;
          margin-right: 28rpx;
        }
        .f1 {
          flex: 1;
        }
        .w140 {
          width: 140rpx;
        }
        .dow-sort .all-s-icon {
          .up-icon {
            border-bottom-color: #8c8a99;
          }
          .down-icon {
            border-top-color: #ff8640;
          }
        }
        .up-sort .all-s-icon {
          .up-icon {
            border-bottom-color: #ff8640;
          }
          .down-icon {
            border-top-color: #8c8a99;
          }
        }
        .all-s-icon {
          position: relative;
          left: 6rpx;
          display: inline-block;
        }
      }
    }
  }
}
</style>
