<template>
  <view ref="form">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'form',
  props: ['model'],
  provide () {
    return {
      model: this.model
    }
  },
  methods: {
    validate (cb) {
      let valid = true
      this.$bus.$emit('validateForm', function (_valid) {
        // console.log(111)
        if (_valid === false) {
          valid = false
        }
      })
      setTimeout(() => {
        cb && typeof cb === 'function' && cb(valid)
      }, 0)
    }
  },
  beforeDestroy () {
    this.$bus.$off('validateForm')
  }
}
</script>
