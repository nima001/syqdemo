<template>
  <div class="personcount">
    <div class="main">
      <div class="switch">
        <a-tabs default-active-key="TransferInfo" @change="callback">
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
import TransferInfo from "./components/TransferInfo";
import PersonIdentify from "./components/PersonIdentify";
import PersonSex from "./components/PersonSex";
import PoliticsStatus from "./components/PoliticsStatus";
import EducationBackground from "./components/EducationBackground";
import StaffPosition from "./components/StaffPosition";
import PersonExam from "./components/PersonExam";
export default {
  components: {
    TransferInfo,
    PersonIdentify,
    PersonSex,
    PoliticsStatus,
    EducationBackground,
    StaffPosition,
    PersonExam,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane
  },
  data() {
    return {
      activeCmpt: "TransferInfo",
      cmptList: [
        { name: "人员调动情况", cmpt: "TransferInfo" },
        { name: "人员身份", cmpt: "PersonIdentify" },
        { name: "性别", cmpt: "PersonSex" },
        { name: "政治面貌", cmpt: "PoliticsStatus" },
        { name: "学历", cmpt: "EducationBackground" },
        { name: "窗口职位", cmpt: "StaffPosition" },
        { name: "考核", cmpt: "PersonExam" }
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
.personcount {
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
      overflow-y: auto;
    }
  }
}
</style>