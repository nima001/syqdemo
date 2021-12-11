<template>
  <a-layout class="processwrap process-monitor">
    <a-layout-content class="body">
      <div class="top">
        <a-row>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <process-count :timer="flag"></process-count>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <running-status :timer="flag"></running-status>
          </a-col>
        </a-row>
      </div>
      <div class="bottom">
        <process-monitor-table :timer="flag"></process-monitor-table>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { Layout, Breadcrumb, Row, Col } from "ant-design-vue";
import "@/workflow/style/process.css";
import ProcessMonitorTable from "./components/ProcessMonitorTable";
import ProcessCount from "./components/ProcessCount";
import RunningStatus from "./components/RunningStatus";
import { guid } from "@/framework/utils/index";
export default {
  name: "ProcessMonitor",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ARow: Row,
    ACol: Col,
    ProcessMonitorTable,
    ProcessCount,
    RunningStatus
  },
  data() {
    return {
      flag: undefined,
      timer: null
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.flag = guid();
    }, 300000);
  },
  destroyed() {
    this.timer = null;
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
.process-monitor {
  .top {
    width: 80%;
    margin: 0 auto;
  }
  .bottom {
    width: 95%;
    margin: 0 auto;
  }
}
</style>