<template>
  <view
    v-if="visibleSync"
    :style="[
      customStyle,
      {
        zIndex: uZindex - 1,
      },
    ]"
    class="u-drawer"
  >
    <u-mask
      :duration="duration"
      :custom-style="maskCustomStyle"
      :maskClickAble="maskCloseAble"
      :z-index="uZindex - 2"
      :show="showDrawer && mask"
      @click="maskClick"
    ></u-mask>
    <view
      class="u-drawer-content"
      @tap="modeCenterClose(mode)"
      :class="[
        safeAreaInsetBottom ? 'safe-area-inset-bottom' : '',
        'u-drawer-' + mode,
        showDrawer ? 'u-drawer-content-visible' : '',
        zoom && mode == 'center' ? 'u-animation-zoom' : '',
      ]"
      @touchmove.stop.prevent
      @tap.stop.prevent
      :style="[style]"
    >
      <view
        class="u-mode-center-box"
        @tap.stop.prevent
        @touchmove.stop.prevent
        v-if="mode == 'center'"
        :style="[centerStyle]"
      >
        <view class="u-mode-center-title">
          <image
          @click="close"
          v-if="closeable"
          class="close-icon"
          :class="[closeIconPos]"
          src="../static/images/close-icon.png"
          mode="scaleToFill"
        /></view>
        <view style="margin-top:66rpx; box-sizing: border-box; padding: 50rpx 40rpx 40rpx">
          <slot />
        </view>
      </view>
      <view class="mt30" v-else>
        <slot />
      </view>
      <view @tap="close" class="u-close" :class="['u-close--' + closeIconPos]">
        <image
          class="close-icon"
          src="../static/images/close-icon.png"
          v-if="mode != 'center' && closeable"
          mode="scaleToFill"
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'popup',
  props: {
    /**
     * 显示状态
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * 弹出方向，left|right|top|bottom|center
     */
    mode: {
      type: String,
      default: 'left'
    },
    /**
     * 是否显示遮罩
     */
    mask: {
      type: Boolean,
      default: true
    },
    // 抽屉的宽度(mode=left|right)，或者高度(mode=top|bottom)，单位rpx，或者"auto"
    // 或者百分比"50%"，表示由内容撑开高度或者宽度
    length: {
      type: [Number, String],
      default: 'auto'
    },
    // 是否开启缩放动画，只在mode=center时有效
    zoom: {
      type: Boolean,
      default: true
    },
    // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    // 是否可以通过点击遮罩进行关闭
    maskCloseAble: {
      type: Boolean,
      default: true
    },
    // 用户自定义样式
    customStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    value: {
      type: Boolean,
      default: false
    },
    // 此为内部参数，不在文档对外使用，为了解决Picker和keyboard等融合了弹窗的组件
    // 对v-model双向绑定多层调用造成报错不能修改props值的问题
    popup: {
      type: Boolean,
      default: true
    },
    // 显示显示弹窗的圆角，单位rpx
    borderRadius: {
      type: [Number, String],
      default: 0
    },
    zIndex: {
      type: [Number, String],
      default: ''
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      default: false
    },
    // 关闭图标的名称，只能uView的内置图标
    closeIcon: {
      type: String,
      default: 'close'
    },
    // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
    closeIconPos: {
      type: String,
      default: 'top-right'
    },
    // 关闭图标的颜色
    closeIconColor: {
      type: String,
      default: '#38364D'
    },
    // 关闭图标的大小，单位rpx
    closeIconSize: {
      type: [String, Number],
      default: '38'
    },
    // 宽度，只对左，右，中部弹出时起作用，单位rpx，或者"auto"
    // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
    width: {
      type: String,
      default: ''
    },
    // 高度，只对上，下，中部弹出时起作用，单位rpx，或者"auto"
    // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
    height: {
      type: String,
      default: ''
    },
    // 给一个负的margin-top，往上偏移，避免和键盘重合的情况，仅在mode=center时有效
    negativeTop: {
      type: [String, Number],
      default: 0
    },
    // 遮罩的样式，一般用于修改遮罩的透明度
    maskCustomStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    // 遮罩打开或收起的动画过渡时间，单位ms
    duration: {
      type: [String, Number],
      default: 250
    }
  },
  data () {
    return {
      visibleSync: false,
      showDrawer: false,
      timer: null,
      closeFromInner: false // value的值改变，是发生在内部还是外部
    }
  },
  computed: {
    // 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
    style () {
      let style = {}
      // 如果是左边或者上边弹出时，需要给translate设置为负值，用于隐藏
      if (this.mode === 'left' || this.mode === 'right') {
        style = {
          width: this.width
            ? this.getUnitValue(this.width)
            : this.getUnitValue(this.length),
          height: '100%',
          transform: `translate3D(${
            this.mode === 'left' ? '-100%' : '100%'
          },0px,0px)`
        }
      } else if (this.mode === 'top' || this.mode === 'bottom') {
        style = {
          width: '100%',
          height: this.height
            ? this.getUnitValue(this.height)
            : this.getUnitValue(this.length),
          transform: `translate3D(0px,${
            this.mode === 'top' ? '-100%' : '100%'
          },0px)`
        }
      }
      style.zIndex = this.uZindex
      // 如果用户设置了borderRadius值，添加弹窗的圆角
      if (this.borderRadius) {
        switch (this.mode) {
          case 'left':
            style.borderRadius = `0 ${this.borderRadius}rpx ${this.borderRadius}rpx 0`
            break
          case 'top':
            style.borderRadius = `0 0 ${this.borderRadius}rpx ${this.borderRadius}rpx`
            break
          case 'right':
            style.borderRadius = `${this.borderRadius}rpx 0 0 ${this.borderRadius}rpx`
            break
          case 'bottom':
            style.borderRadius = `${this.borderRadius}rpx ${this.borderRadius}rpx 0 0`
            break
          default:
        }
        // 不加可能圆角无效
        style.overflow = 'hidden'
      }
      if (this.duration) {
        style.transition = `all ${this.duration / 1000}s linear`
      }
      return style
    },
    // 中部弹窗的特有样式
    centerStyle () {
      const style = {}
      style.width = this.width
        ? this.getUnitValue(this.width)
        : this.getUnitValue(this.length)
      // 中部弹出的模式，如果没有设置高度，就用auto值，由内容撑开高度
      style.height = this.height ? this.getUnitValue(this.height) : 'auto'
      style.zIndex = this.uZindex
      style.marginTop = `-${this.$u.addUnit(this.negativeTop)}`
      if (this.borderRadius) {
        style.borderRadius = `${this.borderRadius}rpx`
        // 不加可能圆角无效
        style.overflow = 'hidden'
      }
      return style
    },
    // 计算整理后的z-index值
    uZindex () {
      return this.zIndex ? this.zIndex : this.$u.zIndex.popup
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.open()
      } else if (!this.closeFromInner) {
        this.close()
      }
      this.closeFromInner = false
    }
  },
  mounted () {
    // 组件渲染完成时，检查value是否为true，如果是，弹出popup
    this.value && this.open()
  },
  methods: {
    // 判断传入的值，是否带有单位，如果没有，就默认用rpx单位
    getUnitValue (val) {
      if (/(%|px|rpx|auto)$/.test(val)) return val
      else return val + 'rpx'
    },
    // 遮罩被点击
    maskClick () {
      this.close()
    },
    close () {
      // 标记关闭是内部发生的，否则修改了value值，导致watch中对value检测，导致再执行一遍close
      // 造成@close事件触发两次
      this.closeFromInner = true
      this.change('showDrawer', 'visibleSync', false)
    },
    // 中部弹出时，需要.u-drawer-content将居中内容，此元素会铺满屏幕，点击需要关闭弹窗
    // 让其只在mode=center时起作用
    modeCenterClose (mode) {
      if (mode !== 'center' || !this.maskCloseAble) return
      this.close()
    },
    open () {
      this.change('visibleSync', 'showDrawer', true)
    },
    // 此处的原理是，关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
    // 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
    change (param1, param2, status) {
      // 如果this.popup为false，意味着为picker，actionsheet等组件调用了popup组件
      if (this.popup) {
        this.$emit('input', status)
      }
      this[param1] = status
      if (status) {
        // #ifdef H5 || MP
        this.timer = setTimeout(() => {
          this[param2] = status
          this.$emit(status ? 'open' : 'close')
        }, 50)
        // #endif
        // #ifndef H5 || MP
        this.$nextTick(() => {
          this[param2] = status
          this.$emit(status ? 'open' : 'close')
        })
        // #endif
      } else {
        this.timer = setTimeout(() => {
          this[param2] = status
          this.$emit(status ? 'open' : 'close')
        }, this.duration)
      }
    }
  }
}
</script>

<style scoped lang="scss">
// 定义混入指令，用于在非nvue环境下的flex定义，因为nvue没有display属性，会报错
@mixin vue-flex($direction: row) {
  /* #ifndef APP-NVUE */
  display: flex;
  flex-direction: $direction;
  /* #endif */
}

.u-drawer {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.u-drawer-content {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  position: absolute;
  z-index: 1003;
  transition: all 0.25s linear;
}

.u-drawer__scroll-view {
  width: 100%;
  height: 100%;
}

.u-mode-center-title{
  box-sizing: border-box;
  position: relative;
  .close-icon{
    position: absolute;
    top: 20rpx;
  }
  .top-left {
    left: 40rpx;
  }
  .top-right {
    right: 40rpx;
  }
}

.u-drawer-left {
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
}

.u-drawer-right {
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #ffffff;
}

.u-drawer-top {
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
}

.u-drawer-bottom {
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
}

.u-drawer-center {
  @include vue-flex;
  flex-direction: column;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  opacity: 0;
  z-index: 99999;
}

.u-mode-center-box {
  min-width: 100rpx;
  min-height: 100rpx;
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  position: relative;
  background-color: #ffffff;
}

.u-drawer-content-visible.u-drawer-center {
  transform: scale(1);
  opacity: 1;
}

.u-animation-zoom {
  transform: scale(1.15);
}

.u-drawer-content-visible {
  transform: translate3D(0px, 0px, 0px) !important;
}

.u-close {
  position: absolute;
  z-index: 3;
}

.u-close--top-left {
  top: 30rpx;
  left: 40rpx;
}

.u-close--top-right {
  top: 30rpx;
  right: 40rpx;
}
.mt30 {
  margin-top: 30rpx;
}

.u-close--bottom-left {
  bottom: 30rpx;
  left: 40rpx;
}

.u-close--bottom-right {
  right: 40rpx;
  bottom: 30rpx;
}
.close-icon {
  width: 46rpx;
  height: 46rpx;
}
</style>
