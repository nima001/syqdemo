<template>
  <div class="panel">
    <div class="title">
      <div class="left">{{title}}</div>
      <div class="operate">
        <slot name="operate"></slot>
      </div>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang='less' scoped>
.panel {
  .title {
    line-height: 1em;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #262626;
    opacity: 1;
    .left {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.95);
      &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 1em;
        margin-right: 10px;
        vertical-align: -0.12em;
        background-color: #1b5293;
      }
    }
    .operate {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 21px;
      color: #1b5293;
      opacity: 1;
      display: flex;
      align-items: center;
      padding: 0px @padding-xs;
      cursor: pointer;
      /deep/ .anticon {
        font-size: 14px;
      }
    }
  }
  .content {
    background: @white;
  }
}
</style>