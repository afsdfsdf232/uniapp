<template>
  <ug-popup
    mode="center"
    v-model="state"
    height="488rpx"
    width="640rpx"
    border-radius="24"
    @close="close"
    @open="open"
    :safe-area-inset-bottom="true"
    :closeable="true"
    close-icon-pos="top-right"
  >
    <view class="confirm-container">
      <slot>
        <view class="f34 f-w5 t-c title">
          是否向您管理的全部班级的未完成学生发送提醒</view
        >
        <view class="flex f-center">
          <view
            @click="confirmSend(1)"
            hover-class="u-hover-class"
            class="confirm-btn t-c f34 f-w4"
            >全部发送</view
          >
        </view>
        <view
          ><view
            @click="confirmSend(2)"
            hover-class="u-hover-class"
            class="confirm-sub-btn t-c f34 f-w4"
            >仅本班</view
          ></view
        >
      </slot>
    </view>
  </ug-popup>
</template>

<script>
export default {
  data () {
    return {
      state: false
    }
  },
  created () {
    this.state = this.visible
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close', false)
    },
    open () {
      this.$emit('open', true)
    },
    confirmSend (prop) {
      this.$emit('confirm', prop)
      this.$emit('close', false)
    }
  },
  watch: {
    visible: {
      handler (newval, old) {
        this.state = newval
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// 确认弹窗
.confirm-container {
  box-sizing: border-box;
  padding: 52rpx 0 0;
  color: $uni-text-color;
  .title {
    line-height: 48rpx;
  }
  .confirm-btn {
    margin: 64rpx 0 32rpx;
    width: 400rpx;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 44rpx;
    background-color: $uni-btn-bg-primary;
    color: #fff;
  }
  .confirm-sub-btn {
    color: $uni-btn-color-primary;
  }
}
</style>
