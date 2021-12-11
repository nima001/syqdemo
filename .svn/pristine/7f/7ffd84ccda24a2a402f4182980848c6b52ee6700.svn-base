<template>
  <div class="column-chart" ref="columnChart">
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
  name: 'ColumnChart',
  props: ['chartData', 'pagetype'],
  data() {
    return {
      columnPlot: null,
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
        if (this.columnPlot) {
          this.columnPlot.destroy();
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
    area(key){
      let d = this.$store.getters.dictKey("usermanage.org.district", key);
      return (d && d.text) || '';
    },
    init(data) {
      this.columnPlot = new Chart({
        container: 'container',
        autoFit: true,
        height: this.height
      });
      this.columnPlot.data(data);
      this.columnPlot.scale('value', {
        nice: true,
      });
      this.columnPlot.axis('xname', {
        label: {
          formatter: (val) => {
            return this.area(val);
          },
        },
      });
      this.columnPlot.tooltip({
        showMarkers: false,
        shared: true,
      });

      this.columnPlot
        .interval()
        .position('xname*value')
        .color({
          fields: ['fieldname'],
          values: this.colors
        })
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0,
          },
        ]);

      this.columnPlot.interaction('active-region');
      // 添加文本标注 todo
      // data.forEach((item) => {
      //   this.columnPlot
      //     .annotation()
      //     .text({
      //       position: [item.xname, item.value],
      //       content: item.value,
      //       // style: {
      //       //   textAlign: 'center',
      //       // },
      //       offsetY: -10,
      //       offsetX: -10,
      //     })
      // });



      this.columnPlot.render();

    },
  }
}
</script>

<style lang="less" scoped>
.column-chart{
  height: 100%;
  background: @white;
  .chart-title{
    text-align: center;
    font-size: 20px;
    padding: @content-padding-v 0;
  }
  .table{
    padding: @content-padding-v @content-padding-h;  
    height: 100%;
    #container{
      height: calc(~"100% -  50px");
    }
  }
}
</style>