<template>
  <a-layout class="processwrap">
    <a-layout-content class="body">
      <ul>
        <li v-for="item in list " :key="item.id" @click="jump(item)">{{item.name}}</li>
      </ul>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { uiConfigsCookies } from "@/framework/utils/auth";
import "@/workflow/style/process.css";
import { Layout } from "ant-design-vue";
export default {
  name: "ProcessMonitorTemplate",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content
  },
  data() {
    return {
      recordList: [],
      list: [
        {
          name: "流程监控",
          componenturi: "/workflow/processmonitormanager/processmonitor"
        },
        // {
        //   name: "统计分析",
        //   componenturi: "/workflow/processmonitormanager/statisticanalysis"
        // }
      ]
    };
  },
  methods: {
    jump(item) {
      this.$router.push(item.componenturi);
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  width: 100%;
  height: 100%;
  padding: 24px;
  background: #f3f7fa;
  ul {
    height: auto;
    display: flex;
    flex-wrap: wrap;
    li {
      cursor: pointer;
      border-radius: 4px;
      width: 23%;
      margin: 15px;
      padding: 13px;
      text-align: center;
      background: #fff;
      &:hover {
        color: red;
      }
    }
  }
}
</style>