<template>
  <view class="completion-content">
    <view class="echarts-box">
      <qiun-data-charts
        type="ring"
        :chartData="chartData"
        :echartsH5="true"
        :echartsApp="true"
        :eopts="eopts"
        background="none"
        :animation="true"
      />
      <view class="count-box">
        <view class="count f48 f-fo">{{chartTitle.title}}</view>
        <view class="desc f-24 f-w4">{{chartTitle.subTitle}}</view>
      </view>
    </view>
    <view class="legend-box" v-if="chartData.series[0] && chartData.series[0].data && chartData.series[0].data.length>0">
      <view v-for="(item,index) in chartData.series[0].data" :key="item.name" class="legend-item">
        <view :style="{backgroundColor: eopts.color[index]}" class="leg-tag"></view> <text>{{item.name}}：{{item.value}}人</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      eopts: {
        legend: {
          show: false
        },
        silent: true,
        color: ['#FFD500', '#FF8640', '#6196FF', '#38BBBE'],
        seriesTemplate: {
          name: '',
          type: 'pie',
          data: [],
          radius: ['80%', '100%'],
          avoidLabelOverlap: false,
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      }
    }
  },
  props: {
    chartData: {
      type: Object,
      default: () => ({})
    },
    chartTitle: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
.completion-content {
  width: 100%;
  display: flex;
  align-items: center;
  .echarts-box {
    position: relative;
    width: 50%;
    height: 240rpx;
    display: flex;
    align-items: center;
    .count-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      view {
        text-align: center;
      }
      .count {
        color: $uni-text-color;
      }
      .desc {
        color: $uni-text-color-grey;
      }
    }
  }
  .legend-box {
    .legend-item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 12rpx 40rpx;
      .leg-tag {
        width: 40rpx;
        height: 20rpx;
        margin-right: 16rpx;
        border-radius: 3rpx;
      }
    }
  }
}
</style>
