<template>
  <div>
    <Title title="现存问题增减情况分析" />
    <div style="height: 210px">
      <LineChart
        :data="data"
        :settings="{
          canvas: { width: 400, height: 230 },
          color: ['#6EDF75', '#A27AE4'],
          padding: [0, 0, 0, 0],
          yAxis: { grid: true },
          legend: { visible: true, position: 'top', marker: 'square' },
        }"
      />
    </div>
  </div>
</template>

<script>
import Title from "./Title";
import LineChart from "@person/components/chart/LineChart";

export default {
  components: {
    Title,
    LineChart,
  },
  data() {
    return {
      data: {
        keyCols: [
          { column: "k0", key: "district", showname: "所在地区" },
          { column: "k1", key: "unittype", showname: "单位类别" },
        ],
        rows: [
          { k0: "1月", k1: "增加", v0: 231 },
          { k0: "2月", k1: "增加", v0: 236 },
          { k0: "3月", k1: "增加", v0: 210 },
          { k0: "4月", k1: "增加", v0: 198 },
          { k0: "5月", k1: "增加", v0: 365 },
          { k0: "6月", k1: "增加", v0: 320 },
          { k0: "1月", k1: "减少", v0: 62 },
          { k0: "2月", k1: "减少", v0: 290 },
          { k0: "3月", k1: "减少", v0: 220 },
          { k0: "4月", k1: "减少", v0: 310 },
          { k0: "5月", k1: "减少", v0: 156 },
          { k0: "6月", k1: "减少", v0: 350 },
        ],
        valueCols: [{ column: "v0", showname: "记录数" }],
      },
    };
  },
};
</script>

<style scoped lang="less">
/deep/.line-chart {
  height: 100%;
}
</style>
