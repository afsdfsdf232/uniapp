<template>
  <view class="class-students-contaiiner">
    <nav-bar title="四年级1班">
      <switch-class />
    </nav-bar>
    <view class="list-container">
      <view class="list-row list-header">
        <view class="col w65 f24 f-w4">序号</view>
        <view class="col f1  f24 f-w4">姓名</view>
        <view class="col w80  f24 f-w4" @click="changeGender">
          <text>{{sexName}}</text>
          <view class="down-icon icon-sex-bg"></view>
        </view>
        <view
          class="col w140  f24 f-w4"
          :class="{ 'dow-sort': sort === 0, 'up-sort': sort === 1 }"
          @click="switchSort"
        >
          <text>累计运动</text>
          <view class="all-s-icon">
            <view class="up-icon"></view>
            <view class="down-icon"></view>
          </view>
        </view>
      </view>
      <scroll-view scroll-y class="scroll-container">
        <view class="list-row list-row-item">
          <view class="col w65 f28 f-w4">999999</view>
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
          <view class="col w65 f28 f-w4">3</view>
          <view class="col f1 f28 f-w4">佟新</view>
          <view class="col w80 f28 f-w4">女</view>
          <view class="col w140 f28 f-w4">1388888.5h</view>
        </view>
        <view class="list-row list-row-item">
          <view class="col w65">3</view>
          <view class="col f1">佟新</view>
          <view class="col w80">女</view>
          <view class="col w140">1388888.5h</view>
        </view>
        <view class="list-row list-row-item">
          <view class="col w65">3</view>
          <view class="col f1">佟新</view>
          <view class="col w80">女</view>
          <view class="col w140">1388888.5h</view>
        </view>
        <view class="list-row list-row-item">
          <view class="col w65">3</view>
          <view class="col f1">佟新</view>
          <view class="col w80">女</view>
          <view class="col w140">1388888.5h</view>
        </view>
        <view class="list-row list-row-item">
          <view class="col w65">3</view>
          <view class="col f1">佟新</view>
          <view class="col w80">女</view>
          <view class="col w140">1388888.5h</view>
        </view>
        <view class="list-row list-row-item">
          <view class="col w65">3</view>
          <view class="col f1">佟新</view>
          <view class="col w80">女</view>
          <view class="col w140">1388888.5h</view>
        </view>
        <view class="list-row list-row-item">
          <view class="col w65">3</view>
          <view class="col f1">佟新</view>
          <view class="col w80">女</view>
          <view class="col w140">1388888.5h</view>
        </view>
        <view class="list-row list-row-item">
          <view class="col w65">3</view>
          <view class="col f1">佟新</view>
          <view class="col w80">女</view>
          <view class="col w140">1388888.5h</view>
        </view>
        <view class="list-row list-row-item">
          <view class="col w65">3</view>
          <view class="col f1">佟新</view>
          <view class="col w80">女</view>
          <view class="col w140">1388888.5h</view>
        </view>
        <view class="list-row list-row-item">
          <view class="col w65">3</view>
          <view class="col f1">佟新</view>
          <view class="col w80">女</view>
          <view class="col w140">1388888.5h</view>
        </view>
        <view class="list-row list-row-item">
          <view class="col w65">3</view>
          <view class="col f1">佟新</view>
          <view class="col w80">女</view>
          <view class="col w140">1388888.5h</view>
        </view>
        <view class="list-row list-row-item">
          <view class="col w65">3</view>
          <view class="col f1">佟新</view>
          <view class="col w80">女</view>
          <view class="col w140">1388888.5h</view>
        </view>
        <view class="list-row list-row-item">
          <view class="col w65">3</view>
          <view class="col f1">佟新</view>
          <view class="col w80">女</view>
          <view class="col w140">1388888.5h</view>
        </view>
      </scroll-view>
    </view>
    <!-- 性别筛选 -->
    <ug-select :default-value="defaultSex" v-model="seletcdSex" @confirm="confirm" :list="list"></ug-select>
  </view>
</template>
<script>
import NavBar from '../components/NavBar'
import switchClass from '../components/switchClass'
export default {
  data () {
    return {
      sort: 0,
      seletcdSex: false,
      defaultSex: [0],
      sexName: '全部',
      list: [
        {
          label: '全部',
          value: 2
        },
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 0
        }
      ]
    }
  },
  components: {
    'nav-bar': NavBar,
    'switch-class': switchClass
  },
  methods: {
    switchSort () {
      this.sort = this.sort === 0 ? 1 : 0
    },
    changeGender () {
      this.seletcdSex = true
    },
    confirm ([item]) {
      if (!item.label || item.label === this.sexName) return
      this.sexName = item.label
      const index = this.list.findIndex(it => it.label === item.label)
      this.defaultSex = [index > -1 ? index : 0]
    }
  }
}
</script>
<style lang="scss" scoped>
.class-students-contaiiner {
  .scroll-container {
    height: calc(100vh - 213rpx);
    .list-row {
      &:nth-of-type(odd) {
        background-color: #f5f5fa;
      }
    }
  }
  .list-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 40rpx;
  }
  .list-header {
    height: 80rpx;
  }
  .list-header .col {
    color: $uni-text-color-grey;
  }
  .list-row-item .col {
    color: $uni-text-color;
  }
  .col {
    position: relative;
    flex-shrink: 0;
    display: flex;
    align-items: center;
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
  .icon-sex-bg {
    display: inline-block;
    margin-left: 6rpx;
    border-top-color: #8c8a99;
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
    display: inline-block
  }
}
</style>
