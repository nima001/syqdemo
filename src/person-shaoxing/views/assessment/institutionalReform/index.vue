<template>
  <div class="tabs">
    <a-tabs
      v-model="active">
        <a-tab-pane :key="1" tab="中共绍兴市委机构设置情况">
            <reform :type="active"/>
        </a-tab-pane>
        <a-tab-pane :key="2" tab="绍兴市人民政府机构设置情况">
            <reform :type="active"/>
        </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import Reform from "./Reform";
export default {
  name: 'reformIndex',
  components: {
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    Reform
  },
  data() {
    return {
        active: 1,
    };
  },
};
</script>
<style lang="less" scoped>
.tabs {
    height: 97%;
    margin: 10px;
    background: white;
    /deep/
    .ant-tabs {
        display: flex;
        flex-direction: column;
        .ant-tabs-bar {
            border: 0;
            padding: @layout-space-base @content-padding-h;
            box-shadow: 1px 1px 3px 1px fade(@primary-color, 5%);
        }
    } 
}
</style>
