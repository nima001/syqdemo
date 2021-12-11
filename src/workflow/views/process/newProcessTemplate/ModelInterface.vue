<template>
  <div class="modelinterface">
    <a-tabs type="card">
      <a-tab-pane tab="数据填充" key="1">
          <data-fill></data-fill>
      </a-tab-pane>
      <a-tab-pane tab="数据入库" key="2">
          <data-loading></data-loading>
      </a-tab-pane>
      <a-tab-pane tab="流程撤销" key="3">
          <process-revocation></process-revocation>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import DataFill from "./modelInterfaceComponents/DataFill";
import DataLoading from "./modelInterfaceComponents/DataLoading";
import ProcessRevocation from "./modelInterfaceComponents/ProcessRevocation";
import {Tabs} from 'ant-design-vue';
export default {
  components: {
      ATabs:Tabs,
      ATabPane:Tabs.TabPane,
      DataLoading,
      DataFill,
      ProcessRevocation
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.modelinterface{
    width: 80%;
    margin:0 auto;
}
</style>