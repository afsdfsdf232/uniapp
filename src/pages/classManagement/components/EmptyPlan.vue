<template>
  <view class="empty-container t-c" v-bind="$attrs">
    <image
      v-if="empty === 'plan'"
      class="empty-img"
      src="../../../static/images/empty-plan.png"
      mode="scaleToFill"
    />
    <image
      v-if="empty === 'class'"
      class="empty-img"
      src="../../../static/images/empty-class.png"
      mode="scaleToFill"
    />
    <image
      v-if="empty === 'training'"
      class="empty-img"
      src="../../../static/images/empty-training.png"
      mode="scaleToFill"
    />
    <view class="title f30 f-w4">{{
      title || empty === "plan"
        ? "该班级暂无进行中的计划"
        : empty === "training"
        ? "没有学生需要补练"
        : "暂无管理班级，请在后台增加"
    }}</view>
  </view>
</template>

<script>
export default {
  props: {
    empty: String,
    title: String
  }
}
</script>

<style lang="scss" scoped>
.empty-container {
  .empty-img {
    width: 280rpx;
    height: 280rpx;
  }
  .title {
    margin-top: 40rpx;
    color: $uni-text-color;
  }
}
</style>
