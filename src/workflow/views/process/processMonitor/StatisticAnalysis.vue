<template>
  <a-layout class="processwrap">
    <a-layout-content class="body"></a-layout-content>
  </a-layout>
</template>

<script>
import { Layout } from "ant-design-vue";
import "@/workflow/style/process.css";
export default {
  name: "StatisticAnalysis",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>