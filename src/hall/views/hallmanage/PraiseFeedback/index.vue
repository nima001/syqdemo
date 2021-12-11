<template>
  <div class="praise">
    <div class="main">
      <PraiseList></PraiseList>
    </div>
  </div>
</template>

<script>
import PraiseList from "./components/PraiseList";
export default {
  components: {
    PraiseList
  },
  data() {
    return {
      
    };
  },
};
</script>
<style lang='less' scoped>
.praise {
  width: 100%;
  height: 100%;
  padding: @layout-space-base;
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .switch {
      background: @white;
      padding: @content-padding-v @content-padding-h;
      border-radius: @border-radius-base;
      /deep/ .ant-tabs-tab {
        color: #262626;
        font-size: 14px;
        font-weight: bold;
        margin-right: 36px;
        padding: @padding-sm @padding-xs;
      }
    }
    .content {
      margin-top: @layout-space-base;
      border-radius: @border-radius-base;
      flex: 1;
      min-height: 0px;
    }
  }
}
</style>