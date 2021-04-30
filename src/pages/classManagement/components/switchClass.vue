<template>
  <view
    class="switch-class-container f24 t-c"
    @touchmove.stop.prevent
    @tap.stop.prevent
  >
    <label @click="switchChange">
      <text>{{ title }}</text>
      <image
        class="img"
        src="../../../static/images/switch_up_down.png"
        mode="scaleToFill"
      />
    </label>

    <!-- 班级弹窗 -->
    <ug-popup-bottom
      @close="closePop"
      @open="openPop"
      height="100vh"
      :visible="switchClass"
      @touchmove.stop.prevent
      @tap.stop.prevent
      title="切换班级"
    >
      <view class="pop-container">
        <scroll-view
          scroll-y
          class="class-pop-list"
        >
          <view class="list-item">
            <view class="grade-name f40 f-w6 t-l">小学1年级</view>
            <view class="class-list flex">
              <view hover-class="u-hover-class" class="class-btn f32 f-w4 t-c" @click="changeItem('id')"
                >1班</view
              >
              <view hover-class="u-hover-class" class="class-btn f32 f-w4 active t-c">2班</view>
              <view hover-class="u-hover-class" class="class-btn f32 f-w4 t-c">3班</view>
              <view hover-class="u-hover-class" class="class-btn f32 f-w4 t-c">4班</view>
              <view hover-class="u-hover-class" class="class-btn f32 f-w4 t-c">5班</view>
              <view class="class-btn f32 f-w4 t-c">6班</view>
            </view>
          </view>
          <view class="list-item">
            <view class="grade-name f40 f-w6 t-l">小学1年级</view>
            <view class="class-list flex">
              <view class="class-btn f32 f-w4 t-c" @click="changeItem('id')"
                >1班</view
              >
              <view class="class-btn f32 f-w4 active t-c">2班</view>
              <view class="class-btn f32 f-w4 t-c">3班</view>
              <view class="class-btn f32 f-w4 t-c">4班</view>
              <view class="class-btn f32 f-w4 t-c">5班</view>
              <view class="class-btn f32 f-w4 t-c">6班</view>
            </view>
          </view>
          <view class="list-item">
            <view class="grade-name f40 f-w6 t-l">小学1年级</view>
            <view class="class-list flex">
              <view class="class-btn f32 f-w4 t-c" @click="changeItem('id')"
                >1班</view
              >
              <view class="class-btn f32 f-w4 active t-c">2班</view>
              <view class="class-btn f32 f-w4 t-c">3班</view>
              <view class="class-btn f32 f-w4 t-c">4班</view>
              <view class="class-btn f32 f-w4 t-c">5班</view>
              <view class="class-btn f32 f-w4 t-c">6班</view>
            </view>
          </view>
        </scroll-view>
      </view>
    </ug-popup-bottom>
  </view>
</template>
<script>
export default {
  data () {
    return {
      switchClass: false
    }
  },
  props: {
    title: {
      type: String,
      default: '切换班级'
    },
    prop: Object
  },
  methods: {
    switchChange () {
      this.switchClass = true
    },
    changeItem () {
      this.$emit('switch-change', this.prop)
    },
    closePop () {
      this.switchClass = false
      uni.$emit('scrollState', this.switchClass)
    },
    openPop () {
      uni.$emit('scrollState', this.switchClass)
    },
    clear () {
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.switch-class-container {
  position: relative;
  left: 16rpx;
  width: 148rpx;
  height: 48rpx;
  line-height: 48rpx;
  border-radius: 8rpx;
  color: $uni-btn-color-primary;
  background-color: #fff2eb;
  .img {
    margin-left: 6rpx;
    width: 16rpx;
    height: 16rpx;
  }
  .pop-container {
    .class-pop-list {
      margin-top: 100rpx;
      box-sizing: border-box;
      padding: 20rpx 40rpx;
      height: 100%;
      height: 830rpx;
      .list-item {
        margin-bottom: 50rpx;
        .grade-name {
          color: $uni-text-color;
        }
        .class-list {
          flex-wrap: wrap;
          flex-shrink: 0;
          margin-top: 24rpx;
          .class-btn {
            flex-shrink: 0;
            margin-right: 20rpx;
            margin-bottom: 32rpx;
            width: 200rpx;
            height: 80rpx;
            line-height: 75rpx;
            border-radius: 16rpx;
            color: $uni-text-color;
            background-color: #f5f5fa;
          }
        }
      }
      .active {
        color: #fff !important;
        background-color: $uni-btn-bg-primary !important;
      }
    }
  }
}
</style>
