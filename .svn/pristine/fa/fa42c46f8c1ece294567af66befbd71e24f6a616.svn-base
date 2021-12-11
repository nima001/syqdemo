<template>
  <div class="lineChart" ref="chart"></div>
</template>

<script>
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
export default {
  props: {
    table: Array,
  },
  data() {
    return {
      chart: undefined
    };
  },
  watch: {
    table(table){
      if(this.chart){
        this.chart.changeData(table);
      }
    }
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      if(this.chart){
        this.chart.destroy();
      }
      let chart = new Chart({
        container: this.$refs.chart,
        autoFit: true,
        padding: [20, 0],
      });
      chart.scale({
        value: {
          alias:'编制',
          min: 0,
        }
      });
      chart.tooltip({
        showCrosshairs: true,
      });
      chart.axis('value',{
        label:null,
        grid:null
      });
      chart.axis('year',{
        tickLine:null
      })
      chart.area().position('year*value').shape('smooth');
      chart.line().position('year*value').shape('smooth');
      chart.data(this.table);
      console.log(this.table)
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