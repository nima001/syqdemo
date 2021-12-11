<template>
  <div class="lineChart" ref="chart"></div>
</template>

<script>
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
export default {
  props: {
    table: {
      type: Object
    }
  },
  data() {
    return {
      chart: undefined
    };
  },
  watch: {
    table: {
      handler(v) {
        if (this.chart) {
          this.draw();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      if (this.chart) {
        this.chart.destroy();
      }
      let chart = new Chart({
        container: this.$refs.chart,
        autoFit: true,
        padding: [20, 0]
      });
      chart.scale({
        value: {
          alias: "编制",
          min: 0
        }
      });
      chart.tooltip({
        showCrosshairs: true
      });
      chart.axis("value", {
        label: null,
        grid: null
      });
      chart.axis("year", {
        tickLine: null
      });
      chart
        .area()
        .position("year*value")
        .shape("smooth");
      chart
        .line()
        .position("year*value")
        .shape("smooth");
      chart.data(this.table.real);

      if (this.table.trend) {
        const view2 = chart.createView();
        view2.axis(false);
        view2.data(this.table.trend);
        view2
          .line()
          .position("year*value")
          .style({
            stroke: "#969696",
            lineDash: [3, 3]
          })
          .tooltip(false);
      }

      chart.render();
      this.chart = chart;
    }
  }
};
</script>
<style lang='less' scoped>
.lineChart {
  width: 100%;
  height: 180px;
}
</style>