<template>
  <div>
    <Title title="执行状态分析" />
    <div style="height: 200px">
      <BarChart
        :data="data"
        :settings="{
          canvas: { width: 400, height: 230 },
          padding: [20,0,20,0],
          yAxis: { grid: true },
          size: 28,
          background: true,
          color: ['#CF8556', '#CF6C56', '#CF5A56'],
        }"
      />
    </div>
  </div>
</template>

<script>
import Title from "./Title";
import BarChart from "@person/components/chart/BarChart";

export default {
  components: {
    Title,
    BarChart,
  },
  data() {
    return {
      data: {
        keyCols: [
          { column: "k0", key: "district", showname: "所在地区" },
        ],
        rows: [
          { k0: "待签收", k1: "记录数", v0: 83 },
          { k0: "待办理", k1: "记录数", v0: 65 },
          { k0: "待审核", k1: "记录数", v0: 90 },
        ],
        valueCols: [{ column: "v0", showname: "记录数" }],
      },
    };
  },
};
</script>

<style scoped lang="less">
/deep/.bar-chart {
  height: 100%;
}
</style>
