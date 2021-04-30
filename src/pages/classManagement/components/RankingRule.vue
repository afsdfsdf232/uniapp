<template>
  <ug-popup
    v-model="state"
    border-radius="24"
    :mask="true"
    @close="close"
    :safe-area-inset-bottom="true"
    width="680rpx"
    height="800rpx"
    mode="center"
  >
    <view class="rule-desc">
      <view class="rule-title t-c f40 f-w6 f-fp">{{title}}</view>
      <view class="f34 f-w4 t-l"
        v-for="(item,index) in list" :key="index"
        >{{item}}</view
      >
    </view>
    <u-line color="#E5E5E5"></u-line>
    <view class="btn t-c f36 f-w5" @click="close">我知道了</view>
  </ug-popup>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: String,
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      state: false
    }
  },
  created () {
    this.state = this.visible
  },
  methods: {
    close () {
      this.$emit('close', false)
    }
  },
  watch: {
    visible: {
      handler (newold, old) {
        this.state = newold
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-desc {
  box-sizing: border-box;
  margin-bottom: 48rpx;
  .rule-title {
    box-sizing: border-box;
    padding: 0;
    height: 56rpx;
    color: $uni-text-color;
    margin-bottom: 14rpx;
  }
  view {
    box-sizing: border-box;
    padding: 14rpx 0;
  }
}
  .btn {
    height: 110rpx;
    box-sizing: border-box;
    padding: 32rpx 0 32rpx;
    color: $uni-btn-color-primary;
  }
</style>
