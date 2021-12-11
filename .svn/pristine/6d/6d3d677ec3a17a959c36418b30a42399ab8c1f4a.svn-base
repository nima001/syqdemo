<template>
  <div class="supervise">
    <div class="main">
      <div class="switch">
        <a-tabs default-active-key="PersonnelSupervise" @change="callback">
          <a-tab-pane :key="item.cmpt" :tab="item.name" v-for="item in cmptList"></a-tab-pane>
        </a-tabs>
      </div>
      <div class="content">
        <component :is="activeCmpt"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs } from "ant-design-vue";
import PersonnelSupervise from "./components/PersonnelSupervise";
import WindowSupervise from "./components/WindowSupervise";
export default {
  components: {
    PersonnelSupervise,
    WindowSupervise,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane
  },
  data() {
    return {
      activeCmpt: "PersonnelSupervise",
      cmptList: [
        { name: "人员巡查管理", cmpt: "PersonnelSupervise" },
        { name: "窗口巡查督察", cmpt: "WindowSupervise"},
        { name: "窗口加扣分汇总", cmpt: "" }
      ]
    };
  },
  methods: {
    callback(key) {
      this.activeCmpt = key;
    }
  }
};
</script>
<style lang='less' scoped>
.supervise {
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