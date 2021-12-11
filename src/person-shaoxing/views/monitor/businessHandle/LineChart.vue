<template>
  <div class="line-chart">
    <div class="chart-title">{{title}}</div>
    <div class="table">
      <div id="container" ref="box"></div>
    </div>
  </div>
</template>

<script>
import { Chart } from '@antv/g2';
import { colorGroup } from "@/person-shaoxing/utils/index";

export default {
  name: 'LineChart',
  props: ['chartData', 'pagetype'],
  data() {
    return {
      datalist: [],
      chart: null,
      title: '',
      height: 400
    }
  },
  computed: {
    colors(){
      let colors = this.$store.getters.getConfig('chart.colors');
      if(colors){
        try{
          colors = JSON.parse(colors)
          if(colors && colors.length){
            return colors;
          }
        }catch(err){

        }
      }
      return ["#D15456","#5488D1","#EDBA55","#D48265","#91C7AE","#749F83","#BDA29A","#6E7074","#585470","#706254"]
    },
  },
  watch: {
    chartData: {
      handler(val) {
        if (this.chart) {
          this.chart.destroy();
        }
        this.init(val);
      },
      deep: true
    },
    pagetype: {
      handler(val) {
        if(val == 1) {
          this.title = '编制数和实有数';
        }else if(val == 2) {
          this.title = '编外控制数和实有人数';
        }else if(val == 5) {
          this.title = '机构职责调整数';
        }else if(val == 6) {
          this.title = '出（入）编业务办理情况';
        }else if(val == 8) {
          this.title = '用编计划情况';
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.height = this.$refs.box.offsetHeight;
    window.onresize = () =>{
      return (() => {
        this.height = this.$refs.box.offsetHeight;
      })();
    }
  },
  methods:{
    init(data) {
      this.chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 500,
      });

      this.chart.data(data);
      this.chart.scale({
        // month: {
        //   range: [0, 1],
        // },
        value: {
          nice: true,
        },
      });

      this.chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });

      // this.chart.axis('value', {
      //   label: {
      //     formatter: (val) => {
      //       return val + ' °C';
      //     },
      //   },
      // });

      this.chart
        .line()
        .position('xname*value')
        .color({
          fields: ['fieldname'],
          values: this.colors
        })
      this.chart
        .point()
        .position('xname*value')
        .color({
          fields: ['fieldname'],
          values: this.colors
        })
        

      this.chart.render();
    }
  }
}
</script>

<style lang="less" scoped>
.line-chart{
  height: 100%;
  background: @white;
  .chart-title{
    text-align: center;
    font-size: 20px;
    padding: @content-padding-v 0;
  }
  .table{
    height: 100%;
    padding: @content-padding-v @content-padding-h; 
    #container{
      height: calc(~"100% -  50px");
    } 
    .title{
      padding: @content-padding-h 0;
      text-align: center;
    }
  }
}
</style>