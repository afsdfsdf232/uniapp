<template>
  <view class="form-item-container">
    <view class="form-item-box">
      <view class="form-item-label">
        <label>{{label}}</label>
      </view>
      <view ref="verficationItem" class="form-item-content">
        <slot></slot>
      </view>
    </view>
    <view v-show="isErr" class="form-item-err">
      <text>*{{errMsg}}</text>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    label: String,
    prop: String
  },
  inject: ['model'],
  provide: function () {
    return {
      prop: this.prop
    }
  },
  data () {
    return {
      isErr: false,
      errMsg: '',
      initValue: ''
    }
  },
  created () {
    this.$bus.$off('validateItem')
    // this.$bus.$off('validateForm')
    // this.$bus.$off('$verificationFormItem')
    this.$bus.$on('$verificationFormItem', ({ value, prop }, cb) => {
      if (cb && typeof cb === 'function') {
        cb(this.verificationFormItem(value, prop))
      } else {
        this.verificationFormItem(value, prop)
      }
    })
    this.$bus.$on('validateForm', cb => {
      this.validateItems(cb)
    })
  },
  methods: {
    verificationRequired (rule = {}, value) {
      if (!value && value !== 0 && value !== false) {
        this.errMsg = rule.message
        this.isErr = true
        return false
      }
      this.isErr = false
      return true
    },
    verificationFunction (rule = {}, value) {
      rule.validator(rule, value, (message) => {
        if (message) {
          this.errMsg = message
          this.isErr = true
          return false
        } else {
          this.isErr = false
          return true
        }
      })
    },
    validatorFormRuleType (rule = {}, value) {
      if (rule.required && this.isErr === false) {
        return this.verificationRequired(rule, value)
      } else if (this.isErr === false && rule.validator && typeof rule.validator === 'function') {
        return this.verificationFunction(rule, value)
      }
    },
    verificationFormItem (value, prop = -1) {
      if (prop !== this.prop && prop !== -1) return
      const rules = (this.model || {})[this.prop] // 查找验证规则
      if (value !== this.initValue) {
        this.isErr = false
      }
      this.initValue = value
      // eslint-disable-next-line
      if (!!rules) {
        if (Array.isArray(rules)) {
          for (let i = 0; i < rules.length; i++) {
            const state = this.validatorFormRuleType(rules[i], value)
            if (state === false) continue
          }
        } else {
          this.validatorFormRuleType(rules, value)
        }
      }
      return !this.isErr
    },
    validateItems (cb) {
      this.$bus.$emit('validateItem', cb)
    }
  },
  beforeDestroy () {
    this.$bus.$off('$verificationFormItem')
  }
}
</script>
<style lang="scss" scoped>
  .form-item-container{
    position: relative;
    box-sizing: border-box;
    padding: 14rpx 0;
    font-size: 28rpx;
    border-bottom-width: 1px;
    margin-bottom: 28rpx;
    .form-item-box{
      display: flex;
      align-items: center;
      .form-item-label{
        width: auto
      }
      .form-item-content{
        flex: 1;
      }
    }
    .form-item-err{
      font-size: 24rpx;
      line-height: 16rpx;
      margin-top: 16rpx;
      color: #fa3534;
    }
    &::after{
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      transform-origin: 0 0;
      width: 199.8%;
      height: 1px;
      transform: scale(.5);
      background-color: #e4e7ed;
      z-index: 2;
    }
  }
</style>
