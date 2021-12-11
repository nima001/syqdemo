<template>
  <div class="trend">
    <span class="title">本月办事量趋势</span>
    <div class="view" ref="chart"></div>
  </div>
</template>
<script>
import { Chart } from "@antv/g2";
export default {
  components: {},
  data() {
    return {
      plot: undefined,
      list: [
        { year: "8:00", value: 3 },
        { year: "9:00", value: 4 },
        { year: "10:00", value: 3.5 },
        { year: "11:00", value: 5 },
        { year: "12:00", value: 4.9 },
        { year: "13:00", value: 6 },
        { year: "14:00", value: 7 },
        { year: "15:00", value: 9 },
        { year: "16:00", value: 13 },
        { year: "17:00", value: 6 }
      ]
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      if (!this.$refs.chart) {
        return false;
      }
      if (this.plot) {
        this.plot.destroy();
      }
      const chart = new Chart({
        container: this.$refs.chart,
        padding: [20, 20, 35, 35], // 上，右，下，左
        autoFit: true
      });
      chart.data(this.list);
      chart.scale({
        year: {
          range: [0, 1]
        },
        value: {
          min: 0,
          nice: true,
          alias: "取号量"
        }
      });
      chart.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true
      });
      chart
        .line()
        .position("year*value")
        .label("value");
      chart.point().position("year*value");

      chart.render();
      this.plot = chart;
    }
  }
};
</script>
<style lang='less' scoped>
.trend {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 20px;
  .title {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 24px;
    color: #ffffff;
    opacity: 0.8;
    text-align: center;
  }
  .view {
    flex: 1;
  }
}
</style>