<template>
  <div class="chart" ref="chart" :class="{'cursor':over && field}"></div>
</template>
<script>
import { Liquid } from "@antv/g2plot";

export default {
  data() {
    return {
      chart: undefined
    };
  },
  props: {
    persent: {
      type: Number,
      required: true
    },
    field:{
      required:true
    }
  },
  watch: {
    persent(){
      this.draw();
    }
  },
  mounted() {
    this.draw();
  },
  computed:{
    over(){
      return this.persent > 1
    }
  },
  methods: {
    draw() {
      if(this.chart){
        this.chart.destroy();
      }
      let dom = this.$refs.chart;
      if(!dom){
        return;
      }
      let color = this.over ? "#C52422":"#7DC8A3";
      const liquidPlot = new Liquid(dom, {
        percent: this.persent,
        outline: {
          border: 2,
          distance: 0,
        },
        color,
        // 外圈的颜色
        liquidStyle: {
          // 水波的颜色
          fill: color,
          cursor: 'pointer'
        },
        wave: {
          length: 60 
        },
        statistic: {
          content: {
            style: {
              color:'#FFF',
              fontSize: 24,
              fontFamily: "Arial",
              fontWeight: 400
            },
            formatter: obj => {
              return (obj.percent * 100).toFixed(2) + "%";
            }
          }
        }
      });
      liquidPlot.render();
      this.chart = liquidPlot;
    }
  }
};
</script>
<style lang='less' scoped>
.chart {
  width: 120px;
  height: 120px;
  &.cursor{
    cursor: pointer;
  }
}
</style>