<template>
  <a-tabs :animated="false" class="org-detail-info">
    <a-tab-pane tab="人员信息" :key="1" v-if="org.orgtype != 3">
      <person-detail :org="org" :nodeid="nodeid" :treeid="treeid" />
    </a-tab-pane>
    <a-tab-pane tab="机构信息" :key="2">
      <org-detail :org="org" />
    </a-tab-pane>
    <a-tab-pane tab="历史文件" :key="3" v-if="(org.orgtype == 3 || isUnit) && hasPermit('/person/org/orgRecord')">
      <org-record :org="org" />
    </a-tab-pane>
    <a-tab-pane tab="权力清单" :key="4" v-if="isUnit&&hasPermit('/person/org/qlqd')">
      <power-list :org="org"/>
    </a-tab-pane>
    <a-tab-pane tab="机构管理员" :key="5" v-if="isUnit">
      <Mechanism-detail :org="org" :treeid="treeid"/>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import {Tabs} from 'ant-design-vue';
import OrgDetail from "./OrgDetail";
import OrgRecord from "./OrgRecord";
import MechanismDetail from "./MechanismDetail";
import PersonDetail from "./PersonDetail";
import PowerList from "./PowerList"

export default {
  props: ["org", "nodeid", "treeid"],
  components: {
    ATabs:Tabs,
    ATabPane:Tabs.TabPane,
    PersonDetail,
    OrgDetail,
    OrgRecord,
    MechanismDetail,
    PowerList
  },
  data(){
    return { 
      orgRecord: false,
    }
  },
  computed: {
    isUnit() {
      return [1,2,3,5].indexOf(this.org.unittype) >= 0;
    },
  },
};
</script>
<style lang="less">
.org-detail-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: auto;
  min-height: 0;
  & > .ant-tabs-bar {
    padding: 0 16px;
    margin: 0;
    border-bottom: 1px solid @primary-1;
    background-image: linear-gradient(to right, #fcfcfc, @primary-1);
    .ant-tabs-tab-active {
      color: @primary-color;
    }
    .ant-tabs-tab:hover {
      color: @primary-5;
    }
    .ant-tabs-ink-bar {
      background-color: @primary-color;
    }
    .ant-tabs-nav .ant-tabs-tab {
      padding: 8px 16px;
    }
  }
  & > .ant-tabs-content {
    flex: auto;
    min-height: 0;
    height: 100%;
    & .ant-tabs-tabpane-active {
      height: 100%;
    }
  }
}
</style>