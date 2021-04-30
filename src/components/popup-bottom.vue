<template>
  <ug-popup
    @close="close"
    @open="open"
    v-bind="$attrs"
    mode="bottom"
    v-model="state"
    :height="height"
    border-radius="48"
    :safe-area-inset-bottom="true"
    :closeable="true"
    close-icon-pos="top-left"
    close-icon-color="#38364D"
    close-icon-size="38"
  >
    <view :style="titleStyle" class="pop-title f40">{{ title }}</view>
    <slot></slot>
  </ug-popup>
</template>
<script>
export default {
  props: {
    height: [String, Number],
    title: [String, Number],
    titleStyle: Object,
    visible: Boolean
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
    },
    open () {
      this.$emit('open', true)
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
  .pop-title {
    position: absolute;
    left: 50%;
    top: 30rpx;
    transform: translateX(-50%);
    color: $uni-text-color;
  }
</style>
