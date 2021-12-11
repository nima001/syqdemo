<template>
  <div class="authorize">
    <a-tabs :activeKey="type"  @tabClick="tabClick">
      <a-tab-pane v-for="item in tabs" :key="item.key" :tab="item.title">
        <authorize-roles :id="id" :type="type"></authorize-roles>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Tabs } from "ant-design-vue";
import AuthorizeRoles from "./AuthorizeRoles";
export default {
  components: {
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    AuthorizeRoles
  },
  props: {
    id: {
      type: Number
    }
  },
  data() {
    return {
      tabs: [
        { key: 1, title: "发起权限" },
        { key: 3, title: "查询权限" },
        { key: 2, title: "监控权限" }
      ],
      type: 1
    };
  },
  methods: {
    tabClick(key) {
      this.type = key;
    }
  }
};
</script>
<style lang="less" scoped>
</style>