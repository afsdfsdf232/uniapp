<template>
  <view class="input-container">
    <input
      ref="vatiov"
      class="vatiov"
      :value="value"
      @input="handelInput($event)"
      @blur="blur"
      placeholder-class="placeholder"
      v-bind="$attrs" :type="type"
      >
      <icon
        @click="clearInput"
        class="clear-icon"
        type="clear"
        :size="14"
        color="rgb(192, 196, 204)"
      />
  </view>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    }
  },
  inject: ['prop'],
  created () {
    this.$bus.$off('validateItem')
    this.$bus.$on('validateItem', (cb) => {
      // console.log('cbs-input:', cb)
      this.verificationParentFormItem(-1, cb)
    })
  },
  methods: {
    handelInput ($event) {
      this.$emit('input', $event.target.value)
    },
    clearInput () {
      this.$emit('input')
      this.$emit('clear')
      this.verificationParentFormItem(this.prop)
    },
    verificationParentFormItem (prop = this.prop, cb) {
      setTimeout(() => this.$bus.$emit('$verificationFormItem', { value: this.value, prop }, cb), 0)
    },
    blur () {
      this.verificationParentFormItem(this.prop)
    }

  },
  beforeDestroy () {
    this.$bus.$off('$verificationFormItem')
  }
}
</script>
<style lang="scss" scoped>
  .input-container{
    position: relative;
    height: 100%;
    width: 100%;
    .placeholder{
      font-size: 24rpx;
      color: rgb(192, 196, 204);
    }
    .clear-icon{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
