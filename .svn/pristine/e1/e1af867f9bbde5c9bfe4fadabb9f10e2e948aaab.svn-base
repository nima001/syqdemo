<template>
  <div class="leave">
    <div class="main">
      <div class="switch">
        <a-tabs default-active-key="Ordinary" @change="callback">
          <a-tab-pane
            :key="item.cmpt"
            :tab="item.name"
            v-for="item in cmptList"
          ></a-tab-pane>
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
import Ordinary from "./components/ordinary/index";
import Lactation from "./components/lactation/index";
export default {
  components: {
    Ordinary,
    Lactation,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
  },
  data() {
    return {
      activeCmpt: "Ordinary",
      cmptList: [
        { name: "一般假", cmpt: "Ordinary" },
        { name: "哺乳假", cmpt: "Lactation" },
      ],
    };
  },
  methods: {
    callback(key) {
      this.activeCmpt = key;
    },
  },
};
</script>
<style lang='less' scoped>
.leave {
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
      /deep/ .ant-tabs-nav-scroll {
        padding: 0px @content-padding-h;
      }
      /deep/.ant-tabs-bar {
        margin: 0px;
      }
      /deep/ .ant-tabs-tab {
        color: #262626;
        font-size: 14px;
        font-weight: bold;
        margin-right: 36px;
        padding: @padding-sm @padding-xs;
      }
    }
    .content {
      flex: 1;
      min-height: 0px;
    }
  }
}
</style>